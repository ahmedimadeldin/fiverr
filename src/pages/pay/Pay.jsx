import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequests.js"
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm.jsx';


// get the public key from stripe.com 
const stripePromise = loadStripe("this is a public key no need to hide it")

const Pay = () => {

    const [clientSecret,setClientSecret] = useState("");

    const {id} = useParams();
    useEffect(()=>{
        const makeRequest = async ()=>{
            try {
                const res = await newRequest.post(
                    `/orders/create-payment-intent/${id}`
                    );

                setClientSecret(res.data.clientSecret)     
            } catch (error) {
                console.log(error);
            }
        };
        makeRequest();
    },[]);

    const appearance = {
        theme:"stripe",
    };

    const options = {
        clientSecret,
        appearance, 
    }


  return (
    <div className='pay'>
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        )

        }
    </div>
  )
}

export default Pay;