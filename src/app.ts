import { envs } from "./config/plugins/envs.plugin.ts"
import { MongoDB } from "./data/mongo/init.ts"
import LogModel from "./data/mongo/models/log.model.ts"
import { ServerApp } from "./presentation/server-app.ts"

(async () => {
  main()
})()

async function main() {
  await MongoDB.connect({
    dbUri: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
    dbPass: envs.MONGO_PASS,
    dbUser: envs.MONGO_USER
  })

  const newLog = await LogModel.create({
    message: 'Hello world from mongoose',
    level: 'high',
    origin: 'app.ts'
  })

  ServerApp.start()
}