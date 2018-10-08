var cluster = require('cluster'),
http = require('http');

let workerMap = {};

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length; //Using CPU cores count to create pool of nodes.
    console.log("System has a total of " + cpuCount + " cores\n");
    console.log("Setting up distributed system...\n")
    for (i = 1; i <= cpuCount; i++) {
      addNode(i);
    }

    //When a node dies, a new master is elected and old one added back to the pool.
    cluster.on('exit', function (worker) {
      errorMsg()
      console.error('Master died :(. New Master elected');
      addNode(workerMap[worker.id]);
      delete workerMap[worker.id];
    });

}else {
  setupServer();
} 

function errorMsg() {
  console.error('\nSomething must be wrong with the connection...');
}


//To add node to the distributed network
function addNode(i){
  let map = {}
  map['SERVER_NAME'] = 'node' + i;
  try{
     let worker = cluster.fork(map);
     workerMap[worker.id] = i
     console.log('node' + i + ' added to the pool');
  }catch(e){
    console.error('Error during setting up worker')
  }
}

//Setting up the App server to server request on port 3000
function setupServer(){

  var server = http.createServer(function(req, res){
   res.writeHead(200);
   res.end("I am server "+ process.env.SERVER_NAME);
   console.log("\nMaster is " + process.env.SERVER_NAME + " with process id: " + process.pid );
 });

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(3000);
}
