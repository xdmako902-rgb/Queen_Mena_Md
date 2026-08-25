const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

const dbPath = path.join(__dirname, 'vv_trigger.json');

cmd({
    pattern: "setvv",
    react: "⚙️",
    desc: "Set a custom prefix-less trigger for VV",
    category: "owner",
    use: '.setvv <emoji or word>',
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    if (!isOwner) return await reply("❌ 𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒕𝒉𝒆 𝒐𝒘𝒏𝒆𝒓!");

    const query = q ? q.trim() : "";

    if (query.toLowerCase() === 'reset') {
        if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
        return await reply("✅ *𝑪𝒖𝒔𝒕𝒐𝒎 𝑽𝑽 𝑻𝒓𝒊𝒈𝒈𝒆𝒓 𝑹𝒆𝒔𝒆𝒕!*\n𝓝𝓸𝔀 𝓾𝓼𝓲𝓷𝓰 𝓭𝓮𝓯𝓪𝓾𝓵𝓽 𝓮𝓶𝓸𝓳𝓲: 🔓");
    }

    if (!query) {
        return await reply(`🛠️ *𝑪𝑼𝑺𝑻𝑶𝑴 𝑽𝑽 𝑻𝑹𝑰𝑮𝑮𝑬𝑹 𝑺𝑬𝑻𝑼𝑷* 🛠️\n\n*🔹 Set a custom emoji or word (No Prefix needed):*\n.setvv 🔓\n.setvv get\n\n*🔹 Reset to default:*\n.setvv reset`);
    }

    fs.writeFileSync(dbPath, JSON.stringify({ trigger: query }));
    await reply(`✅ *𝑪𝑼𝑺𝑻𝑶𝑴 𝑽𝑽 𝑻𝑹𝑰𝑮𝑮𝑬𝑹 𝑺𝑨𝑽𝑬𝑫!*\n\nNow you can simply reply to a View Once message using:\n*${query}*\n_(No dot/prefix required!)_`);
});

cmd({
    on: "body" 
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner || !m.quoted) return;

        const msgText = mek.message?.conversation || mek.message?.extendedTextMessage?.text || "";
        if (!msgText) return;

        let trigger = "🔓"; 
        if (fs.existsSync(dbPath)) {
            const data = JSON.parse(fs.readFileSync(dbPath));
            trigger = data.trigger;
        }

        if (msgText.trim() !== trigger) return;

        const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quotedMessage) return;

        let type = Object.keys(quotedMessage)[0];
        let mediaMsg = quotedMessage[type];

        if (type === 'viewOnceMessageV2' || type === 'viewOnceMessage' || type === 'viewOnceMessageV2Extension') {
            const innerType = Object.keys(quotedMessage[type].message)[0];
            mediaMsg = quotedMessage[type].message[innerType];
            type = innerType;
        }

        if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
            return reply("❌ 𝑻𝒉𝒊𝒔 𝒊𝒔 𝒏𝒐𝒕 𝒂 𝑽𝒊𝒆𝒘 𝑶𝒏𝒄𝒆 𝒑𝒉𝒐𝒕𝒐, 𝒗𝒊𝒅𝒆𝒐, 𝒐𝒓 𝒗𝒐𝒊𝒄𝒆 𝒏𝒐𝒕𝒆.");
        }

        const stream = await downloadContentFromMessage(mediaMsg, type.replace('Message', ''));
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        let senderId = m.quoted.sender || m.sender || '';

        const secretCaption = `🔓 *𝑽𝑰𝑬𝑾-𝑶𝑵𝑪𝑬 𝑹𝑬𝑻𝑹𝑰𝑬𝑽𝑬𝑫*

◈ *𝑻𝒀𝑷𝑬:* ${type.replace('Message', '').toUpperCase()}
◈ *𝑭𝑹𝑶𝑴:* ${from.split('@')[0]}
◈ *𝑺𝑬𝑵𝑫𝑬𝑹:* @${senderId.split('@')[0]}

> © 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅`;

        if (type === 'imageMessage') {
            await conn.sendMessage(botNumber, { image: buffer, caption: secretCaption, mentions: [senderId] });
        } else if (type === 'videoMessage') {
            await conn.sendMessage(botNumber, { video: buffer, caption: secretCaption, mimetype: 'video/mp4', mentions: [senderId] });
        } else if (type === 'audioMessage') {
            await conn.sendMessage(botNumber, { audio: buffer, mimetype: 'audio/ogg; codecs=opus', ptt: true });
            await conn.sendMessage(botNumber, { text: secretCaption, mentions: [senderId] });
        }

    } catch (e) {
        console.log("VV_PREFIXLESS_ERROR:", e);
    }
});

cmd({
    pattern: "vv",
    alias: ["viewonce", "retrieve"],
    desc: "Retrieve View Once media and send to Bot Inbox.",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ 𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒕𝒉𝒆 𝒐𝒘𝒏𝒆𝒓!");
        if (!m.quoted) return reply("❌ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒓𝒆𝒑𝒍𝒚 𝒕𝒐 𝒂 𝑽𝒊𝒆𝒘 𝑶𝒏𝒄𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆.");
        
        const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quotedMessage) return reply("❌ 𝑪𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒇𝒊𝒏𝒅 𝒕𝒉𝒆 𝒒𝒖𝒐𝒕𝒆𝒅 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒅𝒂𝒕𝒂.");

        let type = Object.keys(quotedMessage)[0];
        let mediaMsg = quotedMessage[type];

        if (type === 'viewOnceMessageV2' || type === 'viewOnceMessage' || type === 'viewOnceMessageV2Extension') {
            const innerType = Object.keys(quotedMessage[type].message)[0];
            mediaMsg = quotedMessage[type].message[innerType];
            type = innerType;
        }

        if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
            return reply("❌ 𝑻𝒉𝒊𝒔 𝒊𝒔 𝒏𝒐𝒕 𝒂 𝑽𝒊𝒆𝒘 𝑶𝒏𝒄𝒆 𝒑𝒉𝒐𝒕𝒐, 𝒗𝒊𝒅𝒆𝒐, 𝒐𝒓 𝒗𝒐𝒊𝗰𝒆 𝒏𝒐𝒕𝒆.");
        }

        const stream = await downloadContentFromMessage(mediaMsg, type.replace('Message', ''));
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        let senderId = m.quoted.sender || m.sender || '';

        const secretCaption = `🔓 *𝑽𝑰𝑬𝑾-𝑶𝑵𝑪𝑬 𝑹𝑬𝑻𝑹𝑰𝑬𝑽𝑬𝑫*\n\n◈ *𝑻𝒀𝑷𝑬:* ${type.replace('Message', '').toUpperCase()}\n◈ *𝑭𝑹𝑶𝑴:* ${from.split('@')[0]}\n◈ *𝑺𝑬𝑵𝑫𝑬𝑹:* @${senderId.split('@')[0]}\n\n> © 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅`;

        if (type === 'imageMessage') {
            await conn.sendMessage(botNumber, { image: buffer, caption: secretCaption, mentions: [senderId] });
        } else if (type === 'videoMessage') {
            await conn.sendMessage(botNumber, { video: buffer, caption: secretCaption, mimetype: 'video/mp4', mentions: [senderId] });
        } else if (type === 'audioMessage') {
            await conn.sendMessage(botNumber, { audio: buffer, mimetype: 'audio/ogg; codecs=opus', ptt: true });
            await conn.sendMessage(botNumber, { text: secretCaption, mentions: [senderId] });
        }
    } catch (e) {
        console.log("VV_ERROR:", e);
        reply("❌ 𝑬𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅: " + e.message);
    }
});
