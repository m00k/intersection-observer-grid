(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{FA6U:function(e){e.exports={home:"home__MseGd"}},FDtd:function(e,t,n){"use strict";function o(e,t){H.options.__h&&H.options.__h(k,e,C||t),C=0;var n=k.__H||(k.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function r(e,t){var n=o(j++,3);!H.options.__s&&l(n.__H,t)&&(n.__=e,n.__H=t,k.__H.__h.push(n))}function _(e){return C=5,i((function(){return{current:e}}),[])}function i(e,t){var n=o(j++,7);return l(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function c(){A.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(a),e.__H.__h.forEach(u),e.__H.__h=[]}catch(t){e.__H.__h=[],H.options.__e(t,e.__v)}})),A=[]}function a(e){var t=k;"function"==typeof e.__c&&e.__c(),k=t}function u(e){var t=k;e.__c=e.__(),k=t}function l(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function s(e,t){for(var n in t)e[n]=t[n];return e}function f(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var o in t)if("__source"!==o&&e[o]!==t[o])return!0;return!1}function p(e){this.props=e}function h(e){function t(t,n){var o=s({},t);return delete o.ref,e(o,(n=t.ref||n)&&("object"!=typeof n||"current"in n)?n:null)}return t.$$typeof=I,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t}function d(){this.__u=0,this.t=null,this.__b=null}function m(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function v(){this.u=null,this.o=null}function b(){}function y(){return this.cancelBubble}function O(){return this.defaultPrevented}function g(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},_=Object.keys(e);for(o=0;o<_.length;o++)t.indexOf(n=_[o])>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(e);for(o=0;o<_.length;o++)t.indexOf(n=_[o])>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}n.r(t);var j,k,w,H=n("hosL"),C=0,A=[],E=H.options.__b,P=H.options.__r,S=H.options.diffed,F=H.options.__c,R=H.options.unmount;H.options.__b=function(e){k=null,E&&E(e)},H.options.__r=function(e){P&&P(e),j=0;var t=(k=e.__c).__H;t&&(t.__h.forEach(a),t.__h.forEach(u),t.__h=[])},H.options.diffed=function(e){S&&S(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==A.push(t)&&w===H.options.requestAnimationFrame||((w=H.options.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),x&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);x&&(t=requestAnimationFrame(n))})(c)),k=void 0},H.options.__c=function(e,t){t.some((function(e){try{e.__h.forEach(a),e.__h=e.__h.filter((function(e){return!e.__||u(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],H.options.__e(n,e.__v)}})),F&&F(e,t)},H.options.unmount=function(e){R&&R(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(a)}catch(e){H.options.__e(e,t.__v)}};var x="function"==typeof requestAnimationFrame;var D=n("Xeik"),L=n.n(D);var N=({category:e,containerRef:t,children:n})=>{const{name:o}=e,i={root:t.current,threshold:[.1,.3,.5,.7,.9]},c=_();return((e,t,n)=>{r(()=>{const o=e.current,r=new IntersectionObserver(t,n);return o&&r.observe(o),()=>{o&&r.unobserve(o)}},[e,t,n])})(c,(e=>t=>{const n=null==t?void 0:t[0];if(null!=n&&n.isIntersecting){const t=["color: #fff","background-color: #090","padding: 4px","border-radius: 2px"].join(";");console.log(`%cintersection: ${Math.round(100*(null==n?void 0:n.intersectionRatio))}% ${e}`,t)}})(o),i),Object(H.h)("section",{ref:c,class:L.a.category},Object(H.h)("h3",null,o),n)};(p.prototype=new H.Component).isPureReactComponent=!0,p.prototype.shouldComponentUpdate=function(e,t){return f(this.props,e)||f(this.state,t)};var U=H.options.__b;H.options.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),U&&U(e)};var I="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911,M=H.options.__e;H.options.__e=function(e,t,n){if(e.then)for(var o,r=t;r=r.__;)if((o=r.__c)&&o.__c)return null==t.__e&&(t.__e=n.__e,t.__k=n.__k),o.__c(e,t);M(e,t,n)};var T=H.options.unmount;H.options.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&!0===e.__h&&(e.type=null),T&&T(e)},(d.prototype=new H.Component).__c=function(e,t){var n=t.__c,o=this;null==o.t&&(o.t=[]),o.t.push(n);var r=m(o.__v),_=!1,i=function(){_||(_=!0,n.__R=null,r?r(c):c())};n.__R=i;var c=function(){if(!--o.__u){if(o.state.__e){var e=o.state.__e;o.__v.__k[0]=function e(t,n,o){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map((function(t){return e(t,n,o)})),t.__c&&t.__c.__P===n&&(t.__e&&o.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=o)),t}(e,e.__c.__P,e.__c.__O)}var t;for(o.setState({__e:o.__b=null});t=o.t.pop();)t.forceUpdate()}},a=!0===t.__h;o.__u++||a||o.setState({__e:o.__b=o.__v.__k[0]}),e.then(i,i)},d.prototype.componentWillUnmount=function(){this.t=[]},d.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=function e(t,n,o){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),t.__c.__H=null),null!=(t=s({},t)).__c&&(t.__c.__P===o&&(t.__c.__P=n),t.__c=null),t.__k=t.__k&&t.__k.map((function(t){return e(t,n,o)}))),t}(this.__b,n,o.__O=o.__P)}this.__b=null}var r=t.__e&&Object(H.createElement)(H.Fragment,null,e.fallback);return r&&(r.__h=null),[Object(H.createElement)(H.Fragment,null,t.__e?null:e.children),r]};var $=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};(v.prototype=new H.Component).__e=function(e){var t=this,n=m(t.__v),o=t.o.get(e);return o[0]++,function(r){var _=function(){t.props.revealOrder?(o.push(r),$(t,e,o)):r()};n?n(_):_()}},v.prototype.render=function(e){this.u=null,this.o=new Map;var t=Object(H.toChildArray)(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},v.prototype.componentDidUpdate=v.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(t,n){$(e,n,t)}))};var V="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,W=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,z=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(e)};H.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(H.Component.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})}));var q=H.options.event;H.options.event=function(e){return q&&(e=q(e)),e.persist=b,e.isPropagationStopped=y,e.isDefaultPrevented=O,e.nativeEvent=e};var B={configurable:!0,get:function(){return this.class}},Z=H.options.vnode;H.options.vnode=function(e){var t=e.type,n=e.props,o=n;if("string"==typeof t){for(var r in o={},n){var _=n[r];"value"===r&&"defaultValue"in n&&null==_||("defaultValue"===r&&"value"in n&&null==n.value?r="value":"download"===r&&!0===_?_="":/ondoubleclick/i.test(r)?r="ondblclick":/^onchange(textarea|input)/i.test(r+t)&&!z(n.type)?r="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(r)?r=r.toLowerCase():W.test(r)?r=r.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===_&&(_=void 0),o[r]=_)}"select"==t&&o.multiple&&Array.isArray(o.value)&&(o.value=Object(H.toChildArray)(n.children).forEach((function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)}))),"select"==t&&null!=o.defaultValue&&(o.value=Object(H.toChildArray)(n.children).forEach((function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value}))),e.props=o}t&&n.class!=n.className&&(B.enumerable="className"in n,null!=n.className&&(o.class=n.className),Object.defineProperty(o,"className",B)),e.$$typeof=V,Z&&Z(e)};var J=H.options.__r;H.options.__r=function(e){J&&J(e),e.__c};"object"==typeof performance&&"function"==typeof performance.now&&performance.now.bind(performance);var X={Category:N,Container:h((e,t)=>{const{children:n}=e,o=g(e,["children"]);return Object(H.h)("article",{ref:t,class:L.a.container,restProps:o},n)}),Header:({categories:e})=>Object(H.h)("nav",{class:L.a.header},null==e?void 0:e.map(({name:e,id:t})=>Object(H.h)("a",{key:t,href:"#"},e))),ItemDetail:({item:e})=>{const{name:t}=e;return Object(H.h)("li",{class:L.a.itemDetail},t)},ItemList:({children:e})=>Object(H.h)("ul",{className:L.a.itemList},e),WithData:()=>Object(H.h)(H.Fragment,null,"TODO")};const G=(e=>t=>new Array(e).fill(0).map(t))(16)((e,t)=>({id:t,name:"Category_"+t})),K=Math.ceil(8),Q=G.map((e,t)=>K-Math.abs(K-t-1)).map(e=>Math.max(3,3*e)),Y=(()=>{const e=[];let t=-1;return G.forEach(n=>{const o=new Array(Q[n.id]).fill(0).map(()=>(t++,{id:t,name:"Item_"+t}));e.push(o)}),e})();var ee=()=>{const e=_();return Object(H.h)(X.Container,{ref:e},Object(H.h)(X.Header,{categories:G}),G.map(t=>Object(H.h)(X.Category,{key:t.id,category:t,containerRef:e},Object(H.h)(X.ItemList,null,Y[t.id].map(e=>Object(H.h)(X.ItemDetail,{key:e.id,item:e}))))))},te=n("FA6U"),ne=n.n(te);t.default=()=>Object(H.h)("div",{class:ne.a.home},Object(H.h)(ee,null))},Xeik:function(e){e.exports={category:"category__t49Vy",container:"container__1ApzO",header:"header__1hzz4",itemDetail:"itemDetail__32ZrL",itemList:"itemList__2cNT-"}}}]);
//# sourceMappingURL=route-home.chunk.b5123.esm.js.map