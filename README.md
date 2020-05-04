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
Moreover, the app is starting on the static port 3000, so we can use the port exposed by Heroku:
```javascript
// ...
const port = process.env.PORT || 3000;
// ...
app.listen(port, () => {
    console.log('Server is up');
});
```

We have to inform Heroku how to use WebPack as well.
We haven't included in git the `node_modules` forlder and WebPack is generating the bundle files for us from the React components.
Heroku will also run the `heroku-postbuild` and `heroku-prebuild` and we can use them to include our script.
Since we want to generate the resources dynamically we have to include them in `.gitignore`:
```
public/bundle.js
public/bundle.js.map
public/styles.css
public/styles.css.map
```

Then we can push our changes on Heroku:
```shell
git push heroku master
```

With `heroku logs` we can access the logs.