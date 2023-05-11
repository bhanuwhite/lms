"use strict";(self.webpackChunklms=self.webpackChunklms||[]).push([[9600],{56856:(K,k,t)=>{t.d(k,{Z:()=>I});var e=t(67294),s=t(16550),R=t(45697),n=t.n(R),S=t(15234),P=t(79031),y=t(37909),h=t(75515),V=t(11047),l=t(41647),O=t(20022),x=t(41580),M=t(12028),F=t(86896);const b=({tokenName:o,onClickDelete:c,tokenType:u})=>{const{formatMessage:v}=(0,F.Z)(),{trackUsage:f}=(0,l.rS)(),[g,i]=(0,e.useState)(!1),T=()=>{i(!1),f("willDeleteToken",{tokenType:u}),c()};return e.createElement(x.x,{paddingLeft:1,onClick:p=>p.stopPropagation()},e.createElement(M.h,{onClick:()=>{i(!0)},label:v({id:"global.delete-target",defaultMessage:"Delete {target}"},{target:`${o}`}),name:"delete",noBorder:!0,icon:e.createElement(O.Z,null)}),e.createElement(l.QH,{onToggleDialog:()=>i(!1),onConfirm:T,isOpen:g}))};b.propTypes={tokenName:n().string.isRequired,onClickDelete:n().func.isRequired,tokenType:n().string.isRequired};const $=b;var C=t(4585),j=t(88972);const Q={edit:{id:"app.component.table.edit",defaultMessage:"Edit {target}"},read:{id:"app.component.table.read",defaultMessage:"Read {target}"}},W=(0,j.ZP)(l.rU)`
  svg {
    path {
      fill: ${({theme:o})=>o.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({theme:o})=>o.colors.neutral800};
      }
    }
  }
`,A=({tokenName:o,tokenId:c,buttonType:u,children:v})=>{const{formatMessage:f}=(0,F.Z)(),{location:{pathname:g}}=(0,s.k6)();return e.createElement(W,{to:`${g}/${c}`,title:f(Q[u],{target:o})},v)};A.propTypes={tokenName:n().string.isRequired,tokenId:n().oneOfType([n().string,n().number]).isRequired,buttonType:n().string,children:n().node.isRequired},A.defaultProps={buttonType:"edit"};const N=A,m=({tokenName:o,tokenId:c})=>e.createElement(N,{tokenName:o,tokenId:c},e.createElement(C.Z,null));m.propTypes={tokenName:n().string.isRequired,tokenId:n().oneOfType([n().string,n().number]).isRequired};const E=m;var L=t(8934);const Z=({tokenName:o,tokenId:c})=>e.createElement(N,{tokenName:o,tokenId:c,buttonType:"read"},e.createElement(L.Z,null));Z.propTypes={tokenName:n().string.isRequired,tokenId:n().oneOfType([n().string,n().number]).isRequired};const Y=Z,d=({permissions:o,headers:c,contentType:u,isLoading:v,tokens:f,onConfirmDelete:g,tokenType:i})=>{const{canDelete:T,canUpdate:p,canRead:D}=o,B=T||p||D,[{query:U}]=(0,l.Kx)(),[,w]=U?U.sort.split(":"):"ASC",{push:H,location:{pathname:a}}=(0,s.k6)(),{trackUsage:J}=(0,l.rS)(),G=f.sort((r,X)=>{const z=r.name.localeCompare(X.name);return w==="DESC"?-z:z});return e.createElement(l.tM,{headers:c,contentType:u,rows:f,withBulkActions:B,isLoading:v,onConfirmDelete:g},e.createElement(S.p,null,G.map(r=>e.createElement(P.Tr,{key:r.id,...(0,l.X7)({fn(){J("willEditTokenFromList",{tokenType:i}),H(`${a}/${r.id}`)},condition:p})},e.createElement(y.Td,{maxWidth:(0,l.Q1)(250)},e.createElement(h.Z,{textColor:"neutral800",fontWeight:"bold",ellipsis:!0},r.name)),e.createElement(y.Td,{maxWidth:(0,l.Q1)(250)},e.createElement(h.Z,{textColor:"neutral800",ellipsis:!0},r.description)),e.createElement(y.Td,null,e.createElement(h.Z,{textColor:"neutral800"},e.createElement(l.ij,{timestamp:new Date(r.createdAt)}))),e.createElement(y.Td,null,r.lastUsedAt&&e.createElement(h.Z,{textColor:"neutral800"},e.createElement(l.ij,{timestamp:new Date(r.lastUsedAt)}))),B&&e.createElement(y.Td,null,e.createElement(V.k,{justifyContent:"end"},p&&e.createElement(E,{tokenName:r.name,tokenId:r.id}),!p&&D&&e.createElement(Y,{tokenName:r.name,tokenId:r.id}),T&&e.createElement($,{tokenName:r.name,onClickDelete:()=>g(r.id),tokenType:i})))))))};d.propTypes={tokens:n().array,permissions:n().shape({canRead:n().bool,canDelete:n().bool,canUpdate:n().bool}).isRequired,headers:n().arrayOf(n().shape({cellFormatter:n().func,key:n().string.isRequired,metadatas:n().shape({label:n().string.isRequired,sortable:n().bool}).isRequired,name:n().string.isRequired})),contentType:n().string.isRequired,isLoading:n().bool,onConfirmDelete:n().func,tokenType:n().string.isRequired},d.defaultProps={tokens:[],headers:[],isLoading:!1,onConfirmDelete(){}};const I=d},47670:(K,k,t)=>{t.d(k,{Z:()=>e,f:()=>s});const e="api-token",s="transfer-token"},70798:(K,k,t)=>{t.r(k),t.d(k,{default:()=>A});var e=t(67294),s=t(41647),R=t(87751),n=t(86896),S=t(88767),P=t(16550),y=t(80129),h=t.n(y),V=t(185),l=t(53979),O=t(49066),x=t(29728),M=t(96315);const b=[{name:"name",key:"name",metadatas:{label:{id:"Settings.tokens.ListView.headers.name",defaultMessage:"Name"},sortable:!0}},{name:"description",key:"description",metadatas:{label:{id:"Settings.tokens.ListView.headers.description",defaultMessage:"Description"},sortable:!1}},{name:"createdAt",key:"createdAt",metadatas:{label:{id:"Settings.tokens.ListView.headers.createdAt",defaultMessage:"Created at"},sortable:!1}},{name:"lastUsedAt",key:"lastUsedAt",metadatas:{label:{id:"Settings.tokens.ListView.headers.lastUsedAt",defaultMessage:"Last used"},sortable:!1}}];var $=t(56856),C=t(47670);const Q=()=>{(0,s.go)();const N=(0,S.useQueryClient)(),{formatMessage:m}=(0,n.Z)(),E=(0,s.lm)(),{allowedActions:{canCreate:L,canDelete:Z,canUpdate:Y,canRead:d}}=(0,s.ss)(R.Z.settings["transfer-tokens"]),{push:I}=(0,P.k6)(),{trackUsage:o}=(0,s.rS)(),{startSection:c}=(0,s.c1)(),u=(0,e.useRef)(c),{get:v,del:f}=(0,s.kY)();(0,e.useEffect)(()=>{u.current&&u.current("transferTokens")},[]),(0,e.useEffect)(()=>{I({search:h().stringify({sort:"name:ASC"},{encode:!1})})},[I]);const g=b.map(a=>({...a,metadatas:{...a.metadatas,label:m(a.metadatas.label)}})),{data:i,status:T,isFetching:p}=(0,S.useQuery)(["transfer-tokens"],async()=>{o("willAccessTokenList",{tokenType:C.f});const{data:{data:a}}=await v("/admin/transfer/tokens");return o("didAccessTokenList",{number:a.length,tokenType:C.f}),a},{enabled:d,onError(a){console.log("error",a),a?.response?.data?.error?.details?.code==="INVALID_TOKEN_SALT"?E({type:"warning",message:{id:"notification.error.invalid.configuration",defaultMessage:"You have an invalid configuration, check your server log for more information."}}):E({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}})}}),D=d&&(T!=="success"&&T!=="error"||T==="success"&&p),B=(0,S.useMutation)(async a=>{await f(`/admin/transfer/tokens/${a}`)},{async onSuccess(){await N.invalidateQueries(["transfer-tokens"])},onError(a){a?.response?.data?.data?E({type:"warning",message:a.response.data.data}):a?.response?.data?.error?.details?.code==="INVALID_TOKEN_SALT"?E({type:"warning",message:{id:"notification.error.invalid.configuration",defaultMessage:"You have an invalid configuration, check your server log for more information."}}):E({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}})}}),U=d&&i,w=d&&!i&&!L,H=d&&!i&&L;return e.createElement(V.o,{"aria-busy":D},e.createElement(s.SL,{name:"Transfer Tokens"}),e.createElement(l.T,{title:m({id:"Settings.transferTokens.title",defaultMessage:"Transfer Tokens"}),subtitle:m({id:"Settings.transferTokens.description",defaultMessage:'"List of generated transfer tokens"'}),primaryAction:L?e.createElement(s.Qj,{"data-testid":"create-transfer-token-button",startIcon:e.createElement(M.Z,null),size:"S",onClick:()=>o("willAddTokenFromList",{tokenType:C.f}),to:"/settings/transfer-tokens/create"},m({id:"Settings.transferTokens.create",defaultMessage:"Create new Transfer Token"})):void 0}),e.createElement(O.D,null,!d&&e.createElement(s.ZF,null),U&&e.createElement($.Z,{permissions:{canRead:d,canDelete:Z,canUpdate:Y},headers:g,contentType:"trasfer-tokens",rows:i,isLoading:D,onConfirmDelete:a=>B.mutateAsync(a),tokens:i,tokenType:C.f}),H&&e.createElement(s.dJ,{content:{id:"Settings.transferTokens.addFirstToken",defaultMessage:"Add your first Transfer Token"},action:e.createElement(x.z,{variant:"secondary",startIcon:e.createElement(M.Z,null)},m({id:"Settings.transferTokens.addNewToken",defaultMessage:"Add new Transfer Token"}))}),w&&e.createElement(s.dJ,{content:{id:"Settings.transferTokens.emptyStateLayout",defaultMessage:"You don\u2019t have any content yet..."}})))},A=()=>e.createElement(s.O4,{permissions:R.Z.settings["transfer-tokens"].main},e.createElement(Q,null))}}]);
