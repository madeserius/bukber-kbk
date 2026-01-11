import { NextRequest, NextResponse } from 'next/server'

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

    // Log the RSVP data (in production, save to database)
    console.log('=== RSVP RECEIVED ===')
    console.log('Nama:', nama)
    console.log('Kehadiran:', kehadiran)
    console.log('Jumlah Orang:', jumlah)
    console.log('Catatan:', catatan || '-')
    console.log('Timestamp:', new Date().toISOString())
    console.log('=====================')

    // In production, you would save this to a database:
    // await db.rsvp.create({
    //   data: {
    //     nama,
    //     kehadiran,
    //     jumlah: kehadiran === 'hadir' ? jumlah : 0,
    //     catatan,
    //     createdAt: new Date(),
    //   },
    // })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'RSVP berhasil diterima',
        data: {
          nama,
          kehadiran,
          jumlah: kehadiran === 'hadir' ? jumlah : 0,
          catatan,
        },
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

// Handle GET request (optional - for viewing RSVPs)
export async function GET() {
  return NextResponse.json(
    {
      message: 'RSVP endpoint is working',
      info: 'Use POST method to submit RSVP',
    },
    { status: 200 }
  )
}
