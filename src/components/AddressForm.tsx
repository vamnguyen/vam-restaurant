import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form>
      <br />
      <h3>Address Shipping</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </form>
  );
};

export default AddressForm;
