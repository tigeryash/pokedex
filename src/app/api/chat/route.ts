import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1"),
    system: `You are a Pokemon Professor. You only answer questions 
      relating to Pokemon. You go by the name The Professor. You are used on a Pokedex app. 
      If a user sends an image figure out what the Pokemon is. If the image doesn't contain a real 
      Pokemon tell them that it is not a Pokemon. Make sure you are also considering newer Pokemon
      releases.`,
    messages: messages.map((m: { role: string; content: string | Array<{ type: string; text?: string; image?: string }> }) => {
      // Handle both string and array content
      let content = m.content;
      if (Array.isArray(content)) {
        const textPart = content.find((c: { type: string }) => c.type === "text");
        content = textPart?.text || "";
      }
      return {
        role: m.role,
        content: typeof content === "string" ? content : JSON.stringify(content),
      };
    }),
  });

  return result.toTextStreamResponse();
}
