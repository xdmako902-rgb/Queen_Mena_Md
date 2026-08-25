const { cmd } = require('../command');
const { ytmp3 } = require('dxz-ytdl'); 
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

cmd({
    pattern: "song",
    alias: ["ytsong", "play"],
    use: '.song <query or url>',
    react: "🎧",
    desc: "Download songs with quality selection",
    category: "Download",
    filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply('*𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒔𝒐𝒏𝒈 𝒏𝒂𝒎𝒆 𝒐𝒓 𝒀𝒐𝒖𝑻𝒖𝒃𝒆 𝒍𝒊𝒏𝒌!*');

        const url = q.replace(/\?si=[^&]*/, '');
        const results = await yts(url);
        const result = results.videos[0];
        
        if (!result) return reply("*𝑺𝒐𝒏𝒈 𝒏𝒐𝒕 𝒇𝒐𝒖𝒏𝒅!*");

        let caption = `╭━━━〔 *𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅* 〕━━━┈⊷
┃ *𝑺𝑶𝑵𝑮 𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫𝑬𝑹*
╰━━━━━━━━━━━━━━━┈⊷

*┌────────────────────┐*
*├ \`𝑻𝒊𝒕𝒍𝒆\` :* ${result.title}
*├ \`𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏\` :* ${result.duration}
*├ \`𝑼𝑹𝑳\` :* ${result.url}
*└────────────────────┘*

╭━━━〔 *𝑹𝑬𝑷𝑳𝒀 𝑵𝑼𝑴𝑩𝑬𝑹* 〕━━━┈⊷
┃ *𝑨𝑼𝑫𝑰𝑶 𝑭𝑶𝑹𝑴𝑨𝑻*
┃ 1 | 128𝒌𝒃𝒑𝒔 (𝑺𝒕𝒂𝒏𝒅𝒂𝒓𝒅)
┃ 2 | 320𝒌𝒃𝒑𝒔 (𝑯𝒊𝒈𝒉 𝑸𝒖𝒂𝒍𝒊𝒕𝒚)
┃
┃ *𝑫𝑶𝑪𝑼𝑴𝑬𝑵𝑻 𝑭𝑶𝑹𝑴𝑨𝑻*
┃ 3 | 128𝒌𝒃𝒑𝒔 (𝑺𝒕𝒂𝒏𝒅𝒂𝒓𝒅)
┃ 4 | 320𝒌𝒃𝒑𝒔 (𝑯𝒊𝒈𝒉 𝑸𝒖𝒂𝒍𝒊𝒕𝒚)
┃
┃ *𝑽𝑶𝑰𝑪𝑬 𝑭𝑶𝑹𝑴𝑨𝑻*
┃ 5 | 𝑽𝒐𝒊𝒄𝒆 𝑵𝒐𝒕𝒆
╰━━━━━━━━━━━━━━━┈⊷

_𝑹𝒆𝒑𝒍𝒚 𝒘𝒊𝒕𝒉 𝒕𝒉𝒆 𝒄𝒐𝒓𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒊𝒏𝒈 𝒏𝒖𝒎𝒃𝒆𝒓._`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: result.thumbnail },
            caption: caption
        }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore = global.numberStore || {};
        global.numberStore[msgId] = {
            "1": `ytaa 128k&${result.url}`,
            "2": `ytaa 320k&${result.url}`,
            "3": `ytad 128k&${result.url}&${result.thumbnail}&${result.title}`,
            "4": `ytad 320k&${result.url}&${result.thumbnail}&${result.title}`,
            "5": `ytaap ${result.url}`
        };

    } catch (e) {
        console.error(e);
        reply('*𝑬𝒓𝒓𝒐𝒓 𝒇𝒊𝒏𝒅𝒊𝒏𝒈 𝒔𝒐𝒏𝒈.*');
    }
});

cmd({
    pattern: "ytaa",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return;
    try {
        const [quality, url] = q.split('&');
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const result = await ytmp3(url, quality);
        const dlUrl = result.downloadUrl;

        if (!dlUrl) return await reply('*𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝒍𝒊𝒏𝒌 𝒏𝒐𝒕 𝒇𝒐𝒖𝒏𝒅.*');

        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        await conn.sendMessage(from, { 
            audio: { url: dlUrl }, 
            mimetype: 'audio/mpeg',
            caption: `*𝑸𝒖𝒂𝒍𝒊𝒕𝒚:* ${quality}\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });

    } catch (e) {
        reply('*𝑨𝒖𝒅𝒊𝒐 𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝑭𝒂𝒊𝒍𝒆𝒅!*');
    }
});

cmd({
    pattern: "ytad",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return;
        const [quality, url, thumb, title] = q.split("&");

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const result = await ytmp3(url, quality);
        const dlUrl = result.downloadUrl;

        if (!dlUrl) return await reply('*𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝒍𝒊𝒏𝒌 𝒏𝒐𝒕 𝒇𝒐𝒖𝒏𝒅.*');

        let botimgBuffer;
        try {
            const response = await fetch(thumb);
            botimgBuffer = Buffer.from(await response.arrayBuffer());
        } catch (e) { console.log(e); }

        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        await conn.sendMessage(from, {
            document: { url: dlUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title} (${quality}).mp3`,
            jpegThumbnail: botimgBuffer,
            caption: `*𝑸𝒖𝒂𝒍𝒊𝒕𝒚:* ${quality}\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });

    } catch (e) {
        reply('*𝑫𝒐𝒄𝒖𝒎𝒆𝒏𝒕 𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝑭𝒂𝒊𝒍𝒆𝒅!*');
    }
});

cmd({
    pattern: "ytaap",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return;
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const result = await ytmp3(q, '128k');
        const dlUrl = result.downloadUrl;

        const response = await fetch(dlUrl);
        const buffer = Buffer.from(await response.arrayBuffer());

        const ran = (Math.random() + 1).toString(36).substring(7);
        const mp3File = path.join(__dirname, `${ran}.mp3`);
        const oggFile = path.join(__dirname, `${ran}.ogg`);

        fs.writeFileSync(mp3File, buffer);

        ffmpeg(mp3File)
            .toFormat('ogg')
            .audioCodec('libopus')
            .on('end', async () => {
                await conn.sendMessage(from, {
                    audio: fs.readFileSync(oggFile),
                    mimetype: 'audio/ogg; codecs=opus',
                    ptt: true
                }, { quoted: mek });
                fs.unlinkSync(mp3File);
                fs.unlinkSync(oggFile);
            })
            .save(oggFile);

    } catch (e) {
        reply('*𝑽𝒐𝒊𝒄𝒆 𝑪𝒐𝒏𝒗𝒆𝒓𝒔𝒊𝒐𝒏 𝑭𝒂𝒊𝒍𝒆𝒅!*');
    }
});
