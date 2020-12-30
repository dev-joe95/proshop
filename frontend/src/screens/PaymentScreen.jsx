import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
    const { shippingAddress } = useSelector((state) => state.cart);

    if (!shippingAddress) {
        history.push("/shipping");
    }
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Method:</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal"
                            id="PayPal"
                            value="PayPal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            value="Stripe"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Cash On Delivery"
                            id="CashOnDelivery"
                            value="Cash On Delivery"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
