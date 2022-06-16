
const { MessageEmbed } = require("discord.js")
const generator = require('generate-password')

module.exports = {
    name: 'pw',
    description: 'Without args: List of all passwords.\\nWith args: Get password when you have a whitelisted role!',
    usage: '?[pw_key]',
    async execute(msg, args) {
        if (args.length === 0) return await this.print_all_keys(msg)
        else if (msg.channel.type === "DM") return msg.reply("You can't use this command in a DM!")
        else if (Object.keys(msg.client.config.pw).includes(args[0])) await this.print_specific_key(msg, args[0])
        else msg.reply("This key does not exist!")
    },
    async print_all_keys(msg) {
        const title = "List of all passwords keys"
        const description = Object.keys(msg.client.config.pw).join("\n") + `\n
            Write \`${msg.client.config.prefix}${this.name} [key]\` to get the password (if you are permitted)`
        msg.channel.send({ embeds: [this.generate_embed_success(msg, title, description)] })
    },
    async print_specific_key(msg, key) {
        if (!this.check_access(msg, key)) return await msg.reply("You are not authorised to access this password!")

        const pw = msg.client.config.pw[key]
        const passphrase = this.generate_passphrase()
        const secret_share = await msg.client.secret_api.create_secret(msg.client, pw.password, passphrase)

        const title = "Password: " + key
        const description = `User: ${pw.user}\nPassword: ${secret_share}\n
            Enter this passphase: \`${passphrase}\`\nLink is only usable once and exceeds in five minutes!`
        await msg.client.output.send_embed_to_dm(msg, this.generate_embed_success(msg, title, description))
    },
    check_access(msg, key) {
        const role_ids_with_access = msg.client.config.pw[key].role_ids_with_access
        return msg.member.roles.cache.some(role => role_ids_with_access.includes(role.id))
    },
    generate_embed_success(msg, title, description) {
        return new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor("DARK_PURPLE")
    },
    generate_passphrase() {
        return generator.generate({ length: 16, numbers: true, symbols: true, exclude: '`' })
    }
}
