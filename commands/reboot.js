exports.run = async (client, message, args) => {
  if (message.author.id != client.config.ownerID) {
    await message.channel.send("oi m8 u cant run that ur not my owner");
    return;
  }
  await message.reply("rebooting");
  await Promise.all(client.commands.map(cmd => client.unloadCommand(cmd)));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "reboot",
  description: "Reboots the bot",
  usage: "reboot"
};
