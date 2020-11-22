require('dotenv').config()
const { CClass } = require('./class');

const { ConnectFour } = require('./ConnectFour');

const { Client, MessageEmbed, MessageReaction, Emoji } = require('discord.js');
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

  if (command === 'test') {
    let messageId = null;
    message.channel.send('test')
    .then(mess =>  messageId = mess.id)
    .catch(error => console.error(error));
    console.log(messageId)
    // console.log(message.mentions.users.first())
  }

  // if (command === 'removeReact') {
  //   
  // }

  if (message.content === 'a') {
    // const embed = new MessageEmbed()
    //   .setTitle('A slick little embed')
    //   .setColor(0xff0000)
    //   .setDescription('Hello, this is a slick embed!');
    // message.channel.send(embed);
    // const mess = new MessageReaction(client, {}, 'testtest');
    message.channel.send('b').then(msg => console.log(msg.id));
    
    // message.channel.messages.fetch().filter(msg => msg.content === 'ping').then(msg =>{console.log(msg)});
  }
  if (command === 'leo') {
    message.channel.send('coucou léo');
    message.channel.messages.fetch('779721371731230781').then(mess => {
      mess.reactions.removeAll()
      // message.reactions.forEach(reaction => reaction.remove('388770793330442240'))
    })
  }
  if (message.content === 'b') {
    // const embed = new MessageEmbed()
    //   .setTitle('A slick little embed')
    //   .setColor(0xff0000)
    //   .setDescription('Hello, this is a slick embed!');
    // message.channel.send(embed);
    // const mess = new MessageReaction(client, {}, 'testtest');
    // message.channel.send('b').then(msg => console.log(msg.id));
    message.channel.messages.fetch('776461324758155294')
    .then(msg => msg.react('1️⃣'))
    .then(msg => msg.react('2️⃣'))
    .then(msg => msg.react('3️⃣'))
    .then(msg => msg.react('4️⃣'))
    .then(msg => msg.react('5️⃣'))
    .then(msg => msg.react('6️⃣'))
    .then(msg => msg.react('7️⃣'))
    .catch(error => console.error(error));
    // message.channel.messages.fetch().filter(msg => msg.content === 'ping').then(msg =>{console.log(msg)});
  }
});
// 776461324758155294

client.login(process.env.TOKEN);