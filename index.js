const { Client, Intents, GuildMember } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

const guildId = '937505540479799376';
const clientId = '945486422884884530';
const token = 'OTQ1NDg2NDIyODg0ODg0NTMw.YhQ22Q.axAAPcBiU7XJSG_tQgvOGwwAGC8';

const commands = [
	new SlashCommandBuilder().setName('muteall').setDescription('m'),
	new SlashCommandBuilder().setName('unmuteall').setDescription('u')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
	
const usersMuteStateInChannel = async (muteVal, interaction) => {	
	const members = interaction.member.voice.channel.members;
	for(const memberEntry of members) {
		/**@type {GuildMember} */
		const member = memberEntry[1];
		if(member.permissions.has("ADMINISTRATOR")) {
			continue;
		}
		await member.voice.setMute(muteVal)
	}
	await interaction.reply(`users ${!muteVal ? 'un' : ''}muted`);
}

client.once('ready', () => {
	console.log('up');
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()
		|| !interaction.member.voice.channel
		|| !interaction.memberPermissions.has("ADMINISTRATOR")) return;

    if (interaction.commandName === "muteall") {	
		await usersMuteStateInChannel(true, interaction);
    }
	if (interaction.commandName === "unmuteall") {	
		await usersMuteStateInChannel(false, interaction);
    }
});

client.login(token);
