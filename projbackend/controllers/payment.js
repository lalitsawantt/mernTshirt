var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "5t7ry2vbbj27jrz2",
    publicKey: "b4qcy4vj9jw8n9zz",
    privateKey: "6c95df0593ab0a0234455d108e93c8fc"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        // var clientToken = response.clientToken
        if(err) {
            res.status(500).send(err) 
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    // 
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        // deviceData: deviceDataFromT heClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if(err) {
            res.status(500).json(error)
        } else {
            res.json(result);
        }

    });
};