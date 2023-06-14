import { Avatar, Tooltip } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  Message
} from 'entities/message';
import { viewerModel } from 'entities/viewer';

interface ScrollableChatProps {
  messages: Message[];
}

const ScrollableChat: FC<ScrollableChatProps> = ({ messages }) => {
  const viewer = viewerModel.useViewerStore(state => state.viewer);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [atBottom, setAtBottom] = useState<boolean>(false);

  useEffect(() => {
    if (atBottom) {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  if (!viewer) return null;
  return (
    <Virtuoso
      ref={virtuosoRef}
      data={messages}
      initialTopMostItemIndex={messages?.length - 1}
      atBottomStateChange={bottom => {
        if (atBottom) {
          virtuosoRef.current?.scrollToIndex(messages.length);
        }
        setAtBottom(bottom);
      }}
      itemContent={(index, message) => (
        <>
          <div key={message._id} style={{ display: 'flex' }}>
            {(isSameSender(messages, message, index, viewer._id) ||
              isLastMessage(messages, index, viewer._id)) && (
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
                marginLeft: isSameSenderMargin(messages, message, index, viewer._id),
                marginTop: isSameUser(messages, message, index) ? 3 : 10,
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
  );
};

export default ScrollableChat;
