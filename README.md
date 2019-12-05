# React Redux API Generator :lemon:

> Elegant and easy way to generate REST API actions for your project from 
> `openapi-3.0 .yaml` file. Easily edit and generate quickly when required.

[![Build Status](https://travis-ci.org/MarkusBansky/react-redux-generator.svg?branch=master)](https://travis-ci.org/MarkusBansky/react-redux-generator)
![](https://github.com/MarkusBansky/react-redux-generator/workflows/Node%20CI/badge.svg)

Currently supports api specification only in **[OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md)**.

### Installation

To install this package we advise you to use `-g` to be able to use it globally.

```shell script
$ npm install -g react-redux-api-generator
```

After you have installed this package globally, you can use it from your command line
or add a script action to `package.json`. 

In order to generate API from the specifications you should use this command:

```shell script
$ generate-axios-api
```

The package would search for `rrg-config.json` in current directory. 
If there is no such file it would try to use default settings.

### Configure

Create a file called `rrg-config.json` in your project's root directory next to your `package.json`.

To find out what configurations are possible visit the [Config Wiki](https://github.com/MarkusBansky/react-redux-generator/wiki/Configuration-file) page.

### Script

You can also create a build script in the package file:

```json
{
    "scripts": {
        ...
        "build-with-api": "npm run generate-axios-api && npm run build"
        ...
    }
}
```

And now you can just run it from a command line and this would perform 
full project build with api generation:

```shell script
$ npm run build-with-api
```

## Description


### License

This project is being developed and distributed under the GNU LGPL 3.0 License.

You can view the full license text here: [GNU LGPL 3.0 License](https://github.com/MarkusBansky/react-redux-generator/blob/master/LICENSE). 
