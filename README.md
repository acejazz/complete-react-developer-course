# 156. Heroky Environment variables

To use environment variables in production we have to pass them via CLI to Heroku, which store them in `process.env` (`NODE_ENV` is automatically set up).

With `heroku config` we can see all the set environment variables.
To set an environment variable we do:
```shell
heroku config:set KEY=value
```
To unset an environment variable we do:
```shell
heroku config:unset KEY
```

We can set all the environment variables we need with a unique command:
```shell
heroku config:set FIREBASE_API_KEY=AIzaSyB7ddeHOysiL2lYB3i7VAnSTQpFb8opKPo FIREBASE_AUTH_DOMAIN=expensify-d2806.firebaseapp.com FIREBASE_DATABASE_URL=https://expensify-d2806.firebaseio.com FIREBASE_PROJECT_ID=expensify-d2806 FIREBASE_STORAGE_BUCKET=expensify-d2806.appspot.com FIREBASE_MESSAGING_SENDER_ID=460313095218 FIREBASE_APP_ID=1:460313095218:web:08ca464334e397193f602b FIREBASE_MEASUREMENT_ID=G-G2HDRT8E48
```

We must add `.env.test` and `.env.development` to the `.gitignore` file because we don't want to push them to Heroku or save them in the repo.