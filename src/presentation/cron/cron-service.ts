import { CronJob } from 'cron'

type cronTime = string | Date
type onThick = () => void

export class CronService {
  static createJob(time: cronTime, onThick: onThick) {
    const job = new CronJob(time, onThick)

    job.start()
  }
}