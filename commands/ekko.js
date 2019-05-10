module.exports = {
	name: "ekko",
	description: "gjentar samme melding tilbake",
	execute(message, args) {
		if (!message.member.roles.some(role => role.name === config.roles.admin || role.name === config.roles.mod)) {
			message.reply("du har ikke tillatelse til å bruke den kommandoen.");
			return;
		}


		toSend = args.join(" ");
		if (toSend === "") toSend = ":speak_no_evil:";

		message.channel.send(toSend).then(() => {
			message.delete();
		}).catch(error => {
			console.error(error);
			message.reply("den meldingen kunne ikke gjentas.");
		});
	},
};