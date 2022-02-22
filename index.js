//@ts-check
const { Client, Intents, GuildMember } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const usersMuteStateInChannel = async (muteVal, interaction) => {	
	const members = interaction.channel.members;
	for(const i of members) {
		/** @type {GuildMember} */
		const member = members[i];
		await member.voice.setMute(muteVal)
	}
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()
		|| !interaction.channel.isVoice()
		|| !interaction.memberPermissions.has("ADMINISTRATOR")) return;
		
    if (interaction.commandName === "muteall") {	
		usersMuteStateInChannel(true, interaction);
    }
	if (interaction.commandName === "unmuteall") {	
		usersMuteStateInChannel(false, interaction);
    }
});

client.login("OTQ1NDg2NDIyODg0ODg0NTMw.YhQ22Q.axAAPcBiU7XJSG_tQgvOGwwAGC8");
