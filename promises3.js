var firstMethod = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('first method completed');
         resolve({data: '123'});
      }, 1000);
   });
   return promise;
};
 
 
var secondMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('second method completed');
         resolve({newData: someStuff.data + ' some more data'});
      }, 1000);
   });
   return promise;
};
 
var thirdMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('third method completed');
         reject({result: someStuff.newData});
      }, 1000);
   });
   return promise;
};

var fourthMethod = function(someStuff) {
    var promise = new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('fourth method completed');
          resolve({result: someStuff.newData + ' fourth method added data'});
       }, 1000);
    });
    return promise;
 };
 
firstMethod()
   .then(secondMethod)
   .then(thirdMethod)
   .catch(fourthMethod)
   .then( () => console.log("done"));