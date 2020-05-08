# 138. New feature workflow

Now we want to format the format for `ExpenseListItem`.

We are formatting the date:
```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
            {amount}
            - 
            {moment(createdAt).format('MMMM Do, YYYY')}
        </p>
    </div>
);

export default ExpenseListItem;
```

To format the amount we will use numeral:
```shell
yarn add numeral@2.0.6
```