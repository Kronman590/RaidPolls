const Discord = require('discord.js');
const client = new Discord.Client();

function createPoll(channel,message) {
	return (channel.send(message)
	.then(function (mess) {
		mess.react("1\ufe0f\u20e3");
		mess.react("2\ufe0f\u20e3");
		mess.react("3\ufe0f\u20e3");
		mess.react("4\ufe0f\u20e3");
	}).catch(function() {
		console.error("Reactions Failed");
	}))
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	var Mon = "";
	var Loc = "";
	var Time = "";
	if (msg.content.startsWith('!poll')) {
		var request = msg.content.substring(6);
		var first = request.search(',');
		var second = request.substring(first+1).search(',')+first+1;
		Mon = request.substring(0,first);
		if (request[first+1] != " ") {
			Loc = request.substring(first+1,second);
		} else {
			Loc = request.substring(first+2,second);
		}
		if (request[second+1] != " ") {
			Time = request.substring(second+1);
		} else {
			Time = request.substring(second+2);
		}
		fullMsg = Mon+" Raid at "+Loc+" starting at "+Time+". Vote for the # of accounts you have!";
		msg.channel.send("Poll made for "+Mon+" at "+Loc+" for "+Time+". Check the 'raid-polls' chat to vote!")
		.then(function() {
			client.channels.fetch("686121165760102423")
		.then(function (botHome) {
			console.log(botHome.id);
			createPoll(botHome,fullMsg);
		}).catch(function() {
			console.error("Channel not found.");
		});}).catch(function() {
			console.error("OG Channel post failed.");
		});
		console.log(first,second);
	}
});

client.login('Njg2MTA1ODgwNjA4ODk5MTMz.XmSYIg._b32e23WBpcLX5SxNmgtors2SUk');