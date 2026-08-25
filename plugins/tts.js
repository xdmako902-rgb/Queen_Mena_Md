const { cmd } = require('../command');
const googleTTS = require('google-tts-api');

cmd({
    pattern: "tts",
    alias: ["say", "voice"],
    desc: "Convert text to speech audio",
    category: "convert",
    react: "🗣️",
    filename: __filename
},
async (sock, msg, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ *හඬක් බවට පත් කිරීමට අවශ්‍ය Text එක ලබා දෙන්න! (උදා: .tts hello)*");

        // Get audio URL from google-tts-api
        const audioUrl = googleTTS.getAudioUrl(q, {
            lang: 'si',
            slow: false,
            host: 'https://translate.google.com',
        });

        if (!audioUrl) return reply("❌ *හඬ පටය ලබාගැනීමට නොහැකි විය!*");

        // Fetch audio as buffer using Node.js built-in fetch
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Send voice note (PTT)
        await sock.sendMessage(from, { 
            audio: buffer, 
            mimetype: 'audio/mp4', 
            ptt: true 
        }, { quoted: msg });

    } catch (e) {
        console.error("TTS Error:", e);
        reply("❌ *හඬ පටය සෑදීමේදී දෝෂයක් සිදුවිය!*");
    }
});
