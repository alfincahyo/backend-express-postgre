const log = require('winston');
const crypto = require('crypto-js');

const generateLogId = () => crypto.AES.encrypt(new Date().toISOString(), '321Log123').toString();
const { combine, timestamp, json, printf, colorize } = log.format;
const timestampFormat = 'DD-MMM-YYYY HH:mm:ss';

module.exports = {
  // Logger for API endpoints
  httpLogger: log.createLogger({
    level: 'info',
    format: combine(
      timestamp({ format: timestampFormat }),
      json(),
      printf(({ timestamp, level, message, ...data }) => {
        const response = {
          level,
          logId: generateLogId(),
          timestamp,
          message,
          data,
        };

        return JSON.stringify(response);
      })
    ),
    transports: [
      new log.transports.File({
        filename: 'logs/combined.log',
      }),
      new log.transports.Console(),
    ],
  }),
  
  // Format HTTP logger response
  formatHTTPLoggerResponse: (
    req,
    res,
    responseBody // object or array sent with res.send()
  ) => {
  
    return {
      request: {
        headers: req.headers,
        host: req.headers.host,
        baseUrl: req.baseUrl,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req?.params,
        query: req?.query,
      },
      response: {
        headers: res.getHeaders(),
        statusCode: res.statusCode,
        body: responseBody,
      }
    }
  }
};

