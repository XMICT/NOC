import { LogDatasource } from '../../domain/datasources/log.datasource.js';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";
import { LogRepository } from "../../domain/repository/log.repository.js";

export class LogRepositoryImpl implements LogRepository {

  // Inyeccion de dependencias - Forma entendible
  // constructor(logDataSource: LogDatasource){
  //   this.logDatasource = logDataSource
  // }

  // Instancia la variable
  constructor(private readonly logDatasource: LogDatasource) { }

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel)
  }

}