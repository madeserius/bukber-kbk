const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

// Path to store RSVP data
const RSVP_FILE = path.join('/tmp', 'rsvp-data.json')

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
function saveRSVP(rsvpData) {
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

// Email functions
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

const sendAdminNotification = async (rsvpData) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.log('Email configuration missing, skipping email notification')
      return { success: false, error: 'Email not configured' }
    }

    const transporter = createTransporter()
    const statusIcon = rsvpData.kehadiran === 'hadir' ? '✅' : '❌'
    const statusText = rsvpData.kehadiran === 'hadir' ? 'HADIR' : 'TIDAK HADIR'
    
    const emailTemplate = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🎉 RSVP Baru: ${rsvpData.nama} - ${statusText}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f7f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #8B4513; text-align: center; margin-bottom: 30px;">
              🎉 RSVP Baru Masuk!
            </h1>
            
            <div style="background-color: #f9f7f4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #8B4513; margin-top: 0;">Detail RSVP:</h2>
              
              <div style="margin: 15px 0;">
                <strong style="color: #8B4513;">Nama:</strong>
                <span style="margin-left: 10px; font-size: 18px;">${rsvpData.nama}</span>
              </div>
              
              <div style="margin: 15px 0;">
                <strong style="color: #8B4513;">Status:</strong>
                <span style="margin-left: 10px; font-size: 18px; font-weight: bold; color: ${rsvpData.kehadiran === 'hadir' ? '#28a745' : '#dc3545'};">
                  ${statusIcon} ${statusText}
                </span>
              </div>
              
              ${rsvpData.kehadiran === 'hadir' ? `
              <div style="margin: 15px 0;">
                <strong style="color: #8B4513;">Jumlah Orang:</strong>
                <span style="margin-left: 10px; font-size: 18px;">${rsvpData.jumlah} orang</span>
              </div>
              ` : ''}
              
              ${rsvpData.catatan ? `
              <div style="margin: 15px 0;">
                <strong style="color: #8B4513;">Catatan:</strong>
                <div style="margin-top: 5px; padding: 10px; background-color: white; border-left: 4px solid #D4A574; border-radius: 4px;">
                  ${rsvpData.catatan}
                </div>
              </div>
              ` : ''}
              
              <div style="margin: 15px 0;">
                <strong style="color: #8B4513;">Waktu Submit:</strong>
                <span style="margin-left: 10px;">${new Date(rsvpData.createdAt).toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
              Email otomatis dari sistem RSVP Bukber KBK
            </div>
          </div>
        </div>
      `
    }
    
    const result = await transporter.sendMail(emailTemplate)
    console.log('Admin notification sent:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return { success: false, error: error.message }
  }
}

// Google Sheets functions
const getGoogleSheetsClient = () => {
  try {
    let credentials
    const credsEnv = process.env.GOOGLE_SHEETS_CREDENTIALS || '{}'

    // Try to parse as base64 first, then fall back to JSON
    try {
      // Check if it's base64 encoded (starts with ey or doesn't start with {)
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

const saveToGoogleSheets = async (rsvpData) => {
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
      resource: {
        values,
      },
    })

    console.log('Google Sheets append result:', response.data.updates)
    return { success: true, updates: response.data.updates }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return { success: false, error: error.message }
  }
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  try {
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body)
      const { nama, kehadiran, jumlah, catatan } = body

      // Validate required fields
      if (!nama || !kehadiran) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Nama dan kehadiran harus diisi' 
          }),
        }
      }

      // Save RSVP data
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
      }

      // Send email notification to admin
      try {
        const emailResult = await sendAdminNotification(savedRSVP)
        console.log('Email notification result:', emailResult)
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'RSVP berhasil diterima dan disimpan',
          data: savedRSVP,
        }),
      }
    }

    if (event.httpMethod === 'GET') {
      const rsvps = readRSVPs()
      const stats = {
        total: rsvps.length,
        hadir: rsvps.filter(r => r.kehadiran === 'hadir').length,
        tidakHadir: rsvps.filter(r => r.kehadiran === 'tidak-hadir').length,
        totalOrang: rsvps.reduce((sum, r) => sum + (r.jumlah || 0), 0)
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          stats,
          data: rsvps
        }),
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Terjadi kesalahan server' }),
    }
  }
}