---
description: >-
  Welcome to react-redux-generator project page. Elegant and easy way to
  generate REST API actions for your project from openapi-3.0 .yaml file. Easily
  edit and generate quickly when required.
---

# react-redux-generator

## Getting Started

First of all, you need to install this package from **npm** globally \(preferably\):

```
$ npm install -g react-redux-api-generator
```

{% hint style="warning" %}
 Please note that this package requires you to have several packages installed in your project, read further for details.
{% endhint %}

The purpose of this package is to generate API files for models, reducer and actions from **OpenAPI** specification. To use generated files in your project you need to have these plugins installed: 

* `axios` - used to make http requests to the server
* `redux-axios-middleware` - used to create middleware for axios client
* `lodash` - used to extend available object operations



