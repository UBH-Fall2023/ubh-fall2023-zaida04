import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { messageAtoms } from "@/lib/state";
import { Message } from "@/db/drizzle";
import { useSocket } from "@/contexts/SocketContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface FormValues {
  message: string;
}
export default function ChatRoom() {
  const router = useRouter();
  const [messages, setMessages] = useAtom(messageAtoms);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { socket, emitEvent } = useSocket();
  const senderId = router.query.starterId as string;
  const receiverId = router.query.receiverId as string;

  const handleSendMessage = (data: FormValues) => {
    reset();
    return emitEvent("newMessage", {
      senderId,
      content: data.message,
      receiverId,
      createdAt: new Date(),
    } satisfies Omit<Message, "id">);
  };

  function scrollToBottom(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) return console.log("Element not found");

    element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    if (!socket || !senderId) return;

    const handler = (data: Message) => {
      console.log("Event data:", data);
      setMessages((messages: Message[]) => [...messages, data]);
    };

    socket.on("chatMessage", handler);
    emitEvent("joinRoom", senderId);

    return () => {
      socket.off("event", handler);
    };
  }, [socket, senderId]);

  useEffect(() => {
    scrollToBottom("chat-container");
  }, [messages]);

  useEffect(() => {
    if (!senderId || !receiverId) return;

    async function fetchMessages() {
      const res = await fetch(`/api/chat/${senderId}/${receiverId}`);
      const json = await res.json();
      setMessages(json.messages);
    }

    fetchMessages();
  }, [senderId, receiverId]);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>
      <div
        id="chat-container"
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <ChatMessage
            isMe={message.senderId === senderId}
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex space-x-2">
          <Input
            className="flex-grow rounded-md"
            placeholder="Type a message..."
            {...register("message", {
              minLength: 1,
              maxLength: 300,
              required: true,
            })}
          />
          <Button onClick={handleSubmit(handleSendMessage)}>Send</Button>
        </div>
      </form>
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
