const { API } = require("../../backend");


// category calls

// create a category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method : "GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

// get a category
export const getCategory = CategoryId => {
    return fetch(`${API}/category/${CategoryId}`,{
        method : "GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// product calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method : "POST",
        headers : {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body : product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method : "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

// delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method : "delete",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        }

    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}


// get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method : "GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body :product   
    })
    .then(response => {
        return response.json();
    }).catch(err => console.log(err));
}


// delete a category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method : "DELETE",
        headers : {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    }).then(response => {
        return response.json;
    }

    ).catch(err => console.log(err))
}

// update category
export const updateCategory = (categoryId, userId, token, name) => {
    // console.log("request",category)
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept :"application/json",
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body : name
    })
    .then(response => {
        console.log("RESPONSE ADMIN API CALLS 1 : ", response);
        return response.json();
    })
    .catch(err => console.log(err));
}

// export const updateProduct = (productId, userId, token, product) => {
// return fetch(`${API}/product/${productId}/${userId}`, {
//         method: "PUT",
//         headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: product
//     })
//     .then(response => {
//         return response.json();
//     }).catch(err => console.log(err));
// }