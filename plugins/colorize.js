const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');

cmd({
    pattern: "colorize",
    alias: ["color", "🎨"],
    desc: "Add color to black and white images.",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        if (!mime.includes('image')) {
            return reply("*𝑷𝒍𝒆𝒂𝒔𝒆 𝑹𝒆𝒑𝒍𝒚 𝑻𝒐 𝑨 𝑩𝒍𝒂𝒄𝒌 & 𝑾𝒉𝒊𝒕𝒆 𝑰𝒎𝒂𝒈𝒆!*");
        }

        const { key } = await conn.sendMessage(from, { text: "*𝑰𝒏𝒊𝒕𝒊𝒂𝒍𝒊𝒛𝒊𝒏𝒈 𝑪𝒐𝒍𝒐𝒓𝒊𝒛𝒆...*" }, { quoted: mek });

        const mediaBuffer = await q.download();
        if (!mediaBuffer) {
            return reply("*𝑭𝒂𝒊𝒍𝒆𝒅 𝒕𝒐 𝒅𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝒎𝒆𝒅𝒊𝒂!*");
        }

        await conn.sendMessage(from, { text: "*𝑼𝒑𝒍𝒐𝒂𝒅𝒊𝒏𝒈 𝑻𝒐 𝑺𝒆𝒓𝒗𝒆𝒓...*", edit: key });

        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', mediaBuffer, { filename: 'colorize.jpg' });

        const catboxRes = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: { ...form.getHeaders() }
        });

        const catboxUrl = String(catboxRes.data).trim();

        if (!catboxUrl.startsWith('http')) {
            throw new Error("Failed to upload image to temporary server.");
        }

        await conn.sendMessage(from, { text: "*𝑪𝒐𝒍𝒐𝒓𝒊𝒛𝒊𝒏𝒈 𝑰𝒎𝒂𝒈𝗲...*", edit: key });

        const apiRes = await axios.get(`https://www.movanest.xyz/v2/colorize?image_url=${encodeURIComponent(catboxUrl)}`);
        const resData = apiRes.data;

        if (resData && (resData.status === true || resData.status === 200) && resData.results?.output_url) {
            const finalImage = resData.results.output_url;

            await conn.sendMessage(from, {
                image: { url: finalImage },
                caption: "*𝑪𝒐𝒍𝒐𝒓𝒊𝒛𝒆𝒅 𝑺𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚!*\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅"
            }, { quoted: mek });

            await conn.sendMessage(from, { text: "*𝑭𝒊𝒏𝒊𝒔𝒉𝒆𝒅!*", edit: key });
        } else {
            throw new Error(resData?.message || "API did not return a valid image.");
        }

    } catch (e) {
        console.error(e);
        reply("*𝑬𝒓𝒓𝒐𝒓:* " + (e.message || e));
    }
});
