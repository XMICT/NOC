export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export class LogEntity {
  public level: LogSeverityLevel //Enum
  public message: string
  public createdAt: Date

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level
    this.message = message
    this.createdAt = new Date()
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(json)

    const log = new LogEntity(level, message)
    log.createdAt = new Date(createdAt)

    return log
  }
}