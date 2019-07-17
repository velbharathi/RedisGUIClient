const config = {
    "redis":[{
        "port": 15470,
        "host": "redis-15470.c89.us-east-1-3.ec2.cloud.redislabs.com",
        "password": "G6Sc1xcOVVNgWqI1zDPoDPEiqwRjWfPk"
    },{
        host: "localhost",
        port: 6379

    }],
    "dbConfig": require("./dbConfig")
}

module.exports = {
    config
}