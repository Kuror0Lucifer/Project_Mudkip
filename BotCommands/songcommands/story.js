exports.run = async (bot,message,args) => {
    const ytdl = bot.ytdl;
    let voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) {
        return message.reply("Sorry You are not connected to a voice channel");
    }
    else if (!voiceChannel.permissionsFor(message.guild.member(bot.user)).has("CONNECT")) {
        return message.reply("Sorry I can't join that VC try a diffrent VC and make sure i have the connect permission if you need any help contact my owner").catch(console.error);
    }
    else if (voiceChannel.full && !voiceChannel.permissionsFor(message.guild.member(bot.user)).has('MOVE_MEMBERS')) {
        return message.channel.send("Sorry I can't join a full VC try joining a diffrent VC").catch(console.error);
    }

    await message.channel.send("Song Loading Please Wait")
    voiceChannel.join().then(connection => {
    const dispatcher = connection.playStream(ytdl('https://youtu.be/hnJIRPiCqRw'));
        dispatcher.on('end', end => {
            voiceChannel.leave();
        });
    }).catch(err => console.log(err));
}

exports.help = {
    name: "story"
}
