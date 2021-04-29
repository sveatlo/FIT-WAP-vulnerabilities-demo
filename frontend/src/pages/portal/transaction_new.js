import React, { useState } from "react";
import {
  Alert,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";

import config from "../../config";

export const TransactionNew = () => {
  const history = useHistory();

  const [useSecureEndpoint, setUseSecureEndpoint] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("recipient", recipient);
    formData.append("amount", amount);

    let endpoint = "transfer.php";
    let headers = {};
    if (useSecureEndpoint) {
      endpoint = "transfer_secure.php";
      headers = {
        "X-XSRF-TOKEN": window.localStorage.getItem("xsrf_token"),
      };
    }

    axios({
      method: "post",
      url: `${config.BACKEND_URL}/${endpoint}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      withCredentials: true,
      headers: headers,
    })
      .then((res) => {
        history.push("/transactions/list");
      })
      .catch((err) => {
        setError(err.response?.data?.error || "");
      });
  };

  return (
    <>
      {error !== null ? (
        <Alert variant="danger">
          <strong>Transaction creation failed: </strong> {error}
        </Alert>
      ) : (
        <></>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} sm={12} md={9} controlId="formBasicRecipient">
            <Form.Control
              type="text"
              placeholder="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={3} controlId="formBasicAmount">
            {/* <Form.Control type="number" placeholder="Amount" /> */}

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Use secure endpoint"
              checked={useSecureEndpoint}
              onChange={(e) => setUseSecureEndpoint(e.target.checked)}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
