"use strict";(self.webpackChunklms=self.webpackChunklms||[]).push([[8155],{53752:(L,w,e)=>{e.d(w,{n:()=>x});var t=e(88767),g=e(41647);const m="review-workflows",v="/admin/review-workflows";function x(c){const{get:y}=(0,g.kY)(),E=(0,t.useQueryClient)(),k=[m,c??"default"];async function W({params:l={populate:"stages"}}){try{const{data:{data:o}}=await y(`${v}/workflows/${c??""}`,{params:l});return o}catch{return null}}async function T(){await E.refetchQueries(k)}return{workflows:(0,t.useQuery)(k,W),refetchWorkflow:T}}},10307:(L,w,e)=>{e.r(w),e.d(w,{default:()=>De});var t=e(67294),g=e(94649),m=e(86896),v=e(86706),x=e(88767),c=e(41647),y=e(17034),E=e(185),k=e(53979),W=e(29728),T=e(49066),b=e(88655),l=e(85018),o=e(45697),r=e.n(o),h=e(88972),f=e(41580),A=e(11047);const I="settings_review-workflows",C="Settings/Review_Workflows/SET_WORKFLOWS",$="Settings/Review_Workflows/WORKFLOW_DELETE_STAGE",p="Settings/Review_Workflows/WORKFLOW_ADD_STAGE",R="Settings/Review_Workflows/WORKFLOW_UPDATE_STAGE";function S({status:a,data:s}){return{type:C,payload:{status:a,workflows:s}}}function K(a){return{type:$,payload:{stageId:a}}}function j(a={}){return{type:p,payload:a}}function X(a,s){return{type:R,payload:{stageId:a,...s}}}var U=e(75515),J=e(99782);const P=(0,h.ZP)(J.Z)`
  > circle {
    fill: ${({theme:a})=>a.colors.neutral150};
  }
  > path {
    fill: ${({theme:a})=>a.colors.neutral600};
  }
`,z=(0,h.ZP)(f.x)`
  border-radius: 26px;

  svg {
    height: ${({theme:a})=>a.spaces[6]};
    width: ${({theme:a})=>a.spaces[6]};

    > path {
      fill: ${({theme:a})=>a.colors.neutral600};
    }
  }

  &:hover {
    color: ${({theme:a})=>a.colors.primary600} !important;
    ${U.Z} {
      color: ${({theme:a})=>a.colors.primary600} !important;
    }

    ${P} {
      > circle {
        fill: ${({theme:a})=>a.colors.primary600};
      }
      > path {
        fill: ${({theme:a})=>a.colors.neutral100};
      }
    }
  }

  &:active {
    ${U.Z} {
      color: ${({theme:a})=>a.colors.primary600};
    }

    ${P} {
      > circle {
        fill: ${({theme:a})=>a.colors.primary600};
      }
      > path {
        fill: ${({theme:a})=>a.colors.neutral100};
      }
    }
  }
`;function G({children:a,...s}){return t.createElement(z,{as:"button",background:"neutral0",border:"neutral150",paddingBottom:3,paddingLeft:4,paddingRight:4,paddingTop:3,shadow:"filterShadow",...s},t.createElement(A.k,{gap:2},t.createElement(P,{"aria-hidden":!0}),t.createElement(U.Z,{variant:"pi",fontWeight:"bold",textColor:"neutral500"},a)))}G.propTypes={children:r().node.isRequired};var _=e(48734),q=e(74756),ee=e(12028),N=e(63081),Q=e(11276),H=e(74571),ge=e(16364),me=e(20022);function le({id:a,name:s,index:n,canDelete:D,isOpen:u=!1}){const{formatMessage:i}=(0,m.Z)(),{trackUsage:d}=(0,c.rS)(),[M,ae]=(0,t.useState)(u),B=`stages.${n}.name`,[Y,oe]=(0,g.U$)(B),F=(0,v.I0)();return t.createElement(_.U,{size:"S",variant:"primary",onToggle:()=>{ae(!M),M||d("willEditStage")},expanded:M,shadow:"tableShadow"},t.createElement(q.B,{title:s,togglePosition:"left",action:D?t.createElement(ee.h,{background:"transparent",noBorder:!0,onClick:()=>F(K(a)),label:i({id:"Settings.review-workflows.stage.delete",defaultMessage:"Delete stage"}),icon:t.createElement(me.Z,null)}):null}),t.createElement(N.v,{padding:6,background:"neutral0",hasRadius:!0},t.createElement(Q.r,{gap:4},t.createElement(H.P,{col:6},t.createElement(ge.o,{...Y,id:B,value:s,label:i({id:"Settings.review-workflows.stage.name.label",defaultMessage:"Stage name"}),error:oe.error??!1,onChange:Z=>{Y.onChange(Z),F(X(a,{name:Z.target.value}))}})))))}le.propTypes=r().shape({id:r().number.isRequired,name:r().string.isRequired,canDelete:r().bool.isRequired}).isRequired;const fe=(0,h.ZP)(f.x)`
  position: relative;
`,pe=(0,h.ZP)(f.x)`
  left: 50%;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
`;function te({stages:a}){const{formatMessage:s}=(0,m.Z)(),n=(0,v.I0)(),{trackUsage:D}=(0,c.rS)();return t.createElement(A.k,{direction:"column",gap:6,width:"100%"},t.createElement(fe,{spacing:4,width:"100%"},t.createElement(pe,{background:"neutral200",height:"100%",width:2,zIndex:1}),t.createElement(A.k,{direction:"column",alignItems:"stretch",gap:6,zIndex:2,position:"relative",as:"ol"},a.map((u,i)=>{const d=u?.id??u.__temp_key__;return t.createElement(f.x,{key:`stage-${d}`,as:"li"},t.createElement(le,{...u,id:d,index:i,canDelete:a.length>1,isOpen:!u.id}))}))),t.createElement(A.k,{direction:"column",gap:6},t.createElement(G,{type:"button",onClick:()=>{n(j({name:""})),D("willCreateStage")}},s({id:"Settings.review-workflows.stage.add",defaultMessage:"Add new stage"}))))}te.defaultProps={stages:[]},te.propTypes={stages:r().arrayOf(r().shape({id:r().number,__temp_key__:r().number,name:r().string.isRequired}))};var ie=e(18172),ve=e(18446),he=e.n(ve);const de={status:"loading",serverState:{currentWorkflow:null,workflows:[]},clientState:{currentWorkflow:{data:null,isDirty:!1,hasDeletedServerStages:!1}}};function we(a=de,s){return(0,ie.Uy)(a,n=>{const{payload:D}=s;switch(s.type){case C:{const{status:u,workflows:i}=D;if(n.status=u,i){const d=i[0];n.serverState.workflows=i,n.serverState.currentWorkflow=d,n.clientState.currentWorkflow.data=d,n.clientState.currentWorkflow.hasDeletedServerStages=!1}break}case $:{const{stageId:u}=D,{currentWorkflow:i}=a.clientState;n.clientState.currentWorkflow.data.stages=i.data.stages.filter(d=>(d?.id??d.__temp_key__)!==u),i.hasDeletedServerStages||(n.clientState.currentWorkflow.hasDeletedServerStages=!!a.serverState.currentWorkflow.stages.find(d=>d.id===u));break}case p:{const{currentWorkflow:u}=a.clientState;u.data||(n.clientState.currentWorkflow.data={stages:[]});const i=Ee(n.clientState.currentWorkflow.data.stages);n.clientState.currentWorkflow.data.stages.push({...D,__temp_key__:i});break}case R:{const{currentWorkflow:u}=a.clientState,{stageId:i,...d}=D;n.clientState.currentWorkflow.data.stages=u.data.stages.map(M=>(M.id??M.__temp_key__)===i?{...M,...d}:M);break}default:break}a.clientState.currentWorkflow.data&&(n.clientState.currentWorkflow.isDirty=!he()((0,ie.Vk)(n.clientState.currentWorkflow).data,n.serverState.currentWorkflow))})}const Ee=(a=[])=>{const s=a.map(n=>n.id??n.__temp_key__);return Math.max(...s,-1)+1};function ye(a,s){const n=(0,v.oR)();(0,t.useEffect)(()=>{n.injectReducer(a,s)},[n,a,s])}var Se=e(53752),V=e(87561);function xe({formatMessage:a}){return V.Ry({stages:V.IX().of(V.Ry().shape({name:V.Z_().required(a({id:"Settings.review-workflows.validation.stage.name",defaultMessage:"Name is required"})).max(255,a({id:"Settings.review-workflows.validation.stage.max-length",defaultMessage:"Name can not be longer than 255 characters"}))}))})}var ke=e(87751);function We(){const{trackUsage:a}=(0,c.rS)(),{formatMessage:s}=(0,m.Z)(),n=(0,v.I0)(),{put:D}=(0,c.kY)(),{formatAPIError:u}=(0,c.So)(),i=(0,c.lm)(),{workflows:d,refetchWorkflow:M}=(0,Se.n)(),{status:ae,clientState:{currentWorkflow:{data:B,isDirty:Y,hasDeletedServerStages:oe}}}=(0,v.v9)(O=>O?.[I]??de),[F,Z]=(0,t.useState)(!1),{mutateAsync:Me,isLoading:ce}=(0,x.useMutation)(async({workflowId:O,stages:ne})=>{try{const{data:{data:se}}=await D(`/admin/review-workflows/workflows/${O}/stages`,{data:ne});return se}catch(se){i({type:"warning",message:u(se)})}return null},{onError(O){i({type:"warning",message:u(O)})},onSuccess(){i({type:"success",message:{id:"notification.success.saved",defaultMessage:"Saved"}})}}),Te=(O,ne)=>Me({workflowId:O,stages:ne}),ue=async()=>{await Te(B.id,B.stages),await M(),Z(!1)},Ae=async()=>{await ue()},Ce=()=>{Z(O=>!O)},re=(0,g.TA)({enableReinitialize:!0,initialValues:B,async onSubmit(){oe?Z(!0):ue()},validationSchema:xe({formatMessage:s}),validateOnChange:!1});return ye(I,we),(0,t.useEffect)(()=>{n(S({status:d.status,data:d.data}))},[d.status,d.data,n]),(0,t.useEffect)(()=>{a("didViewWorkflow")},[]),t.createElement(c.O4,{permissions:ke.Z.settings["review-workflows"].main},t.createElement(y.A,null,t.createElement(c.SL,{name:s({id:"Settings.review-workflows.page.title",defaultMessage:"Review Workflows"})}),t.createElement(E.o,{tabIndex:-1},t.createElement(g.Hy,{value:re},t.createElement(g.l0,{onSubmit:re.handleSubmit},t.createElement(k.T,{primaryAction:t.createElement(W.z,{startIcon:t.createElement(l.Z,null),type:"submit",size:"M",disabled:!Y,loading:!F&&ce},s({id:"global.save",defaultMessage:"Save"})),title:s({id:"Settings.review-workflows.page.title",defaultMessage:"Review Workflows"}),subtitle:s({id:"Settings.review-workflows.page.subtitle",defaultMessage:"{count, plural, one {# stage} other {# stages}}"},{count:B?.stages?.length??0})}),t.createElement(T.D,null,ae==="loading"&&t.createElement(b.a,null,s({id:"Settings.review-workflows.page.isLoading",defaultMessage:"Workflow is loading"})),t.createElement(te,{stages:re.values?.stages})))),t.createElement(c.QH,{bodyText:{id:"Settings.review-workflows.page.delete.confirm.body",defaultMessage:"All entries assigned to deleted stages will be moved to the previous stage. Are you sure you want to save?"},isConfirmButtonLoading:ce,isOpen:F,onToggleDialog:Ce,onConfirm:Ae}))))}const De=We},48734:(L,w,e)=>{e.d(w,{U:()=>b,y:()=>W});var t=e(85893),g=e(67294),m=e(88972),v=e(13819),x=e(41580),c=e(11047),y=e(2504),E=e(75515);const k=({theme:l,expanded:o,variant:r,disabled:h,error:f})=>f?`1px solid ${l.colors.danger600} !important`:h?`1px solid ${l.colors.neutral150}`:o?`1px solid ${l.colors.primary600}`:r==="primary"?`1px solid ${l.colors.neutral0}`:`1px solid ${l.colors.neutral100}`,W=(0,m.ZP)(E.Z)``,T=(0,m.ZP)(x.x)`
  border: ${k};

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({theme:l})=>l.colors.primary600};

    ${W} {
      color: ${({theme:l,expanded:o})=>o?void 0:l.colors.primary700};
    }

    ${E.Z} {
      color: ${({theme:l,expanded:o})=>o?void 0:l.colors.primary600};
    }

    & > ${c.k} {
      background: ${({theme:l})=>l.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({theme:l})=>l.colors.primary200};
    }
  }
`,b=({children:l,disabled:o=!1,error:r,expanded:h=!1,hasErrorMessage:f=!0,id:A,onToggle:I,toggle:C,size:$="M",variant:p="primary",shadow:R})=>{const S=(0,y.M)(A),K=g.useMemo(()=>({expanded:h,onToggle:I,toggle:C,id:S,size:$,variant:p,disabled:o}),[o,h,S,I,$,C,p]);return(0,t.jsxs)(v.S.Provider,{value:K,children:[(0,t.jsx)(T,{"data-strapi-expanded":h,disabled:o,"aria-disabled":o,expanded:h,hasRadius:!0,variant:p,error:r,shadow:R,children:l}),r&&f&&(0,t.jsx)(x.x,{paddingTop:1,children:(0,t.jsx)(E.Z,{variant:"pi",textColor:"danger600",children:r})})]})}},63081:(L,w,e)=>{e.d(w,{v:()=>v});var t=e(85893),g=e(13819),m=e(41580);const v=({children:x,...c})=>{const{expanded:y,id:E}=(0,g.A)();if(!y)return null;const k=`accordion-content-${E}`,W=`accordion-label-${E}`,T=`accordion-desc-${E}`;return(0,t.jsx)(m.x,{role:"region",id:k,"aria-labelledby":W,"aria-describedby":T,...c,children:x})}},13819:(L,w,e)=>{e.d(w,{A:()=>m,S:()=>g});var t=e(67294);const g=(0,t.createContext)({disabled:!1,expanded:!1,id:"",size:"M",variant:"primary"}),m=()=>(0,t.useContext)(g)},74756:(L,w,e)=>{e.d(w,{B:()=>l});var t=e(85893),g=e(12645),m=e(88972),v=e(48734),x=e(13819);const c=({expanded:o,disabled:r,variant:h})=>{let f="neutral100";return o?f="primary100":r?f="neutral150":h==="primary"&&(f="neutral0"),f};var y=e(11047),E=e(52624),k=e(39785),W=e(75515);const T=(0,m.ZP)(k.A)`
  text-align: left;

  // necessary to make the ellipsis prop work on the title
  > span {
    max-width: 100%;
  }

  svg {
    width: ${14/16}rem;
    height: ${14/16}rem;

    path {
      fill: ${({theme:o,expanded:r})=>r?o.colors.primary600:o.colors.neutral500};
    }
  }
`,b=(0,m.ZP)(y.k)`
  min-height: ${({theme:o,size:r})=>o.sizes.accordions[r]};
  border-radius: ${({theme:o,expanded:r})=>r?`${o.borderRadius} ${o.borderRadius} 0 0`:o.borderRadius};

  &:hover {
    svg {
      path {
        fill: ${({theme:o})=>o.colors.primary600};
      }
    }
  }
`,l=({title:o,description:r,as:h="span",togglePosition:f="right",action:A,...I})=>{const{onToggle:C,toggle:$,expanded:p,id:R,size:S,variant:K,disabled:j}=(0,x.A)(),X=`accordion-content-${R}`,U=`accordion-label-${R}`,J=`accordion-desc-${R}`,P=S==="M"?6:4,z=S==="M"?P:P-2,G=c({expanded:p,disabled:j,variant:K}),_={as:h,fontWeight:S==="S"?"bold":void 0,id:U,textColor:p?"primary600":"neutral700",ellipsis:!0,variant:S==="M"?"delta":void 0},q=p?"primary600":"neutral600",ee=p?"primary200":"neutral200",N=S==="M"?`${32/16}rem`:`${24/16}rem`,Q=()=>{j||($&&!C?(console.warn('Deprecation warning: Usage of "toggle" prop in Accordion component is deprecated. This is discouraged and will be removed in the next major release. Please use "onToggle" instead'),$()):C&&C())},H=(0,t.jsx)(y.k,{justifyContent:"center",borderRadius:"50%",height:N,width:N,transform:p?"rotate(180deg)":void 0,"data-strapi-dropdown":!0,"aria-hidden":!0,as:"span",background:ee,cursor:j?"not-allowed":"pointer",onClick:Q,shrink:0,children:(0,t.jsx)(E.J,{as:g.Z,width:S==="M"?`${11/16}rem`:`${8/16}rem`,color:p?"primary600":"neutral600"})});return(0,t.jsx)(b,{paddingBottom:z,paddingLeft:P,paddingRight:P,paddingTop:z,background:G,expanded:p,size:S,justifyContent:"space-between",cursor:j?"not-allowed":"",children:(0,t.jsxs)(y.k,{gap:3,flex:1,maxWidth:"100%",children:[f==="left"&&H,(0,t.jsx)(T,{onClick:Q,"aria-disabled":j,"aria-expanded":p,"aria-controls":X,"aria-labelledby":U,"data-strapi-accordion-toggle":!0,expanded:p,type:"button",flex:1,minWidth:0,...I,children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.y,{..._,children:o}),r&&(0,t.jsx)(W.Z,{as:"p",id:J,textColor:q,children:r})]})}),f==="right"&&(0,t.jsxs)(y.k,{gap:3,children:[H,A]}),f==="left"&&A]})})}},99782:(L,w,e)=>{e.d(w,{Z:()=>m});var t=e(85893);const g=v=>(0,t.jsxs)("svg",{width:"1rem",height:"1rem",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...v,children:[(0,t.jsx)("circle",{cx:12,cy:12,r:12,fill:"#212134"}),(0,t.jsx)("path",{d:"M17 12.569c0 .124-.1.224-.225.224h-3.981v3.982c0 .124-.101.225-.226.225h-1.136a.225.225 0 0 1-.226-.225v-3.981H7.226A.225.225 0 0 1 7 12.567v-1.136c0-.125.1-.226.225-.226h3.982V7.226c0-.124.1-.225.224-.225h1.138c.124 0 .224.1.224.225v3.982h3.982c.124 0 .225.1.225.224v1.138Z",fill:"#F6F6F9"})]}),m=g}}]);
