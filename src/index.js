// modulos necessarios
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { generateResponse } from './geminiService.js';

// carregar variaveis de ambiente
dotenv.config();

// criar cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// prefixo para comandos do bot
const prefix = '!bot';

// Evento executado quando o bot está online
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Bot conectado como ${readyClient.user.tag}!`);
});


// Evento para processar mensagens
client.on(Events.MessageCreate, async (message) => {
    // Ignorar mensagens de bots e mensagens que não começam com o prefixo
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Obter o conteúdo da mensagem sem o prefixo
    const prompt = message.content.slice(prefix.length).trim();

    if (!prompt) {
        message.reply('Por favor, digite uma pergunta após o comando !bot');
        return;
    }

    try {
        // Enviar indicação de digitação enquanto processa
        await message.channel.sendTyping();

        console.log(`Processando pergunta: "${prompt}"`);

        // Obter resposta da API gemini
        const response = await generateResponse(prompt);

        // Verificar se a resposta é muito longa para um único envio
        if (response.length > 2000) {
            // Dividir em múltiplas mensagens
            for (let i = 0; i < response.length; i += 2000) {
                const chunk = response.substring(i, Math.min(response.length, i + 2000));
                await message.reply(chunk);
            }
        } else {
            await message.reply(response);
        }
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        message.reply('Desculpe, ocorreu um erro ao processar sua solicitação.');
    }
});

// Conectar o bot usando o token
client.login(process.env.DISCORD_TOKEN);