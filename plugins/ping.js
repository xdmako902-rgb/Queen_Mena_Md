const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "💌",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now();
        
        const message = await conn.sendMessage(from, { text: '💌 *Pinging Queen Mena MD V1...*' }, { quoted: mek });
        
        const endTime = Date.now();
        const ping = endTime - startTime;
        
        const pingText = `╭━━━〔 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫 〕━━━┈⊷
┃ 💌 𝑷 𝑰 𝑵 𝑮  𝑹𝑬𝑺𝑼𝑳𝑻 !
╰━━━━━━━━━━━━━━━┈⊷

⭔ 𝑺𝑷𝑬𝑬𝑫 : ${ping}ms
⭔ 𝑺𝑻𝑨𝑻𝑼𝑺 : 𝑭𝑨𝑺𝑻 & 𝑨𝑪𝑻𝑰𝑽𝑬 🟢

*© 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅*`;

        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/XZnq49KG/6b4702159f79.jpg' }, 
            caption: pingText 
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

cmd({
    pattern: "gay",
    desc: "Check gay percentage.",
    category: "fun",
    react: "🏳️‍🌈",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let targetNumber = senderNumber;
        let targetJid = sender;

        if (m.quoted) {
            targetNumber = m.quoted.sender ? m.quoted.sender.split('@')[0] : senderNumber;
            targetJid = m.quoted.sender || sender;
        } else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            targetJid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
            targetNumber = targetJid.split('@')[0];
        }

        let responseText = '';

        if (targetNumber === "94766398472") {
            responseText = `*🏳️‍🌈 𝑮𝑨𝒀 𝑪𝑯𝑬𝑪𝑲𝑬𝑹 🏳️‍🌈*\n\n👤 𝑼𝑺𝑬𝑹 : @${targetNumber}\n📊 𝑮𝑨𝒀 𝑷𝑬𝑹𝑪𝑬𝑵𝑻𝑨𝑮𝑬 : *0%*\n\n😎 මේයා නම් සිරාම කොල්ලෙක්! කිසිම අවුලක් නෑ. (100% Straight)`;
        } else {
            const percentage = Math.floor(Math.random() * 101);
            let comment = '';
            
            if (percentage === 0) comment = "😎 නියම කොල්ලෙක්! (100% Straight)";
            else if (percentage < 30) comment = "හොඳයි හොඳයි, ලොකු අවුලක් නෑ! 😌";
            else if (percentage < 60) comment = "පොඩි සැකයක් තියෙනවා... හැරෙන පොට නම් හරි නෑ වගේ 🤔";
            else if (percentage < 90) comment = "අම්මෝ... මූගෙන් පරිස්සමින් ඉන්න ඕන! 😬";
            else comment = "අප්පටසිරි! සිරාම ඩයල් එකක්නේ. ළඟින්වත් තියාගන්න එපා... 🏃‍♂️💨";

            responseText = `*🏳️‍🌈 𝑮𝑨𝒀 𝑪𝑯𝑬𝑪𝑲𝑬𝑹 🏳️‍🌈*\n\n👤 𝑼𝑺𝑬𝑹 : @${targetNumber}\n📊 𝑮𝑨𝒀 𝑷𝑬𝑹𝑪𝑬𝑵𝑻𝑨𝑮𝑬 : *${percentage}%*\n\n${comment}`;
        }

        await conn.sendMessage(from, { 
            text: responseText, 
            mentions: [targetJid] 
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
