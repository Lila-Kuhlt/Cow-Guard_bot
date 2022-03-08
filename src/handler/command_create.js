
// ---------------------------------
// Export
// ---------------------------------
async function message_create(msg) {
    if (check_bot(msg)) return

    const prefix = msg.client.config.prefix
    if (!check_prefix(msg, prefix)) return

    const [command_name, args] = get_command_name_and_args(msg, prefix)
    const command = get_command(msg, command_name)
    if (!command) return

    await try_to_execute(msg, command, args)
}
// ---------------------------------

// ----------------------------------
// Getter
// ----------------------------------

function get_command_name_and_args(msg, prefix) {
    const content = msg.content.slice(prefix.length).trim()

    const args = content.match(/"[^"]+"|[^\s]+/g)
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('"')) args[i] = args[i].slice(1)
        if (args[i].endsWith('"')) args[i] = args[i].slice(0, args[i].length - 1)
    }
    const command_name = args.shift().toLowerCase()
    return [command_name, args]
}

function get_command(msg, command_name) {
    return msg.client.commands.get(command_name)
}
// ----------------------------------


// ----------------------------------
// Checker
// ----------------------------------
function check_prefix(msg, prefix) {
    return msg.content.startsWith(prefix)
}

function check_bot(msg) {
    return msg.author.bot
}
// ----------------------------------


// ----------------------------------
// Execute
// ----------------------------------
async function try_to_execute(msg, command, args) {
    try {
        await command.execute(msg, args)

    } catch (e) {
        console.error(e)
        msg.channel.reply("There was an error trying to execute that command!")
    }
}
// ----------------------------------

module.exports = { message_create }
