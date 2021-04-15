if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("ayy bro u need node 12 or higher to get funky with the bot");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const config = require("./config.js");

const client = new Discord.Client({
  ws: {
    intents: config.intents
  }
});

client.config = config;
client.logger = require("./modules/logger");

require("./modules/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.login(client.config.token);
};

init();
