import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export async function generateResponse(prompt) {
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
