# 162. Login page and Google authentication

We need a login page and a logout button in the app.
The login page will be displayed at the root.

We start by creating a simple Component with no state for the Login page:
```javascript
import React from 'react';

export const LoginPage = () => (
    <div>
        <button>Login</button>
    </div>
);
```
Since there is no state, it can be defined as a functional Component.

The snapshot test will be:
```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should correctly render LoginPage', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});
```

To display the Login page by default we will have to change the Router:
```javascript
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// ...
import { LoginPage } from '../components/LoginPage';

import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/dashboard" component={ExpenseDashboardPage}/>
                // ...
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
```
This will render the `Header` even in the Login page though.

Then we will need to enable the authentication via Google from Firebase.
Documentation is [here](https://firebase.google.com/docs/reference/js/firebase.auth?authuser=0).

We need to setup the Authentication provider in `firebase.js`:
```javascript
import * as firebase from 'firebase';
// ...
firebase.initializeApp(firebaseConfig);
// ...
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
```

Then, in `app.js` we can use the provider like this, temporarily:
```javascript
// ...
import { firebase } from './firebase/firebase';
// ...
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log('log in');
    } else {
        console.log('log out');
    }
});
```

The Login process will be implemented as an Action, with its Action Producer:
```javascript
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
};
```

This action will be used from the `LoginPage` Component:
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => (
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
```