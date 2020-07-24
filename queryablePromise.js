/* ES5, using Bluebird */

function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            throw e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}

var isMomHappy = true;

// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            var reason = new Error('mom is not happy');
            reject(reason);
        }
    }
);

var myPromise = MakeQuerablePromise(willIGetNewPhone);

console.log("Initial fulfilled:", myPromise.isFulfilled());//false
console.log("Initial rejected:", myPromise.isRejected());//false
console.log("Initial pending:", myPromise.isPending());//true

// call our promise
var askMom = function () {
    myPromise
        .then(function (fulfilled) {
            // yay, you got a new phone
            //alert(fulfilled.brand);
            console.log(fulfilled);
        })
        // .then(function (fulfilled) {
        //     // yay, you got a new phone
        //     //alert(fulfilled.brand);
        //     console.log("1");
        // })
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

myPromise.then(function(data){
    //console.log(data); // "Yeah !"
    console.log("Final fulfilled:", myPromise.isFulfilled());//true
    console.log("Final rejected:", myPromise.isRejected());//false
    console.log("Final pending:", myPromise.isPending());//false
});

console.log("Done");