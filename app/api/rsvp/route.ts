import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendAdminNotification } from '@/app/lib/email-service'
import { google } from 'googleapis'

// Path to store RSVP data
const RSVP_FILE = path.join(process.cwd(), 'data', 'rsvp-data.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(RSVP_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read existing RSVPs
function readRSVPs() {
  ensureDataDir()
  if (!fs.existsSync(RSVP_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(RSVP_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading RSVP file:', error)
    return []
  }
}

// Save RSVP to file
function saveRSVP(rsvpData: any) {
  const rsvps = readRSVPs()
  const newRSVP = {
    id: Date.now().toString(),
    ...rsvpData,
    createdAt: new Date().toISOString(),
  }
  rsvps.push(newRSVP)
  
  fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2))
  return newRSVP
}

// Google Sheets functions
function getGoogleSheetsClient() {
  try {
    let credentials
    const credsEnv = process.env.GOOGLE_SHEETS_CREDENTIALS || '{}'

    // Try to parse as base64 first, then fall back to JSON
    try {
      // Check if it's base64 encoded (doesn't start with {)
      if (!credsEnv.trim().startsWith('{')) {
        const decoded = Buffer.from(credsEnv, 'base64').toString('utf-8')
        credentials = JSON.parse(decoded)
        console.log('Decoded credentials from base64')
      } else {
        credentials = JSON.parse(credsEnv)
        console.log('Parsed credentials as JSON')
      }
    } catch (parseError) {
      console.error('Error parsing credentials:', parseError)
      return null
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    return google.sheets({ version: 'v4', auth })
  } catch (error) {
    console.error('Error creating Google Sheets client:', error)
    return null
  }
}

async function saveToGoogleSheets(rsvpData: any) {
  try {
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
      console.log('Google Sheets configuration missing, skipping Google Sheets save')
      return { success: false, error: 'Google Sheets not configured' }
    }

    const sheets = getGoogleSheetsClient()
    if (!sheets) {
      return { success: false, error: 'Failed to create Google Sheets client' }
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const range = 'Sheet1!A:F' // Adjust sheet name if needed

    // Format data for Google Sheets
    const timestamp = new Date(rsvpData.createdAt).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const values = [[
      timestamp,
      rsvpData.nama,
      rsvpData.kehadiran === 'hadir' ? 'HADIR' : 'TIDAK HADIR',
      rsvpData.kehadiran === 'hadir' ? rsvpData.jumlah : 0,
      rsvpData.catatan || '-',
      rsvpData.id
    ]]

    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    })

    console.log('Google Sheets append result:', response.data.updates)
    return { success: true, updates: response.data.updates }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, kehadiran, jumlah, catatan } = body

    // Validate required fields
    if (!nama || !kehadiran) {
      return NextResponse.json(
        { error: 'Nama dan kehadiran harus diisi' },
        { status: 400 }
      )
    }

    // Save RSVP data to file
    const rsvpData = {
      nama,
      kehadiran,
      jumlah: kehadiran === 'hadir' ? jumlah : 0,
      catatan: catatan || '',
    }

    const savedRSVP = saveRSVP(rsvpData)

    // Save to Google Sheets
    try {
      const sheetsResult = await saveToGoogleSheets(savedRSVP)
      console.log('Google Sheets save result:', sheetsResult)
    } catch (sheetsError) {
      console.error('Google Sheets save failed:', sheetsError)
      // Don't fail the whole request if Sheets fails
    }

    // Send email notification to admin
    try {
      const emailResult = await sendAdminNotification(savedRSVP)
      console.log('Email notification result:', emailResult)
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the whole request if email fails
    }

    // Log the RSVP data
    console.log('=== RSVP RECEIVED & SAVED ===')
    console.log('ID:', savedRSVP.id)
    console.log('Nama:', nama)
    console.log('Kehadiran:', kehadiran)
    console.log('Jumlah Orang:', jumlah)
    console.log('Catatan:', catatan || '-')
    console.log('Timestamp:', savedRSVP.createdAt)
    console.log('=============================')

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'RSVP berhasil diterima dan disimpan',
        data: savedRSVP,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing RSVP:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// Handle GET request - view all RSVPs
export async function GET() {
  try {
    const rsvps = readRSVPs()
    const stats = {
      total: rsvps.length,
      hadir: rsvps.filter((r: any) => r.kehadiran === 'hadir').length,
      tidakHadir: rsvps.filter((r: any) => r.kehadiran === 'tidak-hadir').length,
      totalOrang: rsvps.reduce((sum: number, r: any) => sum + (r.jumlah || 0), 0)
    }

    return NextResponse.json({
      success: true,
      stats,
      data: rsvps
    })
  } catch (error) {
    console.error('Error reading RSVPs:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
