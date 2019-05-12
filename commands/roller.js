module.exports = {
	name: "roller",
	description: "gir éi eller flere roller til brukeren",
	execute(config, message, args) {
		var success = [true];

		var argsLower = [];
		args.forEach(item => argsLower.push(item.toLowerCase()));

		argsLower.forEach(arg => {
			// Did user request role not in selectable roles
			if (!config.roles.selectable.some(category => {
				let catLower = [];
				category.forEach(catItem => catLower.push(catItem.toLowerCase()));
				return catLower.includes(arg);
			})) {
				success[0] = false;
				success.push(`Rolla ${args[args.indexOf(arg)]} kan ikke skaffes med denne kommandoen.`);
				return;
			}

			// Go through each category
			config.roles.selectable.forEach(category => {
				let catLower = [];
				category.forEach(catItem => catLower.push(catItem.toLowerCase()));

				if (catLower.includes(arg)) {
					// Did user request multiple roles from category
					otherArgs = argsLower.slice(0, argsLower.indexOf(arg));
					argsLower.slice(argsLower.indexOf(arg) + 1, argsLower.length).forEach(otherArg => otherArgs.push(otherArg));
					if (catLower.some(role => otherArgs.includes(role))) {
						success[0] = false;
						success.push("Det er ikke mulig å ha mer enn éi rolle i samme kategori.");
						return;
					}

					// Remove existing roles in category
					message.member.roles.forEach(role => {
						if (category.includes(role.name)) message.member.removeRole(role).catch(error => console.error(error));
					});

					// Give role to user
					roleGiven = message.guild.roles.find(role => role.name === category[catLower.indexOf(arg)]);
					message.member.addRole(roleGiven).catch(error => console.error(error));
				}
			});
		});

		if (success[0] === true) {
			message.react("✅");
		} else {
			message.react("❎");

			// Compiling error message
			response = "det oppstod følgende feil med førespørselen:\n```";
			errors = [];
			success.slice(1).forEach(error => {
				if (!errors.includes(error)) errors.push(error)
			});
			errors.forEach(error => response += "\n" + error);
			response += "```";

			message.reply(response);
		}
	}
};