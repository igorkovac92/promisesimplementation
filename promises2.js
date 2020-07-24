var keepsHisWord;
keepsHisWord = false;
var promise1 = new Promise((resolve, reject) => keepsHisWord ? resolve('The man likes to keep his word') : reject("The man doesn't want to keep his word"));

/* promise1 = new Promise(function(resolve, reject) {
    if (keepsHisWord) {
      resolve("The man likes to keep his word");
    } else {
      reject("The man doesnt want to keep his word");
    }
  }); */

console.log(promise1);

var promiseWrapper = function () {
    promise1.then(function (fulfilled) {
        console.log(fulfilled);
        //return fulfilled;
    }).catch(function (failed){
        console.log(failed);
    });
};

var promiseWrapper2 = function () {
    return promise1.then(function (fulfilled) {
        //console.log(fulfilled);
        return fulfilled;
    }).catch(function (failed){
        return failed;
    });
};

promiseWrapper();

var item = promiseWrapper2().then((res) => console.log("2 " + res)).catch((res) => console.log("2 " + res));