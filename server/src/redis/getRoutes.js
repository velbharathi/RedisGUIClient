var express = require('express');

const GET = require("./getController");

const RedisGetRoutes = function(APP){
    APP.route("/redis").get((req, res)=>{ 
        console.log("returning hosts")
        return res.status(200).send(GET.getHosts())
    })

    APP.route("/redis/:host").get(async (req, res)=>{
        console.log("hostname", req.params.host)
        let valur = await GET.getServerInfo(req.params.host)
        console.log("valureer erereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",valur);
        return res.status(200).send(valur)
    })

    APP.route("/redis/:host/db").get(async (req, res)=>{
        console.log("db query", req.params.host);
        let databases = await GET.getDatabases(req.params.host);
        console.log(databases)
        return res.status(200).send(GET.getConnections());
    })

    APP.route("/redis/info").get((req, res)=>{
        console.log("connection info", req.query.connection_name)
        return res.status(200).send(GET.getConnectionInfo(req.query.connection_name));
    })

    APP.route("/redis/:host/db/:db").get(async (req, res)=>{
        let { host, db } = req.params; 
        console.log("host: ", host, "db: ", db);
        let stream = await GET.getDatabase(host, db);
        stream.on("data", (result)=>{
            console.log(" data resoult ", arguments);
            res.write(JSON.stringify(result));
        })
        stream.on("end", (data)=>{
            console.log('stream ends ', data)
            res.end();
        })
        // return res.status(200).send(response);
    })
}

module.exports = RedisGetRoutes;