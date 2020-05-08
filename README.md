# 137. Regular vs Development dependencies

Heroku is currently installing all the dependencies despite it's not using all of them. Enzyme, for example is used only for testing.
We can therefore separate a set of the dependencies to be used only locally.

To install a dependency only for development purposes:
```shell
yarn add chalk --dev
```
This will create, if non existing, the section `devDependencies`:
```json
"devDependencies": {
    "chalk": "^4.0.0"
}
```

The new section will therefore contain:
```json
"devDependencies": {
    "enzyme": "3.0.0",
    "enzyme-adapter-react-16": "1.0.0",
    "enzyme-to-json": "3.0.1",
    "jest": "20.0.4",
    "react-test-renderer": "16.0.0",
    "webpack-dev-server": "2.5.1"
}
```

We won't need `live-server` anymore because we are using `webpack-dev-server`, so it can be removed.
We can thus also remove the `serve` script.

To not install the `dev` dependencies we will run:
```
yarn install --production
```
All the dependencies not in the `devDependencies` section will be installed.

With the normal `yarn install` it will install all the dependencies.

---

In the `public` folder we have also the dynamically generated files `bundle.js`, `bundle.js.map`, `styles.css` and `styles.css.map`.
The best practice is to place these files in the `dist` folder and instruct WebPack to create those assets in there.

`index.html` must point to the new location:
```html
<!DOCTYPE html>
<html>
<head>
    <!-- ... --->
    <link rel="stylesheet" type="text/css" href="/dist/styles.css" />
</head>
<body>
    <!-- ... -->
    <script src="/dist/bundle.js"></script>
</body>
</html>
```

We must update `webpack.config.js` to install those assets in the new directory, also when we run `devServer`:
```javascript
// ...
module.exports = (env) => {
    // ...
    return {
        // ...
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            // ...
        },
        // ...
        devServer: {
            // ...
            publicPath: '/dist/'
        }
    };
};
```

If we now run `yarn run dev-server` we will see that the app is correctly running and the assets are loaded although there is no `dist` folder, as they are created on the fly and held in memory.
To run the server in production-like style we have to build the files and then serve those:
```
yarn run build:prod
yarn start
```

`.gitignore` can now be simplified by ignoring the entire `public/dist/` folder rather than the single asset files.