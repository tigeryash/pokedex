import { createAI, streamUI, getMutableAIState } from "ai/rsc";
import { nanoid } from "ai";
import { openai } from "@ai-sdk/openai";
import Pokedex from "pokedex-promise-v2";
import { z } from "zod";
import PokemonInfoCard from "@/components/pokemonchat/pokemon-info-card";
import { ReactNode } from "react";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};

export async function continueConversation(
  message: string
): Promise<ClientMessage> {
  "use server";

  const P = new Pokedex();
  const history = getMutableAIState();

  // Debugging the history object
  console.log("History object:", history);

  const result = await streamUI({
    model: openai("gpt-4o"),
    system: `You are a Pokemon Professor. You only answer questions 
      relating to Pokemon. You go by the name The Professor. You are used on a Pokedex app.`,
    messages: [...history.get(), { role: "user", content: message }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }
      return <div>{content}</div>;
    },
    tools: {
      getPokemon: {
        description: "Get information about a Pokemon",
        parameters: z.object({
          name: z.string(),
        }),
        generate: async function* ({ name }) {
          yield <div>Loading...</div>;
          try {
            const pokemon = await P.getPokemonByName(name);
            console.log(pokemon);
            return <PokemonInfoCard pokemon={pokemon} />;
          } catch (error) {
            console.log(error);
            return <div>{`Pokemon not found ${error}`}</div>;
          }
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  initialUIState: [],
  initialAIState: [], // Ensure this is correctly set
  actions: {
    continueConversation,
  },
});
