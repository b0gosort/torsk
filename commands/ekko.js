module.exports = {
	name: "ekko",
	description: "gjentar samme melding tilbake",
	execute(message, args) {
		toRepeat = args.join(" ");
		if (toRepeat === "") {
			message.channel.send(":speak_no_evil:");
		} else {
			message.channel.send(toRepeat);
		}
	},
};