// https://itnext.io/broken-promises-a-barely-working-implementation-of-js-promises-ed7f99071f54

// define own implementation of promise
function MyPromise(action){
    this.status = 'pending';
    this.value = undefined;
    this.id = new Date();

    this.thenCallbacks = [];
    this.catchCallback = undefined;
    this.finallyCallback =  undefined;

    this.then = function(callback){
        this.thenCallbacks.push(callback);
        return this;
        //return new MyPromise(action);
    };

    this.catch = function(callback){
        this.catchCallback =  callback;
        return this;
    }

    this.finally = function(callback){
        this.finallyCallback = callback;
        return this;
    };

    // cache this
    var that = this;
    var func1 = function() {
        //action(resolver.bind(that), rejector.bind(that));
        action(resolve.bind(that), reject.bind(that));
    };

    setTimeout(func1, 0);

    // private
    function resolve(value){
        try{
            this.value = value;
            console.log("Inside resolve");
            this.thenCallbacks.forEach(function(func){
                 Object.assign(this.value, {id : this.id});
                func(this.value);
            }, this);
            
            this.status = 'fulfilled';
            if(typeof this.finallyCallback === 'function'){
                this.finallyCallback(this.value);
            }
        }
        catch(ex){
            rejector.call(this, ex);
        }
    }
    function reject(value){
        this.status = 'rejected';
        this.value = value;

        if(typeof this.catchCallback === 'function'){
            this.catchCallback(this.value);
        }

        if(typeof this.finallyCallback === 'function'){
            this.finallyCallback(this.value);
        }
    }
}

//------------------------------------------------------------

// example how to use it
var isMomHappy = true;

var action = function (resolve, reject) {
    if (isMomHappy) {
        var phone = {
            brand: 'Samsung 5',
            color: 'black'
        };
        resolve(phone);
    } else {
        var reason = new Error('mom is not happy');
        //var reason = 'mom is not happy';
        reject(reason);
    }
};

var myPromise =  new MyPromise(action)
.then(function(response){
    console.log("1.1");
    console.log(response);
})
.then(function(response){
    console.log("1.2");
    console.log(response);
})
.catch(function(response){
    console.log("2");
    console.log(response);
})
.finally(function(response){
    console.log("3 - finally");
    console.log(response);
});