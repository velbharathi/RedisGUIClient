const Redis = require("ioredis");
const config = require("../config/redis");
let Connection = require("./connection");
const connections = {}

/**
 * sets the client object in the connections object
 *
 * @param {String} host
 * @param {Connection} connection
 */
function setConnection(host, connection){
    connections[host] = connection;
}

config.redis.forEach(redisDetails=>{
    
    
})

// let d = () => console.log(connections["localhost"].isConnected);
// setInterval(d, 5000);



/**
 * returns the list of available hosts
 * 
 * @returns {arrayof String}
 */
function getHosts(){
    return config.redis.map(details=> details.host);
}


/**
 *Returns the Connection object of the requested host if available
 *
 * @param {String} host
 * @returns {Connection}
 */
function getConnection(host){
    return new Promise((resolve, reject)=>{
    try{

        // check and return the existing connection object if available in connections object
        if(connections[host] && connections[host].isConnected){
            console.log("connection already available returning existing connection", connections[host])
            return resolve(connections[host]);
        }

        let getHostDetails = config.redis.filter(details=>details.host === host );

        if(getHostDetails.length < 0){
            resolve(new Connection({host}, new Error("Host not found"), null))
        }
        let redisDetails = getHostDetails[0];


        let client = new Redis(redisDetails);
        client.on("error",(err)=>{
            console.log("error establishing redis connections: ",err);
            return reject(err);
        })
        client.on("ready", ()=>{
            
        })
        client.on("connect", ()=>{
            const connection = new Connection(redisDetails, null, client);
            setConnection(redisDetails.host, connection);
            return resolve(connection);
        })
        
    }catch(e){
        console.log("Error establishing connection to: ", e);
    }
})
}

module.exports ={ 
    getHosts,
    getConnection
}