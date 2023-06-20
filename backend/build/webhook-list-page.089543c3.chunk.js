"use strict";(self.webpackChunklms=self.webpackChunklms||[]).push([[4121],{6784:(w,D,t)=>{t.r(D),t.d(D,{default:()=>me});var e=t(67294),l=t(41647),E=t(87751),m=t(16550),v=t(86896),u=t(14087),O=t(17034),c=t(185),a=t(53979),g=t(36989),s=t(75515),L=t(29728),y=t(49066),P=t(41580),R=t(38939),S=t(49386),q=t(8060),U=t(79031),b=t(37909),H=t(41451),ee=t(63237),te=t(15234),j=t(11047),ne=t(3566),G=t(12028),le=t(89722),K=t(96315),N=t(20022),ae=t(4585),oe=t(86031),se=t(18172),re=t(36968),ie=t.n(re);const de={webhooks:[],webhooksToDelete:[],webhookToDelete:null,loadingWebhooks:!0},ce=(h,d)=>(0,se.ZP)(h,r=>{switch(d.type){case"GET_DATA_SUCCEEDED":{r.webhooks=d.data,r.loadingWebhooks=!1;break}case"TOGGLE_LOADING":{r.loadingWebhooks=!h.loadingWebhooks;break}case"SET_WEBHOOK_ENABLED":{ie()(r,["webhooks",...d.keys],d.value);break}case"SET_WEBHOOK_TO_DELETE":{r.webhookToDelete=d.id;break}case"SET_WEBHOOKS_TO_DELETE":{d.value?r.webhooksToDelete.push(d.id):r.webhooksToDelete=h.webhooksToDelete.filter(f=>f!==d.id);break}case"SET_ALL_WEBHOOKS_TO_DELETE":{h.webhooksToDelete.length===0?r.webhooksToDelete=h.webhooks.map(f=>f.id):r.webhooksToDelete=[];break}case"WEBHOOKS_DELETED":{r.webhooks=h.webhooks.filter(f=>!h.webhooksToDelete.includes(f.id)),r.webhooksToDelete=[];break}case"WEBHOOK_DELETED":{r.webhooks=h.webhooks.filter((f,k)=>k!==d.index),r.webhookToDelete=null;break}default:return r}}),Ee=()=>{const{isLoading:h,allowedActions:{canCreate:d,canRead:r,canUpdate:f,canDelete:k}}=(0,l.ss)(E.Z.settings.webhooks),C=(0,l.lm)(),p=(0,e.useRef)(!0),{formatMessage:o}=(0,v.Z)(),[he,W]=(0,e.useState)(!1),[{webhooks:B,webhooksToDelete:$,webhookToDelete:I,loadingWebhooks:Z},T]=(0,e.useReducer)(ce,de),{notifyStatus:V}=(0,u.G)(),{get:F,del:ue,post:ge,put:be}=(0,l.kY)();(0,l.go)();const{push:fe}=(0,m.k6)(),{pathname:z}=(0,m.TH)(),A=B.length,M=$.length,Q=n=>B.findIndex(i=>i.id===n);(0,e.useEffect)(()=>(p.current=!0,()=>{p.current=!1}),[]),(0,e.useEffect)(()=>{r&&(async()=>{try{const{data:{data:i}}=await F("/admin/webhooks");p.current&&(T({type:"GET_DATA_SUCCEEDED",data:i}),V("webhooks have been loaded"))}catch(i){console.log(i),p.current&&(i.code!==20&&C({type:"warning",message:{id:"notification.error"}}),T({type:"TOGGLE_LOADING"}))}})()},[r,F,V,C]);const Te=()=>{W(n=>!n)},De=()=>{I?ve():Oe()},ve=async()=>{try{await ue(`/admin/webhooks/${I}`),T({type:"WEBHOOK_DELETED",index:Q(I)})}catch(n){n.code!==20&&C({type:"warning",message:{id:"notification.error"}})}W(!1)},Oe=async()=>{const n={ids:$};try{await ge("/admin/webhooks/batch-delete",n),p.current&&T({type:"WEBHOOKS_DELETED"})}catch(i){p.current&&i.code!==20&&C({type:"warning",message:{id:"notification.error"}})}W(!1)},X=n=>{W(!0),n!=="all"&&T({type:"SET_WEBHOOK_TO_DELETE",id:n})},Le=async(n,i)=>{const Y=Q(i),Ce=B[Y],J=[Y,"isEnabled"],_={...Ce,isEnabled:n};delete _.id;try{T({type:"SET_WEBHOOK_ENABLED",keys:J,value:n}),await be(`/admin/webhooks/${i}`,_)}catch(Me){p.current&&(T({type:"SET_WEBHOOK_ENABLED",keys:J,value:!n}),Me.code!==20&&C({type:"warning",message:{id:"notification.error"}}))}},ye=()=>{T({type:"SET_ALL_WEBHOOKS_TO_DELETE"})},pe=(n,i)=>{T({type:"SET_WEBHOOKS_TO_DELETE",value:n,id:i})},x=n=>{fe(`${z}/${n}`)};return e.createElement(O.A,null,e.createElement(l.SL,{name:"Webhooks"}),e.createElement(c.o,{"aria-busy":h||Z},e.createElement(a.T,{title:o({id:"Settings.webhooks.title",defaultMessage:"Webhooks"}),subtitle:o({id:"Settings.webhooks.list.description",defaultMessage:"Get POST changes notifications"}),primaryAction:d&&!Z&&e.createElement(l.Qj,{startIcon:e.createElement(K.Z,null),variant:"default",to:`${z}/create`,size:"S"},o({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))}),M>0&&k&&e.createElement(g.Z,{startActions:e.createElement(e.Fragment,null,e.createElement(s.Z,{variant:"epsilon",textColor:"neutral600"},o({id:"Settings.webhooks.to.delete",defaultMessage:"{webhooksToDeleteLength, plural, one {# asset} other {# assets}} selected"},{webhooksToDeleteLength:M})),e.createElement(L.z,{onClick:()=>X("all"),startIcon:e.createElement(N.Z,null),size:"L",variant:"danger-light"},o({id:"global.delete",defaultMessage:"Delete"})))}),e.createElement(y.D,null,h||Z?e.createElement(P.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(l.dO,null)):A>0?e.createElement(R.i,{colCount:5,rowCount:A+1,footer:e.createElement(S.c,{onClick:()=>d?x("create"):{},icon:e.createElement(K.Z,null)},o({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))},e.createElement(q.h,null,e.createElement(U.Tr,null,e.createElement(b.Th,null,e.createElement(H.C,{"aria-label":o({id:"global.select-all-entries",defaultMessage:"Select all entries"}),indeterminate:M>0&&M<A,value:M===A,onValueChange:ye})),e.createElement(b.Th,{width:"20%"},e.createElement(s.Z,{variant:"sigma",textColor:"neutral600"},o({id:"global.name",defaultMessage:"Name"}))),e.createElement(b.Th,{width:"60%"},e.createElement(s.Z,{variant:"sigma",textColor:"neutral600"},o({id:"Settings.webhooks.form.url",defaultMessage:"URL"}))),e.createElement(b.Th,{width:"20%"},e.createElement(s.Z,{variant:"sigma",textColor:"neutral600"},o({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"}))),e.createElement(b.Th,null,e.createElement(ee.T,null,o({id:"Settings.webhooks.list.th.actions",defaultMessage:"Actions"}))))),e.createElement(te.p,null,B.map(n=>e.createElement(U.Tr,{key:n.id,...(0,l.X7)({fn:()=>x(n.id),condition:f})},e.createElement(b.Td,{...l.UW},e.createElement(H.C,{"aria-label":`${o({id:"global.select",defaultMessage:"Select"})} ${n.name}`,value:$?.includes(n.id),onValueChange:i=>pe(i,n.id),id:"select",name:"select"})),e.createElement(b.Td,null,e.createElement(s.Z,{fontWeight:"semiBold",textColor:"neutral800"},n.name)),e.createElement(b.Td,null,e.createElement(s.Z,{textColor:"neutral800"},n.url)),e.createElement(b.Td,null,e.createElement(j.k,{...l.UW},e.createElement(ne.r,{onLabel:o({id:"global.enabled",defaultMessage:"Enabled"}),offLabel:o({id:"global.disabled",defaultMessage:"Disabled"}),label:`${n.name} ${o({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})}`,selected:n.isEnabled,onChange:()=>Le(!n.isEnabled,n.id),visibleLabels:!0}))),e.createElement(b.Td,null,e.createElement(j.k,{gap:1,...l.UW},f&&e.createElement(G.h,{onClick:()=>{x(n.id)},label:o({id:"Settings.webhooks.events.update",defaultMessage:"Update"}),icon:e.createElement(ae.Z,null),noBorder:!0}),k&&e.createElement(G.h,{onClick:()=>X(n.id),label:o({id:"global.delete",defaultMessage:"Delete"}),icon:e.createElement(N.Z,null),noBorder:!0,id:`delete-${n.id}`}))))))):e.createElement(le.x,{icon:e.createElement(oe.Z,{width:"160px"}),content:o({id:"Settings.webhooks.list.empty.description",defaultMessage:"No webhooks found"}),action:e.createElement(L.z,{variant:"secondary",startIcon:e.createElement(K.Z,null),onClick:()=>d?x("create"):{}},o({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))}))),e.createElement(l.QH,{isOpen:he,onToggleDialog:Te,onConfirm:De}))},me=()=>e.createElement(l.O4,{permissions:E.Z.settings.webhooks.main},e.createElement(Ee,null))},36989:(w,D,t)=>{t.d(D,{Z:()=>c});var e=t(67294),l=t(45697),E=t(88972),m=t(41580),v=t(11047);const u=(0,E.ZP)(v.k)`
  & > * + * {
    margin-left: ${({theme:a})=>a.spaces[2]};
  }

  margin-left: ${({pullRight:a})=>a?"auto":void 0};
`,O=(0,E.ZP)(u)`
  flex-shrink: 0;
`,c=({startActions:a,endActions:g})=>a||g?e.createElement(m.x,{paddingLeft:10,paddingRight:10},e.createElement(m.x,{paddingBottom:4},e.createElement(v.k,{justifyContent:"space-between",alignItems:"flex-start"},a&&e.createElement(u,{wrap:"wrap"},a),g&&e.createElement(O,{pullRight:!0},g)))):null;c.defaultProps={endActions:void 0,startActions:void 0},c.propTypes={endActions:l.node,startActions:l.node}},3566:(w,D,t)=>{t.d(D,{r:()=>c});var e=t(67294),l=t(45697),E=t(88972),m=t(41580),v=t(11047);const u=E.ZP.div`
  background: ${({theme:a})=>a.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  height: ${24/16}rem;
  width: ${40/16}rem;

  & span {
    font-size: ${({visibleLabels:a})=>a?"1rem":0};
  }

  &:before {
    content: '';
    background: ${({theme:a})=>a.colors.neutral0};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    transition: all 0.5s;
    left: ${({theme:a})=>a.spaces[1]};
    top: ${({theme:a})=>a.spaces[1]};
  }

  @media (prefers-reduced-motion: reduce) {
    &:before {
      transition: none;
    }
  }
`,O=E.ZP.button`
  background: transparent;
  padding: 0;
  border: none;

  &[aria-checked='true'] ${u} {
    background: ${({theme:a})=>a.colors.success500};
  }

  &[aria-checked='true'] ${u}:before {
    transform: translateX(1rem);
  }
`,c=e.forwardRef(({label:a,onChange:g,onLabel:s,offLabel:L,selected:y,visibleLabels:P,...R},S)=>e.createElement(O,{ref:S,role:"switch","aria-checked":y,"aria-label":a,onClick:g,visibleLabels:P,type:"button",...R},e.createElement(v.k,null,e.createElement(u,null,e.createElement("span",null,s),e.createElement("span",null,L)),P&&e.createElement(m.x,{as:"span","aria-hidden":!0,paddingLeft:2,color:y?"success600":"danger600"},y?s:L))));c.defaultProps={onLabel:"On",offLabel:"Off",visibleLabels:!1},c.propTypes={label:l.string.isRequired,offLabel:l.string,onChange:l.func.isRequired,onLabel:l.string,selected:l.bool.isRequired,visibleLabels:l.bool},c.displayName="Switch"},49386:(w,D,t)=>{t.d(D,{c:()=>g});var e=t(67294),l=t(45697),E=t(88972),m=t(41580),v=t(70004),u=t(11047),O=t(75515);const c=(0,E.ZP)(m.x)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:s})=>s.colors.primary600};
  }
`,a=(0,E.ZP)(m.x)`
  border-radius: 0 0 ${({theme:s})=>s.borderRadius} ${({theme:s})=>s.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,g=({children:s,icon:L,...y})=>e.createElement("div",null,e.createElement(v.i,null),e.createElement(a,{as:"button",background:"primary100",padding:5,...y},e.createElement(u.k,null,e.createElement(c,{"aria-hidden":!0,background:"primary200"},L),e.createElement(m.x,{paddingLeft:3},e.createElement(O.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600"},s)))));g.propTypes={children:l.string.isRequired,icon:l.node.isRequired}}}]);
