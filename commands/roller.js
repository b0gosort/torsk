module.exports = {
	name: "roller",
	description: "gir ei rolle eller flere roller til brukeren",
	execute(config, message, args) {
		var changes = [];

		args.forEach(query => {
			selection = query.toLowerCase();

			config.roles.selectable.forEach(category => {
				// Case insensitive check for requested role in category
				queryCompare = [];
				category.forEach(rolename => queryCompare.push(rolename.toLowerCase()));

				if (queryCompare.includes(selection)) {
					// Remove other roles in category from user
					message.member.roles.forEach(role => {
						if (category.includes(role.name)) message.member.removeRole(role).then(() => {
							changes.push(`Rolla ${role.name} ble fjerna.`);
						}).catch(error => {
							console.error(error);
							changes.push(`Rolla ${role.name} kunne ikke fjernes.`);
						});
					});

					// Add requested role to user
					properName = category[queryCompare.indexOf(selection)];
					message.member.addRole(message.guild.roles.find(role => role.name === properName)).then(() => {
						changes.push(`Rolla ${properName} ble gitt.`);
					}).catch(error => {
						console.error(error);
						changes.push(`Rolla ${properName} kunne ikke gis.`);
					});
				}
			});
		});

		changesList = "\n```";
		changes.forEach(change => changesList += "\n" + change);
		changesList += "```"

		message.react("✅");

		//message.reply(`følgende endringer har blitt utførte:${changes}`);
	}
};