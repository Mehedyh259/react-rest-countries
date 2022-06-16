import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

import './Header.css'

const Header = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth);
        navigate('/')
    }

    return (
        <>


            <Navbar collapseOnSelect expand="lg" sticky='top' bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className='fw-bold' as={Link} to="/">
                        Countries
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">

                            <NavLink className={({ isActive }) =>
                                isActive ? "text-white ms-3 activeNav nav-link" : "text-white ms-3 nav-link"
                            } to="/"> Home </NavLink>

                            {
                                user ?
                                    <button className='btn btn-link me-auto text-white text-decoration-none' onClick={handleSignOut}>Sign out</button>
                                    :
                                    <>
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "text-white ms-3 activeNav nav-link" : "text-white ms-3 nav-link"
                                        } to="/register"> Register </NavLink>
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "text-white ms-3 activeNav nav-link" : "text-white ms-3 nav-link"
                                        } to="/login"> Login </NavLink>
                                    </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    );
};

export default Header;