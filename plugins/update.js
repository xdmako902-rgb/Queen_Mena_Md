const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "update",
    desc: "Update bot configurations dynamically",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ *This command is only for the bot owner!*");
        if (!q) return reply("❌ *Please provide configuration to update. Example: .update AUTO_REACT:false*");

        const [key, value] = q.split(':').map(item => item.trim());
        if (!key || value === undefined) return reply("❌ *Invalid format! Use: .update KEY:value*");

        const configPath = path.join(__dirname, '../config.js');
        if (!fs.existsSync(configPath)) {
            return reply("❌ *config.js file not found!*");
        }

        let configContent = fs.readFileSync(configPath, 'utf8');

        // Parse value (boolean, number, or string)
        let parsedValue = value;
        if (value.toLowerCase() === 'true') parsedValue = true;
        else if (value.toLowerCase() === 'false') parsedValue = false;
        else if (!isNaN(value)) parsedValue = Number(value);

        // Regex to find and replace the config value
        const regex = new RegExp(`(${key}\\s*:\\s*)([^,\n]+)`, 'g');
        
        if (!regex.test(configContent)) {
            return reply(`❌ *Configuration key '${key}' not found in config.js!*`);
        }

        configContent = configContent.replace(regex, `$1${parsedValue}`);
        fs.writeFileSync(configPath, configContent, 'utf8');

        reply(`✅ *Successfully updated ${key} to ${parsedValue}!*\n\n_🔄 Restarting bot to apply changes..._`);
        
        setTimeout(() => {
            process.exit(0);
        }, 2000);

    } catch (e) {
        console.error("UPDATE_ERROR:", e);
        reply(`❌ *Error updating config:* ${e.message}`);
    }
});
