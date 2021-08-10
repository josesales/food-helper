(this["webpackJsonpfood-helper"]=this["webpackJsonpfood-helper"]||[]).push([[4],{80:function(e,t,r){"use strict";var a,n,s=r(3),i=r.n(s),c=r(5),o=r(10),l=r(1),u=r(6),d=(r(4),["title","titleId"]);function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function j(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function p(e,t){var r=e.title,s=e.titleId,i=j(e,d);return l.createElement("svg",m({xmlns:"http://www.w3.org/2000/svg",height:24,viewBox:"0 0 24 24",width:24,ref:t,"aria-labelledby":s},i),r?l.createElement("title",{id:s},r):null,a||(a=l.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"})),n||(n=l.createElement("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"})))}var b=l.forwardRef(p),f=(r.p,r(7)),h=(r(12),r(0));t.a=Object(u.b)(null,(function(e){return{setImage:function(t){return e(Object(f.g)(t))},setBase64Image:function(t){return e(Object(f.d)(t))}}}))((function(e){var t=e.setImage,r=e.image,a=e.setBase64Image,n=Object(l.useState)(r||null),s=Object(o.a)(n,2),u=s[0],d=s[1];return Object(h.jsxs)("div",{className:"image-upload",children:[Object(h.jsx)("label",{htmlFor:"file-input",children:u?Object(h.jsx)("form",{encType:"multipart/form-data",children:Object(h.jsx)("img",{src:u,className:"image-upload__img"})}):Object(h.jsx)(b,{className:"image-upload__img"})}),Object(h.jsx)("input",{type:"file",accept:"image/jpeg, image/png",name:"image",id:"file-input",onChange:function(e){var r=e.target;if(r.files&&r.files[0]){var n=new FileReader;n.onload=function(e){(function(){var t=Object(c.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d(e.target.result);case 2:return t.next=4,a(e.target.result);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()},t(r.files[0]),n.readAsDataURL(r.files[0])}}})]})}))},82:function(e,t,r){"use strict";r.r(t);var a=r(31),n=r(2),s=r(3),i=r.n(s),c=r(5),o=r(10),l=r(1),u=r.n(l),d=r(33),m=r(8),j=r(16),p=r(80),b=r(12),f=r(6),h=r(4),O=r(15),g=r(23),w=r(42),v=r(0),x=Object(h.b)({image:b.d,currentUser:g.a});t.default=Object(f.b)(x,(function(e){return{setCurrentUser:function(t){return e(Object(w.b)(t))},setToken:function(t){return e(Object(w.c)(t))}}}))((function(e){var t=e.image,r=e.currentUser,s=e.setCurrentUser,b=e.setToken,f=Object(l.useState)({name:"",username:"",email:"",password:"",confirmPassword:""}),h=Object(o.a)(f,2),g=h[0],w=h[1],x=function(){if(!g.name.trim())throw new Error("Name is mandatory.");if(!g.email.trim())throw new Error("Email is mandatory.");if(!g.password.trim())throw new Error("Password is mandatory.");if(!g.confirmPassword.trim())throw new Error("Confirm Password is mandatory.");if(g.password!=g.confirmPassword)throw new Error("Password and Confirm Password don't match.")},y=function(){var e=Object(c.a)(i.a.mark((function e(){var r,a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,x(),e.next=4,Object(O.b)("/users","POST",g);case 4:if(r=e.sent,a=r.user,n=r.token,!t){e.next=10;break}return e.next=10,Object(O.d)("/users/me/avatar",t,null,n);case 10:s(a),b(n),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0),alert(e.t0.message);case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}(),P=function(e){var t=e.target,r=t.value,s=t.name;w(Object(n.a)(Object(n.a)({},g),{},Object(a.a)({},s,r)))};return Object(v.jsx)(u.a.Fragment,{children:r?Object(v.jsx)(m.a,{to:"/"}):Object(v.jsxs)("div",{className:"sign-up",children:[Object(v.jsxs)("div",{className:"user-data",children:[Object(v.jsx)("div",{className:"user-data__title",children:Object(v.jsx)("h2",{className:"heading-primary",children:"Sign Up"})}),Object(v.jsxs)("div",{className:"user-data__container",children:[Object(v.jsx)(d.a,{children:Object(v.jsx)("input",{type:"text",name:"name",id:"user-data-user-name",placeholder:"User Name",required:!0,value:g.name,onChange:P})}),Object(v.jsx)(d.a,{children:Object(v.jsx)("input",{type:"email",name:"email",id:"user-data-email",placeholder:"Email",required:!0,value:g.email,onChange:P})}),Object(v.jsx)(d.a,{children:Object(v.jsx)("input",{type:"password",name:"password",id:"user-data-password",placeholder:"Password",required:!0,value:g.password,onChange:P})}),Object(v.jsx)(d.a,{children:Object(v.jsx)("input",{type:"password",name:"confirmPassword",id:"user-data-confirm-password",placeholder:"Confirm Password",required:!0,value:g.confirmPassword,onChange:P})})]}),Object(v.jsxs)("div",{className:"user-data__button-container",children:[Object(v.jsx)("button",{onClick:y,children:"Sign Up"}),Object(v.jsx)(j.b,{className:"user-data__button-container--sign-in",to:"/login",children:"Login"})]})]}),Object(v.jsxs)("div",{className:"sign-up__avatar",children:[Object(v.jsx)("h2",{className:"heading-secondary text",children:"Avatar"}),Object(v.jsx)(p.a,{})]})]})})}))}}]);
//# sourceMappingURL=4.0f990bc3.chunk.js.map