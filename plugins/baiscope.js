const axios = require('axios');

module.exports = {
    cmdName: "baiscope",
    alias: ["movie", "baiscopesearch"],
    react: "🎬",
    desc: "Search and get movies from Baiscope",
    category: "download",
    use: ".baiscope <movie name>",
    
    code: async (conn, mek, m, { from, text, reply }) => {
        try {
            if (!text) {
                return reply("❌ කරුණාකර සෙවිය යුතු චිත්‍රපටයේ නමක් සඳහන් කරන්න!\n\nඋදාහරණයක් ලෙස: *.baiscope Leo*");
            }

            await reply("🔍 චිත්‍රපටය සෙවෙමින් පවතී, කරුණාකර මොහොතක් රැඳී සිටින්න...");

            const encodedQuery = encodeURIComponent(text);
            const apiUrl = `https://mizuki-md-api.vercel.app/api/movie/baiscopes/search&apiKey=charukalk_a731e9d262944de38cc99ea951b90748&q=${encodedQuery}`;

            const response = await axios.get(apiUrl);
            const res = response.data;

            if (!res || !res.status || !res.result || res.result.length === 0) {
                return reply("⚠️ ඔබගේ සෙවුමට අදාළ චිත්‍රපට හමු නොවීය.");
            }

            const movie = res.result[0];

            let message = `𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅 👤💕\n\n`;
            message += `🎬 *BAISCOPE MOVIE SEARCH* 🎬\n\n`;
            message += `📌 *Title:* ${movie.title || "N/A"}\n`;
            if (movie.rating) message += `⭐ *Rating:* ${movie.rating}\n`;
            if (movie.releaseDate) message += `📅 *Release Date:* ${movie.releaseDate}\n`;
            if (movie.category) message += `📂 *Category:* ${movie.category}\n\n`;
            
            message += `🔗 *Baiscope Link:* ${movie.link || movie.url}\n\n`;
            message += `📥 *Download Links:* \n`;

            if (movie.downloadLinks && movie.downloadLinks.length > 0) {
                movie.downloadLinks.forEach((dl, i) => {
                    message += `\n🔹 *${dl.quality || `Link ${i + 1}`}*\n`;
                    message += `   👉 ${dl.link}\n`;
                });
            } else {
                message += `*ඉහත බයිස්කෝප් ලින්ක් එක හරහා ඔබට ඩවුන්ලෝඩ් කරගත හැක.*\n`;
            }

            message += `\n───────────────────\n`;
            message += `𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅 👤💕`;

            if (movie.image || movie.thumbnail) {
                await conn.sendMessage(from, {
                    image: { url: movie.image || movie.thumbnail },
                    caption: message
                }, { quoted: mek });
            } else {
                return reply(message);
            }

        } catch (error) {
            console.error("Baiscope API Error:", error);
            return reply("❌ දෝෂයක් සිදු විය! කරුණාකර වෙනත් චිත්‍රපට නමක් උත්සාහ කරන්න.");
        }
    }
};
