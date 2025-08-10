import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource.ts";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.ts";

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'logs/'
  private readonly allLogsPath = `${this.logPath}/logs-all.log`
  private readonly mediumLogsPath = `${this.logPath}/logs-medium.log`
  private readonly highLogsPath = `${this.logPath}/logs-high.log`

  #getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8')
    const logs = content.split('\n').map(LogEntity.fromJson)

    return logs
  }

  constructor() {
    this.createLogsFiles()
  }

  // Crea los directorios y archivos necesarios para almacenar los logs
  createLogsFiles() {
    if (!fs.existsSync(this.logPath)) { fs.mkdirSync(this.logPath) }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach((path) => {
      if (fs.existsSync(path)) return

      fs.writeFileSync(path, '')
    })

  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`

    fs.appendFileSync(this.allLogsPath, logAsJson)

    let fileToSave = ''
    switch (log.level) {
      case LogSeverityLevel.low: return
      case LogSeverityLevel.medium:
        fileToSave = this.mediumLogsPath
        break
      case LogSeverityLevel.high:
        fileToSave = this.highLogsPath
        break
    }

    fs.appendFileSync(fileToSave, logAsJson)
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low: {
        return this.#getLogsFromFile(this.allLogsPath)
      }
      case LogSeverityLevel.medium: {
        return this.#getLogsFromFile(this.mediumLogsPath)
      }
      case LogSeverityLevel.high: {
        return this.#getLogsFromFile(this.highLogsPath)
      }
      default: {
        return this.#getLogsFromFile(this.allLogsPath)
      }
    }
  }
}