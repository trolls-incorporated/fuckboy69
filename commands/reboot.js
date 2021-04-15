exports.run = async (client, message, args) => {
  await message.channel.send("ok, rebooting");
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
