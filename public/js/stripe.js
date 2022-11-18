/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
import {loadStripe} from '@stripe/stripe-js';
const Stripe = require('stripe');


export const bookTour = async (tourId) => {
  try {
    const stripe = window.Stripe('pk_test_51M40IKLWFD9go2aioOdXJZYnWOzR9PJHxyxaXdNmXrItzdXkjExpnIHZsjotSudHyPINKdIk89OcL39bciMV074i00ydnnIvzS');
    const session = await axios(
      `https://safe-waters-68990.herokuapp.com/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });

  } catch (err) {
    showAlert('error', err);
  }
}

