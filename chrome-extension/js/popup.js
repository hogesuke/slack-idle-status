!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".input-token");e.value=localStorage.getItem("token")||"";const t=document.querySelector(".input-starttime"),n=document.querySelector(".input-endtime"),r=localStorage.getItem("start-time")||"",o=localStorage.getItem("end-time")||"";t.value=r,n.value=o,e.addEventListener("input",()=>{localStorage.setItem("token",e.value)}),t.addEventListener("input",()=>{let e=t.value;e||(e="09:00",t.value=e),localStorage.setItem("start-time",e)}),n.addEventListener("input",()=>{let e=n.value;e||(e="18:00",n.value=e),localStorage.setItem("end-time",e)})})},function(e,t,n){}]);