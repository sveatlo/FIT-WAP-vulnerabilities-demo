import React from "react";
import { Table } from "react-bootstrap";

import { FormattedNumber } from "./formatted_number";

export const TransactionsTable = ({ transactions, ...rest }) => {
  return (
    <>
      <Table striped bordered hover responsive {...rest}>
        <thead>
          <tr>
            <th>#</th>
            <th>Recipient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length > 0 ? (
            transactions.map((transaction, key) => (
              <tr key={key}>
                <td>{transaction.id}</td>
                <td>{transaction.recipient}</td>
                <td>
                  $<FormattedNumber n={transaction.amount}></FormattedNumber>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No transactions</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
