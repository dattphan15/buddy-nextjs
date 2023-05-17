import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

// Create an async function for your handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // Extract the message from the request body
  const { message } = req.body;

  // Initialize OpenAI configuration
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Generate a response from OpenAI
  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0.5,
    max_tokens: 100,
  });

  // Respond with the AI's message
  res.status(200).json({ message: gptResponse.data.choices[0].text });
}