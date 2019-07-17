let RedisConnector = require("./connector");
let fs = require("fs");
var express = require('express');
let ServerInfoParser = require("./bulk_string_to_json");
console.log(RedisConnector.getHosts())
// setInterval(()=>console.log(RedisConnector.getConnection("localhost").then(connection=> console.log("wheeeeee",connection.connectionDetails))), 10000 );

let sendCommand = async (client, command, arguements) =>{
    let info = await client.info();
    // let keys = await client.keys("*");
    let commands = client.getBuiltinCommands();
// fs.writeFile('temp.txt', keys, function(err, data){
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// });
    return new Promise((resolve, reject)=>{
        
        console.log("send command ", command);

        client.sendCommand(command, arguements, (err, reply)=>{
            console.log("reply", reply)
            if(err){
                reject(err);
            }
            resolve(reply);
        })
    })
}

/**
 * returns the number of avaiable databases in redis server
 * the second parameter is optional so have added connection logic below
 * 
 * @param {String} host 
 * @param {RedisClient} connection 
 */
let getDatabases = async function(host, client) {
    return new Promise(async (resolve, reject)=>{

        // if the client is null/undefined get and set client object
        if(!client){
            let connectionPromise = await RedisConnector.getConnection(host);
            client = connectionPromise.client;
        }

        let resp = await client.config("get", "databases");
        console.log("send command ", resp)
        // , function(err, reply){
        //     if(err){
        //         return reject(err);
        //     }

            return resolve(resp)
        // })
    })
}

let serverInfo = async (host) => {
    let connection = await RedisConnector.getConnection(host);
    let client = connection.client;

    let info = await client.info();
    // console.log("fetch server info : ", host, connection)
    let dbsize = await client.config("get", "databases");
    // fs.writeFile("temp.json", info.toString(), (err, data)=>{
    //     if(err){
    //         console.log("error writing to file", err)
    //     }

    //     console.log("db size", dbsize);
    // })

    let response = info;

    let databases = await getDatabases(host, connection.client);
    let serverInfo = ServerInfoParser(response, "\r\n", ":");
    let keyspace = serverInfo.keyspace;
    for(let i = 0; i< +databases[1]; i++){
        let db = `db${i}`;
        if(!keyspace[db]){
            let dbObj = {keys:0, expires: 0, avg_ttl: 0}
            keyspace = {...keyspace, [db]: dbObj};
        }
    }
    serverInfo = Object.assign(serverInfo, {keyspace: keyspace})
    console.log("server info ", serverInfo)
    return serverInfo;
}

let getDatabase = async function(host, db){
    let {client} = await RedisConnector.getConnection(host);
    await client.select(db);
    
    // let resp = await client.keys("*");
    let stream = client.scanStream({match: '*'});

    console.log("resp", stream)

    return stream;
}

let GET = {
    getHosts: RedisConnector.getHosts,
    getServerInfo: serverInfo,
    getConnections: function(res){
        let response = {servers:[]}
        // for(let [key, value] of Object.entries(connections)){
        // try{
        //     console.log("key", [key])
        //     console.log("key, value",key, value.get("foo"))
        //     response.servers.push(key);
            
        // }catch(e){
        //     console.log("error dude",e)
        // }
        // }
        return response;
    },
    getDatabases,
    getDatabase
}

module.exports = GET;