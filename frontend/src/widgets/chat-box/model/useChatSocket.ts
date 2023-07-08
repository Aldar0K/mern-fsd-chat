import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { chatModel } from 'entities/chat';
import { messageModel } from 'entities/message';
import { viewerModel } from 'entities/viewer';
import { ClientToServerEvents, ServerToClientEvents } from '../types';

const ENDPONINT = 'http://localhost:8080';
let socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  selectedChatCompare: chatModel.Chat | undefined;

interface Params {
  chatId: string;
  setCurrentMessages: Dispatch<SetStateAction<messageModel.Message[]>>;
}

export const useChatSocket = ({ chatId, setCurrentMessages }: Params) => {
  const viewer = viewerModel.useViewer();
  const [viewerTyping, setViewerTyping] = useState<boolean>(false);
  const [otherTyping, setOtherTyping] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const selectedChat = chatModel.useChatStore(state => state.selectedChat);
  const notifications = messageModel.useNotificationStore(state => state.notifications);
  const addNotifications = messageModel.useNotificationStore(state => state.addNotifications);
  const { mutateAsync: sendMessageMutate } = messageModel.useSendMessage();

  useEffect(() => {
    if (!selectedChat) return;
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPONINT);
    viewer && socket.emit('setup', viewer);
    socket.on('connected', () => setSocketConnected(true));

    socket.on('typing', () => setOtherTyping(true));
    socket.on('stopTyping', () => setOtherTyping(false));

    socket.on('messageRecieved', newMessage => {
      // TODO invert logic
      if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
        if (!notifications.includes(newMessage)) {
          addNotifications([newMessage]);
        }
      } else {
        setCurrentMessages(prev => [...prev, newMessage]);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedChat) return;

    socket.emit('joinChat', selectedChat._id);
  }, [selectedChat]);

  const sendMessage = async (message: string) => {
    if (!selectedChat) return;

    socket.emit('stopTyping', selectedChat._id);

    const newMessage = await sendMessageMutate({ chatId, content: message });

    setCurrentMessages(prev => [...prev, newMessage]);
    socket.emit('newMessage', newMessage);
  };

  const toggleTyping = () => {
    // TODO toggle typing state in the chat room (socket).
    if (!socketConnected || !selectedChat) return;

    if (!viewerTyping) {
      setViewerTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    // TODO simplify debounce logic.
    const lastTypingTime = new Date().getTime();
    const DEFAULT_TYPING_TIMEOUT = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= DEFAULT_TYPING_TIMEOUT && viewerTyping) {
        socket.emit('stopTyping', selectedChat._id);
        setViewerTyping(false);
      }
    }, DEFAULT_TYPING_TIMEOUT);
  };

  return { viewerTyping, otherTyping, sendMessage, toggleTyping };
};
