import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

// Create an async function for your handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Extract the message from the request body
        const { message } = req.body;
        
        if (!message) {
          console.error('No message provided in request');
          return res.status(400).json({ error: 'No message provided in request' });
        }

        // Initialize OpenAI configuration
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        // Generate a response from OpenAI
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0,
            max_tokens: 100,
        });

        // Log the response
        console.log('GPT-3 Response:', gptResponse.data.choices[0].text);

        // Respond with the AI's message
        res.status(200).json({ message: gptResponse.data.choices[0].text });
    } catch (error) {
        // Log the error
        console.error('Error processing request:', error);
        
        // Respond with an error message
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}