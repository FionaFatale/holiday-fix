const Augur = require("augurbot"),
    u = require("../utils/utils");
const snowflakes = require('../config/snowflakes.json');

const Module = new Augur.Module()
    .addCommand({
        name: "stafflist",
        aliases: ["staff", "staffinfo"],
        description: "Gets the current staff members and bot masters",
        permissions: true,
        process: async (msg) => {
            let SW = await msg.guild.members.cache.map((m) => { if (m.roles.cache.has(snowflakes.roles.SoaringWings)) return m.displayName || m.username }).filter(r => (r != null)).join(`\n`);

            let Mod = await msg.guild.members.cache.map((m) => { if (m.roles.cache.has(snowflakes.roles.Whisper) && !m.roles.cache.has(snowflakes.roles.Admin)) return m.displayName || m.username }).filter(r => (r != null)).join(`\n`);
            
            let Admin = await msg.guild.members.cache.map((m) => { if (m.roles.cache.has(snowflakes.roles.Admin)) return m.displayName || m.username }).filter(r => (r != null)).join(`\n`);
            
            let botMaster = await msg.guild.members.cache.map((m) => { if (m.roles.cache.has(snowflakes.roles.BotMaster)) return m.displayName || m.username }).filter(r => (r != null)).join(`\n`);

            let adminRole = (await msg.guild.roles.cache.get(snowflakes.roles.Admin));
            let whisperRole = (await msg.guild.roles.cache.get(snowflakes.roles.Whisper));
            let swRole = (await msg.guild.roles.cache.get(snowflakes.roles.SoaringWings));
            let botMasterRole = (await msg.guild.roles.cache.get(snowflakes.roles.BotMaster));
            let color = whisperRole.hexColor;
            
            let embed = u.embed().addField(`<@&${snowflakes.roles.Admin}>`, "```" + Admin + "```").addField(`<@&${snowflakes.roles.Whisper}>`, "```" + Mod + "```").addField(`<@&${snowflakes.roles.SoaringWings}>`, "```" + SW + "```\n\n").addField(`<@&${snowflakes.roles.BotMaster}>`, "```" + botMaster + "```").setColor(color);
            
            msg.channel.send({ embeds: [embed], "allowedMentions": { "roles" : []}});
        }
    });

module.exports = Module;
