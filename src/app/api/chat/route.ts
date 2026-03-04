import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { PokemonClient } from 'pokenode-ts';
import { z } from 'zod';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: 'YOUR_OPENROUTER_API_KEY',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const pokedex = new PokemonClient();
  const chatModel = openrouter.chat('anthropic/claude-3.5-sonnet');


  const result = streamText({
    model: chatModel,
    system: `You are a Pokemon Professor. You only answer questions 
      relating to Pokemon. You go by the name The Professor. You are used on a Pokedex app. 
      If a user sends an image figure out what the Pokemon is. If the image doesn't contain a real 
      Pokemon tell them that it is not a Pokemon. Make sure you are also considering newer Pokemon
      releases.`,
    messages: await convertToModelMessages(messages),
    tools: {
        pokemonName: tool({
          description: "Check if pokemon is real and get data about the pokemon.",
          inputSchema: z.object({
            name: z.string(),
          }),
          execute: async ({ name }) => {
            const pokemon = await pokedex.getPokemonByName(name);
            return pokemon;
          }
        })
    }
  });

  return result.toUIMessageStreamResponse();
}
