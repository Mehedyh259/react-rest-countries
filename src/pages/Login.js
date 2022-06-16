import React, { useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from '../components/Loading';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    let errorMessage;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    const showData = async (user) => {
        console.log("login", user);
        const email = user?.user?.email;
        const { data } = await axios.get(`http://localhost:5000/user?email=${email}`);
        setUserData(data.user);
    }

    useEffect(() => {
        // navigate to destination route
        if (user) {
            showData(user);
        }
    }, [user])



    if (error) {
        errorMessage = <p className="text-danger my-2">Error: {error?.message} </p>

    }

    // email and password field value
    const emailRef = useRef('');
    const passwordRef = useRef('');


    // form submit functionality
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }



    // Loading spinner
    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <Container className='my-5'>
            <Row>
                <Col className='mx-auto' lg={6} md={8} sm={10}>
                    <div className=' p-3 mb-3 rounded shadow'>

                        {
                            userData && <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Name: {userData.name}</strong> <br />
                                <strong>Email: {userData.email}</strong><br />
                                <strong>Phone: {userData.phone}</strong>
                                <button onClick={() => setUserData(null)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        }

                        <h2 className='text-center title-color my-3'>Please Login !</h2>

                        {errorMessage}

                        <Form onSubmit={handleSubmit} >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                            </Form.Group>
                            <div className="text-center">
                                <Button className='bg-primary text-white' variant="d-block w-50 mb-2" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>

                        <p>New to here? <span style={{ cursor: 'pointer' }} onClick={() => navigate('/register')} className='title-color'>Please Register</span></p>


                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;