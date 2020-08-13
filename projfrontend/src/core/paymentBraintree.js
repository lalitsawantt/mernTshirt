import React, {useState, useEffect} from 'react'
import { cartEmpty } from './helper/cartHelper';
// import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from './helper/paymentHelper';
import {createOrder} from "./helper/orderHelper";
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react";

const PaymentBraintree = ({products, setreload = f => f, reload = undefined}) => {

    const [info, setinfo] = useState({
        loading :false,
        success : false,
        clientToken : null,
        error : "",
        instance : {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

   const getToken = (userId, token) => {
    //    
    getMeToken(userId, token).then(info => {
        // console.log("INFO  :::::::::::::::", info);
        if ( info?.error) {
            setinfo({...info, error : info.error})
        } else {
            const clientToken = info.clientToken
            setinfo({clientToken})
        }
    })
   }

   const onPurchase = () => {
       setinfo({loading : true})
       let nonce;
       let getNonce = info.instance.requestPaymentMethod().then(data => {
           nonce = data.nonce
           const paymentData = {
               paymentMethodNonce : nonce,
               amount : getAmount()
           };
           processPayment(userId, token, paymentData)
           .then(response => {
               setinfo({...info, success: response.success, loading : false})
               console.log("PAYMENT SUCCESS")
               const orderData = {
                   products : products,
                   transaction_id : response.transaction.id,
                   amount : response.transaction.amount
               };
               createOrder(userId, token, orderData);
               console.log("FRONT/CORE/PAYMENTBRAINTREE => ON PURCHASE => ORDER DATA : ",orderData);
            cartEmpty(() => {
                console.log(" Did we get a crash?")
            })
            // TODO: force reload 
            setreload(!reload)
            console.log("Payment completed")
           })
           .catch(error => {
               setinfo({loading: false, success : false})
               console.log("PAYMENT FAILURE")

           })
       })
   }

   const getAmount = () => {
       let amount = 0;
       products.map(product => {
           amount = amount + product.price;
       });
       return amount;
   };

   const showBtDropIn = () => {
       return (
           <div>
               {
                   info.clientToken !== null && products.length > 0 ? (
                       <div>
                           <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                            />
                            <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button>
                       </div>
                   ) : (
                       <h3>Please login or add something to cart</h3>
                   )
               }
           </div>
       )
   }


   useEffect(() => {
       getToken(userId, token);
   },[]);

    return (
        <div>
            <h3>Your billing amount is: {getAmount()}</h3>
            {showBtDropIn()}
        </div>
    )
}


export default PaymentBraintree;