# 131. Integrating Git in our project

In the current `app.js` we are adding expenses from the code:
```javascript
// ...
const store = configureStore();

store.dispatch(addExpense({description: 'Water bill', amount: 4500, createdAt: 561}));
store.dispatch(addExpense({description: 'Gas bill', amount: 800, createdAt: 1001}));
store.dispatch(addExpense({description: 'Rent', amount: 109500, createdAt: 562}));
// ...
```
We will remove those lines because we will add them to the database directly.