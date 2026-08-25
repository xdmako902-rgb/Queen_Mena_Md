const { cmd } = require('../command');

cmd({
    pattern: "poll",
    alias: ["vote", "pool"],
    desc: "Create a poll/vote in the group.",
    category: "other",
    use: '.poll Question | Option1 | Option2 | Option3',
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, reply }) => {
    try {
        if (!isGroup) return reply("❌ 𝑴𝒆𝒆 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒆𝒌𝒂 𝑮𝒓𝒐𝒖𝒑 𝒆𝒌𝒂𝒌𝒂 𝒘𝒊𝒕𝒂𝒓𝒂𝒊 𝒑𝒂𝒂𝒗𝒊𝒄𝒄𝒉𝒊 𝒌𝒂𝒓𝒂𝒏𝒏𝒂 𝒑𝒖𝒍𝒖𝒘𝒂𝒏.");
        if (!q) return reply("⚠️ 𝑲𝒂𝒓𝒖𝒏𝒂𝒂𝒌𝒂𝒓𝒂 𝒑𝒓𝒂𝒔𝒉𝒏𝒂𝒚𝒂 𝒔𝒂𝒉𝒂 𝒖𝒕𝒉𝒕𝒉𝒂𝒓𝒂 𝒂𝒆𝒕𝒉𝒖𝒍𝒂𝒕𝒉 𝒌𝒂𝒓𝒂𝒏𝒏𝒂.\n\n*𝑬𝑿:* .poll 𝑶𝒚𝒂𝒍𝒂𝒕𝒂 𝒎𝒐𝒏𝒂 𝒃𝒐𝒕 𝒆𝒌𝒂𝒅𝒂 𝒉𝒐𝒏𝒅𝒂? | 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅 | 𝑶𝒕𝒉𝒆𝒓");

        const parts = q.split('|');
        
        if (parts.length < 3) {
            return reply("⚠️ 𝑲𝒂𝒓𝒖𝒏𝒂𝒂𝒌𝒂𝒓𝒂 𝒂𝒗𝒂𝒎𝒂 𝒘𝒂𝒔𝒉𝒂𝒏𝒂𝒚𝒆𝒏 𝒑𝒓𝒂𝒔𝒉𝒏𝒂𝒚𝒂𝒌 𝒔𝒂𝒉𝒂 𝒖𝒕𝒉𝒕𝒉𝒂𝒓𝒂 2𝒘𝒂𝒕𝒘 𝒂𝒆𝒕𝒉𝒖𝒍𝒂𝒕𝒉 𝒌𝒂𝒓𝒂𝒏𝒏𝒂. (𝑾𝒆𝒏 𝒌𝒂𝒓𝒂𝒏𝒏𝒂 | 𝒍𝒂𝒌𝒖𝒏𝒂 𝒑𝒂𝒂𝒗𝒊𝒄𝒄𝒉𝒊 𝒌𝒂𝒓𝒂𝒏𝒏𝒂)");
        }

        const question = parts[0].trim();
        const options = parts.slice(1).map(opt => opt.trim());

        await conn.sendMessage(from, {
            poll: {
                name: question,
                values: options,
                selectableCount: 1
            }
        });

    } catch (e) {
        console.log("Poll Command Error:", e);
        reply("❌ 𝑷𝒐𝒍𝒍 𝒆𝒌𝒂 𝒉𝒂𝒅𝒂𝒅𝒅𝒉𝒆𝒆 𝒑𝒐𝒅𝒊 𝒂𝒖𝒍𝒂𝒌 𝒂𝒂𝒘𝒂.");
    }
});
