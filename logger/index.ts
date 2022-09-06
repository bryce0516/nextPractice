import pino from 'pino'
import pretty from 'pino-pretty'
import pinoHttp from 'pino-http'
const stream = pretty({
  colorize: true,
});
const logger = pino(
  { level: "info" },
  stream
  //   {
  //   level: "info",
  //   prettyPrint: {
  //     colorize: true,
  //     errorLikeObjectKeys: ["err", "error"],
  //     timestampKey: "time",
  //     translateTime: true,
  //     singleLine: true,
  //   },
  // }
);

const httpLogger = pinoHttp()

export const log = (msg:any) => logger.info(msg)
export const httpLog = (req:any, res:any) => httpLogger(req, res)
export default logger