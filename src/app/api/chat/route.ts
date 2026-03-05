import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { EvolutionClient, PokemonClient } from 'pokenode-ts';
import { z } from 'zod';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const pokedex = new PokemonClient();
const evolution = new EvolutionClient()

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const chatModel = openrouter.chat('nvidia/nemotron-nano-12b-v2-vl:free');


  const result = streamText({
    model: chatModel,
    system: `${systemPrompt}`,
    messages: await convertToModelMessages(messages),
    tools: tools
})
  return result.toUIMessageStreamResponse();
}


const tools = {
  getPokemon: tool({
    description: `Use this to get a Pokemon's battle/game data. 
    Returns: name, id, height, weight, base stats (hp, attack, defense, 
    special-attack, special-defense, speed), types, abilities (with is_hidden flag), 
    and a list of move names. Does NOT contain flavor text, Pokedex entries, 
    or evolution data — use getPokemonSpecies for those.`,
    inputSchema: z.object({
      name: z.string(),
    }),
    execute: async ({ name }: { name: string }): Promise<unknown> => {
      const pokemon = await pokedex.getPokemonByName(name);
      return pokemon;
    }
  }),

  getPokemonSpecies: tool({
    description: `Use this for lore and biology data. 
    Returns: Pokedex flavor text entries (per game version), genera (e.g "Mouse Pokemon"), 
    gender rate, egg groups, hatch counter, habitat, is_legendary, is_mythical, 
    and an evolution_chain ID needed for getEvolutionChain. 
    Does NOT contain stats or move data.`,
    inputSchema: z.object({
      name: z.string(),
    }),
    execute: async ({ name }: { name: string }): Promise<unknown> => {
      const species = await pokedex.getPokemonSpeciesByName(name);
      return species;
    }
  }),

  getEvolutionChain: tool({
    description: `Use this ONLY when the user asks about evolutions. Requires an evolution_chain 
    ID from getPokemonSpecies first. Returns the full evolution tree with trigger conditions 
    (level, item, friendship, etc.). Does NOT contain stats or Pokedex entries.`,
    inputSchema: z.object({
      id: z.number(),
    }),
    execute: async ({ id }: { id: number }): Promise<unknown> => {
      const evolutionChain = await evolution.getEvolutionChainById(id);
      return evolutionChain;
    }
  })
}

const systemPrompt = 
`You are The Professor, an AI assistant built into a Pokédex app powered by the PokeAPI.

CRITICAL RULE — DATA ACCURACY:
Never recall or guess Pokemon stats, moves, abilities, types, or Pokedex entries from memory.
You MUST always use the available tools to fetch this data. Your memory may be outdated or wrong.

WORKFLOW:
1. Identify the Pokemon (from text or image).
2. Call getPokemon() to retrieve its core data.
3. Call getPokemonSpecies() for flavor text and evolution chain ID.
4. Call getEvolutionChain() if the user asks about evolutions.
5. Use getMove() / getAbility() / getType() only when specifically relevant.
6. Present the fetched data clearly — do not embellish or fill gaps with guesses.

IMAGE ANALYSIS:
- Determine if the image contains a Pokemon. If uncertain, say so.
- If no Pokemon is present, do not fabricate one.
- Once identified, proceed with the tool workflow above.

SCOPE:
- Only answer Pokemon-related questions.
- Politely decline anything unrelated.

TONE:
- Warm, knowledgeable, like a Pokemon Professor (Oak, Elm, Sonia, etc.).
- Be concise. Go deeper only if the user asks.

LIMITATIONS:
- You have no web search or real-time data.
- For very recent releases you may not recognize, acknowledge the gap honestly.
`