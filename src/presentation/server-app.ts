import { CheckService } from "../domain/use-cases/check-service"
import { CronService } from "./cron/cron-service"

export class ServerApp {

  static start() {
    console.log('Server started...')

    const url = 'http://localhost:3000'
    CronService.createJob(
      '*/2 * * * * *',
      () => {
        new CheckService(
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