import { envs } from "./config/plugins/envs.plugin.js";
import { MongoDB } from "./data/mongo/init.js";
import LogModel from "./data/mongo/models/log.model.js";
import { ServerApp } from "./presentation/server-app.js";
(async () => {
    main();
})();
async function main() {
    await MongoDB.connect({
        dbUri: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
        dbPass: envs.MONGO_PASS,
        dbUser: envs.MONGO_USER
    });
    const newLog = await LogModel.create({
        message: 'Hello world from mongoose',
        level: 'high',
        origin: 'app.ts'
    });
    // Consultar logs guardados
    // const highLogs = await LogModel.find({
    //   level: 'high'
    // })
    // console.log('High logs: ', highLogs)
    ServerApp.start();
    // console.log(envs)
}
//# sourceMappingURL=app.js.map