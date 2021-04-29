import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

import { useAuth } from "../../auth";
import config from "../../config";
import { TransactionsTable } from "../../components/transactions_table";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

export const TransactionsList = () => {
  const auth = useAuth();
  const params = useParams();
  const history = useHistory();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(
    transactions
  );
  const [filter, setFilter] = useState(params.filter ? params.filter : "");

  useEffect(() => {
    axios({
      method: "GET",
      url: config.BACKEND_URL + "/account.php",
      withCredentials: true,
    })
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          auth.logout();
        }

        console.error(error.response);
      });
  }, [auth]);

  useEffect(() => {
    if (filter === null || filter === "") {
      setFilteredTransactions(transactions);
      return;
    }

    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.recipient.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [transactions, filter]);

  useEffect(() => {
    history.replace("/transactions/list/" + filter);
  }, [filter, history]);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Find recipient
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col className="d-flex justify-content-md-end">
          <Link to="/transactions/new">
            <Button>New transaction</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          {filter !== "" ? (
            <p>
              You searched for{" "}
              <span dangerouslySetInnerHTML={{ __html: filter }} />
            </p>
          ) : (
            <></>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <TransactionsTable transactions={filteredTransactions} />
        </Col>
      </Row>
    </Container>
  );
};
