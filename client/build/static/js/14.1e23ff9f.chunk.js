"use strict";(self.webpackChunkfood_helper=self.webpackChunkfood_helper||[]).push([[14],{7014:(e,s,a)=>{a.r(s),a.d(s,{default:()=>x});var n=a(2555),r=a(5043),i=a(2466),l=a(1688),t=a(2582),o=a(7708),c=a(7508),d=a(5240),g=a(2038),u=a(192),m=a(2656),p=a(953),h=a(579);const j=(0,u.j8)({currentUser:g.xu}),x=(0,c.Ng)(j,(e=>({setCurrentUser:s=>e((0,d.lt)(s)),setToken:s=>e((0,d.WG)(s)),displayMessage:s=>e((0,m.w)(s))})))((e=>{let{currentUser:s,setCurrentUser:a,setToken:d,displayMessage:g}=e;const[u,m]=(0,r.useState)({email:"",password:""}),{type:j,message:x}=(0,c.d4)((e=>e.message)),w=e=>{const{value:s,name:a}=e.target;m((0,n.A)((0,n.A)({},u),{},{[a]:s}))};return(0,h.jsx)(r.Fragment,{children:s?(0,h.jsx)(l.rd,{to:"/"}):(0,h.jsxs)(r.Fragment,{children:[j&&x?(0,h.jsx)(p.A,{type:j,message:x}):null,(0,h.jsxs)("div",{className:"login",children:[(0,h.jsx)("div",{className:"login__title ",children:(0,h.jsx)("h2",{className:"heading-primary title-margin",children:"Login"})}),(0,h.jsxs)("div",{className:"login__container",children:[(0,h.jsx)(i.A,{children:(0,h.jsx)("input",{className:"input-margin",type:"email",name:"email",id:"login-email",placeholder:"Email",required:!0,value:u.email,onChange:w})}),(0,h.jsx)(i.A,{children:(0,h.jsx)("input",{className:"input-margin",type:"password",name:"password",id:"login-password",placeholder:"Password",required:!0,value:u.password,onChange:w})})]}),(0,h.jsxs)("div",{className:"login__button-container",children:[(0,h.jsx)("button",{onClick:async e=>{try{const{user:e,token:s}=await(0,o.Vl)("/users/login","POST",u);a(e),d(s)}catch(s){window.scrollTo(0,0),g({type:"error",message:s.message})}},children:"Login"}),(0,h.jsx)(t.N_,{className:"login__button-container--sign-up",to:"/signUp",children:"Create Account"})]})]})]})})}))}}]);
//# sourceMappingURL=14.1e23ff9f.chunk.js.map