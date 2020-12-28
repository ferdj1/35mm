import React, {useContext, useState} from "react";
import {useHistory} from "react-router";

import UserContext from "../../context/UserContext";
import {login} from "../../apiClient/UserService";
import {ACCESS_TOKEN} from "../../constants/AuthConstants";

import {FormControl, useToast} from "@chakra-ui/react";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import {FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import {Stack} from "@chakra-ui/layout";
import {useFormik} from "formik";
import * as Yup from "yup";

import './LoginForm.scss';


const initialFormData = {
  email: '',
  password: ''
};

function LoginForm(props) {
  const [formData, setFormData] = useState(initialFormData);
  const toast = useToast();
  const history = useHistory();
  const userContextData = useContext(UserContext);


  function handleSubmit(values) {
    login(values)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast({
          title: "Successful login",
          description: "You're successfully logged in!",
          status: "success",
          duration: 5000,
          isClosable: true,
        })

        userContextData.loadCurrentlyLoggedInUser();
        history.push("/");
      }).catch(error => {
      toast({
        title: "Error",
        description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
        status: "error",
        duration: 5000,
        isClosable: true,
      })

    });
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: loginSchema,
    onSubmit: values => {
      handleSubmit(values);
    }
  });


  return (
    <form onSubmit={formik.handleSubmit} className="signup-form">
      <Stack spacing={3}>
        <FormControl id="email" isRequired isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input name="email"
                 variant="filled" placeholder="john.doe@example.com"
                 value={formik.values.email} onChange={formik.handleChange}/>
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isRequired isInvalid={formik.touched.password && formik.errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password"
                 variant="filled" placeholder="Password"
                 value={formik.values.password} onChange={formik.handleChange}/>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Button bg="#553C9A" color="#ffffff" _hover={{
          bg: "#9F7AEA",
          color: "#000000"
        }} type="submit">Login</Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
