import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    };
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Example:  13 New Horizon Street"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        autoFocus
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Example:  New York"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Example:  10935"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Example:  United Status"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
