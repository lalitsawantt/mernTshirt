import React from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Card from './Card';
import {getAllProducts} from './helper/coreapicalls';
import { useState, useEffect } from 'react';
import { loadCart } from './helper/cartHelper';
import PaymentBraintree from './paymentBraintree';

const Cart = () => {
    // console.log("API IS ", API);
    const [products, setproducts] = useState([])
    const [reload, setreload] = useState(false)
    
    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>Products in your cart</h2>
                {products.map((product, index) => (
                    <Card
                    key={index}
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setreload={setreload}
                    reload={reload}
                    /> 
                ))}
            </div>
        )
    }

    useEffect(() => {
        setproducts(loadCart);
    },[reload]);
    // if a state variable updates and you need to remount that component then pass it in []

    
    // const loadAllCheckout = () => {
    //     return (
    //         <div>
    //             <h2>This section is to checkout products</h2>
    //         </div>
    //     )
    // }


    return (
        <Base title="Cart page" description="Ready to checkout!">
            <div className="row">
                <div className="col-6">
                    {
                        products?.length > 0 ? loadAllProducts(products) : (<h3>NO products in cart</h3>)
                    }
                </div>
                <div className="col-6">
                    <PaymentBraintree products={products} setreload={setreload}/>
                </div>
            </div>
        </Base>
    )
}


export default Cart;