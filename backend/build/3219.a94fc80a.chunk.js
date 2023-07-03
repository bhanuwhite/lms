"use strict";(self.webpackChunklms=self.webpackChunklms||[]).push([[3219],{76539:(A,y,e)=>{e.d(y,{Z:()=>E});var t=e(67294),m=e(86896),n=e(45697),s=e.n(n),M=e(79174),a=e(85018),g=e(67109),i=e(53979),o=e(11047),T=e(29728),c=e(30815),l=e(48474);const d=({onRegenerate:P,idToRegenerate:r,backUrl:L,onError:x})=>{const{formatMessage:K}=(0,m.Z)(),[S,B]=(0,t.useState)(!1),{regenerateData:W,isLoadingConfirmation:I}=(0,l.rW)(L,r,P,x),U=async()=>{W(),B(!1)};return t.createElement(t.Fragment,null,t.createElement(T.z,{startIcon:t.createElement(c.Z,null),type:"button",size:"S",variant:"tertiary",onClick:()=>B(!0),name:"regenerate"},K({id:"Settings.tokens.regenerate",defaultMessage:"Regenerate"})),t.createElement(M.QH,{bodyText:{id:"Settings.tokens.popUpWarning.message",defaultMessage:"Are you sure you want to regenerate this token?"},iconRightButton:t.createElement(c.Z,null),isConfirmButtonLoading:I,isOpen:S,onToggleDialog:()=>B(!1),onConfirm:U,leftButtonText:{id:"Settings.tokens.Button.cancel",defaultMessage:"Cancel"},rightButtonText:{id:"Settings.tokens.Button.regenerate",defaultMessage:"Regenerate"},title:{id:"Settings.tokens.RegenerateDialog.title",defaultMessage:"Regenerate token"}}))};d.defaultProps={onRegenerate(){},onError:void 0},d.propTypes={onRegenerate:s().func,idToRegenerate:s().oneOfType([s().number,s().string]).isRequired,backUrl:s().string.isRequired,onError:s().func};const f=d,p=({title:P,token:r,setToken:L,canEditInputs:x,canRegenerate:K,isSubmitting:S,backUrl:B,regenerateUrl:W,onErrorRegenerate:I})=>{const{formatMessage:U}=(0,m.Z)(),V=Y=>{L({...r,accessKey:Y})};return t.createElement(i.T,{title:r?.name||U(P),primaryAction:x?t.createElement(o.k,{gap:2},K&&r?.id&&t.createElement(f,{backUrl:W,onRegenerate:V,idToRegenerate:r?.id,onError:I}),t.createElement(T.z,{disabled:S,loading:S,startIcon:t.createElement(a.Z,null),type:"submit",size:"S"},U({id:"global.save",defaultMessage:"Save"}))):K&&r?.id&&t.createElement(f,{onRegenerate:V,idToRegenerate:r?.id,backUrl:W}),navigationAction:t.createElement(M.rU,{startIcon:t.createElement(g.Z,null),to:B},U({id:"global.back",defaultMessage:"Back"})),ellipsis:!0})};p.propTypes={token:s().shape({id:s().oneOfType([s().number,s().string]),type:s().string,lifespan:s().oneOfType([s().number,s().string]),name:s().string,accessKey:s().string,permissions:s().array,description:s().string,createdAt:s().string}),canEditInputs:s().bool.isRequired,canRegenerate:s().bool.isRequired,setToken:s().func.isRequired,isSubmitting:s().bool.isRequired,backUrl:s().string.isRequired,title:s().shape({id:s().string,label:s().string}).isRequired,regenerateUrl:s().string.isRequired,onErrorRegenerate:s().func},p.defaultProps={token:void 0,onErrorRegenerate:void 0};const E=p},60401:(A,y,e)=>{e.d(y,{Z:()=>T});var t=e(67294),m=e(45697),n=e.n(m),s=e(86896),M=e(48302),a=e(82562),g=e(75515),i=e(75056);const o=({token:c,errors:l,values:d,onChange:f,isCreating:p})=>{const{formatMessage:E}=(0,s.Z)();return t.createElement(t.Fragment,null,t.createElement(M.P,{name:"lifespan",label:E({id:"Settings.tokens.form.duration",defaultMessage:"Token duration"}),value:d.lifespan!==null?d.lifespan:"0",error:l.lifespan?E(l.lifespan?.id?l.lifespan:{id:l.lifespan,defaultMessage:l.lifespan}):null,onChange:P=>{f({target:{name:"lifespan",value:P}})},required:!0,disabled:!p,placeholder:"Select"},t.createElement(a.W,{value:"604800000"},E({id:"Settings.tokens.duration.7-days",defaultMessage:"7 days"})),t.createElement(a.W,{value:"2592000000"},E({id:"Settings.tokens.duration.30-days",defaultMessage:"30 days"})),t.createElement(a.W,{value:"7776000000"},E({id:"Settings.tokens.duration.90-days",defaultMessage:"90 days"})),t.createElement(a.W,{value:"0"},E({id:"Settings.tokens.duration.unlimited",defaultMessage:"Unlimited"}))),t.createElement(g.Z,{variant:"pi",textColor:"neutral600"},!p&&`${E({id:"Settings.tokens.duration.expiration-date",defaultMessage:"Expiration date"})}: ${(0,i.IX)(c?.createdAt,parseInt(d.lifespan,10))}`))};o.propTypes={errors:n().shape({lifespan:n().string}),onChange:n().func.isRequired,values:n().shape({lifespan:n().oneOfType([n().number,n().string])}).isRequired,isCreating:n().bool.isRequired,token:n().shape({id:n().oneOfType([n().number,n().string]),type:n().string,lifespan:n().string,name:n().string,accessKey:n().string,permissions:n().array,description:n().string,createdAt:n().string})},o.defaultProps={errors:{},token:{}};const T=o},24122:(A,y,e)=>{e.d(y,{Z:()=>l});var t=e(67294),m=e(86896),n=e(79174),s=e(12028),M=e(65186),a=e(69427),g=e(45697),i=e.n(g),o=e(74855),T=e.n(o);const c=({token:d,tokenType:f})=>{const{formatMessage:p}=(0,m.Z)(),E=(0,n.lm)(),{trackUsage:P}=(0,n.rS)(),r=(0,t.useRef)(P);return t.createElement(n.Y_,{endAction:d&&t.createElement("span",{style:{alignSelf:"start"}},t.createElement(o.CopyToClipboard,{onCopy:()=>{r.current("didCopyTokenKey",{tokenType:f}),E({type:"success",message:{id:"Settings.tokens.notification.copied"}})},text:d},t.createElement(s.h,{label:p({id:"app.component.CopyToClipboard.label",defaultMessage:"Copy to clipboard"}),noBorder:!0,icon:t.createElement(M.Z,null),style:{padding:0,height:"1rem"}}))),title:d||p({id:"Settings.tokens.copy.editTitle",defaultMessage:"This token isn\u2019t accessible anymore."}),subtitle:p(d?{id:"Settings.tokens.copy.lastWarning",defaultMessage:"Make sure to copy this token, you won\u2019t be able to see it again!"}:{id:"Settings.tokens.copy.editMessage",defaultMessage:"For security reasons, you can only see your token once."}),icon:t.createElement(a.Z,null),iconBackground:"neutral100"})};c.defaultProps={token:null},c.propTypes={token:i().string,tokenType:i().string.isRequired};const l=c},40695:(A,y,e)=>{e.d(y,{Z:()=>g});var t=e(67294),m=e(45697),n=e.n(m),s=e(86896),M=e(64256);const a=({errors:i,values:o,onChange:T,canEditInputs:c})=>{const{formatMessage:l}=(0,s.Z)();return t.createElement(M.g,{label:l({id:"Settings.tokens.form.description",defaultMessage:"Description"}),name:"description",error:i.description?l(i.description?.id?i.description:{id:i.description,defaultMessage:i.description}):null,onChange:T,disabled:!c},o.description)};a.propTypes={errors:n().shape({description:n().string}),onChange:n().func.isRequired,canEditInputs:n().bool.isRequired,values:n().shape({description:n().string}).isRequired},a.defaultProps={errors:{}};const g=a},61053:(A,y,e)=>{e.d(y,{Z:()=>g});var t=e(67294),m=e(45697),n=e.n(m),s=e(86896),M=e(16364);const a=({errors:i,values:o,onChange:T,canEditInputs:c})=>{const{formatMessage:l}=(0,s.Z)();return t.createElement(M.o,{name:"name",error:i.name?l(i.name?.id?i.name:{id:i.name,defaultMessage:i.name}):null,label:l({id:"Settings.tokens.form.name",defaultMessage:"Name"}),onChange:T,value:o.name,disabled:!c,required:!0})};a.propTypes={errors:n().shape({name:n().string}),onChange:n().func.isRequired,canEditInputs:n().bool.isRequired,values:n().shape({name:n().string}).isRequired},a.defaultProps={errors:{}};const g=a},31065:(A,y,e)=>{e.d(y,{Z:()=>i});var t=e(67294),m=e(45697),n=e.n(m),s=e(86896),M=e(48302),a=e(82562);const g=({name:o,errors:T,values:c,onChange:l,canEditInputs:d,options:f,label:p})=>{const{formatMessage:E}=(0,s.Z)();return t.createElement(M.P,{name:o,label:E({id:p.id,defaultMessage:p.defaultMessage}),value:c&&c[o],error:T[o]?E(T[o]?.id?T[o]:{id:T[o],defaultMessage:T[o]}):null,onChange:l,placeholder:"Select",required:!0,disabled:!d},f&&f.map(({value:P,label:r})=>t.createElement(a.W,{key:P,value:P},E(r))))};g.propTypes={name:n().string,options:n().arrayOf(n().shape({label:n().shape({id:n().string,defaultMessage:n().string}),value:n().string})),errors:n().shape({type:n().string}),onChange:n().func.isRequired,canEditInputs:n().bool.isRequired,values:n().shape({type:n().string}).isRequired,label:n().shape({id:n().string,defaultMessage:n().string}).isRequired},g.defaultProps={name:"type",errors:{},options:[]};const i=g},47670:(A,y,e)=>{e.d(y,{Z:()=>t,f:()=>m});const t="api-token",m="transfer-token"},75056:(A,y,e)=>{e.d(y,{IX:()=>M,fK:()=>o,mk:()=>c});var t=e(80336),m=e(77349),n=e(51991);const M=(l,d,f="en")=>{if(d&&typeof d=="number"){const p=d/24/60/60/1e3;return(0,t.Z)((0,m.Z)(new Date(l),p),"PPP",{locale:n[f]})}return"Unlimited"};var a=e(87561),g=e(79174);const o=a.Ry().shape({name:a.Z_(g.I0.string).max(100).required(g.I0.required),type:a.Z_(g.I0.string).oneOf(["read-only","full-access","custom"]).required(g.I0.required),description:a.Z_().nullable(),lifespan:a.Rx().integer().min(0).nullable().defined(g.I0.required)}),c=l=>{const d={allActionsIds:[],permissions:[]};return d.permissions=Object.keys(l).map(f=>({apiId:f,label:f.split("::")[1],controllers:Object.keys(l[f].controllers).map(p=>({controller:p,actions:l[f].controllers[p].map(E=>{const P=`${f}.${p}.${E}`;return f.includes("api::")&&d.allActionsIds.push(P),{action:E,actionId:P}}).flat()})).flat()})),d}},53219:(A,y,e)=>{e.d(y,{Z:()=>ne});var t=e(67294),m=e(86896),n=e(94649),s=e(16550),M=e(88767),a=e(79174),g=e(185),i=e(49066),o=e(11047),T=e(19631),c=e(87561);const d=c.Ry().shape({name:c.Z_(a.I0.string).max(100).required(a.I0.required),description:c.Z_().nullable(),lifespan:c.Rx().integer().min(0).nullable().defined(a.I0.required),permissions:c.Z_(a.I0.string).required(a.I0.required)});var f=e(53979),p=e(29728),E=e(85018),P=e(45697),r=e.n(P);const L=({transferTokenName:D})=>{const{formatMessage:h}=(0,m.Z)();return(0,a.go)(),t.createElement(g.o,{"aria-busy":"true"},t.createElement(a.SL,{name:"Transfer Tokens"}),t.createElement(f.T,{primaryAction:t.createElement(p.z,{disabled:!0,startIcon:t.createElement(E.Z,null),type:"button",size:"L"},h({id:"global.save",defaultMessage:"Save"})),title:D||h({id:"Settings.transferTokens.createPage.title",defaultMessage:"Create Transfer Token"})}),t.createElement(i.D,null,t.createElement(a.dO,null)))};L.defaultProps={transferTokenName:null},L.propTypes={transferTokenName:r().string};const x=L;var K=e(87751),S=e(41580),B=e(75515),W=e(11276),I=e(74571),U=e(60401),V=e(61053),Y=e(40695),b=e(31065);const H=({errors:D,onChange:h,canEditInputs:Z,isCreating:O,values:k,transferToken:v})=>{const{formatMessage:N}=(0,m.Z)(),j=[{value:"push",label:{id:"Settings.transferTokens.types.push",defaultMessage:"Push"}},{value:"pull",label:{id:"Settings.transferTokens.types.pull",defaultMessage:"Pull"}},{value:"push-pull",label:{id:"Settings.transferTokens.types.push-pull",defaultMessage:"Full Access"}}];return t.createElement(S.x,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7},t.createElement(o.k,{direction:"column",alignItems:"stretch",gap:4},t.createElement(B.Z,{variant:"delta",as:"h2"},N({id:"global.details",defaultMessage:"Details"})),t.createElement(W.r,{gap:5},t.createElement(I.P,{key:"name",col:6,xs:12},t.createElement(V.Z,{errors:D,values:k,canEditInputs:Z,onChange:h})),t.createElement(I.P,{key:"description",col:6,xs:12},t.createElement(Y.Z,{errors:D,values:k,canEditInputs:Z,onChange:h})),t.createElement(I.P,{key:"lifespan",col:6,xs:12},t.createElement(U.Z,{isCreating:O,errors:D,values:k,onChange:h,token:v})),t.createElement(I.P,{key:"permissions",col:6,xs:12},t.createElement(b.Z,{name:"permissions",values:k,errors:D,label:{id:"Settings.tokens.form.type",defaultMessage:"Token type"},onChange:F=>{h({target:{name:"permissions",value:F}})},options:j,canEditInputs:Z})))))};H.propTypes={errors:r().shape({name:r().string,description:r().string,lifespan:r().string,type:r().string}),onChange:r().func.isRequired,canEditInputs:r().bool.isRequired,values:r().shape({name:r().string,description:r().string,lifespan:r().oneOfType([r().number,r().string]),type:r().string}).isRequired,isCreating:r().bool.isRequired,transferToken:r().shape({id:r().oneOfType([r().number,r().string]),type:r().string,lifespan:r().string,name:r().string,accessKey:r().string,permissions:r().array,description:r().string,createdAt:r().string})},H.defaultProps={errors:{},transferToken:{}};const q=H;var w=e(24122),ee=e(76539),$=e(47670);const te="Name already taken",ne=()=>{(0,a.go)();const{formatMessage:D}=(0,m.Z)(),{lockApp:h,unlockApp:Z}=(0,a.o1)(),O=(0,a.lm)(),k=(0,s.k6)(),[v,N]=(0,t.useState)(k.location.state?.transferToken.accessKey?{...k.location.state.transferToken}:null),{trackUsage:j}=(0,a.rS)(),F=(0,t.useRef)(j),{setCurrentStep:se}=(0,a.c1)(),{allowedActions:{canCreate:ae,canUpdate:re,canRegenerate:oe}}=(0,a.ss)(K.Z.settings["transfer-tokens"]),{params:{id:z}}=(0,s.$B)("/settings/transfer-tokens/:id"),{get:ie,post:le,put:de}=(0,a.kY)(),R=z==="create",{formatAPIError:Q}=(0,a.So)();(0,t.useEffect)(()=>{F.current(R?"didAddTokenFromList":"didEditTokenFromList",{tokenType:$.f})},[R]);const{status:ce}=(0,M.useQuery)(["transfer-token",z],async()=>{const{data:{data:u}}=await ie(`/admin/transfer/tokens/${z}`);return N({...u}),u},{enabled:!R&&!v,onError(u){u.response.data.error.details?.code==="INVALID_TOKEN_SALT"?O({type:"warning",message:{id:"notification.error.invalid.configuration",defaultMessage:"You have an invalid configuration, check your server log for more information."}}):O({type:"warning",message:Q(u)})}}),ge=async(u,_)=>{F.current(R?"willCreateToken":"willEditToken",{tokenType:$.f}),h();const G=u.lifespan&&parseInt(u.lifespan,10)&&u.lifespan!=="0"?parseInt(u.lifespan,10):null,X=u.permissions.split("-");try{const{data:{data:C}}=R?await le("/admin/transfer/tokens",{...u,lifespan:G,permissions:X}):await de(`/admin/transfer/tokens/${z}`,{name:u.name,description:u.description,permissions:X});Z(),R&&(k.replace(`/settings/transfer-tokens/${C.id}`,{transferToken:C}),se("transferTokens.success")),N({...C}),O({type:"success",message:D(R?{id:"notification.success.transfertokencreated",defaultMessage:"Transfer Token successfully created"}:{id:"notification.success.transfertokenedited",defaultMessage:"Transfer Token successfully edited"})}),F.current(R?"didCreateToken":"didEditToken",{type:v?.permissions,tokenType:$.f})}catch(C){const ue=(0,T.Iz)(C.response.data);_.setErrors(ue),C?.response?.data?.error?.message===te?O({type:"warning",message:C.response.data.message||"notification.error.tokennamenotunique"}):C?.response?.data?.error?.details?.code==="INVALID_TOKEN_SALT"?O({type:"warning",message:{id:"notification.error.invalid.configuration",defaultMessage:"You have an invalid configuration, check your server log for more information."}}):O({type:"warning",message:C?.response?.data?.message||"notification.error"}),Z()}},J=re&&!R||ae&&R;if(!R&&!v&&ce!=="success")return t.createElement(x,{transferTokenName:v?.name});const pe=u=>{u?.response?.data?.error?.details?.code==="INVALID_TOKEN_SALT"?O({type:"warning",message:{id:"notification.error.invalid.configuration",defaultMessage:"You have an invalid configuration, check your server log for more information."}}):O({type:"warning",message:Q(u)})};return t.createElement(g.o,null,t.createElement(a.SL,{name:"Transfer Tokens"}),t.createElement(n.J9,{validationSchema:d,validateOnChange:!1,initialValues:{name:v?.name||"",description:v?.description||"",lifespan:v?.lifespan?v.lifespan.toString():v?.lifespan,permissions:v?.permissions.join("-")},enableReinitialize:!0,onSubmit:(u,_)=>ge(u,_)},({errors:u,handleChange:_,isSubmitting:G,values:X})=>t.createElement(a.l0,null,t.createElement(ee.Z,{backUrl:"/settings/transfer-tokens",title:{id:"Settings.transferTokens.createPage.title",defaultMessage:"Create Transfer Token"},token:v,setToken:N,canEditInputs:J,canRegenerate:oe,isSubmitting:G,regenerateUrl:"/admin/transfer/tokens/",onErrorRegenerate:pe}),t.createElement(i.D,null,t.createElement(o.k,{direction:"column",alignItems:"stretch",gap:6},Boolean(v?.name)&&t.createElement(w.Z,{token:v?.accessKey,tokenType:$.f}),t.createElement(q,{errors:u,onChange:_,canEditInputs:J,isCreating:R,values:X,transferToken:v}))))))}}}]);
