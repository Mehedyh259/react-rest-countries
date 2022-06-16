import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../components/Loading';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify'
import axios from 'axios';


const Register = () => {
    let errorMessage;

    const [errorText, setErrorText] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();


    const storeData = async (user) => {
        const { data } = await axios.post('https://rest-countries-1452.herokuapp.com/user', user);

        console.log(data);

    }

    // Loading spinner
    if (loading || updating) {
        return <Loading></Loading>
    }

    // form submit functionality
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const phone = event.target.phone.value;
        const confirmPassword = event.target.confirmPassword.value;


        if (password !== confirmPassword) {
            errorMessage = <p className="text-danger my-2">Error: Both Password Not Matching !</p>
            setErrorText(errorMessage);
        } else {
            console.log(phone);
            setErrorText('');
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            toast.success('Registration Successfull Please Login !!')
            storeData({ name, email, phone })
            signOut(auth);
            navigate('/login');
        }

    }
    if (error) {
        errorMessage = <p className="text-danger my-2">Error: {error?.message} </p>
        setErrorText(errorMessage);
    }
    if (updateError) {
        errorMessage = <p className="text-danger my-2">Error: {updateError?.message} </p>
        setErrorText(errorMessage);
    }
    return (
        <div>
            <Container className='py-5'>
                <Row>
                    <Col className='mx-auto' lg={6} md={8} sm={10} >
                        <div className=' my-5 p-3 mb-3 rounded shadow'>
                            <h2 className='title-color text-center'>Please Register</h2>
                            {errorText}
                            <Form onSubmit={handleSubmit} className=''>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control name="name" type="text" placeholder="Enter Name" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control name="phone" type="number" placeholder="Enter phone" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword2">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" required />
                                </Form.Group>

                                <div className="text-center">
                                    <Button className='bg-primary text-white' variant="d-block w-50 mb-2" type="submit">
                                        Register
                                    </Button>
                                </div>
                            </Form>
                            <p>Already have an account? <span style={{ cursor: 'pointer' }} onClick={() => navigate('/login')} className='title-color'>Please Login</span></p>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;