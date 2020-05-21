# 157. Fetching Expenses: Part II

We have to setup an asynchronous function like we did with the action for adding the expenses, so we have to:
- return a function
- use firebase
- call the `dispatch` method
- call the synchronous action creator.

So it would be similar to:
```javascript
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;

        const expense = {
            description, note, amount, createdAt
        }

        return database.ref('expenses').push(expense)
        .then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    }
}
```

So, for setting the expenses we will have:
```javascript
// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// export const startSetExpenses;
// 1. Fetch all expense data
// 2. Parse that data into an array
// 3. Dispatch SET_EXPENSES
export const startSetExpenses = () => {
    return (dispatch) => {
        // It must be returned otherwise we won't be able to use then
        return database.ref('expenses').once('value')
            .then((snapshot) => {
                const expenses = [];
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));});
    };
};
```

This function is used on the bootstrap of the application, so it will be called in `app.js`:
```javascript
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses())
.then(() => { // then possible because we return the promise in the startSetExpenses method
    ReactDOM.render(jsx, document.getElementById('app'));
})
```

A test for the asynchronous action would be:
```javascript
test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
```