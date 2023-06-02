import { Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';

interface ChatsLoaderProps {
  amount?: number;
}

const ChatsLoader: FC<ChatsLoaderProps> = ({ amount = 8 }) => {
  return (
    <Stack>
      {Array.from({ length: amount }).map((_, index) => (
        <Skeleton key={index} height='45px' />
      ))}
    </Stack>
  );
};

export default ChatsLoader;
