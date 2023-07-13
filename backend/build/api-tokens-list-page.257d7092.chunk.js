"use strict";(self.webpackChunklms=self.webpackChunklms||[]).push([[8056],{56856:(Y,k,t)=>{t.d(k,{Z:()=>I});var e=t(67294),s=t(16550),L=t(45697),n=t.n(L),A=t(15234),U=t(79031),y=t(37909),h=t(75515),V=t(11047),r=t(79174),x=t(20022),O=t(41580),M=t(12028),F=t(86896);const Z=({tokenName:a,onClickDelete:c,tokenType:u})=>{const{formatMessage:E}=(0,F.Z)(),{trackUsage:p}=(0,r.rS)(),[g,i]=(0,e.useState)(!1),T=()=>{i(!1),p("willDeleteToken",{tokenType:u}),c()};return e.createElement(O.x,{paddingLeft:1,onClick:f=>f.stopPropagation()},e.createElement(M.h,{onClick:()=>{i(!0)},label:E({id:"global.delete-target",defaultMessage:"Delete {target}"},{target:`${a}`}),name:"delete",noBorder:!0,icon:e.createElement(x.Z,null)}),e.createElement(r.QH,{onToggleDialog:()=>i(!1),onConfirm:T,isOpen:g}))};Z.propTypes={tokenName:n().string.isRequired,onClickDelete:n().func.isRequired,tokenType:n().string.isRequired};const $=Z;var v=t(4585),w=t(88972);const Q={edit:{id:"app.component.table.edit",defaultMessage:"Edit {target}"},read:{id:"app.component.table.read",defaultMessage:"Read {target}"}},K=(0,w.ZP)(r.rU)`
  svg {
    path {
      fill: ${({theme:a})=>a.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({theme:a})=>a.colors.neutral800};
      }
    }
  }
`,C=({tokenName:a,tokenId:c,buttonType:u,children:E})=>{const{formatMessage:p}=(0,F.Z)(),{location:{pathname:g}}=(0,s.k6)();return e.createElement(K,{to:`${g}/${c}`,title:p(Q[u],{target:a})},E)};C.propTypes={tokenName:n().string.isRequired,tokenId:n().oneOfType([n().string,n().number]).isRequired,buttonType:n().string,children:n().node.isRequired},C.defaultProps={buttonType:"edit"};const b=C,m=({tokenName:a,tokenId:c})=>e.createElement(b,{tokenName:a,tokenId:c},e.createElement(v.Z,null));m.propTypes={tokenName:n().string.isRequired,tokenId:n().oneOfType([n().string,n().number]).isRequired};const S=m;var D=t(8934);const P=({tokenName:a,tokenId:c})=>e.createElement(b,{tokenName:a,tokenId:c,buttonType:"read"},e.createElement(D.Z,null));P.propTypes={tokenName:n().string.isRequired,tokenId:n().oneOfType([n().string,n().number]).isRequired};const H=P,d=({permissions:a,headers:c,contentType:u,isLoading:E,tokens:p,onConfirmDelete:g,tokenType:i})=>{const{canDelete:T,canUpdate:f,canRead:R}=a,N=T||f||R,[{query:B}]=(0,r.Kx)(),[,j]=B?B.sort.split(":"):"ASC",{push:W,location:{pathname:o}}=(0,s.k6)(),{trackUsage:J}=(0,r.rS)(),G=p.sort((l,X)=>{const z=l.name.localeCompare(X.name);return j==="DESC"?-z:z});return e.createElement(r.tM,{headers:c,contentType:u,rows:p,withBulkActions:N,isLoading:E,onConfirmDelete:g},e.createElement(A.p,null,G.map(l=>e.createElement(U.Tr,{key:l.id,...(0,r.X7)({fn(){J("willEditTokenFromList",{tokenType:i}),W(`${o}/${l.id}`)},condition:f})},e.createElement(y.Td,{maxWidth:(0,r.Q1)(250)},e.createElement(h.Z,{textColor:"neutral800",fontWeight:"bold",ellipsis:!0},l.name)),e.createElement(y.Td,{maxWidth:(0,r.Q1)(250)},e.createElement(h.Z,{textColor:"neutral800",ellipsis:!0},l.description)),e.createElement(y.Td,null,e.createElement(h.Z,{textColor:"neutral800"},e.createElement(r.ij,{timestamp:new Date(l.createdAt)}))),e.createElement(y.Td,null,l.lastUsedAt&&e.createElement(h.Z,{textColor:"neutral800"},e.createElement(r.ij,{timestamp:new Date(l.lastUsedAt)}))),N&&e.createElement(y.Td,null,e.createElement(V.k,{justifyContent:"end"},f&&e.createElement(S,{tokenName:l.name,tokenId:l.id}),!f&&R&&e.createElement(H,{tokenName:l.name,tokenId:l.id}),T&&e.createElement($,{tokenName:l.name,onClickDelete:()=>g(l.id),tokenType:i})))))))};d.propTypes={tokens:n().array,permissions:n().shape({canRead:n().bool,canDelete:n().bool,canUpdate:n().bool}).isRequired,headers:n().arrayOf(n().shape({cellFormatter:n().func,key:n().string.isRequired,metadatas:n().shape({label:n().string.isRequired,sortable:n().bool}).isRequired,name:n().string.isRequired})),contentType:n().string.isRequired,isLoading:n().bool,onConfirmDelete:n().func,tokenType:n().string.isRequired},d.defaultProps={tokens:[],headers:[],isLoading:!1,onConfirmDelete(){}};const I=d},47670:(Y,k,t)=>{t.d(k,{Z:()=>e,f:()=>s});const e="api-token",s="transfer-token"},87427:(Y,k,t)=>{t.r(k),t.d(k,{default:()=>C});var e=t(67294),s=t(79174),L=t(87751),n=t(86896),A=t(88767),U=t(16550),y=t(80129),h=t.n(y),V=t(185),r=t(53979),x=t(49066),O=t(29728),M=t(96315);const Z=[{name:"name",key:"name",metadatas:{label:{id:"Settings.apiTokens.ListView.headers.name",defaultMessage:"Name"},sortable:!0}},{name:"description",key:"description",metadatas:{label:{id:"Settings.apiTokens.ListView.headers.description",defaultMessage:"Description"},sortable:!1}},{name:"createdAt",key:"createdAt",metadatas:{label:{id:"Settings.apiTokens.ListView.headers.createdAt",defaultMessage:"Created at"},sortable:!1}},{name:"lastUsedAt",key:"lastUsedAt",metadatas:{label:{id:"Settings.apiTokens.ListView.headers.lastUsedAt",defaultMessage:"Last used"},sortable:!1}}];var $=t(56856),v=t(47670);const Q=()=>{(0,s.go)();const b=(0,A.useQueryClient)(),{formatMessage:m}=(0,n.Z)(),S=(0,s.lm)(),{allowedActions:{canCreate:D,canDelete:P,canUpdate:H,canRead:d}}=(0,s.ss)(L.Z.settings["api-tokens"]),{push:I}=(0,U.k6)(),{trackUsage:a}=(0,s.rS)(),{startSection:c}=(0,s.c1)(),u=(0,e.useRef)(c),{get:E,del:p}=(0,s.kY)();(0,e.useEffect)(()=>{u.current&&u.current("apiTokens")},[]),(0,e.useEffect)(()=>{I({search:h().stringify({sort:"name:ASC"},{encode:!1})})},[I]);const g=Z.map(o=>({...o,metadatas:{...o.metadatas,label:m(o.metadatas.label)}})),{data:i,status:T,isFetching:f}=(0,A.useQuery)(["api-tokens"],async()=>{a("willAccessTokenList",{tokenType:v.Z});const{data:{data:o}}=await E("/admin/api-tokens");return a("didAccessTokenList",{number:o.length,tokenType:v.Z}),o},{enabled:d,onError(){S({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}})}}),R=d&&(T!=="success"&&T!=="error"||T==="success"&&f),N=(0,A.useMutation)(async o=>{await p(`/admin/api-tokens/${o}`)},{async onSuccess(){await b.invalidateQueries(["api-tokens"]),a("didDeleteToken")},onError(o){o?.response?.data?.data?S({type:"warning",message:o.response.data.data}):S({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}})}}),B=d&&i,j=d&&!i&&!D,W=d&&!i&&D;return e.createElement(V.o,{"aria-busy":R},e.createElement(s.SL,{name:"API Tokens"}),e.createElement(r.T,{title:m({id:"Settings.apiTokens.title",defaultMessage:"API Tokens"}),subtitle:m({id:"Settings.apiTokens.description",defaultMessage:"List of generated tokens to consume the API"}),primaryAction:D?e.createElement(s.Qj,{"data-testid":"create-api-token-button",startIcon:e.createElement(M.Z,null),size:"S",onClick:()=>a("willAddTokenFromList",{tokenType:v.Z}),to:"/settings/api-tokens/create"},m({id:"Settings.apiTokens.create",defaultMessage:"Create new API Token"})):void 0}),e.createElement(x.D,null,!d&&e.createElement(s.ZF,null),B&&e.createElement($.Z,{permissions:{canRead:d,canDelete:P,canUpdate:H},headers:g,contentType:"api-tokens",rows:i,isLoading:R,onConfirmDelete:o=>N.mutateAsync(o),tokens:i,tokenType:v.Z}),W&&e.createElement(s.dJ,{content:{id:"Settings.apiTokens.addFirstToken",defaultMessage:"Add your first API Token"},action:e.createElement(O.z,{variant:"secondary",startIcon:e.createElement(M.Z,null)},m({id:"Settings.apiTokens.addNewToken",defaultMessage:"Add new API Token"}))}),j&&e.createElement(s.dJ,{content:{id:"Settings.apiTokens.emptyStateLayout",defaultMessage:"You don\u2019t have any content yet..."}})))},C=()=>e.createElement(s.O4,{permissions:L.Z.settings["api-tokens"].main},e.createElement(Q,null))}}]);
