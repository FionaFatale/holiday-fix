const Augur = require("augurbot"),
    u = require("../utils/utils"),
    snowflakes = require('../config/snowflakes.json');

    function getRandomIntInclusive(max) {
        let min = 1
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }


const Module = new Augur.Module()
    .addInteractionCommand({
        name: "roll",
        guildId: snowflakes.guilds.PrimaryServer,
        process: async (interaction) => {
            let diceType = interaction?.options?.get("dice-size")?.value;
            if(diceType>1000) diceType = 1000
            let diceQuantity = interaction?.options?.get("number-of-dice")?.value || 1;
            if (diceQuantity < 1) diceQuantity = 1;
            if (diceQuantity > 100) diceQuantity = 100;
            let modifier = await interaction?.options?.get("modifier")?.value || 0;
            let results = [];
            let total = 0;
            
            for (let index = 0; index < diceQuantity; index++) {
                let roll = getRandomIntInclusive(diceType);
                total += roll;
                results.push(`(${roll})`);
            }
            total += modifier;
            results.push(modifier)
            let embedTitle = diceQuantity+"d"+diceType + " result:";
            if (modifier> 0) embedTitle = diceQuantity+"d"+diceType + "+" + modifier + "  result:"
            else if (modifier < 0) embedTitle = diceQuantity+"d"+diceType + "-" + modifier + "  result:"
            let embed = u.embed().setTitle(embedTitle).setDescription("```" + total + "```").setColor(interaction.member?.displayColor);
            if(modifier != 0 || diceQuantity != 1) embed.addField("Breakdown:", `\`\`\`${results.slice(0, 10).join("+")}\`\`\``)
            interaction.reply({embeds: [embed]});
        }

    });


module.exports = Module;