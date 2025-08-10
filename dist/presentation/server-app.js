import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { EmailService } from "./email/email.service.js";
const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());
const sendEmailService = new EmailService();
export class ServerApp {
    static async start() {
        console.log('Server started...');
        // Servicio de correos
        //const url = 'https://google.com'
        // new SendEmailLog(
        //   // Dependency Injection
        //   sendEmailService,
        //   fileSystemRepository
        // ).execute(['guardiola.cev@gmail.com', 'carlosguardiola2001@gmail.com'])
        //const url = 'https://google.com'
        // CronService.createJob(
        //   '*/2 * * * * *',
        //   () => {
        //     new CheckService(
        //       fileSystemRepository,
        //       () => { console.log(`${url} is works `) },
        //       (error) => { console.log(error) }
        //     ).execute(url)
        //     //new CheckService().execute('https://google.com')
        //   }
        // )
    }
    constructor( /** Dependency injection */) {
    }
}
//# sourceMappingURL=server-app.js.map