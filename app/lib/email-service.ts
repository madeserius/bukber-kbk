import nodemailer from 'nodemailer'

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // atau 'outlook', 'yahoo', dll
    auth: {
      user: process.env.EMAIL_USER, // email pengirim
      pass: process.env.EMAIL_PASSWORD, // app password
    },
  })
}

// Template email untuk admin notification
const createAdminEmailTemplate = (rsvpData: any) => {
  const statusIcon = rsvpData.kehadiran === 'hadir' ? '✅' : '❌'
  const statusText = rsvpData.kehadiran === 'hadir' ? 'HADIR' : 'TIDAK HADIR'
  
  return {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // email admin
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
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" 
               style="background-color: #D4A574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Lihat Dashboard Admin
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
            Email otomatis dari sistem RSVP Bukber KBK
          </div>
        </div>
      </div>
    `
  }
}

// Template email konfirmasi untuk guest
const createGuestConfirmationTemplate = (rsvpData: any) => {
  const statusIcon = rsvpData.kehadiran === 'hadir' ? '✅' : '❌'
  const statusText = rsvpData.kehadiran === 'hadir' ? 'HADIR' : 'TIDAK HADIR'
  
  return {
    from: process.env.EMAIL_USER,
    to: rsvpData.email, // jika ada field email di form
    subject: `Konfirmasi RSVP - ${statusText}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f7f4;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h1 style="color: #8B4513; text-align: center; margin-bottom: 30px;">
            🎉 Terima Kasih atas Konfirmasi Anda!
          </h1>
          
          <p style="color: #8B4513; font-size: 16px; line-height: 1.6;">
            Hai <strong>${rsvpData.nama}</strong>,
          </p>
          
          <p style="color: #8B4513; font-size: 16px; line-height: 1.6;">
            Konfirmasi RSVP Anda telah kami terima dengan detail sebagai berikut:
          </p>
          
          <div style="background-color: #f9f7f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="margin: 10px 0;">
              <strong>Status:</strong> <span style="color: ${rsvpData.kehadiran === 'hadir' ? '#28a745' : '#dc3545'};">${statusIcon} ${statusText}</span>
            </div>
            ${rsvpData.kehadiran === 'hadir' ? `
            <div style="margin: 10px 0;">
              <strong>Jumlah Orang:</strong> ${rsvpData.jumlah} orang
            </div>
            ` : ''}
            ${rsvpData.catatan ? `
            <div style="margin: 10px 0;">
              <strong>Catatan:</strong> ${rsvpData.catatan}
            </div>
            ` : ''}
          </div>
          
          ${rsvpData.kehadiran === 'hadir' ? `
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">Sampai jumpa di acara!</h3>
            <p style="color: #666; margin-bottom: 0;">Jangan lupa datang tepat waktu ya! 😊</p>
          </div>
          ` : `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #666; margin-bottom: 0;">Terima kasih sudah memberitahu. Semoga lain kali bisa hadir! 😊</p>
          </div>
          `}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
            Email otomatis dari sistem RSVP Bukber KBK
          </div>
        </div>
      </div>
    `
  }
}

// Function to send admin notification
export const sendAdminNotification = async (rsvpData: any) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.log('Email configuration missing, skipping email notification')
      return { success: false, error: 'Email not configured' }
    }

    const transporter = createTransporter()
    const emailTemplate = createAdminEmailTemplate(rsvpData)
    
    const result = await transporter.sendMail(emailTemplate)
    console.log('Admin notification sent:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return { success: false, error: (error as Error).message }
  }
}

// Function to send guest confirmation (optional)
export const sendGuestConfirmation = async (rsvpData: any) => {
  try {
    if (!rsvpData.email || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Guest email or configuration missing, skipping confirmation')
      return { success: false, error: 'Email not configured or guest email missing' }
    }

    const transporter = createTransporter()
    const emailTemplate = createGuestConfirmationTemplate(rsvpData)
    
    const result = await transporter.sendMail(emailTemplate)
    console.log('Guest confirmation sent:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending guest confirmation:', error)
    return { success: false, error: (error as Error).message }
  }
}