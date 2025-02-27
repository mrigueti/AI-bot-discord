# Simple Discord AI Bot

<div align="center">
  <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"/>
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
</div>

### 📝 Description

This project is a simple template for creating a Discord bot with artificial intelligence capabilities using the Google Gemini API. With this template, you can easily build a bot that responds to messages with advanced AI capabilities.

### ✨ Features

- Full Discord.js integration
- Google Gemini API implementation for AI features
- Customizable command system
- Conversation context management
- Simple configuration

### 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/mrigueti/simple-discord-AI.git
cd simple-discord-AI
```

2. Install dependencies:
```bash
npm install
```

3. Edit the `.env` file with your credentials:
```
DISCORD_TOKEN=your_discord_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### ⚙️ Configuration

1. **Create a Discord application**:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application and get the bot token

2. **Get a Gemini API key**:
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create an API key for Gemini

3. **Invite the bot to your server**:
   - Use the OAuth2 URL generated in the Discord developer portal

### 💻 Usage

Run the bot with:
```bash
node index.js
```

**Basic commands**:
- `!bot [message]` - Start a conversation with context

### 📋 Requirements

- Node.js 16.x or higher
- Internet connection
- Discord account
- Access to Gemini API

## ⚠️ Discord Permissions and Configuration

### Discord Developer Portal - Intents

For your bot to work properly, you need to enable the appropriate "Intents" in the Discord Developer Portal:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. In the "Bot" section, scroll down to find "Privileged Gateway Intents"
4. You will likely need to enable:
   - **MESSAGE CONTENT INTENT** - Allows the bot to read message content (essential for commands)
   - **SERVER MEMBERS INTENT** - If your bot needs to access information about server members
   - **PRESENCE INTENT** - If your bot needs to detect user presence status

![Discord Intents](https://i.imgur.com/RdJwVyj.png)

### OAuth2 Permissions

When inviting the bot to a server, you need to specify the correct permissions:

1. In the Discord Developer Portal, go to "OAuth2" > "URL Generator"
2. Under "SCOPES", select `bot` and `applications.commands`
3. Under "BOT PERMISSIONS", select the necessary permissions:
   - `Send Messages`
   - `Read Message History`
   - `Read Messages/View Channels`
   - `Embed Links` (if your bot sends embeds)
   - Any other specific permissions your bot might need

4. Use the generated URL to invite the bot to your server

### About discord.js

This project uses [discord.js](https://discord.js.org/), a powerful Node.js library to interact with the Discord API. Important points:

- **Compatible version**: This project requires discord.js v14+ which works with the latest Discord API
- **Node.js**: Make sure to use Node.js 16.x or higher (as per library requirements)
- **Code structure**: This template implements a modular approach to facilitate bot expansion

#### Example code for initialization:

```javascript
// Example of how to set up the client with necessary intents
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    // Add other intents as needed
  ] 
});

client.login(process.env.DISCORD_TOKEN);
```
