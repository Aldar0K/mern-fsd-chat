import { Avatar, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import ScrollableFeed from 'react-scrollable-feed';

import { Message } from 'models';
import { useUserStore } from 'store';
import { isLastMessage, isSameSender } from 'utils';
import styles from './ScrollableChat.module.scss';

interface ScrollableChatProps {
  messages: Message[];
}

const ScrollableChat: FC<ScrollableChatProps> = ({ messages }) => {
  const user = useUserStore(state => state.user);

  return (
    <ScrollableFeed>
      {user &&
        messages.map((message, index) => {
          console.log(isSameSender(messages, message, index, user._id));
          console.log(isLastMessage(messages, index, user._id));

          return (
            <div key={message._id} className={styles.message}>
              {(isSameSender(messages, message, index, user._id) ||
                isLastMessage(messages, index, user._id)) && (
                <Tooltip label={message.sender.name} placement='bottom-start' hasArrow>
                  <Avatar
                    name={message.sender.name}
                    src={message.sender.image}
                    mt='7px'
                    mr='1'
                    size='sm'
                    cursor='pointer'
                  />
                </Tooltip>
              )}

              <span>{message.content}</span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
