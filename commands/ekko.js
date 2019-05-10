module.exports = {
	name: "ekko",
	description: "gjentar samme melding tilbake",
	execute(config, message, args) {
		var content = args.join(" ");
		if (content === "") content = ":speak_no_evil:";
		
		message.channel.send(content);

		if (message.member.roles.some(role => [config.roles.admin, config.roles.mod].includes(role.name))) {
			message.delete().catch(error => {
				console.error(error);
				message.reply("meldingen din kunne ikke slettes.");
			});
		} else {
			message.react("✅");
		}
	},
};