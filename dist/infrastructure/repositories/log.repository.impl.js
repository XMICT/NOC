import { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";
import { LogRepository } from "../../domain/repository/log.repository.js";
export class LogRepositoryImpl {
    logDatasource;
    // Inyeccion de dependencias - Forma entendible
    // constructor(logDataSource: LogDatasource){
    //   this.logDatasource = logDataSource
    // }
    // Instancia la variable
    constructor(logDatasource) {
        this.logDatasource = logDatasource;
    }
    async saveLog(log) {
        this.logDatasource.saveLog(log);
    }
    async getLogs(severityLevel) {
        return this.logDatasource.getLogs(severityLevel);
    }
}
//# sourceMappingURL=log.repository.impl.js.map