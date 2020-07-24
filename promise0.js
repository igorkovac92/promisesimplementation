/* ES6, using Bluebird */
var fa = function(a) {return a + a};
const promise1 = new Promise((resolve, reject) => {
    //resolve('Success!');
    //resolve = fa;

    var temp;
    //var temp = resolve('Resolved here!');
    console.log(temp !== undefined ? "temp " + temp : "123");
  });
  
  promise1
  .then((value) => {
    console.log("then");
    console.log(value);
    // expected output: "Success!"
  })
  .catch(e => {
      console.log("error");
      console.log(e);
    });