import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js"
import { LogRepository } from "../repository/log.repository.js"

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SucccesCallback = () => void
type ErrorCallback = (error: string) => void

// Notificara el estado de un url
export class CheckService implements CheckServiceUseCase {

  // Dependency Injection
  constructor(
    private readonly logRepository: LogRepository,
    private readonly succesCallback: SucccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const respone = await fetch(url)

      if (!respone.ok) throw new Error(`${url} url is not available`)

      const log = new LogEntity(LogSeverityLevel.low, `Service with url ${url} is working`)
      this.logRepository.saveLog(log)

      this.succesCallback()
      return true

    } catch (error) {
      const log = new LogEntity(LogSeverityLevel.high, `${error}`)
      this.logRepository.saveLog(log)

      this.errorCallback(`${error}`)
      return false
    }
  }
}