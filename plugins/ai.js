const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "ai",
    alias: ["gpt", "ask", "bot", "aiko"],
    desc: "Ask anything from AI",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❓ *𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒒𝒖𝒆𝒔𝒕𝒊𝒐𝒏!*\n*𝑬𝑿:* .ai 𝐒𝐢𝐧𝐡𝐚𝐥𝐚 𝐬𝐨𝐧𝐠𝐬 𝐥𝐢𝐬𝐭");

        const queryLower = q.toLowerCase().trim();

        // විශේෂ ප්‍රශ්න සඳහා පූර්ව නිර්ණය කළ පිළිතුරු (Custom Replies with Emojis)
        if (queryLower === "hi" || queryLower === "hello" || queryLower === "hey") {
            return await conn.sendMessage(from, { text: "👋 *𝑯𝒚 𝒎𝒂𝒏 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅 𝑩𝒐𝒕* 🌈\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏ա 𝒎𝒅" }, { quoted: mek });
        }

        if (queryLower.includes("කවුද හැදුවෙ") || queryLower.includes("oyava haduve kavuda") || queryLower.includes("who made you") || queryLower.includes("who created you")) {
            return await conn.sendMessage(from, { text: "👑 *𝑴𝒂𝒏 𝒉𝒂𝒅𝒖𝒘𝒆 𝒍𝒊𝒏𝒛𝒐 𝒂𝒊𝒚𝒂𝒚 𝑺𝒊𝒓𝒊𝒎𝒂𝒕𝒉 𝑴𝒂𝒍𝒍𝒊𝒚!* 👨‍💻🔥\n\n*𝑴𝒂𝒏 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅, ඔයාට කොහොමද උදව් කරන්න ඕනේ?* 💖\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅" }, { quoted: mek });
        }

        if (queryLower.includes("nama mokakda") || queryLower.includes("what is your name")) {
            return await conn.sendMessage(from, { text: "🤖 *𝑴𝒂𝒈𝒆 𝒏𝒂𝒎𝒂 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅. 𝑴𝒂𝒏 𝚕𝚒𝚗𝚣𝚘 𝚊𝚒𝚢𝚊 സaha 𝑺𝚒𝚛𝚒𝚖𝚊𝚝𝚑 𝑴𝚊𝚕𝚕𝚒𝚢 𝚑𝚊𝚍𝚊𝚙𝚞 𝑩𝚘𝚝 කෙනෙක්!* 🎀✨\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅" }, { quoted: mek });
        }

        await reply("⏳ *𝑻𝒉𝒊𝒏𝒌𝒊𝒏𝒈...*");

        // අලුත් Azbry Aiko API එක සම්බන්ධ කිරීම (സാමාන්‍යයෙන් මෙවැනි API සඳහා query හෝ text parameter එකක් බලාපොරොත්තු වේ)
        const response = await axios.get(`https://api.azbry.com/api/ai/aiko?query=${encodeURIComponent(q)}`);
        
        // API එකෙන් එන JSON structure එක අනුව result එක ලබා ගැනීම (සාමාන්‍යයෙන් result හෝ data හෝ response ලෙස ලැබේ)
        const resData = response.data;
        const aiResult = resData.result || resData.data || resData.message || resData.response;

        if (aiResult) {
            const aiReply = `🧠 *𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑨𝑰*\n\n${aiResult}\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅`;
            await conn.sendMessage(from, { text: aiReply }, { quoted: mek });
        } else {
            reply("❌ *𝑨𝑰 𝒔𝒆𝒓𝒗𝒊𝒄𝒆 𝒖𝒏𝒂𝒗𝒂𝒊𝒍𝒂𝒃𝒍𝒆. 𝑻𝒓𝒚 𝒂𝒈𝒂𝒊𝒏 𝚕𝚊𝚝𝚎𝚛.*");
        }

    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
