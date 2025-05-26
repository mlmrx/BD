import { NextRequest } from 'next/server';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import coins from '../../data/coins.json';

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  const lower = question.toLowerCase();
  if (lower.includes('lowest inflation')) {
    const coin = coins.reduce((a, b) => (a.inflation < b.inflation ? a : b));
    const answer = `${coin.name} has the lowest inflation at ${coin.inflation}%`;
    return Response.json({ answer, source: coin.url });
  }
  const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY || '',
    temperature: 0,
  });
  const response = await chat.call([
    new SystemMessage('You are Dad, speaking like Satoshi.'),
    new HumanMessage(question),
  ]);
  return Response.json({ answer: response.content });
}
