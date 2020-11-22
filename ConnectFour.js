class ConnectFour {
  constructor(_message, _userTowId) {
    console.info('intalisation de la partie');

    this.userOneId = _message.author.id; // 388770793330442240
    this.userTowId = _userTowId;
    this.botId = '';
    this.message = _message;
    this.messageId = null;

    this.objectNumberEmoji = {
      1: '1️⃣',
      2: '2️⃣',
      3: '3️⃣',
      4: '4️⃣',
      5: '5️⃣',
      6: '6️⃣',
      7: '7️⃣',
    };

    this.grids = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];

    this.createMessage();

  }

  handleGetMessageId = (_id) => {
    this.messageId = _id;
  }

  handleGetBotId = (_id) => {
    this.botId = _id;
  }

  hadPawn = (colonne) => {
    const col = colonne - 1;
    for (let row = this.grids.length - 1; row >= 0; row--) {
      const element = this.grids[row][col];
      if (element === 0) {
        this.grids[row][col] = 1;
        break;
      }
    }
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

  editMessage = () => {
    this.message.channel.messages.fetch(this.messageId).then(mess => mess.edit(this.gridToString()));
  }

  initReactions = () => {
    const messageId = this.messageId
    this.message.channel.messages.fetch(messageId)
    .then(msg => msg.react(this.objectNumberEmoji[1])
      .then(() => msg.react(this.objectNumberEmoji[2]))
      .then(() => msg.react(this.objectNumberEmoji[3]))
      .then(() => msg.react(this.objectNumberEmoji[4]))
      .then(() => msg.react(this.objectNumberEmoji[5]))
      .then(() => msg.react(this.objectNumberEmoji[6]))
      .then(() => msg.react(this.objectNumberEmoji[7]))
    )
    .catch(error => console.error(error));
  }

  takeReacton = (messageReaction, user) => {
    if (user.id !== this.botId && messageReaction.message.id === this.messageId) {
      const userId = user.id;
      if (userId !== this.userOneId && userId !== this.userTowId) {
        this.message.channel.messages.fetch(this.messageId).then(mess => {
          const userReactions = mess.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
          for (const reaction of userReactions.values()) {
            reaction.users.remove(this.userOneId);
          }
        });
      }

      const numberCol = Object.keys(this.objectNumberEmoji).find(key => this.objectNumberEmoji[key] === messageReaction.emoji.name)

      if (!numberCol) {
        messageReaction.remove()
      }

      this.hadPawn(numberCol);
      this.editMessage();
      this.message.channel.messages.fetch(this.messageId).then(mess => {
        const userReactions = mess.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
        for (const reaction of userReactions.values()) {
          reaction.users.remove(this.userOneId);
        }
      });

      
    }
  }


}

module.exports = { ConnectFour };