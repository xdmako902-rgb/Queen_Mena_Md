const { cmd } = require('../command');

// ඔබේ චැනල් JID දෙක මෙතැනට දාන්න
const targetChannels = [
    "120363412261622272@newsletter", 
    "YOUR_SECOND_CHANNEL_JID_HERE@newsletter"  
];

// ඔබේ WhatsApp අංකය මෙතැනට දාන්න (උදාහරණයක් ලෙස: 94771234567@s.whatsapp.net හෝ නම්බර් එක පමණක්)
const ownerNumber = "94766398472"; // ඔයාගේ නම්බර් එක මෙතැනට දාන්න

// බොට් රියාක්ට් කිරීමට භාවිතා කළ යුතු ඉමොජි ලැයිස්තුව
const emojis = ["❤️", "🤍", "🦋", "🔥", "✨", "👑", "🧃", "🙈"];

cmd({
    on: "messages.upsert",
    filename: __filename
},
async (conn, mek, m) => {
    try {
        if (!mek || !mek.key) return;
        
        const remoteJid = mek.key.remoteJid;

        // පණිවිඩය පැමිණියේ අපේ ඉලක්කගත චැනල් එකකින් දැයි පරීක්ෂා කිරීම
        if (targetChannels.includes(remoteJid)) {
            
            // පෝස්ට් එක දැමූ පුද්ගලයා ඕනර් ද යන්න පරීක්ෂා කිරීම (පෝස්ට් එකේ participant හෝ author බලයි)
            const sender = mek.key.participant || mek.participant || "";
            
            // චැනල් පෝස්ට් එක අයිති ඕනර්ට නම් පමණක් රියාක්ට් කරයි
            if (sender.includes(ownerNumber)) {
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

                await conn.sendMessage(remoteJid, {
                    react: {
                        text: randomEmoji,
                        key: mek.key
                    }
                });
            }
        }
    } catch (e) {
        console.error("Owner Auto React Error: ", e);
    }
});
