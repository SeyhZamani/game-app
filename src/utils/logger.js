const path = require('path');
const moment = require('moment');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.colorize(),
        format.printf((info) => `${moment(info.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')} ${info.level} [${info.label}]: ${info.message}`),
    ),
    transports: [new transports.Console()],
});

module.exports = logger;
