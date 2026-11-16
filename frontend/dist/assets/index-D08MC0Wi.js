var Gp=Object.defineProperty;var Wp=(r,t,e)=>t in r?Gp(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Mi=(r,t,e)=>Wp(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();function Ff(r,t,e){return Math.max(r,Math.min(t,e))}class Xp{advance(t){var o;if(!this.isRunning)return;let e=!1;if(this.lerp)this.value=(n=this.value,i=this.to,s=60*this.lerp,a=t,function(l,c,u){return(1-u)*l+u*c}(n,i,1-Math.exp(-s*a))),Math.round(this.value)===this.to&&(this.value=this.to,e=!0);else{this.currentTime+=t;const l=Ff(0,this.currentTime/this.duration,1);e=l>=1;const c=e?1:this.easing(l);this.value=this.from+(this.to-this.from)*c}var n,i,s,a;(o=this.onUpdate)==null||o.call(this,this.value,e),e&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:n=.1,duration:i=1,easing:s=l=>l,onStart:a,onUpdate:o}){this.from=this.value=t,this.to=e,this.lerp=n,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,a==null||a(),this.onUpdate=o}}class Yp{constructor({wrapper:t,content:e,autoResize:n=!0,debounce:i=250}={}){Mi(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Mi(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Mi(this,"onContentResize",()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,n&&(this.debouncedResize=function(s,a){let o;return function(){let l=arguments,c=this;clearTimeout(o),o=setTimeout(function(){s.apply(c,l)},a)}}(this.resize,i),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var t,e;(t=this.wrapperResizeObserver)==null||t.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Bf{constructor(){this.events={}}emit(t,...e){let n=this.events[t]||[];for(let i=0,s=n.length;i<s;i++)n[i](...e)}on(t,e){var n;return(n=this.events[t])!=null&&n.push(e)||(this.events[t]=[e]),()=>{var i;this.events[t]=(i=this.events[t])==null?void 0:i.filter(s=>e!==s)}}off(t,e){var n;this.events[t]=(n=this.events[t])==null?void 0:n.filter(i=>e!==i)}destroy(){this.events={}}}const Qu=100/6;class qp{constructor(t,{wheelMultiplier:e=1,touchMultiplier:n=1}){Mi(this,"onTouchStart",t=>{const{clientX:e,clientY:n}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});Mi(this,"onTouchMove",t=>{const{clientX:e,clientY:n}=t.targetTouches?t.targetTouches[0]:t,i=-(e-this.touchStart.x)*this.touchMultiplier,s=-(n-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=n,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:t})});Mi(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});Mi(this,"onWheel",t=>{let{deltaX:e,deltaY:n,deltaMode:i}=t;e*=i===1?Qu:i===2?this.windowWidth:1,n*=i===1?Qu:i===2?this.windowHeight:1,e*=this.wheelMultiplier,n*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:n,event:t})});Mi(this,"onWindowResize",()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight});this.element=t,this.wheelMultiplier=e,this.touchMultiplier=n,this.touchStart={x:null,y:null},this.emitter=new Bf,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class $p{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:n=t,eventsTarget:i=n,smoothWheel:s=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:l=35,duration:c,easing:u=x=>Math.min(1,1.001-Math.pow(2,-10*x)),lerp:f=!c&&.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:g="vertical",touchMultiplier:_=1,wheelMultiplier:p=1,autoResize:m=!0,__experimental__naiveDimensions:M=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:x,deltaY:S,event:A})=>{if(A.ctrlKey)return;const w=A.type.includes("touch"),T=A.type.includes("wheel");if(this.options.syncTouch&&w&&A.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();const R=x===0&&S===0,y=this.options.gestureOrientation==="vertical"&&S===0||this.options.gestureOrientation==="horizontal"&&x===0;if(R||y)return;let v=A.composedPath();if(v=v.slice(0,v.indexOf(this.rootElement)),v.find(B=>{var Y,H,G,k,it;return((Y=B.hasAttribute)===null||Y===void 0?void 0:Y.call(B,"data-lenis-prevent"))||w&&((H=B.hasAttribute)===null||H===void 0?void 0:H.call(B,"data-lenis-prevent-touch"))||T&&((G=B.hasAttribute)===null||G===void 0?void 0:G.call(B,"data-lenis-prevent-wheel"))||((k=B.classList)===null||k===void 0?void 0:k.contains("lenis"))&&!(!((it=B.classList)===null||it===void 0)&&it.contains("lenis-stopped"))}))return;if(this.isStopped||this.isLocked)return void A.preventDefault();if(this.isSmooth=this.options.syncTouch&&w||this.options.smoothWheel&&T,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();A.preventDefault();let C=S;this.options.gestureOrientation==="both"?C=Math.abs(S)>Math.abs(x)?S:x:this.options.gestureOrientation==="horizontal"&&(C=x);const I=w&&this.options.syncTouch,F=w&&A.type==="touchend"&&Math.abs(C)>5;F&&(C=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+C,Object.assign({programmatic:!1},I?{lerp:F?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const x=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-x),this.emit()}},window.lenisVersion="1.0.42",t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:n,eventsTarget:i,smoothWheel:s,syncTouch:a,syncTouchLerp:o,touchInertiaMultiplier:l,duration:c,easing:u,lerp:f,infinite:h,gestureOrientation:g,orientation:d,touchMultiplier:_,wheelMultiplier:p,autoResize:m,__experimental__naiveDimensions:M},this.animate=new Xp,this.emitter=new Bf,this.dimensions=new Yp({wrapper:t,content:e,autoResize:m}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=a||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new qp(i,{touchMultiplier:_,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:n=!1,lock:i=!1,duration:s=this.options.duration,easing:a=this.options.easing,lerp:o=!s&&this.options.lerp,onComplete:l,force:c=!1,programmatic:u=!0}={}){if(!this.isStopped&&!this.isLocked||c){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{let f;if(typeof t=="string"?f=document.querySelector(t):t!=null&&t.nodeType&&(f=t),f){if(this.options.wrapper!==window){const d=this.options.wrapper.getBoundingClientRect();e-=this.isHorizontal?d.left:d.top}const h=f.getBoundingClientRect();t=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=e,t=Math.round(t),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):t=Ff(0,t,this.limit),n)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),void(l==null||l(this));if(!u){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:s,easing:a,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(f,h)=>{this.isScrolling=!0,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;var t,e}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClassName("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClassName("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClassName("lenis-stopped",t))}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClassName("lenis-locked",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClassName(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)}}function Ai(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function zf(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var zn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ea={duration:.5,overwrite:!1,delay:0},hu,Je,Te,Kn=1e8,_e=1/Kn,lc=Math.PI*2,Kp=lc/4,Zp=0,kf=Math.sqrt,jp=Math.cos,Jp=Math.sin,Ke=function(t){return typeof t=="string"},Ce=function(t){return typeof t=="function"},Ni=function(t){return typeof t=="number"},fu=function(t){return typeof t>"u"},xi=function(t){return typeof t=="object"},Sn=function(t){return t!==!1},du=function(){return typeof window<"u"},Va=function(t){return Ce(t)||Ke(t)},Hf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},on=Array.isArray,Qp=/random\([^)]+\)/g,tm=/,\s*/g,th=/(?:-?\.?\d|\.)+/gi,Vf=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ss=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,vl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Gf=/[+-]=-?[.\d]+/,em=/[^,'"\[\]\s]+/gi,nm=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ae,oi,cc,pu,Hn={},ko={},Wf,Xf=function(t){return(ko=Ns(t,Hn))&&An},mu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ta=function(t,e){return!e&&console.warn(t)},Yf=function(t,e){return t&&(Hn[t]=e)&&ko&&(ko[t]=e)||Hn},ba=function(){return 0},im={suppressEvents:!0,isStart:!0,kill:!1},bo={suppressEvents:!0,kill:!1},rm={suppressEvents:!0},_u={},tr=[],uc={},qf,Un={},xl={},eh=30,wo=[],gu="",vu=function(t){var e=t[0],n,i;if(xi(e)||Ce(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=wo.length;i--&&!wo[i].targetTest(e););n=wo[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new md(t[i],n)))||t.splice(i,1);return t},Fr=function(t){return t._gsap||vu(Zn(t))[0]._gsap},$f=function(t,e,n){return(n=t[e])&&Ce(n)?t[e]():fu(n)&&t.getAttribute&&t.getAttribute(e)||n},yn=function(t,e){return(t=t.split(",")).forEach(e)||t},Pe=function(t){return Math.round(t*1e5)/1e5||0},we=function(t){return Math.round(t*1e7)/1e7||0},bs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},sm=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Ho=function(){var t=tr.length,e=tr.slice(0),n,i;for(uc={},tr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},xu=function(t){return!!(t._initted||t._startAt||t.add)},Kf=function(t,e,n,i){tr.length&&!Je&&Ho(),t.render(e,n,!!(Je&&e<0&&xu(t))),tr.length&&!Je&&Ho()},Zf=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(em).length<2?e:Ke(t)?t.trim():t},jf=function(t){return t},Vn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},am=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Ns=function(t,e){for(var n in e)t[n]=e[n];return t},nh=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=xi(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Vo=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},ha=function(t){var e=t.parent||Ae,n=t.keyframes?am(on(t.keyframes)):Vn;if(Sn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},om=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Jf=function(t,e,n,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},sl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},ar=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Br=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},lm=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},hc=function(t,e,n,i){return t._startAt&&(Je?t._startAt.revert(bo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},cm=function r(t){return!t||t._ts&&r(t.parent)},ih=function(t){return t._repeat?Os(t._tTime,t=t.duration()+t._rDelay)*t:0},Os=function(t,e){var n=Math.floor(t=we(t/e));return t&&n===t?n-1:n},Go=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},al=function(t){return t._end=we(t._start+(t._tDur/Math.abs(t._ts||t._rts||_e)||0))},ol=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=we(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),al(t),n._dirty||Br(n,t)),t},Qf=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Go(t.rawTime(),e),(!e._dur||Na(0,e.totalDuration(),n)-e._tTime>_e)&&e.render(n,!0)),Br(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-_e}},hi=function(t,e,n,i){return e.parent&&ar(e),e._start=we((Ni(n)?n:!n&&Wo(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==Ae?Xn(t,n,e):t._time)+e._delay),e._end=we(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Jf(t,e,"_first","_last",t._sort?"_start":0),Wo(e)||(t._recent=e),i||Qf(t,e),t._ts<0&&ol(t,t._tTime),t},td=function(t,e){return(Hn.ScrollTrigger||mu("scrollTrigger",e))&&Hn.ScrollTrigger.create(e,t)},ed=function(t,e,n,i,s){if(Su(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Je&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&qf!==On.frame)return tr.push(t),t._lazy=[s,i],1},um=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Wo=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},hm=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&um(t)&&!(!t._initted&&Wo(t))||(t._ts<0||t._dp._ts<0)&&!Wo(t))?0:1,o=t._rDelay,l=0,c,u,f;if(o&&t._repeat&&(l=Na(0,t._tDur,e),u=Os(l,o),t._yoyo&&u&1&&(a=1-a),u!==Os(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Je||i||t._zTime===_e||!e&&t._zTime){if(!t._initted&&ed(t,e,i,n,l))return;for(f=t._zTime,t._zTime=e||(n?_e:0),n||(n=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&hc(t,e,n,!0),t._onUpdate&&!n&&Fn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Fn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ar(t,1),!n&&!Je&&(Fn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},fm=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Fs=function(t,e,n,i){var s=t._repeat,a=we(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:we(a*(s+1)+t._rDelay*s):a,o>0&&!i&&ol(t,t._tTime=t._tDur*o),t.parent&&al(t),n||Br(t.parent,t),t},rh=function(t){return t instanceof xn?Br(t):Fs(t,t._dur)},dm={_start:0,endTime:ba,totalDuration:ba},Xn=function r(t,e,n){var i=t.labels,s=t._recent||dm,a=t.duration()>=Kn?s.endTime(!1):t._dur,o,l,c;return Ke(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(on(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},fa=function(t,e,n){var i=Ni(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Sn(l.vars.inherit)&&l.parent;a.immediateRender=Sn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Fe(e[0],a,e[s+1])},dr=function(t,e){return t||t===0?e(t):e},Na=function(t,e,n){return n<t?t:n>e?e:n},rn=function(t,e){return!Ke(t)||!(e=nm.exec(t))?"":e[1]},pm=function(t,e,n){return dr(n,function(i){return Na(t,e,i)})},fc=[].slice,nd=function(t,e){return t&&xi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&xi(t[0]))&&!t.nodeType&&t!==oi},mm=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Ke(i)&&!e||nd(i,1)?(s=n).push.apply(s,Zn(i)):n.push(i)})||n},Zn=function(t,e,n){return Te&&!e&&Te.selector?Te.selector(t):Ke(t)&&!n&&(cc||!Bs())?fc.call((e||pu).querySelectorAll(t),0):on(t)?mm(t,n):nd(t)?fc.call(t,0):t?[t]:[]},dc=function(t){return t=Zn(t)[0]||Ta("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Zn(e,n.querySelectorAll?n:n===t?Ta("Invalid scope")||pu.createElement("div"):t)}},id=function(t){return t.sort(function(){return .5-Math.random()})},rd=function(t){if(Ce(t))return t;var e=xi(t)?t:{each:t},n=zr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,u=i,f=i;return Ke(i)?u=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],f=i[1]),function(h,d,g){var _=(g||e).length,p=a[_],m,M,x,S,A,w,T,R,y;if(!p){if(y=e.grid==="auto"?0:(e.grid||[1,Kn])[1],!y){for(T=-Kn;T<(T=g[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(p=a[_]=[],m=l?Math.min(y,_)*u-.5:i%y,M=y===Kn?0:l?_*f/y-.5:i/y|0,T=0,R=Kn,w=0;w<_;w++)x=w%y-m,S=M-(w/y|0),p[w]=A=c?Math.abs(c==="y"?S:x):kf(x*x+S*S),A>T&&(T=A),A<R&&(R=A);i==="random"&&id(p),p.max=T-R,p.min=R,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(y>_?_-1:c?c==="y"?_/y:y:Math.max(y,_/y))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=rn(e.amount||e.each)||0,n=n&&_<0?Rm(n):n}return _=(p[h]-p.min)/p.max||0,we(p.b+(n?n(_):_)*p.v)+p.u}},pc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=we(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Ni(n)?0:rn(n))}},sd=function(t,e){var n=on(t),i,s;return!n&&xi(t)&&(i=n=t.radius||Kn,t.values?(t=Zn(t.values),(s=!Ni(t[0]))&&(i*=i)):t=pc(t.increment)),dr(e,n?Ce(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Kn,u=0,f=t.length,h,d;f--;)s?(h=t[f].x-o,d=t[f].y-l,h=h*h+d*d):h=Math.abs(t[f]-o),h<c&&(c=h,u=f);return u=!i||c<=i?t[u]:a,s||u===a||Ni(a)?u:u+rn(a)}:pc(t))},ad=function(t,e,n,i){return dr(on(t)?!e:n===!0?!!(n=0):!i,function(){return on(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},_m=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},gm=function(t,e){return function(n){return t(parseFloat(n))+(e||rn(n))}},vm=function(t,e,n){return ld(t,e,0,1,n)},od=function(t,e,n){return dr(n,function(i){return t[~~e(i)]})},xm=function r(t,e,n){var i=e-t;return on(t)?od(t,r(0,t.length),e):dr(n,function(s){return(i+(s-t)%i)%i+t})},Mm=function r(t,e,n){var i=e-t,s=i*2;return on(t)?od(t,r(0,t.length-1),e):dr(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},wa=function(t){return t.replace(Qp,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(tm);return ad(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},ld=function(t,e,n,i,s){var a=e-t,o=i-n;return dr(s,function(l){return n+((l-t)/a*o||0)})},Sm=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var a=Ke(t),o={},l,c,u,f,h;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(on(t)&&!on(e)){for(u=[],f=t.length,h=f-2,c=1;c<f;c++)u.push(r(t[c-1],t[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=e}else i||(t=Ns(on(t)?[]:{},t));if(!u){for(l in e)Mu.call(o,t,l,"get",e[l]);s=function(g){return Tu(g,o)||(a?t.p:t)}}}return dr(n,s)},sh=function(t,e,n){var i=t.labels,s=Kn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Fn=function(t,e,n){var i=t.vars,s=i[e],a=Te,o=t._ctx,l,c,u;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&tr.length&&Ho(),o&&(Te=o),u=l?s.apply(c,l):s.call(c),Te=a,u},na=function(t){return ar(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Je),t.progress()<1&&Fn(t,"onInterrupt"),t},ys,cd=[],ud=function(t){if(t)if(t=!t.name&&t.default||t,du()||t.headless){var e=t.name,n=Ce(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:ba,render:Tu,add:Mu,kill:Bm,modifier:Fm,rawVars:0},a={targetTest:0,get:0,getSetter:Eu,aliases:{},register:0};if(Bs(),t!==i){if(Un[e])return;Vn(i,Vn(Vo(t,s),a)),Ns(i.prototype,Ns(s,Vo(t,a))),Un[i.prop=e]=i,t.targetTest&&(wo.push(i),_u[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Yf(e,i),t.register&&t.register(An,i,En)}else cd.push(t)},xe=255,ia={aqua:[0,xe,xe],lime:[0,xe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,xe],navy:[0,0,128],white:[xe,xe,xe],olive:[128,128,0],yellow:[xe,xe,0],orange:[xe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[xe,0,0],pink:[xe,192,203],cyan:[0,xe,xe],transparent:[xe,xe,xe,0]},Ml=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*xe+.5|0},hd=function(t,e,n){var i=t?Ni(t)?[t>>16,t>>8&xe,t&xe]:0:ia.black,s,a,o,l,c,u,f,h,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ia[t])i=ia[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&xe,i&xe,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&xe,t&xe]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(th),!e)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=Ml(l+1/3,s,a),i[1]=Ml(l,s,a),i[2]=Ml(l-1/3,s,a);else if(~t.indexOf("="))return i=t.match(Vf),n&&i.length<4&&(i[3]=1),i}else i=t.match(th)||ia.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/xe,a=i[1]/xe,o=i[2]/xe,f=Math.max(s,a,o),h=Math.min(s,a,o),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},fd=function(t){var e=[],n=[],i=-1;return t.split(er).forEach(function(s){var a=s.match(Ss)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},ah=function(t,e,n){var i="",s=(t+i).match(er),a=e?"hsla(":"rgba(",o=0,l,c,u,f;if(!s)return t;if(s=s.map(function(h){return(h=hd(h,e,1))&&a+(e?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=fd(t),l=n.c,l.join(i)!==u.c.join(i)))for(c=t.replace(er,"1").split(Ss),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(er),f=c.length-1;o<f;o++)i+=c[o]+s[o];return i+c[f]},er=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ia)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),ym=/hsl[a]?\(/,dd=function(t){var e=t.join(" "),n;if(er.lastIndex=0,er.test(e))return n=ym.test(e),t[1]=ah(t[1],n),t[0]=ah(t[0],n,fd(t[1])),!0},Aa,On=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,u,f,h,d,g=function _(p){var m=r()-i,M=p===!0,x,S,A,w;if((m>t||m<0)&&(n+=m-e),i+=m,A=i-n,x=A-a,(x>0||M)&&(w=++f.frame,h=A-f.time*1e3,f.time=A=A/1e3,a+=x+(x>=s?0:s-x),S=1),M||(l=c(_)),S)for(d=0;d<o.length;d++)o[d](A,h,w,p)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return h/(1e3/(p||60))},wake:function(){Wf&&(!cc&&du()&&(oi=cc=window,pu=oi.document||{},Hn.gsap=An,(oi.gsapVersions||(oi.gsapVersions=[])).push(An.version),Xf(ko||oi.GreenSockGlobals||!oi.gsap&&oi||{}),cd.forEach(ud)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(p){return setTimeout(p,a-f.time*1e3+1|0)},Aa=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Aa=0,c=ba},lagSmoothing:function(p,m){t=p||1/0,e=Math.min(m||33,t)},fps:function(p){s=1e3/(p||240),a=f.time*1e3+s},add:function(p,m,M){var x=m?function(S,A,w,T){p(S,A,w,T),f.remove(x)}:p;return f.remove(p),o[M?"unshift":"push"](x),Bs(),x},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f}(),Bs=function(){return!Aa&&On.wake()},re={},Em=/^[\d.\-M][\d.\-,\s]/,Tm=/["']/g,bm=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Tm,"").trim():+c,i=l.substr(o+1).trim();return e},wm=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Am=function(t){var e=(t+"").split("("),n=re[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[bm(e[1])]:wm(t).split(",").map(Zf)):re._CE&&Em.test(t)?re._CE("",t):n},Rm=function(t){return function(e){return 1-t(1-e)}},zr=function(t,e){return t&&(Ce(t)?t:re[t]||Am(t))||e},Zr=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return yn(t,function(o){re[o]=Hn[o]=s,re[a=o.toLowerCase()]=n;for(var l in s)re[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=re[o+"."+l]=s[l]}),s},pd=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Sl=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/lc*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*Jp((u-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:pd(o);return s=lc/s,l.config=function(c,u){return r(t,c,u)},l},yl=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:pd(n);return i.config=function(s){return r(t,s)},i};yn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;Zr(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});re.Linear.easeNone=re.none=re.Linear.easeIn;Zr("Elastic",Sl("in"),Sl("out"),Sl());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};Zr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);Zr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Zr("Circ",function(r){return-(kf(1-r*r)-1)});Zr("Sine",function(r){return r===1?1:-jp(r*Kp)+1});Zr("Back",yl("in"),yl("out"),yl());re.SteppedEase=re.steps=Hn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-_e;return function(o){return((i*Na(0,a,o)|0)+s)*n}}};Ea.ease=re["quad.out"];yn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return gu+=r+","+r+"Params,"});var md=function(t,e){this.id=Zp++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:$f,this.set=e?e.getSetter:Eu},Ra=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Fs(this,+e.duration,1,1),this.data=e.data,Te&&(this._ctx=Te,Te.data.push(this)),Aa||On.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Fs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Bs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(ol(this,n),!s._dp||s.parent||Qf(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&hi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===_e||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Kf(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+ih(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+ih(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Os(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-_e?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Go(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-_e?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||s>0&&s<o)&&this.totalTime(Na(-Math.abs(this._delay),o,s),i!==!1),al(this),lm(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Bs(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,s=this.progress()===1&&Math.abs(this._zTime)!==_e,a;if(s)for(this._tTime-=_e,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+_e){s=!1;break}a=a._next}this.totalTime(i,s)}return this},t.startTime=function(n){if(arguments.length){this._start=we(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&hi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Sn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Go(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=rm);var i=Je;return Je=n,xu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Je=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,rh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,rh(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Xn(this,n),Sn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Sn(i)),this._dur||(this._zTime=-_e),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-_e:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-_e,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-_e)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Ce(n)?n:jf,l=function(){var u=i.then;i.then=null,s&&s(),Ce(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){na(this)},r}();Vn(Ra.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-_e,_prom:0,_ps:!1,_rts:1});var xn=function(r){zf(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Sn(n.sortChildren),Ae&&hi(n.parent||Ae,Ai(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&td(Ai(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return fa(0,arguments,this),this},e.from=function(i,s,a){return fa(1,arguments,this),this},e.fromTo=function(i,s,a,o){return fa(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,ha(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Fe(i,s,Xn(this,a),1),this},e.call=function(i,s,a){return hi(this,Fe.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Fe(i,a,Xn(this,l)),this},e.staggerFrom=function(i,s,a,o,l,c,u){return a.runBackwards=1,ha(a).immediateRender=Sn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,u)},e.staggerFromTo=function(i,s,a,o,l,c,u,f){return o.startAt=a,ha(o).immediateRender=Sn(o.immediateRender),this.staggerTo(i,s,o,l,c,u,f)},e.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:we(i),f=this._zTime<0!=i<0&&(this._initted||!c),h,d,g,_,p,m,M,x,S,A,w,T;if(this!==Ae&&u>l&&i>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),h=u,S=this._start,x=this._ts,m=!x,f&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(h=we(u%p),u===l?(_=this._repeat,h=c):(A=we(u/p),_=~~A,_&&_===A&&(h=c,_--),h>c&&(h=c)),A=Os(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),w&&_&1&&(h=c-h,T=1),_!==A&&!this._lock){var R=w&&A&1,y=R===(w&&_&1);if(_<A&&(R=!R),o=R?0:u%c?c:u,this._lock=1,this.render(o||(T?0:we(_*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Fn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,o=R?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=fm(this,we(o),we(h)),M&&(u-=h-(h=M._start))),this._tTime=u,this._time=h,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&c&&!s&&!A&&(Fn(this,"onStart"),this._tTime!==u))return this;if(h>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,a),h!==this._time||!this._ts&&!m){M=0,g&&(u+=this._zTime=-_e);break}}d=g}else{d=this._last;for(var v=i<0?i:h;d;){if(g=d._prev,(d._act||v<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(v-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(v-d._start)*d._ts,s,a||Je&&xu(d)),h!==this._time||!this._ts&&!m){M=0,g&&(u+=this._zTime=v?-_e:_e);break}}d=g}}if(M&&!s&&(this.pause(),M.render(h>=o?0:-_e)._zTime=h>=o?1:-1,this._ts))return this._start=S,al(this),this.render(i,s,a);this._onUpdate&&!s&&Fn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(S===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ar(this,1),!s&&!(i<0&&!o)&&(u||o||!l)&&(Fn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Ni(s)||(s=Xn(this,s,i)),!(i instanceof Ra)){if(on(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Ke(i))return this.addLabel(i,s);if(Ce(i))i=Fe.delayedCall(0,i);else return this}return this!==i?hi(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Kn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Fe?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return Ke(i)?this.removeLabel(i):Ce(i)?this.killTweensOf(i):(i.parent===this&&sl(this,i),i===this._recent&&(this._recent=this._last),Br(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=we(On.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Xn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Fe.delayedCall(0,s||ba,a);return o.data="isPause",this._hasPause=1,hi(this,o,Xn(this,i))},e.removePause=function(i){var s=this._first;for(i=Xn(this,i);s;)s._start===i&&s.data==="isPause"&&ar(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Ki!==o[l]&&o[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Zn(i),l=this._first,c=Ni(s),u;l;)l instanceof Fe?sm(l._targets,o)&&(c?(!Ki||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Xn(a,i),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=Fe.to(a,Vn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||_e,onStart:function(){if(a.pause(),!d){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&Fs(g,p,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,Vn({startAt:{time:Xn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),sh(this,Xn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),sh(this,Xn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+_e)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=we(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Br(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Br(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,l=Kn,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,hi(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=we(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Fs(a,a===Ae&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Ae._ts&&(Kf(Ae,Go(i,Ae)),qf=On.frame),On.frame>=eh){eh+=zn.autoSleep||120;var s=Ae._first;if((!s||!s._ts)&&zn.autoSleep&&On._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||On.sleep()}}},t}(Ra);Vn(xn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Cm=function(t,e,n,i,s,a,o){var l=new En(this._pt,t,e,0,1,Md,null,s),c=0,u=0,f,h,d,g,_,p,m,M;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=wa(i)),a&&(M=[n,i],a(M,t,e),n=M[0],i=M[1]),h=n.match(vl)||[];f=vl.exec(i);)g=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(p=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:p,c:g.charAt(1)==="="?bs(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},c=vl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Gf.test(i)||m)&&(l.e=0),this._pt=l,l},Mu=function(t,e,n,i,s,a,o,l,c,u){Ce(i)&&(i=i(s||0,t,a));var f=t[e],h=n!=="get"?n:Ce(f)?c?t[e.indexOf("set")||!Ce(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=Ce(f)?c?Um:vd:yu,g;if(Ke(i)&&(~i.indexOf("random(")&&(i=wa(i)),i.charAt(1)==="="&&(g=bs(h,i)+(rn(h)||0),(g||g===0)&&(i=g))),!u||h!==i||mc)return!isNaN(h*i)&&i!==""?(g=new En(this._pt,t,e,+h||0,i-(h||0),typeof f=="boolean"?Om:xd,0,d),c&&(g.fp=c),o&&g.modifier(o,this,t),this._pt=g):(!f&&!(e in t)&&mu(e,i),Cm.call(this,t,e,h,i,d,l||zn.stringFilter,c))},Pm=function(t,e,n,i,s){if(Ce(t)&&(t=da(t,s,e,n,i)),!xi(t)||t.style&&t.nodeType||on(t)||Hf(t))return Ke(t)?da(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=da(t[o],s,e,n,i);return a},_d=function(t,e,n,i,s,a){var o,l,c,u;if(Un[t]&&(o=new Un[t]).init(s,o.rawVars?e[t]:Pm(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new En(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==ys))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Ki,mc,Su=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,f=i.yoyoEase,h=i.keyframes,d=i.autoRevert,g=t._dur,_=t._startAt,p=t._targets,m=t.parent,M=m&&m.data==="nested"?m.vars.targets:p,x=t._overwrite==="auto"&&!hu,S=t.timeline,A=i.easeReverse||f,w,T,R,y,v,C,I,F,B,Y,H,G,k;if(S&&(!h||!s)&&(s="none"),t._ease=zr(s,Ea.ease),t._rEase=A&&(zr(A)||t._ease),t._from=!S&&!!i.runBackwards,t._from&&(t.ratio=1),!S||h&&!i.stagger){if(F=p[0]?Fr(p[0]).harness:0,G=F&&i[F.prop],w=Vo(i,_u),_&&(_._zTime<0&&_.progress(1),e<0&&u&&o&&!d?_.render(-1,!0):_.revert(u&&g?bo:im),_._lazy=0),a){if(ar(t._startAt=Fe.set(p,Vn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&Sn(l),startAt:null,delay:0,onUpdate:c&&function(){return Fn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Je||!o&&!d)&&t._startAt.revert(bo),o&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(o=!1),R=Vn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Sn(l),immediateRender:o,stagger:0,parent:m},w),G&&(R[F.prop]=G),ar(t._startAt=Fe.set(p,R)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Je?t._startAt.revert(bo):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,_e,_e);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&Sn(l)||l&&!g,T=0;T<p.length;T++){if(v=p[T],I=v._gsap||vu(p)[T]._gsap,t._ptLookup[T]=Y={},uc[I.id]&&tr.length&&Ho(),H=M===p?T:M.indexOf(v),F&&(B=new F).init(v,G||w,t,H,M)!==!1&&(t._pt=y=new En(t._pt,v,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(it){Y[it]=y}),B.priority&&(C=1)),!F||G)for(R in w)Un[R]&&(B=_d(R,w,t,H,v,M))?B.priority&&(C=1):Y[R]=y=Mu.call(t,v,R,"get",w[R],H,M,0,i.stringFilter);t._op&&t._op[T]&&t.kill(v,t._op[T]),x&&t._pt&&(Ki=t,Ae.killTweensOf(v,Y,t.globalTime(e)),k=!t.parent,Ki=0),t._pt&&l&&(uc[I.id]=1)}C&&Sd(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!k,h&&e<=0&&S.render(Kn,!0,!0)},Lm=function(t,e,n,i,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,f,h,d;if(!c)for(c=t._ptCache[e]=[],h=t._ptLookup,d=t._targets.length;d--;){if(u=h[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return mc=1,t.vars[e]="+=0",Su(t,o),mc=0,l?Ta(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,f.e&&(f.e=Pe(n)+rn(f.e)),f.b&&(f.b=u.s+rn(f.b))},Dm=function(t,e){var n=t[0]?Fr(t[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return e;s=Ns({},e);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Im=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(on(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},da=function(t,e,n,i,s){return Ce(t)?t.call(e,n,i,s):Ke(t)&&~t.indexOf("random(")?wa(t):t},Xo=gu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",gd={};yn(Xo+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return gd[r]=1});Xo=Xo.split(",");var Fe=function(r){zf(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:ha(i))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||Ae,M=(on(n)||Hf(n)?Ni(n[0]):"length"in i)?[n]:Zn(n),x,S,A,w,T,R,y,v;if(o._targets=M.length?vu(M):Ta("GSAP target "+n+" not found. https://gsap.com",!zn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||h||Va(c)||Va(u)){i=o.vars;var C=i.easeReverse||i.yoyoEase;if(x=o.timeline=new xn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:M}),x.kill(),x.parent=x._dp=Ai(o),x._start=0,h||Va(c)||Va(u)){if(w=M.length,y=h&&rd(h),xi(h))for(T in h)~Xo.indexOf(T)&&(v||(v={}),v[T]=h[T]);for(S=0;S<w;S++)A=Vo(i,gd),A.stagger=0,C&&(A.easeReverse=C),v&&Ns(A,v),R=M[S],A.duration=+da(c,Ai(o),S,R,M),A.delay=(+da(u,Ai(o),S,R,M)||0)-o._delay,!h&&w===1&&A.delay&&(o._delay=u=A.delay,o._start+=u,A.delay=0),x.to(R,A,y?y(S,R,M):0),x._ease=re.none;x.duration()?c=u=0:o.timeline=0}else if(g){ha(Vn(x.vars.defaults,{ease:"none"})),x._ease=zr(g.ease||i.ease||"none");var I=0,F,B,Y;if(on(g))g.forEach(function(H){return x.to(M,H,">")}),x.duration();else{A={};for(T in g)T==="ease"||T==="easeEach"||Im(T,g[T],A,g.easeEach);for(T in A)for(F=A[T].sort(function(H,G){return H.t-G.t}),I=0,S=0;S<F.length;S++)B=F[S],Y={ease:B.e,duration:(B.t-(S?F[S-1].t:0))/100*c},Y[T]=B.v,x.to(M,Y,I),I+=Y.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||o.duration(c=x.duration())}else o.timeline=0;return d===!0&&!hu&&(Ki=Ai(o),Ae.killTweensOf(M),Ki=0),hi(m,Ai(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!g&&o._start===we(m._time)&&Sn(f)&&cm(Ai(o))&&m.data!=="nested")&&(o._tTime=-_e,o.render(Math.max(0,-u)||0)),p&&td(Ai(o),p),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,f=i>l-_e&&!u?l:i<_e?0:i,h,d,g,_,p,m,M,x;if(!c)hm(this,i,s,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,x=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,a);if(h=we(f%_),f===l?(g=this._repeat,h=c):(p=we(f/_),g=~~p,g&&g===p?(h=c,g--):h>c&&(h=c)),m=this._yoyo&&g&1,m&&(h=c-h),p=Os(this._tTime,_),h===o&&!a&&this._initted&&g===p)return this._tTime=f,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==_&&this._initted&&(this._lock=a=1,this.render(we(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(ed(this,u?i:h,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var S=h<o;if(S!==this._inv){var A=S?o:c-o;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(S?-1:1)/A:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=M=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=M=this._ease(h/c);if(this._from&&(this.ratio=M=1-M),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!p&&(Fn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;x&&x.render(i<0?i:x._dur*x._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&hc(this,i,s,a),Fn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&Fn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&hc(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ar(this,1),!s&&!(u&&!o)&&(f||o||m)&&(Fn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,l){Aa||On.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Su(this,c),u=this._ease(c/this._dur),Lm(this,i,s,a,o,u,c,l)?this.resetTo(i,s,a,o,1):(ol(this,0),this.parent||Jf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?na(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Je),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Ki&&Ki.vars.overwrite!==!0)._first||na(this),this.parent&&a!==this.timeline.totalDuration()&&Fs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Zn(i):o,c=this._ptLookup,u=this._pt,f,h,d,g,_,p,m;if((!s||s==="all")&&om(o,l))return s==="all"&&(this._pt=0),na(this);for(f=this._op=this._op||[],s!=="all"&&(Ke(s)&&(_={},yn(s,function(M){return _[M]=1}),s=_),s=Dm(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){h=c[m],s==="all"?(f[m]=s,g=h,d={}):(d=f[m]=f[m]||{},g=s);for(_ in g)p=h&&h[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&sl(this,p,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&na(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return fa(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return fa(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return Ae.killTweensOf(i,s,a)},t}(Ra);Vn(Fe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});yn("staggerTo,staggerFrom,staggerFromTo",function(r){Fe[r]=function(){var t=new xn,e=fc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var yu=function(t,e,n){return t[e]=n},vd=function(t,e,n){return t[e](n)},Um=function(t,e,n,i){return t[e](i.fp,n)},Nm=function(t,e,n){return t.setAttribute(e,n)},Eu=function(t,e){return Ce(t[e])?vd:fu(t[e])&&t.setAttribute?Nm:yu},xd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Om=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Md=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Tu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Fm=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},Bm=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?sl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},zm=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Sd=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},En=function(){function r(e,n,i,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||xd,this.d=l||this,this.set=c||yu,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=zm,this.m=n,this.mt=s,this.tween=i},r}();yn(gu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return _u[r]=1});Hn.TweenMax=Hn.TweenLite=Fe;Hn.TimelineLite=Hn.TimelineMax=xn;Ae=new xn({sortChildren:!1,defaults:Ea,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});zn.stringFilter=dd;var kr=[],Ao={},km=[],oh=0,Hm=0,El=function(t){return(Ao[t]||km).map(function(e){return e()})},Ca=function(){var t=Date.now(),e=[];t-oh>2&&(El("matchMediaInit"),kr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=oi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),El("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),oh=t,El("matchMedia"))},yd=function(){function r(e,n){this.selector=n&&dc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Hm++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Ce(n)&&(s=i,i=n,n=Ce);var a=this,o=function(){var c=Te,u=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=dc(s)),Te=a,f=i.apply(a,arguments),Ce(f)&&a._r.push(f),Te=c,a.selector=u,a.isReverted=!1,f};return a.last=o,n===Ce?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Te;Te=null,n(this),Te=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Fe&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof xn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Fe)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=kr.length;a--;)kr[a].id===this.id&&kr.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(Ca):o.removeEventListener("change",Ca)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},r}(),Vm=function(){function r(e){this.contexts=[],this.scope=e,Te&&Te.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){xi(n)||(n={matches:n});var a=new yd(0,s||this.scope),o=a.conditions={},l,c,u;Te&&!a.selector&&(a.selector=Te.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=oi.matchMedia(n[c]),l&&(kr.indexOf(a)<0&&kr.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Ca):l.addEventListener("change",Ca),(a._mqs||(a._mqs=[])).push(l)));return u&&i(a,function(f){return a.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Yo={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return ud(i)})},timeline:function(t){return new xn(t)},getTweensOf:function(t,e){return Ae.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ke(t)&&(t=Zn(t)[0]);var s=Fr(t||{}).get,a=n?jf:Zf;return n==="native"&&(n=""),t&&(e?a((Un[e]&&Un[e].get||s)(t,e,n,i)):function(o,l,c){return a((Un[o]&&Un[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Zn(t),t.length>1){var i=t.map(function(u){return An.quickSetter(u,e,n)}),s=i.length;return function(u){for(var f=s;f--;)i[f](u)}}t=t[0]||{};var a=Un[e],o=Fr(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var f=new a;ys._pt=0,f.init(t,n?u+n:u,ys,0,[t]),f.render(1,f),ys._pt&&Tu(1,ys)}:o.set(t,l);return a?c:function(u){return c(t,l,n?u+n:u,o,1)}},quickTo:function(t,e,n){var i,s=An.to(t,Vn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,u){return s.resetTo(e,l,c,u)};return a.tween=s,a},isTweening:function(t){return Ae.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=zr(t.ease,Ea.ease)),nh(Ea,t||{})},config:function(t){return nh(zn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Un[o]&&!Hn[o]&&Ta(e+" effect requires "+o+" plugin.")}),xl[e]=function(o,l,c){return n(Zn(o),Vn(l||{},s),c)},a&&(xn.prototype[e]=function(o,l,c){return this.add(xl[e](o,xi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){re[t]=zr(e)},parseEase:function(t,e){return arguments.length?zr(t,e):re},getById:function(t){return Ae.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new xn(t),i,s;for(n.smoothChildTiming=Sn(t.smoothChildTiming),Ae.remove(n),n._dp=0,n._time=n._tTime=Ae._time,i=Ae._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Fe&&i.vars.onComplete===i._targets[0]))&&hi(n,i,i._start-i._delay),i=s;return hi(Ae,n,0),n},context:function(t,e){return t?new yd(t,e):Te},matchMedia:function(t){return new Vm(t)},matchMediaRefresh:function(){return kr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Ca()},addEventListener:function(t,e){var n=Ao[t]||(Ao[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ao[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:xm,wrapYoyo:Mm,distribute:rd,random:ad,snap:sd,normalize:vm,getUnit:rn,clamp:pm,splitColor:hd,toArray:Zn,selector:dc,mapRange:ld,pipe:_m,unitize:gm,interpolate:Sm,shuffle:id},install:Xf,effects:xl,ticker:On,updateRoot:xn.updateRoot,plugins:Un,globalTimeline:Ae,core:{PropTween:En,globals:Yf,Tween:Fe,Timeline:xn,Animation:Ra,getCache:Fr,_removeLinkedListItem:sl,reverting:function(){return Je},context:function(t){return t&&Te&&(Te.data.push(t),t._ctx=Te),Te},suppressOverwrites:function(t){return hu=t}}};yn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Yo[r]=Fe[r]});On.add(xn.updateRoot);ys=Yo.to({},{duration:0});var Gm=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Wm=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=Gm(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},Tl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(Ke(s)&&(l={},yn(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}Wm(o,s)}}}},An=Yo.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Je?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Tl("roundProps",pc),Tl("modifiers"),Tl("snap",sd))||Yo;Fe.version=xn.version=An.version="3.15.1";Wf=1;du()&&Bs();re.Power0;re.Power1;re.Power2;re.Power3;re.Power4;re.Linear;re.Quad;re.Cubic;re.Quart;re.Quint;re.Strong;re.Elastic;re.Back;re.SteppedEase;re.Bounce;re.Sine;re.Expo;re.Circ;/*!
 * CSSPlugin 3.15.1
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var lh,Zi,ws,bu,Pr,ch,wu,Xm=function(){return typeof window<"u"},Oi={},Er=180/Math.PI,As=Math.PI/180,Jr=Math.atan2,uh=1e8,Au=/([A-Z])/g,Ym=/(left|right|width|margin|padding|x)/i,qm=/[\s,\(]\S/,pi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},_c=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},$m=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Km=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Zm=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},jm=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Ed=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Td=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Jm=function(t,e,n){return t.style[e]=n},Qm=function(t,e,n){return t.style.setProperty(e,n)},t_=function(t,e,n){return t._gsap[e]=n},e_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},n_=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},i_=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},Re="transform",Tn=Re+"Origin",r_=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in Oi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=pi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ri(i,o)}):this.tfm[t]=a.x?a[t]:Ri(i,t),t===Tn&&(this.tfm.zOrigin=a.zOrigin);else return pi.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(Re)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Tn,e,"")),t=Re}(s||e)&&this.props.push(t,e,s[t])},bd=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},s_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Au,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=wu(),(!s||!s.isStart)&&!n[Re]&&(bd(n),i.zOrigin&&n[Tn]&&(n[Tn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},wd=function(t,e){var n={target:t,props:[],revert:s_,save:r_};return t._gsap||An.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Ad,gc=function(t,e){var n=Zi.createElementNS?Zi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Zi.createElement(t);return n&&n.style?n:Zi.createElement(t)},Bn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Au,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,zs(e)||e,1)||""},hh="O,Moz,ms,Ms,Webkit".split(","),zs=function(t,e,n){var i=e||Pr,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(hh[a]+t in s););return a<0?null:(a===3?"ms":a>=0?hh[a]:"")+t},vc=function(){Xm()&&window.document&&(lh=window,Zi=lh.document,ws=Zi.documentElement,Pr=gc("div")||{style:{}},gc("div"),Re=zs(Re),Tn=Re+"Origin",Pr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ad=!!zs("perspective"),wu=An.core.reverting,bu=1)},fh=function(t){var e=t.ownerSVGElement,n=gc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ws.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ws.removeChild(n),s},dh=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Rd=function(t){var e,n;try{e=t.getBBox()}catch{e=fh(t),n=1}return e&&(e.width||e.height)||n||(e=fh(t)),e&&!e.width&&!e.x&&!e.y?{x:+dh(t,["x","cx","x1"])||0,y:+dh(t,["y","cy","y1"])||0,width:0,height:0}:e},Cd=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Rd(t))},or=function(t,e){if(e){var n=t.style,i;e in Oi&&e!==Tn&&(e=Re),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Au,"-$1").toLowerCase())):n.removeAttribute(e)}},ji=function(t,e,n,i,s,a){var o=new En(t._pt,e,n,0,1,a?Td:Ed);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},ph={deg:1,rad:1,turn:1},a_={grid:1,flex:1},lr=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Pr.style,l=Ym.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=i==="px",d=i==="%",g,_,p,m;if(i===a||!s||ph[i]||ph[a])return s;if(a!=="px"&&!h&&(s=r(t,e,n,"px")),m=t.getCTM&&Cd(t),(d||a==="%")&&(Oi[e]||~e.indexOf("adius")))return g=m?t.getBBox()[l?"width":"height"]:t[u],Pe(d?s/g*f:s/100*g);if(o[l?"width":"height"]=f+(h?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Zi||!_.appendChild)&&(_=Zi.body),p=_._gsap,p&&d&&p.width&&l&&p.time===On.time&&!p.uncache)return Pe(s/p.width*f);if(d&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=f+i,g=t[u],M?t.style[e]=M:or(t,e)}else(d||a==="%")&&!a_[Bn(_,"display")]&&(o.position=Bn(t,"position")),_===t&&(o.position="static"),_.appendChild(Pr),g=Pr[u],_.removeChild(Pr),o.position="absolute";return l&&d&&(p=Fr(_),p.time=On.time,p.width=_[u]),Pe(h?g*s/f:g&&s?f/g*s:0)},Ri=function(t,e,n,i){var s;return bu||vc(),e in pi&&e!=="transform"&&(e=pi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Oi[e]&&e!=="transform"?(s=La(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:$o(Bn(t,Tn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=qo[e]&&qo[e](t,e,n)||Bn(t,e)||$f(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?lr(t,e,s,n)+n:s},o_=function(t,e,n,i){if(!n||n==="none"){var s=zs(e,t,1),a=s&&Bn(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=Bn(t,"borderTopColor"))}var o=new En(this._pt,t.style,e,0,1,Md),l=0,c=0,u,f,h,d,g,_,p,m,M,x,S,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Bn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Bn(t,e)||i,_?t.style[e]=_:or(t,e)),u=[n,i],dd(u),n=u[0],i=u[1],h=n.match(Ss)||[],A=i.match(Ss)||[],A.length){for(;f=Ss.exec(i);)p=f[0],M=i.substring(l,f.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),p!==(_=h[c++]||"")&&(d=parseFloat(_)||0,S=_.substr((d+"").length),p.charAt(1)==="="&&(p=bs(d,p)+S),m=parseFloat(p),x=p.substr((m+"").length),l=Ss.lastIndex-x.length,x||(x=x||zn.units[e]||S,l===i.length&&(i+=x,o.e+=x)),S!==x&&(d=lr(t,e,_,x)||0),o._pt={_next:o._pt,p:M||c===1?M:",",s:d,c:m-d,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?Td:Ed;return Gf.test(i)&&(o.e=0),this._pt=o,o},mh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},l_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=mh[n]||n,e[1]=mh[i]||i,e.join(" ")},c_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Oi[o]&&(l=1,o=o==="transformOrigin"?Tn:Re),or(n,o);l&&(or(n,Re),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",La(n,1),a.uncache=1,bd(i)))}},qo={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new En(t._pt,e,n,0,0,c_);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},Pa=[1,0,0,1,0,0],Pd={},Ld=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},_h=function(t){var e=Bn(t,Re);return Ld(e)?Pa:e.substr(7).match(Vf).map(Pe)},Ru=function(t,e){var n=t._gsap||Fr(t),i=t.style,s=_h(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Pa:s):(s===Pa&&!t.offsetParent&&t!==ws&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,ws.appendChild(t)),s=_h(t),l?i.display=l:or(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):ws.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},xc=function(t,e,n,i,s,a){var o=t._gsap,l=s||Ru(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,d=l[0],g=l[1],_=l[2],p=l[3],m=l[4],M=l[5],x=e.split(" "),S=parseFloat(x[0])||0,A=parseFloat(x[1])||0,w,T,R,y;n?l!==Pa&&(T=d*p-g*_)&&(R=S*(p/T)+A*(-_/T)+(_*M-p*m)/T,y=S*(-g/T)+A*(d/T)-(d*M-g*m)/T,S=R,A=y):(w=Rd(t),S=w.x+(~x[0].indexOf("%")?S/100*w.width:S),A=w.y+(~(x[1]||x[0]).indexOf("%")?A/100*w.height:A)),i||i!==!1&&o.smooth?(m=S-c,M=A-u,o.xOffset=f+(m*d+M*_)-m,o.yOffset=h+(m*g+M*p)-M):o.xOffset=o.yOffset=0,o.xOrigin=S,o.yOrigin=A,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Tn]="0px 0px",a&&(ji(a,o,"xOrigin",c,S),ji(a,o,"yOrigin",u,A),ji(a,o,"xOffset",f,o.xOffset),ji(a,o,"yOffset",h,o.yOffset)),t.setAttribute("data-svg-origin",S+" "+A)},La=function(t,e){var n=t._gsap||new md(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Bn(t,Tn)||"0",u,f,h,d,g,_,p,m,M,x,S,A,w,T,R,y,v,C,I,F,B,Y,H,G,k,it,L,lt,Ft,qt,$,tt;return u=f=h=_=p=m=M=x=S=0,d=g=1,n.svg=!!(t.getCTM&&Cd(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Re]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Re]!=="none"?l[Re]:"")),i.scale=i.rotate=i.translate="none"),T=Ru(t,n.svg),n.svg&&(n.uncache?(k=t.getBBox(),c=n.xOrigin-k.x+"px "+(n.yOrigin-k.y)+"px",G=""):G=!e&&t.getAttribute("data-svg-origin"),xc(t,G||c,!!G||n.originIsAbsolute,n.smooth!==!1,T)),A=n.xOrigin||0,w=n.yOrigin||0,T!==Pa&&(C=T[0],I=T[1],F=T[2],B=T[3],u=Y=T[4],f=H=T[5],T.length===6?(d=Math.sqrt(C*C+I*I),g=Math.sqrt(B*B+F*F),_=C||I?Jr(I,C)*Er:0,M=F||B?Jr(F,B)*Er+_:0,M&&(g*=Math.abs(Math.cos(M*As))),n.svg&&(u-=A-(A*C+w*F),f-=w-(A*I+w*B))):(tt=T[6],qt=T[7],L=T[8],lt=T[9],Ft=T[10],$=T[11],u=T[12],f=T[13],h=T[14],R=Jr(tt,Ft),p=R*Er,R&&(y=Math.cos(-R),v=Math.sin(-R),G=Y*y+L*v,k=H*y+lt*v,it=tt*y+Ft*v,L=Y*-v+L*y,lt=H*-v+lt*y,Ft=tt*-v+Ft*y,$=qt*-v+$*y,Y=G,H=k,tt=it),R=Jr(-F,Ft),m=R*Er,R&&(y=Math.cos(-R),v=Math.sin(-R),G=C*y-L*v,k=I*y-lt*v,it=F*y-Ft*v,$=B*v+$*y,C=G,I=k,F=it),R=Jr(I,C),_=R*Er,R&&(y=Math.cos(R),v=Math.sin(R),G=C*y+I*v,k=Y*y+H*v,I=I*y-C*v,H=H*y-Y*v,C=G,Y=k),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=Pe(Math.sqrt(C*C+I*I+F*F)),g=Pe(Math.sqrt(H*H+tt*tt)),R=Jr(Y,H),M=Math.abs(R)>2e-4?R*Er:0,S=$?1/($<0?-$:$):0),n.svg&&(G=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Ld(Bn(t,Re)),G&&t.setAttribute("transform",G))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=Pe(d),n.scaleY=Pe(g),n.rotation=Pe(_)+o,n.rotationX=Pe(p)+o,n.rotationY=Pe(m)+o,n.skewX=M+o,n.skewY=x+o,n.transformPerspective=S+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Tn]=$o(c)),n.xOffset=n.yOffset=0,n.force3D=zn.force3D,n.renderTransform=n.svg?h_:Ad?Dd:u_,n.uncache=0,n},$o=function(t){return(t=t.split(" "))[0]+" "+t[1]},bl=function(t,e,n){var i=rn(e);return Pe(parseFloat(e)+parseFloat(lr(t,"x",n+"px",i)))+i},u_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Dd(t,e)},mr="0deg",$s="0px",_r=") ",Dd=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,M=n.target,x=n.zOrigin,S="",A=m==="auto"&&t&&t!==1||m===!0;if(x&&(f!==mr||u!==mr)){var w=parseFloat(u)*As,T=Math.sin(w),R=Math.cos(w),y;w=parseFloat(f)*As,y=Math.cos(w),a=bl(M,a,T*y*-x),o=bl(M,o,-Math.sin(w)*-x),l=bl(M,l,R*y*-x+x)}p!==$s&&(S+="perspective("+p+_r),(i||s)&&(S+="translate("+i+"%, "+s+"%) "),(A||a!==$s||o!==$s||l!==$s)&&(S+=l!==$s||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+_r),c!==mr&&(S+="rotate("+c+_r),u!==mr&&(S+="rotateY("+u+_r),f!==mr&&(S+="rotateX("+f+_r),(h!==mr||d!==mr)&&(S+="skew("+h+", "+d+_r),(g!==1||_!==1)&&(S+="scale("+g+", "+_+_r),M.style[Re]=S||"translate(0, 0)"},h_=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,M=n.forceCSS,x=parseFloat(a),S=parseFloat(o),A,w,T,R,y;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=As,c*=As,A=Math.cos(l)*f,w=Math.sin(l)*f,T=Math.sin(l-c)*-h,R=Math.cos(l-c)*h,c&&(u*=As,y=Math.tan(c-u),y=Math.sqrt(1+y*y),T*=y,R*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),A*=y,w*=y)),A=Pe(A),w=Pe(w),T=Pe(T),R=Pe(R)):(A=f,R=h,w=T=0),(x&&!~(a+"").indexOf("px")||S&&!~(o+"").indexOf("px"))&&(x=lr(d,"x",a,"px"),S=lr(d,"y",o,"px")),(g||_||p||m)&&(x=Pe(x+g-(g*A+_*T)+p),S=Pe(S+_-(g*w+_*R)+m)),(i||s)&&(y=d.getBBox(),x=Pe(x+i/100*y.width),S=Pe(S+s/100*y.height)),y="matrix("+A+","+w+","+T+","+R+","+x+","+S+")",d.setAttribute("transform",y),M&&(d.style[Re]=y)},f_=function(t,e,n,i,s){var a=360,o=Ke(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Er:1),c=l-i,u=i+c+"deg",f,h;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*uh)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*uh)%a-~~(c/a)*a)),t._pt=h=new En(t._pt,e,n,i,c,$m),h.e=u,h.u="deg",t._props.push(n),h},gh=function(t,e){for(var n in e)t[n]=e[n];return t},d_=function(t,e,n){var i=gh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,f,h,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Re]=e,o=La(n,1),or(n,Re),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Re],a[Re]=e,o=La(n,1),a[Re]=c);for(l in Oi)c=i[l],u=o[l],c!==u&&s.indexOf(l)<0&&(d=rn(c),g=rn(u),f=d!==g?lr(n,l,c,g):parseFloat(c),h=parseFloat(u),t._pt=new En(t._pt,o,l,f,h-f,_c),t._pt.u=g||0,t._props.push(l));gh(o,i)};yn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});qo[t>1?"border"+r:r]=function(o,l,c,u,f){var h,d;if(arguments.length<4)return h=a.map(function(g){return Ri(o,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},a.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),o.init(l,d,f)}});var Id={name:"css",register:vc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,l=n.vars.startAt,c,u,f,h,d,g,_,p,m,M,x,S,A,w,T,R,y;bu||vc(),this.styles=this.styles||wd(t),R=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(Un[_]&&_d(_,e,n,i,t,s)))){if(d=typeof u,g=qo[_],d==="function"&&(u=u.call(n,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=wa(u)),g)g(this,t,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",er.lastIndex=0,er.test(c)||(p=rn(c),m=rn(u),m?p!==m&&(c=lr(t,_,c,m)+m):p&&(u+=p)),this.add(o,"setProperty",c,u,i,s,0,0,_),a.push(_),R.push(_,0,o[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,s):l[_],Ke(c)&&~c.indexOf("random(")&&(c=wa(c)),rn(c+"")||c==="auto"||(c+=zn.units[_]||rn(Ri(t,_))||""),(c+"").charAt(1)==="="&&(c=Ri(t,_))):c=Ri(t,_),h=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),f=parseFloat(u),_ in pi&&(_==="autoAlpha"&&(h===1&&Ri(t,"visibility")==="hidden"&&f&&(h=0),R.push("visibility",0,o.visibility),ji(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=pi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),x=_ in Oi,x){if(this.styles.save(_),y=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Bn(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var v=t.style.perspective;t.style.perspective=u,u=Bn(t,"perspective"),v?t.style.perspective=v:or(t,"perspective")}f=parseFloat(u)}if(S||(A=t._gsap,A.renderTransform&&!e.parseTransform||La(t,e.parseTransform),w=e.smoothOrigin!==!1&&A.smooth,S=this._pt=new En(this._pt,o,Re,0,1,A.renderTransform,A,0,-1),S.dep=1),_==="scale")this._pt=new En(this._pt,A,"scaleY",A.scaleY,(M?bs(A.scaleY,M+f):f)-A.scaleY||0,_c),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Tn,0,o[Tn]),u=l_(u),A.svg?xc(t,u,0,w,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==A.zOrigin&&ji(this,A,"zOrigin",A.zOrigin,m),ji(this,o,_,$o(c),$o(u)));continue}else if(_==="svgOrigin"){xc(t,u,1,w,0,this);continue}else if(_ in Pd){f_(this,A,_,h,M?bs(h,M+u):u);continue}else if(_==="smoothOrigin"){ji(this,A,"smooth",A.smooth,u);continue}else if(_==="force3D"){A[_]=u;continue}else if(_==="transform"){d_(this,u,t);continue}}else _ in o||(_=zs(_)||_);if(x||(f||f===0)&&(h||h===0)&&!qm.test(u)&&_ in o)p=(c+"").substr((h+"").length),f||(f=0),m=rn(u)||(_ in zn.units?zn.units[_]:p),p!==m&&(h=lr(t,_,c,m)),this._pt=new En(this._pt,x?A:o,_,h,(M?bs(h,M+f):f)-h,!x&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?jm:_c),this._pt.u=m||0,x&&y!==u?(this._pt.b=c,this._pt.e=y,this._pt.r=Zm):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=Km);else if(_ in o)o_.call(this,t,_,c,M?M+u:u);else if(_ in t)this.add(t,_,c||t[_],M?M+u:u,i,s);else if(_!=="parseTransform"){mu(_,u);continue}x||(_ in o?R.push(_,0,o[_]):typeof t[_]=="function"?R.push(_,2,t[_]()):R.push(_,1,c||t[_])),a.push(_)}}T&&Sd(this)},render:function(t,e){if(e.tween._time||!wu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ri,aliases:pi,getSetter:function(t,e,n){var i=pi[e];return i&&i.indexOf(",")<0&&(e=i),e in Oi&&e!==Tn&&(t._gsap.x||Ri(t,"x"))?n&&ch===n?e==="scale"?e_:t_:(ch=n||{})&&(e==="scale"?n_:i_):t.style&&!fu(t.style[e])?Jm:~e.indexOf("-")?Qm:Eu(t,e)},core:{_removeProperty:or,_getMatrix:Ru}};An.utils.checkPrefix=zs;An.core.getStyleSaver=wd;(function(r,t,e,n){var i=yn(r+","+t+","+e,function(s){Oi[s]=1});yn(t,function(s){zn.units[s]="deg",Pd[s]=1}),pi[i[13]]=r+","+t,yn(n,function(s){var a=s.split(":");pi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");yn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){zn.units[r]="px"});An.registerPlugin(Id);var Be=An.registerPlugin(Id)||An;Be.core.Tween;function p_(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function m_(r,t,e){return t&&p_(r.prototype,t),r}/*!
 * Observer 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var je,Ro,Mn,Ji,Qi,Rs,Ud,Tr,Cs,Nd,Li,ii,Od,Fd=function(){return je||typeof window<"u"&&(je=window.gsap)&&je.registerPlugin&&je},Bd=1,Es=[],Qt=[],gi=[],pa=Date.now,Mc=function(t,e){return e},__=function(){var t=Cs.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,Qt),i.push.apply(i,gi),Qt=n,gi=i,Mc=function(a,o){return e[a](o)}},nr=function(t,e){return~gi.indexOf(t)&&gi[gi.indexOf(t)+1][e]},ma=function(t){return!!~Nd.indexOf(t)},un=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},cn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Ga="scrollLeft",Wa="scrollTop",Sc=function(){return Li&&Li.isPressed||Qt.cache++},Ko=function(t,e){var n=function i(s){if(s||s===0){Bd&&Mn.history.scrollRestoration!=="manual"&&(Mn.history.scrollRestoration="manual");var a=Li&&Li.isPressed;s=i.v=Math.round(s)||(Li&&Li.iOS?1:0),t(s),i.cacheID=Qt.cache,a&&Mc("ss",s)}else(e||Qt.cache!==i.cacheID||Mc("ref"))&&(i.cacheID=Qt.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},mn={s:Ga,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Ko(function(r){return arguments.length?Mn.scrollTo(r,Ve.sc()):Mn.pageXOffset||Ji[Ga]||Qi[Ga]||Rs[Ga]||0})},Ve={s:Wa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:mn,sc:Ko(function(r){return arguments.length?Mn.scrollTo(mn.sc(),r):Mn.pageYOffset||Ji[Wa]||Qi[Wa]||Rs[Wa]||0})},gn=function(t,e){return(e&&e._ctx&&e._ctx.selector||je.utils.toArray)(t)[0]||(typeof t=="string"&&je.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},g_=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},cr=function(t,e){var n=e.s,i=e.sc;ma(t)&&(t=Ji.scrollingElement||Qi);var s=Qt.indexOf(t),a=i===Ve.sc?1:2;!~s&&(s=Qt.push(t)-1),Qt[s+a]||un(t,"scroll",Sc);var o=Qt[s+a],l=o||(Qt[s+a]=Ko(nr(t,n),!0)||(ma(t)?i:Ko(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,o||(l.smooth=je.getProperty(t,"scrollBehavior")==="smooth"),l},yc=function(t,e,n){var i=t,s=t,a=pa(),o=a,l=e||50,c=Math.max(500,l*3),u=function(g,_){var p=pa();_||p-a>l?(s=i,i=g,o=a,a=p):n?i+=g:i=s+(g-s)/(p-o)*(a-o)},f=function(){s=i=n?0:i,o=a=0},h=function(g){var _=o,p=s,m=pa();return(g||g===0)&&g!==i&&u(g),a===o||m-o>c?0:(i+(n?p:-p))/((n?m:a)-_)*1e3};return{update:u,reset:f,getVelocity:h}},Ks=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},vh=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},zd=function(){Cs=je.core.globals().ScrollTrigger,Cs&&Cs.core&&__()},kd=function(t){return je=t||Fd(),!Ro&&je&&typeof document<"u"&&document.body&&(Mn=window,Ji=document,Qi=Ji.documentElement,Rs=Ji.body,Nd=[Mn,Ji,Qi,Rs],je.utils.clamp,Od=je.core.context||function(){},Tr="onpointerenter"in Rs?"pointer":"mouse",Ud=De.isTouch=Mn.matchMedia&&Mn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Mn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ii=De.eventTypes=("ontouchstart"in Qi?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Qi?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Bd=0},500),Ro=1),Cs||zd(),Ro};mn.op=Ve;Qt.cache=0;var De=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){Ro||kd(je)||console.warn("Please gsap.registerPlugin(Observer)"),Cs||zd();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,p=n.onDragStart,m=n.onDragEnd,M=n.onDrag,x=n.onPress,S=n.onRelease,A=n.onRight,w=n.onLeft,T=n.onUp,R=n.onDown,y=n.onChangeX,v=n.onChangeY,C=n.onChange,I=n.onToggleX,F=n.onToggleY,B=n.onHover,Y=n.onHoverEnd,H=n.onMove,G=n.ignoreCheck,k=n.isNormalizer,it=n.onGestureStart,L=n.onGestureEnd,lt=n.onWheel,Ft=n.onEnable,qt=n.onDisable,$=n.onClick,tt=n.scrollSpeed,ut=n.capture,ot=n.allowClicks,bt=n.lockAxis,Rt=n.onLockAxis;this.target=o=gn(o)||Qi,this.vars=n,d&&(d=je.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,tt=tt||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Mn.getComputedStyle(Rs).lineHeight)||22);var Vt,Zt,D,Lt,Nt,Xt,gt,W=this,wt=0,Ot=0,P=n.passive||!u&&n.passive!==!1,E=cr(o,mn),q=cr(o,Ve),Q=E(),nt=q(),Z=~a.indexOf("touch")&&!~a.indexOf("pointer")&&ii[0]==="pointerdown",Et=ma(o),rt=o.ownerDocument||Ji,dt=[0,0,0],It=[0,0,0],st=0,_t=function(){return st=pa()},Ct=function(yt,se){return(W.event=yt)&&d&&g_(yt.target,d)||se&&Z&&yt.pointerType!=="touch"||G&&G(yt,se)},Bt=function(){W._vx.reset(),W._vy.reset(),Zt.pause(),f&&f(W)},mt=function(){var yt=W.deltaX=vh(dt),se=W.deltaY=vh(It),ct=Math.abs(yt)>=i,kt=Math.abs(se)>=i;C&&(ct||kt)&&C(W,yt,se,dt,It),ct&&(A&&W.deltaX>0&&A(W),w&&W.deltaX<0&&w(W),y&&y(W),I&&W.deltaX<0!=wt<0&&I(W),wt=W.deltaX,dt[0]=dt[1]=dt[2]=0),kt&&(R&&W.deltaY>0&&R(W),T&&W.deltaY<0&&T(W),v&&v(W),F&&W.deltaY<0!=Ot<0&&F(W),Ot=W.deltaY,It[0]=It[1]=It[2]=0),(Lt||D)&&(H&&H(W),D&&(p&&D===1&&p(W),M&&M(W),D=0),Lt=!1),Xt&&!(Xt=!1)&&Rt&&Rt(W),Nt&&(lt(W),Nt=!1),Vt=0},zt=function(yt,se,ct){dt[ct]+=yt,It[ct]+=se,W._vx.update(yt),W._vy.update(se),c?Vt||(Vt=requestAnimationFrame(mt)):mt()},Gt=function(yt,se){bt&&!gt&&(W.axis=gt=Math.abs(yt)>Math.abs(se)?"x":"y",Xt=!0),gt!=="y"&&(dt[2]+=yt,W._vx.update(yt,!0)),gt!=="x"&&(It[2]+=se,W._vy.update(se,!0)),c?Vt||(Vt=requestAnimationFrame(mt)):mt()},le=function(yt){if(!Ct(yt,1)){yt=Ks(yt,u);var se=yt.clientX,ct=yt.clientY,kt=se-W.x,Pt=ct-W.y,Ht=W.isDragging;W.x=se,W.y=ct,(Ht||(kt||Pt)&&(Math.abs(W.startX-se)>=s||Math.abs(W.startY-ct)>=s))&&(D||(D=Ht?2:1),Ht||(W.isDragging=!0),Gt(kt,Pt))}},N=W.onPress=function(Ut){Ct(Ut,1)||Ut&&Ut.button||(W.axis=gt=null,Zt.pause(),W.isPressed=!0,Ut=Ks(Ut),wt=Ot=0,W.startX=W.x=Ut.clientX,W.startY=W.y=Ut.clientY,W._vx.reset(),W._vy.reset(),un(k?o:rt,ii[1],le,P,!0),W.deltaX=W.deltaY=0,x&&x(W))},K=W.onRelease=function(Ut){if(!Ct(Ut,1)){cn(k?o:rt,ii[1],le,!0);var yt=!isNaN(W.y-W.startY),se=W.isDragging,ct=se&&(Math.abs(W.x-W.startX)>3||Math.abs(W.y-W.startY)>3),kt=Ks(Ut);!ct&&yt&&(W._vx.reset(),W._vy.reset(),u&&ot&&je.delayedCall(.08,function(){if(pa()-st>300&&!Ut.defaultPrevented){if(Ut.target.click)Ut.target.click();else if(rt.createEvent){var Pt=rt.createEvent("MouseEvents");Pt.initMouseEvent("click",!0,!0,Mn,1,kt.screenX,kt.screenY,kt.clientX,kt.clientY,!1,!1,!1,!1,0,null),Ut.target.dispatchEvent(Pt)}}})),W.isDragging=W.isGesturing=W.isPressed=!1,f&&se&&!k&&Zt.restart(!0),D&&mt(),m&&se&&m(W),S&&S(W,ct)}},j=function(yt){return yt.touches&&yt.touches.length>1&&(W.isGesturing=!0)&&it(yt,W.isDragging)},J=function(){return(W.isGesturing=!1)||L(W)},at=function(yt){if(!Ct(yt)){var se=E(),ct=q();zt((se-Q)*tt,(ct-nt)*tt,1),Q=se,nt=ct,f&&Zt.restart(!0)}},Tt=function(yt){if(!Ct(yt)){yt=Ks(yt,u),lt&&(Nt=!0);var se=(yt.deltaMode===1?l:yt.deltaMode===2?Mn.innerHeight:1)*g;zt(yt.deltaX*se,yt.deltaY*se,0),f&&!k&&Zt.restart(!0)}},Yt=function(yt){if(!Ct(yt)){var se=yt.clientX,ct=yt.clientY,kt=se-W.x,Pt=ct-W.y;W.x=se,W.y=ct,Lt=!0,f&&Zt.restart(!0),(kt||Pt)&&Gt(kt,Pt)}},ge=function(yt){W.event=yt,B(W)},ve=function(yt){W.event=yt,Y(W)},ne=function(yt){return Ct(yt)||Ks(yt,u)&&$(W)};Zt=W._dc=je.delayedCall(h||.25,Bt).pause(),W.deltaX=W.deltaY=0,W._vx=yc(0,50,!0),W._vy=yc(0,50,!0),W.scrollX=E,W.scrollY=q,W.isDragging=W.isGesturing=W.isPressed=!1,Od(this),W.enable=function(Ut){return W.isEnabled||(un(Et?rt:o,"scroll",Sc),a.indexOf("scroll")>=0&&un(Et?rt:o,"scroll",at,P,ut),a.indexOf("wheel")>=0&&un(o,"wheel",Tt,P,ut),(a.indexOf("touch")>=0&&Ud||a.indexOf("pointer")>=0)&&(un(o,ii[0],N,P,ut),un(rt,ii[2],K),un(rt,ii[3],K),ot&&un(o,"click",_t,!0,!0),$&&un(o,"click",ne),it&&un(rt,"gesturestart",j),L&&un(rt,"gestureend",J),B&&un(o,Tr+"enter",ge),Y&&un(o,Tr+"leave",ve),H&&un(o,Tr+"move",Yt)),W.isEnabled=!0,W.isDragging=W.isGesturing=W.isPressed=Lt=D=!1,W._vx.reset(),W._vy.reset(),Q=E(),nt=q(),Ut&&Ut.type&&N(Ut),Ft&&Ft(W)),W},W.disable=function(){W.isEnabled&&(Es.filter(function(Ut){return Ut!==W&&ma(Ut.target)}).length||cn(Et?rt:o,"scroll",Sc),W.isPressed&&(W._vx.reset(),W._vy.reset(),cn(k?o:rt,ii[1],le,!0)),cn(Et?rt:o,"scroll",at,ut),cn(o,"wheel",Tt,ut),cn(o,ii[0],N,ut),cn(rt,ii[2],K),cn(rt,ii[3],K),cn(o,"click",_t,!0),cn(o,"click",ne),cn(rt,"gesturestart",j),cn(rt,"gestureend",J),cn(o,Tr+"enter",ge),cn(o,Tr+"leave",ve),cn(o,Tr+"move",Yt),W.isEnabled=W.isPressed=W.isDragging=!1,qt&&qt(W))},W.kill=W.revert=function(){W.disable();var Ut=Es.indexOf(W);Ut>=0&&Es.splice(Ut,1),Li===W&&(Li=0)},Es.push(W),k&&ma(o)&&(Li=W),W.enable(_)},m_(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();De.version="3.15.1";De.create=function(r){return new De(r)};De.register=kd;De.getAll=function(){return Es.slice()};De.getById=function(r){return Es.filter(function(t){return t.vars.id===r})[0]};Fd()&&je.registerPlugin(De);/*!
 * ScrollTrigger 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Mt,xs,Jt,de,Nn,he,Cu,Zo,Da,_a,ra,Xa,en,ll,Ec,dn,xh,Mh,Ms,Hd,wl,Vd,fn,Tc,Gd,Wd,qi,bc,Pu,Ps,Lu,ir,wc,Al,Ya=1,nn=Date.now,Rl=nn(),Jn=0,sa=0,Sh=function(t,e,n){var i=In(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},yh=function(t,e){return e&&(!In(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},v_=function r(){return sa&&requestAnimationFrame(r)},Eh=function(){return ll=1},Th=function(){return ll=0},li=function(t){return t},aa=function(t){return Math.round(t*1e5)/1e5||0},Xd=function(){return typeof window<"u"},Yd=function(){return Mt||Xd()&&(Mt=window.gsap)&&Mt.registerPlugin&&Mt},Wr=function(t){return!!~Cu.indexOf(t)},qd=function(t){return(t==="Height"?Lu:Jt["inner"+t])||Nn["client"+t]||he["client"+t]},$d=function(t){return nr(t,"getBoundingClientRect")||(Wr(t)?function(){return Io.width=Jt.innerWidth,Io.height=Lu,Io}:function(){return Ci(t)})},x_=function(t,e,n){var i=n.d,s=n.d2,a=n.a;return(a=nr(t,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(e?qd(s):t["client"+s])||0}},M_=function(t,e){return!e||~gi.indexOf(t)?$d(t):function(){return Io}},mi=function(t,e){var n=e.s,i=e.d2,s=e.d,a=e.a;return Math.max(0,(n="scroll"+i)&&(a=nr(t,n))?a()-$d(t)()[s]:Wr(t)?(Nn[n]||he[n])-qd(i):t[n]-t["offset"+i])},qa=function(t,e){for(var n=0;n<Ms.length;n+=3)(!e||~e.indexOf(Ms[n+1]))&&t(Ms[n],Ms[n+1],Ms[n+2])},In=function(t){return typeof t=="string"},sn=function(t){return typeof t=="function"},oa=function(t){return typeof t=="number"},br=function(t){return typeof t=="object"},Zs=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Qr=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},ts=Math.abs,Kd="left",Zd="top",Du="right",Iu="bottom",Hr="width",Vr="height",ga="Right",va="Left",xa="Top",Ma="Bottom",Oe="padding",Yn="margin",ks="Width",Uu="Height",He="px",qn=function(t){return Jt.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},S_=function(t){var e=qn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},bh=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Ci=function(t,e){var n=e&&qn(t)[Ec]!=="matrix(1, 0, 0, 1, 0, 0)"&&Mt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},jo=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},jd=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},y_=function(t){return function(e){return Mt.utils.snap(jd(t),e)}},Nu=function(t){var e=Mt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return e(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=e(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:e(s<0?i-t:i+t)}},E_=function(t){return function(e,n){return Nu(jd(t))(e,n.direction)}},$a=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},$e=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},qe=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Ka=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},wh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Za={toggleActions:"play",anticipatePin:0},Jo={top:0,left:0,center:.5,bottom:1,right:1},Co=function(t,e){if(In(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in Jo?Jo[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},ja=function(t,e,n,i,s,a,o,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=de.createElement("div"),_=Wr(n)||nr(n,"pinType")==="fixed",p=t.indexOf("scroller")!==-1,m=_?he:n.tagName==="IFRAME"?n.contentDocument.body:n,M=t.indexOf("start")!==-1,x=M?c:u,S="border-color:"+x+";font-size:"+f+";color:"+x+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return S+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(S+=(i===Ve?Du:Iu)+":"+(a+parseFloat(h))+"px;"),o&&(S+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=S,g.innerText=e||e===0?t+"-"+e:t,m.children[0]?m.insertBefore(g,m.children[0]):m.appendChild(g),g._offset=g["offset"+i.op.d2],Po(g,0,i,M),g},Po=function(t,e,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+ks]=1,s["border"+o+ks]=0,s[n.p]=e+"px",Mt.set(t,s)},jt=[],Ac={},Ia,Ah=function(){return nn()-Jn>34&&(Ia||(Ia=requestAnimationFrame(Ui)))},es=function(){(!fn||!fn.isPressed||fn.startX>he.clientWidth)&&(Qt.cache++,fn?Ia||(Ia=requestAnimationFrame(Ui)):Ui(),Jn||Yr("scrollStart"),Jn=nn())},Cl=function(){Wd=Jt.innerWidth,Gd=Jt.innerHeight},la=function(t){Qt.cache++,(t===!0||!en&&!Vd&&!de.fullscreenElement&&!de.webkitFullscreenElement&&(!Tc||Wd!==Jt.innerWidth||Math.abs(Jt.innerHeight-Gd)>Jt.innerHeight*.25))&&Zo.restart(!0)},Xr={},T_=[],Jd=function r(){return qe(Wt,"scrollEnd",r)||Lr(!0)},Yr=function(t){return Xr[t]&&Xr[t].map(function(e){return e()})||T_},Dn=[],Qd=function(t){for(var e=0;e<Dn.length;e+=5)(!t||Dn[e+4]&&Dn[e+4].query===t)&&(Dn[e].style.cssText=Dn[e+1],Dn[e].getBBox&&Dn[e].setAttribute("transform",Dn[e+2]||""),Dn[e+3].uncache=1)},tp=function(){Qt.cache++,Qt.forEach(function(t){return sn(t)&&(t.rec=t())})},Ou=function(t,e){var n;for(dn=0;dn<jt.length;dn++)n=jt[dn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));ir=!0,e&&Qd(e),e||Yr("revert")},ep=function(t,e){Qt.cache++,(e||!pn)&&Qt.forEach(function(n){return sn(n)&&n.cacheID++&&(n.rec=0)}),In(t)&&(Pu=t,Jt.history.scrollRestoration!==t&&(Jt.history.scrollRestoration=t))},pn,Gr=0,Rh,b_=function(){if(Rh!==Gr){var t=Rh=Gr;requestAnimationFrame(function(){return t===Gr&&Lr(!0)})}},np=function(){he.appendChild(Ps),Lu=!fn&&Ps.offsetHeight||Jt.innerHeight,he.removeChild(Ps)},Ch=function(t){return Da(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Lr=function(t,e){if(Nn=de.documentElement,he=de.body,Cu=[Jt,de,Nn,he],Jn&&!t&&!ir){$e(Wt,"scrollEnd",Jd);return}np(),pn=Wt.isRefreshing=!0,ir||tp();var n=Yr("refreshInit");Hd&&Wt.sort(),e||Ou(),Qt.forEach(function(i){sn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),jt.slice(0).forEach(function(i){return i.refresh()}),ir=!1,jt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),wc=1,Ch(!0),jt.forEach(function(i){var s=mi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),Ch(!1),wc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Qt.forEach(function(i){sn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),ep(Pu,1),Zo.pause(),Gr++,pn=2,Ui(2),jt.forEach(function(i){return sn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),pn=Wt.isRefreshing=!1,Yr("refresh")},Rc=0,Lo=1,Sa,Ui=function(t){if(t===2||!pn&&!ir){Wt.isUpdating=!0,Sa&&Sa.update(0);var e=jt.length,n=nn(),i=n-Rl>=50,s=e&&jt[0].scroll();if(Lo=Rc>s?-1:1,pn||(Rc=s),i&&(Jn&&!ll&&n-Jn>200&&(Jn=0,Yr("scrollEnd")),ra=Rl,Rl=n),Lo<0){for(dn=e;dn-- >0;)jt[dn]&&jt[dn].update(0,i);Lo=1}else for(dn=0;dn<e;dn++)jt[dn]&&jt[dn].update(0,i);Wt.isUpdating=!1}Ia=0},Cc=[Kd,Zd,Iu,Du,Yn+Ma,Yn+ga,Yn+xa,Yn+va,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Do=Cc.concat([Hr,Vr,"boxSizing","max"+ks,"max"+Uu,"position",Yn,Oe,Oe+xa,Oe+ga,Oe+Ma,Oe+va]),w_=function(t,e,n){Ls(n);var i=t._gsap;if(i.spacerIsNative)Ls(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Pl=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=Cc.length,a=e.style,o=t.style,l;s--;)l=Cc[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[Iu]=o[Du]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Hr]=jo(t,mn)+He,a[Vr]=jo(t,Ve)+He,a[Oe]=o[Yn]=o[Zd]=o[Kd]="0",Ls(i),o[Hr]=o["max"+ks]=n[Hr],o[Vr]=o["max"+Uu]=n[Vr],o[Oe]=n[Oe],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},A_=/([A-Z])/g,Ls=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,a;for((t.t._gsap||Mt.core.getCache(t.t)).uncache=1;i<n;i+=2)a=t[i+1],s=t[i],a?e[s]=a:e[s]&&e.removeProperty(s.replace(A_,"-$1").toLowerCase())}},Ja=function(t){for(var e=Do.length,n=t.style,i=[],s=0;s<e;s++)i.push(Do[s],n[Do[s]]);return i.t=t,i},R_=function(t,e,n){for(var i=[],s=t.length,a=n?8:0,o;a<s;a+=2)o=t[a],i.push(o,o in e?e[o]:t[a+1]);return i.t=t.t,i},Io={left:0,top:0},Ph=function(t,e,n,i,s,a,o,l,c,u,f,h,d,g){sn(t)&&(t=t(l)),In(t)&&t.substr(0,3)==="max"&&(t=h+(t.charAt(4)==="="?Co("0"+t.substr(3),n):0));var _=d?d.time():0,p,m,M;if(d&&d.seek(0),isNaN(t)||(t=+t),oa(t))d&&(t=Mt.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,t)),o&&Po(o,n,i,!0);else{sn(e)&&(e=e(l));var x=(t||"0").split(" "),S,A,w,T;M=gn(e,l)||he,S=Ci(M)||{},(!S||!S.left&&!S.top)&&qn(M).display==="none"&&(T=M.style.display,M.style.display="block",S=Ci(M),T?M.style.display=T:M.style.removeProperty("display")),A=Co(x[0],S[i.d]),w=Co(x[1]||"0",n),t=S[i.p]-c[i.p]-u+A+s-w,o&&Po(o,w,i,n-w<20||o._isStart&&w>20),n-=n-w}if(g&&(l[g]=t||-.001,t<0&&(t=0)),a){var R=t+n,y=a._isStart;p="scroll"+i.d2,Po(a,R,i,y&&R>20||!y&&(f?Math.max(he[p],Nn[p]):a.parentNode[p])<=R+1),f&&(c=Ci(o),f&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+He))}return d&&M&&(p=Ci(M),d.seek(h),m=Ci(M),d._caScrollDist=p[i.p]-m[i.p],t=t/d._caScrollDist*h),d&&d.seek(_),d?t:Math.round(t)},C_=/(webkit|moz|length|cssText|inset)/i,Lh=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,a,o;if(e===he){t._stOrig=s.cssText,o=qn(t);for(a in o)!+a&&!C_.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=t._stOrig;Mt.core.getCache(t).uncache=1,e.appendChild(t)}},ip=function(t,e,n){var i=e,s=i;return function(a){var o=Math.round(t());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},Qa=function(t,e,n){var i={};i[e.p]="+="+n,Mt.set(t,i)},Dh=function(t,e){var n=cr(t,e),i="_scroll"+e.p2,s=function a(o,l,c,u,f){var h=a.tween,d=l.onComplete,g={};c=c||n();var _=ip(n,c,function(){h.kill(),a.tween=0});return f=u&&f||0,u=u||o-c,h&&h.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){Qt.cache++,a.tween&&Ui()},l.onComplete=function(){a.tween=0,d&&d.call(h)},h=a.tween=Mt.to(t,l),h};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},$e(t,"wheel",n.wheelHandler),Wt.isTouch&&$e(t,"touchmove",n.wheelHandler),s},Wt=function(){function r(e,n){xs||r.register(Mt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),bc(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!sa){this.update=this.refresh=this.kill=li;return}n=bh(In(n)||oa(n)||n.nodeType?{trigger:n}:n,Za);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,M=s.onSnapComplete,x=s.once,S=s.snap,A=s.pinReparent,w=s.pinSpacer,T=s.containerAnimation,R=s.fastScrollEnd,y=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?mn:Ve,C=!f&&f!==0,I=gn(n.scroller||Jt),F=Mt.core.getCache(I),B=Wr(I),Y=("pinType"in n?n.pinType:nr(I,"pinType")||B&&"fixed")==="fixed",H=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],G=C&&n.toggleActions.split(" "),k="markers"in n?n.markers:Za.markers,it=B?0:parseFloat(qn(I)["border"+v.p2+ks])||0,L=this,lt=n.onRefreshInit&&function(){return n.onRefreshInit(L)},Ft=x_(I,B,v),qt=M_(I,B),$=0,tt=0,ut=0,ot=cr(I,v),bt,Rt,Vt,Zt,D,Lt,Nt,Xt,gt,W,wt,Ot,P,E,q,Q,nt,Z,Et,rt,dt,It,st,_t,Ct,Bt,mt,zt,Gt,le,N,K,j,J,at,Tt,Yt,ge,ve;if(L._startClamp=L._endClamp=!1,L._dir=v,p*=45,L.scroller=I,L.scroll=T?T.time.bind(T):ot,Zt=ot(),ir&&ot.rec==null&&(ot.rec=Zt),L.vars=n,i=i||n.animation,"refreshPriority"in n&&(Hd=1,n.refreshPriority===-9999&&(Sa=L)),F.tweenScroll=F.tweenScroll||{top:Dh(I,Ve),left:Dh(I,mn)},L.tweenTo=bt=F.tweenScroll[v.p],L.scrubDuration=function(ct){j=oa(ct)&&ct,j?K?K.duration(ct):K=Mt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:j,paused:!0,onComplete:function(){return m&&m(L)}}):(K&&K.progress(1).kill(),K=0)},i&&(i.vars.lazy=!1,i._initted&&!L.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),L.animation=i.pause(),i.scrollTrigger=L,L.scrubDuration(f),le=0,l||(l=i.vars.id)),S&&((!br(S)||S.push)&&(S={snapTo:S}),"scrollBehavior"in he.style&&Mt.set(B?[he,Nn]:I,{scrollBehavior:"auto"}),Qt.forEach(function(ct){return sn(ct)&&ct.target===(B?de.scrollingElement||Nn:I)&&(ct.smooth=!1)}),Vt=sn(S.snapTo)?S.snapTo:S.snapTo==="labels"?y_(i):S.snapTo==="labelsDirectional"?E_(i):S.directional!==!1?function(ct,kt){return Nu(S.snapTo)(ct,nn()-tt<500?0:kt.direction)}:Mt.utils.snap(S.snapTo),J=S.duration||{min:.1,max:2},J=br(J)?_a(J.min,J.max):_a(J,J),at=Mt.delayedCall(S.delay||j/2||.1,function(){var ct=ot(),kt=nn()-tt<500,Pt=bt.tween;if((kt||Math.abs(L.getVelocity())<10)&&!Pt&&!ll&&$!==ct){var Ht=(ct-Lt)/E,be=i&&!C?i.totalProgress():Ht,te=kt?0:(be-N)/(nn()-ra)*1e3||0,Me=Mt.utils.clamp(-Ht,1-Ht,ts(te/2)*te/.185),ze=Ht+(S.inertia===!1?0:Me),ye,Se,fe=S,Rn=fe.onStart,b=fe.onInterrupt,U=fe.onComplete;if(ye=Vt(ze,L),oa(ye)||(ye=ze),Se=Math.max(0,Math.round(Lt+ye*E)),ct<=Nt&&ct>=Lt&&Se!==ct){if(Pt&&!Pt._initted&&Pt.data<=ts(Se-ct))return;S.inertia===!1&&(Me=ye-Ht),bt(Se,{duration:J(ts(Math.max(ts(ze-be),ts(ye-be))*.185/te/.05||0)),ease:S.ease||"power3",data:ts(Se-ct),onInterrupt:function(){return at.restart(!0)&&b&&Qr(L,b)},onComplete:function(){L.update(),$=ot(),i&&!C&&(K?K.resetTo("totalProgress",ye,i._tTime/i._tDur):i.progress(ye)),le=N=i&&!C?i.totalProgress():L.progress,M&&M(L),U&&Qr(L,U)}},ct,Me*E,Se-ct-Me*E),Rn&&Qr(L,Rn,bt.tween)}}else L.isActive&&$!==ct&&at.restart(!0)}).pause()),l&&(Ac[l]=L),h=L.trigger=gn(h||d!==!0&&d),ve=h&&h._gsap&&h._gsap.stRevert,ve&&(ve=ve(L)),d=d===!0?h:gn(d),In(o)&&(o={targets:h,className:o}),d&&(g===!1||g===Yn||(g=!g&&d.parentNode&&d.parentNode.style&&qn(d.parentNode).display==="flex"?!1:Oe),L.pin=d,Rt=Mt.core.getCache(d),Rt.spacer?q=Rt.pinState:(w&&(w=gn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),Rt.spacerIsNative=!!w,w&&(Rt.spacerState=Ja(w))),Rt.spacer=Z=w||de.createElement("div"),Z.classList.add("pin-spacer"),l&&Z.classList.add("pin-spacer-"+l),Rt.pinState=q=Ja(d)),n.force3D!==!1&&Mt.set(d,{force3D:!0}),L.spacer=Z=Rt.spacer,Gt=qn(d),_t=Gt[g+v.os2],rt=Mt.getProperty(d),dt=Mt.quickSetter(d,v.a,He),Pl(d,Z,Gt),nt=Ja(d)),k){Ot=br(k)?bh(k,wh):wh,W=ja("scroller-start",l,I,v,Ot,0),wt=ja("scroller-end",l,I,v,Ot,0,W),Et=W["offset"+v.op.d2];var ne=gn(nr(I,"content")||I);Xt=this.markerStart=ja("start",l,ne,v,Ot,Et,0,T),gt=this.markerEnd=ja("end",l,ne,v,Ot,Et,0,T),T&&(ge=Mt.quickSetter([Xt,gt],v.a,He)),!Y&&!(gi.length&&nr(I,"fixedMarkers")===!0)&&(S_(B?he:I),Mt.set([W,wt],{force3D:!0}),Bt=Mt.quickSetter(W,v.a,He),zt=Mt.quickSetter(wt,v.a,He))}if(T){var Ut=T.vars.onUpdate,yt=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){L.update(0,0,1),Ut&&Ut.apply(T,yt||[])})}if(L.previous=function(){return jt[jt.indexOf(L)-1]},L.next=function(){return jt[jt.indexOf(L)+1]},L.revert=function(ct,kt){if(!kt)return L.kill(!0);var Pt=ct!==!1||!L.enabled,Ht=en;Pt!==L.isReverted&&(Pt&&(Tt=Math.max(ot(),L.scroll.rec||0),ut=L.progress,Yt=i&&i.progress()),Xt&&[Xt,gt,W,wt].forEach(function(be){return be.style.display=Pt?"none":"block"}),Pt&&(en=L,L.update(Pt)),d&&(!A||!L.isActive)&&(Pt?w_(d,Z,q):Pl(d,Z,qn(d),Ct)),Pt||L.update(Pt),en=Ht,L.isReverted=Pt)},L.refresh=function(ct,kt,Pt,Ht){if(!((en||!L.enabled)&&!kt)){if(d&&ct&&Jn){$e(r,"scrollEnd",Jd);return}!pn&&lt&&lt(L),en=L,bt.tween&&!Pt&&(bt.tween.kill(),bt.tween=0),K&&K.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(St){return St.vars.immediateRender&&St.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var be=Ft(),te=qt(),Me=T?T.duration():mi(I,v),ze=E<=.01||!E,ye=0,Se=Ht||0,fe=br(Pt)?Pt.end:n.end,Rn=n.endTrigger||h,b=br(Pt)?Pt.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),U=L.pinnedContainer=n.pinnedContainer&&gn(n.pinnedContainer,L),V=h&&Math.max(0,jt.indexOf(L))||0,z=V,O,et,ht,xt,ft,vt,At,Dt,ae,me,oe,ke,ie;for(k&&br(Pt)&&(ke=Mt.getProperty(W,v.p),ie=Mt.getProperty(wt,v.p));z-- >0;)vt=jt[z],vt.end||vt.refresh(0,1)||(en=L),At=vt.pin,At&&(At===h||At===d||At===U)&&!vt.isReverted&&(me||(me=[]),me.unshift(vt),vt.revert(!0,!0)),vt!==jt[z]&&(V--,z--);for(sn(b)&&(b=b(L)),b=Sh(b,"start",L),Lt=Ph(b,h,be,v,ot(),Xt,W,L,te,it,Y,Me,T,L._startClamp&&"_startClamp")||(d?-.001:0),sn(fe)&&(fe=fe(L)),In(fe)&&!fe.indexOf("+=")&&(~fe.indexOf(" ")?fe=(In(b)?b.split(" ")[0]:"")+fe:(ye=Co(fe.substr(2),be),fe=In(b)?b:(T?Mt.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,Lt):Lt)+ye,Rn=h)),fe=Sh(fe,"end",L),Nt=Math.max(Lt,Ph(fe||(Rn?"100% 0":Me),Rn,be,v,ot()+ye,gt,wt,L,te,it,Y,Me,T,L._endClamp&&"_endClamp"))||-.001,ye=0,z=V;z--;)vt=jt[z]||{},At=vt.pin,At&&vt.start-vt._pinPush<=Lt&&!T&&vt.end>0&&(O=vt.end-(L._startClamp?Math.max(0,vt.start):vt.start),(At===h&&vt.start-vt._pinPush<Lt||At===U)&&isNaN(b)&&(ye+=O*(1-vt.progress)),At===d&&(Se+=O));if(Lt+=ye,Nt+=ye,L._startClamp&&(L._startClamp+=ye),L._endClamp&&!pn&&(L._endClamp=Nt||-.001,Nt=Math.min(Nt,mi(I,v))),E=Nt-Lt||(Lt-=.01)&&.001,ze&&(ut=Mt.utils.clamp(0,1,Mt.utils.normalize(Lt,Nt,Tt))),L._pinPush=Se,Xt&&ye&&(O={},O[v.a]="+="+ye,U&&(O[v.p]="-="+ot()),Mt.set([Xt,gt],O)),d&&!(wc&&L.end>=mi(I,v)))O=qn(d),xt=v===Ve,ht=ot(),It=parseFloat(rt(v.a))+Se,!Me&&Nt>1&&(oe=(B?de.scrollingElement||Nn:I).style,oe={style:oe,value:oe["overflow"+v.a.toUpperCase()]},B&&qn(he)["overflow"+v.a.toUpperCase()]!=="scroll"&&(oe.style["overflow"+v.a.toUpperCase()]="scroll")),Pl(d,Z,O),nt=Ja(d),et=Ci(d,!0),Dt=Y&&cr(I,xt?mn:Ve)(),g?(Ct=[g+v.os2,E+Se+He],Ct.t=Z,z=g===Oe?jo(d,v)+E+Se:0,z&&(Ct.push(v.d,z+He),Z.style.flexBasis!=="auto"&&(Z.style.flexBasis=z+He)),Ls(Ct),U&&jt.forEach(function(St){St.pin===U&&St.vars.pinSpacing!==!1&&(St._subPinOffset=!0)}),Y&&ot(Tt)):(z=jo(d,v),z&&Z.style.flexBasis!=="auto"&&(Z.style.flexBasis=z+He)),Y&&(ft={top:et.top+(xt?ht-Lt:Dt)+He,left:et.left+(xt?Dt:ht-Lt)+He,boxSizing:"border-box",position:"fixed"},ft[Hr]=ft["max"+ks]=Math.ceil(et.width)+He,ft[Vr]=ft["max"+Uu]=Math.ceil(et.height)+He,ft[Yn]=ft[Yn+xa]=ft[Yn+ga]=ft[Yn+Ma]=ft[Yn+va]="0",ft[Oe]=O[Oe],ft[Oe+xa]=O[Oe+xa],ft[Oe+ga]=O[Oe+ga],ft[Oe+Ma]=O[Oe+Ma],ft[Oe+va]=O[Oe+va],Q=R_(q,ft,A),pn&&ot(0)),i?(ae=i._initted,wl(1),i.render(i.duration(),!0,!0),st=rt(v.a)-It+E+Se,mt=Math.abs(E-st)>1,Y&&mt&&Q.splice(Q.length-2,2),i.render(0,!0,!0),ae||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),wl(0)):st=E,oe&&(oe.value?oe.style["overflow"+v.a.toUpperCase()]=oe.value:oe.style.removeProperty("overflow-"+v.a));else if(h&&ot()&&!T)for(et=h.parentNode;et&&et!==he;)et._pinOffset&&(Lt-=et._pinOffset,Nt-=et._pinOffset),et=et.parentNode;me&&me.forEach(function(St){return St.revert(!1,!0)}),L.start=Lt,L.end=Nt,Zt=D=pn?Tt:ot(),!T&&!pn&&!ir&&(Zt<Tt&&ot(Tt),L.scroll.rec=0),L.revert(!1,!0),tt=nn(),at&&($=-1,at.restart(!0)),en=0,i&&C&&(i._initted||Yt)&&i.progress()!==Yt&&i.progress(Yt||0,!0).render(i.time(),!0,!0),(ze||ut!==L.progress||T||_||i&&!i._initted)&&(i&&!C&&(i._initted||ut||i.vars.immediateRender!==!1)&&i.totalProgress(T&&Lt<-.001&&!ut?Mt.utils.normalize(Lt,Nt,0):ut,!0),L.progress=ze||(Zt-Lt)/E===ut?0:ut),d&&g&&(Z._pinOffset=Math.round(L.progress*st)),K&&K.invalidate(),isNaN(ke)||(ke-=Mt.getProperty(W,v.p),ie-=Mt.getProperty(wt,v.p),Qa(W,v,ke),Qa(Xt,v,ke-(Ht||0)),Qa(wt,v,ie),Qa(gt,v,ie-(Ht||0))),ze&&!pn&&L.update(),u&&!pn&&!P&&(P=!0,u(L),P=!1)}},L.getVelocity=function(){return(ot()-D)/(nn()-ra)*1e3||0},L.endAnimation=function(){Zs(L.callbackAnimation),i&&(K?K.progress(1):i.paused()?C||Zs(i,L.direction<0,1):Zs(i,i.reversed()))},L.labelToScroll=function(ct){return i&&i.labels&&(Lt||L.refresh()||Lt)+i.labels[ct]/i.duration()*E||0},L.getTrailing=function(ct){var kt=jt.indexOf(L),Pt=L.direction>0?jt.slice(0,kt).reverse():jt.slice(kt+1);return(In(ct)?Pt.filter(function(Ht){return Ht.vars.preventOverlaps===ct}):Pt).filter(function(Ht){return L.direction>0?Ht.end<=Lt:Ht.start>=Nt})},L.update=function(ct,kt,Pt){if(!(T&&!Pt&&!ct)){var Ht=pn===!0?Tt:L.scroll(),be=ct?0:(Ht-Lt)/E,te=be<0?0:be>1?1:be||0,Me=L.progress,ze,ye,Se,fe,Rn,b,U,V;if(kt&&(D=Zt,Zt=T?ot():Ht,S&&(N=le,le=i&&!C?i.totalProgress():te)),p&&d&&!en&&!Ya&&Jn&&(!te&&Lt<Ht+(Ht-D)/(nn()-ra)*p?te=1e-4:te===1&&Nt>Ht+(Ht-D)/(nn()-ra)*p&&(te=.9999)),te!==Me&&L.enabled){if(ze=L.isActive=!!te&&te<1,ye=!!Me&&Me<1,b=ze!==ye,Rn=b||!!te!=!!Me,L.direction=te>Me?1:-1,L.progress=te,Rn&&!en&&(Se=te&&!Me?0:te===1?1:Me===1?2:3,C&&(fe=!b&&G[Se+1]!=="none"&&G[Se+1]||G[Se],V=i&&(fe==="complete"||fe==="reset"||fe in i))),y&&(b||V)&&(V||f||!i)&&(sn(y)?y(L):L.getTrailing(y).forEach(function(ht){return ht.endAnimation()})),C||(K&&!en&&!Ya?(K._dp._time-K._start!==K._time&&K.render(K._dp._time-K._start),K.resetTo?K.resetTo("totalProgress",te,i._tTime/i._tDur):(K.vars.totalProgress=te,K.invalidate().restart())):i&&i.totalProgress(te,!!(en&&(tt||ct)))),d){if(ct&&g&&(Z.style[g+v.os2]=_t),!Y)dt(aa(It+st*te));else if(Rn){if(U=!ct&&te>Me&&Nt+1>Ht&&Ht+1>=mi(I,v),A)if(!ct&&(ze||U)){var z=Ci(d,!0),O=Ht-Lt;Lh(d,he,z.top+(v===Ve?O:0)+He,z.left+(v===Ve?0:O)+He)}else Lh(d,Z);Ls(ze||U?Q:nt),mt&&te<1&&ze||dt(It+(te===1&&!U?st:0))}}S&&!bt.tween&&!en&&!Ya&&at.restart(!0),o&&(b||x&&te&&(te<1||!Al))&&Da(o.targets).forEach(function(ht){return ht.classList[ze||x?"add":"remove"](o.className)}),a&&!C&&!ct&&a(L),Rn&&!en?(C&&(V&&(fe==="complete"?i.pause().totalProgress(1):fe==="reset"?i.restart(!0).pause():fe==="restart"?i.restart(!0):i[fe]()),a&&a(L)),(b||!Al)&&(c&&b&&Qr(L,c),H[Se]&&Qr(L,H[Se]),x&&(te===1?L.kill(!1,1):H[Se]=0),b||(Se=te===1?1:3,H[Se]&&Qr(L,H[Se]))),R&&!ze&&Math.abs(L.getVelocity())>(oa(R)?R:2500)&&(Zs(L.callbackAnimation),K?K.progress(1):Zs(i,fe==="reverse"?1:!te,1))):C&&a&&!en&&a(L)}if(zt){var et=T?Ht/T.duration()*(T._caScrollDist||0):Ht;Bt(et+(W._isFlipped?1:0)),zt(et)}ge&&ge(-Ht/T.duration()*(T._caScrollDist||0))}},L.enable=function(ct,kt){L.enabled||(L.enabled=!0,$e(I,"resize",la),B||$e(I,"scroll",es),lt&&$e(r,"refreshInit",lt),ct!==!1&&(L.progress=ut=0,Zt=D=$=ot()),kt!==!1&&L.refresh())},L.getTween=function(ct){return ct&&bt?bt.tween:K},L.setPositions=function(ct,kt,Pt,Ht){if(T){var be=T.scrollTrigger,te=T.duration(),Me=be.end-be.start;ct=be.start+Me*ct/te,kt=be.start+Me*kt/te}L.refresh(!1,!1,{start:yh(ct,Pt&&!!L._startClamp),end:yh(kt,Pt&&!!L._endClamp)},Ht),L.update()},L.adjustPinSpacing=function(ct){if(Ct&&ct){var kt=Ct.indexOf(v.d)+1;Ct[kt]=parseFloat(Ct[kt])+ct+He,Ct[1]=parseFloat(Ct[1])+ct+He,Ls(Ct)}},L.disable=function(ct,kt){if(ct!==!1&&L.revert(!0,!0),L.enabled&&(L.enabled=L.isActive=!1,kt||K&&K.pause(),Tt=0,Rt&&(Rt.uncache=1),lt&&qe(r,"refreshInit",lt),at&&(at.pause(),bt.tween&&bt.tween.kill()&&(bt.tween=0)),!B)){for(var Pt=jt.length;Pt--;)if(jt[Pt].scroller===I&&jt[Pt]!==L)return;qe(I,"resize",la),B||qe(I,"scroll",es)}},L.kill=function(ct,kt){L.disable(ct,kt),K&&!kt&&K.kill(),l&&delete Ac[l];var Pt=jt.indexOf(L);Pt>=0&&jt.splice(Pt,1),Pt===dn&&Lo>0&&dn--,Pt=0,jt.forEach(function(Ht){return Ht.scroller===L.scroller&&(Pt=1)}),Pt||pn||ir||(L.scroll.rec=0),i&&(i.scrollTrigger=null,ct&&i.revert({kill:!1}),kt||i.kill()),Xt&&[Xt,gt,W,wt].forEach(function(Ht){return Ht.parentNode&&Ht.parentNode.removeChild(Ht)}),Sa===L&&(Sa=0),d&&(Rt&&(Rt.uncache=1),Pt=0,jt.forEach(function(Ht){return Ht.pin===d&&Pt++}),Pt||(Rt.spacer=0)),n.onKill&&n.onKill(L)},jt.push(L),L.enable(!1,!1),ve&&ve(L),i&&i.add&&!E){var se=L.update;L.update=function(){L.update=se,Qt.cache++,Lt||Nt||L.refresh()},Mt.delayedCall(.01,L.update),E=.01,Lt=Nt=0}else L.refresh();d&&b_()},r.register=function(n){return xs||(Mt=n||Yd(),Xd()&&window.document&&r.enable(),xs=sa),xs},r.defaults=function(n){if(n)for(var i in n)Za[i]=n[i];return Za},r.disable=function(n,i){sa=0,jt.forEach(function(a){return a[i?"kill":"disable"](n)}),qe(Jt,"wheel",es),qe(de,"scroll",es),clearInterval(Xa),qe(de,"touchcancel",li),qe(he,"touchstart",li),$a(qe,de,"pointerdown,touchstart,mousedown",Eh),$a(qe,de,"pointerup,touchend,mouseup",Th),Zo.kill(),qa(qe);for(var s=0;s<Qt.length;s+=3)Ka(qe,Qt[s],Qt[s+1]),Ka(qe,Qt[s],Qt[s+2])},r.enable=function(){if(Jt=window,de=document,Nn=de.documentElement,he=de.body,Mt){if(Da=Mt.utils.toArray,_a=Mt.utils.clamp,bc=Mt.core.context||li,wl=Mt.core.suppressOverwrites||li,Pu=Jt.history.scrollRestoration||"auto",Rc=Jt.pageYOffset||0,Mt.core.globals("ScrollTrigger",r),he){sa=1,Ps=document.createElement("div"),Ps.style.height="100vh",Ps.style.position="absolute",np(),v_(),De.register(Mt),r.isTouch=De.isTouch,qi=De.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Tc=De.isTouch===1,$e(Jt,"wheel",es),Cu=[Jt,de,Nn,he],Mt.matchMedia?(r.matchMedia=function(u){var f=Mt.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},Mt.addEventListener("matchMediaInit",function(){tp(),Ou()}),Mt.addEventListener("matchMediaRevert",function(){return Qd()}),Mt.addEventListener("matchMedia",function(){Lr(0,1),Yr("matchMedia")}),Mt.matchMedia().add("(orientation: portrait)",function(){return Cl(),Cl})):console.warn("Requires GSAP 3.11.0 or later"),Cl(),$e(de,"scroll",es);var n=he.hasAttribute("style"),i=he.style,s=i.borderTopStyle,a=Mt.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=Ci(he),Ve.m=Math.round(o.top+Ve.sc())||0,mn.m=Math.round(o.left+mn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(he.setAttribute("style",""),he.removeAttribute("style")),Xa=setInterval(Ah,250),Mt.delayedCall(.5,function(){return Ya=0}),$e(de,"touchcancel",li),$e(he,"touchstart",li),$a($e,de,"pointerdown,touchstart,mousedown",Eh),$a($e,de,"pointerup,touchend,mouseup",Th),Ec=Mt.utils.checkPrefix("transform"),Do.push(Ec),xs=nn(),Zo=Mt.delayedCall(.2,Lr).pause(),Ms=[de,"visibilitychange",function(){var u=Jt.innerWidth,f=Jt.innerHeight;de.hidden?(xh=u,Mh=f):(xh!==u||Mh!==f)&&la()},de,"DOMContentLoaded",Lr,Jt,"load",Lr,Jt,"resize",la],qa($e),jt.forEach(function(u){return u.enable(0,1)}),l=0;l<Qt.length;l+=3)Ka(qe,Qt[l],Qt[l+1]),Ka(qe,Qt[l],Qt[l+2])}else if(de){var c=function u(){r.enable(),de.removeEventListener("DOMContentLoaded",u)};de.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Al=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Xa)||(Xa=i)&&setInterval(Ah,i),"ignoreMobileResize"in n&&(Tc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(qa(qe)||qa($e,n.autoRefreshEvents||"none"),Vd=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=gn(n),a=Qt.indexOf(s),o=Wr(s);~a&&Qt.splice(a,o?6:2),i&&(o?gi.unshift(Jt,i,he,i,Nn,i):gi.unshift(s,i))},r.clearMatchMedia=function(n){jt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(In(n)?gn(n):n).getBoundingClientRect(),o=a[s?Hr:Vr]*i||0;return s?a.right-o>0&&a.left+o<Jt.innerWidth:a.bottom-o>0&&a.top+o<Jt.innerHeight},r.positionInViewport=function(n,i,s){In(n)&&(n=gn(n));var a=n.getBoundingClientRect(),o=a[s?Hr:Vr],l=i==null?o/2:i in Jo?Jo[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/Jt.innerWidth:(a.top+l)/Jt.innerHeight},r.killAll=function(n){if(jt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Xr.killAll||[];Xr={},i.forEach(function(s){return s()})}},r}();Wt.version="3.15.1";Wt.saveStyles=function(r){return r?Da(r).forEach(function(t){if(t&&t.style){var e=Dn.indexOf(t);e>=0&&Dn.splice(e,5),Dn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Mt.core.getCache(t),bc())}}):Dn};Wt.revert=function(r,t){return Ou(!r,t)};Wt.create=function(r,t){return new Wt(r,t)};Wt.refresh=function(r){return r?la(!0):(xs||Wt.register())&&Lr(!0)};Wt.update=function(r){return++Qt.cache&&Ui(r===!0?2:0)};Wt.clearScrollMemory=ep;Wt.maxScroll=function(r,t){return mi(r,t?mn:Ve)};Wt.getScrollFunc=function(r,t){return cr(gn(r),t?mn:Ve)};Wt.getById=function(r){return Ac[r]};Wt.getAll=function(){return jt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Wt.isScrolling=function(){return!!Jn};Wt.snapDirectional=Nu;Wt.addEventListener=function(r,t){var e=Xr[r]||(Xr[r]=[]);~e.indexOf(t)||e.push(t)};Wt.removeEventListener=function(r,t){var e=Xr[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};Wt.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,a=function(c,u){var f=[],h=[],d=Mt.delayedCall(i,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},o;for(o in t)n[o]=o.substr(0,2)==="on"&&sn(t[o])&&o!=="onRefreshInit"?a(o,t[o]):t[o];return sn(s)&&(s=s(),$e(Wt,"refresh",function(){return s=t.batchMax()})),Da(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,e.push(Wt.create(c))}),e};var Ih=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Ll=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(De.isTouch?" pinch-zoom":""):"none",t===Nn&&r(he,e)},to={auto:1,scroll:1},P_=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,a=s._gsap||Mt.core.getCache(s),o=nn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==he&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(to[(l=qn(s)).overflowY]||to[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Wr(s)&&(to[(l=qn(s)).overflowY]||to[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},rp=function(t,e,n,i){return De.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&P_,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&$e(de,De.eventTypes[0],Nh,!1,!0)},onDisable:function(){return qe(de,De.eventTypes[0],Nh,!0)}})},L_=/(input|label|select|textarea)/i,Uh,Nh=function(t){var e=L_.test(t.target.tagName);(e||Uh)&&(t._gsapAllow=!0,Uh=e)},D_=function(t){br(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,a=e.onRelease,o,l,c=gn(t.target)||Nn,u=Mt.core.globals().ScrollSmoother,f=u&&u.get(),h=qi&&(t.content&&gn(t.content)||f&&t.content!==!1&&!f.smooth()&&f.content()),d=cr(c,Ve),g=cr(c,mn),_=1,p=(De.isTouch&&Jt.visualViewport?Jt.visualViewport.scale*Jt.visualViewport.width:Jt.outerWidth)/Jt.innerWidth,m=0,M=sn(i)?function(){return i(o)}:function(){return i||2.8},x,S,A=rp(c,t.type,!0,s),w=function(){return S=!1},T=li,R=li,y=function(){l=mi(c,Ve),R=_a(qi?1:0,l),n&&(T=_a(0,mi(c,mn))),x=Gr},v=function(){h._gsap.y=aa(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},C=function(){if(S){requestAnimationFrame(w);var k=aa(o.deltaY/2),it=R(d.v-k);if(h&&it!==d.v+d.offset){d.offset=it-d.v;var L=aa((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",h._gsap.y=L+"px",d.cacheID=Qt.cache,Ui()}return!0}d.offset&&v(),S=!0},I,F,B,Y,H=function(){y(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return h&&Mt.set(h,{y:"+=0"}),t.ignoreCheck=function(G){return qi&&G.type==="touchmove"&&C()||_>1.05&&G.type!=="touchstart"||o.isGesturing||G.touches&&G.touches.length>1},t.onPress=function(){S=!1;var G=_;_=aa((Jt.visualViewport&&Jt.visualViewport.scale||1)/p),I.pause(),G!==_&&Ll(c,_>1.01?!0:n?!1:"x"),F=g(),B=d(),y(),x=Gr},t.onRelease=t.onGestureStart=function(G,k){if(d.offset&&v(),!k)Y.restart(!0);else{Qt.cache++;var it=M(),L,lt;n&&(L=g(),lt=L+it*.05*-G.velocityX/.227,it*=Ih(g,L,lt,mi(c,mn)),I.vars.scrollX=T(lt)),L=d(),lt=L+it*.05*-G.velocityY/.227,it*=Ih(d,L,lt,mi(c,Ve)),I.vars.scrollY=R(lt),I.invalidate().duration(it).play(.01),(qi&&I.vars.scrollY>=l||L>=l-1)&&Mt.to({},{onUpdate:H,duration:it})}a&&a(G)},t.onWheel=function(){I._ts&&I.pause(),nn()-m>1e3&&(x=0,m=nn())},t.onChange=function(G,k,it,L,lt){if(Gr!==x&&y(),k&&n&&g(T(L[2]===k?F+(G.startX-G.x):g()+k-L[1])),it){d.offset&&v();var Ft=lt[2]===it,qt=Ft?B+G.startY-G.y:d()+it-lt[1],$=R(qt);Ft&&qt!==$&&(B+=$-qt),d($)}(it||k)&&Ui()},t.onEnable=function(){Ll(c,n?!1:"x"),Wt.addEventListener("refresh",H),$e(Jt,"resize",H),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),A.enable()},t.onDisable=function(){Ll(c,!0),qe(Jt,"resize",H),Wt.removeEventListener("refresh",H),A.kill()},t.lockAxis=t.lockAxis!==!1,o=new De(t),o.iOS=qi,qi&&!d()&&d(1),qi&&Mt.ticker.add(li),Y=o._dc,I=Mt.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:ip(d,d(),function(){return I.pause()})},onUpdate:Ui,onComplete:Y.vars.onComplete}),o};Wt.sort=function(r){if(sn(r))return jt.sort(r);var t=Jt.pageYOffset||0;return Wt.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+Jt.innerHeight}),jt.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Wt.observe=function(r){return new De(r)};Wt.normalizeScroll=function(r){if(typeof r>"u")return fn;if(r===!0&&fn)return fn.enable();if(r===!1){fn&&fn.kill(),fn=r;return}var t=r instanceof De?r:D_(r);return fn&&fn.target===t.target&&fn.kill(),Wr(t.target)&&(fn=t),t};Wt.core={_getVelocityProp:yc,_inputObserver:rp,_scrollers:Qt,_proxies:gi,bridge:{ss:function(){Jn||Yr("scrollStart"),Jn=nn()},ref:function(){return en}}};Yd()&&Mt.registerPlugin(Wt);const ca=async(r,t)=>{const e=await fetch(r,t);if(!e.ok)throw new Error(`Request failed: ${e.status}`);return e.json()},I_=async()=>{const[r,t,e,n]=await Promise.all([ca("/api/programs"),ca("/api/testimonials"),ca("/api/tutors"),ca("/api/stats")]);return{programs:r,testimonials:t,tutors:e,stats:n}},U_=r=>ca("/api/trial",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fu="166",N_=0,Oh=1,O_=2,sp=1,F_=2,wi=3,ur=0,bn=1,Pi=2,rr=0,Ds=1,Fh=2,Bh=3,zh=4,B_=5,Rr=100,z_=101,k_=102,H_=103,V_=104,G_=200,W_=201,X_=202,Y_=203,Pc=204,Lc=205,q_=206,$_=207,K_=208,Z_=209,j_=210,J_=211,Q_=212,tg=213,eg=214,ng=0,ig=1,rg=2,Qo=3,sg=4,ag=5,og=6,lg=7,ap=0,cg=1,ug=2,sr=0,hg=1,fg=2,dg=3,pg=4,mg=5,_g=6,gg=7,op=300,Hs=301,Vs=302,Dc=303,Ic=304,cl=306,Uc=1e3,Dr=1001,Nc=1002,jn=1003,vg=1004,eo=1005,si=1006,Dl=1007,Ir=1008,Fi=1009,lp=1010,cp=1011,Ua=1012,Bu=1013,qr=1014,Di=1015,Oa=1016,zu=1017,ku=1018,Gs=1020,up=35902,hp=1021,fp=1022,ai=1023,dp=1024,pp=1025,Is=1026,Ws=1027,mp=1028,Hu=1029,_p=1030,Vu=1031,Gu=1033,Uo=33776,No=33777,Oo=33778,Fo=33779,Oc=35840,Fc=35841,Bc=35842,zc=35843,kc=36196,Hc=37492,Vc=37496,Gc=37808,Wc=37809,Xc=37810,Yc=37811,qc=37812,$c=37813,Kc=37814,Zc=37815,jc=37816,Jc=37817,Qc=37818,tu=37819,eu=37820,nu=37821,Bo=36492,iu=36494,ru=36495,gp=36283,su=36284,au=36285,ou=36286,xg=3200,Mg=3201,vp=0,Sg=1,$i="",ri="srgb",pr="srgb-linear",Wu="display-p3",ul="display-p3-linear",tl="linear",Ee="srgb",el="rec709",nl="p3",ns=7680,kh=519,yg=512,Eg=513,Tg=514,xp=515,bg=516,wg=517,Ag=518,Rg=519,Hh=35044,Vh="300 es",Ii=2e3,il=2001;class Ys{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Il=Math.PI/180,lu=180/Math.PI;function Fa(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[r&255]+Qe[r>>8&255]+Qe[r>>16&255]+Qe[r>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function vn(r,t,e){return Math.max(t,Math.min(e,r))}function Cg(r,t){return(r%t+t)%t}function Ul(r,t,e){return(1-e)*r+e*t}function js(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class ee{constructor(t=0,e=0){ee.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(vn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,n,i,s,a,o,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],M=i[1],x=i[4],S=i[7],A=i[2],w=i[5],T=i[8];return s[0]=a*_+o*M+l*A,s[3]=a*p+o*x+l*w,s[6]=a*m+o*S+l*T,s[1]=c*_+u*M+f*A,s[4]=c*p+u*x+f*w,s[7]=c*m+u*S+f*T,s[2]=h*_+d*M+g*A,s[5]=h*p+d*x+g*w,s[8]=h*m+d*S+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,g=e*f+n*h+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(i*c-u*n)*_,t[2]=(o*n-i*a)*_,t[3]=h*_,t[4]=(u*e-i*l)*_,t[5]=(i*s-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Nl.makeScale(t,e)),this}rotate(t){return this.premultiply(Nl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Nl=new Kt;function Mp(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function rl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Pg(){const r=rl("canvas");return r.style.display="block",r}const Gh={};function Sp(r){r in Gh||(Gh[r]=!0,console.warn(r))}function Lg(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Wh=new Kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xh=new Kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),no={[pr]:{transfer:tl,primaries:el,toReference:r=>r,fromReference:r=>r},[ri]:{transfer:Ee,primaries:el,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[ul]:{transfer:tl,primaries:nl,toReference:r=>r.applyMatrix3(Xh),fromReference:r=>r.applyMatrix3(Wh)},[Wu]:{transfer:Ee,primaries:nl,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Xh),fromReference:r=>r.applyMatrix3(Wh).convertLinearToSRGB()}},Dg=new Set([pr,ul]),pe={enabled:!0,_workingColorSpace:pr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Dg.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=no[t].toReference,i=no[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return no[r].primaries},getTransfer:function(r){return r===$i?tl:no[r].transfer}};function Us(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ol(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let is;class Ig{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{is===void 0&&(is=rl("canvas")),is.width=t.width,is.height=t.height;const n=is.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=is}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=rl("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Us(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Us(e[n]/255)*255):e[n]=Us(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ug=0;class yp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=Fa(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Fl(i[a].image)):s.push(Fl(i[a]))}else s=Fl(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Fl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ig.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ng=0;class wn extends Ys{constructor(t=wn.DEFAULT_IMAGE,e=wn.DEFAULT_MAPPING,n=Dr,i=Dr,s=si,a=Ir,o=ai,l=Fi,c=wn.DEFAULT_ANISOTROPY,u=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=Fa(),this.name="",this.source=new yp(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==op)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Uc:t.x=t.x-Math.floor(t.x);break;case Dr:t.x=t.x<0?0:1;break;case Nc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Uc:t.y=t.y-Math.floor(t.y);break;case Dr:t.y=t.y<0?0:1;break;case Nc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}wn.DEFAULT_IMAGE=null;wn.DEFAULT_MAPPING=op;wn.DEFAULT_ANISOTROPY=1;class Ge{constructor(t=0,e=0,n=0,i=1){Ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,S=(d+1)/2,A=(m+1)/2,w=(u+h)/4,T=(f+_)/4,R=(g+p)/4;return x>S&&x>A?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=w/n,s=T/n):S>A?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=w/i,s=R/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=T/s,i=R/s),this.set(n,i,s,e),this}let M=Math.sqrt((p-g)*(p-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(f-_)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Og extends Ys{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ge(0,0,t,e),this.scissorTest=!1,this.viewport=new Ge(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new wn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new yp(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $r extends Og{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ep extends wn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=jn,this.minFilter=jn,this.wrapR=Dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fg extends wn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=jn,this.minFilter=jn,this.wrapR=Dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ba{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],f=n[i+3];const h=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(o===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let p=1-o;const m=l*h+c*d+u*g+f*_,M=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const A=Math.sqrt(x),w=Math.atan2(A,m*M);p=Math.sin(p*w)/A,o=Math.sin(o*w)/A}const S=o*M;if(l=l*p+h*S,c=c*p+d*S,u=u*p+g*S,f=f*p+_*S,p===1-o){const A=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=A,c*=A,u*=A,f*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],f=s[a],h=s[a+1],d=s[a+2],g=s[a+3];return t[e]=o*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-o*d,t[e+2]=c*g+u*d+o*h-l*f,t[e+3]=u*g-o*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),f=o(s/2),h=l(n/2),d=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=n+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-i)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(vn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=a*f+this._w*h,this._x=n*f+this._x*h,this._y=i*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(t=0,e=0,n=0){X.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Yh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Yh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),u=2*(o*e-s*i),f=2*(s*n-a*e);return this.x=e+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=i+l*f+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Bl.copy(this).projectOnVector(t),this.sub(Bl)}reflect(t){return this.sub(Bl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(vn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bl=new X,Yh=new Ba;class za{constructor(t=new X(1/0,1/0,1/0),e=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ti.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ti.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ti.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ti):ti.fromBufferAttribute(s,a),ti.applyMatrix4(t.matrixWorld),this.expandByPoint(ti);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),io.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(t.matrixWorld),this.union(io)}const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ti),ti.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),ro.subVectors(this.max,Js),rs.subVectors(t.a,Js),ss.subVectors(t.b,Js),as.subVectors(t.c,Js),Hi.subVectors(ss,rs),Vi.subVectors(as,ss),gr.subVectors(rs,as);let e=[0,-Hi.z,Hi.y,0,-Vi.z,Vi.y,0,-gr.z,gr.y,Hi.z,0,-Hi.x,Vi.z,0,-Vi.x,gr.z,0,-gr.x,-Hi.y,Hi.x,0,-Vi.y,Vi.x,0,-gr.y,gr.x,0];return!zl(e,rs,ss,as,ro)||(e=[1,0,0,0,1,0,0,0,1],!zl(e,rs,ss,as,ro))?!1:(so.crossVectors(Hi,Vi),e=[so.x,so.y,so.z],zl(e,rs,ss,as,ro))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ti).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ti).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Si=[new X,new X,new X,new X,new X,new X,new X,new X],ti=new X,io=new za,rs=new X,ss=new X,as=new X,Hi=new X,Vi=new X,gr=new X,Js=new X,ro=new X,so=new X,vr=new X;function zl(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){vr.fromArray(r,s);const o=i.x*Math.abs(vr.x)+i.y*Math.abs(vr.y)+i.z*Math.abs(vr.z),l=t.dot(vr),c=e.dot(vr),u=n.dot(vr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Bg=new za,Qs=new X,kl=new X;class Xu{constructor(t=new X,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Bg.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qs.subVectors(t,this.center);const e=Qs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Qs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qs.copy(t.center).add(kl)),this.expandByPoint(Qs.copy(t.center).sub(kl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yi=new X,Hl=new X,ao=new X,Gi=new X,Vl=new X,oo=new X,Gl=new X;class zg{constructor(t=new X,e=new X(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Hl.copy(t).add(e).multiplyScalar(.5),ao.copy(e).sub(t).normalize(),Gi.copy(this.origin).sub(Hl);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ao),o=Gi.dot(this.direction),l=-Gi.dot(ao),c=Gi.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*l-o,h=a*o-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Hl).addScaledVector(ao,h),d}intersectSphere(t,e){yi.subVectors(t.center,this.origin);const n=yi.dot(this.direction),i=yi.dot(yi)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,i=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,i=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,i,s){Vl.subVectors(e,t),oo.subVectors(n,t),Gl.crossVectors(Vl,oo);let a=this.direction.dot(Gl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Gi.subVectors(this.origin,t);const l=o*this.direction.dot(oo.crossVectors(Gi,oo));if(l<0)return null;const c=o*this.direction.dot(Vl.cross(Gi));if(c<0||l+c>a)return null;const u=-o*Gi.dot(Gl);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ie{constructor(t,e,n,i,s,a,o,l,c,u,f,h,d,g,_,p){Ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,u,f,h,d,g,_,p)}set(t,e,n,i,s,a,o,l,c,u,f,h,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/os.setFromMatrixColumn(t,0).length(),s=1/os.setFromMatrixColumn(t,1).length(),a=1/os.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=a*u,d=a*f,g=o*u,_=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-_*c,e[9]=-o*l,e[2]=_-h*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h+_*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=d*o-g,e[6]=_+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h-_*o,e[4]=-a*f,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*u,e[9]=_-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*u,d=a*f,g=o*u,_=o*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+d,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=a*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=o*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kg,t,Hg)}lookAt(t,e,n){const i=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Wi.crossVectors(n,Pn),Wi.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Wi.crossVectors(n,Pn)),Wi.normalize(),lo.crossVectors(Pn,Wi),i[0]=Wi.x,i[4]=lo.x,i[8]=Pn.x,i[1]=Wi.y,i[5]=lo.y,i[9]=Pn.y,i[2]=Wi.z,i[6]=lo.z,i[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],M=n[3],x=n[7],S=n[11],A=n[15],w=i[0],T=i[4],R=i[8],y=i[12],v=i[1],C=i[5],I=i[9],F=i[13],B=i[2],Y=i[6],H=i[10],G=i[14],k=i[3],it=i[7],L=i[11],lt=i[15];return s[0]=a*w+o*v+l*B+c*k,s[4]=a*T+o*C+l*Y+c*it,s[8]=a*R+o*I+l*H+c*L,s[12]=a*y+o*F+l*G+c*lt,s[1]=u*w+f*v+h*B+d*k,s[5]=u*T+f*C+h*Y+d*it,s[9]=u*R+f*I+h*H+d*L,s[13]=u*y+f*F+h*G+d*lt,s[2]=g*w+_*v+p*B+m*k,s[6]=g*T+_*C+p*Y+m*it,s[10]=g*R+_*I+p*H+m*L,s[14]=g*y+_*F+p*G+m*lt,s[3]=M*w+x*v+S*B+A*k,s[7]=M*T+x*C+S*Y+A*it,s[11]=M*R+x*I+S*H+A*L,s[15]=M*y+x*F+S*G+A*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+s*l*f-i*c*f-s*o*h+n*c*h+i*o*d-n*l*d)+_*(+e*l*d-e*c*h+s*a*h-i*a*d+i*c*u-s*l*u)+p*(+e*c*f-e*o*d-s*a*f+n*a*d+s*o*u-n*c*u)+m*(-i*o*u-e*l*f+e*o*h+i*a*f-n*a*h+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],M=f*p*c-_*h*c+_*l*d-o*p*d-f*l*m+o*h*m,x=g*h*c-u*p*c-g*l*d+a*p*d+u*l*m-a*h*m,S=u*_*c-g*f*c+g*o*d-a*_*d-u*o*m+a*f*m,A=g*f*l-u*_*l-g*o*h+a*_*h+u*o*p-a*f*p,w=e*M+n*x+i*S+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return t[0]=M*T,t[1]=(_*h*s-f*p*s-_*i*d+n*p*d+f*i*m-n*h*m)*T,t[2]=(o*p*s-_*l*s+_*i*c-n*p*c-o*i*m+n*l*m)*T,t[3]=(f*l*s-o*h*s-f*i*c+n*h*c+o*i*d-n*l*d)*T,t[4]=x*T,t[5]=(u*p*s-g*h*s+g*i*d-e*p*d-u*i*m+e*h*m)*T,t[6]=(g*l*s-a*p*s-g*i*c+e*p*c+a*i*m-e*l*m)*T,t[7]=(a*h*s-u*l*s+u*i*c-e*h*c-a*i*d+e*l*d)*T,t[8]=S*T,t[9]=(g*f*s-u*_*s-g*n*d+e*_*d+u*n*m-e*f*m)*T,t[10]=(a*_*s-g*o*s+g*n*c-e*_*c-a*n*m+e*o*m)*T,t[11]=(u*o*s-a*f*s-u*n*c+e*f*c+a*n*d-e*o*d)*T,t[12]=A*T,t[13]=(u*_*i-g*f*i+g*n*h-e*_*h-u*n*p+e*f*p)*T,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*p-e*o*p)*T,t[15]=(a*f*i-u*o*i+u*n*l-e*f*l-a*n*h+e*o*h)*T,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,g=s*f,_=a*u,p=a*f,m=o*f,M=l*c,x=l*u,S=l*f,A=n.x,w=n.y,T=n.z;return i[0]=(1-(_+m))*A,i[1]=(d+S)*A,i[2]=(g-x)*A,i[3]=0,i[4]=(d-S)*w,i[5]=(1-(h+m))*w,i[6]=(p+M)*w,i[7]=0,i[8]=(g+x)*T,i[9]=(p-M)*T,i[10]=(1-(h+_))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=os.set(i[0],i[1],i[2]).length();const a=os.set(i[4],i[5],i[6]).length(),o=os.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ei.copy(this);const c=1/s,u=1/a,f=1/o;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=u,ei.elements[5]*=u,ei.elements[6]*=u,ei.elements[8]*=f,ei.elements[9]*=f,ei.elements[10]*=f,e.setFromRotationMatrix(ei),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=Ii){const l=this.elements,c=2*s/(e-t),u=2*s/(n-i),f=(e+t)/(e-t),h=(n+i)/(n-i);let d,g;if(o===Ii)d=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===il)d=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=Ii){const l=this.elements,c=1/(e-t),u=1/(n-i),f=1/(a-s),h=(e+t)*c,d=(n+i)*u;let g,_;if(o===Ii)g=(a+s)*f,_=-2*f;else if(o===il)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const os=new X,ei=new Ie,kg=new X(0,0,0),Hg=new X(1,1,1),Wi=new X,lo=new X,Pn=new X,qh=new Ie,$h=new Ba;class Bi{constructor(t=0,e=0,n=0,i=Bi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],f=i[2],h=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(vn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(vn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(vn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-vn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $h.setFromEuler(this),this.setFromQuaternion($h,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bi.DEFAULT_ORDER="XYZ";class Tp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vg=0;const Kh=new X,ls=new Ba,Ei=new Ie,co=new X,ta=new X,Gg=new X,Wg=new Ba,Zh=new X(1,0,0),jh=new X(0,1,0),Jh=new X(0,0,1),Qh={type:"added"},Xg={type:"removed"},cs={type:"childadded",child:null},Wl={type:"childremoved",child:null};class ln extends Ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=Fa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ln.DEFAULT_UP.clone();const t=new X,e=new Bi,n=new Ba,i=new X(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ie},normalMatrix:{value:new Kt}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ls.setFromAxisAngle(t,e),this.quaternion.multiply(ls),this}rotateOnWorldAxis(t,e){return ls.setFromAxisAngle(t,e),this.quaternion.premultiply(ls),this}rotateX(t){return this.rotateOnAxis(Zh,t)}rotateY(t){return this.rotateOnAxis(jh,t)}rotateZ(t){return this.rotateOnAxis(Jh,t)}translateOnAxis(t,e){return Kh.copy(t).applyQuaternion(this.quaternion),this.position.add(Kh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zh,t)}translateY(t){return this.translateOnAxis(jh,t)}translateZ(t){return this.translateOnAxis(Jh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?co.copy(t):co.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(ta,co,this.up):Ei.lookAt(co,ta,this.up),this.quaternion.setFromRotationMatrix(Ei),i&&(Ei.extractRotation(i.matrixWorld),ls.setFromRotationMatrix(Ei),this.quaternion.premultiply(ls.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qh),cs.child=t,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xg),Wl.child=t,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qh),cs.child=t,this.dispatchEvent(cs),cs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,t,Gg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,Wg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ln.DEFAULT_UP=new X(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ni=new X,Ti=new X,Xl=new X,bi=new X,us=new X,hs=new X,tf=new X,Yl=new X,ql=new X,$l=new X;class fi{constructor(t=new X,e=new X,n=new X){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),ni.subVectors(t,e),i.cross(ni);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){ni.subVectors(i,e),Ti.subVectors(n,e),Xl.subVectors(t,e);const a=ni.dot(ni),o=ni.dot(Ti),l=ni.dot(Xl),c=Ti.dot(Ti),u=Ti.dot(Xl),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bi.x),l.addScaledVector(a,bi.y),l.addScaledVector(o,bi.z),l)}static isFrontFacing(t,e,n,i){return ni.subVectors(n,e),Ti.subVectors(t,e),ni.cross(Ti).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ni.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),ni.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return fi.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return fi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;us.subVectors(i,n),hs.subVectors(s,n),Yl.subVectors(t,n);const l=us.dot(Yl),c=hs.dot(Yl);if(l<=0&&c<=0)return e.copy(n);ql.subVectors(t,i);const u=us.dot(ql),f=hs.dot(ql);if(u>=0&&f<=u)return e.copy(i);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(us,a);$l.subVectors(t,s);const d=us.dot($l),g=hs.dot($l);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(hs,o);const p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return tf.subVectors(s,i),o=(f-u)/(f-u+(d-g)),e.copy(i).addScaledVector(tf,o);const m=1/(p+_+h);return a=_*m,o=h*m,e.copy(n).addScaledVector(us,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const bp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},uo={h:0,s:0,l:0};function Kl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class ce{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=pe.workingColorSpace){return this.r=t,this.g=e,this.b=n,pe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=pe.workingColorSpace){if(t=Cg(t,1),e=vn(e,0,1),n=vn(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Kl(a,s,t+1/3),this.g=Kl(a,s,t),this.b=Kl(a,s,t-1/3)}return pe.toWorkingColorSpace(this,i),this}setStyle(t,e=ri){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ri){const n=bp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}copyLinearToSRGB(t){return this.r=Ol(t.r),this.g=Ol(t.g),this.b=Ol(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return pe.fromWorkingColorSpace(tn.copy(this),t),Math.round(vn(tn.r*255,0,255))*65536+Math.round(vn(tn.g*255,0,255))*256+Math.round(vn(tn.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.fromWorkingColorSpace(tn.copy(this),e);const n=tn.r,i=tn.g,s=tn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-n)/f+2;break;case s:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.fromWorkingColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=ri){pe.fromWorkingColorSpace(tn.copy(this),t);const e=tn.r,n=tn.g,i=tn.b;return t!==ri?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Xi),this.setHSL(Xi.h+t,Xi.s+e,Xi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xi),t.getHSL(uo);const n=Ul(Xi.h,uo.h,e),i=Ul(Xi.s,uo.s,e),s=Ul(Xi.l,uo.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new ce;ce.NAMES=bp;let Yg=0;class ka extends Ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=Fa(),this.name="",this.type="Material",this.blending=Ds,this.side=ur,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pc,this.blendDst=Lc,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=Qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==ur&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pc&&(n.blendSrc=this.blendSrc),this.blendDst!==Lc&&(n.blendDst=this.blendDst),this.blendEquation!==Rr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class wp extends ka{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.combine=ap,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ne=new X,ho=new ee;class vi{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Hh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Di,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Sp("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ho.fromBufferAttribute(this,e),ho.applyMatrix3(t),this.setXY(e,ho.x,ho.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=js(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_n(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=js(e,this.array)),e}setX(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=js(e,this.array)),e}setY(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=js(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=js(e,this.array)),e}setW(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=_n(e,this.array),n=_n(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=_n(e,this.array),n=_n(n,this.array),i=_n(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=_n(e,this.array),n=_n(n,this.array),i=_n(i,this.array),s=_n(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Hh&&(t.usage=this.usage),t}}class Ap extends vi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Rp extends vi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class kn extends vi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let qg=0;const Wn=new Ie,Zl=new ln,fs=new X,Ln=new za,ea=new za,Ye=new X;class zi extends Ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=Fa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mp(t)?Rp:Ap)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Kt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Wn.makeRotationFromQuaternion(t),this.applyMatrix4(Wn),this}rotateX(t){return Wn.makeRotationX(t),this.applyMatrix4(Wn),this}rotateY(t){return Wn.makeRotationY(t),this.applyMatrix4(Wn),this}rotateZ(t){return Wn.makeRotationZ(t),this.applyMatrix4(Wn),this}translate(t,e,n){return Wn.makeTranslation(t,e,n),this.applyMatrix4(Wn),this}scale(t,e,n){return Wn.makeScale(t,e,n),this.applyMatrix4(Wn),this}lookAt(t){return Zl.lookAt(t),Zl.updateMatrix(),this.applyMatrix4(Zl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new kn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new za);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xu);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(t){const n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];ea.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Ln.min,ea.min),Ln.expandByPoint(Ye),Ye.addVectors(Ln.max,ea.max),Ln.expandByPoint(Ye)):(Ln.expandByPoint(ea.min),Ln.expandByPoint(ea.max))}Ln.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Ye.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ye));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ye.fromBufferAttribute(o,c),l&&(fs.fromBufferAttribute(t,c),Ye.add(fs)),i=Math.max(i,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vi(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new X,l[R]=new X;const c=new X,u=new X,f=new X,h=new ee,d=new ee,g=new ee,_=new X,p=new X;function m(R,y,v){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,y),f.fromBufferAttribute(n,v),h.fromBufferAttribute(s,R),d.fromBufferAttribute(s,y),g.fromBufferAttribute(s,v),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(C),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(C),o[R].add(_),o[y].add(_),o[v].add(_),l[R].add(p),l[y].add(p),l[v].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,y=M.length;R<y;++R){const v=M[R],C=v.start,I=v.count;for(let F=C,B=C+I;F<B;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const x=new X,S=new X,A=new X,w=new X;function T(R){A.fromBufferAttribute(i,R),w.copy(A);const y=o[R];x.copy(y),x.sub(A.multiplyScalar(A.dot(y))).normalize(),S.crossVectors(w,y);const C=S.dot(l[R])<0?-1:1;a.setXYZW(R,x.x,x.y,x.z,C)}for(let R=0,y=M.length;R<y;++R){const v=M[R],C=v.start,I=v.count;for(let F=C,B=C+I;F<B;F+=3)T(t.getX(F+0)),T(t.getX(F+1)),T(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new vi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const i=new X,s=new X,a=new X,o=new X,l=new X,c=new X,u=new X,f=new X;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),_=t.getX(h+1),p=t.getX(h+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),u.subVectors(a,s),f.subVectors(i,s),u.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)i.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,s),f.subVectors(i,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*u;for(let m=0;m<u;m++)h[g++]=c[d++]}return new vi(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new zi,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ef=new Ie,xr=new zg,fo=new Xu,nf=new X,ds=new X,ps=new X,ms=new X,jl=new X,po=new X,mo=new ee,_o=new ee,go=new ee,rf=new X,sf=new X,af=new X,vo=new X,xo=new X;class an extends ln{constructor(t=new zi,e=new wp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(s&&o){po.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(jl.fromBufferAttribute(f,t),a?po.addScaledVector(jl,u):po.addScaledVector(jl.sub(e),u))}e.add(po)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(s),xr.copy(t.ray).recast(t.near),!(fo.containsPoint(xr.origin)===!1&&(xr.intersectSphere(fo,nf)===null||xr.origin.distanceToSquared(nf)>(t.far-t.near)**2))&&(ef.copy(s).invert(),xr.copy(t.ray).applyMatrix4(ef),!(n.boundingBox!==null&&xr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xr)))}_computeIntersections(t,e,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const p=h[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),x=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let S=M,A=x;S<A;S+=3){const w=o.getX(S),T=o.getX(S+1),R=o.getX(S+2);i=Mo(this,m,t,n,c,u,f,w,T,R),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const M=o.getX(p),x=o.getX(p+1),S=o.getX(p+2);i=Mo(this,a,t,n,c,u,f,M,x,S),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const p=h[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),x=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let S=M,A=x;S<A;S+=3){const w=S,T=S+1,R=S+2;i=Mo(this,m,t,n,c,u,f,w,T,R),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const M=p,x=p+1,S=p+2;i=Mo(this,a,t,n,c,u,f,M,x,S),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function $g(r,t,e,n,i,s,a,o){let l;if(t.side===bn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===ur,o),l===null)return null;xo.copy(o),xo.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(xo);return c<e.near||c>e.far?null:{distance:c,point:xo.clone(),object:r}}function Mo(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,ds),r.getVertexPosition(l,ps),r.getVertexPosition(c,ms);const u=$g(r,t,e,n,ds,ps,ms,vo);if(u){i&&(mo.fromBufferAttribute(i,o),_o.fromBufferAttribute(i,l),go.fromBufferAttribute(i,c),u.uv=fi.getInterpolation(vo,ds,ps,ms,mo,_o,go,new ee)),s&&(mo.fromBufferAttribute(s,o),_o.fromBufferAttribute(s,l),go.fromBufferAttribute(s,c),u.uv1=fi.getInterpolation(vo,ds,ps,ms,mo,_o,go,new ee)),a&&(rf.fromBufferAttribute(a,o),sf.fromBufferAttribute(a,l),af.fromBufferAttribute(a,c),u.normal=fi.getInterpolation(vo,ds,ps,ms,rf,sf,af,new X),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new X,materialIndex:0};fi.getNormal(ds,ps,ms,f.normal),u.face=f}return u}class hr extends zi{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new kn(c,3)),this.setAttribute("normal",new kn(u,3)),this.setAttribute("uv",new kn(f,2));function g(_,p,m,M,x,S,A,w,T,R,y){const v=S/T,C=A/R,I=S/2,F=A/2,B=w/2,Y=T+1,H=R+1;let G=0,k=0;const it=new X;for(let L=0;L<H;L++){const lt=L*C-F;for(let Ft=0;Ft<Y;Ft++){const qt=Ft*v-I;it[_]=qt*M,it[p]=lt*x,it[m]=B,c.push(it.x,it.y,it.z),it[_]=0,it[p]=0,it[m]=w>0?1:-1,u.push(it.x,it.y,it.z),f.push(Ft/T),f.push(1-L/R),G+=1}}for(let L=0;L<R;L++)for(let lt=0;lt<T;lt++){const Ft=h+lt+Y*L,qt=h+lt+Y*(L+1),$=h+(lt+1)+Y*(L+1),tt=h+(lt+1)+Y*L;l.push(Ft,qt,tt),l.push(qt,$,tt),k+=6}o.addGroup(d,k,y),d+=k,h+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function hn(r){const t={};for(let e=0;e<r.length;e++){const n=Xs(r[e]);for(const i in n)t[i]=n[i]}return t}function Kg(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Cp(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const Zg={clone:Xs,merge:hn};var jg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fr extends ka{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jg,this.fragmentShader=Jg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xs(t.uniforms),this.uniformsGroups=Kg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Pp extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=Ii}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new X,of=new ee,lf=new ee;class $n extends Pp{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=lu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Il*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return lu*2*Math.atan(Math.tan(Il*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yi.x,Yi.y).multiplyScalar(-t/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-t/Yi.z)}getViewSize(t,e){return this.getViewBounds(t,of,lf),e.subVectors(lf,of)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Il*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _s=-90,gs=1;class Qg extends ln{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $n(_s,gs,t,e);i.layers=this.layers,this.add(i);const s=new $n(_s,gs,t,e);s.layers=this.layers,this.add(s);const a=new $n(_s,gs,t,e);a.layers=this.layers,this.add(a);const o=new $n(_s,gs,t,e);o.layers=this.layers,this.add(o);const l=new $n(_s,gs,t,e);l.layers=this.layers,this.add(l);const c=new $n(_s,gs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===Ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===il)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Lp extends wn{constructor(t,e,n,i,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Hs,super(t,e,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class t0 extends $r{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Lp(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:si}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new hr(5,5,5),s=new fr({name:"CubemapFromEquirect",uniforms:Xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:rr});s.uniforms.tEquirect.value=e;const a=new an(i,s),o=e.minFilter;return e.minFilter===Ir&&(e.minFilter=si),new Qg(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const Jl=new X,e0=new X,n0=new Kt;class wr{constructor(t=new X(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Jl.subVectors(n,e).cross(e0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Jl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||n0.getNormalMatrix(t),i=this.coplanarPoint(Jl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mr=new Xu,So=new X;class Yu{constructor(t=new wr,e=new wr,n=new wr,i=new wr,s=new wr,a=new wr){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ii){const n=this.planes,i=t.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],u=i[5],f=i[6],h=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],M=i[13],x=i[14],S=i[15];if(n[0].setComponents(l-s,h-c,p-d,S-m).normalize(),n[1].setComponents(l+s,h+c,p+d,S+m).normalize(),n[2].setComponents(l+a,h+u,p+g,S+M).normalize(),n[3].setComponents(l-a,h-u,p-g,S-M).normalize(),n[4].setComponents(l-o,h-f,p-_,S-x).normalize(),e===Ii)n[5].setComponents(l+o,h+f,p+_,S+x).normalize();else if(e===il)n[5].setComponents(o,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(t){return Mr.center.set(0,0,0),Mr.radius=.7071067811865476,Mr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(So.x=i.normal.x>0?t.max.x:t.min.x,So.y=i.normal.y>0?t.max.y:t.min.y,So.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(So)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dp(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function i0(r){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l._updateRange,h=l.updateRanges;if(r.bindBuffer(c,o),f.count===-1&&h.length===0&&r.bufferSubData(c,0,u),h.length!==0){for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}f.count!==-1&&(r.bufferSubData(c,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count),f.count=-1),l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class hl extends zi{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,f=t/o,h=e/l,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const M=m*h-a;for(let x=0;x<c;x++){const S=x*f-s;g.push(S,-M,0),_.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const x=M+c*m,S=M+c*(m+1),A=M+1+c*(m+1),w=M+1+c*m;d.push(x,S,w),d.push(S,A,w)}this.setIndex(d),this.setAttribute("position",new kn(g,3)),this.setAttribute("normal",new kn(_,3)),this.setAttribute("uv",new kn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.width,t.height,t.widthSegments,t.heightSegments)}}var r0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,a0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,o0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,l0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,c0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,u0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,h0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,f0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,d0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,p0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,m0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,g0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,v0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,E0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,T0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,w0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,A0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,R0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,C0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,L0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,U0="gl_FragColor = linearToOutputTexel( gl_FragColor );",N0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,O0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,B0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,z0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,H0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,V0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,W0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Y0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,q0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,K0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Z0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,j0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Q0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ev=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,nv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,iv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,av=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ov=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_v=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ev=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Av=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Iv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ov=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$v=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ix=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ux=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,hx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,px=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_x=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ex=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ax=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Px=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ix=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ux=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ox=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:r0,alphahash_pars_fragment:s0,alphamap_fragment:a0,alphamap_pars_fragment:o0,alphatest_fragment:l0,alphatest_pars_fragment:c0,aomap_fragment:u0,aomap_pars_fragment:h0,batching_pars_vertex:f0,batching_vertex:d0,begin_vertex:p0,beginnormal_vertex:m0,bsdfs:_0,iridescence_fragment:g0,bumpmap_pars_fragment:v0,clipping_planes_fragment:x0,clipping_planes_pars_fragment:M0,clipping_planes_pars_vertex:S0,clipping_planes_vertex:y0,color_fragment:E0,color_pars_fragment:T0,color_pars_vertex:b0,color_vertex:w0,common:A0,cube_uv_reflection_fragment:R0,defaultnormal_vertex:C0,displacementmap_pars_vertex:P0,displacementmap_vertex:L0,emissivemap_fragment:D0,emissivemap_pars_fragment:I0,colorspace_fragment:U0,colorspace_pars_fragment:N0,envmap_fragment:O0,envmap_common_pars_fragment:F0,envmap_pars_fragment:B0,envmap_pars_vertex:z0,envmap_physical_pars_fragment:Z0,envmap_vertex:k0,fog_vertex:H0,fog_pars_vertex:V0,fog_fragment:G0,fog_pars_fragment:W0,gradientmap_pars_fragment:X0,lightmap_pars_fragment:Y0,lights_lambert_fragment:q0,lights_lambert_pars_fragment:$0,lights_pars_begin:K0,lights_toon_fragment:j0,lights_toon_pars_fragment:J0,lights_phong_fragment:Q0,lights_phong_pars_fragment:tv,lights_physical_fragment:ev,lights_physical_pars_fragment:nv,lights_fragment_begin:iv,lights_fragment_maps:rv,lights_fragment_end:sv,logdepthbuf_fragment:av,logdepthbuf_pars_fragment:ov,logdepthbuf_pars_vertex:lv,logdepthbuf_vertex:cv,map_fragment:uv,map_pars_fragment:hv,map_particle_fragment:fv,map_particle_pars_fragment:dv,metalnessmap_fragment:pv,metalnessmap_pars_fragment:mv,morphinstance_vertex:_v,morphcolor_vertex:gv,morphnormal_vertex:vv,morphtarget_pars_vertex:xv,morphtarget_vertex:Mv,normal_fragment_begin:Sv,normal_fragment_maps:yv,normal_pars_fragment:Ev,normal_pars_vertex:Tv,normal_vertex:bv,normalmap_pars_fragment:wv,clearcoat_normal_fragment_begin:Av,clearcoat_normal_fragment_maps:Rv,clearcoat_pars_fragment:Cv,iridescence_pars_fragment:Pv,opaque_fragment:Lv,packing:Dv,premultiplied_alpha_fragment:Iv,project_vertex:Uv,dithering_fragment:Nv,dithering_pars_fragment:Ov,roughnessmap_fragment:Fv,roughnessmap_pars_fragment:Bv,shadowmap_pars_fragment:zv,shadowmap_pars_vertex:kv,shadowmap_vertex:Hv,shadowmask_pars_fragment:Vv,skinbase_vertex:Gv,skinning_pars_vertex:Wv,skinning_vertex:Xv,skinnormal_vertex:Yv,specularmap_fragment:qv,specularmap_pars_fragment:$v,tonemapping_fragment:Kv,tonemapping_pars_fragment:Zv,transmission_fragment:jv,transmission_pars_fragment:Jv,uv_pars_fragment:Qv,uv_pars_vertex:tx,uv_vertex:ex,worldpos_vertex:nx,background_vert:ix,background_frag:rx,backgroundCube_vert:sx,backgroundCube_frag:ax,cube_vert:ox,cube_frag:lx,depth_vert:cx,depth_frag:ux,distanceRGBA_vert:hx,distanceRGBA_frag:fx,equirect_vert:dx,equirect_frag:px,linedashed_vert:mx,linedashed_frag:_x,meshbasic_vert:gx,meshbasic_frag:vx,meshlambert_vert:xx,meshlambert_frag:Mx,meshmatcap_vert:Sx,meshmatcap_frag:yx,meshnormal_vert:Ex,meshnormal_frag:Tx,meshphong_vert:bx,meshphong_frag:wx,meshphysical_vert:Ax,meshphysical_frag:Rx,meshtoon_vert:Cx,meshtoon_frag:Px,points_vert:Lx,points_frag:Dx,shadow_vert:Ix,shadow_frag:Ux,sprite_vert:Nx,sprite_frag:Ox},pt={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ci={basic:{uniforms:hn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:hn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new ce(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:hn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:hn([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:hn([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new ce(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:hn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:hn([pt.points,pt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:hn([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:hn([pt.common,pt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:hn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:hn([pt.sprite,pt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:hn([pt.common,pt.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:hn([pt.lights,pt.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};ci.physical={uniforms:hn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const yo={r:0,b:0,g:0},Sr=new Bi,Fx=new Ie;function Bx(r,t,e,n,i,s,a){const o=new ce(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function _(M){let x=!1;const S=g(M);S===null?m(o,l):S&&S.isColor&&(m(S,1),x=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(M,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===cl)?(u===void 0&&(u=new an(new hr(1,1,1),new fr({name:"BackgroundCubeMaterial",uniforms:Xs(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Sr.copy(x.backgroundRotation),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fx.makeRotationFromEuler(Sr)),u.material.toneMapped=pe.getTransfer(S.colorSpace)!==Ee,(f!==S||h!==S.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,f=S,h=S.version,d=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new an(new hl(2,2),new fr({name:"BackgroundMaterial",uniforms:Xs(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:ur,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=pe.getTransfer(S.colorSpace)!==Ee,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||h!==S.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,f=S,h=S.version,d=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,x){M.getRGB(yo,Cp(r)),n.buffers.color.setClear(yo.r,yo.g,yo.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:_,addToRenderList:p}}function zx(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,a=!1;function o(v,C,I,F,B){let Y=!1;const H=f(F,I,C);s!==H&&(s=H,c(s.object)),Y=d(v,F,I,B),Y&&g(v,F,I,B),B!==null&&t.update(B,r.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,S(v,C,I,F),B!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function u(v){return r.deleteVertexArray(v)}function f(v,C,I){const F=I.wireframe===!0;let B=n[v.id];B===void 0&&(B={},n[v.id]=B);let Y=B[C.id];Y===void 0&&(Y={},B[C.id]=Y);let H=Y[F];return H===void 0&&(H=h(l()),Y[F]=H),H}function h(v){const C=[],I=[],F=[];for(let B=0;B<e;B++)C[B]=0,I[B]=0,F[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:F,object:v,attributes:{},index:null}}function d(v,C,I,F){const B=s.attributes,Y=C.attributes;let H=0;const G=I.getAttributes();for(const k in G)if(G[k].location>=0){const L=B[k];let lt=Y[k];if(lt===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(lt=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(lt=v.instanceColor)),L===void 0||L.attribute!==lt||lt&&L.data!==lt.data)return!0;H++}return s.attributesNum!==H||s.index!==F}function g(v,C,I,F){const B={},Y=C.attributes;let H=0;const G=I.getAttributes();for(const k in G)if(G[k].location>=0){let L=Y[k];L===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(L=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(L=v.instanceColor));const lt={};lt.attribute=L,L&&L.data&&(lt.data=L.data),B[k]=lt,H++}s.attributes=B,s.attributesNum=H,s.index=F}function _(){const v=s.newAttributes;for(let C=0,I=v.length;C<I;C++)v[C]=0}function p(v){m(v,0)}function m(v,C){const I=s.newAttributes,F=s.enabledAttributes,B=s.attributeDivisors;I[v]=1,F[v]===0&&(r.enableVertexAttribArray(v),F[v]=1),B[v]!==C&&(r.vertexAttribDivisor(v,C),B[v]=C)}function M(){const v=s.newAttributes,C=s.enabledAttributes;for(let I=0,F=C.length;I<F;I++)C[I]!==v[I]&&(r.disableVertexAttribArray(I),C[I]=0)}function x(v,C,I,F,B,Y,H){H===!0?r.vertexAttribIPointer(v,C,I,B,Y):r.vertexAttribPointer(v,C,I,F,B,Y)}function S(v,C,I,F){_();const B=F.attributes,Y=I.getAttributes(),H=C.defaultAttributeValues;for(const G in Y){const k=Y[G];if(k.location>=0){let it=B[G];if(it===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(it=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(it=v.instanceColor)),it!==void 0){const L=it.normalized,lt=it.itemSize,Ft=t.get(it);if(Ft===void 0)continue;const qt=Ft.buffer,$=Ft.type,tt=Ft.bytesPerElement,ut=$===r.INT||$===r.UNSIGNED_INT||it.gpuType===Bu;if(it.isInterleavedBufferAttribute){const ot=it.data,bt=ot.stride,Rt=it.offset;if(ot.isInstancedInterleavedBuffer){for(let Vt=0;Vt<k.locationSize;Vt++)m(k.location+Vt,ot.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Vt=0;Vt<k.locationSize;Vt++)p(k.location+Vt);r.bindBuffer(r.ARRAY_BUFFER,qt);for(let Vt=0;Vt<k.locationSize;Vt++)x(k.location+Vt,lt/k.locationSize,$,L,bt*tt,(Rt+lt/k.locationSize*Vt)*tt,ut)}else{if(it.isInstancedBufferAttribute){for(let ot=0;ot<k.locationSize;ot++)m(k.location+ot,it.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let ot=0;ot<k.locationSize;ot++)p(k.location+ot);r.bindBuffer(r.ARRAY_BUFFER,qt);for(let ot=0;ot<k.locationSize;ot++)x(k.location+ot,lt/k.locationSize,$,L,lt*tt,lt/k.locationSize*ot*tt,ut)}}else if(H!==void 0){const L=H[G];if(L!==void 0)switch(L.length){case 2:r.vertexAttrib2fv(k.location,L);break;case 3:r.vertexAttrib3fv(k.location,L);break;case 4:r.vertexAttrib4fv(k.location,L);break;default:r.vertexAttrib1fv(k.location,L)}}}}M()}function A(){R();for(const v in n){const C=n[v];for(const I in C){const F=C[I];for(const B in F)u(F[B].object),delete F[B];delete C[I]}delete n[v]}}function w(v){if(n[v.id]===void 0)return;const C=n[v.id];for(const I in C){const F=C[I];for(const B in F)u(F[B].object),delete F[B];delete C[I]}delete n[v.id]}function T(v){for(const C in n){const I=n[C];if(I[v.id]===void 0)continue;const F=I[v.id];for(const B in F)u(F[B].object),delete F[B];delete I[v.id]}}function R(){y(),a=!0,s!==i&&(s=i,c(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:M}}function kx(r,t,e){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,f){f!==0&&(r.drawArraysInstanced(n,c,u,f),e.update(u,n,f))}function o(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,n,1)}function l(c,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];for(let _=0;_<h.length;_++)e.update(g,n,h[_])}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Hx(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(w){return!(w!==ai&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const T=w===Oa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Fi&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Di&&!T)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=d>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,maxTextures:h,maxVertexTextures:d,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:m,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:S,maxSamples:A}}function Vx(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new wr,o=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||i;return i=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,m=r.get(f);if(!i||g===null||g.length===0||s&&!p)s?u(null):c();else{const M=s?0:n,x=M*4;let S=m.clippingState||null;l.value=S,S=u(g,h,x,d);for(let A=0;A!==x;++A)S[A]=e[A];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,S=d;x!==_;++x,S+=4)a.copy(f[x]).applyMatrix4(M,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Gx(r){let t=new WeakMap;function e(a,o){return o===Dc?a.mapping=Hs:o===Ic&&(a.mapping=Vs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Dc||o===Ic)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new t0(l.height);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Ip extends Pp{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ts=4,cf=[.125,.215,.35,.446,.526,.582],Cr=20,Ql=new Ip,uf=new ce;let tc=null,ec=0,nc=0,ic=!1;const Ar=(1+Math.sqrt(5))/2,vs=1/Ar,hf=[new X(-Ar,vs,0),new X(Ar,vs,0),new X(-vs,0,Ar),new X(vs,0,Ar),new X(0,Ar,-vs),new X(0,Ar,vs),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)];class ff{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){tc=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(tc,ec,nc),this._renderer.xr.enabled=ic,t.scissorTest=!1,Eo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),tc=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:si,minFilter:si,generateMipmaps:!1,type:Oa,format:ai,colorSpace:pr,depthBuffer:!1},i=df(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=df(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wx(s)),this._blurMaterial=Xx(s,t,e)}return i}_compileMaterial(t){const e=new an(this._lodPlanes[0],t);this._renderer.compile(e,Ql)}_sceneToCubeUV(t,e,n,i){const o=new $n(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(uf),u.toneMapping=sr,u.autoClear=!1;const d=new wp({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1}),g=new an(new hr,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(uf),_=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const x=this._cubeSize;Eo(i,M*x,m>2?x:0,x,x),u.setRenderTarget(i),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Hs||t.mapping===Vs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pf());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new an(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Eo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ql)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=hf[(i-s-1)%hf.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new an(this._lodPlanes[i],c),h=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Cr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):Cr;p>Cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Cr}`);const m=[];let M=0;for(let T=0;T<Cr;++T){const R=T/_,y=Math.exp(-R*R/2);m.push(y),T===0?M+=y:T<p&&(M+=2*y)}for(let T=0;T<m.length;T++)m[T]=m[T]/M;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-n;const S=this._sizeLods[i],A=3*S*(i>x-Ts?i-x+Ts:0),w=4*(this._cubeSize-S);Eo(e,A,w,3*S,2*S),l.setRenderTarget(e),l.render(f,Ql)}}function Wx(r){const t=[],e=[],n=[];let i=r;const s=r-Ts+1+cf.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-Ts?l=cf[a-r+Ts-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,p=2,m=1,M=new Float32Array(_*g*d),x=new Float32Array(p*g*d),S=new Float32Array(m*g*d);for(let w=0;w<d;w++){const T=w%3*2/3-1,R=w>2?0:-1,y=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];M.set(y,_*g*w),x.set(h,p*g*w);const v=[w,w,w,w,w,w];S.set(v,m*g*w)}const A=new zi;A.setAttribute("position",new vi(M,_)),A.setAttribute("uv",new vi(x,p)),A.setAttribute("faceIndex",new vi(S,m)),t.push(A),i>Ts&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function df(r,t,e){const n=new $r(r,t,e);return n.texture.mapping=cl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eo(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Xx(r,t,e){const n=new Float32Array(Cr),i=new X(0,1,0);return new fr({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function pf(){return new fr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function mf(){return new fr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function qu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Yx(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Dc||l===Ic,u=l===Hs||l===Vs;if(c||u){let f=t.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return e===null&&(e=new ff(r)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return c&&d&&d.height>0||u&&d&&i(d)?(e===null&&(e=new ff(r)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function qx(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Sp("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $x(r,t,e,n){const i={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}h.removeEventListener("dispose",a),delete i[h.id];const d=s.get(h);d&&(t.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return i[h.id]===!0||(h.addEventListener("dispose",a),i[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],r.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],r.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let x=0,S=M.length;x<S;x+=3){const A=M[x+0],w=M[x+1],T=M[x+2];h.push(A,w,w,T,T,A)}}else if(g!==void 0){const M=g.array;_=g.version;for(let x=0,S=M.length/3-1;x<S;x+=3){const A=x+0,w=x+1,T=x+2;h.push(A,w,w,T,T,A)}}else return;const p=new(Mp(h)?Rp:Ap)(h,1);p.version=_;const m=s.get(f);m&&t.remove(m),s.set(f,p)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Kx(r,t,e){let n;function i(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){r.drawElements(n,d,s,h*a),e.update(d,n,1)}function c(h,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,h*a,g),e.update(d,n,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function f(h,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)c(h[m]/a,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let m=0;for(let M=0;M<g;M++)m+=d[M];for(let M=0;M<_.length;M++)e.update(m,n,_[M])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Zx(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function jx(r,t,e){const n=new WeakMap,i=new Ge;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let v=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var d=v;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),p===!0&&(S=3);let A=o.attributes.position.count*S,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const T=new Float32Array(A*w*4*f),R=new Ep(T,A,w,f);R.type=Di,R.needsUpdate=!0;const y=S*4;for(let C=0;C<f;C++){const I=m[C],F=M[C],B=x[C],Y=A*w*4*C;for(let H=0;H<I.count;H++){const G=H*y;g===!0&&(i.fromBufferAttribute(I,H),T[Y+G+0]=i.x,T[Y+G+1]=i.y,T[Y+G+2]=i.z,T[Y+G+3]=0),_===!0&&(i.fromBufferAttribute(F,H),T[Y+G+4]=i.x,T[Y+G+5]=i.y,T[Y+G+6]=i.z,T[Y+G+7]=0),p===!0&&(i.fromBufferAttribute(B,H),T[Y+G+8]=i.x,T[Y+G+9]=i.y,T[Y+G+10]=i.z,T[Y+G+11]=B.itemSize===4?i.w:1)}}h={count:f,texture:R,size:new ee(A,w)},n.set(o,h),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function Jx(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=t.get(l,u);if(i.get(f)!==c&&(t.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return f}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class Up extends wn{constructor(t,e,n,i,s,a,o,l,c,u=Is){if(u!==Is&&u!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Is&&(n=qr),n===void 0&&u===Ws&&(n=Gs),super(null,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:jn,this.minFilter=l!==void 0?l:jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Np=new wn,_f=new Up(1,1),Op=new Ep,Fp=new Fg,Bp=new Lp,gf=[],vf=[],xf=new Float32Array(16),Mf=new Float32Array(9),Sf=new Float32Array(4);function qs(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=gf[i];if(s===void 0&&(s=new Float32Array(i),gf[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function We(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Xe(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function fl(r,t){let e=vf[t];e===void 0&&(e=new Int32Array(t),vf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Qx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function tM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2fv(this.addr,t),Xe(e,t)}}function eM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;r.uniform3fv(this.addr,t),Xe(e,t)}}function nM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4fv(this.addr,t),Xe(e,t)}}function iM(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Sf.set(n),r.uniformMatrix2fv(this.addr,!1,Sf),Xe(e,n)}}function rM(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Mf.set(n),r.uniformMatrix3fv(this.addr,!1,Mf),Xe(e,n)}}function sM(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;xf.set(n),r.uniformMatrix4fv(this.addr,!1,xf),Xe(e,n)}}function aM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function oM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2iv(this.addr,t),Xe(e,t)}}function lM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;r.uniform3iv(this.addr,t),Xe(e,t)}}function cM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4iv(this.addr,t),Xe(e,t)}}function uM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function hM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2uiv(this.addr,t),Xe(e,t)}}function fM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;r.uniform3uiv(this.addr,t),Xe(e,t)}}function dM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4uiv(this.addr,t),Xe(e,t)}}function pM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(_f.compareFunction=xp,s=_f):s=Np,e.setTexture2D(t||s,i)}function mM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Fp,i)}function _M(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Bp,i)}function gM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Op,i)}function vM(r){switch(r){case 5126:return Qx;case 35664:return tM;case 35665:return eM;case 35666:return nM;case 35674:return iM;case 35675:return rM;case 35676:return sM;case 5124:case 35670:return aM;case 35667:case 35671:return oM;case 35668:case 35672:return lM;case 35669:case 35673:return cM;case 5125:return uM;case 36294:return hM;case 36295:return fM;case 36296:return dM;case 35678:case 36198:case 36298:case 36306:case 35682:return pM;case 35679:case 36299:case 36307:return mM;case 35680:case 36300:case 36308:case 36293:return _M;case 36289:case 36303:case 36311:case 36292:return gM}}function xM(r,t){r.uniform1fv(this.addr,t)}function MM(r,t){const e=qs(t,this.size,2);r.uniform2fv(this.addr,e)}function SM(r,t){const e=qs(t,this.size,3);r.uniform3fv(this.addr,e)}function yM(r,t){const e=qs(t,this.size,4);r.uniform4fv(this.addr,e)}function EM(r,t){const e=qs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function TM(r,t){const e=qs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function bM(r,t){const e=qs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function wM(r,t){r.uniform1iv(this.addr,t)}function AM(r,t){r.uniform2iv(this.addr,t)}function RM(r,t){r.uniform3iv(this.addr,t)}function CM(r,t){r.uniform4iv(this.addr,t)}function PM(r,t){r.uniform1uiv(this.addr,t)}function LM(r,t){r.uniform2uiv(this.addr,t)}function DM(r,t){r.uniform3uiv(this.addr,t)}function IM(r,t){r.uniform4uiv(this.addr,t)}function UM(r,t,e){const n=this.cache,i=t.length,s=fl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Np,s[a])}function NM(r,t,e){const n=this.cache,i=t.length,s=fl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Fp,s[a])}function OM(r,t,e){const n=this.cache,i=t.length,s=fl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Bp,s[a])}function FM(r,t,e){const n=this.cache,i=t.length,s=fl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Op,s[a])}function BM(r){switch(r){case 5126:return xM;case 35664:return MM;case 35665:return SM;case 35666:return yM;case 35674:return EM;case 35675:return TM;case 35676:return bM;case 5124:case 35670:return wM;case 35667:case 35671:return AM;case 35668:case 35672:return RM;case 35669:case 35673:return CM;case 5125:return PM;case 36294:return LM;case 36295:return DM;case 36296:return IM;case 35678:case 36198:case 36298:case 36306:case 35682:return UM;case 35679:case 36299:case 36307:return NM;case 35680:case 36300:case 36308:case 36293:return OM;case 36289:case 36303:case 36311:case 36292:return FM}}class zM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vM(e.type)}}class kM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=BM(e.type)}}class HM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const rc=/(\w+)(\])?(\[|\.)?/g;function yf(r,t){r.seq.push(t),r.map[t.id]=t}function VM(r,t,e){const n=r.name,i=n.length;for(rc.lastIndex=0;;){const s=rc.exec(n),a=rc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){yf(e,c===void 0?new zM(o,r,t):new kM(o,r,t));break}else{let f=e.map[o];f===void 0&&(f=new HM(o),yf(e,f)),e=f}}}class zo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);VM(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ef(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const GM=37297;let WM=0;function XM(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function YM(r){const t=pe.getPrimaries(pe.workingColorSpace),e=pe.getPrimaries(r);let n;switch(t===e?n="":t===nl&&e===el?n="LinearDisplayP3ToLinearSRGB":t===el&&e===nl&&(n="LinearSRGBToLinearDisplayP3"),r){case pr:case ul:return[n,"LinearTransferOETF"];case ri:case Wu:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Tf(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+XM(r.getShaderSource(t),a)}else return i}function qM(r,t){const e=YM(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function $M(r,t){let e;switch(t){case hg:e="Linear";break;case fg:e="Reinhard";break;case dg:e="OptimizedCineon";break;case pg:e="ACESFilmic";break;case _g:e="AgX";break;case gg:e="Neutral";break;case mg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function KM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)}function ZM(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function jM(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function ua(r){return r!==""}function bf(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wf(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const JM=/^[ \t]*#include +<([\w\d./]+)>/gm;function cu(r){return r.replace(JM,tS)}const QM=new Map;function tS(r,t){let e=$t[t];if(e===void 0){const n=QM.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return cu(e)}const eS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Af(r){return r.replace(eS,nS)}function nS(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Rf(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function iS(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===sp?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===F_?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===wi&&(t="SHADOWMAP_TYPE_VSM"),t}function rS(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case cl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function sS(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function aS(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ap:t="ENVMAP_BLENDING_MULTIPLY";break;case cg:t="ENVMAP_BLENDING_MIX";break;case ug:t="ENVMAP_BLENDING_ADD";break}return t}function oS(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lS(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=iS(e),c=rS(e),u=sS(e),f=aS(e),h=oS(e),d=KM(e),g=ZM(s),_=i.createProgram();let p,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ua).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ua).join(`
`),m.length>0&&(m+=`
`)):(p=[Rf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),m=[Rf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==sr?"#define TONE_MAPPING":"",e.toneMapping!==sr?$t.tonemapping_pars_fragment:"",e.toneMapping!==sr?$M("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,qM("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ua).join(`
`)),a=cu(a),a=bf(a,e),a=wf(a,e),o=cu(o),o=bf(o,e),o=wf(o,e),a=Af(a),o=Af(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=M+p+a,S=M+m+o,A=Ef(i,i.VERTEX_SHADER,x),w=Ef(i,i.FRAGMENT_SHADER,S);i.attachShader(_,A),i.attachShader(_,w),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(C){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(A).trim(),B=i.getShaderInfoLog(w).trim();let Y=!0,H=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,w);else{const G=Tf(i,A,"vertex"),k=Tf(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+G+`
`+k)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(F===""||B==="")&&(H=!1);H&&(C.diagnostics={runnable:Y,programLog:I,vertexShader:{log:F,prefix:p},fragmentShader:{log:B,prefix:m}})}i.deleteShader(A),i.deleteShader(w),R=new zo(i,_),y=jM(i,_)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,GM)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=WM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=w,this}let cS=0;class uS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new hS(t),e.set(t,n)),n}}class hS{constructor(t){this.id=cS++,this.code=t,this.usedTimes=0}}function fS(r,t,e,n,i,s,a){const o=new Tp,l=new uS,c=new Set,u=[],f=i.logarithmicDepthBuffer,h=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function p(y,v,C,I,F){const B=I.fog,Y=F.geometry,H=y.isMeshStandardMaterial?I.environment:null,G=(y.isMeshStandardMaterial?e:t).get(y.envMap||H),k=G&&G.mapping===cl?G.image.height:null,it=g[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const L=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,lt=L!==void 0?L.length:0;let Ft=0;Y.morphAttributes.position!==void 0&&(Ft=1),Y.morphAttributes.normal!==void 0&&(Ft=2),Y.morphAttributes.color!==void 0&&(Ft=3);let qt,$,tt,ut;if(it){const ne=ci[it];qt=ne.vertexShader,$=ne.fragmentShader}else qt=y.vertexShader,$=y.fragmentShader,l.update(y),tt=l.getVertexShaderID(y),ut=l.getFragmentShaderID(y);const ot=r.getRenderTarget(),bt=F.isInstancedMesh===!0,Rt=F.isBatchedMesh===!0,Vt=!!y.map,Zt=!!y.matcap,D=!!G,Lt=!!y.aoMap,Nt=!!y.lightMap,Xt=!!y.bumpMap,gt=!!y.normalMap,W=!!y.displacementMap,wt=!!y.emissiveMap,Ot=!!y.metalnessMap,P=!!y.roughnessMap,E=y.anisotropy>0,q=y.clearcoat>0,Q=y.dispersion>0,nt=y.iridescence>0,Z=y.sheen>0,Et=y.transmission>0,rt=E&&!!y.anisotropyMap,dt=q&&!!y.clearcoatMap,It=q&&!!y.clearcoatNormalMap,st=q&&!!y.clearcoatRoughnessMap,_t=nt&&!!y.iridescenceMap,Ct=nt&&!!y.iridescenceThicknessMap,Bt=Z&&!!y.sheenColorMap,mt=Z&&!!y.sheenRoughnessMap,zt=!!y.specularMap,Gt=!!y.specularColorMap,le=!!y.specularIntensityMap,N=Et&&!!y.transmissionMap,K=Et&&!!y.thicknessMap,j=!!y.gradientMap,J=!!y.alphaMap,at=y.alphaTest>0,Tt=!!y.alphaHash,Yt=!!y.extensions;let ge=sr;y.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ge=r.toneMapping);const ve={shaderID:it,shaderType:y.type,shaderName:y.name,vertexShader:qt,fragmentShader:$,defines:y.defines,customVertexShaderID:tt,customFragmentShaderID:ut,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Rt,batchingColor:Rt&&F._colorsTexture!==null,instancing:bt,instancingColor:bt&&F.instanceColor!==null,instancingMorph:bt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ot===null?r.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:pr,alphaToCoverage:!!y.alphaToCoverage,map:Vt,matcap:Zt,envMap:D,envMapMode:D&&G.mapping,envMapCubeUVHeight:k,aoMap:Lt,lightMap:Nt,bumpMap:Xt,normalMap:gt,displacementMap:h&&W,emissiveMap:wt,normalMapObjectSpace:gt&&y.normalMapType===Sg,normalMapTangentSpace:gt&&y.normalMapType===vp,metalnessMap:Ot,roughnessMap:P,anisotropy:E,anisotropyMap:rt,clearcoat:q,clearcoatMap:dt,clearcoatNormalMap:It,clearcoatRoughnessMap:st,dispersion:Q,iridescence:nt,iridescenceMap:_t,iridescenceThicknessMap:Ct,sheen:Z,sheenColorMap:Bt,sheenRoughnessMap:mt,specularMap:zt,specularColorMap:Gt,specularIntensityMap:le,transmission:Et,transmissionMap:N,thicknessMap:K,gradientMap:j,opaque:y.transparent===!1&&y.blending===Ds&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:at,alphaHash:Tt,combine:y.combine,mapUv:Vt&&_(y.map.channel),aoMapUv:Lt&&_(y.aoMap.channel),lightMapUv:Nt&&_(y.lightMap.channel),bumpMapUv:Xt&&_(y.bumpMap.channel),normalMapUv:gt&&_(y.normalMap.channel),displacementMapUv:W&&_(y.displacementMap.channel),emissiveMapUv:wt&&_(y.emissiveMap.channel),metalnessMapUv:Ot&&_(y.metalnessMap.channel),roughnessMapUv:P&&_(y.roughnessMap.channel),anisotropyMapUv:rt&&_(y.anisotropyMap.channel),clearcoatMapUv:dt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:It&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:mt&&_(y.sheenRoughnessMap.channel),specularMapUv:zt&&_(y.specularMap.channel),specularColorMapUv:Gt&&_(y.specularColorMap.channel),specularIntensityMapUv:le&&_(y.specularIntensityMap.channel),transmissionMapUv:N&&_(y.transmissionMap.channel),thicknessMapUv:K&&_(y.thicknessMap.channel),alphaMapUv:J&&_(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(gt||E),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(Vt||J),fog:!!B,useFog:y.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:Ft,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ge,decodeVideoTexture:Vt&&y.map.isVideoTexture===!0&&pe.getTransfer(y.map.colorSpace)===Ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Pi,flipSided:y.side===bn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Yt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&y.extensions.multiDraw===!0||Rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ve.vertexUv1s=c.has(1),ve.vertexUv2s=c.has(2),ve.vertexUv3s=c.has(3),c.clear(),ve}function m(y){const v=[];if(y.shaderID?v.push(y.shaderID):(v.push(y.customVertexShaderID),v.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)v.push(C),v.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(M(v,y),x(v,y),v.push(r.outputColorSpace)),v.push(y.customProgramCacheKey),v.join()}function M(y,v){y.push(v.precision),y.push(v.outputColorSpace),y.push(v.envMapMode),y.push(v.envMapCubeUVHeight),y.push(v.mapUv),y.push(v.alphaMapUv),y.push(v.lightMapUv),y.push(v.aoMapUv),y.push(v.bumpMapUv),y.push(v.normalMapUv),y.push(v.displacementMapUv),y.push(v.emissiveMapUv),y.push(v.metalnessMapUv),y.push(v.roughnessMapUv),y.push(v.anisotropyMapUv),y.push(v.clearcoatMapUv),y.push(v.clearcoatNormalMapUv),y.push(v.clearcoatRoughnessMapUv),y.push(v.iridescenceMapUv),y.push(v.iridescenceThicknessMapUv),y.push(v.sheenColorMapUv),y.push(v.sheenRoughnessMapUv),y.push(v.specularMapUv),y.push(v.specularColorMapUv),y.push(v.specularIntensityMapUv),y.push(v.transmissionMapUv),y.push(v.thicknessMapUv),y.push(v.combine),y.push(v.fogExp2),y.push(v.sizeAttenuation),y.push(v.morphTargetsCount),y.push(v.morphAttributeCount),y.push(v.numDirLights),y.push(v.numPointLights),y.push(v.numSpotLights),y.push(v.numSpotLightMaps),y.push(v.numHemiLights),y.push(v.numRectAreaLights),y.push(v.numDirLightShadows),y.push(v.numPointLightShadows),y.push(v.numSpotLightShadows),y.push(v.numSpotLightShadowsWithMaps),y.push(v.numLightProbes),y.push(v.shadowMapType),y.push(v.toneMapping),y.push(v.numClippingPlanes),y.push(v.numClipIntersection),y.push(v.depthPacking)}function x(y,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.skinning&&o.enable(4),v.morphTargets&&o.enable(5),v.morphNormals&&o.enable(6),v.morphColors&&o.enable(7),v.premultipliedAlpha&&o.enable(8),v.shadowMapEnabled&&o.enable(9),v.doubleSided&&o.enable(10),v.flipSided&&o.enable(11),v.useDepthPacking&&o.enable(12),v.dithering&&o.enable(13),v.transmission&&o.enable(14),v.sheen&&o.enable(15),v.opaque&&o.enable(16),v.pointsUvs&&o.enable(17),v.decodeVideoTexture&&o.enable(18),v.alphaToCoverage&&o.enable(19),y.push(o.mask)}function S(y){const v=g[y.type];let C;if(v){const I=ci[v];C=Zg.clone(I.uniforms)}else C=y.uniforms;return C}function A(y,v){let C;for(let I=0,F=u.length;I<F;I++){const B=u[I];if(B.cacheKey===v){C=B,++C.usedTimes;break}}return C===void 0&&(C=new lS(r,v,y,s),u.push(C)),C}function w(y){if(--y.usedTimes===0){const v=u.indexOf(y);u[v]=u[u.length-1],u.pop(),y.destroy()}}function T(y){l.remove(y)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:A,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:R}}function dS(){let r=new WeakMap;function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function e(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function pS(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Cf(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Pf(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(f,h,d,g,_,p){let m=r[t];return m===void 0?(m={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:p},r[t]=m):(m.id=f.id,m.object=f,m.geometry=h,m.material=d,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=_,m.group=p),t++,m}function o(f,h,d,g,_,p){const m=a(f,h,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function l(f,h,d,g,_,p){const m=a(f,h,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function c(f,h){e.length>1&&e.sort(f||pS),n.length>1&&n.sort(h||Cf),i.length>1&&i.sort(h||Cf)}function u(){for(let f=t,h=r.length;f<h;f++){const d=r[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function mS(){let r=new WeakMap;function t(n,i){const s=r.get(n);let a;return s===void 0?(a=new Pf,r.set(n,[a])):i>=s.length?(a=new Pf,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function _S(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new X,color:new ce};break;case"SpotLight":e={position:new X,direction:new X,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new ce,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":e={color:new ce,position:new X,halfWidth:new X,halfHeight:new X};break}return r[t.id]=e,e}}}function gS(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let vS=0;function xS(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function MS(r){const t=new _S,e=gS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new X);const i=new X,s=new Ie,a=new Ie;function o(c){let u=0,f=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,M=0,x=0,S=0,A=0,w=0,T=0;c.sort(xS);for(let y=0,v=c.length;y<v;y++){const C=c[y],I=C.color,F=C.intensity,B=C.distance,Y=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=I.r*F,f+=I.g*F,h+=I.b*F;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],F);T++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const G=C.shadow,k=e.get(C);k.shadowIntensity=G.intensity,k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=Y,n.directionalShadowMatrix[d]=C.shadow.matrix,M++}n.directional[d]=H,d++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(I).multiplyScalar(F),H.distance=B,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[_]=H;const G=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,G.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=G.matrix,C.castShadow){const k=e.get(C);k.shadowIntensity=G.intensity,k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=Y,S++}_++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(I).multiplyScalar(F),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=H,p++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const G=C.shadow,k=e.get(C);k.shadowIntensity=G.intensity,k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,k.shadowCameraNear=G.camera.near,k.shadowCameraFar=G.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=C.shadow.matrix,x++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(F),H.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[m]=H,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==M||R.numPointShadows!==x||R.numSpotShadows!==S||R.numSpotMaps!==A||R.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=S+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=M,R.numPointShadows=x,R.numSpotShadows=S,R.numSpotMaps=A,R.numLightProbes=T,n.version=vS++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const p=u.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){const x=c[m];if(x.isDirectionalLight){const S=n.directional[f];S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),f++}else if(x.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),d++}else if(x.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const S=n.point[h];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),h++}else if(x.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function Lf(r){const t=new MS(r),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function SS(r){let t=new WeakMap;function e(i,s=0){const a=t.get(i);let o;return a===void 0?(o=new Lf(r),t.set(i,[o])):s>=a.length?(o=new Lf(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class yS extends ka{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ES extends ka{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const TS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function wS(r,t,e){let n=new Yu;const i=new ee,s=new ee,a=new Ge,o=new yS({depthPacking:Mg}),l=new ES,c={},u=e.maxTextureSize,f={[ur]:bn,[bn]:ur,[Pi]:Pi},h=new fr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:TS,fragmentShader:bS}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new zi;g.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new an(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sp;let m=this.type;this.render=function(w,T,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const y=r.getRenderTarget(),v=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),I=r.state;I.setBlending(rr),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=m!==wi&&this.type===wi,B=m===wi&&this.type!==wi;for(let Y=0,H=w.length;Y<H;Y++){const G=w[Y],k=G.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const it=k.getFrameExtents();if(i.multiply(it),s.copy(k.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/it.x),i.x=s.x*it.x,k.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/it.y),i.y=s.y*it.y,k.mapSize.y=s.y)),k.map===null||F===!0||B===!0){const lt=this.type!==wi?{minFilter:jn,magFilter:jn}:{};k.map!==null&&k.map.dispose(),k.map=new $r(i.x,i.y,lt),k.map.texture.name=G.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const L=k.getViewportCount();for(let lt=0;lt<L;lt++){const Ft=k.getViewport(lt);a.set(s.x*Ft.x,s.y*Ft.y,s.x*Ft.z,s.y*Ft.w),I.viewport(a),k.updateMatrices(G,lt),n=k.getFrustum(),S(T,R,k.camera,G,this.type)}k.isPointLightShadow!==!0&&this.type===wi&&M(k,R),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(y,v,C)};function M(w,T){const R=t.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new $r(i.x,i.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(T,null,R,h,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(T,null,R,d,_,null)}function x(w,T,R,y){let v=null;const C=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)v=C;else if(v=R.isPointLight===!0?l:o,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const I=v.uuid,F=T.uuid;let B=c[I];B===void 0&&(B={},c[I]=B);let Y=B[F];Y===void 0&&(Y=v.clone(),B[F]=Y,T.addEventListener("dispose",A)),v=Y}if(v.visible=T.visible,v.wireframe=T.wireframe,y===wi?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:f[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const I=r.properties.get(v);I.light=R}return v}function S(w,T,R,y,v){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&v===wi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const F=t.update(w),B=w.material;if(Array.isArray(B)){const Y=F.groups;for(let H=0,G=Y.length;H<G;H++){const k=Y[H],it=B[k.materialIndex];if(it&&it.visible){const L=x(w,it,y,v);w.onBeforeShadow(r,w,T,R,F,L,k),r.renderBufferDirect(R,null,F,L,w,k),w.onAfterShadow(r,w,T,R,F,L,k)}}}else if(B.visible){const Y=x(w,B,y,v);w.onBeforeShadow(r,w,T,R,F,Y,null),r.renderBufferDirect(R,null,F,Y,w,null),w.onAfterShadow(r,w,T,R,F,Y,null)}}const I=w.children;for(let F=0,B=I.length;F<B;F++)S(I[F],T,R,y,v)}function A(w){w.target.removeEventListener("dispose",A);for(const R in c){const y=c[R],v=w.target.uuid;v in y&&(y[v].dispose(),delete y[v])}}}function AS(r){function t(){let N=!1;const K=new Ge;let j=null;const J=new Ge(0,0,0,0);return{setMask:function(at){j!==at&&!N&&(r.colorMask(at,at,at,at),j=at)},setLocked:function(at){N=at},setClear:function(at,Tt,Yt,ge,ve){ve===!0&&(at*=ge,Tt*=ge,Yt*=ge),K.set(at,Tt,Yt,ge),J.equals(K)===!1&&(r.clearColor(at,Tt,Yt,ge),J.copy(K))},reset:function(){N=!1,j=null,J.set(-1,0,0,0)}}}function e(){let N=!1,K=null,j=null,J=null;return{setTest:function(at){at?ut(r.DEPTH_TEST):ot(r.DEPTH_TEST)},setMask:function(at){K!==at&&!N&&(r.depthMask(at),K=at)},setFunc:function(at){if(j!==at){switch(at){case ng:r.depthFunc(r.NEVER);break;case ig:r.depthFunc(r.ALWAYS);break;case rg:r.depthFunc(r.LESS);break;case Qo:r.depthFunc(r.LEQUAL);break;case sg:r.depthFunc(r.EQUAL);break;case ag:r.depthFunc(r.GEQUAL);break;case og:r.depthFunc(r.GREATER);break;case lg:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}j=at}},setLocked:function(at){N=at},setClear:function(at){J!==at&&(r.clearDepth(at),J=at)},reset:function(){N=!1,K=null,j=null,J=null}}}function n(){let N=!1,K=null,j=null,J=null,at=null,Tt=null,Yt=null,ge=null,ve=null;return{setTest:function(ne){N||(ne?ut(r.STENCIL_TEST):ot(r.STENCIL_TEST))},setMask:function(ne){K!==ne&&!N&&(r.stencilMask(ne),K=ne)},setFunc:function(ne,Ut,yt){(j!==ne||J!==Ut||at!==yt)&&(r.stencilFunc(ne,Ut,yt),j=ne,J=Ut,at=yt)},setOp:function(ne,Ut,yt){(Tt!==ne||Yt!==Ut||ge!==yt)&&(r.stencilOp(ne,Ut,yt),Tt=ne,Yt=Ut,ge=yt)},setLocked:function(ne){N=ne},setClear:function(ne){ve!==ne&&(r.clearStencil(ne),ve=ne)},reset:function(){N=!1,K=null,j=null,J=null,at=null,Tt=null,Yt=null,ge=null,ve=null}}}const i=new t,s=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},u={},f=new WeakMap,h=[],d=null,g=!1,_=null,p=null,m=null,M=null,x=null,S=null,A=null,w=new ce(0,0,0),T=0,R=!1,y=null,v=null,C=null,I=null,F=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(G)[1]),Y=H>=1):G.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Y=H>=2);let k=null,it={};const L=r.getParameter(r.SCISSOR_BOX),lt=r.getParameter(r.VIEWPORT),Ft=new Ge().fromArray(L),qt=new Ge().fromArray(lt);function $(N,K,j,J){const at=new Uint8Array(4),Tt=r.createTexture();r.bindTexture(N,Tt),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Yt=0;Yt<j;Yt++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(K,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,at):r.texImage2D(K+Yt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,at);return Tt}const tt={};tt[r.TEXTURE_2D]=$(r.TEXTURE_2D,r.TEXTURE_2D,1),tt[r.TEXTURE_CUBE_MAP]=$(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[r.TEXTURE_2D_ARRAY]=$(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),tt[r.TEXTURE_3D]=$(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ut(r.DEPTH_TEST),s.setFunc(Qo),Xt(!1),gt(Oh),ut(r.CULL_FACE),Lt(rr);function ut(N){c[N]!==!0&&(r.enable(N),c[N]=!0)}function ot(N){c[N]!==!1&&(r.disable(N),c[N]=!1)}function bt(N,K){return u[N]!==K?(r.bindFramebuffer(N,K),u[N]=K,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=K),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=K),!0):!1}function Rt(N,K){let j=h,J=!1;if(N){j=f.get(K),j===void 0&&(j=[],f.set(K,j));const at=N.textures;if(j.length!==at.length||j[0]!==r.COLOR_ATTACHMENT0){for(let Tt=0,Yt=at.length;Tt<Yt;Tt++)j[Tt]=r.COLOR_ATTACHMENT0+Tt;j.length=at.length,J=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,J=!0);J&&r.drawBuffers(j)}function Vt(N){return d!==N?(r.useProgram(N),d=N,!0):!1}const Zt={[Rr]:r.FUNC_ADD,[z_]:r.FUNC_SUBTRACT,[k_]:r.FUNC_REVERSE_SUBTRACT};Zt[H_]=r.MIN,Zt[V_]=r.MAX;const D={[G_]:r.ZERO,[W_]:r.ONE,[X_]:r.SRC_COLOR,[Pc]:r.SRC_ALPHA,[j_]:r.SRC_ALPHA_SATURATE,[K_]:r.DST_COLOR,[q_]:r.DST_ALPHA,[Y_]:r.ONE_MINUS_SRC_COLOR,[Lc]:r.ONE_MINUS_SRC_ALPHA,[Z_]:r.ONE_MINUS_DST_COLOR,[$_]:r.ONE_MINUS_DST_ALPHA,[J_]:r.CONSTANT_COLOR,[Q_]:r.ONE_MINUS_CONSTANT_COLOR,[tg]:r.CONSTANT_ALPHA,[eg]:r.ONE_MINUS_CONSTANT_ALPHA};function Lt(N,K,j,J,at,Tt,Yt,ge,ve,ne){if(N===rr){g===!0&&(ot(r.BLEND),g=!1);return}if(g===!1&&(ut(r.BLEND),g=!0),N!==B_){if(N!==_||ne!==R){if((p!==Rr||x!==Rr)&&(r.blendEquation(r.FUNC_ADD),p=Rr,x=Rr),ne)switch(N){case Ds:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fh:r.blendFunc(r.ONE,r.ONE);break;case Bh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ds:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Bh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}m=null,M=null,S=null,A=null,w.set(0,0,0),T=0,_=N,R=ne}return}at=at||K,Tt=Tt||j,Yt=Yt||J,(K!==p||at!==x)&&(r.blendEquationSeparate(Zt[K],Zt[at]),p=K,x=at),(j!==m||J!==M||Tt!==S||Yt!==A)&&(r.blendFuncSeparate(D[j],D[J],D[Tt],D[Yt]),m=j,M=J,S=Tt,A=Yt),(ge.equals(w)===!1||ve!==T)&&(r.blendColor(ge.r,ge.g,ge.b,ve),w.copy(ge),T=ve),_=N,R=!1}function Nt(N,K){N.side===Pi?ot(r.CULL_FACE):ut(r.CULL_FACE);let j=N.side===bn;K&&(j=!j),Xt(j),N.blending===Ds&&N.transparent===!1?Lt(rr):Lt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),i.setMask(N.colorWrite);const J=N.stencilWrite;a.setTest(J),J&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),wt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ut(r.SAMPLE_ALPHA_TO_COVERAGE):ot(r.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(N){y!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),y=N)}function gt(N){N!==N_?(ut(r.CULL_FACE),N!==v&&(N===Oh?r.cullFace(r.BACK):N===O_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ot(r.CULL_FACE),v=N}function W(N){N!==C&&(Y&&r.lineWidth(N),C=N)}function wt(N,K,j){N?(ut(r.POLYGON_OFFSET_FILL),(I!==K||F!==j)&&(r.polygonOffset(K,j),I=K,F=j)):ot(r.POLYGON_OFFSET_FILL)}function Ot(N){N?ut(r.SCISSOR_TEST):ot(r.SCISSOR_TEST)}function P(N){N===void 0&&(N=r.TEXTURE0+B-1),k!==N&&(r.activeTexture(N),k=N)}function E(N,K,j){j===void 0&&(k===null?j=r.TEXTURE0+B-1:j=k);let J=it[j];J===void 0&&(J={type:void 0,texture:void 0},it[j]=J),(J.type!==N||J.texture!==K)&&(k!==j&&(r.activeTexture(j),k=j),r.bindTexture(N,K||tt[N]),J.type=N,J.texture=K)}function q(){const N=it[k];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Q(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ct(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Bt(N){Ft.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Ft.copy(N))}function mt(N){qt.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),qt.copy(N))}function zt(N,K){let j=l.get(K);j===void 0&&(j=new WeakMap,l.set(K,j));let J=j.get(N);J===void 0&&(J=r.getUniformBlockIndex(K,N.name),j.set(N,J))}function Gt(N,K){const J=l.get(K).get(N);o.get(K)!==J&&(r.uniformBlockBinding(K,J,N.__bindingPointIndex),o.set(K,J))}function le(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},k=null,it={},u={},f=new WeakMap,h=[],d=null,g=!1,_=null,p=null,m=null,M=null,x=null,S=null,A=null,w=new ce(0,0,0),T=0,R=!1,y=null,v=null,C=null,I=null,F=null,Ft.set(0,0,r.canvas.width,r.canvas.height),qt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),a.reset()}return{buffers:{color:i,depth:s,stencil:a},enable:ut,disable:ot,bindFramebuffer:bt,drawBuffers:Rt,useProgram:Vt,setBlending:Lt,setMaterial:Nt,setFlipSided:Xt,setCullFace:gt,setLineWidth:W,setPolygonOffset:wt,setScissorTest:Ot,activeTexture:P,bindTexture:E,unbindTexture:q,compressedTexImage2D:Q,compressedTexImage3D:nt,texImage2D:_t,texImage3D:Ct,updateUBOMapping:zt,uniformBlockBinding:Gt,texStorage2D:It,texStorage3D:st,texSubImage2D:Z,texSubImage3D:Et,compressedTexSubImage2D:rt,compressedTexSubImage3D:dt,scissor:Bt,viewport:mt,reset:le}}function Df(r,t,e,n){const i=RS(n);switch(e){case hp:return r*t;case dp:return r*t;case pp:return r*t*2;case mp:return r*t/i.components*i.byteLength;case Hu:return r*t/i.components*i.byteLength;case _p:return r*t*2/i.components*i.byteLength;case Vu:return r*t*2/i.components*i.byteLength;case fp:return r*t*3/i.components*i.byteLength;case ai:return r*t*4/i.components*i.byteLength;case Gu:return r*t*4/i.components*i.byteLength;case Uo:case No:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Oo:case Fo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Fc:case zc:return Math.max(r,16)*Math.max(t,8)/4;case Oc:case Bc:return Math.max(r,8)*Math.max(t,8)/2;case kc:case Hc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Vc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Gc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Wc:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Xc:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Yc:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case qc:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case $c:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Kc:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Zc:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case jc:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Jc:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Qc:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case tu:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case eu:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case nu:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Bo:case iu:case ru:return Math.ceil(r/4)*Math.ceil(t/4)*16;case gp:case su:return Math.ceil(r/4)*Math.ceil(t/4)*8;case au:case ou:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function RS(r){switch(r){case Fi:case lp:return{byteLength:1,components:1};case Ua:case cp:case Oa:return{byteLength:2,components:1};case zu:case ku:return{byteLength:2,components:4};case qr:case Bu:case Di:return{byteLength:4,components:1};case up:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function CS(r,t,e,n,i,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ee,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,E){return d?new OffscreenCanvas(P,E):rl("canvas")}function _(P,E,q){let Q=1;const nt=Ot(P);if((nt.width>q||nt.height>q)&&(Q=q/Math.max(nt.width,nt.height)),Q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(Q*nt.width),Et=Math.floor(Q*nt.height);f===void 0&&(f=g(Z,Et));const rt=E?g(Z,Et):f;return rt.width=Z,rt.height=Et,rt.getContext("2d").drawImage(P,0,0,Z,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+Z+"x"+Et+")."),rt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),P;return P}function p(P){return P.generateMipmaps&&P.minFilter!==jn&&P.minFilter!==si}function m(P){r.generateMipmap(P)}function M(P,E,q,Q,nt=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=E;if(E===r.RED&&(q===r.FLOAT&&(Z=r.R32F),q===r.HALF_FLOAT&&(Z=r.R16F),q===r.UNSIGNED_BYTE&&(Z=r.R8)),E===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(Z=r.R8UI),q===r.UNSIGNED_SHORT&&(Z=r.R16UI),q===r.UNSIGNED_INT&&(Z=r.R32UI),q===r.BYTE&&(Z=r.R8I),q===r.SHORT&&(Z=r.R16I),q===r.INT&&(Z=r.R32I)),E===r.RG&&(q===r.FLOAT&&(Z=r.RG32F),q===r.HALF_FLOAT&&(Z=r.RG16F),q===r.UNSIGNED_BYTE&&(Z=r.RG8)),E===r.RG_INTEGER&&(q===r.UNSIGNED_BYTE&&(Z=r.RG8UI),q===r.UNSIGNED_SHORT&&(Z=r.RG16UI),q===r.UNSIGNED_INT&&(Z=r.RG32UI),q===r.BYTE&&(Z=r.RG8I),q===r.SHORT&&(Z=r.RG16I),q===r.INT&&(Z=r.RG32I)),E===r.RGB&&q===r.UNSIGNED_INT_5_9_9_9_REV&&(Z=r.RGB9_E5),E===r.RGBA){const Et=nt?tl:pe.getTransfer(Q);q===r.FLOAT&&(Z=r.RGBA32F),q===r.HALF_FLOAT&&(Z=r.RGBA16F),q===r.UNSIGNED_BYTE&&(Z=Et===Ee?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT_4_4_4_4&&(Z=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(Z=r.RGB5_A1)}return(Z===r.R16F||Z===r.R32F||Z===r.RG16F||Z===r.RG32F||Z===r.RGBA16F||Z===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(P,E){let q;return P?E===null||E===qr||E===Gs?q=r.DEPTH24_STENCIL8:E===Di?q=r.DEPTH32F_STENCIL8:E===Ua&&(q=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===qr||E===Gs?q=r.DEPTH_COMPONENT24:E===Di?q=r.DEPTH_COMPONENT32F:E===Ua&&(q=r.DEPTH_COMPONENT16),q}function S(P,E){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==jn&&P.minFilter!==si?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function A(P){const E=P.target;E.removeEventListener("dispose",A),T(E),E.isVideoTexture&&u.delete(E)}function w(P){const E=P.target;E.removeEventListener("dispose",w),y(E)}function T(P){const E=n.get(P);if(E.__webglInit===void 0)return;const q=P.source,Q=h.get(q);if(Q){const nt=Q[E.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&R(P),Object.keys(Q).length===0&&h.delete(q)}n.remove(P)}function R(P){const E=n.get(P);r.deleteTexture(E.__webglTexture);const q=P.source,Q=h.get(q);delete Q[E.__cacheKey],a.memory.textures--}function y(P){const E=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let nt=0;nt<E.__webglFramebuffer[Q].length;nt++)r.deleteFramebuffer(E.__webglFramebuffer[Q][nt]);else r.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)r.deleteFramebuffer(E.__webglFramebuffer[Q]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const q=P.textures;for(let Q=0,nt=q.length;Q<nt;Q++){const Z=n.get(q[Q]);Z.__webglTexture&&(r.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(q[Q])}n.remove(P)}let v=0;function C(){v=0}function I(){const P=v;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),v+=1,P}function F(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function B(P,E){const q=n.get(P);if(P.isVideoTexture&&W(P),P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){const Q=P.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{qt(q,P,E);return}}e.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+E)}function Y(P,E){const q=n.get(P);if(P.version>0&&q.__version!==P.version){qt(q,P,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+E)}function H(P,E){const q=n.get(P);if(P.version>0&&q.__version!==P.version){qt(q,P,E);return}e.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+E)}function G(P,E){const q=n.get(P);if(P.version>0&&q.__version!==P.version){$(q,P,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+E)}const k={[Uc]:r.REPEAT,[Dr]:r.CLAMP_TO_EDGE,[Nc]:r.MIRRORED_REPEAT},it={[jn]:r.NEAREST,[vg]:r.NEAREST_MIPMAP_NEAREST,[eo]:r.NEAREST_MIPMAP_LINEAR,[si]:r.LINEAR,[Dl]:r.LINEAR_MIPMAP_NEAREST,[Ir]:r.LINEAR_MIPMAP_LINEAR},L={[yg]:r.NEVER,[Rg]:r.ALWAYS,[Eg]:r.LESS,[xp]:r.LEQUAL,[Tg]:r.EQUAL,[Ag]:r.GEQUAL,[bg]:r.GREATER,[wg]:r.NOTEQUAL};function lt(P,E){if(E.type===Di&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===si||E.magFilter===Dl||E.magFilter===eo||E.magFilter===Ir||E.minFilter===si||E.minFilter===Dl||E.minFilter===eo||E.minFilter===Ir)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,k[E.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,k[E.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,k[E.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,it[E.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,it[E.minFilter]),E.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,L[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===jn||E.minFilter!==eo&&E.minFilter!==Ir||E.type===Di&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");r.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Ft(P,E){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",A));const Q=E.source;let nt=h.get(Q);nt===void 0&&(nt={},h.set(Q,nt));const Z=F(E);if(Z!==P.__cacheKey){nt[Z]===void 0&&(nt[Z]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,q=!0),nt[Z].usedTimes++;const Et=nt[P.__cacheKey];Et!==void 0&&(nt[P.__cacheKey].usedTimes--,Et.usedTimes===0&&R(E)),P.__cacheKey=Z,P.__webglTexture=nt[Z].texture}return q}function qt(P,E,q){let Q=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=r.TEXTURE_3D);const nt=Ft(P,E),Z=E.source;e.bindTexture(Q,P.__webglTexture,r.TEXTURE0+q);const Et=n.get(Z);if(Z.version!==Et.__version||nt===!0){e.activeTexture(r.TEXTURE0+q);const rt=pe.getPrimaries(pe.workingColorSpace),dt=E.colorSpace===$i?null:pe.getPrimaries(E.colorSpace),It=E.colorSpace===$i||rt===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let st=_(E.image,!1,i.maxTextureSize);st=wt(E,st);const _t=s.convert(E.format,E.colorSpace),Ct=s.convert(E.type);let Bt=M(E.internalFormat,_t,Ct,E.colorSpace,E.isVideoTexture);lt(Q,E);let mt;const zt=E.mipmaps,Gt=E.isVideoTexture!==!0,le=Et.__version===void 0||nt===!0,N=Z.dataReady,K=S(E,st);if(E.isDepthTexture)Bt=x(E.format===Ws,E.type),le&&(Gt?e.texStorage2D(r.TEXTURE_2D,1,Bt,st.width,st.height):e.texImage2D(r.TEXTURE_2D,0,Bt,st.width,st.height,0,_t,Ct,null));else if(E.isDataTexture)if(zt.length>0){Gt&&le&&e.texStorage2D(r.TEXTURE_2D,K,Bt,zt[0].width,zt[0].height);for(let j=0,J=zt.length;j<J;j++)mt=zt[j],Gt?N&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,mt.width,mt.height,_t,Ct,mt.data):e.texImage2D(r.TEXTURE_2D,j,Bt,mt.width,mt.height,0,_t,Ct,mt.data);E.generateMipmaps=!1}else Gt?(le&&e.texStorage2D(r.TEXTURE_2D,K,Bt,st.width,st.height),N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,st.width,st.height,_t,Ct,st.data)):e.texImage2D(r.TEXTURE_2D,0,Bt,st.width,st.height,0,_t,Ct,st.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Gt&&le&&e.texStorage3D(r.TEXTURE_2D_ARRAY,K,Bt,zt[0].width,zt[0].height,st.depth);for(let j=0,J=zt.length;j<J;j++)if(mt=zt[j],E.format!==ai)if(_t!==null)if(Gt){if(N)if(E.layerUpdates.size>0){const at=Df(mt.width,mt.height,E.format,E.type);for(const Tt of E.layerUpdates){const Yt=mt.data.subarray(Tt*at/mt.data.BYTES_PER_ELEMENT,(Tt+1)*at/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,Tt,mt.width,mt.height,1,_t,Yt,0,0)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,mt.width,mt.height,st.depth,_t,mt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,Bt,mt.width,mt.height,st.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?N&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,mt.width,mt.height,st.depth,_t,Ct,mt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,j,Bt,mt.width,mt.height,st.depth,0,_t,Ct,mt.data)}else{Gt&&le&&e.texStorage2D(r.TEXTURE_2D,K,Bt,zt[0].width,zt[0].height);for(let j=0,J=zt.length;j<J;j++)mt=zt[j],E.format!==ai?_t!==null?Gt?N&&e.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,mt.width,mt.height,_t,mt.data):e.compressedTexImage2D(r.TEXTURE_2D,j,Bt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?N&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,mt.width,mt.height,_t,Ct,mt.data):e.texImage2D(r.TEXTURE_2D,j,Bt,mt.width,mt.height,0,_t,Ct,mt.data)}else if(E.isDataArrayTexture)if(Gt){if(le&&e.texStorage3D(r.TEXTURE_2D_ARRAY,K,Bt,st.width,st.height,st.depth),N)if(E.layerUpdates.size>0){const j=Df(st.width,st.height,E.format,E.type);for(const J of E.layerUpdates){const at=st.data.subarray(J*j/st.data.BYTES_PER_ELEMENT,(J+1)*j/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,_t,Ct,at)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,_t,Ct,st.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Bt,st.width,st.height,st.depth,0,_t,Ct,st.data);else if(E.isData3DTexture)Gt?(le&&e.texStorage3D(r.TEXTURE_3D,K,Bt,st.width,st.height,st.depth),N&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,_t,Ct,st.data)):e.texImage3D(r.TEXTURE_3D,0,Bt,st.width,st.height,st.depth,0,_t,Ct,st.data);else if(E.isFramebufferTexture){if(le)if(Gt)e.texStorage2D(r.TEXTURE_2D,K,Bt,st.width,st.height);else{let j=st.width,J=st.height;for(let at=0;at<K;at++)e.texImage2D(r.TEXTURE_2D,at,Bt,j,J,0,_t,Ct,null),j>>=1,J>>=1}}else if(zt.length>0){if(Gt&&le){const j=Ot(zt[0]);e.texStorage2D(r.TEXTURE_2D,K,Bt,j.width,j.height)}for(let j=0,J=zt.length;j<J;j++)mt=zt[j],Gt?N&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,_t,Ct,mt):e.texImage2D(r.TEXTURE_2D,j,Bt,_t,Ct,mt);E.generateMipmaps=!1}else if(Gt){if(le){const j=Ot(st);e.texStorage2D(r.TEXTURE_2D,K,Bt,j.width,j.height)}N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,_t,Ct,st)}else e.texImage2D(r.TEXTURE_2D,0,Bt,_t,Ct,st);p(E)&&m(Q),Et.__version=Z.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function $(P,E,q){if(E.image.length!==6)return;const Q=Ft(P,E),nt=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+q);const Z=n.get(nt);if(nt.version!==Z.__version||Q===!0){e.activeTexture(r.TEXTURE0+q);const Et=pe.getPrimaries(pe.workingColorSpace),rt=E.colorSpace===$i?null:pe.getPrimaries(E.colorSpace),dt=E.colorSpace===$i||Et===rt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const It=E.isCompressedTexture||E.image[0].isCompressedTexture,st=E.image[0]&&E.image[0].isDataTexture,_t=[];for(let J=0;J<6;J++)!It&&!st?_t[J]=_(E.image[J],!0,i.maxCubemapSize):_t[J]=st?E.image[J].image:E.image[J],_t[J]=wt(E,_t[J]);const Ct=_t[0],Bt=s.convert(E.format,E.colorSpace),mt=s.convert(E.type),zt=M(E.internalFormat,Bt,mt,E.colorSpace),Gt=E.isVideoTexture!==!0,le=Z.__version===void 0||Q===!0,N=nt.dataReady;let K=S(E,Ct);lt(r.TEXTURE_CUBE_MAP,E);let j;if(It){Gt&&le&&e.texStorage2D(r.TEXTURE_CUBE_MAP,K,zt,Ct.width,Ct.height);for(let J=0;J<6;J++){j=_t[J].mipmaps;for(let at=0;at<j.length;at++){const Tt=j[at];E.format!==ai?Bt!==null?Gt?N&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at,0,0,Tt.width,Tt.height,Bt,Tt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at,zt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at,0,0,Tt.width,Tt.height,Bt,mt,Tt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at,zt,Tt.width,Tt.height,0,Bt,mt,Tt.data)}}}else{if(j=E.mipmaps,Gt&&le){j.length>0&&K++;const J=Ot(_t[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,K,zt,J.width,J.height)}for(let J=0;J<6;J++)if(st){Gt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_t[J].width,_t[J].height,Bt,mt,_t[J].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,zt,_t[J].width,_t[J].height,0,Bt,mt,_t[J].data);for(let at=0;at<j.length;at++){const Yt=j[at].image[J].image;Gt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at+1,0,0,Yt.width,Yt.height,Bt,mt,Yt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at+1,zt,Yt.width,Yt.height,0,Bt,mt,Yt.data)}}else{Gt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Bt,mt,_t[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,zt,Bt,mt,_t[J]);for(let at=0;at<j.length;at++){const Tt=j[at];Gt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at+1,0,0,Bt,mt,Tt.image[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,at+1,zt,Bt,mt,Tt.image[J])}}}p(E)&&m(r.TEXTURE_CUBE_MAP),Z.__version=nt.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function tt(P,E,q,Q,nt,Z){const Et=s.convert(q.format,q.colorSpace),rt=s.convert(q.type),dt=M(q.internalFormat,Et,rt,q.colorSpace);if(!n.get(E).__hasExternalTextures){const st=Math.max(1,E.width>>Z),_t=Math.max(1,E.height>>Z);nt===r.TEXTURE_3D||nt===r.TEXTURE_2D_ARRAY?e.texImage3D(nt,Z,dt,st,_t,E.depth,0,Et,rt,null):e.texImage2D(nt,Z,dt,st,_t,0,Et,rt,null)}e.bindFramebuffer(r.FRAMEBUFFER,P),gt(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,nt,n.get(q).__webglTexture,0,Xt(E)):(nt===r.TEXTURE_2D||nt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,nt,n.get(q).__webglTexture,Z),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ut(P,E,q){if(r.bindRenderbuffer(r.RENDERBUFFER,P),E.depthBuffer){const Q=E.depthTexture,nt=Q&&Q.isDepthTexture?Q.type:null,Z=x(E.stencilBuffer,nt),Et=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,rt=Xt(E);gt(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,rt,Z,E.width,E.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,rt,Z,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Z,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Et,r.RENDERBUFFER,P)}else{const Q=E.textures;for(let nt=0;nt<Q.length;nt++){const Z=Q[nt],Et=s.convert(Z.format,Z.colorSpace),rt=s.convert(Z.type),dt=M(Z.internalFormat,Et,rt,Z.colorSpace),It=Xt(E);q&&gt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,It,dt,E.width,E.height):gt(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,It,dt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,dt,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ot(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),B(E.depthTexture,0);const Q=n.get(E.depthTexture).__webglTexture,nt=Xt(E);if(E.depthTexture.format===Is)gt(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,nt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(E.depthTexture.format===Ws)gt(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,nt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function bt(P){const E=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ot(E.__webglFramebuffer,P)}else if(q){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]=r.createRenderbuffer(),ut(E.__webglDepthbuffer[Q],P,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=r.createRenderbuffer(),ut(E.__webglDepthbuffer,P,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Rt(P,E,q){const Q=n.get(P);E!==void 0&&tt(Q.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&bt(P)}function Vt(P){const E=P.texture,q=n.get(P),Q=n.get(E);P.addEventListener("dispose",w);const nt=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Et=nt.length>1;if(Et||(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=E.version,a.memory.textures++),Z){q.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[rt]=[];for(let dt=0;dt<E.mipmaps.length;dt++)q.__webglFramebuffer[rt][dt]=r.createFramebuffer()}else q.__webglFramebuffer[rt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let rt=0;rt<E.mipmaps.length;rt++)q.__webglFramebuffer[rt]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(Et)for(let rt=0,dt=nt.length;rt<dt;rt++){const It=n.get(nt[rt]);It.__webglTexture===void 0&&(It.__webglTexture=r.createTexture(),a.memory.textures++)}if(P.samples>0&&gt(P)===!1){q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let rt=0;rt<nt.length;rt++){const dt=nt[rt];q.__webglColorRenderbuffer[rt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[rt]);const It=s.convert(dt.format,dt.colorSpace),st=s.convert(dt.type),_t=M(dt.internalFormat,It,st,dt.colorSpace,P.isXRRenderTarget===!0),Ct=Xt(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct,_t,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+rt,r.RENDERBUFFER,q.__webglColorRenderbuffer[rt])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),ut(q.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){e.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),lt(r.TEXTURE_CUBE_MAP,E);for(let rt=0;rt<6;rt++)if(E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)tt(q.__webglFramebuffer[rt][dt],P,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,dt);else tt(q.__webglFramebuffer[rt],P,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);p(E)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let rt=0,dt=nt.length;rt<dt;rt++){const It=nt[rt],st=n.get(It);e.bindTexture(r.TEXTURE_2D,st.__webglTexture),lt(r.TEXTURE_2D,It),tt(q.__webglFramebuffer,P,It,r.COLOR_ATTACHMENT0+rt,r.TEXTURE_2D,0),p(It)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let rt=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(rt=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(rt,Q.__webglTexture),lt(rt,E),E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)tt(q.__webglFramebuffer[dt],P,E,r.COLOR_ATTACHMENT0,rt,dt);else tt(q.__webglFramebuffer,P,E,r.COLOR_ATTACHMENT0,rt,0);p(E)&&m(rt),e.unbindTexture()}P.depthBuffer&&bt(P)}function Zt(P){const E=P.textures;for(let q=0,Q=E.length;q<Q;q++){const nt=E[q];if(p(nt)){const Z=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Et=n.get(nt).__webglTexture;e.bindTexture(Z,Et),m(Z),e.unbindTexture()}}}const D=[],Lt=[];function Nt(P){if(P.samples>0){if(gt(P)===!1){const E=P.textures,q=P.width,Q=P.height;let nt=r.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Et=n.get(P),rt=E.length>1;if(rt)for(let dt=0;dt<E.length;dt++)e.bindFramebuffer(r.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Et.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let dt=0;dt<E.length;dt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(nt|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(nt|=r.STENCIL_BUFFER_BIT)),rt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Et.__webglColorRenderbuffer[dt]);const It=n.get(E[dt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,It,0)}r.blitFramebuffer(0,0,q,Q,0,0,q,Q,nt,r.NEAREST),l===!0&&(D.length=0,Lt.length=0,D.push(r.COLOR_ATTACHMENT0+dt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(D.push(Z),Lt.push(Z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Lt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,D))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),rt)for(let dt=0;dt<E.length;dt++){e.bindFramebuffer(r.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,Et.__webglColorRenderbuffer[dt]);const It=n.get(E[dt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Et.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,It,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const E=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Xt(P){return Math.min(i.maxSamples,P.samples)}function gt(P){const E=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function W(P){const E=a.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function wt(P,E){const q=P.colorSpace,Q=P.format,nt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==pr&&q!==$i&&(pe.getTransfer(q)===Ee?(Q!==ai||nt!==Fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),E}function Ot(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=C,this.setTexture2D=B,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=G,this.rebindTextures=Rt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=bt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=gt}function PS(r,t){function e(n,i=$i){let s;const a=pe.getTransfer(i);if(n===Fi)return r.UNSIGNED_BYTE;if(n===zu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ku)return r.UNSIGNED_SHORT_5_5_5_1;if(n===up)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===lp)return r.BYTE;if(n===cp)return r.SHORT;if(n===Ua)return r.UNSIGNED_SHORT;if(n===Bu)return r.INT;if(n===qr)return r.UNSIGNED_INT;if(n===Di)return r.FLOAT;if(n===Oa)return r.HALF_FLOAT;if(n===hp)return r.ALPHA;if(n===fp)return r.RGB;if(n===ai)return r.RGBA;if(n===dp)return r.LUMINANCE;if(n===pp)return r.LUMINANCE_ALPHA;if(n===Is)return r.DEPTH_COMPONENT;if(n===Ws)return r.DEPTH_STENCIL;if(n===mp)return r.RED;if(n===Hu)return r.RED_INTEGER;if(n===_p)return r.RG;if(n===Vu)return r.RG_INTEGER;if(n===Gu)return r.RGBA_INTEGER;if(n===Uo||n===No||n===Oo||n===Fo)if(a===Ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Uo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===No)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Uo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===No)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Oo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oc||n===Fc||n===Bc||n===zc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Oc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Bc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===kc||n===Hc||n===Vc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===kc||n===Hc)return a===Ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Vc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Gc||n===Wc||n===Xc||n===Yc||n===qc||n===$c||n===Kc||n===Zc||n===jc||n===Jc||n===Qc||n===tu||n===eu||n===nu)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Gc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$c)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Kc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Jc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qc)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===tu)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===eu)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nu)return a===Ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===iu||n===ru)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Bo)return a===Ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===iu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ru)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===gp||n===su||n===au||n===ou)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Bo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===su)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===au)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ou)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class LS extends $n{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ur extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const DS={type:"move"};class sc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(DS)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ur;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const IS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,US=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new wn,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new fr({vertexShader:IS,fragmentShader:US,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new an(new hl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OS extends Ys{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new NS,p=e.getContextAttributes();let m=null,M=null;const x=[],S=[],A=new ee;let w=null;const T=new $n;T.layers.enable(1),T.viewport=new Ge;const R=new $n;R.layers.enable(2),R.viewport=new Ge;const y=[T,R],v=new LS;v.layers.enable(1),v.layers.enable(2);let C=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let tt=x[$];return tt===void 0&&(tt=new sc,x[$]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function($){let tt=x[$];return tt===void 0&&(tt=new sc,x[$]=tt),tt.getGripSpace()},this.getHand=function($){let tt=x[$];return tt===void 0&&(tt=new sc,x[$]=tt),tt.getHandSpace()};function F($){const tt=S.indexOf($.inputSource);if(tt===-1)return;const ut=x[tt];ut!==void 0&&(ut.update($.inputSource,$.frame,c||a),ut.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",Y);for(let $=0;$<x.length;$++){const tt=S[$];tt!==null&&(S[$]=null,x[$].disconnect(tt))}C=null,I=null,_.reset(),t.setRenderTarget(m),d=null,h=null,f=null,i=null,M=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",B),i.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(A),i.renderState.layers===void 0){const tt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new $r(d.framebufferWidth,d.framebufferHeight,{format:ai,type:Fi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let tt=null,ut=null,ot=null;p.depth&&(ot=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=p.stencil?Ws:Is,ut=p.stencil?Gs:qr);const bt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};f=new XRWebGLBinding(i,e),h=f.createProjectionLayer(bt),i.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new $r(h.textureWidth,h.textureHeight,{format:ai,type:Fi,depthTexture:new Up(h.textureWidth,h.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),qt.setContext(i),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y($){for(let tt=0;tt<$.removed.length;tt++){const ut=$.removed[tt],ot=S.indexOf(ut);ot>=0&&(S[ot]=null,x[ot].disconnect(ut))}for(let tt=0;tt<$.added.length;tt++){const ut=$.added[tt];let ot=S.indexOf(ut);if(ot===-1){for(let Rt=0;Rt<x.length;Rt++)if(Rt>=S.length){S.push(ut),ot=Rt;break}else if(S[Rt]===null){S[Rt]=ut,ot=Rt;break}if(ot===-1)break}const bt=x[ot];bt&&bt.connect(ut)}}const H=new X,G=new X;function k($,tt,ut){H.setFromMatrixPosition(tt.matrixWorld),G.setFromMatrixPosition(ut.matrixWorld);const ot=H.distanceTo(G),bt=tt.projectionMatrix.elements,Rt=ut.projectionMatrix.elements,Vt=bt[14]/(bt[10]-1),Zt=bt[14]/(bt[10]+1),D=(bt[9]+1)/bt[5],Lt=(bt[9]-1)/bt[5],Nt=(bt[8]-1)/bt[0],Xt=(Rt[8]+1)/Rt[0],gt=Vt*Nt,W=Vt*Xt,wt=ot/(-Nt+Xt),Ot=wt*-Nt;tt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ot),$.translateZ(wt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const P=Vt+wt,E=Zt+wt,q=gt-Ot,Q=W+(ot-Ot),nt=D*Zt/E*P,Z=Lt*Zt/E*P;$.projectionMatrix.makePerspective(q,Q,nt,Z,P,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function it($,tt){tt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(tt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;_.texture!==null&&($.near=_.depthNear,$.far=_.depthFar),v.near=R.near=T.near=$.near,v.far=R.far=T.far=$.far,(C!==v.near||I!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),C=v.near,I=v.far,T.near=C,T.far=I,R.near=C,R.far=I,T.updateProjectionMatrix(),R.updateProjectionMatrix(),$.updateProjectionMatrix());const tt=$.parent,ut=v.cameras;it(v,tt);for(let ot=0;ot<ut.length;ot++)it(ut[ot],tt);ut.length===2?k(v,T,R):v.projectionMatrix.copy(T.projectionMatrix),L($,v,tt)};function L($,tt,ut){ut===null?$.matrix.copy(tt.matrixWorld):($.matrix.copy(ut.matrixWorld),$.matrix.invert(),$.matrix.multiply(tt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=lu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let lt=null;function Ft($,tt){if(u=tt.getViewerPose(c||a),g=tt,u!==null){const ut=u.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let ot=!1;ut.length!==v.cameras.length&&(v.cameras.length=0,ot=!0);for(let Rt=0;Rt<ut.length;Rt++){const Vt=ut[Rt];let Zt=null;if(d!==null)Zt=d.getViewport(Vt);else{const Lt=f.getViewSubImage(h,Vt);Zt=Lt.viewport,Rt===0&&(t.setRenderTargetTextures(M,Lt.colorTexture,h.ignoreDepthValues?void 0:Lt.depthStencilTexture),t.setRenderTarget(M))}let D=y[Rt];D===void 0&&(D=new $n,D.layers.enable(Rt),D.viewport=new Ge,y[Rt]=D),D.matrix.fromArray(Vt.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(Vt.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Rt===0&&(v.matrix.copy(D.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ot===!0&&v.cameras.push(D)}const bt=i.enabledFeatures;if(bt&&bt.includes("depth-sensing")){const Rt=f.getDepthInformation(ut[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,i.renderState)}}for(let ut=0;ut<x.length;ut++){const ot=S[ut],bt=x[ut];ot!==null&&bt!==void 0&&bt.update(ot,tt,c||a)}lt&&lt($,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const qt=new Dp;qt.setAnimationLoop(Ft),this.setAnimationLoop=function($){lt=$},this.dispose=function(){}}}const yr=new Bi,FS=new Ie;function BS(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Cp(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,M,x,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===bn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===bn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=t.get(m),x=M.envMap,S=M.envMapRotation;x&&(p.envMap.value=x,yr.copy(S),yr.x*=-1,yr.y*=-1,yr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(yr.y*=-1,yr.z*=-1),p.envMapRotation.value.setFromMatrix4(FS.makeRotationFromEuler(yr)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===bn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function zS(r,t,e,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){const S=x.program;n.uniformBlockBinding(M,S)}function c(M,x){let S=i[M.id];S===void 0&&(g(M),S=u(M),i[M.id]=S,M.addEventListener("dispose",p));const A=x.program;n.updateUBOMapping(M,A);const w=t.render.frame;s[M.id]!==w&&(h(M),s[M.id]=w)}function u(M){const x=f();M.__bindingPointIndex=x;const S=r.createBuffer(),A=M.__size,w=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,A,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,S),S}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const x=i[M.id],S=M.uniforms,A=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let w=0,T=S.length;w<T;w++){const R=Array.isArray(S[w])?S[w]:[S[w]];for(let y=0,v=R.length;y<v;y++){const C=R[y];if(d(C,w,y,A)===!0){const I=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let B=0;for(let Y=0;Y<F.length;Y++){const H=F[Y],G=_(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,I+B,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,B),B+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,x,S,A){const w=M.value,T=x+"_"+S;if(A[T]===void 0)return typeof w=="number"||typeof w=="boolean"?A[T]=w:A[T]=w.clone(),!0;{const R=A[T];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return A[T]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(M){const x=M.uniforms;let S=0;const A=16;for(let T=0,R=x.length;T<R;T++){const y=Array.isArray(x[T])?x[T]:[x[T]];for(let v=0,C=y.length;v<C;v++){const I=y[v],F=Array.isArray(I.value)?I.value:[I.value];for(let B=0,Y=F.length;B<Y;B++){const H=F[B],G=_(H),k=S%A;k!==0&&A-k<G.boundary&&(S+=A-k),I.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=G.storage}}}const w=S%A;return w>0&&(S+=A-w),M.__size=S,M.__cache={},this}function _(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function p(M){const x=M.target;x.removeEventListener("dispose",p);const S=a.indexOf(x.__bindingPointIndex);a.splice(S,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const M in i)r.deleteBuffer(i[M]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class kS{constructor(t={}){const{canvas:e=Pg(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=a;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ri,this.toneMapping=sr,this.toneMappingExposure=1;const x=this;let S=!1,A=0,w=0,T=null,R=-1,y=null;const v=new Ge,C=new Ge;let I=null;const F=new ce(0);let B=0,Y=e.width,H=e.height,G=1,k=null,it=null;const L=new Ge(0,0,Y,H),lt=new Ge(0,0,Y,H);let Ft=!1;const qt=new Yu;let $=!1,tt=!1;const ut=new Ie,ot=new X,bt=new Ge,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function Zt(){return T===null?G:1}let D=n;function Lt(b,U){return e.getContext(b,U)}try{const b={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fu}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",J,!1),e.addEventListener("webglcontextcreationerror",at,!1),D===null){const U="webgl2";if(D=Lt(U,b),D===null)throw Lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Nt,Xt,gt,W,wt,Ot,P,E,q,Q,nt,Z,Et,rt,dt,It,st,_t,Ct,Bt,mt,zt,Gt,le;function N(){Nt=new qx(D),Nt.init(),zt=new PS(D,Nt),Xt=new Hx(D,Nt,t,zt),gt=new AS(D),W=new Zx(D),wt=new dS,Ot=new CS(D,Nt,gt,wt,Xt,zt,W),P=new Gx(x),E=new Yx(x),q=new i0(D),Gt=new zx(D,q),Q=new $x(D,q,W,Gt),nt=new Jx(D,Q,q,W),Ct=new jx(D,Xt,Ot),It=new Vx(wt),Z=new fS(x,P,E,Nt,Xt,Gt,It),Et=new BS(x,wt),rt=new mS,dt=new SS(Nt),_t=new Bx(x,P,E,gt,nt,h,l),st=new wS(x,nt,Xt),le=new zS(D,W,Xt,gt),Bt=new kx(D,Nt,W),mt=new Kx(D,Nt,W),W.programs=Z.programs,x.capabilities=Xt,x.extensions=Nt,x.properties=wt,x.renderLists=rt,x.shadowMap=st,x.state=gt,x.info=W}N();const K=new OS(x,D);this.xr=K,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=Nt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Nt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize(Y,H,!1))},this.getSize=function(b){return b.set(Y,H)},this.setSize=function(b,U,V=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=b,H=U,e.width=Math.floor(b*G),e.height=Math.floor(U*G),V===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(Y*G,H*G).floor()},this.setDrawingBufferSize=function(b,U,V){Y=b,H=U,G=V,e.width=Math.floor(b*V),e.height=Math.floor(U*V),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(v)},this.getViewport=function(b){return b.copy(L)},this.setViewport=function(b,U,V,z){b.isVector4?L.set(b.x,b.y,b.z,b.w):L.set(b,U,V,z),gt.viewport(v.copy(L).multiplyScalar(G).round())},this.getScissor=function(b){return b.copy(lt)},this.setScissor=function(b,U,V,z){b.isVector4?lt.set(b.x,b.y,b.z,b.w):lt.set(b,U,V,z),gt.scissor(C.copy(lt).multiplyScalar(G).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(b){gt.setScissorTest(Ft=b)},this.setOpaqueSort=function(b){k=b},this.setTransparentSort=function(b){it=b},this.getClearColor=function(b){return b.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor.apply(_t,arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha.apply(_t,arguments)},this.clear=function(b=!0,U=!0,V=!0){let z=0;if(b){let O=!1;if(T!==null){const et=T.texture.format;O=et===Gu||et===Vu||et===Hu}if(O){const et=T.texture.type,ht=et===Fi||et===qr||et===Ua||et===Gs||et===zu||et===ku,xt=_t.getClearColor(),ft=_t.getClearAlpha(),vt=xt.r,At=xt.g,Dt=xt.b;ht?(d[0]=vt,d[1]=At,d[2]=Dt,d[3]=ft,D.clearBufferuiv(D.COLOR,0,d)):(g[0]=vt,g[1]=At,g[2]=Dt,g[3]=ft,D.clearBufferiv(D.COLOR,0,g))}else z|=D.COLOR_BUFFER_BIT}U&&(z|=D.DEPTH_BUFFER_BIT),V&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",J,!1),e.removeEventListener("webglcontextcreationerror",at,!1),rt.dispose(),dt.dispose(),wt.dispose(),P.dispose(),E.dispose(),nt.dispose(),Gt.dispose(),le.dispose(),Z.dispose(),K.dispose(),K.removeEventListener("sessionstart",yt),K.removeEventListener("sessionend",se),ct.stop()};function j(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function J(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const b=W.autoReset,U=st.enabled,V=st.autoUpdate,z=st.needsUpdate,O=st.type;N(),W.autoReset=b,st.enabled=U,st.autoUpdate=V,st.needsUpdate=z,st.type=O}function at(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Tt(b){const U=b.target;U.removeEventListener("dispose",Tt),Yt(U)}function Yt(b){ge(b),wt.remove(b)}function ge(b){const U=wt.get(b).programs;U!==void 0&&(U.forEach(function(V){Z.releaseProgram(V)}),b.isShaderMaterial&&Z.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,V,z,O,et){U===null&&(U=Rt);const ht=O.isMesh&&O.matrixWorld.determinant()<0,xt=Se(b,U,V,z,O);gt.setMaterial(z,ht);let ft=V.index,vt=1;if(z.wireframe===!0){if(ft=Q.getWireframeAttribute(V),ft===void 0)return;vt=2}const At=V.drawRange,Dt=V.attributes.position;let ae=At.start*vt,me=(At.start+At.count)*vt;et!==null&&(ae=Math.max(ae,et.start*vt),me=Math.min(me,(et.start+et.count)*vt)),ft!==null?(ae=Math.max(ae,0),me=Math.min(me,ft.count)):Dt!=null&&(ae=Math.max(ae,0),me=Math.min(me,Dt.count));const oe=me-ae;if(oe<0||oe===1/0)return;Gt.setup(O,z,xt,V,ft);let ke,ie=Bt;if(ft!==null&&(ke=q.get(ft),ie=mt,ie.setIndex(ke)),O.isMesh)z.wireframe===!0?(gt.setLineWidth(z.wireframeLinewidth*Zt()),ie.setMode(D.LINES)):ie.setMode(D.TRIANGLES);else if(O.isLine){let St=z.linewidth;St===void 0&&(St=1),gt.setLineWidth(St*Zt()),O.isLineSegments?ie.setMode(D.LINES):O.isLineLoop?ie.setMode(D.LINE_LOOP):ie.setMode(D.LINE_STRIP)}else O.isPoints?ie.setMode(D.POINTS):O.isSprite&&ie.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ie.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Nt.get("WEBGL_multi_draw"))ie.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const St=O._multiDrawStarts,Ze=O._multiDrawCounts,ue=O._multiDrawCount,Qn=ft?q.get(ft).bytesPerElement:1,jr=wt.get(z).currentProgram.getUniforms();for(let Cn=0;Cn<ue;Cn++)jr.setValue(D,"_gl_DrawID",Cn),ie.render(St[Cn]/Qn,Ze[Cn])}else if(O.isInstancedMesh)ie.renderInstances(ae,oe,O.count);else if(V.isInstancedBufferGeometry){const St=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ze=Math.min(V.instanceCount,St);ie.renderInstances(ae,oe,Ze)}else ie.render(ae,oe)};function ve(b,U,V){b.transparent===!0&&b.side===Pi&&b.forceSinglePass===!1?(b.side=bn,b.needsUpdate=!0,Me(b,U,V),b.side=ur,b.needsUpdate=!0,Me(b,U,V),b.side=Pi):Me(b,U,V)}this.compile=function(b,U,V=null){V===null&&(V=b),p=dt.get(V),p.init(U),M.push(p),V.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),b!==V&&b.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const z=new Set;return b.traverse(function(O){const et=O.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const xt=et[ht];ve(xt,V,O),z.add(xt)}else ve(et,V,O),z.add(et)}),M.pop(),p=null,z},this.compileAsync=function(b,U,V=null){const z=this.compile(b,U,V);return new Promise(O=>{function et(){if(z.forEach(function(ht){wt.get(ht).currentProgram.isReady()&&z.delete(ht)}),z.size===0){O(b);return}setTimeout(et,10)}Nt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let ne=null;function Ut(b){ne&&ne(b)}function yt(){ct.stop()}function se(){ct.start()}const ct=new Dp;ct.setAnimationLoop(Ut),typeof self<"u"&&ct.setContext(self),this.setAnimationLoop=function(b){ne=b,K.setAnimationLoop(b),b===null?ct.stop():ct.start()},K.addEventListener("sessionstart",yt),K.addEventListener("sessionend",se),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(U),U=K.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,U,T),p=dt.get(b,M.length),p.init(U),M.push(p),ut.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),qt.setFromProjectionMatrix(ut),tt=this.localClippingEnabled,$=It.init(this.clippingPlanes,tt),_=rt.get(b,m.length),_.init(),m.push(_),K.enabled===!0&&K.isPresenting===!0){const et=x.xr.getDepthSensingMesh();et!==null&&kt(et,U,-1/0,x.sortObjects)}kt(b,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(k,it),Vt=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Vt&&_t.addToRenderList(_,b),this.info.render.frame++,$===!0&&It.beginShadows();const V=p.state.shadowsArray;st.render(V,b,U),$===!0&&It.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=_.opaque,O=_.transmissive;if(p.setupLights(),U.isArrayCamera){const et=U.cameras;if(O.length>0)for(let ht=0,xt=et.length;ht<xt;ht++){const ft=et[ht];Ht(z,O,b,ft)}Vt&&_t.render(b);for(let ht=0,xt=et.length;ht<xt;ht++){const ft=et[ht];Pt(_,b,ft,ft.viewport)}}else O.length>0&&Ht(z,O,b,U),Vt&&_t.render(b),Pt(_,b,U);T!==null&&(Ot.updateMultisampleRenderTarget(T),Ot.updateRenderTargetMipmap(T)),b.isScene===!0&&b.onAfterRender(x,b,U),Gt.resetDefaultState(),R=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],$===!0&&It.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function kt(b,U,V,z){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||qt.intersectsSprite(b)){z&&bt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ut);const ht=nt.update(b),xt=b.material;xt.visible&&_.push(b,ht,xt,V,bt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||qt.intersectsObject(b))){const ht=nt.update(b),xt=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),bt.copy(b.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),bt.copy(ht.boundingSphere.center)),bt.applyMatrix4(b.matrixWorld).applyMatrix4(ut)),Array.isArray(xt)){const ft=ht.groups;for(let vt=0,At=ft.length;vt<At;vt++){const Dt=ft[vt],ae=xt[Dt.materialIndex];ae&&ae.visible&&_.push(b,ht,ae,V,bt.z,Dt)}}else xt.visible&&_.push(b,ht,xt,V,bt.z,null)}}const et=b.children;for(let ht=0,xt=et.length;ht<xt;ht++)kt(et[ht],U,V,z)}function Pt(b,U,V,z){const O=b.opaque,et=b.transmissive,ht=b.transparent;p.setupLightsView(V),$===!0&&It.setGlobalState(x.clippingPlanes,V),z&&gt.viewport(v.copy(z)),O.length>0&&be(O,U,V),et.length>0&&be(et,U,V),ht.length>0&&be(ht,U,V),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function Ht(b,U,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new $r(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?Oa:Fi,minFilter:Ir,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pe.workingColorSpace}));const et=p.state.transmissionRenderTarget[z.id],ht=z.viewport||v;et.setSize(ht.z,ht.w);const xt=x.getRenderTarget();x.setRenderTarget(et),x.getClearColor(F),B=x.getClearAlpha(),B<1&&x.setClearColor(16777215,.5),Vt?_t.render(V):x.clear();const ft=x.toneMapping;x.toneMapping=sr;const vt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),$===!0&&It.setGlobalState(x.clippingPlanes,z),be(b,V,z),Ot.updateMultisampleRenderTarget(et),Ot.updateRenderTargetMipmap(et),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let Dt=0,ae=U.length;Dt<ae;Dt++){const me=U[Dt],oe=me.object,ke=me.geometry,ie=me.material,St=me.group;if(ie.side===Pi&&oe.layers.test(z.layers)){const Ze=ie.side;ie.side=bn,ie.needsUpdate=!0,te(oe,V,z,ke,ie,St),ie.side=Ze,ie.needsUpdate=!0,At=!0}}At===!0&&(Ot.updateMultisampleRenderTarget(et),Ot.updateRenderTargetMipmap(et))}x.setRenderTarget(xt),x.setClearColor(F,B),vt!==void 0&&(z.viewport=vt),x.toneMapping=ft}function be(b,U,V){const z=U.isScene===!0?U.overrideMaterial:null;for(let O=0,et=b.length;O<et;O++){const ht=b[O],xt=ht.object,ft=ht.geometry,vt=z===null?ht.material:z,At=ht.group;xt.layers.test(V.layers)&&te(xt,U,V,ft,vt,At)}}function te(b,U,V,z,O,et){b.onBeforeRender(x,U,V,z,O,et),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.transparent===!0&&O.side===Pi&&O.forceSinglePass===!1?(O.side=bn,O.needsUpdate=!0,x.renderBufferDirect(V,U,z,O,b,et),O.side=ur,O.needsUpdate=!0,x.renderBufferDirect(V,U,z,O,b,et),O.side=Pi):x.renderBufferDirect(V,U,z,O,b,et),b.onAfterRender(x,U,V,z,O,et)}function Me(b,U,V){U.isScene!==!0&&(U=Rt);const z=wt.get(b),O=p.state.lights,et=p.state.shadowsArray,ht=O.state.version,xt=Z.getParameters(b,O.state,et,U,V),ft=Z.getProgramCacheKey(xt);let vt=z.programs;z.environment=b.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(b.isMeshStandardMaterial?E:P).get(b.envMap||z.environment),z.envMapRotation=z.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,vt===void 0&&(b.addEventListener("dispose",Tt),vt=new Map,z.programs=vt);let At=vt.get(ft);if(At!==void 0){if(z.currentProgram===At&&z.lightsStateVersion===ht)return ye(b,xt),At}else xt.uniforms=Z.getUniforms(b),b.onBeforeCompile(xt,x),At=Z.acquireProgram(xt,ft),vt.set(ft,At),z.uniforms=xt.uniforms;const Dt=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Dt.clippingPlanes=It.uniform),ye(b,xt),z.needsLights=Rn(b),z.lightsStateVersion=ht,z.needsLights&&(Dt.ambientLightColor.value=O.state.ambient,Dt.lightProbe.value=O.state.probe,Dt.directionalLights.value=O.state.directional,Dt.directionalLightShadows.value=O.state.directionalShadow,Dt.spotLights.value=O.state.spot,Dt.spotLightShadows.value=O.state.spotShadow,Dt.rectAreaLights.value=O.state.rectArea,Dt.ltc_1.value=O.state.rectAreaLTC1,Dt.ltc_2.value=O.state.rectAreaLTC2,Dt.pointLights.value=O.state.point,Dt.pointLightShadows.value=O.state.pointShadow,Dt.hemisphereLights.value=O.state.hemi,Dt.directionalShadowMap.value=O.state.directionalShadowMap,Dt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Dt.spotShadowMap.value=O.state.spotShadowMap,Dt.spotLightMatrix.value=O.state.spotLightMatrix,Dt.spotLightMap.value=O.state.spotLightMap,Dt.pointShadowMap.value=O.state.pointShadowMap,Dt.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=At,z.uniformsList=null,At}function ze(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=zo.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function ye(b,U){const V=wt.get(b);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Se(b,U,V,z,O){U.isScene!==!0&&(U=Rt),Ot.resetTextureUnits();const et=U.fog,ht=z.isMeshStandardMaterial?U.environment:null,xt=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:pr,ft=(z.isMeshStandardMaterial?E:P).get(z.envMap||ht),vt=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,At=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Dt=!!V.morphAttributes.position,ae=!!V.morphAttributes.normal,me=!!V.morphAttributes.color;let oe=sr;z.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(oe=x.toneMapping);const ke=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ie=ke!==void 0?ke.length:0,St=wt.get(z),Ze=p.state.lights;if($===!0&&(tt===!0||b!==y)){const Gn=b===y&&z.id===R;It.setState(z,b,Gn)}let ue=!1;z.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Ze.state.version||St.outputColorSpace!==xt||O.isBatchedMesh&&St.batching===!1||!O.isBatchedMesh&&St.batching===!0||O.isBatchedMesh&&St.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&St.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&St.instancing===!1||!O.isInstancedMesh&&St.instancing===!0||O.isSkinnedMesh&&St.skinning===!1||!O.isSkinnedMesh&&St.skinning===!0||O.isInstancedMesh&&St.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&St.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&St.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&St.instancingMorph===!1&&O.morphTexture!==null||St.envMap!==ft||z.fog===!0&&St.fog!==et||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==It.numPlanes||St.numIntersection!==It.numIntersection)||St.vertexAlphas!==vt||St.vertexTangents!==At||St.morphTargets!==Dt||St.morphNormals!==ae||St.morphColors!==me||St.toneMapping!==oe||St.morphTargetsCount!==ie)&&(ue=!0):(ue=!0,St.__version=z.version);let Qn=St.currentProgram;ue===!0&&(Qn=Me(z,U,O));let jr=!1,Cn=!1,ml=!1;const Ue=Qn.getUniforms(),ki=St.uniforms;if(gt.useProgram(Qn.program)&&(jr=!0,Cn=!0,ml=!0),z.id!==R&&(R=z.id,Cn=!0),jr||y!==b){Ue.setValue(D,"projectionMatrix",b.projectionMatrix),Ue.setValue(D,"viewMatrix",b.matrixWorldInverse);const Gn=Ue.map.cameraPosition;Gn!==void 0&&Gn.setValue(D,ot.setFromMatrixPosition(b.matrixWorld)),Xt.logarithmicDepthBuffer&&Ue.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Ue.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Cn=!0,ml=!0)}if(O.isSkinnedMesh){Ue.setOptional(D,O,"bindMatrix"),Ue.setOptional(D,O,"bindMatrixInverse");const Gn=O.skeleton;Gn&&(Gn.boneTexture===null&&Gn.computeBoneTexture(),Ue.setValue(D,"boneTexture",Gn.boneTexture,Ot))}O.isBatchedMesh&&(Ue.setOptional(D,O,"batchingTexture"),Ue.setValue(D,"batchingTexture",O._matricesTexture,Ot),Ue.setOptional(D,O,"batchingIdTexture"),Ue.setValue(D,"batchingIdTexture",O._indirectTexture,Ot),Ue.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&Ue.setValue(D,"batchingColorTexture",O._colorsTexture,Ot));const _l=V.morphAttributes;if((_l.position!==void 0||_l.normal!==void 0||_l.color!==void 0)&&Ct.update(O,V,Qn),(Cn||St.receiveShadow!==O.receiveShadow)&&(St.receiveShadow=O.receiveShadow,Ue.setValue(D,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(ki.envMap.value=ft,ki.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(ki.envMapIntensity.value=U.environmentIntensity),Cn&&(Ue.setValue(D,"toneMappingExposure",x.toneMappingExposure),St.needsLights&&fe(ki,ml),et&&z.fog===!0&&Et.refreshFogUniforms(ki,et),Et.refreshMaterialUniforms(ki,z,G,H,p.state.transmissionRenderTarget[b.id]),zo.upload(D,ze(St),ki,Ot)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(zo.upload(D,ze(St),ki,Ot),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Ue.setValue(D,"center",O.center),Ue.setValue(D,"modelViewMatrix",O.modelViewMatrix),Ue.setValue(D,"normalMatrix",O.normalMatrix),Ue.setValue(D,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Gn=z.uniformsGroups;for(let gl=0,Vp=Gn.length;gl<Vp;gl++){const Ju=Gn[gl];le.update(Ju,Qn),le.bind(Ju,Qn)}}return Qn}function fe(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function Rn(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(b,U,V){wt.get(b.texture).__webglTexture=U,wt.get(b.depthTexture).__webglTexture=V;const z=wt.get(b);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=V===void 0,z.__autoAllocateDepthBuffer||Nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){const V=wt.get(b);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,V=0){T=b,A=U,w=V;let z=!0,O=null,et=!1,ht=!1;if(b){const ft=wt.get(b);ft.__useDefaultFramebuffer!==void 0?(gt.bindFramebuffer(D.FRAMEBUFFER,null),z=!1):ft.__webglFramebuffer===void 0?Ot.setupRenderTarget(b):ft.__hasExternalTextures&&Ot.rebindTextures(b,wt.get(b.texture).__webglTexture,wt.get(b.depthTexture).__webglTexture);const vt=b.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(ht=!0);const At=wt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(At[U])?O=At[U][V]:O=At[U],et=!0):b.samples>0&&Ot.useMultisampledRTT(b)===!1?O=wt.get(b).__webglMultisampledFramebuffer:Array.isArray(At)?O=At[V]:O=At,v.copy(b.viewport),C.copy(b.scissor),I=b.scissorTest}else v.copy(L).multiplyScalar(G).floor(),C.copy(lt).multiplyScalar(G).floor(),I=Ft;if(gt.bindFramebuffer(D.FRAMEBUFFER,O)&&z&&gt.drawBuffers(b,O),gt.viewport(v),gt.scissor(C),gt.setScissorTest(I),et){const ft=wt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,ft.__webglTexture,V)}else if(ht){const ft=wt.get(b.texture),vt=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,ft.__webglTexture,V||0,vt)}R=-1},this.readRenderTargetPixels=function(b,U,V,z,O,et,ht){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=wt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ht!==void 0&&(xt=xt[ht]),xt){gt.bindFramebuffer(D.FRAMEBUFFER,xt);try{const ft=b.texture,vt=ft.format,At=ft.type;if(!Xt.textureFormatReadable(vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-z&&V>=0&&V<=b.height-O&&D.readPixels(U,V,z,O,zt.convert(vt),zt.convert(At),et)}finally{const ft=T!==null?wt.get(T).__webglFramebuffer:null;gt.bindFramebuffer(D.FRAMEBUFFER,ft)}}},this.readRenderTargetPixelsAsync=async function(b,U,V,z,O,et,ht){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=wt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ht!==void 0&&(xt=xt[ht]),xt){gt.bindFramebuffer(D.FRAMEBUFFER,xt);try{const ft=b.texture,vt=ft.format,At=ft.type;if(!Xt.textureFormatReadable(vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-z&&V>=0&&V<=b.height-O){const Dt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Dt),D.bufferData(D.PIXEL_PACK_BUFFER,et.byteLength,D.STREAM_READ),D.readPixels(U,V,z,O,zt.convert(vt),zt.convert(At),0),D.flush();const ae=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);await Lg(D,ae,4);try{D.bindBuffer(D.PIXEL_PACK_BUFFER,Dt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,et)}finally{D.deleteBuffer(Dt),D.deleteSync(ae)}return et}}finally{const ft=T!==null?wt.get(T).__webglFramebuffer:null;gt.bindFramebuffer(D.FRAMEBUFFER,ft)}}},this.copyFramebufferToTexture=function(b,U=null,V=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);const z=Math.pow(2,-V),O=Math.floor(b.image.width*z),et=Math.floor(b.image.height*z),ht=U!==null?U.x:0,xt=U!==null?U.y:0;Ot.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,ht,xt,O,et),gt.unbindTexture()},this.copyTextureToTexture=function(b,U,V=null,z=null,O=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,b=arguments[1],U=arguments[2],O=arguments[3]||0,V=null);let et,ht,xt,ft,vt,At;V!==null?(et=V.max.x-V.min.x,ht=V.max.y-V.min.y,xt=V.min.x,ft=V.min.y):(et=b.image.width,ht=b.image.height,xt=0,ft=0),z!==null?(vt=z.x,At=z.y):(vt=0,At=0);const Dt=zt.convert(U.format),ae=zt.convert(U.type);Ot.setTexture2D(U,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const me=D.getParameter(D.UNPACK_ROW_LENGTH),oe=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ke=D.getParameter(D.UNPACK_SKIP_PIXELS),ie=D.getParameter(D.UNPACK_SKIP_ROWS),St=D.getParameter(D.UNPACK_SKIP_IMAGES),Ze=b.isCompressedTexture?b.mipmaps[O]:b.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Ze.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ze.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xt),D.pixelStorei(D.UNPACK_SKIP_ROWS,ft),b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,O,vt,At,et,ht,Dt,ae,Ze.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,O,vt,At,Ze.width,Ze.height,Dt,Ze.data):D.texSubImage2D(D.TEXTURE_2D,O,vt,At,et,ht,Dt,ae,Ze),D.pixelStorei(D.UNPACK_ROW_LENGTH,me),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,oe),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,ie),D.pixelStorei(D.UNPACK_SKIP_IMAGES,St),O===0&&U.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),gt.unbindTexture()},this.copyTextureToTexture3D=function(b,U,V=null,z=null,O=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,z=arguments[1]||null,b=arguments[2],U=arguments[3],O=arguments[4]||0);let et,ht,xt,ft,vt,At,Dt,ae,me;const oe=b.isCompressedTexture?b.mipmaps[O]:b.image;V!==null?(et=V.max.x-V.min.x,ht=V.max.y-V.min.y,xt=V.max.z-V.min.z,ft=V.min.x,vt=V.min.y,At=V.min.z):(et=oe.width,ht=oe.height,xt=oe.depth,ft=0,vt=0,At=0),z!==null?(Dt=z.x,ae=z.y,me=z.z):(Dt=0,ae=0,me=0);const ke=zt.convert(U.format),ie=zt.convert(U.type);let St;if(U.isData3DTexture)Ot.setTexture3D(U,0),St=D.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)Ot.setTexture2DArray(U,0),St=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Ze=D.getParameter(D.UNPACK_ROW_LENGTH),ue=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Qn=D.getParameter(D.UNPACK_SKIP_PIXELS),jr=D.getParameter(D.UNPACK_SKIP_ROWS),Cn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,oe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,oe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ft),D.pixelStorei(D.UNPACK_SKIP_ROWS,vt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,At),b.isDataTexture||b.isData3DTexture?D.texSubImage3D(St,O,Dt,ae,me,et,ht,xt,ke,ie,oe.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(St,O,Dt,ae,me,et,ht,xt,ke,oe.data):D.texSubImage3D(St,O,Dt,ae,me,et,ht,xt,ke,ie,oe),D.pixelStorei(D.UNPACK_ROW_LENGTH,Ze),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ue),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Qn),D.pixelStorei(D.UNPACK_SKIP_ROWS,jr),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Cn),O===0&&U.generateMipmaps&&D.generateMipmap(St),gt.unbindTexture()},this.initRenderTarget=function(b){wt.get(b).__webglFramebuffer===void 0&&Ot.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ot.setTextureCube(b,0):b.isData3DTexture?Ot.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ot.setTexture2DArray(b,0):Ot.setTexture2D(b,0),gt.unbindTexture()},this.resetState=function(){A=0,w=0,T=null,gt.reset(),Gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Wu?"display-p3":"srgb",e.unpackColorSpace=pe.workingColorSpace===ul?"display-p3":"srgb"}}class $u{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ce(t),this.near=e,this.far=n}clone(){return new $u(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class HS extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bi,this.environmentIntensity=1,this.environmentRotation=new Bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ha extends zi{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],f=[],h=[],d=[];let g=0;const _=[],p=n/2;let m=0;M(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new kn(f,3)),this.setAttribute("normal",new kn(h,3)),this.setAttribute("uv",new kn(d,2));function M(){const S=new X,A=new X;let w=0;const T=(e-t)/n;for(let R=0;R<=s;R++){const y=[],v=R/s,C=v*(e-t)+t;for(let I=0;I<=i;I++){const F=I/i,B=F*l+o,Y=Math.sin(B),H=Math.cos(B);A.x=C*Y,A.y=-v*n+p,A.z=C*H,f.push(A.x,A.y,A.z),S.set(Y,T,H).normalize(),h.push(S.x,S.y,S.z),d.push(F,1-v),y.push(g++)}_.push(y)}for(let R=0;R<i;R++)for(let y=0;y<s;y++){const v=_[y][R],C=_[y+1][R],I=_[y+1][R+1],F=_[y][R+1];u.push(v,C,F),u.push(C,I,F),w+=6}c.addGroup(m,w,0),m+=w}function x(S){const A=g,w=new ee,T=new X;let R=0;const y=S===!0?t:e,v=S===!0?1:-1;for(let I=1;I<=i;I++)f.push(0,p*v,0),h.push(0,v,0),d.push(.5,.5),g++;const C=g;for(let I=0;I<=i;I++){const B=I/i*l+o,Y=Math.cos(B),H=Math.sin(B);T.x=y*H,T.y=p*v,T.z=y*Y,f.push(T.x,T.y,T.z),h.push(0,v,0),w.x=Y*.5+.5,w.y=H*.5*v+.5,d.push(w.x,w.y),g++}for(let I=0;I<i;I++){const F=A+I,B=C+I;S===!0?u.push(B,B+1,F):u.push(B+1,B,F),R+=3}c.addGroup(m,R,S===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ha(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ku extends Ha{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ku(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zu extends zi{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new kn(s,3)),this.setAttribute("normal",new kn(s.slice(),3)),this.setAttribute("uv",new kn(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const x=new X,S=new X,A=new X;for(let w=0;w<e.length;w+=3)d(e[w+0],x),d(e[w+1],S),d(e[w+2],A),l(x,S,A,M)}function l(M,x,S,A){const w=A+1,T=[];for(let R=0;R<=w;R++){T[R]=[];const y=M.clone().lerp(S,R/w),v=x.clone().lerp(S,R/w),C=w-R;for(let I=0;I<=C;I++)I===0&&R===w?T[R][I]=y:T[R][I]=y.clone().lerp(v,I/C)}for(let R=0;R<w;R++)for(let y=0;y<2*(w-R)-1;y++){const v=Math.floor(y/2);y%2===0?(h(T[R][v+1]),h(T[R+1][v]),h(T[R][v])):(h(T[R][v+1]),h(T[R+1][v+1]),h(T[R+1][v]))}}function c(M){const x=new X;for(let S=0;S<s.length;S+=3)x.x=s[S+0],x.y=s[S+1],x.z=s[S+2],x.normalize().multiplyScalar(M),s[S+0]=x.x,s[S+1]=x.y,s[S+2]=x.z}function u(){const M=new X;for(let x=0;x<s.length;x+=3){M.x=s[x+0],M.y=s[x+1],M.z=s[x+2];const S=p(M)/2/Math.PI+.5,A=m(M)/Math.PI+.5;a.push(S,1-A)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){const x=a[M+0],S=a[M+2],A=a[M+4],w=Math.max(x,S,A),T=Math.min(x,S,A);w>.9&&T<.1&&(x<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),A<.2&&(a[M+4]+=1))}}function h(M){s.push(M.x,M.y,M.z)}function d(M,x){const S=M*3;x.x=t[S+0],x.y=t[S+1],x.z=t[S+2]}function g(){const M=new X,x=new X,S=new X,A=new X,w=new ee,T=new ee,R=new ee;for(let y=0,v=0;y<s.length;y+=9,v+=6){M.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),S.set(s[y+6],s[y+7],s[y+8]),w.set(a[v+0],a[v+1]),T.set(a[v+2],a[v+3]),R.set(a[v+4],a[v+5]),A.copy(M).add(x).add(S).divideScalar(3);const C=p(A);_(w,v+0,M,C),_(T,v+2,x,C),_(R,v+4,S,C)}}function _(M,x,S,A){A<0&&M.x===1&&(a[x]=M.x-1),S.x===0&&S.z===0&&(a[x]=A/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zu(t.vertices,t.indices,t.radius,t.details)}}class dl extends Zu{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new dl(t.radius,t.detail)}}class VS extends ka{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ce(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vp,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class zp extends ln{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ce(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const ac=new Ie,If=new X,Uf=new X;class GS{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yu,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new Ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;If.setFromMatrixPosition(t.matrixWorld),e.position.copy(If),Uf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Uf),e.updateMatrixWorld(),ac.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ac),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ac)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class WS extends GS{constructor(){super(new Ip(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class XS extends zp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new WS}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class YS extends zp{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fu);const _i={cream:16052198,forest:2047275,tomato:16734774,mustard:15906565,ink:1315087},Kr=r=>new VS({color:r,flatShading:!0,transparent:!0,opacity:.9}),Nf=(r,t,e)=>{r.traverse(n=>{n.material&&(n.material.transparent=!0,n.material.opacity=t)}),r.scale.setScalar(e)},kp=()=>{const r=new Ur,t=new an(new hr(1.7,.18,1.2),Kr(_i.tomato)),e=new an(new hr(1.55,.3,1.06),Kr(_i.cream));return e.position.y=.12,r.add(t,e),r},uu=()=>{const r=new Ur,t=new an(new Ha(.12,.12,2.1,8),Kr(_i.mustard));t.rotation.z=Math.PI/2;const e=new an(new Ku(.12,.32,8),Kr(_i.ink));return e.rotation.z=-Math.PI/2,e.position.x=1.2,r.add(t,e),r},Hp=()=>{const r=new Ur,t=new an(new dl(.65,1),Kr(_i.mustard)),e=new an(new Ha(.26,.3,.42,8),Kr(_i.ink));return e.position.y=-.62,r.add(t,e),r},oc=(r,t)=>{if(r==="book")return kp();if(r==="pencil")return uu();if(r==="bulb")return Hp();const e=r==="sphere"?new dl(.55,0):new hr(.82,.82,.82);return new an(e,Kr(t))},qS=()=>{const r=document.querySelector("#scene-canvas");if(!r||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return{destroy:()=>{}};const t=new HS;t.fog=new $u(_i.cream,14,30);const e=new $n(32,innerWidth/innerHeight,.1,100);e.position.set(0,.2,8);const n=new kS({canvas:r,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio,2)),n.setSize(innerWidth,innerHeight),n.outputColorSpace=ri;const i=new YS(16775144,1.25),s=new XS(16777215,2.6);s.position.set(3,5,6),t.add(i,s);const a=[{mesh:kp(),position:[-2.4,1.2,0],scale:.92},{mesh:uu(),position:[2.4,1.2,-.4],scale:.85},{mesh:oc("cube",_i.forest),position:[-2.7,-1.5,-.2],scale:.8},{mesh:oc("sphere",_i.tomato),position:[2.7,-1.2,-.4],scale:.75},{mesh:Hp(),position:[0,1.8,-1],scale:.72}];innerWidth>650&&(a.push({mesh:oc("cube",_i.mustard),position:[-.9,-1.6,-.5],scale:.55}),a.push({mesh:uu(),position:[1.2,-1.7,-1],scale:.55})),a.forEach(({mesh:_,position:p,scale:m},M)=>{_.position.set(...p),Nf(_,.9,m),_.userData.base=_.position.clone(),_.userData.baseScale=m,_.userData.offset=M*1.7,t.add(_)});const o={x:0,y:0},l=_=>{o.x=(_.clientX/innerWidth-.5)*2,o.y=(_.clientY/innerHeight-.5)*2},c=()=>{e.aspect=innerWidth/innerHeight,e.updateProjectionMatrix(),n.setSize(innerWidth,innerHeight)};addEventListener("pointermove",l),addEventListener("resize",c);let u=0,f=!1;const h=()=>{f=document.hidden};addEventListener("visibilitychange",h);const d=_=>{u=requestAnimationFrame(d),!f&&(a.forEach(({mesh:p},m)=>{const M=p.userData.offset;p.rotation.x+=.002+m*3e-4,p.rotation.y+=.003,p.position.y=p.userData.base.y+Math.sin(_*7e-4+M)*.14,p.position.x=p.userData.base.x+o.x*(.07+m*.014);const x=Math.abs(p.position.x)<1.55&&p.position.y>-1.15&&p.position.y<1.75;Nf(p,x?.35:.9,x?p.userData.baseScale*.6:p.userData.baseScale)}),e.position.x+=(o.x*.15-e.position.x)*.02,e.position.y+=(-o.y*.1+.2-e.position.y)*.02,n.render(t,e))};u=requestAnimationFrame(d);const g=()=>{const _=Math.min(scrollY/innerHeight,4);Be.to(e.position,{z:8-_*.4,duration:.8,overwrite:!0}),a.forEach(({mesh:p},m)=>Be.to(p.rotation,{z:_*(m%2?-.7:.7),duration:.9,overwrite:!0}))};return addEventListener("scroll",g,{passive:!0}),{destroy:()=>{cancelAnimationFrame(u),removeEventListener("pointermove",l),removeEventListener("resize",c),removeEventListener("visibilitychange",h),removeEventListener("scroll",g),n.dispose()}}};Be.registerPlugin(Wt);const pl=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Le=(r,t=document)=>t.querySelector(r),ju=(r,t=document)=>[...t.querySelectorAll(r)];let ui,ya,Nr,di,Or,To;const $S=(r,t)=>`
  <article class="program-card program-card--${r.accent}" data-cursor="Daftar">
    <div class="program-card__top"><span>0${t+1}</span><span>${r.level}</span></div>
    <div class="program-object object--${r.accent}" aria-hidden="true"><span>${t===0?"∑":t===1?"π":t===2?"A":t===3?"✓":"文"}</span></div>
    <div class="program-card__body"><h3>${r.name}</h3><p>${r.description}</p><div class="program-card__meta"><strong>${r.price}</strong><span>${r.duration}</span></div><a href="#trial" class="card-link">Daftar <i>↗</i></a></div>
  </article>`,KS=(r,t)=>`
  <article class="tutor-card tutor-card--${r.color}" data-cursor="Kenalan">
    <div class="tutor-card__portrait"><span>${r.initials}</span><b>0${t+1}</b></div>
    <div class="tutor-card__info"><div><h3>${r.name}</h3><span class="subject-pill">${r.subject}</span></div><p>${r.bio}</p></div>
  </article>`,ZS=r=>`
  <article class="testimonial"><div class="testimonial__quote">“</div><blockquote>${r.quote}</blockquote><div class="testimonial__person"><span>${r.name}</span><small>${r.role}</small></div><strong>${r.result}</strong></article>`,jS=({programs:r,testimonials:t,tutors:e,stats:n})=>{const i=Le("#program-rail"),s=Le("#program-select");i&&(i.innerHTML=r.map($S).join("")),s&&(s.innerHTML=`<option value="">Pilih program</option>${r.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}`);const a=Le("#tutor-grid"),o=Le("#testimonial-track"),l=Le("#stats-grid");a&&(a.innerHTML=e.map(KS).join("")),o&&(o.innerHTML=t.map(ZS).join("")),l&&(l.innerHTML=n.map(c=>`<div class="stat"><strong data-value="${c.value}" data-suffix="${c.suffix}">0${c.suffix}</strong><span>${c.label}</span></div>`).join(""))},JS=()=>{const r=Le("#preloader"),t=Le("#loader-count"),e=Le("#loader-line");if(!r||!t||!e)return;let n=!1;try{n=sessionStorage.getItem("rt-loaded")==="true"}catch{n=!1}if(n||pl){r.classList.add("is-done");return}let i=0;const s=setInterval(()=>{i+=Math.ceil(Math.random()*9),i>=100&&(i=100,clearInterval(s),setTimeout(()=>{r.classList.add("is-done");try{sessionStorage.setItem("rt-loaded","true")}catch{}},420)),t.textContent=i,e.style.width=`${i}%`},45)},QS=()=>{pl||(ui=new $p({duration:1.15,smoothWheel:!0}),ui.on("scroll",Wt.update),ya=r=>ui==null?void 0:ui.raf(r*1e3),Be.ticker.add(ya),Be.ticker.lagSmoothing(0),ju('a[href^="#"]').forEach(r=>r.addEventListener("click",t=>{const e=Le(r.getAttribute("href"));e&&(t.preventDefault(),ui.scrollTo(e,{offset:-16}))})))},ty=()=>{const r=Be.utils.toArray(".section-heading, .why__intro, .reason, .programs__header, .results__head, .stat, .testimonial, .tutors__intro, .tutor-card, .trial__copy, .trial-form, .footer__top");r.forEach(t=>Be.set(t,{autoAlpha:0,y:34})),r.forEach(t=>Be.to(t,{autoAlpha:1,y:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:t,start:"top 85%",once:!0}})),window.setTimeout(()=>r.forEach(t=>Be.set(t,{autoAlpha:1,y:0})),3e3)},ey=()=>{di==null||di.revert(),di=Be.matchMedia();const r=Le("#programs"),t=Le("#program-rail");!r||!t||!t.children.length||pl||di.add({desktop:"(min-width: 768px)",mobile:"(max-width: 767px)"},e=>{const{desktop:n,mobile:i}=e.conditions;if(n){const s=()=>t.scrollWidth-window.innerWidth;Be.to(t,{x:()=>-s(),ease:"none",scrollTrigger:{id:"programs-horizontal",trigger:r,pin:!0,scrub:1,anticipatePin:1,invalidateOnRefresh:!0,end:()=>`+=${s()}`,onRefresh:()=>console.debug("[ScrollTrigger] total triggers:",Wt.getAll().length)}})}return i&&Be.set(t,{clearProps:"transform"}),()=>Be.killTweensOf(t)})},Of=()=>{if(Nr==null||Nr.revert(),di&&di.revert(),pl){document.documentElement.classList.add("reduced-motion"),ju(".section-heading, .why__intro, .reason, .programs__header, .results__head, .stat, .testimonial, .tutors__intro, .tutor-card, .trial__copy, .trial-form, .footer__top").forEach(r=>Be.set(r,{clearProps:"all",autoAlpha:1,y:0}));return}Nr=Be.context(()=>{ty(),Be.to(".marquee__track",{xPercent:-18,ease:"none",scrollTrigger:{trigger:".marquee",scrub:1,invalidateOnRefresh:!0}}),Be.to(".results-marquee__track",{skewX:5,xPercent:-14,ease:"none",scrollTrigger:{trigger:".results-marquee",scrub:1,invalidateOnRefresh:!0}}),ey()},document.body),ny(),iy()},ny=()=>{ju(".stat strong").forEach(r=>{const t=Number(r.dataset.value),e=r.dataset.suffix,n={current:0};Wt.create({trigger:r,start:"top 85%",once:!0,onEnter:()=>Be.to(n,{current:t,duration:1.5,ease:"power2.out",onUpdate:()=>{r.textContent=`${Math.round(n.current).toLocaleString("id-ID")}${e}`}})})})},iy=()=>{var c,u;const r=Le("#testimonial-track");if(!r||r.dataset.ready==="true")return;r.dataset.ready="true";let t=!1,e=0,n=0;const i=Le("#slider-progress"),s=()=>{i&&(i.style.width=`${Math.min(100,r.scrollLeft/Math.max(1,r.scrollWidth-r.clientWidth)*100+14)}%`)},a=f=>{t=!0,e=f.pageX-r.offsetLeft,n=r.scrollLeft,r.classList.add("is-dragging")},o=()=>{t=!1,r.classList.remove("is-dragging")},l=f=>{t&&(f.preventDefault(),r.scrollLeft=n-(f.pageX-r.offsetLeft-e)*1.4,s())};r.addEventListener("mousedown",a),addEventListener("mouseup",o),r.addEventListener("mouseleave",o),r.addEventListener("mousemove",l),r.addEventListener("scroll",s,{passive:!0}),(c=Le("#testimonial-prev"))==null||c.addEventListener("click",()=>r.scrollBy({left:-r.clientWidth*.75,behavior:"smooth"})),(u=Le("#testimonial-next"))==null||u.addEventListener("click",()=>r.scrollBy({left:r.clientWidth*.75,behavior:"smooth"}))},ry=()=>{if(matchMedia("(pointer: coarse)").matches)return;const r=Le("#cursor");r&&(addEventListener("pointermove",t=>{r.style.transform=`translate3d(${t.clientX}px, ${t.clientY}px, 0)`}),document.addEventListener("mouseover",t=>{const e=t.target.closest("[data-cursor]");r.dataset.label=(e==null?void 0:e.dataset.cursor)||"",r.classList.toggle("is-label",!!e)}))},sy=()=>{const r=Le("#trial-form"),t=Le("#form-error"),e=Le("#trial-success");!r||!t||!e||r.dataset.ready==="true"||(r.dataset.ready="true",r.addEventListener("submit",async n=>{n.preventDefault(),t.textContent="";const i=Object.fromEntries(new FormData(r).entries());if(!i.name.trim()||i.phone.trim().length<8||!i.grade||!i.program){t.textContent="Lengkapi semua detail dulu, ya.";return}const s=Le("button",r);s.disabled=!0,s.querySelector("span").textContent="Mengirim...";try{await U_(i),r.hidden=!0,e.hidden=!1,ay()}catch{t.textContent="Ada kendala sebentar. Coba lagi ya.",s.disabled=!1,s.querySelector("span").textContent="Kirim & jadwalkan trial"}}))},ay=()=>{const r=["#F4EFE6","#1F3D2B","#F2B705","#14110F"],t=Le(".trial");if(t)for(let e=0;e<18;e+=1){const n=document.createElement("i");n.className="confetti",n.style.left=`${45+Math.random()*40}%`,n.style.top=`${20+Math.random()*30}%`,n.style.background=r[e%r.length],n.style.setProperty("--x",`${(Math.random()-.5)*300}px`),n.style.setProperty("--y",`${-80-Math.random()*180}px`),n.style.setProperty("--r",`${Math.random()*360}deg`),t.appendChild(n),setTimeout(()=>n.remove(),1800)}},oy=()=>{Nr==null||Nr.revert(),di==null||di.revert(),Wt.getAll().forEach(r=>r.kill()),ya&&Be.ticker.remove(ya),ui==null||ui.destroy(),ui=void 0,ya=void 0,Or&&removeEventListener("resize",Or),Or=void 0},ly=async()=>To||(To=(async()=>{var r;(r=window.__ruangTumbuhCleanup)==null||r.call(window),JS(),QS(),ry(),sy(),qS();try{const t=await I_();jS(t),await document.fonts.ready,Of(),Wt.refresh(),window.setTimeout(()=>Wt.refresh(),250),Or=()=>{window.clearTimeout(Or.timer),Or.timer=window.setTimeout(()=>{Of(),Wt.refresh()},180)},addEventListener("resize",Or)}catch(t){console.error(t),document.body.classList.add("api-error")}window.__ruangTumbuhCleanup=oy})(),To);ly();
