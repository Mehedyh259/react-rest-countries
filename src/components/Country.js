import React from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap'

const Country = (props) => {
    const { name, flags } = props.country;
    const setModal = props.setModal;
    return (

        < Col className='my-2 mx-auto' sm={6} md={3} lg={2} >
            <Card >
                <Card.Img variant="top" style={{ width: '100%', height: "130px" }} src={flags.png} />
                <Card.Body>
                    <Card.Title>{name.common}</Card.Title>
                    <Card.Text>
                        <button onClick={() => setModal(props.country)} className='btn btn-sm btn-primary'>Details</button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col >


    );
};

export default Country;