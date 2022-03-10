
const { MessageEmbed } = require("discord.js")

async function send_embed_to_dm(msg, embed) {
    embed.description += `\n${msg.client.helper.link_to_message(msg, "Back to message")}`
    return await msg.author.send({ embeds: [embed] })
        .then(async () => {
            await msg.channel.send({ embeds: [generate_embed_to_dm(msg)] })
        })
}

function generate_embed_to_dm(msg) {
    return new MessageEmbed()
        .setDescription(`<@${msg.author.id}> I've sent you a DM!\n${msg.client.helper.link_to_dm(msg, "Jump to DM")}!`)
        .setColor("DARK_PURPLE")
}

module.exports = { send_embed_to_dm }