import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategories = ({match}) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error : "",
    isUpdated : false,
    formData : "",
    loading : false
  });


  const {
    name,
    error,
    formData,
    isUpdated,
    loading
  } = values;

    // const [name, setName] = useState()
    // const [error, setError] = useState(false)
    // const [formData, setFormData] = useState("")
    const [success, setSuccess] = useState(false)


  const preload = (categoryId) => {
    getCategory(categoryId).then(data => {
      //console.log(data);
      if (data?.error) {
        setValues({...values, error : data.error})
      } else {
        setValues({ 
            ...values,
            name: data.name,
            isUpdated : true,
            formData : new FormData()
        });
        // console.log("PRELOAD UPDATE CATE. name : ", name);
        
        // setName({name : data.name});
        // setFormData({formData : new FormData()})
        }
    });
  };


  useEffect(() => {
    preload(match.params.categoryId);
  },[]);


  const onSubmit = event => {
    event.preventDefault();
    // setValues({ ...values, error: "", loading: true, });
    setValues({ name : {name} })
    // setError({error : ""});

    var foo = {
        name : name
    }

    // updateCategory(match.params.categoryId, user._id, token, JSON.stringify(foo)).then(data => {
    updateCategory(match.params.categoryId, user._id, token, JSON.stringify(foo)).then(data => {
    console.log(data)
    console.log("NAME : ", name);
        // console.log("ON SUBMIT, UPDATE CATE. FRONT : ",match.params.categoryId, user._id, token, {name});
      if (data?.error) {
        //   console.log("ERROR FOUND IN UPDATE CATE. REQ. FRONT");dd
        setValues({ ...values, error: data.error });
        // setError({error : data.error});
      } else {
        setValues({
          ...values,
          name : "",
          isUpdated : false
        });
        // setName({name : ""});
        setSuccess({success : true});
      }
    });
  };

const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
        ...values,
        [name]: value
    });
    console.log("HANDLE CHANGE : ", name, value);
};


  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style = {
          {
              display: success ? "" : "none"
          }
      }
    >
      <h4>updated successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  const createUpdateForm = () => (
      <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange("name")}
                value={name}
                autoFocus
                required
                placeholder="For ex. Summer/Winter collection"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">update category</button>
            </div>
        </form>
  )

  return (
    <Base
      title="Update category here!"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {createUpdateForm()}

        </div>
      </div>
    </Base>
  );
};

export default UpdateCategories;
