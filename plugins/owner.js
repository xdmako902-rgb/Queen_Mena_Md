const { cmd, commands } = require('../command');

cmd({
    pattern: "owner",
    alias: ["creator", "admin"],
    desc: "Show bot owner info.",
    category: "main",
    react: "😾",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // මෙතැනට ඔයාගේ නම්බර් එක දාන්න (country code එකත් එක්ක, උදා: 94766398472)
        const ownerNumber = "94766398472"; 
        const ownerName = "𝑳𝒊𝒏𝒁𝒐 𝑫𝒆𝒗"; // ඔයාගේ නම මෙතැනට දාන්න
        const botName = "𝑸𝒖𝒆𝒆𝒏 𝒄𝑴𝒆𝒏𝒂 𝑴𝒅";
        const channelLink = "https://whatsapp.com/channel/0029VbEFcxs96H4YcdGVpK0T";
        const ownerImg = "https://i.ibb.co/xtfh61LZ/7a53007b397e.jpg"; // ඔයාගේ ෆොටෝ ලින්ක් එක

        // vCard (Contact Card) නිර්මාණය කිරීම
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:1.0\n' +
                      `FN:${ownerName}\n` +
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:+${ownerNumber}\n` +
                      'END:VCARD';

        // කන්ටැක්ට් එක යැවීම (මෙයින් ඔයාගේ නම සහ නම්බර් එක වට්ස්ඇප් කන්ටැක්ට් එකක් ලෙස වැටේ)
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });

        // විස්තර සහ ෆොටෝ එකත් සමඟ මැසේජ් එක යැවීම
        let ownerDesc = `*⋆.˚🦋༘⋆ 𝑶𝒘𝒏𝒆𝒓 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 ⋆.˚🦋༘⋆*
│
│ ⊳ *𝑶𝒘𝒏𝒆𝒓 𝑵𝒂𝒎𝒆* : ${ownerName} 👑
│ ⊳ *𝑩𝒐𝒕 𝑵𝒂𝒎𝒆* : ${botName} 🎀
│ ⊳ *𝑵𝒖𝒎𝒃𝒆𝒓* : wa.me/${ownerNumber}
│ ⊳ *𝑯𝒆𝒚𝒚* : ${pushname || '𝑼𝒔𝒆𝒓'}, 𝑴𝒂𝒏 𝒉𝒂𝒅𝒖𝒘𝒆 𝒍𝒊𝒏𝒛𝒐 𝒂𝒊𝒚𝒂𝒚 𝑺𝒊𝒓𝒊𝙢𝒂𝒕𝒉 𝑴𝒂𝒍𝒍𝒊𝒚! 🙈🧃
│
╰───────────────⟡

> 📢 *𝑪𝒉𝒂𝒏𝒏𝒆𝒍:* ${channelLink}
> © 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝒎𝒅`;

        await conn.sendMessage(from, {
            image: { url: ownerImg },
            caption: ownerDesc
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*❌ 𝑬𝒓𝒓𝒐𝒓:* ${e.message}`);
    }
});
