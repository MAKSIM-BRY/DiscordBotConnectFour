class ConnectFour {
  constructor(_message) {
    console.info('intalisation de la partie');

    this.userOneId = '388770793330442240'; // 388770793330442240
    this.userTowId = 'rtazydfutydfzsdtyf';
    this.botId = '';

    this.message = _message;
    this.messageId = null;
    

    this.grids = [
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [0,1,1,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,2,2,0,0],
      [0,0,0,2,0,0,0]
    ];

    this.createMessage();
  }

  handleGetMessageId = (_id) => {
    this.messageId = _id;
  }

  handleGetBotId = (_id) => {
    this.botId = _id;
  }

  gridToString = () => {
    let stringedGrid = '';
    stringedGrid += '1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣\r\n';
    this.grids.forEach(row => {
      row.forEach(col => {
        switch (col) {
          case 0:
            stringedGrid += '⚪';
            break;
          case 1:
            stringedGrid += '🍟';
            break;
          case 2:
            stringedGrid += '🍔';
            break;
          default:
            break;
        }
      });
      stringedGrid += '\r\n'
    });
    stringedGrid += ''
    return stringedGrid;
  }

  createMessage = () => {
    const string = this.gridToString();
    this.message.channel.send(string)
    .then(mess => {
      this.handleGetMessageId(mess.id);
      this.handleGetBotId(mess.author.id);
      this.initReactions();
    })
    .catch(error => console.error(error));
  }

  initReactions = () => {
    const messageId = this.messageId
    this.message.channel.messages.fetch(messageId)
    .then(msg => msg.react('1️⃣')
      .then(() => msg.react('2️⃣'))
      .then(() => msg.react('3️⃣'))
      .then(() => msg.react('4️⃣'))
      .then(() => msg.react('5️⃣'))
      .then(() => msg.react('6️⃣'))
      .then(() => msg.react('7️⃣'))
    )
    .catch(error => console.error(error));
  }

  takeReacton = (messageReaction, user) => {
    console.log(user.id)
    if (user.id !== this.botId) {
      const userId = user.id;
      if (userId !== this.userOneId && userId !== this.userTowId) {
        this.message.channel.messages.fetch(this.messageId).then(mess => {
          const userReactions = mess.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
          for (const reaction of userReactions.values()) {
            reaction.users.remove(this.userOneId);
          }
        });
      }

      
      // messageReaction.users.remove
      // console.log(this.userTowId, this.userOneId);
      // message.channel.messages.fetch('776461324758155294').then(mess => {
      // mess.reactions.removeAll()
      // this.message.reactions.removeAll()
        // message.reactions.forEach(reaction => reaction.remove('388770793330442240'))
      // })
      // console.log('this.message', this.message);
      // this.message.reactions.removeAll()
      // console.log('this.message.channel.messages.fetch(this.messageId)', this.message.channel.messages.fetch(this.messageId));
      // console.log('messageReaction.users', messageReaction.users)
      // this.message.channel.messages.fetch(this.messageId).then(mess => {
      //   // console.log('mess.reactions.cache', mess.reactions.cache);
      //   
      //   const userReactions = mess.reactions.cache.filter(reaction => {
      //     // console.log(reaction.users.cache.has(this.userOneId))
      //     return reaction.users.cache.has(this.userOneId)
      //   });
      //   // console.log('userReactions', userReactions);
      //   // console.log('userReactions', userReactions.values());
      //   for (const reaction of userReactions.values()) {
      //     // console.log(reaction)
      //     reaction.users.remove(this.userOneId);
      //   }
      //   // mess.reactions.forEach(reaction => {
      //   //   // reaction.remove(UserID),
      //   //   console.log('reactions', reaction);
      //   // })
      // });
      // console.log(messageReaction, user);
    }
  }


}

module.exports = { ConnectFour };