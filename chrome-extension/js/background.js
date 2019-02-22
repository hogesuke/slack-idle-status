!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=3)}([function(t,e,s){"use strict";s.d(e,"a",function(){return i});class i{static getToken(){return this._getItem("token")}static setToken(t){return this._setItem("token",t)}static getOpenTime(){return this._getItem("open-time")}static setOpenTime(t){return this._setItem("open-time",t)}static getClosedTime(){return this._getItem("closed-time")}static setClosedTime(t){return this._setItem("closed-time",t)}static getDayOfTheWeek(){return this._getItem("dayoftheweek",{isObject:!0})}static setDayOfTheWeek(t){return this._setItem("dayoftheweek",JSON.stringify(t))}static getEmoji(){return this._getItem("emoji")}static setEmoji(t){return this._setItem("emoji",t)}static getProgressedSeconds(){return this._getItem("progressed-seconds",{isNumber:!0})}static setProgressedSeconds(t){return this._setItem("progressed-seconds",t)}static getProgressedMinutes(){return this._getItem("progressed-minutes",{isNumber:!0})}static setProgressedMinutes(t){return this._setItem("progressed-minutes",t)}static getLastUpdateDate(){return this._getItem("last-update-date")}static setLastUpdateDate(t){return this._setItem("last-update-date",t)}static getURLs(){return this._getItem("urls",{isObject:!0})}static setURLs(t){return this._setItem("urls",JSON.stringify(t))}static _getItem(t,{isNumber:e=!1,isObject:s=!1}={}){const i=localStorage.getItem(t);return e?parseInt(i,10):s?JSON.parse(i):i}static _setItem(t,e){localStorage.setItem(t,e)}}},,,function(t,e,s){"use strict";s.r(e);var i=s(0);class r{constructor(t){this.token=t}post({minutes:t=0,title:e=""}={}){return this._postProfile({status_text:`:shushing_face: [見てる] [${e}] [計 ${t}分]`,status_emoji:`:${i.a.getEmoji()}:`})}clear(){return this._postProfile({status_text:"",status_emoji:""})}_postProfile(t){return fetch("https://slack.com/api/users.profile.set",{method:"POST",headers:{Authorization:`Bearer ${this.token}`,"content-type":"application/json"},body:JSON.stringify({profile:t})})}}class a{constructor(t=[]){this.tabs=t,console.log("tabs",t)}isEmpty(){return this.tabs.length<=0}getCurrentSaboriTab(){if(this.tabs.length<=0)return null;const t=this.tabs.find(t=>t.active);if(t)return t;const e=Math.max(...this.tabs.map(t=>t.id));return this.tabs.find(t=>t.id===e)}}class n{constructor(t=[]){this.targetUrls=t}async detectSaboriTabs(){return new Promise(t=>{chrome.tabs.query({url:this.targetUrls},e=>{t(new a(e))})})}}class o{static isApplied(){const t=new Date;return this._isWithinTimeRange(t)&&this._isTargetDayOfTheWeek(t)}static _isWithinTimeRange(t){const e=i.a.getOpenTime(),s=i.a.getClosedTime(),r=this._getParsedTime(`${t.getHours()}:${t.getMinutes()}`),a=this._getParsedTime(e),n=this._getParsedTime(s);return!(r.hours<a.hours||n.hours<r.hours)&&(!(r.hours===a.hours&&r.minutes<a.minutes)&&!(r.hours===n.hours&&n.minutes<r.minutes))}static _isTargetDayOfTheWeek(t){const e=i.a.getDayOfTheWeek(),s=["sun","mon","tue","wed","thu","fri","sat"][t.getDay()];return e.includes(s)}static _getParsedTime(t){const e=t.split(":");return{hours:parseInt(e[0]),minutes:parseInt(e[1])}}}class c{static calcTotalSaboriTime(t){const e=parseInt(i.a.getProgressedMinutes())||0,s=parseInt(i.a.getProgressedSeconds())||0;if(!t)return{seconds:s,minutes:e};const r=i.a.getLastUpdateDate(),a=r?new Date(r):null,n=new Date;if(this._getYYYYMD(a)!==this._getYYYYMD(n))return 0;const o=(n-t)/1e3+s;return{seconds:o,minutes:Math.ceil(o/60)}}static _getYYYYMD(t){return t?""+t.getFullYear()+(t.getMonth()+1)+t.getDate():""}}var u=s(4);const h=new class{constructor(){const t=i.a.getToken(),e=i.a.getURLs();this.client=new r(t),this.detector=new n(e),this.isChikurying=!1}init(){i.a.getOpenTime()||i.a.setOpenTime(u.a.OPEN_TIME),i.a.getClosedTime()||i.a.setClosedTime(u.a.CLOSED_TIME),i.a.getDayOfTheWeek()||i.a.setDayOfTheWeek(u.a.DAY_OF_THE_WEEK),i.a.getEmoji()||i.a.setEmoji(u.a.EMOJI),i.a.getURLs()||i.a.setURLs(u.a.URLS)}async run(){chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this)),chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));const t=await this.detector.detectSaboriTabs();!t.isEmpty()&&o.isApplied()?this.startSabori(t):this.exitSabori()}async onTabUpdated(t,e){if(!e.url)return;console.log("changeInfo",e);const s=await this.detector.detectSaboriTabs();!s.isEmpty()&&o.isApplied()?this.startSabori(s):this.exitSabori()}async onTabRemoved(){(await this.detector.detectSaboriTabs()).isEmpty()&&this.exitSabori()}startSabori(t){if(this.isChikurying)return void console.log("startSabori 何もしない");console.log("startSabori"),console.log("tabs",t),this.timeUpdateInterval&&clearInterval(this.timeUpdateInterval);const e=c.calcTotalSaboriTime(new Date),s=t.getCurrentSaboriTab();this.postChikury(e,s.title),this.timeUpdateInterval=setInterval(this.intervalUpdater.bind(this),1e4)}async intervalUpdater(){console.log("timeUpdateInterval");const t=await this.detector.detectSaboriTabs();if(t.isEmpty()||!o.isApplied())return void this.exitSabori();const e=i.a.getProgressedMinutes(),s=i.a.getLastUpdateDate()?new Date(i.a.getLastUpdateDate()):null,r=c.calcTotalSaboriTime(s),a=t.getCurrentSaboriTab();e!==r.minutes&&this.postChikury(r,a.title)}exitSabori(){if(!this.isChikurying)return void console.log("exitSabori 何もしない");console.log("exitSabori"),clearInterval(this.timeUpdateInterval);const t=c.calcTotalSaboriTime();i.a.setProgressedSeconds(t.seconds),this.clearChikury()}postChikury(t,e){this.client.post({minutes:t.minutes,title:e}).then(()=>{i.a.setLastUpdateDate((new Date).toISOString()),i.a.setProgressedMinutes(t.minutes),i.a.setProgressedSeconds(t.seconds),this.isChikurying=!0})}clearChikury(){this.client.clear().then(()=>{this.isChikurying=!1})}};h.init(),h.run()},function(t,e,s){"use strict";s.d(e,"a",function(){return i});const i={OPEN_TIME:"09:00",CLOSED_TIME:"18:00",DAY_OF_THE_WEEK:["mon","tue","wed","thu","fri"],EMOJI:"eyes",URLS:["https://twitter.com/*"]}}]);