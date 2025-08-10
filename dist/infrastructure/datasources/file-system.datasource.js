import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";
export class FileSystemDatasource {
    logPath = 'logs/';
    allLogsPath = `${this.logPath}/logs-all.log`;
    mediumLogsPath = `${this.logPath}/logs-medium.log`;
    highLogsPath = `${this.logPath}/logs-high.log`;
    #getLogsFromFile = (path) => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(LogEntity.fromJson);
        return logs;
    };
    constructor() {
        this.createLogsFiles();
    }
    // Crea los directorios y archivos necesarios para almacenar los logs
    createLogsFiles() {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (fs.existsSync(path))
                return;
            fs.writeFileSync(path, '');
        });
    }
    async saveLog(log) {
        const logAsJson = `${JSON.stringify(log)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);
        let fileToSave = '';
        switch (log.level) {
            case LogSeverityLevel.low: return;
            case LogSeverityLevel.medium:
                fileToSave = this.mediumLogsPath;
                break;
            case LogSeverityLevel.high:
                fileToSave = this.highLogsPath;
                break;
        }
        fs.appendFileSync(fileToSave, logAsJson);
    }
    async getLogs(severityLevel) {
        switch (severityLevel) {
            case LogSeverityLevel.low: {
                return this.#getLogsFromFile(this.allLogsPath);
            }
            case LogSeverityLevel.medium: {
                return this.#getLogsFromFile(this.mediumLogsPath);
            }
            case LogSeverityLevel.high: {
                return this.#getLogsFromFile(this.highLogsPath);
            }
            default: {
                return this.#getLogsFromFile(this.allLogsPath);
            }
        }
    }
}
//# sourceMappingURL=file-system.datasource.js.map