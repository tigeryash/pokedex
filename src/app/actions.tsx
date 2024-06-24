import { createAI, streamUI, getMutableAIState } from "ai/rsc";
import { nanoid } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import PokemonInfoCard from "@/components/pokemonchat/pokemon-info-card";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PokemonClient } from "pokenode-ts";

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

  const P = new PokemonClient();
  const history = getMutableAIState();

  // Debugging the history object

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
      return (
        <ReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      );
    },
    tools: {
      getPokemon: {
        description:
          "Get information about a Pokemon when given a Pokemon name or a Pokemon ID",
        parameters: z.object({
          name: z.string().or(z.number()),
        }),
        generate: async function* ({ name }) {
          yield <div>Loading...</div>;
          try {
            const Pname =
              typeof name === "string"
                ? await P.getPokemonByName(name.toString().toLowerCase())
                : await P.getPokemonById(name);
            const species =
              typeof name === "string"
                ? await P.getPokemonSpeciesByName(name.toString().toLowerCase())
                : await P.getPokemonSpeciesById(name);
            const pokemon = [Pname, species];
            return <PokemonInfoCard pokemon={pokemon} />;
          } catch (error) {
            console.log(error);
            return <div>{`Pokemon not found ${error} ${name}`}</div>;
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
