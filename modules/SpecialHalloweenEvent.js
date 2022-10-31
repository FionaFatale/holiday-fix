const snowflakes = require("../config/snowflakes.json");
u = require("../utils/Utils.Generic");
const Augur = require("augurbot");
const Module = new Augur.Module;
const holidays = [
    {
        name: 'Halloween',
        description: "*T'was the night of all hallows eve when our brave adventurers gathered together in the climbers court. But as they sat down to dine together, they heard a dark laughter from hundreds of throats. It seems the mana construct makers had delved too deep, and released the spirits hidden in a dark chamber deep inside the code. A dark fate awaited the brave adventurers if they failed to trap each of the spirits.*",
        emoji: snowflakes.emoji.specter

    }
]

// on server shutdown this cache should be written to database and also be cleared at the end of event (with database clear too)
cache = [];
class Participant {
    #_user;
    #_count = 1;

    constructor(user) {
        this.#_user = user;
    }

    updateCount() {
        count++;
    }

    get count() {
        return this.#_count;
    }

    get user() {
        return this.#_user;
    }
  }
  




Module.addEvent("messageReactionAdd", async (reaction, user) => {
    if (reaction.emoji.toString().toLowerCase() == `<:${holidays[0]}>` && !user.bot) {
        let message = reaction.message;
        try {
            const index = cache.findIndex(element => user == element.user);
            if (index != undefined) {
                const userCount = cache[index];
                
              userCount.updateCount();
              // incase this is changed later instead of if statments
              switch(userCount.count) {
                case 5:
                    //update role here
                    break;
            
              }

            } else {
                cache.push(new Participant(user));

                // trigger message here
            }

        } catch (error) { u.errorHandler(error, "Holliday reaction error"); }
    }
}).addEvent("messageCreate", (msg) => {
    if (
        msg.author &&
        !msg.webhookId &&
        !msg.author.bot &&
        Math.floor(Math.random() * 30) > 28 //this should be a 1 in 30 chance
    ) {
        msg.react(holidays[0].emoji)
    }
})

module.exports = Module;