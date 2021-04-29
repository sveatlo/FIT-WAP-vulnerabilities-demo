import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import "./error_not_found.css";

export const NotFound = () => {
  let location = useLocation();
  let history = useHistory();

  return (
    <Container className="error-wrapper">
      <div className="error-card">
        <Row>
          <Col>
            <h3>
              No match for <code>{location.pathname}</code>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => history.goBack()}>Go back</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
