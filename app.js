var cluster = require('cluster'),
http = require('http');

let workerMap = {};

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    console.log("System has a total of " + cpuCount + " nodes\n");
    console.log("Setting up system...\n")
    for (i = 1; i <= cpuCount; i++) {
      forking(i);
    }

    cluster.on('exit', function (worker) {
      errorMsg()
      console.error('Master died :(. New Master elected');
      forking(workerMap[worker.id]);
      delete workerMap[worker.id];
    });

}else {
  setupServer();
} 

function errorMsg() {
  console.error('\nSomething must be wrong with the connection...');
}


function forking(i){
  let map = {}
  map['SERVER_NAME'] = 'node' + i;
  try{
     let worker = cluster.fork(map);
     workerMap[worker.id] = i
     console.log('new node' + i + ' added');
  }catch(e){
    console.error('Error during setting up worker')
  }
}

function setupServer(){

  var server = http.createServer(function(req, res){
   res.writeHead(200);
   res.end("I am server "+ process.env.SERVER_NAME);
   console.log("Master is " + process.env.SERVER_NAME + " with process id: " + process.pid );
 });

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(3000);
}
