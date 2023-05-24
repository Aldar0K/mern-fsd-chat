import { Avatar, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import ScrollableFeed from 'react-scrollable-feed';

import { Message } from 'models';
import { useUserStore } from 'store';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from 'utils';
import styles from './ScrollableChat.module.scss';

interface ScrollableChatProps {
  messages: Message[];
}

const ScrollableChat: FC<ScrollableChatProps> = ({ messages }) => {
  const user = useUserStore(state => state.user);

  return (
    <ScrollableFeed>
      {user &&
        messages.map((message, index) => (
          <div key={message._id} className={styles.message}>
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
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
                marginLeft: isSameSenderMargin(messages, message, index, user._id),
                marginTop: isSameUser(messages, message, index) ? 3 : 10,
                maxWidth: '75%',
                padding: '5px 15px',
                backgroundColor: `${message.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
                borderRadius: '20px'
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
