import { ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { messageLib, messageModel } from 'entities/message';
import { viewerModel } from 'entities/viewer';

interface ScrollableChatProps {
  messages: messageModel.Message[];
}

const ScrollableChat: FC<ScrollableChatProps> = ({ messages }) => {
  const viewer = viewerModel.useViewer();
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [atBottom, setAtBottom] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<number>(0);

  const scrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({
      index: messages.length,
      align: 'end',
      behavior: 'smooth'
    });
    setNewMessages(0);
  };

  useEffect(() => {
    if (atBottom) {
      setTimeout(scrollToBottom);
    } else {
      setNewMessages(prev => ++prev);
    }
  }, [messages]);

  useEffect(() => {
    setShowButton(!atBottom);
    setNewMessages(0);
  }, [atBottom, setShowButton]);

  if (!viewer) return null;
  return (
    <div className='relative h-full w-full'>
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        initialTopMostItemIndex={messages?.length - 1}
        atBottomStateChange={bottom => {
          setAtBottom(bottom);
        }}
        itemContent={(index, message) => (
          <>
            <div key={message._id} style={{ display: 'flex' }}>
              {(messageLib.isSameSender(messages, message, index, viewer._id) ||
                messageLib.isLastMessage(messages, index, viewer._id)) && (
                <Tooltip label={message.sender.name} placement='bottom-start' hasArrow>
                  <Avatar
                    name={message.sender.name}
                    src={message.sender.image}
                    mt='7px'
                    mr={1}
                    size='sm'
                    cursor='pointer'
                  />
                </Tooltip>
              )}

              <span
                style={{
                  marginLeft: messageLib.isSameSenderMargin(messages, message, index, viewer._id),
                  marginTop: messageLib.isSameUser(messages, message, index) ? 3 : 10,
                  marginRight: 5,
                  maxWidth: '75%',
                  padding: '5px 15px',
                  backgroundColor: `${message.sender._id === viewer._id ? '#BEE3F8' : '#B9F5D0'}`,
                  borderRadius: '20px'
                }}
              >
                {message.content}
              </span>
            </div>
          </>
        )}
      />

      <button
        className={
          'absolute z-[-1] h-[56px] w-[56px] right-8 bottom-8 bg-[var(--chakra-colors-gray-100)] ' +
          'rounded-[50%] opacity-0 transition-all [&>svg]:h-[40px] [&>svg]:w-[40px] ' +
          `${showButton ? 'z-[1] opacity-100' : ''}`
        }
        onClick={scrollToBottom}
      >
        <ChevronDownIcon />
        {!!newMessages && (
          <div className='absolute bg-[var(--color-green)] top-[-2px] right-[-4px] rounded-[50%] px-2'>
            <span className='text-white'>{newMessages}</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ScrollableChat;
