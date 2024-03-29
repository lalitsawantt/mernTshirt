import React from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Card from './Card';
import {getAllProducts} from './helper/coreapicalls';
import { useState, useEffect } from 'react';

export default function Home() {
    // console.log("API IS ", API);
    
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getAllProducts().then(data => {
            if(data?.error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProduct();
    }, [])

    return (
        <Base title="Home page" description="Welcome to the awesome store!">
            <div className="row text-center">
                <h1 className="text-white">All of tshirts</h1>
                <div className="row">
                    {
                        products?.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}
