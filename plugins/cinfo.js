module.exports = {
    name: "cinfo",
    aliases: [],
    async execute({ conn, mek, m, from, sender, isOwner, isGroup, reply, quoted, q, args, body, pushname, botNumber, ownerNumber, readEnvSync, adhiqmini, GQCAP, prefix, runtime, os }) {
    try {
        if (!q) return reply(`❌ Use: ${prefix}cinfo <channel link>`);
        const parts = q.trim().split("/");
        const inviteId = parts[parts.indexOf("channel") + 1];
        if (!inviteId) return reply("❌ Invalid channel link.");
        const meta = await conn.newsletterMetadata('invite', inviteId);
        const filtered = {
            id: meta.id,
            status: meta.state?.type || "UNKNOWN",
            name: meta.thread_metadata?.name?.text || "N/A",
            description: meta.thread_metadata?.description?.text || "N/A",
            invite: meta.thread_metadata?.invite || "N/A",
            subscribers: meta.thread_metadata?.subscribers_count || "0",
            verification: meta.thread_metadata?.verification || "N/A"
        };
        let msg = `📢 *Channel Info*\n\n🆔 ID: ${filtered.id}\n📛 Name: ${filtered.name}\n📄 Description:\n${filtered.description}\n\n🔗 Invite: ${filtered.invite}\n👥 Subscribers: ${filtered.subscribers}\n✅ Status: ${filtered.status}\n🔒 Verification: ${filtered.verification}\n`;
        await reply(msg);
    } catch (e) { reply("❌ Failed to fetch channel info."); }
    }
};
