module.exports = async (client, message) => {
  if (message.author.bot) return;

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(
      `My prefix on this guild is \`${client.config.prefix}\``
    );
  }

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member)
    await message.guild.members.fetch(message.author);

  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send(
      "This command is unavailable via private message. Please run this command in a guild."
    );

  if (!client.config.owners.includes(message.author.id))
    return message.channel.send("you do not have permissions to do this");
  client.logger.cmd(
    `[CMD] ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`
  );
  cmd.run(client, message, args);
};
