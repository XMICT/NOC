import { LogRepository } from "../repository/log.repository.js";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js";
import { EmailService } from "../../presentation/email/email.service.js";
export class SendEmailLog {
    emailService;
    logRepository;
    constructor(emailService, logRepository) {
        this.emailService = emailService;
        this.logRepository = logRepository;
    }
    async execute(to) {
        const { logRepository } = this;
        try {
            const sentEmail = await this.emailService.sendEmailWithLogsOfSystem(to);
            if (!sentEmail)
                throw new Error('Email log not sent');
            const log = new LogEntity({
                message: 'Log email sent',
                level: LogSeverityLevel.low,
                origin: 'send-email-logs-service',
            });
            logRepository.saveLog(log);
        }
        catch (error) {
            const log = new LogEntity({
                message: 'Email not sent',
                level: LogSeverityLevel.high,
                origin: 'send-email-logs-service'
            });
            logRepository.saveLog(log);
        }
        return true;
    }
}
//# sourceMappingURL=send-email-logs-service.js.map