# 136. Deploying with Heroku

Before using Heroku, we have to log into it:
```shell
heroku login
```

After this, we have to create our app:
```shell
heroku create react-developer-course
```
This command creates also a git origin, as we can see if we run `git remote -v`.

With the current setup, Heroku cannot know how to start up the app.
Heroku will automatically call the `start` script which we have to implement in `package.json`:
```javascript
"scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack",
    "build:prod": "webpack -p --env production",
    "dev-server": "webpack-dev-server",
    "test": "jest --config=jest.config.json",
    "start": "node server/server.js"
}
```