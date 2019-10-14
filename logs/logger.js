const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');

//define custom log format
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  transports: [
    new winstonDailyRotateFile({
      format: logFormat,
      filename: './logs/access-log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info'
    }),
    new winston.transports.Console({
      level:'info'
    })
  ]
});
module.exports = logger;