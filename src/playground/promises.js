const promise = new Promise( (resolve, reject) => {
    setTimeout(() => {
        resolve('Hello world')
    }, 2000);
});

console.log('before');

promise
.then((data) => {
    console.log('1', data);
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve('This is another promise')
        }, 2000);
    });
}).then((str)=> {
    console.log('does this run?', str);
});


console.log('after');