const { API } = require("../../backend");

export const createOrder = (userId, token, orderData) => {
    console.log("FRONT/CORE/HELPER/ORDER_HELPER/orderDATA : : : : :", orderData);
    return fetch(`${API}/order/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({order : orderData})
    }).then(response => {
        console.log("FRONT/CORE/HELPER/ORDER_HELPER : RESPONSE ::::::", response)
        return response.json();
    })
    .catch(err => console.log(err))
}