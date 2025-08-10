import { LogRepository } from "../repository/log.repository.ts"
import { LogEntity, LogSeverityLevel } from "../entities/log.entity.ts"
import { EmailService } from "../../presentation/email/email.service.ts"

interface SendEmailLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}


export class SendEmailLog implements SendEmailLogsUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) { }

  async execute(to: string | string[]) {
    const { logRepository } = this

    try {
      const sentEmail = await this.emailService.sendEmailWithLogsOfSystem(to)
      if (!sentEmail) throw new Error('Email log not sent')

      const log = new LogEntity({
        message: 'Log email sent',
        level: LogSeverityLevel.low,
        origin: 'send-email-logs-service',
      })

      logRepository.saveLog(log)
    } catch (error) {
      const log = new LogEntity({
        message: 'Email not sent',
        level: LogSeverityLevel.high,
        origin: 'send-email-logs-service'
      })

      logRepository.saveLog(log)
    }
    return true
  }
}