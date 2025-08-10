
import type { LogDatasource } from "../../domain/datasources/log.datasource.ts";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity.ts";
import { LogModel } from '../../data/mongo/index.ts';

export class MongoDatasource implements LogDatasource {
    constructor() {}

    async saveLog(log: LogEntity): Promise<void> {
        const logCreated = await LogModel.create(log)
        console.log('Log id:', logCreated.id)
        return
    }

    /**
     * La funcion se encargara de obtener los logs desde la fuente de datos de mongo mapeando las entidades a nuestra entidad
     * @param severityLevel 
     * @returns 
     */
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })

        if (!logs) return []
        return logs.map(LogEntity.fromObject)
    }
}