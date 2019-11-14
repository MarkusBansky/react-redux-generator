#!/usr/bin/env node
!function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t){e.exports=require("lodash")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const n=s(r(0)),a=i(r(2)),o=i(r(3));t.toFirstUpperLetter=e=>e[0].toUpperCase().concat(e.slice(1)),t.sentenceToCamelCase=e=>{let r=e.replace(/[^a-zA-Z\s!?]/g,"").split(" ").map(e=>t.toFirstUpperLetter(e)).join("");return r[0].toLowerCase()+r.slice(1)},t.removeDirectory=function e(t){a.existsSync(t)&&(a.readdirSync(t).forEach((function(r){const s=o.join(t,r);a.lstatSync(s).isDirectory()?e(s):a.unlinkSync(s)})),a.rmdirSync(t))},t.getSchemaNameFromResponse=function(e){try{return e.content["application/json"].schema.$ref?e.content["application/json"].schema.$ref.split("/").reverse()[0]:"string"==typeof e?e.split("/").reverse()[0]:e.content["application/json"].schema.type}catch(e){return"specify_the_return_schema_with_ref"}},t.schemaPropertiesToTypedString=function e(t){let r="{ ";return n.default.map(t.properties,(t,s)=>{switch(r+=`${s}: `,t.type){case"array":"integer"==t.items.type?r+="number[], ":r+=`${t.items.type}[], `;break;case"object":r+=e(t)+", ";break;case"integer":r+="number, ";break;default:r+=`${t.type}, `}}),n.default.keys(t.properties).length>0&&(r=r.slice(0,r.length-2)),r+=" }"},t.requestParametersToTypedString=function(e){let t="";return n.default.forEach(n.default.orderBy(e,e=>e.required,"desc"),e=>{t+=`${e.name}${e.required?"":"?"}: ${e.type}, `}),t},t.requestParametersToUrlObjectString=function(e){let t="";return n.default.forEach(n.default.orderBy(e,e=>e.required,"desc"),e=>{t+=`{name: '${e.name}', value: ${e.name}}, `}),t}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("ejs")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(6)),n=r(20),a=r(21),o=new n.Command;o.version(a.version),o.option("-d, --debug","output extra debugging").option("-i, --input <type>","a list of paths to api specification files").option("-o, --output <type>","path to directory where the files are generated"),o.on("--help",(function(){console.log(""),console.log("Examples:"),console.log("  $ generate-axios-api -i api/example.yaml -i api/example-2.yaml -o src --debug"),console.log("  $ generate-axios-api -i api/example.yaml -i api/example-2.yaml -o src"),console.log("  $ generate-axios-api -i api/example.yaml -o src"),console.log("  $ generate-axios-api")})),o.parse(process.argv),new i.default(o).start()},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(7)),a=r(8),o=s(r(9)),u=r(1),c=s(r(19)),p=r(4),l=r(3),d=r(2);t.default=class{constructor(e){this.readConfig=()=>new Promise((e,t)=>{try{const t=d.readFileSync(a.CONFIG_PATH),r=JSON.parse(t);r.input&&Array.isArray(r.input)?this._apisDefinitionFiles=r.input.map(e=>l.join(a.WORKING_DIRECTORY,e)):r.input&&"string"==typeof r.input?this._apisDefinitionFiles.push(l.join(a.WORKING_DIRECTORY,r.input)):process.emitWarning("Could not read value for input files in the config file."),r.output&&(this._pathToApiBuildFolder=l.join(a.WORKING_DIRECTORY,r.output)),console.log("\t Path to definitions folder: ",this._apisDefinitionFiles),console.log("\t Path to build folder: ",this._pathToApiBuildFolder),e("Successfully loaded configuration file")}catch(e){t("Configuration file not found, you are required to add a configuration file or use command line arguments")}}),this.clearOutputDirectory=()=>new Promise((e,t)=>{try{u.removeDirectory(this._pathToApiBuildFolder),e("Done")}catch(e){t(e)}}),this.createGeneratorsFromAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._apisDefinitionFiles,e=>new o.default(e,this._pathToApiBuildFolder)),e()}catch(e){t(e)}}),this.createAPICodeStructure=()=>new n.default(i.default.map(this._generators,e=>({title:e.getFileName(),task:()=>new Promise((t,r)=>e.createApiStructure(t,r))}))),this.generateUtilityFiles=()=>new Promise((e,t)=>{try{let t=l.join(this._pathToApiBuildFolder,"utils"),r=l.join(__dirname,"../src/templates/utils.ejs"),s=l.join(__dirname,"../src/templates/constants.ejs"),i=l.join(t,"utils.ts"),n=l.join(t,"constants.ts");d.existsSync(t)||d.mkdirSync(t,{recursive:!0});let a=p.render(d.readFileSync(r,"utf8"));d.writeFileSync(i,a);let o=p.render(d.readFileSync(s,"utf8"));d.writeFileSync(n,o),e()}catch(e){t(e)}}),this.generateAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._generators,r=>(r.generateApiOutputs(e,t),r)),e()}catch(e){t(e)}}),this.generateMiddleware=()=>new Promise((e,t)=>{try{let t=l.resolve(__dirname,"../src/templates/axiosMiddleware.ejs"),r=l.resolve(this._pathToApiBuildFolder),s=p.render(d.readFileSync(t,"utf8"),this);d.writeFileSync(l.resolve(r,"axiosApiMiddleware.ts"),s),e()}catch(e){t(e)}}),this._usingCommandLineArguments=!1,this._pathToApiBuildFolder=a.WORKING_DIRECTORY+"/src/api",this._apisDefinitionFiles=[],this._generators=[],(e.input||e.output)&&(e.input&&e.output||(c.default.red("Error. You have to include both inputs and the output if you want to generate api using command parameters"),process.exit(1)),console.log(e.input,e.output),console.log(c.default.cyan("Notice!")+c.default.red(" Using command line variables, skipping config and directory tasks...")),Array.isArray(e.input)?this._apisDefinitionFiles=e.input.map(e=>l.join(a.WORKING_DIRECTORY,e)):this._apisDefinitionFiles=[l.join(a.WORKING_DIRECTORY,e.input)],this._usingCommandLineArguments=!0,this._pathToApiBuildFolder=l.join(a.WORKING_DIRECTORY,e.output))}start(){new n.default([{title:"Read RRG configuration file",task:this.readConfig,skip:()=>this._usingCommandLineArguments},{title:"Clear output directory",task:this.clearOutputDirectory},{title:"Create generator controllers",task:this.createGeneratorsFromAPIFiles},{title:"Create API structure",task:this.createAPICodeStructure},{title:"Generate general utility files",task:this.generateUtilityFiles},{title:"Generate API",task:this.generateAPIFiles},{title:"Generate middleware file",task:this.generateMiddleware}]).run().catch(e=>{console.error(e)})}}},function(e,t){e.exports=require("listr")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WORKING_DIRECTORY=process.cwd(),t.CONFIG_PATH=t.WORKING_DIRECTORY+"/rrg-config.json"},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(10)),a=s(r(11)),o=s(r(14)),u=r(1),c=r(4),p=r(3),l=r(2);t.default=class{constructor(e,t){this.createApiStructure=async(e,t)=>{try{const e=await n.default.parse(this._pathToDefinition);this._serverUrl=e.servers[0].url,this._name=u.sentenceToCamelCase(e.info.title),this._reducerName=this._name+"Reducer",this._models=i.default.entries(e.components.schemas).map(e=>new a.default(e[0],e[1])),this._paths=i.default.entries(e.paths).map(e=>new o.default(e[0],e[1]))}catch(e){t(e)}e()},this.generateApiOutputs=(e,t)=>{try{let e=p.resolve(__dirname,"../src/templates/actions.ejs"),t=p.resolve(__dirname,"../src/templates/model.ejs"),r=p.resolve(__dirname,"../src/templates/reducer.ejs"),s=p.resolve(this._pathToOutputFolder,"models"),n=p.resolve(this._pathToOutputFolder,"actions"),a=p.resolve(this._pathToOutputFolder,"reducers");i.default.forEach(this._models,(e,r,i)=>{if("object"===e.type){l.existsSync(s)||l.mkdirSync(s,{recursive:!0});let r=c.render(l.readFileSync(t,"utf8"),e);l.writeFileSync(p.resolve(s,e.name+".ts"),r)}}),l.existsSync(n)||l.mkdirSync(n,{recursive:!0});let o=c.render(l.readFileSync(e,"utf8"),this);l.writeFileSync(p.resolve(n,this._name+"Actions.ts"),o),l.existsSync(a)||l.mkdirSync(a,{recursive:!0});let u=c.render(l.readFileSync(r,"utf8"),this);l.writeFileSync(p.resolve(a,this._name+"Reducer.ts"),u)}catch(e){t(e)}e()},this._pathToDefinition=e,this._pathToOutputFolder=t,this._serverUrl="",this._models=[],this._paths=[]}_getUniqueResponseVariables(){const e=i.default.flatMapDeep(this._paths,e=>i.default.map(e.methods,e=>e.responseBody));return i.default.uniqBy(i.default.reject(e,e=>i.default.isUndefined(e)||i.default.isNull(e)),e=>e.name)}_getUniqueRequestVariables(){const e=i.default.flatMapDeep(this._paths,e=>i.default.map(e.methods,e=>e.requestBody));return i.default.uniqBy(i.default.reject(e,e=>i.default.isUndefined(e)||i.default.isNull(e)||"requestBody"==e.name||"requestArray"==e.name),e=>e.name)}getFileName(){return p.parse(this._pathToDefinition).name}}},function(e,t){e.exports=require("swagger-parser")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(12)),a=s(r(13));t.default=class{constructor(e,t){switch(this._name=e,this._type=t.type,this._type){case"object":this._properties=i.default.entries(t.properties).map(e=>new a.default(e[0],e[1]));break;case"array":this._items=new n.default(t.items)}}get name(){return this._name}get type(){return this._type}get items(){return this._items}get properties(){return this._properties}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._type=e.type}get type(){return this._type}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){switch(this._name=e,t.type){case"array":this._type=t.items.type+"[]";break;case"integer":this._type="number";break;case"string":if(t.format&&"date-time"===t.format){this._type="Date";break}default:this._type=t.type}}get name(){return this._name}get type(){return this._type}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(15));t.default=class{constructor(e,t){this._path=e,this._methods=i.default.entries(t).map(e=>new n.default(e[0],e[1]))}get path(){return this._path}set path(e){this._path=e}get methods(){return this._methods}set methods(e){this._methods=e}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=r(1),a=s(r(16)),o=s(r(17)),u=s(r(18));t.default=class{constructor(e,t){this._name=n.toFirstUpperLetter(t.operationId),this._type=n.toFirstUpperLetter(e),this._consumes=t.consumes&&t.consumes[0],this._produces=t.produces&&t.produces[0],this._pathParameters=[],this._queryParameters=[],this._responseBody=void 0,this._requestBody=void 0,t.responses[200]&&(this._responseBody=new u.default(t.responses[200])),t.requestBody&&(this._requestBody=new a.default(t.requestBody)),i.default.forEach(t.parameters,e=>{"path"===e.in?this._pathParameters.push(new o.default(e)):"query"===e.in&&this._queryParameters.push(new o.default(e))})}get parametersTypedString(){return n.requestParametersToTypedString(i.default.concat(this._pathParameters,this._queryParameters))}get parametersObjectsString(){return n.requestParametersToUrlObjectString(i.default.concat(this._pathParameters,this._queryParameters))}get name(){return this._name}set name(e){this._name=e}get consumes(){return this._consumes}set consumes(e){this._consumes=e}get produces(){return this._produces}set produces(e){this._produces=e}get requestBody(){return this._requestBody}set requestBody(e){this._requestBody=e}get pathParameters(){return this._pathParameters}set pathParameters(e){this._pathParameters=e}get type(){return this._type}set type(e){this._type=e}get responseBody(){return this._responseBody}set responseBody(e){this._responseBody=e}get queryParameters(){return this._queryParameters}set queryParameters(e){this._queryParameters=e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(1);t.default=class{constructor(e){let t=s.getSchemaNameFromResponse(e).replace(/([Dd]to|[Dd]ao)/g,"");switch(this._name=t[0].toLowerCase()+t.slice(1),this._type=s.getSchemaNameFromResponse(e),this._required=void 0!==e.required&&e.required,this._type){case"array":this._name="requestArray",this._type=e.content["application/json"].schema.items.type+"[]";case"object":this._name="requestBody",this._type=s.schemaPropertiesToTypedString(e.content["application/json"].schema)}}toString(){return`${this._name}${this._required?"":"?"}: ${this._type}, `}get name(){return this._name}set name(e){this._name=e}get schema(){return this._type}set schema(e){this._type=e}get required(){return this._required}set required(e){this._required=e}get description(){return this._description}set description(e){this._description=e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(1);t.default=class{constructor(e){switch(this._name=e.name,this._required=e.required,e.schema.type){case"array":"integer"==e.schema.items.type?this._type="number[]":this._type=e.schema.items.type+"[]";break;case"integer":this._type="number";break;case void 0:if(e.$ref){this._type=s.getSchemaNameFromResponse(e.$ref);break}default:this._type=e.schema.type}}get name(){return this._name}set name(e){this._name=e}get required(){return this._required}set required(e){this._required=e}get type(){return this._type}set type(e){this._type=e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(1);t.default=class{constructor(e){let t=s.getSchemaNameFromResponse(e).replace(/([Dd]to|[Dd]ao)/g,"");this._name=t[0].toLowerCase()+t.slice(1),this._type=s.getSchemaNameFromResponse(e),this._description=e.description}get name(){return this._name}set name(e){this._name=e}get type(){return this._type}set type(e){this._type=e}get description(){return this._description}set description(e){this._description=e}}},function(e,t){e.exports=require("chalk")},function(e,t){e.exports=require("commander")},function(e){e.exports=JSON.parse('{"name":"react-redux-api-generator","version":"0.1.2","description":"This plugin generates react-ready typescript classes and functions for REST API communication. All you need to have is an OpenAPI 3.0 definition file.","author":"Markiian Benovskyi","license":"LGPL-3.0-or-later","bugs":{"url":"https://github.com/MarkusBansky/react-redux-generator/issues"},"homepage":"https://github.com/MarkusBansky/react-redux-generator#readme","main":"./dist/react-redux-api-generator.js","bin":{"generate-axios-api":"./dist/react-redux-api-generator.js"},"scripts":{"test":"jest --coverage","build":"webpack --config webpack.config.js","clean":"if [ -e \\"bin\\" ];then rm -rf \\"bin\\" ; fi  ","updateLink":"npm run clean && npm run build && npm rm react-redux-generator -g && npm link"},"repository":{"type":"git","url":"git+https://github.com/MarkusBansky/react-redux-generator.git"},"keywords":["react","axios","rest","api","client","redux","generator","cli","node"],"dependencies":{"chalk":"^3.0.0","commander":"^4.0.1","ejs":"^2.7.2","listr":"^0.14.3","lodash":"^4.17.15","swagger-parser":"^8.0.3"},"devDependencies":{"@types/ejs":"^2.6.3","@types/jest":"^24.0.23","@types/listr":"^0.14.2","@types/lodash":"^4.14.147","@types/node":"^12.12.14","jest":"^24.9.0","ts-jest":"^24.2.0","ts-loader":"^6.2.1","typescript":"^3.7.2","webpack":"^4.41.2","webpack-cli":"^3.3.10","webpack-node-externals":"^1.7.2"}}')}]);