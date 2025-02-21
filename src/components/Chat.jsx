import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => ({
      firstName: msg.senderId?.firstName,
      lastName: msg.senderId?.lastName,
      text: msg.text,
      timestamp: msg.timestamp || new Date().toISOString(), // Fallback for missing timestamps
    }));

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, timestamp }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, timestamp: timestamp || new Date().toISOString() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
      timestamp: new Date().toISOString(),
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-700 m-5 h-[70vh] flex flex-col rounded-lg shadow-md bg-gray-900 text-white">
      <h1 className="p-4 border-b border-gray-700 text-lg font-semibold bg-gray-800">Chat</h1>

      {/* Messages Section */}
      <div className="flex-1 overflow-auto p-5">
        {messages.map((msg, index) => {
          const isSentByUser = user.firstName === msg.firstName;
          return (
            <div key={index} className={"chat " + (isSentByUser ? "chat-end" : "chat-start")}>
              <div className="chat-header flex items-center gap-2 text-sm">
                <span className="font-semibold">{`${msg.firstName} ${msg.lastName}`}</span>
                {/* <time className="text-xs opacity-50">
                  {msg.timestamp ? formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true }) : "Just now"}
                </time> */}
              </div>

              <div className={`chat-bubble p-3 ${isSentByUser ? "bg-blue-500" : "bg-gray-600"} text-white`}>
                {msg.text}
              </div>

              {isSentByUser && <div className="chat-footer opacity-50 text-xs">Seen</div>}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-800">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded p-2 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
