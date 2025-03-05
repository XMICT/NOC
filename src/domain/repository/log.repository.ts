import { LogEntity } from '../entity/log.entity';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(): Promise<LogEntity[]>
}