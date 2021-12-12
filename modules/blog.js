const Augur = require("augurbot"),
    u = require("../utils/utils");
const config = require("../config/config.json");
const snowflakes = require('../config/snowflakes.json');
const Parser = require('rss-parser');
const TurndownService = require('turndown')
const Discord = require("discord.js");


const blogWebHook = new Discord.WebhookClient(config.blogPosts);
const parser = new Parser();
const turndownService = new TurndownService();
const blogLink = "https://andrewkrowe.wordpress.com/feed/";
let feed = null;
const Module = new Augur.Module()

// Message context menu for bookmarking a message.
async function blogHandler() {
    if (!feed) feed = await parser.parseURL(blogLink);
		const last = feed.items[0].link;
		feed = await parser.parseURL(blogLink);
		const entry = feed.items[0];
		if (last === entry.link) return;
		const thumbnailUrl = feed.image.url
		const embed = new MessageEmbed()
			.setTitle(entry.title)
			.setURL(entry.link)
			.setDescription(turndownService.turndown(entry.content))
			.setColor('#c8dee5')
			.setThumbnail(thumbnailUrl.split('?', 1)[0]);
		return blogWebHook.send({
			content: `<@&${snowflakes.roles.Updates.AllUpdates}>, <@&${snowflakes.roles.Updates.BlogUpdates}>`,
			embeds: [embed]
		});
}



Module.setClockwork(() => {
    let seconds = 10*60;
    try {
      return setInterval(blogHandler, seconds * 1000);
    } catch(error) { u.errorHandler(error, "Blog Clockwork"); }
  })

module.exports = Module;