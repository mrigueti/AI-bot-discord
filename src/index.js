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
const prefix = '!youka';

// Evento executado quando o bot está online
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Bot conectado como ${readyClient.user.tag}!`);
});

// Armazenar histórico de conversas por canal
const conversationHistory = new Map();

// Função para limpar histórico antigo (manter últimas 50 mensagens)
function cleanOldHistory(channelId) {
    const history = conversationHistory.get(channelId) || [];
    if (history.length > 50) {
        history.splice(0, history.length - 50);
        conversationHistory.set(channelId, history);
    }
}

// Evento para processar mensagens
client.on(Events.MessageCreate, async (message) => {
    // Ignorar mensagens de bots e mensagens que não começam com o prefixo
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Obter o conteúdo da mensagem sem o prefixo
    const prompt = message.content.slice(prefix.length).trim();

    if (!prompt) {
        message.reply('Por favor, digite uma pergunta após o comando !youka');
        return;
    }

    try {
        // Enviar indicação de digitação enquanto processa
        await message.channel.sendTyping();

        // Obter histórico do canal
        const channelHistory = conversationHistory.get(message.channel.id) || [];
        
        // Adicionar mensagem atual ao histórico
        channelHistory.push({
            role: 'user',
            content: prompt,
            timestamp: new Date().toISOString()
        });

        console.log(`Processando pergunta: "${prompt}"`);

        // Obter resposta da API gemini com contexto do histórico
        const response = await generateResponse(prompt, channelHistory);

        // Adicionar resposta ao histórico
        channelHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString()
        });

        // Atualizar histórico no Map
        conversationHistory.set(message.channel.id, channelHistory);

        // Limpar histórico antigo
        cleanOldHistory(message.channel.id);

        // Verificar se a resposta é muito longa para um único envio
        if (response.length > 2000) {
            // Dividir em múltiplas mensagens
            const chunks = response.match(/(.|\n){1,2000}/g) || [];
            for (const chunk of chunks) {
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
