import { CheckService } from "../domain/use-cases/check-service.js"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js"
import { CronService } from "./cron/cron-service.js"

const fileSystemRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

export class ServerApp {

  static start() {
    console.log('Server started...')

    const url = 'http://localhost:3000'
    //const url = 'https://google.com'
    CronService.createJob(
      '*/2 * * * * *',
      () => {

        new CheckService(
          fileSystemRepository,
          () => { console.log(`${url} is works `) },
          (error) => { console.log(error) }
        ).execute(url)
        //new CheckService().execute('https://google.com')
      }
    )
  }

  constructor(/** Dependency injection */) {

  }
}