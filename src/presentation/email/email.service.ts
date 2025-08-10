import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin.ts'

export interface SendEmailOptions {
  to: string | string[]
  subject: string,
  htmlBody: string,
  attachments?: Attachment[]
}

export interface Attachment {
  filename: string
  path: string
}


export class EmailService {
  private transport = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor(){}

  async sendEmail( options: SendEmailOptions ):Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options
    const { transport } = this
    
    try {
      const sendInformation = await transport.sendMail({ 
        to: to, 
        subject: subject, 
        html: htmlBody,
        attachments: attachments
      })

      console.log(sendInformation)
      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithLogsOfSystem( to: string | string[] ) {
    const logs = ['logs-all', 'logs-high', 'logs-medium']

    const subject = 'NOC System - Reporte Diario'

    const htmlBody = `
      <h2>NOC System - Reporte Diario</h2>
      <p>A continuacion se adjuntan los logs del sistema del día ${new Date().toLocaleDateString()}</p>
    `

    const attachments: Attachment[] = logs.map((log) => ({
      filename: log,
      path: `./logs/${log}.log`  
    }))

    return this.sendEmail({to, subject, htmlBody, attachments})
  }
}