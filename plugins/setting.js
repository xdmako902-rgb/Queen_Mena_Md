const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    react: "⚙️",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃       ⚙️ *𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫 𝑺𝑬𝑻𝑻𝑰𝑵𝑮𝑺* ⚙️
┃━━━━━━━━━━━━━━━━━━━━━━━┃
┣━💼 *𝑾𝒐𝒓𝒌 𝑴𝒐𝒅𝒆* : 𝑷𝑼𝑩𝑳𝑰𝑪🌎/𝑷𝑹𝑰𝑽𝑨𝑻𝑬/𝑰𝑵𝑩𝑶𝚇/𝑮𝑹𝑶𝑼𝑷
┣━🔊 *𝑨𝒖𝒕𝒐 𝑽𝒐𝒊𝒄𝒆* : ♻️ 𝑶𝑵/𝑶𝑭𝑭
┣━📝 *𝑨𝒖𝒕𝒐 𝑺𝒕𝒂𝒕𝒖𝒔* : ♻️ 𝑶𝑵/𝑶𝑭𝑭
┣━📋 *𝑨𝒖𝒕𝒐 𝑩𝒊𝒐* : ♻️ 𝑶𝑵/𝑶𝑭𝑭
┣━⌨️ *𝑨𝒖𝒕𝒐 𝑻𝒚𝒑𝒊𝒏𝒈* : ♻️ 𝑶𝑵/𝑶𝑭𝑭
┣━🛠️ *𝑨𝒖𝒕𝒐 𝑹𝒆𝒂𝒅 𝑪𝒐𝒎𝒎𝒂𝒏𝒅* : ♻️ 𝑶𝑵/𝑶𝑭𝑭
┃━━━━━━━━━━━━━━━━━━━━━━━┃
┃      🔗  *𝑪𝑼𝑺𝑻𝑶𝑴𝑰𝒁𝑬 𝒀𝑶𝑼𝑹 𝑺𝑬𝑻𝑻𝑰𝑵𝑮𝑺* ⤵
┗━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃       🔧 *𝑶𝑷𝑻𝑰𝑶𝑵𝑺 𝑴𝑬𝑵𝑼* 🔧
┃━━━━━━━━━━━━━━━━━━━━━━━┃

┣━ *𝑾𝑶𝑹𝑲 𝑴𝑶𝑫𝑬* ⤵
┃   ┣ 1.1 🔹 𝑷𝒖𝒃𝒍𝒊𝒄 𝑾𝒐𝒓𝒌
┃   ┣ 1.2 🔹 𝑷𝒓𝒊𝒗𝒂𝒕𝒆 𝑾𝒐𝒓𝒌
┃   ┣ 1.3 🔹 𝑮𝒓𝒐𝒖𝒑 𝑶𝒏𝒍𝒚
┃   ┗ 1.4 🔹 𝑰𝒏𝒃𝒐𝒙 𝑶𝒏𝒍𝒚

┣━ *𝑨𝑼𝑻𝑶 𝑽𝑶𝑰𝑪𝑬* ⤵
┃   ┣ 2.1 🔊 𝑨𝒖𝒕𝒐 𝑽𝒐𝒊𝒄𝒆 𝑶𝒏
┃   ┗ 2.2 🔕 𝑨𝒖𝒕𝒐 𝑽𝒐𝒊𝒄𝒆 𝑶𝒇𝒇

┣━ *𝑨𝑼𝑻𝑶 𝑺𝑻𝑨𝑻𝑼𝑺 𝑺𝑬𝑬𝑵* ⤵
┃   ┣ 3.1 👁️‍🗨️ 𝑨𝒖𝒕𝒐 𝑹𝒆𝒂𝒅 𝑺𝒕𝒂𝒕𝒖𝒔 𝑶𝒏
┃   ┗ 3.2 👁️❌ 𝑨𝒖𝒕𝒐 𝑹𝒆𝒂𝒅 𝑺𝒕𝒂𝒕𝒖ස් 𝑶𝒇𝒇

┣━ *𝑨𝑼𝑻𝑶 𝑩𝑰𝑶* ⤵
┃   ┣ 4.1 ✍️ 𝑨𝒖𝒕𝒐 𝑩𝒊𝒐 𝑶𝒏
┃   ┗ 4.2 ✍️❌ 𝑨𝒖𝒕𝒐 𝑩𝒊𝒐 𝑶𝒇𝒇

