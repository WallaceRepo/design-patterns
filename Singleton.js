// Singleton is the way of creating Single Object that is shared among bunch other objects throughout my app, without having to recreate it. All the states, methods, variables of that object is shared among other objects, they don't create their version of instance, just uses the existing one.
// We use singleton db instance and reuse this same inctance everytime we access our tables. 
class FancyLogger {
    constructor() {
        if (FancyLogger.instance == null) {
              this.logs = []
              FancyLogger.instance = this
        }
        return FancyLogger.instance
    }
log(message) {
    this.logs.push(message)
    console.log(`Fancy:  ${message}`)
}
printLogCount() {
    console.log(` ${this.logs.length} Logs`)
}
}

const logger = new FancyLogger();
Object.freeze(logger);


logger.printLogCount();
logger.log('Second File')
logger.log('Third File')
logger.log('Ford File')
logger.printLogCount()
console.log('---------')

class Logger {
    constructor() {
       this.logs = []
    }
log(message) {
    this.logs.push(message)
    console.log(`Fancy:  ${message}`)
}
printLogCount() {
    console.log(` ${this.logs.length} Logs`)
 }
}

const logger1 = new Logger();
const logger2 = new Logger();
const logger3 = new Logger();

logger.printLogCount();
logger1.log('Second File')
logger2.log('Third File')
logger3.log('Ford File')

logger2.printLogCount()
logger3.printLogCount()
logger1.printLogCount()

/* 
0 Logs
Fancy:  Second File
Fancy:  Third File
Fancy:  Ford File
 3 Logs
---------
3 Logs
Fancy:  Second File
Fancy:  Third File
Fancy:  Ford File
 1 Logs
 1 Logs
 1 Logs
*/
class Query {
    constructor(){
    this.log = []
    }
    add(text) {
        this.log.push(text)
    }
    logger() {
        return this.log.length
    }
}

const logger1 = new Query();
logger1.add('Today is day')
logger1.add('Yes, practice');
console.log(logger1.logger());
const logger2 = new Query();
logger2.add('Today is day')
logger2.add('Yes, practice');
console.log(logger2.logger());

console.log(Query.instance) // undefined
console.log('--------------------')
class Query1 {
    constructor(){
    if(Query1.instance == null) {
        this.log = []
        Query1.instance = this
    }
    return Query1.instance
    }
    add(text){
        this.log.push(text)
    }
    logger() {
        return this.log.length
    }
}

const loggers1 = new Query1();
loggers1.add('Today is day')
loggers1.add('Yes, practice');
console.log(loggers1.logger());

const loggers2 = new Query1();
loggers2.add('Today is day')

console.log(loggers2.logger()); 
console.log(Query1.instance)

/*
2
2
undefined
--------------------
2
3
Query1 { log: [ 'Today is day', 'Yes, practice', 'Today is day' ] }
