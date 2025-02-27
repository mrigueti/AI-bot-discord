import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Gera uma resposta usando a API Gemini
 * @param {string} prompt - A pergunta ou prompt para enviar à API
 * @param {string} harmBlockThreshold - O nível de bloqueio de censura
 * @returns {Promise<string>} - A resposta gerada
 */
export async function generateResponse(prompt, harmBlockThreshold = 'BLOCK_NONE') {
  try {
    // Preparar o corpo da requisição conforme a documentação da API Gemini
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: harmBlockThreshold
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: harmBlockThreshold
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: harmBlockThreshold
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: harmBlockThreshold
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };

    // Fazer uma requisição POST para a API Gemini
    const response = await axios.post(
      process.env.GEMINI_API_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Verificar e retornar a resposta da API Gemini
    if (response.data && response.data.candidates && response.data.candidates[0].content.parts[0].text) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      console.log("Formato de resposta inesperado:", response.data);
      return JSON.stringify(response.data);
    }
  } catch (error) {
    console.error('Erro ao chamar a API Gemini:', error.response ? error.response.data : error.message);
    throw new Error('Falha ao gerar resposta da IA');
  }
}