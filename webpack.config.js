var path = require('path');
var SRC_DIR = path.join(__dirname, 'client');
var DIST_DIR = path.join(__dirname, 'public');

const styleLoaders = [
    require.resolve('style-loader'),
    {
        loader: require.resolve('css-loader'),
        options: { importLoaders: 1, sourceMap: true },
    },
    {
        // Options for PostCSS as we reference these options twice   
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work      
            ident: 'postcss',
            plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
            ],
            sourceMap: true
        }
    }
];

module.exports = [{
    mode: 'development',
    target: 'web',
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            {
                //match regex and use first match. fallback to file-loader
                oneOf: [
                    { test: /\.svg$/, loader: 'svg-url-loader' },
                    { test: /\.(jpe?g|png|gif|svg|ico)$/i, loader: 'url-loader?limit=8192', options: { name: 'static/[name].[hash:8].[ext]' } },
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            query: {
                                presets: ['@babel/preset-env', '@babel/preset-react'],
                                plugins: [
                                    // "babel-plugin-es6-promise", //for older browsers that don't support Promises 
                                    "@babel/plugin-proposal-object-rest-spread", //convert to ES2015 rest spread
                                    "@babel/transform-runtime", //for async await                                                                  
                                    "@babel/plugin-syntax-dynamic-import",//for dynamic imports 
                                    "@loadable/babel-plugin", //break code into chunks 
                                    "@babel/plugin-transform-destructuring", //bug https://github.com/facebook/regenerator/issues/391
                                    "@babel/plugin-transform-regenerator", //async imports of modules                        
                                    "@babel/plugin-proposal-class-properties",   //transforms static class properties                 
                                    "@babel/plugin-transform-react-constant-elements", //optimizes garbage collection
                                    "@babel/plugin-transform-react-inline-elements",  //remove vars from global scope
                                    "babel-plugin-transform-react-remove-prop-types", //removed unused react propTypes
                                    // "babel-plugin-transform-dead-code-elimination", //? eliminates unused code
                                ]
                            }
                        }
                    },
                    // Process any JS outside of the app with Babel.
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: styleLoaders,
                        sideEffects: true
                    },
                    // Adds support for CSS Modules           
                    { test: /\.module\.css$/, use: styleLoaders },
                    // Opt-in support for SASS (using .scss or .sass extensions).

                    {
                        test: /\.(scss|sass)$/,
                        exclude: /\.module\.(scss|sass)$/,
                        use: styleLoaders,
                        sideEffects: true
                    },
                    // Adds support for CSS Modules, but using SASS            
                    // {
                    //   test: /\.module\.(scss|sass)$/,
                    //   use: styleLoaders.push(require.resolve('sass-loader'))                 
                    // },                     
                    {
                        loader: 'file-loader',
                        // Exclude `js` files to keep "css" loader working as it injects             
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: { name: 'static/[name].[hash:8].[ext]' }
                    }
                ]
            }
        ]
    },
    plugins: []

}];