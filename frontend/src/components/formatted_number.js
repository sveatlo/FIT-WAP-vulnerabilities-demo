import React from "react";

export const FormattedNumber = ({ n, ...rest }) => (
  <span {...rest}>
    {n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}
  </span>
);
