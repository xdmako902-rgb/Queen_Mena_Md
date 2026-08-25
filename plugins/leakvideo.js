const { cmd } = require('../command');

// Queen Mena MD Newsletter Context (අවශ්‍ය නම් භාවිතා කිරීමට)
const newsletterContext = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: "120363412261622272@newsletter",
        newsletterName: "𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅 🦋!",
        serverMessageId: 1
    }
};

//================= LEAKVIDEO 1 =================

cmd({
    pattern: "leakvideo",
    alias: ["randomvideo", "video1"],
    desc: "Send random leak video",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        await reply("⏳ *Fetching leak video, please wait...*");

        const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos";

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: "🎬 *𝑹𝒂𝒏𝒅𝒐𝒎 𝑳𝒆𝒂𝒌 𝑽𝒊𝒅𝒆𝒐 1*\n\n> © *𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫 🦋*",
            contextInfo: newsletterContext
        }, { quoted: mek });

    } catch (err) {
        console.error("LeakVideo 1 Error:", err);
        reply("❌ *Failed to load video. Please try again later!*");
    }
});


//================= LEAKVIDEO 2 =================

cmd({
    pattern: "leakvideo2",
    alias: ["randomvideo2", "video2"],
    desc: "Send random leak video 2",
    category: "download",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        await reply("⏳ *Fetching leak video 2, please wait...*");

        const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos2";

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: "🔥 *𝑹𝒂𝒏𝒅𝒐𝒎 𝑳𝒆𝒂𝒌 𝑽𝒊𝒅𝒆𝒐 2*\n\n> © *𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫 🦋*",
            contextInfo: newsletterContext
        }, { quoted: mek });

    } catch (err) {
        console.error("LeakVideo 2 Error:", err);
        reply("❌ *Failed to load video. Please try again later!*");
    }
});
