//IMPORT FILE DATA

const { change_status } = require("../../modules/functions");
const figlet = require('figlet');
const chalk = require('chalk');

// HERE THE EVENT STARTS
module.exports = async (client) => {
console.log(chalk.yellow(`BlackList's Bot Is Ready ${client.user.tag}\n Guilds: ${client.guilds.cache.size}`))
    change_status(client);
  figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {console.log('Something went wrong'); console.dir(err);}
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   

};