import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

import { useState } from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom"

const Login = () => {
  const toast = useToast();
  const history = useHistory();
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false)

    const handleClick = () =>setShow(!show);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    
    

    const submitHandler = async () =>{
      const isValidEmail = emailRegex.test(email);
      const isValidPassword = passwordRegex.test(password);
      if(isValidEmail && isValidPassword){
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );

          // console.log(JSON.stringify(data));
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          history.push("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      }else if(!isValidEmail){
        toast({
          title : 'Invalid email',
          description:'Please enter a valid email address',
          status:'error',
          duration:3000,
          isClosable:true
        })
      }else if(!isValidPassword){
        toast({
          title: 'Invalid password.',
          description: 'Password must be 8-12 characters long and include a number, a letter.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    }
  
  return (
    <VStack spacing='5px'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
          <Input
            placeholder='Enter Your email'
            onChange={(e)=>setEmail(e.target.value)}  
            // onChange={handleEmailChange}
            // onBlur={handleEmailBlur}
          />     
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show" }
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Confirm
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login