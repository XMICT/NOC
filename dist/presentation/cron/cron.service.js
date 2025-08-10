import { CronJob } from 'cron';
export class CronService {
    static createJob(time, onThick) {
        const job = new CronJob(time, onThick);
        job.start();
    }
}
//# sourceMappingURL=cron.service.js.map