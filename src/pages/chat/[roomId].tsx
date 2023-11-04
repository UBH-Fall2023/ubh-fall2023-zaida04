import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { messageAtoms } from "@/lib/state";
import { Message } from "@/db/drizzle";
import { useSocket } from "@/contexts/SocketContext";
import { useEffect } from "react";

export default function ChatRoom() {
  const [messages, setMessage] = useAtom(messageAtoms);
  const currentUserId = "1";
  const { emitEvent } = useSocket();

  useEffect(() => {
    const handler = (data: any) => {
      console.log("Event data:", data);
    };

    socket.on("event", handler);

    return () => {
      socket.off("event", handler);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            isMe={message.senderId === currentUserId}
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Input
            className="flex-grow rounded-md"
            placeholder="Type a message..."
          />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage(props: { message: Message; isMe: boolean }) {
  if (props.isMe) {
    return (
      <div className="flex items-end justify-end space-x-2">
        <div className="p-2 rounded-lg bg-green-500 text-white max-w-xs">
          <p>{props.message.content}</p>
        </div>
        <img
          alt="User 2 avatar"
          className="rounded-full"
          height="40"
          src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D"
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width="40"
        />
      </div>
    );
  }

  return (
    <div className="flex items-end space-x-2">
      <img
        alt="User 1 avatar"
        className="rounded-full"
        height="40"
        src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww"
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
      <div className="p-2 rounded-lg bg-blue-500 text-white max-w-xs">
        <p>{props.message.content}</p>
      </div>
    </div>
  );
}
