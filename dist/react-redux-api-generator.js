#!/usr/bin/env node
!function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("ejs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),(new(s(r(5)).default)).start()},function(e,t,r){"use strict";(function(e){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(6)),o=r(7),a=s(r(8)),u=r(1),c=r(2),l=r(3);t.default=class{constructor(){this.readConfig=()=>new Promise((e,t)=>{try{const t=r(18)(o.CONFIG_PATH);t.definitionDir&&(this._pathToApiDefinitionsFolder=o.WORKING_DIRECTORY+"/"+t.definitionDir),t.buildDir&&(this._pathToApiBuildFolder=o.WORKING_DIRECTORY+"/"+t.buildDir),console.log("\t Path to definitions folder: "+this._pathToApiDefinitionsFolder),console.log("\t Path to build folder: "+this._pathToApiBuildFolder),e("Successfully loaded configuration file")}catch(e){t(e)}}),this.readInputDirectory=()=>new Promise((e,t)=>{try{let r=l.readdirSync(this._pathToApiDefinitionsFolder);this._apisDefinitionFiles=i.default.map(r,e=>this._pathToApiDefinitionsFolder+"/"+e),r.length>0?e("Loaded "+r.length+" definitions"):t("No definitions found")}catch(e){t(e)}}),this.createGeneratorsFromAPIFiles=()=>new Promise((e,t)=>{try{this._generators=i.default.map(this._apisDefinitionFiles,e=>new a.default(e,this._pathToApiBuildFolder)),e()}catch(e){t(e)}}),this.createAPICodeStructure=()=>new Promise((e,t)=>{try{i.default.forEach(this._generators,e=>e.create()),e()}catch(e){t(e)}}),this.generateUtilityFiles=()=>new Promise((t,r)=>{try{let r=c.resolve(this._pathToApiBuildFolder,"utils"),s=c.resolve(e,"../src/templates/utils.ejs"),i=c.resolve(e,"../src/templates/constants.ejs"),n=c.resolve(r,"utils.ts"),o=c.resolve(r,"constants.ts");l.existsSync(r)||l.mkdirSync(r,{recursive:!0});let a=u.render(l.readFileSync(s,"utf8"));l.writeFileSync(n,a);let h=u.render(l.readFileSync(i,"utf8"));l.writeFileSync(o,h),t()}catch(e){r(e)}}),this.generateAPIFiles=()=>new Promise((e,t)=>{try{i.default.forEach(this._generators,e=>e.generate()),e()}catch(e){t(e)}}),this._pathToApiDefinitionsFolder=o.WORKING_DIRECTORY+"/api",this._pathToApiBuildFolder=o.WORKING_DIRECTORY+"/src/api",this._apisDefinitionFiles=[],this._generators=[]}start(){new n.default([{title:"Read RRG configuration file",task:this.readConfig},{title:"Load API definition files",task:this.readInputDirectory},{title:"Create generator controllers",task:this.createGeneratorsFromAPIFiles},{title:"Create API structure",task:this.createAPICodeStructure},{title:"Generate general utility files",task:this.generateUtilityFiles},{title:"Generate API",task:this.generateAPIFiles}]).run().catch(e=>{console.error(e)})}}}).call(this,"/")},function(e,t){e.exports=require("listr")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WORKING_DIRECTORY=process.cwd(),t.CONFIG_PATH=t.WORKING_DIRECTORY+"/rrg-config.json"},function(e,t,r){"use strict";(function(e){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(9)),o=s(r(10)),a=s(r(13)),u=r(1),c=r(2),l=r(3);t.default=class{constructor(t,r){this.createApiStructure=async(e,t)=>{try{const e=await n.default.validate(this._pathToDefinition);this._serverUrl=e.host+e.basePath,this._name=e.info.title,this._models=i.default.entries(e.definitions).map(e=>new o.default(e[0],e[1])),this._paths=i.default.entries(e.paths).map(e=>(console.log(e),new a.default(e[0],e[1])))}catch(e){t(e)}e()},this.generateApiOutputs=(t,r)=>{try{let t=c.resolve(e,"../../src/templates/actions.ejs"),r=c.resolve(e,"../../src/templates/model.ejs"),s=c.resolve(this._pathToOutputFolder,"models"),n=c.resolve(this._pathToOutputFolder,"actions");i.default.forEach(this._models,(e,t,i)=>{if("object"===e.type){l.existsSync(s)||l.mkdirSync(s,{recursive:!0});let t=u.render(l.readFileSync(r,"utf8"),e);l.writeFileSync(c.resolve(s,e.name+".ts"),t)}}),l.existsSync(n)||l.mkdirSync(n,{recursive:!0});let o=u.render(l.readFileSync(t,"utf8"),{_paths:this._paths});l.writeFileSync(c.resolve(n,this._name+"Actions.ts"),o)}catch(e){r(e)}t()},this._pathToDefinition=t,this._pathToOutputFolder=r,this._serverUrl="",this._models=[],this._paths=[]}getName(){return c.parse(this._pathToDefinition).name}create(){return new Promise(this.createApiStructure)}generate(){return new Promise(this.generateApiOutputs)}}}).call(this,"/")},function(e,t){e.exports=require("swagger-parser")},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(11)),o=s(r(12));t.default=class{constructor(e,t){switch(this._name=e,this._type=t.type,this._type){case"object":this._properties=i.default.entries(t.properties).map(e=>new o.default(e[0],e[1]));break;case"array":this._items=new n.default(t.items)}}get name(){return this._name}get type(){return this._type}get items(){return this._items}get properties(){return this._properties}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._type=e.type}get type(){return this._type}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){switch(this._name=e,t.type){case"array":this._type=t.items.type+"[]";break;default:this._type=t.type}}get name(){return this._name}get type(){return this._type}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=s(r(14));t.default=class{constructor(e,t){this._path=e,this._methods=i.default.entries(t).map(e=>new n.default(e[0],e[1]))}get path(){return this._path}set path(e){this._path=e}get methods(){return this._methods}set methods(e){this._methods=e}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(0)),n=r(15),o=s(r(16)),a=s(r(17));t.default=class{constructor(e,t){this._name=t.description,this._type=n.toFirstUpperLetter(e),this._consumes=t.consumes&&t.consumes[0],this._produces=t.produces&&t.produces[0],this._pathParameters=[],i.default.forEach(t.parameters,e=>{"body"===e.in?this._requestBody=new o.default(e):"path"===e.in&&this._pathParameters.push(new a.default(e))})}get name(){return this._name}set name(e){this._name=e}get consumes(){return this._consumes}set consumes(e){this._consumes=e}get produces(){return this._produces}set produces(e){this._produces=e}get requestBody(){return this._requestBody}set requestBody(e){this._requestBody=e}get pathParameters(){return this._pathParameters}set pathParameters(e){this._pathParameters=e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toFirstUpperLetter=e=>e[0].toUpperCase().concat(e.slice(1))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._name=e.name,this._schema=e.schema}get name(){return this._name}set name(e){this._name=e}get schema(){return this._schema}set schema(e){this._schema=e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this._name=e.name,this._type=e.type,this._required=e.required}get name(){return this._name}set name(e){this._name=e}get required(){return this._required}set required(e){this._required=e}get type(){return this._type}set type(e){this._type=e}}},function(e,t){function r(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}r.keys=function(){return[]},r.resolve=r,e.exports=r,r.id=18}]);