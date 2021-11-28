global.logger = require('tracer').colorConsole();
const App = require('./app');
const http = require('http');
const Knex = require('knex');

const serverStart = async () => {
  let PORT_HTTP = 1337;
  let server = this;
  server.rds = Knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3307,
      user : 'db_user',
      password : 'db_pass',
      database : 'maindb'
    }
  });

  const app = App(server);

  // start the server
  http.createServer(app.callback()).listen(PORT_HTTP);  
  logger.log(`Server listening on port: ${PORT_HTTP}`);
};

serverStart()
  .catch((err)=>{
    logger.error(err);
  });
