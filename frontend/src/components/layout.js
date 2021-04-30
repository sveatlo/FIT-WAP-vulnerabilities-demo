import React from "react";
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    Button,
    NavDropdown,
} from "react-bootstrap";

import { useAuth } from "../auth";

export const Layout = ({ children, ...rest }) => {
    const auth = useAuth();

    return (
        <Container>
            <Navbar bg="light" expand="lg" className="mb-2">
                <Navbar.Brand href="/">SuperBank</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown
                            title="Transactions"
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="/transactions/list">
                                Transactions
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/transactions/list-secure">
                                Transactions <small>(secure)</small>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav className="justify-content-end">
                        <Button variant="outline-primary" onClick={auth.logout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
    );
};
