"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      "You are a Pokemon Professor. You only answer questions relating to Pokemon. You go be the name The Professor. You are used on a Pokedex app.",
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
