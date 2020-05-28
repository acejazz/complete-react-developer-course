# 168. Private firebase data

We will need to separate the data per users.
We must have a structure like `users -> userId -> expenses -> data`.
So we have to change the code where we save and retrieve data, in our `expenses` actions.

From the asynchronous action we can still access the `state` because it is passed as second parameter to the callback. We get the user ID from the state and we use it to save the data in the right place:
```javascript
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        // ...
        const uid = getState().auth.uid;
        // ...
        return database.ref(`users/${uid}/expenses`).push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }))
            });
    }
}
```

To get the data for the user when we load the app:
```javascript
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value')
            // ...
    };
};
```

The same holds for the other actions involving firebase.

Now we need to change the tests, because the tests were writing in the not updated firebase structure and because it doesn't set the uid.
We setup the state to be used by the `createMockStore` method so that it contains the User ID we want to use:
```javascript
const uid = 'thisismyuid';
const defaultAuthState = { auth: { uid }};
// ...
const store = createMockStore(defaultAuthState);
```
and then we have to update all the firebase paths, to include `users/${uid}`.

The database is still open, so we have to close the database to the public.
First we have to change the rules, to lock the database:
```javascript
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```
Then we can define the database is read and written only by logged in user, that is, users with a User ID:
```javascript
{
{
  "rules": {
    ".read": false,
    ".write": false,
      "users": {
        "$user_id": {
    		".read": "$user_id === auth.uid",
      		".write": "$user_id === auth.uid"
    	}
    }
  }
}
```
`$user_id` is a placeholder for the User ID that is populated after the login.
