# 134. Creating separate CSS files

As of now, all the CSS files live inside `bundle.js` and therefore it's bigger than it should be:
```javascript
// app.js
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
// ...
```
We can tell WebPack to separate the CSS files from the JavaScript.

We will use the `extract-text-webpack-plugin` WebPack plugin.
From the documentation we have:
```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```

To install the plugin:
```shell
yarn add extract-text-webpack-plugin@3.0.0
```

This plugin will be used in the WebPack configuration:
```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        // ...
        module: {
            rules: [
                // ...
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            'css-loader',
                            'sass-loader'
                        ]
                    })
                }
            ]
        },
        plugins: [
            CSSExtract
        ],
        // ...
    };
};
```
The `plugins` array is where the plugins are setup to access and work with the existing WebPack build.
If now we run `yarn run build:prod` we will see that it's creating the4 different files:
```
bundle.js       839 kB          0  [emitted]  [big]  main
styles.css      17.4 kB         0  [emitted]         main
bundle.js.map   4.77 MB         0  [emitted]         main
styles.css.map  87 bytes        0  [emitted]         main
```

That CSS file must be included in our HTML:
```html
<head>
    <!-- ... -->
    <link rel="stylesheet" type="text/css" href="/styles.css" />
</head>
```