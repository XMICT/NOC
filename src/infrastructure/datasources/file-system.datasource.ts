import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'logs/'
  private readonly allLogsPath = `${this.logPath}/logs-low.log`
  private readonly mediumLogsPath = `${this.logPath}/logs-low.log`
  private readonly highLogsPath = `${this.logPath}/logs-low.log`

  constructor() {
    this.createLogsFiles()
  }

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

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLogs(): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}