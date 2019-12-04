#!/usr/bin/env node
!function(e){var t={};function s(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(r,i,function(t){return e[t]}.bind(null,i));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("chalk")},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(1));t.toFirstUpperLetter=e=>e[0].toUpperCase().concat(e.slice(1)),t.checkIfObjectIsEmpty=(e,t)=>{let s=new Date;null!=t?Array.isArray(t)&&0===t.length?console.log(e+" empty: "+i.default.redBright(!0)+" - "+s+" "+s.getMilliseconds()+"ms"):console.log(e+" not empty: "+i.default.greenBright(!1)+" - "+s+" "+s.getMilliseconds()+"ms"):console.log(e+" empty: "+i.default.redBright(!0)+" - "+s+" "+s.getMilliseconds()+"ms")}},function(e,t){e.exports=require("ejs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),(new(r(s(7)).default)).start()},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(0)),n=r(s(8)),o=s(9),a=r(s(10)),u=s(3),l=s(4),c=s(5);t.default=class{constructor(){this.readConfig=()=>new Promise((e,t)=>{try{const t=c.readFileSync(o.CONFIG_PATH),s=JSON.parse(t);s.definitionDir&&(this._pathToApiDefinitionsFolder=o.WORKING_DIRECTORY+"/"+s.definitionDir),s.buildDir&&(this._pathToApiBuildFolder=o.WORKING_DIRECTORY+"/"+s.buildDir),console.log("\t Path to definitions folder: "+this._pathToApiDefinitionsFolder),console.log("\t Path to build folder: "+this._pathToApiBuildFolder),e("Successfully loaded configuration file")}catch(t){e("Configuration file not found, using default values or the ones from command line")}}),this.readInputDirectory=()=>new Promise((e,t)=>{try{let s=c.readdirSync(this._pathToApiDefinitionsFolder);this._apisDefinitionFiles=i.default.map(s,e=>this._pathToApiDefinitionsFolder+"/"+e),s.length>0?e("Loaded "+s.length+" definitions"):t("No definitions found")}catch(e){t(e)}}),this.createGeneratorsFromAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._apisDefinitionFiles,e=>new a.default(e,this._pathToApiBuildFolder)),e()}catch(e){t(e)}}),this.createAPICodeStructure=()=>new n.default(i.default.map(this._generators,e=>({title:e.getFileName(),task:()=>new Promise((t,s)=>e.createApiStructure(t,s))}))),this.generateUtilityFiles=()=>new Promise((e,t)=>{try{let t=l.join(this._pathToApiBuildFolder,"utils"),s=l.join(__dirname,"../src/templates/utils.ejs"),r=l.join(__dirname,"../src/templates/constants.ejs"),i=l.join(t,"utils.ts"),n=l.join(t,"constants.ts");c.existsSync(t)||c.mkdirSync(t,{recursive:!0});let o=u.render(c.readFileSync(s,"utf8"));c.writeFileSync(i,o);let a=u.render(c.readFileSync(r,"utf8"));c.writeFileSync(n,a),e()}catch(e){t(e)}}),this.generateAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._generators,s=>(s.generateApiOutputs(e,t),s)),e()}catch(e){t(e)}}),this._pathToApiDefinitionsFolder=o.WORKING_DIRECTORY+"/api",this._pathToApiBuildFolder=o.WORKING_DIRECTORY+"/src/api",this._apisDefinitionFiles=[],this._generators=[]}start(){new n.default([{title:"Read RRG configuration file",task:this.readConfig},{title:"Load API definition files",task:this.readInputDirectory},{title:"Create generator controllers",task:this.createGeneratorsFromAPIFiles},{title:"Create API structure",task:this.createAPICodeStructure},{title:"Generate general utility files",task:this.generateUtilityFiles},{title:"Generate API",task:this.generateAPIFiles}]).run().catch(e=>{console.error(e)})}}},function(e,t){e.exports=require("listr")},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WORKING_DIRECTORY=process.cwd(),t.CONFIG_PATH=t.WORKING_DIRECTORY+"/rrg-config.json"},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(0)),n=r(s(1)),o=r(s(11)),a=r(s(12)),u=r(s(15)),l=s(2),c=s(3),d=s(4),h=s(5);t.default=class{constructor(e,t){this.createApiStructure=async(e,t)=>{try{const e=await o.default.validate(this._pathToDefinition);this._serverUrl=e.servers[0].url,this._name=e.info.title.replace(" ","_").toLowerCase(),this._models=i.default.entries(e.components.schemas).map(e=>(console.log(n.default.bgCyan(e[0])),console.log(e[1]),new a.default(e[0],e[1]))),this._paths=i.default.entries(e.paths).map(e=>(console.log(n.default.bgMagenta(e[0])),console.log(e[1]),new u.default(e[0],e[1]))),l.checkIfObjectIsEmpty("Models",this._models),l.checkIfObjectIsEmpty("Endpoints",this._paths),console.log(n.default.bgGreen("this")),console.log(this)}catch(e){t(e)}e()},this.generateApiOutputs=(e,t)=>{try{let e=d.resolve(__dirname,"../src/templates/actions.ejs"),t=d.resolve(__dirname,"../src/templates/model.ejs"),s=d.resolve(__dirname,"../src/templates/reducer.ejs"),r=d.resolve(this._pathToOutputFolder,"models"),n=d.resolve(this._pathToOutputFolder,"actions"),o=d.resolve(this._pathToOutputFolder,"reducers");l.checkIfObjectIsEmpty("Models",this._models),l.checkIfObjectIsEmpty("Endpoints",this._paths),i.default.forEach(this._models,(e,s,i)=>{if("object"===e.type){h.existsSync(r)||h.mkdirSync(r,{recursive:!0});let s=c.render(h.readFileSync(t,"utf8"),e);h.writeFileSync(d.resolve(r,e.name+".ts"),s)}}),h.existsSync(n)||h.mkdirSync(n,{recursive:!0});let a=c.render(h.readFileSync(e,"utf8"),{_paths:this._paths});h.writeFileSync(d.resolve(n,this._name+"Actions.ts"),a);let u=c.render(h.readFileSync(s,"utf8"),this);h.writeFileSync(d.resolve(o,this._name+"Reducer.ts"),u)}catch(e){t(e)}e()},this._pathToDefinition=e,this._pathToOutputFolder=t,this._serverUrl="",this._models=[],this._paths=[]}getFileName(){return d.parse(this._pathToDefinition).name}}},function(e,t){e.exports=require("swagger-parser")},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(0)),n=r(s(13)),o=r(s(14));t.default=class{constructor(e,t){switch(this._name=e,this._type=t.type,this._type){case"object":this._properties=i.default.entries(t.properties).map(e=>new o.default(e[0],e[1]));break;case"array":this._items=new n.default(t.items)}}get name(){return this._name}get type(){return this._type}get items(){return this._items}get properties(){return this._properties}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._type=e.type}get type(){return this._type}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){switch(this._name=e,t.type){case"array":this._type=t.items.type+"[]";break;case"integer":this._type="number";break;case"string":if(t.format&&"date-time"===t.format){this._type="Date";break}default:this._type=t.type}}get name(){return this._name}get type(){return this._type}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(0)),n=r(s(16));t.default=class{constructor(e,t){this._path=e,this._methods=i.default.entries(t).map(e=>new n.default(e[0],e[1]))}get path(){return this._path}set path(e){this._path=e}get methods(){return this._methods}set methods(e){this._methods=e}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(0)),n=s(2),o=r(s(17)),a=r(s(18));t.default=class{constructor(e,t){this._name=n.toFirstUpperLetter(t.operationId),this._type=n.toFirstUpperLetter(e),this._consumes=t.consumes&&t.consumes[0],this._produces=t.produces&&t.produces[0],this._resultVariableName=t.responses[200].description,this._pathParameters=[],i.default.forEach(t.parameters,e=>{"body"===e.in?this._requestBody=new o.default(e):"path"===e.in&&this._pathParameters.push(new a.default(e))})}get name(){return this._name}set name(e){this._name=e}get consumes(){return this._consumes}set consumes(e){this._consumes=e}get produces(){return this._produces}set produces(e){this._produces=e}get requestBody(){return this._requestBody}set requestBody(e){this._requestBody=e}get pathParameters(){return this._pathParameters}set pathParameters(e){this._pathParameters=e}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._name=e.name,this._schema=e.schema}get name(){return this._name}set name(e){this._name=e}get schema(){return this._schema}set schema(e){this._schema=e}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._name=e.name,this._type=e.type,this._required=e.required}get name(){return this._name}set name(e){this._name=e}get required(){return this._required}set required(e){this._required=e}get type(){return this._type}set type(e){this._type=e}}}]);