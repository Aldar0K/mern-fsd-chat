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

const SignupForm: FC = () => {
  const toast = useToast();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      return;
    }
    console.log(name, email, password, image);
    setLoading(false);
  };

  return (
    <VStack spacing='5px'>
      <FormControl id='register-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Enter Your Name' onChange={e => setName(e.target.value)} />
      </FormControl>
      <FormControl id='register-email' isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type='email'
          placeholder='Enter Your Email Address'
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='register-password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={toggleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='register-confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={toggleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='register-image'>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={e => e.target.files && setImage(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={isLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignupForm;
