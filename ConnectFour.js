class ConnectFour {
  constructor(_message, _userTowId) {

    this.userOneId = _message.author.id;
    this.userTowId = _userTowId;
    this.botId = '';

    this.endGame = false;

    this.userTurnId = this.userTowId;

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

  changeTurnPlayer = () => {
    if (this.userTurnId === this.userOneId) {
      this.userTurnId = this.userTowId;
    } else if (this.userTurnId === this.userTowId) {
      this.userTurnId = this.userOneId;
    }
  }

  verifyVictory = () => {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < this.grids[x].length; y++) {
        if (this.grids[x][y] == this.grids[x + 1][y] &&
          this.grids[x][y] == this.grids[x + 2][y] &&
          this.grids[x][y] == this.grids[x + 3][y] &&
          this.grids[x][y] !== 0) {
          return true;
        }
      }
    }
    for (let x = 0; x < this.grids.length; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.grids[x][y] == this.grids[x][y + 1] &&
          this.grids[x][y] == this.grids[x][y + 2] &&
          this.grids[x][y] == this.grids[x][y + 3] &&
          this.grids[x][y] !== 0) {
          return true;
        }
      }
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.grids[x][y] == this.grids[x + 1][y + 1] &&
          this.grids[x][y] == this.grids[x + 2][y + 2] &&
          this.grids[x][y] == this.grids[x + 3][y + 3] &&
          this.grids[x][y] !== 0) {
          return true;
        }
      }
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 3; y < 7; y++) {
        if (this.grids[x][y] == this.grids[x + 1][y - 1] &&
          this.grids[x][y] == this.grids[x + 2][y - 2] &&
          this.grids[x][y] == this.grids[x + 3][y - 3] &&
          this.grids[x][y] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  hadPawn = (colonne, userId) => {
    let valueOfCell = 0;
    if (userId === this.userOneId) {
      valueOfCell = 1;
    }else if(userId === this.userTowId) {
      valueOfCell = 2;
    }

    const col = colonne - 1;
    for (let row = this.grids.length - 1; row >= 0; row--) {
      const element = this.grids[row][col];
      if (element === 0) {
        this.grids[row][col] = valueOfCell;
        if(this.verifyVictory()) {
          this.endGame = true;
          this.editMessage();
        } else {
          this.changeTurnPlayer();
        }
        break;
      }
    }
  }

  gridToString = () => {
    let stringedGrid = '';
    if (this.endGame) {
      stringedGrid += `Victoire de <@!${this.userTurnId}> \r\n`;
    } else {
      stringedGrid += `Au tour de <@!${this.userTurnId}> \r\n`;
    }
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
    this.message.channel.messages.fetch(this.messageId)
    .then(mess => mess.edit(this.gridToString()))
    .catch(error => console.error(error));
  }

  initReactions = () => {
    const messageId = this.messageId;
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
    if (user.id !== this.botId && messageReaction.message.id === this.messageId && !this.endGame) {
      const userId = user.id;
      if ((userId !== this.userOneId && userId !== this.userTowId) || userId !== this.userTurnId) {
        this.message.channel.messages.fetch(this.messageId)
        .then(mess => {
          const userReactions = mess.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
          for (const reaction of userReactions.values()) {
            reaction.users.remove(userId);
          }
        })
        .catch(error => console.error(error));
        return;
      }
      const numberCol = Object.keys(this.objectNumberEmoji).find(key => this.objectNumberEmoji[key] === messageReaction.emoji.name);
      if (!numberCol) {
        messageReaction.remove()
      }
      this.hadPawn(numberCol, userId);
      this.editMessage();
      this.message.channel.messages.fetch(this.messageId)
      .then(mess => {
        const userReactions = mess.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
        for (const reaction of userReactions.values()) {
          reaction.users.remove(userId);
        }
      })
      .catch(error => console.error(error));
    }
  }


}

module.exports = { ConnectFour };