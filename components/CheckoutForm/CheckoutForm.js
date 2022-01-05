import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../Button/Button";
import style from "../../styles/CheckoutForm/CheckoutForm.module.css";

import { endpoints, routes } from "../../config/constants";

export default function CheckoutForm({ user }) {
  //* Stripe setup
  const stripe = useStripe();
  const elements = useElements();

  //* React state setup
  const [message, setMessage] = useState("Local taxes could be applied");
  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    //* Create PaymentIntent as soon as the page loads

    const url = `${process.env.HOST}${endpoints.checkout(user.id)}`;
    fetch(url, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setAmount(data.amount);
      });
  }, []);

  //* Handler for cart data input
  const handleChange = (e) => {
    if (e.complete) return invalid ? setInvalid(false) : null;
    invalid ? null : setInvalid(true);
  };

  //* Handler for cart form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      //? Stripe.js has not yet loaded.
      return;
    }

    //? If Stripe has loaded, show a user that processing has started
    setIsLoading(true);
    setMessage("Processing your payment...");

    //? This logic was copied from Stripe docs
    const paymentElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: paymentElement,
    });

    const confiremedPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    //? Handle immidiate error
    if (confiremedPayment.error) {
      setIsLoading(false);
      setMessage("An error occured. You payment cannot be finished");
      return;
    }

    //? Check if payment has finished successfully
    if (confiremedPayment.paymentIntent.status === "succeeded") {
      //? Since processing has finished, there is no need to display this loading message
      setIsLoading(false);
      setMessage("Accepted!");

      const transaction_id = confiremedPayment.paymentIntent.id;
      console.log(transaction_id);

      const url = `${process.env.HOST}${endpoints.orders(user.id)}`;

      await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ transaction_id: transaction_id }),
      });
    } else if (confiremedPayment.paymentIntent.status === "processing") {
      //? Since processing hasn't finished, we need to let a user know that he will recieve his payment confirmation later via email
      setIsLoading(false);
      setMessage(
        "Your transaction has been pended! We will send you an email with all confirmations as soon as we recieve your money"
      );
    }
  };

  //* Options that set up the cart component
  const options = {
    style: {
      base: {
        fontSize: "17px",
      },
      invalid: {
        iconColor: "#d3aa14",
      },
    },
    hidePostalCode: true,
  };

  //* Retutn nothing when no clientSecret recieved
  if (clientSecret === "")
    return (
      <div>
        <div id={style.payment_message} data-testid="message">
          Your cart is probably empty
        </div>
      </div>
    );

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        className={`${style.payment_element} ${invalid ? style.invalid : ""}`}
        options={options}
        onChange={handleChange}
        data-testid="card"
      />

      <Button
        width={400}
        height={50}
        text={`Pay $${amount}`}
        fontSize={17}
        label="Pay"
        disabled={invalid || !stripe || isLoading}
      />

      {/* Show any error or success messages */}
      <div id={style.payment_message} data-testid="message">
        {message}
      </div>
    </form>
  );
}
