(this["webpackJsonpfood-helper"]=this["webpackJsonpfood-helper"]||[]).push([[5],{78:function(e,t,r){"use strict";var n,c,a,s=r(2),i=r(45),l=r(1),o=["title","titleId"];function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function b(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}function h(e,t){var r=e.title,s=e.titleId,i=b(e,o);return l.createElement("svg",u({height:"512pt",viewBox:"-57 0 512 512",width:"512pt",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},i),r?l.createElement("title",{id:s},r):null,n||(n=l.createElement("path",{d:"m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"})),c||(c=l.createElement("path",{d:"m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"})),a||(a=l.createElement("path",{d:"m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"})))}var m=l.forwardRef(h),p=(r.p,r(0)),j=["id","placeholder","number","onDelete"];t.a=function(e){var t=e.id,r=e.placeholder,n=e.number,c=e.onDelete,a=Object(i.a)(e,j),l=null;return r&&(l=Object(p.jsx)("label",{htmlFor:t,className:"text-area-container__label",children:r})),Object(p.jsxs)("div",{className:"text-area-container",children:[Object(p.jsx)("textarea",Object(s.a)(Object(s.a)({},a),{},{id:t,placeholder:r,className:"text-area-container__text",rows:"4",cols:"100"})),l,c?Object(p.jsx)("span",{onClick:c,children:Object(p.jsx)(m,{className:"text-area-container__remove"})}):"",n?Object(p.jsxs)("span",{className:"text-area-container__number",onClick:function(){},children:[n,"."]}):""]})}},84:function(e,t,r){"use strict";r.r(t);var n=r(3),c=r.n(n),a=r(5),s=r(2),i=r(10),l=r(1),o=r(6),u=r(4),b=r(12),h=r(7),m=r(79),p=r(23),j=r(15),v=r(43),f=r(78),O=r(44),d=r(0),x=Object(u.b)({currentUser:p.a,currentRecipe:b.b,currentReview:m.a,reviews:m.b});t.default=Object(o.b)(x,(function(e){return{setCurrentRecipe:function(t){return e(Object(h.e)(t))},setReviews:function(t){return e(Object(O.c)(t))}}}))((function(e){var t=e.currentUser,r=e.currentRecipe,n=e.reviews,o=e.currentReview,u=e.setReviews,b=(e.setCurrentRecipe,Object(l.useState)({message:"",rate:0,user:t._id,recipe:r._id})),h=Object(i.a)(b,2),m=h[0],p=h[1],O=function(){var e=Object(a.a)(c.a.mark((function e(){var r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,m.message.trim()&&!(m.message.length<5)){e.next=4;break}return alert("Please write a Comment about this Recipe with a minimal of 5 characters."),e.abrupt("return");case 4:if(0!=m.rate){e.next=7;break}return alert("Please give your Rate to this Recipe."),e.abrupt("return");case 7:return e.next=9,Object(j.b)("/reviews","POST",m,t.token);case 9:(r=e.sent).user=t,null,a=[].concat([r]).concat(n),u(a),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),alert(e.t0.message);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){p(Object(s.a)(Object(s.a)({},m),o))}),[o]),Object(d.jsxs)("div",{className:"review-container",children:[Object(d.jsx)("div",{className:"review-container__rate",children:Object(d.jsx)(v.a,{currentUser:t})}),Object(d.jsx)("div",{className:"text",children:Object(d.jsx)(f.a,{id:"new-review",placeholder:"Write a Comment",value:m.message,onChange:function(e){p(Object(s.a)(Object(s.a)({},m),{},{message:e.target.value}))}})}),Object(d.jsx)("button",{onClick:O,children:"Add Your Comment"})]})}))}}]);
//# sourceMappingURL=5.89413fcf.chunk.js.map