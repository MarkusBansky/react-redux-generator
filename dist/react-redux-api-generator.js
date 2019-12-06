#!/usr/bin/env node
!function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t){e.exports=require("lodash")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const n=s(r(0)),o=s(r(16)),a=i(r(2)),u=i(r(3));t.toFirstUpperLetter=e=>e[0].toUpperCase().concat(e.slice(1)),t.sentenceToCamelCase=e=>{let r=e.replace(/[^a-zA-Z\s!?]/g,"").split(" ").map(e=>t.toFirstUpperLetter(e)).join("");return r[0].toLowerCase()+r.slice(1)},t.removeDirectory=function e(t){a.existsSync(t)&&(a.readdirSync(t).forEach((function(r){const s=u.join(t,r);a.lstatSync(s).isDirectory()?e(s):a.unlinkSync(s)})),a.rmdirSync(t))},t.getSchemaNameFromResponse=function(e){try{return e.content["application/json"].schema.$ref?e.content["application/json"].schema.$ref.split("/").reverse()[0]:e.content["application/json"].schema.type}catch(e){return"specify_the_return_schema_with_ref"}},t.schemaPropertiesToTypedString=function e(t){let r="{ ";return n.default.map(t.properties,(t,s)=>{switch(r+=`${s}: `,console.log(o.default.green(s,t)),t.type){case"array":r+=`${t.items.type}[], `;break;case"object":r+=e(t)+", ";break;case"integer":r+="number, ";break;default:r+=`${t.type}, `}}),n.default.keys(t.properties).length>0&&(r=r.slice(0,r.length-2)),r+=" }"}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("ejs")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),(new(s(r(6)).default)).start()},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(7)),o=r(8),a=s(r(9)),u=r(1),c=r(4),l=r(3),d=r(2);t.default=class{constructor(){this.readConfig=()=>new Promise((e,t)=>{try{const t=d.readFileSync(o.CONFIG_PATH),r=JSON.parse(t);r.definitionDir&&(this._pathToApiDefinitionsFolder=o.WORKING_DIRECTORY+"/"+r.definitionDir),r.buildDir&&(this._pathToApiBuildFolder=o.WORKING_DIRECTORY+"/"+r.buildDir),console.log("\t Path to definitions folder: "+this._pathToApiDefinitionsFolder),console.log("\t Path to build folder: "+this._pathToApiBuildFolder),e("Successfully loaded configuration file")}catch(t){e("Configuration file not found, using default values or the ones from command line")}}),this.clearOutputDirectory=()=>new Promise((e,t)=>{try{u.removeDirectory(this._pathToApiBuildFolder),e("Done")}catch(e){t(e)}}),this.readInputDirectory=()=>new Promise((e,t)=>{try{let r=d.readdirSync(this._pathToApiDefinitionsFolder);this._apisDefinitionFiles=i.default.map(r,e=>this._pathToApiDefinitionsFolder+"/"+e),r.length>0?e("Loaded "+r.length+" definitions"):t("No definitions found")}catch(e){t(e)}}),this.createGeneratorsFromAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._apisDefinitionFiles,e=>new a.default(e,this._pathToApiBuildFolder)),e()}catch(e){t(e)}}),this.createAPICodeStructure=()=>new n.default(i.default.map(this._generators,e=>({title:e.getFileName(),task:()=>new Promise((t,r)=>e.createApiStructure(t,r))}))),this.generateUtilityFiles=()=>new Promise((e,t)=>{try{let t=l.join(this._pathToApiBuildFolder,"utils"),r=l.join(__dirname,"../src/templates/utils.ejs"),s=l.join(__dirname,"../src/templates/constants.ejs"),i=l.join(t,"utils.ts"),n=l.join(t,"constants.ts");d.existsSync(t)||d.mkdirSync(t,{recursive:!0});let o=c.render(d.readFileSync(r,"utf8"));d.writeFileSync(i,o);let a=c.render(d.readFileSync(s,"utf8"));d.writeFileSync(n,a),e()}catch(e){t(e)}}),this.generateAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._generators,r=>(r.generateApiOutputs(e,t),r)),e()}catch(e){t(e)}}),this.generateMiddleware=()=>new Promise((e,t)=>{try{let t=l.resolve(__dirname,"../src/templates/axiosMiddleware.ejs"),r=l.resolve(this._pathToApiBuildFolder),s=c.render(d.readFileSync(t,"utf8"),this);d.writeFileSync(l.resolve(r,"axiosApiMiddleware.ts"),s),e()}catch(e){t(e)}}),this._pathToApiDefinitionsFolder=o.WORKING_DIRECTORY+"/api",this._pathToApiBuildFolder=o.WORKING_DIRECTORY+"/src/api",this._apisDefinitionFiles=[],this._generators=[]}start(){new n.default([{title:"Read RRG configuration file",task:this.readConfig},{title:"Load API definition files",task:this.readInputDirectory},{title:"Clear output directory",task:this.clearOutputDirectory},{title:"Create generator controllers",task:this.createGeneratorsFromAPIFiles},{title:"Create API structure",task:this.createAPICodeStructure},{title:"Generate general utility files",task:this.generateUtilityFiles},{title:"Generate API",task:this.generateAPIFiles},{title:"Generate middleware file",task:this.generateMiddleware}]).run().catch(e=>{console.error(e)})}}},function(e,t){e.exports=require("listr")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WORKING_DIRECTORY=process.cwd(),t.CONFIG_PATH=t.WORKING_DIRECTORY+"/rrg-config.json"},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(10)),o=s(r(11)),a=s(r(14)),u=r(1),c=r(4),l=r(3),d=r(2);t.default=class{constructor(e,t){this.createApiStructure=async(e,t)=>{try{const e=await n.default.parse(this._pathToDefinition);this._serverUrl=e.servers[0].url,this._name=u.sentenceToCamelCase(e.info.title),this._reducerName=this._name+"Reducer",this._models=i.default.entries(e.components.schemas).map(e=>new o.default(e[0],e[1])),this._paths=i.default.entries(e.paths).map(e=>new a.default(e[0],e[1]))}catch(e){t(e)}e()},this.generateApiOutputs=(e,t)=>{try{let e=l.resolve(__dirname,"../src/templates/actions.ejs"),t=l.resolve(__dirname,"../src/templates/model.ejs"),r=l.resolve(__dirname,"../src/templates/reducer.ejs"),s=l.resolve(this._pathToOutputFolder,"models"),n=l.resolve(this._pathToOutputFolder,"actions"),o=l.resolve(this._pathToOutputFolder,"reducers");i.default.forEach(this._models,(e,r,i)=>{if("object"===e.type){d.existsSync(s)||d.mkdirSync(s,{recursive:!0});let r=c.render(d.readFileSync(t,"utf8"),e);d.writeFileSync(l.resolve(s,e.name+".ts"),r)}}),d.existsSync(n)||d.mkdirSync(n,{recursive:!0});let a=c.render(d.readFileSync(e,"utf8"),this);d.writeFileSync(l.resolve(n,this._name+"Actions.ts"),a),d.existsSync(o)||d.mkdirSync(o,{recursive:!0});let u=c.render(d.readFileSync(r,"utf8"),this);d.writeFileSync(l.resolve(o,this._name+"Reducer.ts"),u)}catch(e){t(e)}e()},this._pathToDefinition=e,this._pathToOutputFolder=t,this._serverUrl="",this._models=[],this._paths=[]}_getUniqueResponseVariables(){const e=i.default.flatMapDeep(this._paths,e=>i.default.map(e.methods,e=>e.responseBody));return i.default.uniqBy(i.default.reject(e,e=>i.default.isUndefined(e)||i.default.isNull(e)),e=>e.name)}_getUniqueRequestVariables(){const e=i.default.flatMapDeep(this._paths,e=>i.default.map(e.methods,e=>e.requestBody));return i.default.uniqBy(i.default.reject(e,e=>i.default.isUndefined(e)||i.default.isNull(e)||"requestBody"==e.name||"requestArray"==e.name),e=>e.name)}getFileName(){return l.parse(this._pathToDefinition).name}}},function(e,t){e.exports=require("swagger-parser")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(12)),o=s(r(13));t.default=class{constructor(e,t){switch(this._name=e,this._type=t.type,this._type){case"object":this._properties=i.default.entries(t.properties).map(e=>new o.default(e[0],e[1]));break;case"array":this._items=new n.default(t.items)}}get name(){return this._name}get type(){return this._type}get items(){return this._items}get properties(){return this._properties}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._type=e.type}get type(){return this._type}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){switch(this._name=e,t.type){case"array":this._type=t.items.type+"[]";break;case"integer":this._type="number";break;case"string":if(t.format&&"date-time"===t.format){this._type="Date";break}default:this._type=t.type}}get name(){return this._name}get type(){return this._type}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(15));t.default=class{constructor(e,t){this._path=e,this._methods=i.default.entries(t).map(e=>new n.default(e[0],e[1]))}get path(){return this._path}set path(e){this._path=e}get methods(){return this._methods}set methods(e){this._methods=e}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(1),n=s(r(17)),o=s(r(18));t.default=class{constructor(e,t){this._name=i.toFirstUpperLetter(t.operationId),this._type=i.toFirstUpperLetter(e),this._consumes=t.consumes&&t.consumes[0],this._produces=t.produces&&t.produces[0],this._pathParameters=[],this._responseBody=void 0,this._requestBody=void 0,t.responses[200]&&(this._responseBody=new o.default(t.responses[200])),t.requestBody&&(this._requestBody=new n.default(t.requestBody))}get name(){return this._name}set name(e){this._name=e}get consumes(){return this._consumes}set consumes(e){this._consumes=e}get produces(){return this._produces}set produces(e){this._produces=e}get requestBody(){return this._requestBody}set requestBody(e){this._requestBody=e}get pathParameters(){return this._pathParameters}set pathParameters(e){this._pathParameters=e}get type(){return this._type}set type(e){this._type=e}get responseBody(){return this._responseBody}set responseBody(e){this._responseBody=e}}},function(e,t){e.exports=require("chalk")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(1);t.default=class{constructor(e){let t=s.getSchemaNameFromResponse(e).replace(/([Dd]to|[Dd]ao)/g,"");switch(this._name=t[0].toLowerCase()+t.slice(1),this._type=s.getSchemaNameFromResponse(e),this._required=void 0!==e.required&&e.required,this._type){case"array":this._name="requestArray",this._type=e.content["application/json"].schema.items.type+"[]";case"object":this._name="requestBody",this._type=s.schemaPropertiesToTypedString(e.content["application/json"].schema)}}toString(){return`${this._name}${this._required?"":"?"}: ${this._type}, `}get name(){return this._name}set name(e){this._name=e}get schema(){return this._type}set schema(e){this._type=e}get required(){return this._required}set required(e){this._required=e}get description(){return this._description}set description(e){this._description=e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(1);t.default=class{constructor(e){let t=s.getSchemaNameFromResponse(e).replace(/([Dd]to|[Dd]ao)/g,"");this._name=t[0].toLowerCase()+t.slice(1),this._type=s.getSchemaNameFromResponse(e),this._description=e.description}get name(){return this._name}set name(e){this._name=e}get type(){return this._type}set type(e){this._type=e}get description(){return this._description}set description(e){this._description=e}}}]);