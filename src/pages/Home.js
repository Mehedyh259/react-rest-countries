import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Country from '../components/Country';
import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import ModalDetails from '../components/ModalDetails'

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const getCountries = async () => {
            const res = await fetch("https://restcountries.com/v3.1/all");
            const data = await res.json();
            setCountries(data)
            setIsLoading(false)
        }
        getCountries()
    }, [])


    if (isLoading) {
        return <Loading />
    }

    return (
        <Container>
            <h1 className='text-center py-3'>All Countries Of The World</h1>
            {
                modal && <ModalDetails country={modal} setModal={setModal} />
            }
            <Row>
                {
                    countries.map((country, index) => <Country key={index} country={country} setModal={setModal} />)
                }
            </Row>



        </Container>
    );
};

export default Home;