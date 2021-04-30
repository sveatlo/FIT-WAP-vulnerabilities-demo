import React, { useState } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../auth";

import "./login.css";

export const Login = () => {
    const auth = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        auth.login(username, password)
            .then((data) => {
                console.log("[login] success", data);
                setError(null);
                history.push("/");
            })
            .catch((error) => {
                setError(error.error);
            });
    };

    document.body.className = "page-auth-login";

    return (
        <Container>
            {error && error !== null && (
                <Alert variant="danger">
                    <strong>Error!</strong> {error}
                </Alert>
            )}

            <Row>
                <Col>
                    <div className="wrapper">
                        <Form onSubmit={onFormSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
