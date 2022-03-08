// ===============================
// The help command provides useful information about all the oder commands. The command works dynamically.
// If help is called without arguments, it will print all for the author from message executable commands.
// If help is called with a command name as argument, it prints information about this specific command.
// Here the help command uses the informations of the given command (name, description and usage).
// ===============================

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Without arguments, this command lists all executable commands. If a command is passed as argument, information about this command will returned.',
    usage: '[command name]',
    async execute(msg, args) {
        const { commands } = msg.client

        // help information for all command
        if (!args.length) {
            return this.send_all_commands(msg)

        // help information for a specific command
        } else {
            const name = args[0].toLowerCase()
            const command = commands.get(name)

            if (!command) {
                return msg.channel.reply("That's not a valid command!");
            }

            return this.send_specific_command(msg, command)
        }
    },


    // ----------------------------
    // Helper
    // ----------------------------
    async send_all_commands(msg) {
        return msg.channel.send({ embeds: [this.create_embed_all_commands(msg)] })
    },

    async send_specific_command(msg, command) {
        return msg.channel.send({ embeds: [this.create_embed_specific_command(msg, command)] })
    },

    // create an embed with information about all commands
    create_embed_all_commands(msg) {
        const prefix = msg.client.config.prefix
        const all_cmd_str = msg.client.helper.commands_to_string(msg)
        const alt_send = `\`${prefix}${this.name} ${this.usage}\``
        const description = `List with all commands:\n${all_cmd_str}\nYou can send ${alt_send} to get information about a specific command!`

        return this.create_embed_help_format(msg, this.name, description)
    },

    // create an embed with information about a given specific command
    create_embed_specific_command(msg, command) {
        const prefix = msg.client.config.prefix
        const description = []

        const name = command.name
        const cmd_description = command.description
        const usage = command.usage
        description.push(`**Description:**\n${cmd_description}\n`)
        description.push(`**Usage:**\n\`${prefix}${name} ${usage}\`\n`)

        return this.create_embed_help_format(msg, name, description.join("\n"))
    },

    // actually generates an embed_msg in help format
    create_embed_help_format(msg, title, description, fields = []) {
        return new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${title.toUpperCase()} COMMAND`)
            .setDescription(description)
            .addFields(fields)
    }
    // ----------------------------
};
