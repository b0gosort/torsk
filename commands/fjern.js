module.exports = {
	name: "fjern",
	description: "fjerner et bestemt tall meldinger fra kanalen",
	execute(config, message, args) {
		if (!message.member.roles.some(role => [config.roles.admin, config.roles.mod].includes(role.name))) {
			message.reply("du har ikke tillatelse til å bruke den kommandoen.");
			return;
		}

		var numMessages = parseInt(args[0]);

		if (numMessages >= 100 || numMessages < 0) {
			message.reply("det er ikke mulig å fjerne så mange meldinger.")
			return;
		}

		var numMessagesString = `${numMessages} melding`;
		if (numMessages !== 1) numMessagesString += "er";
		
		message.channel.bulkDelete(numMessages + 1).then(() => {
			message.channel.send(`${message.author.toString()} har fjerna ${numMessagesString} fra denne kanalen.`);
		}).catch((error) => {
			console.error(error);
			message.reply("meldingene kunne ikke fjernes.")
		});
	}
};