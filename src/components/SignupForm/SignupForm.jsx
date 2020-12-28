import React, {useState} from "react";

import {signup} from "../../apiClient/UserService";

import {Button, FormControl, Input, Stack, useToast} from "@chakra-ui/react";
import {FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import * as Yup from "yup";
import {useFormik} from "formik";

import './SignupForm.scss';

const initialFormData = {
  name: '',
  email: '',
  password: ''
};

function SignupForm(props) {
  const [formData, setFormData] = useState(initialFormData);
  const toast = useToast();

  function handleSubmit(values) {
    signup(values)
      .then(response => {
        props.history.push("/login");
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

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: signupSchema,
    onSubmit: values => {
      handleSubmit(values);
    }
  });


  return (
    <form onSubmit={formik.handleSubmit} className="signup-form">
      <Stack spacing={3}>
        <FormControl id="name" isRequired isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name"
                 variant="filled" placeholder="John Doe"
                 value={formik.values.name} onChange={formik.handleChange}/>
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl id="email" isRequired isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email"
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
        }} type="submit">Sign Up</Button>
      </Stack>
    </form>

  );
}

export default SignupForm;
