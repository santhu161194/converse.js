import { get, isElement } from 'lodash';


const logger = Object.assign({
    'debug': get(console, 'log') ? console.log.bind(console) : function noop () {},
    'error': get(console, 'log') ? console.log.bind(console) : function noop () {},
    'info': get(console, 'log') ? console.log.bind(console) : function noop () {},
    'warn': get(console, 'log') ? console.log.bind(console) : function noop () {}
}, console);


/**
 * The log namespace
 * @namespace log
 */
const log = {

    /**
     * The the log-level, which determines how verbose the logging is.
     * @method log#setLogLevel
     * @param { integer } level - The loglevel which allows for filtering of log messages
     */
    setLogLevel(level) {
        if (!['debug', 'info', 'warn', 'error', 'fatal'].includes(level)) {
            throw new Error(`Invalid loglevel: ${level}`);
        }
        this.loglevel = level;
    },

    /**
     * Logs messages to the browser's developer console.
     * Available loglevels are 0 for 'debug', 1 for 'info', 2 for 'warn',
     * 3 for 'error' and 4 for 'fatal'.
     * When using the 'error' or 'warn' loglevels, a full stacktrace will be
     * logged as well.
     * @method log#log
     * @param { string } message - The message to be logged
     * @param { integer } level - The loglevel which allows for filtering of log messages
     */
    log (message, level, style='') {
        if (level === 'error' || level === 'fatal') {
            style = style || 'color: maroon';
        } else if (level === 'debug') {
            style = style || 'color: green';
        }

        if (message instanceof Error) {
            message = message.stack;
        } else if (isElement(message)) {
            message = message.outerHTML;
        }
        const prefix = style ? '%c' : '';
        if (level === 'error') {
            logger.error(`${prefix} ERROR: ${message}`, style);
        } else if (level === 'warn') {
            logger.warn(`${prefix} ${(new Date()).toISOString()} WARNING: ${message}`, style);
        } else if (level === 'fatal') {
            logger.error(`${prefix} FATAL: ${message}`, style);
        } else if (level === 'debug') {
            if (this.loglevel === 'debug') {
                logger.debug(`${prefix} ${(new Date()).toISOString()} DEBUG: ${message}`, style);
            }
        } else if (this.loglevel === 'info') {
            logger.info(`${prefix} ${(new Date()).toISOString()} INFO: ${message}`, style);
        }
    },

    debug (message, style) {
        this.log(message, 'debug', style);
    },

    error (message, style) {
        this.log(message, 'error', style);
    },

    info (message, style) {
        this.log(message, 'info', style);
    },

    warn (message, style) {
        this.log(message, 'warn', style);
    },

    fatal (message, style) {
        this.log(message, 'fatal', style);
    }
}

export default log;
