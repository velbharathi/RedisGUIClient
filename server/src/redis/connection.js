
class Connection {
    constructor(connectionDetails, error, client){
        this.connectionDetails = connectionDetails;
        this.error = error;
        this.client = client;
    }

    // set error(error){
    //     this.connection = null;
    //     this.error = error;
    // }

    // set connection(connection){
    //     this.connection = connection;
    //     this.error = null;
    // }

    // get connection(){
    //     if(this.isConnected()){
    //         return this.connection;
    //     }else{

    //     }
    // }

    // get host(){
    //     return this.connectionDetials.host;
    // }

    reconnect(){
        
    }

    get isConnected(){
        // console.log("thie", this.connection, this.connection.connected)
        return this.client && this.client.connected;
    }
}

module.exports = Connection;


// {
//     "port": 15470,
//     "host": "redis-15470.c89.us-east-1-3.ec2.cloud.redislabs.com",
//     "password": "G6Sc1xcOVVNgWqI1zDPoDPEiqwRjWfPk"
// }
// ,