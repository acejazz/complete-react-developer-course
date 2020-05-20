import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };


// database.ref('expenses')
//     .on('child_removed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     });

// database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     });

// database.ref('expenses')
//     .on('child_added', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     });

// database.ref().remove();

// Expenses with 3 items (description, note, amount, createdAt)

// database.ref('expenses')
//     .once('value')
//     .then( (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((child) => {
//             expenses.push({
//                 id: child.key,
//                 ...child.val()
//             });
//         });

//         console.log(expenses);
//     });


// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((child) => {
//             expenses.push({
//                 id: child.key,
//                 ...child.val()
//             });
//         });

//         console.log(expenses);
//     });
// database.ref('expenses').push({
//     description: 'first description',
//     note: 'first note',
//     amount: 1,
//     createdAt: 100
// });

// database.ref('expenses').push({
//     description: 'second description',
//     note: 'second note',
//     amount: 20,
//     createdAt: 2000
// });

// database.ref('expenses').push({
//     description: 'third description',
//     note: 'third note',
//     amount: 3.3,
//     createdAt: 33333
// });

// database.ref('notes').push({
//     title: 'Course topics',
//     body: 'React, angular'
// });

// database.ref('notes/-M7DRhihjdSDZhgfcgGj').update({
//     body: 'buy food'
// });

// database.ref('notes/-M7DRhihjdSDZhgfcgGj').remove();

// const firebaseNotes = {
//     notes: {
//         id1: {
//             title: 'first note',
//             body: 'this is my note'
//         },
//         id2: {
//             title: 'second note',
//             body: 'another note'
//         }
//     }
// }

// const notes = [{
//     id: '12',
//     title: 'first note',
//     body: 'this is my note'
// }, {
//     id: '45sdf',
//     title: 'second note',
//     body: 'another note'
// }];

// database.ref('notes').set(notes);

// database.ref().set({
//     name: 'Tanio',
//     age: 38,
//     job: {
//         title: 'developer',
//         company: 'Google'
//     },
//     stressLevel: 6,
//     location: {
//         city: 'London',
//         country: 'UK'
//     }
// }).then(() => {
//     console.log('Data is saved.');
// }).catch((e) => {
//     console.log('This failed.', e);
// });


// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// }).then(()=>{console.log('updated')});
// console.log('firebase loaded')
// const onValueChange = database.ref()
//     .on('value', (snapshot) => {
//         console.log(snapshot);
//         const val = snapshot.val();
//         console.log(`${val.name} is a ${val.job.title}`);
//     }, (e) => {
//         console.log('Error with data fetching', e);
//     });

// database.ref().off('value', onValueChange);

// setTimeout(()=>{
//     database.ref('age').set(28);
// }, 5000);