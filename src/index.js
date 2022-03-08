// ===============================
// This is the entry point of the whole program!
// This file will collect every needed package or code file together and start the discord bot.
// Further explanations can be found in the wiki: https://github.com/EliasSchaut/Discord-Bot-Template/wiki
// ===============================


// ---------------------------------
// Preparations
// ---------------------------------
// require needed modules.
const fs = require('fs')
const Discord = require('discord.js')

// create client with its intents (see also: https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS)
const client = new Discord.Client({ intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['CHANNEL']})

// get required methods and fields and save it into client. This will always be accessible with msg.client
client.commands = new Discord.Collection()
client.config = require('../config/config.json')
client.helper = require('./util/cmd_helper')
client.command_event = require("./handler/command_create")

// dynamically retrieve all command files
async function load_commands(client) {
    const commandFolder = fs.readdirSync("./src/commands")
    for (const file of commandFolder) {
        const command = require(`./commands/${file}`)

        const name = command.name
        await client.commands.set(name, command)
    }
}
// ---------------------------------



// ---------------------------------
// Event-Handler
// ---------------------------------
// when the client (bot) is ready
client.once('ready', async () => {
    // load commands
    await load_commands(client)

    // log ready info
    console.log('Ready!')
})

// react on messages
client.on('messageCreate',async msg => {
    // react on commands
    await client.command_event.message_create(msg)
})
// ---------------------------------

// login to Discord with app's token
client.login(client.config.token)
