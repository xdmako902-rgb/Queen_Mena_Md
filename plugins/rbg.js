const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');

// Optimized axios instance for fast API requests
const httpClient = axios.create({
    timeout: 20000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
});

cmd({
    pattern: "removebg",
    alias: ["rbg", "bgremove"],
    desc: "Remove the background of an image.",
    category: "image",
    react: "✂️",
    filename: __filename
},
async (conn, mek, m, { from, reply, quoted }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        
        if (!mime.startsWith('image/')) return reply("*𝑷𝒍𝒆𝒂𝒔𝒆 𝒓𝒆𝒑𝒍𝒚 𝒕𝒐 𝒂𝒏 𝒊𝒎𝒂𝗴𝒆.*");

        const { key } = await conn.sendMessage(from, { text: "*𝑨𝒏𝒂𝒍𝒚𝒛𝒊𝒏𝒈 𝑰𝒎𝒂𝒈𝒆...*" }, { quoted: mek });

        // Download image buffer
        let media = await (q.download ? q.download() : conn.downloadMediaMessage(q));

        await conn.sendMessage(from, { text: "*𝑼𝒑𝒍𝒐𝒂𝒅𝒊𝒏𝒈 𝒕𝒐 𝑪𝒍𝒐𝒖𝒅...*", edit: key });
        
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", media, { filename: "image.jpg", contentType: mime });

        const uploadRes = await httpClient.post("https://catbox.moe/user/api.php", form, {
            headers: form.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        
        const imageUrl = uploadRes.data.trim();

        if (!imageUrl.startsWith("http")) {
            return reply("*𝑰𝒎𝒂𝒈𝒆 𝑼𝒑𝒍𝒐𝒂𝒅 𝑭𝒂𝒊𝒍𝒆𝒅! 𝑻𝒓𝒚 𝒂𝒈𝒂𝒊𝒏.*");
        }

        await conn.sendMessage(from, { text: "*𝑹𝒆𝒎𝒐𝒗𝒊𝒏𝒈 𝑩𝒂𝒄𝒌𝒈𝒓𝒐𝒖𝒏𝒅...*", edit: key });

        const apiUrl = `https://www.movanest.xyz/v2/removebg?image_url=${encodeURIComponent(imageUrl)}`;
        const rbgResponse = await httpClient.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(from, { 
            image: Buffer.from(rbgResponse.data), 
            caption: "*𝑹𝑬𝑴𝑶𝑽𝑬𝑩𝑮 𝑺𝑼𝑪𝑪𝑬𝑺𝑺𝑭𝑼𝑳𝑳𝒀!*\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅" 
        }, { quoted: mek });

        await conn.sendMessage(from, { text: "*𝑷𝒓𝒐𝒄𝒆𝒔𝒔 𝑪𝒐𝒎𝒑𝒍𝒆𝒕𝒆𝒅!*", edit: key });

    } catch (e) {
        console.error(e);
        reply("*𝑬𝒓𝒓𝒐𝒓:* " + (e.response?.data?.message || e.message));
    }
});
