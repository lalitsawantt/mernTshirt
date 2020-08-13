import React, { useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/adminapicall';
// import { getProducts, deleteProduct } from './helper/adminapicall';


const ManageCategories = () => {

    const [categories, setCategories] = useState([])

    const { user, token} = isAuthenticated();

    const preload = () => {
        getCategories().then(data => {
            if(data?.error){
                console.log(data.error);
            }else{
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        preload()
    }, [])


    // delete product
    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token)
        .then((data) => {
            if(data?.error){
                // console.log("DATAAAA:", data);
                console.log(data.error)
            }else{
                preload();
                // this is to reload the data for the user. we can use setState to set the data 
                // and then reload again but preload already does that hence this is used
            }
        })
    }

    return (
        <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          {/* <h2 className="text-center text-white my-3">Total 3 categories</h2> */}

            {categories.map((category, index) => {
                return (
                    <div key={index} className="row text-center mb-2 ">
                        <div className="col-4">
                            <h3 className="text-white text-left">{category.name}</h3>
                        </div>
                        <div className="col-4">
                            <Link
                            className="btn btn-success"
                            to={`/admin/category/update/${category._id}`}
                            >
                            <span className="">Update</span>
                            </Link>
                        </div>
                        <div className="col-4">
                            <button onClick={() => {
                                deleteThisCategory(category._id);
                                // onClick={deleteThisProduct()} is fine if no params are being passed
                                // hence call the delete method in the callback when we need to pass params
                            }} className="btn btn-danger">
                            Delete
                            </button>
                        </div>  
                    </div>
                )
            })}
        </div>
      </div>
    </Base>
    )
}

export default ManageCategories;