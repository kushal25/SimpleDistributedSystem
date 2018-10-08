# SimpleDistributedSystem

Distributed Systems

Implement a system with multiple processes/nodes, where at any time, only one of them is the "master" machine/process. This master process runs a HTTP Server which prints out, “I am server X” when someone visits the server, where X is the server identifier (you can choose how you want you want to use for identifiers).

The non-master nodes will simply be waiting for a chance to become the master, in the event that the master dies.

Upon the death of the master machine, a new master must be selected from the slave nodes and it will print out “I am server Y”, where Y is the server identifier of that node.

If the former master node that died comes back alive, it will simply join the group of slave servers in waiting.

At no time can there be more than 1 master running, even in the event of a network split between the nodes.

#Prerequisites
1. Nodejs and npm

#Steps to run

1. Clone the code from the repo and cd into it.
2. npm install
3. Do "node app.js" to run the application
4. Use Postman or browser and hit http://localhost:3000 to start server
5. On making requests, the response would be the node name "I am server node<id>"
6. use kill -9 <master-process-id> to make the master node die. A new master is elected and old master is added to the pool. Verify by making equest again
