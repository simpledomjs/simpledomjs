!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SimpleDom=t():e.SimpleDom=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return(0,s.flatten)(t).map(function(e){if(!e.name)return""+(e.__asHtml||e);var t=Object.keys(e.attrs).filter(function(t){return!t.startsWith("on")&&void 0!==e.attrs[t]&&"ref"!==t}).map(function(t){var n=(0,s.dasherize)("className"===t?"class":t),r=e.attrs[t];return"style"===n&&"object"===("undefined"==typeof r?"undefined":c(r))?r=Object.keys(r).map(function(e){return""+(0,s.dasherize)(e)+":"+r[e]}).join(";"):"class"===n&&"object"===("undefined"==typeof r?"undefined":c(r))&&(r=Object.keys(r).filter(function(e){return r[e]}).map(s.dasherize).join(" "))," "+n+'="'+r+'"'}).join(""),n=o.apply(void 0,r(e.children));return"<"+e.name+t+">"+n+"</"+e.name+">"}).join("")}function i(e){var t=e;for("string"==typeof e&&(t=document.getElementById(e));t.firstChild;)t.removeChild(t.firstChild);for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;n>o;o++)r[o-1]=arguments[o];(0,s.flatten)(r).filter(function(e){return void 0!==e&&null!==e}).map(u).forEach(function(e){return t.appendChild(e)})}function u(e){if(!e.isElem)return e.__asHtml?e:document.createTextNode(""+e);var t=document.createElement(e.name);return Object.keys(e.attrs).filter(function(t){return void 0!==e.attrs[t]}).forEach(function(n){var r=e.attrs[n];if(n.startsWith("on")){var o=n.substring(2).toLowerCase();t.addEventListener(o,function(e){return r(e)})}else"ref"===n?r(t):("className"===n&&(n="class"),n=(0,s.dasherize)(n),"style"===n&&"object"===("undefined"==typeof r?"undefined":c(r))?Object.keys(r).forEach(function(e){return t.style[(0,s.dasherize)(e)]=r[e]}):"class"===n&&"object"===("undefined"==typeof r?"undefined":c(r))?Object.keys(r).filter(function(e){return r[e]}).forEach(function(e){return t.classList.add((0,s.dasherize)(e))}):t.setAttribute(n,r))}),e.children.filter(function(e){return void 0!==e&&null!==e}).map(u).forEach(function(e){e.__asHtml?t.insertAdjacentHTML("beforeend",e.__asHtml):t.appendChild(e)}),t}function a(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];return(0,s.isFunction)(e)?e.apply(void 0,[t].concat(r)):{name:e,attrs:t||{},children:((0,s.flatten)(r)||[]).filter(function(e){return null!==e&&void 0!==e}),isElem:!0}}function f(e,t,n){var r=(0,s.isFunction)(e)?e():e;return r?(0,s.isFunction)(t)?t():t:(0,s.isFunction)(n)?n():n}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t.renderToString=o,t.renderTo=i,t.convertToNode=u,t.el=a,t.predicate=f;var s=n(2)},function(e,t){"use strict";function n(e){return!!(e&&e.constructor&&e.call&&e.apply)}function r(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}function o(e){return Array.isArray(e)?e.reduce(function(e,t){return e.concat(Array.isArray(t)?o(t):t)},[]):e}Object.defineProperty(t,"__esModule",{value:!0}),t.isFunction=n,t.dasherize=r,t.flatten=o}])});