┣━ *24/7 𝑵𝑬𝑾𝑺 𝑺𝑬𝑹𝑽𝑰𝑪𝑬* ⤵
┃   ┣ 5.1 📰 𝑨𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝑵𝒆𝒘𝒔 𝑺𝒆𝒓𝒗𝒊𝒄𝒆
┃   ┗ 5.2 🛑 𝑫𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝑵𝒆𝒘𝒔 𝑺𝒆𝒓𝒗𝒊𝒄𝒆

┣━ *𝑨𝑼𝑻𝑶 𝑻𝑹𝑷𝑰𝑵𝑮* ⤵
┃   ┣ 6.1 📝 𝑨𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝑨𝒖𝒕𝒐 𝑻𝒚𝒑𝒊𝒏𝒈
┃   ┗ 6.2 📝❌ 𝑫𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝑨𝒖𝒕𝒐 𝑻𝒚𝒑𝒊𝒏𝒈

┣━ *𝑨𝑼𝑻𝑶 𝑪𝑶𝑴𝑴𝑨𝑵𝑫 𝑹𝑬𝑨𝑫* ⤵
┃   ┣ 7.1 🖊️ 𝑨𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝑨𝒖𝒕𝒐 𝑪𝒐𝒎𝒎𝒂𝒏𝑑 𝑹𝒆𝒂𝒅
┃   ┗ 7.2 🖊️❌ 𝑫𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝑨𝒖𝒕𝒐 𝑪𝒐𝒎𝒎𝒂𝒏𝑑 𝑹𝒆𝒂𝒅
┗━━━━━━━━━━━━━━━━━━━━━━━┛

> *© 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://res.cloudinary.com/p6lu5bpe/image/upload/v1787195344/l4n5ldfch7jqsldtrsju.jpg" }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                // සැබෑ කමාන්ඩ් එක බොට් වෙත ක්‍රියුට් කිරීමට conn.sendMessage හරහා යැවීම හෝ අදාළ ෆන්ක්ෂන් එක ඇඳීම කළ යුතුය
                const prefix = "."; // ඔබේ බොට්ගේ ප්‍රීෆ්පික්ස් එක
                let targetCommand = "";

                switch (selectedOption) {
                    case '1.1': targetCommand = "update MODE:public"; break;
                    case '1.2': targetCommand = "update MODE:private"; break;
                    case '1.3': targetCommand = "update MODE:group"; break;
                    case '1.4': targetCommand = "update MODE:inbox"; break;
                    case '2.1': targetCommand = "update AUTO_VOICE:true"; break;
                    case '2.2': targetCommand = "update AUTO_VOICE:false"; break;
                    case '3.1': targetCommand = "update AUTO_READ_STATUS:true"; break;
                    case '3.2': targetCommand = "update AUTO_READ_STATUS:false"; break;
                    case '4.1': targetCommand = "update AUTO_BIO:true"; break;
                    case '4.2': targetCommand = "update AUTO_BIO:false"; break;
                    case '5.1': targetCommand = "startnews"; break;
                    case '5.2': targetCommand = "stopnews"; break;
                    case '6.1': targetCommand = "update AUTO_TYPING:true"; break;
                    case '6.2': targetCommand = "update AUTO_TYPING:false"; break;
                    case '7.1': targetCommand = "update AUTO_READ_CMD:true"; break;
                    case '7.2': targetCommand = "update AUTO_READ_CMD:false"; break;
                    default:
                        return reply("*𝑰𝒏𝒗𝒂𝒍𝒊𝒅 𝒐𝒑𝒕𝒊𝒐𝒏. 𝑷𝒍𝒆𝒂𝒔𝒆 𝒔𝒆𝒍𝒆𝒄𝒕 𝒂 𝒗𝒂𝒍𝒊𝒅 𝒐𝒑𝒕𝒊𝒐𝒏* 🔴");
                }

                // බොට්ට අදාළ කමාන්ඩ් එක ක්‍රියාත්මක කළ හැකි වන සේ මැසේජ් එකක් ලෙස යැවීම
                await conn.sendMessage(from, { text: prefix + targetCommand }, { quoted: msg });
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('*𝑨𝒏 𝒆𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆ⴷ 𝒘𝒉𝒊𝒍𝒆 𝒑𝒓𝒐𝒄𝒆𝒔𝒔𝒊𝒏𝒈 𝒚𝒐𝒖𝒓 𝒓𝒆𝒒𝒖𝒆𝒔𝒕.*');
    }
});
