import { useToast } from '@chakra-ui/react';

type NotifyType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export const useNotify = () => {
  const toast = useToast();

  const notify = ({ text, type = 'success' }: { text: string; type: NotifyType }) => {
    switch (type) {
      case 'success':
        _toastSuccess(text);
        break;
      case 'error':
        _toastError(text);
        break;
      case 'warning':
        _toastWarning(text);
        break;
      case 'info':
        _toastInfo(text);
        break;
      case 'loading':
        _toastLoading(text);
        break;
    }
  };

  const _toastSuccess = (text: string) =>
    toast({
      title: text,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom'
    });

  const _toastError = (text: string) =>
    toast({
      title: text,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-left'
    });

  const _toastWarning = (text: string) =>
    toast({
      title: text,
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position: 'top-left'
    });

  const _toastInfo = (text: string) =>
    toast({
      title: text,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    });

  const _toastLoading = (text: string) =>
    toast({
      title: text,
      status: 'loading',
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    });

  return notify;
};
