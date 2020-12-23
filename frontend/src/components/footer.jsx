import React from 'react'
import { Container ,Row,Col} from "react-bootstrap";

const Footer = () => {
    const year = new Date();
    return (
        <footer className="bg-dark text-white">
            <Container>
                <Row>
                    <Col className="text-center py-4">
                        Copyright &copy; Proshop {year.getFullYear()}
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
