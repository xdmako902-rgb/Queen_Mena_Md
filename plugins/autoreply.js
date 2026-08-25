import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ON / OFF Command
cmd({
    pattern: "autoreply",
    desc: "Turn on/off auto reply",
    category: "other",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { reply, isOwner, args }) => {

    if (!isOwner) return reply("*Owner only ❌*")

    if (args[0] === "on") {
        global.AUTO_REPLY = true
        reply("*✅ Auto Reply Enabled*")
    } else if (args[0] === "off") {
        global.AUTO_REPLY = false
        reply("*❌ Auto Reply Disabled*")
    } else {
        reply("*Use: .autoreply on / off*")
    }
})


// AUTO REPLY SYSTEM
const replies = {

    "hi": "👋 Hello! කොහොමද?",
    "hallow": "👋 Hi there! 😊",
    "hey": "👋 Hye මොකක්ද උදව්ව?",
    "good morning": "🌅 Good Morning! සුභ දවසක් වේවා 😊",
    "good night": "🌙 Good Night! හොඳින් නිදාගන්න 😴",

    "bot": "*🤖 ඔව් මම හැදුවෙ මැකො අයියා තමා 🧸*",
    "are you bot": "🤖 ඔව්! මම auto reply bot එකක් 😎",
    "alive": "✅ Bot is alive & working!",

    "owner": "👤 Owner: 0766398472",
    "admin": "👑 Admin available!",
    "help": "📌 Commands list ඕනි නම් කියන්න 😊",

    "how are you": "😊 මම fine! ඔයා?",
    "what are you doing": "🤖 Messages reply කරනවා 😎",
    "lol": "😂😂😂",
    "haha": "🤣 Nice one!",
    "Dina": "❤️ තනිකර පිස්සු කෝලමක් 😍",

    "busy": "⏳ දැන් ටිකක් busy. පස්සේ reply කරන්නම් 😊",
    "wait": "⌛ ටිකක් ඉන්න... reply දෙන්නම්",
    "online": "🟢 Yes I'm here!",

    "bye": "👋 Bye! පස්සේ හම්බවෙමු 😊",
    "goodbye": "👋 Goodbye!",
    "see you": "👋 See you again!",

    "කොහොමද": "😊 හොඳින්! ඔයා?",
    "මොකද": "🤔 කියන්න බලන්න",
    "ආයුබෝවන්": "🙏 ආයුබෝවන්! කොහොමද?",
    "ස්තූතියි": "🙏 Welcome!"
}


// MESSAGE LISTENER
cmd({
    on: "body"
},
async (conn, mek, m, { body, isGroup }) => {

    if (m.key.fromMe) return
    if (!global.AUTO_REPLY) return

    const msg = body.toLowerCase()

    let matched = false

    for (let key in replies) {
        if (msg.includes(key)) {
            matched = true
            await conn.sendMessage(m.chat, { text: replies[key] }, { quoted: mek })
            break
        }
    }

    // ❌ no default reply (only matched keywords reply)
})