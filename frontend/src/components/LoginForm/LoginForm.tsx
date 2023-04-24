import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from '@chakra-ui/react';
import { FC, useState } from 'react';

const LoginForm: FC = () => {
  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
      return;
    }
    console.log(email, password);
    setLoading(false);
  };

  return (
    <VStack spacing='10px'>
      <FormControl id='login-email' isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type='email'
          placeholder='Enter Your Email Address'
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='login-password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={toggleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={isLoading}
      >
        Login
      </Button>
      <Button
        variant='solid'
        colorScheme='red'
        width='100%'
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default LoginForm;
