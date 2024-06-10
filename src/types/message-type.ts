import { z } from "zod";

export const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is too short",
  }),
});

export type TFormSchema = z.infer<typeof formSchema>;
