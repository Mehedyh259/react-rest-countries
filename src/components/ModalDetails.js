import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDetails = ({ country, setModal }) => {
    return (
        <>
            <Modal show={country} onHide={() => setModal(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>{country?.name?.common}</Modal.Title>
                </Modal.Header>
                <div className="card-body">
                    <p className="card-text fw-bold">Area: <span className="text-danger">{country.area} square kilometers</span></p>
                    <p className="card-text fw-bold">Populations: <span className="text-danger">{country.population} peoples</span></p>
                    <p className="card-text fw-bold">Capital: <span className="text-danger">{country.capital}</span></p>

                    <p className="card-text fw-bold">Region: <span className="text-danger">{country.region}</span></p>
                    <p className="card-text fw-bold">Continents: <span className="text-danger">{country.continents}</span></p>
                    <p className="card-text fw-bold">Sub Region: <span className="text-danger">{country.subregion}</span></p>
                    <p className="card-text fw-bold">TimeZones: <span className="text-danger">{country.timezones}</span></p>
                </div>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setModal(null)}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDetails;