/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product}) => {

    const imageurl = product ? `${API}/product/photo/${product._id}` : 
    `https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80`
    return (
        <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
        />
    )

}

export default ImageHelper;
