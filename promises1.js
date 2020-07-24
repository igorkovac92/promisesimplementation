/* ES6, using Bluebird */
var isMomHappy = true;

// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung 5',
                color: 'black'
            };
            resolve(phone);
        } else {
            var reason = new Error('mom is not happy');
            reject(reason);
        }
    }
);


// call our promise
var askMom = function () {
    willIGetNewPhone
    .then(function(value){
        console.log("1");
        console.log(value); // Success!
        return value;
      }, function(reason){
        console.error(reason); // Error!
      })
        .then(function (fulfilled) {
            // yay, you got a new phone
            //alert(fulfilled.brand);
            console.log("2");
            console.log(fulfilled);
        })
        .then(function (fulfilled) {
            // yay, you got a new phone
            //alert(fulfilled.brand);
            console.log("3");
        })
        // .then(function () {
        //     // yay, you got a new phone
        //     //alert(fulfilled.brand);
        //     console.log("2");
        // })
        // .then(function () {
        //     // yay, you got a new phone
        //     //alert(fulfilled.brand);
        //     console.log("3");
        // })
        .catch(function (error) {
            // ops, mom don't buy it
            //alert(error.message);
            console.log(error.message);
        });
};

askMom();

console.log("Done");