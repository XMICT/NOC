export var LogSeverityLevel;
(function (LogSeverityLevel) {
    LogSeverityLevel["low"] = "low";
    LogSeverityLevel["medium"] = "medium";
    LogSeverityLevel["high"] = "high";
})(LogSeverityLevel || (LogSeverityLevel = {}));
export class LogEntity {
    level; //Enum
    message;
    origin;
    createdAt;
    constructor(options) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }
    static fromJson = (json) => {
        const { level, message, origin, createdAt } = JSON.parse(json);
        const log = new LogEntity({
            level: level,
            message: message,
            origin: origin,
            createdAt: createdAt
        });
        return log;
    };
}
//# sourceMappingURL=log.entity.js.map