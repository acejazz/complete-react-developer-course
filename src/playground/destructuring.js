// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// }

// const {name: firstName = 'Anonymous', age} = person;
// console.log(`${firstName} is ${age}`);


// const {temp: temperature, city} = person.location;
// if(city && temperature){
//     console.log(`It's ${temperature} in ${city}`);
// }

// const {height = 123} = person;
// console.log(height);

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }
// const {name : publisherName = 'Self-published'} = book.publisher;
// console.log(publisherName); // Penguin/Self-published


const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, city, state] = address;
console.log(`You are in ${city} ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [description, , mediumPrice] = item;
console.log(`A medium ${description} costs ${mediumPrice}`);