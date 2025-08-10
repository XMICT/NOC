import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js";
import { LogRepository } from "../repository/log.repository.js";
// Notificara el estado de un url
export class CheckService {
    logRepository;
    succesCallback;
    errorCallback;
    // Dependency Injection
    constructor(logRepository, succesCallback, errorCallback) {
        this.logRepository = logRepository;
        this.succesCallback = succesCallback;
        this.errorCallback = errorCallback;
    }
    async execute(url) {
        try {
            const respone = await fetch(url);
            if (!respone.ok)
                throw new Error(`${url} url is not available`);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service with url ${url} is working`,
                origin: 'check-service.ts',
                createdAt: new Date()
            });
            this.logRepository.saveLog(log);
            this.succesCallback();
            return true;
        }
        catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.errorCallback(`${error}`);
            return false;
        }
    }
}
//# sourceMappingURL=check-service.js.map