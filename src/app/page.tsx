import Chat from "@/components/chat/chat";
import { AI } from "./actions";

export default function Home() {
  return (
    <main>
      Pokemon List
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
