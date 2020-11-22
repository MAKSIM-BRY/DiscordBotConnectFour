require('dotenv').config()

const { ConnectFour } = require('./ConnectFour');

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log('I am ready!');
});

const prefix = '!';

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args[0].toLowerCase();

  if (command === 'init') {
    let mentionnedId = args[1];
    if (mentionnedId === undefined) {
      const embed = new MessageEmbed()
      .setTitle('Erreur')
      .setColor(0xff0000)
      .setDescription('Vous dever mentionner un joueur, pour débuter la partie.');
      message.channel.send(embed);
    return;
    }
    if (mentionnedId.startsWith('<@') && mentionnedId.endsWith('>')) {
      mentionnedId = mentionnedId.slice(3, -1);
    } else {
      const embed = new MessageEmbed()
      .setTitle('Erreur')
      .setColor(0xff0000)
      .setDescription('Vous dever mentionner un utilisateur.');
      message.channel.send(embed);
      return;
    }
    const connectFour = new ConnectFour(message, mentionnedId);
    client.on('messageReactionAdd', (messageReaction, user) => {
      connectFour.takeReacton(messageReaction, user);
    });
  }

});

client.login(process.env.TOKEN);