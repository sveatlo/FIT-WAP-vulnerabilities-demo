import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Col, Container } from "react-bootstrap";
import axios from "axios";

import { useAuth } from "../../auth";
import config from "../../config";
import { TransactionsTable } from "../../components/transactions_table";
import { FormattedNumber } from "../../components/formatted_number";

import "./home.css";

export const Home = () => {
    const auth = useAuth();

    const [accountDetails, setAccountDetails] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: config.BACKEND_URL + "/account.php",
            withCredentials: true,
        })
            .then((response) => {
                setAccountDetails(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    auth.logout();
                }

                console.error(error.response);
            });
    }, [auth]);

    return (
        <section id="page-home">
            <h2 className="welcome-message">
                Welcome, <strong>{auth.user.name}</strong>!
            </h2>

            <div className="account-overview">
                {accountDetails ? (
                    <>
                        <Row>
                            <Col>
                                <h3>Account overview</h3>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <p>
                                    Your current balance is $
                                    <FormattedNumber
                                        n={accountDetails.balance}
                                    ></FormattedNumber>
                                </p>
                            </Col>
                            <Col className="d-flex justify-content-md-end">
                                <Link to="/transactions/new">
                                    <Button>New transaction</Button>
                                </Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <TransactionsTable
                                    transactions={accountDetails.transactions}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>Loading...</>
                )}
            </div>
        </section>
    );
};
