import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { messageAtoms } from "@/lib/state";
import { Message } from "@/db/drizzle";
import { useSocket } from "@/contexts/SocketContext";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { UploadButton } from "@/components/upload";
import { UploadFileResponse } from "uploadthing/client";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

interface FormValues {
  message: string;
}
export default function ChatRoom() {
  const router = useRouter();
  const [messages, setMessages] = useAtom(messageAtoms);
  const [users, setUsers] = useState<User[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadFileResponse[]>(
    [],
  );
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { socket, emitEvent } = useSocket();
  const { user } = useUser();
  const senderId = user?.id ?? null;
  const orderId = router.query.orderId as string;

  const handleSendMessage = (data: FormValues) => {
    if (!senderId) return;

    reset();
    setUploadedImages([]);
    return emitEvent("newMessage", {
      senderId,
      content: data.message,
      orderId,
      imageUrls: uploadedImages.map((x) => x.url),
      createdAt: new Date(),
    } satisfies Omit<Message, "id" | "receiverId">);
  };

  function scrollToBottom(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) return console.log("Element not found");

    element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    if (!socket || !senderId || !orderId) return;

    const handler = (data: Message) => {
      console.log("Event data:", data);
      setMessages((messages: Message[]) => [...messages, data]);
    };

    socket.on("chatMessage", handler);
    emitEvent("joinRoom", orderId);

    return () => {
      socket.off("event", handler);
    };
  }, [socket, senderId, orderId]);

  useEffect(() => {
    scrollToBottom("chat-container");
  }, [messages]);

  useEffect(() => {
    if (!orderId) return;

    async function fetchMessages() {
      const res = await fetch(`/api/chat/${orderId}`);
      const json = await res.json();
      setMessages(json.messages);
      setUsers(json.users);
    }

    fetchMessages();
  }, [orderId]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold">Chat</h2>
        <p>You are {user?.fullName ?? user?.username}</p>
      </div>
      <div
        id="chat-container"
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages
          .filter(
            (message, index, self) =>
              index === self.findIndex((m) => m.id === message.id),
          )
          .map((message) => {
            return (
              <ChatMessage
                isMe={message.senderId === senderId}
                key={message.id}
                message={message}
                user={
                  users.find((user) => user.id === message.senderId) ?? null
                }
              />
            );
          })}
      </div>
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex md:flex-row flex-col gap-2">
          <Input
            className="flex-grow rounded-md"
            placeholder="Type a message..."
            {...register("message", {
              minLength: 1,
              maxLength: 300,
              required: true,
            })}
          />
          <div className="flex flex-row gap-1">
            <UploadButton
              endpoint="imageUploader"
              // content={{
              //   button: <p>Upload</p>,
              // }}
              appearance={{
                button: {
                  width: "fit-content",
                  whiteSpace: "nowrap",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                },
              }}
              onClientUploadComplete={(res) => {
                if (!res) return;
                const toAdd = Array.isArray(res) ? res : [res];
                setUploadedImages((images) => [...images, ...toAdd]);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <Button
              className="w-full"
              onClick={handleSubmit(handleSendMessage)}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ChatMessage(props: {
  message: Message;
  user: User | null;
  isMe: boolean;
}) {
  const color = !props.isMe ? "bg-green-500" : "bg-blue-500";
  const itemsPosition = !props.isMe ? "flex-row" : "flex-row-reverse";

  return (
    <div className={`flex gap-2 space-x-2 ${itemsPosition}`}>
      <div className="flex flex-col gap-1">
        <img
          alt="User 1 avatar"
          className="rounded-full"
          height="40"
          src={
            "https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg"
          }
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width="40"
        />
        <div className={`w-full flex justify-center`}>
          <p className={`text-sm font-medium text-gray-600`}>
            {props.user?.firstName ?? props.user?.username ?? "Loading..."}
          </p>
        </div>
      </div>
      <div
        className={`py-2 px-3 h-fit rounded-lg text-white max-w-xs ${color}`}
      >
        <p className="pb-2">{props.message.content}</p>
        <div className="flex flex-col gap-2">
          {props.message.imageUrls?.map((url) => (
            <img
              src={url}
              alt="Uploaded image"
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
