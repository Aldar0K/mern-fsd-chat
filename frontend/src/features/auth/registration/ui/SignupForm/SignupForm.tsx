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
import axios from 'axios';
import { FC, useState } from 'react';

import { useToggle } from 'shared/lib/hooks';
import { useRegister } from '../../hooks';

const SignupForm: FC = () => {
  const toast = useToast();
  const [register, authLoading] = useRegister();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const [isLoading, toggleLoading] = useToggle(false);
  const [showPassword, toggleShowPassword] = useToggle(false);

  const postDetails = async (file: File) => {
    toggleLoading();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mern-fsd-chat');
    formData.append('cloud_name', 'drlfgiw60');

    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/drlfgiw60/image/upload',
        formData
      );
      setImageUrl(data.url.toString());
    } catch (error) {
      console.log(error);
    }

    toggleLoading();
  };

  const submitHandler = async () => {
    toggleLoading();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      toggleLoading();
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      toggleLoading();
      return;
    }

    register(name, email, password, imageUrl);

    toggleLoading();
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
          accept='image/png,image/jpg,image/jpeg'
          onChange={e => e.target.files && postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={isLoading || authLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignupForm;
