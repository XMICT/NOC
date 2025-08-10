import { LogSeverityLevel } from "../domain/entities/log.entity.ts"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.ts"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.ts"
import { EmailService } from "./email/email.service.ts"

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoDatasource
)

const sendEmailService = new EmailService()

export class ServerApp {

  static async start() {
    console.log('Server started...')

    // Servicio de correos
    //const url = 'https://google.com'
    // new SendEmailLog(
    //   // Dependency Injection
    //   sendEmailService,
    //   fileSystemRepository
    // ).execute(['guardiola.cev@gmail.com', 'carlosguardiola2001@gmail.com'])

    // const url = 'https://google.com'
    // CronService.createJob(
    //   '*/2 * * * * *',
    //   () => {

    //     new CheckService(
    //       logRepository,
    //       () => { console.log(`${url} is works `) },
    //       (error) => { console.log(error) }
    //     ).execute(url)
    //     //new CheckService().execute('https://google.com')
    //   }
    // )

    const logs = logRepository.getLogs(LogSeverityLevel.high)
  }
}