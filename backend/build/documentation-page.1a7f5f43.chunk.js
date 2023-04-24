"use strict";
(self["webpackChunklms"] = self["webpackChunklms"] || []).push([[9789],{

/***/ 75730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_PluginPage)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 18 modules
var helper_plugin_esm = __webpack_require__(86597);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(64593);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/Layout.js
var Layout = __webpack_require__(17034);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(185);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(53979);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(29728);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(49066);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Table.js
var Table = __webpack_require__(38939);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Thead.js
var Thead = __webpack_require__(8060);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tr.js
var Tr = __webpack_require__(79031);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Cell.js
var Cell = __webpack_require__(37909);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(75515);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tbody.js
var Tbody = __webpack_require__(15234);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(11047);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/IconButton/IconButton.js
var IconButton = __webpack_require__(12028);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Eye.js
var Eye = __webpack_require__(8934);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Refresh.js
var Refresh = __webpack_require__(30815);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Trash.js
var Trash = __webpack_require__(20022);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/permissions.js
var permissions = __webpack_require__(80826);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/utils/index.js
var utils = __webpack_require__(93742);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/utils/openWithNewTab.js
const openWithNewTab = (path) => {
  const url = (() => {
    if (path.startsWith("/")) {
      return `${strapi.backendURL}${path}`;
    }
    if (path.startsWith("http")) {
      return path;
    }
    return `${strapi.backendURL}/${path}`;
  })();
  window.open(url, "_blank");
  return window.focus();
};
/* harmony default export */ const utils_openWithNewTab = (openWithNewTab);

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/utils/useReactQuery.js + 1 modules
var useReactQuery = __webpack_require__(4733);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/PluginPage/index.js










const PluginPage = () => {
  (0,helper_plugin_esm/* useFocusWhenNavigate */.go)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { data, isLoading, deleteMutation, regenerateDocMutation } = (0,useReactQuery/* default */.Z)();
  const [showConfirmDelete, setShowConfirmDelete] = (0,react.useState)(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = (0,react.useState)(false);
  const [versionToDelete, setVersionToDelete] = (0,react.useState)();
  const colCount = 4;
  const rowCount = (data?.docVersions?.length || 0) + 1;
  const openDocVersion = () => {
    const slash = data?.prefix.startsWith("/") ? "" : "/";
    utils_openWithNewTab(`${slash}${data?.prefix}/v${data?.currentVersion}`);
  };
  const handleRegenerateDoc = (version) => {
    regenerateDocMutation.mutate({ version, prefix: data?.prefix });
  };
  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleConfirmDelete = async () => {
    setIsConfirmButtonLoading(true);
    await deleteMutation.mutateAsync({ prefix: data?.prefix, version: versionToDelete });
    setShowConfirmDelete(!showConfirmDelete);
    setIsConfirmButtonLoading(false);
  };
  const handleClickDelete = (version) => {
    setVersionToDelete(version);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const title = formatMessage({
    id: (0,utils/* getTrad */.O)("plugin.name"),
    defaultMessage: "Documentation"
  });
  return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(Helmet/* Helmet */.q, { title }), /* @__PURE__ */ react.createElement(Main/* Main */.o, { "aria-busy": isLoading }, /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      title,
      subtitle: formatMessage({
        id: (0,utils/* getTrad */.O)("pages.PluginPage.header.description"),
        defaultMessage: "Configure the documentation plugin"
      }),
      primaryAction: (
        //  eslint-disable-next-line
        /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPermissions */.jW, { permissions: permissions/* default.open */.Z.open }, /* @__PURE__ */ react.createElement(Button/* Button */.z, { onClick: openDocVersion, startIcon: /* @__PURE__ */ react.createElement(Eye/* default */.Z, null) }, formatMessage({
          id: (0,utils/* getTrad */.O)("pages.PluginPage.Button.open"),
          defaultMessage: "Open Documentation"
        })))
      )
    }
  ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, isLoading && /* @__PURE__ */ react.createElement(helper_plugin_esm/* LoadingIndicatorPage */.dO, null, "Plugin is loading"), data?.docVersions.length ? /* @__PURE__ */ react.createElement(Table/* Table */.i, { colCount, rowCount }, /* @__PURE__ */ react.createElement(Thead/* Thead */.h, null, /* @__PURE__ */ react.createElement(Tr.Tr, null, /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma", textColor: "neutral600" }, formatMessage({
    id: (0,utils/* getTrad */.O)("pages.PluginPage.table.version"),
    defaultMessage: "Version"
  }))), /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma", textColor: "neutral600" }, formatMessage({
    id: (0,utils/* getTrad */.O)("pages.PluginPage.table.generated"),
    defaultMessage: "Last Generated"
  }))))), /* @__PURE__ */ react.createElement(Tbody/* Tbody */.p, null, data.docVersions.sort((a, b) => a.generatedDate < b.generatedDate ? 1 : -1).map((doc) => /* @__PURE__ */ react.createElement(Tr.Tr, { key: doc.version }, /* @__PURE__ */ react.createElement(Cell.Td, { width: "50%" }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, doc.version)), /* @__PURE__ */ react.createElement(Cell.Td, { width: "50%" }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, doc.generatedDate)), /* @__PURE__ */ react.createElement(Cell.Td, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "end", ...helper_plugin_esm/* stopPropagation */.UW }, /* @__PURE__ */ react.createElement(
    IconButton/* IconButton */.h,
    {
      onClick: openDocVersion,
      noBorder: true,
      icon: /* @__PURE__ */ react.createElement(Eye/* default */.Z, null),
      label: formatMessage(
        {
          id: (0,utils/* getTrad */.O)("pages.PluginPage.table.icon.show"),
          defaultMessage: "Open {target}"
        },
        { target: `${doc.version}` }
      )
    }
  ), /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPermissions */.jW, { permissions: permissions/* default.regenerate */.Z.regenerate }, /* @__PURE__ */ react.createElement(
    IconButton/* IconButton */.h,
    {
      onClick: () => handleRegenerateDoc(doc.version),
      noBorder: true,
      icon: /* @__PURE__ */ react.createElement(Refresh/* default */.Z, null),
      label: formatMessage(
        {
          id: (0,utils/* getTrad */.O)("pages.PluginPage.table.icon.regenerate"),
          defaultMessage: "Regenerate {target}"
        },
        { target: `${doc.version}` }
      )
    }
  )), /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPermissions */.jW, { permissions: permissions/* default.update */.Z.update }, doc.version !== data.currentVersion && /* @__PURE__ */ react.createElement(
    IconButton/* IconButton */.h,
    {
      onClick: () => handleClickDelete(doc.version),
      noBorder: true,
      icon: /* @__PURE__ */ react.createElement(Trash/* default */.Z, null),
      label: formatMessage(
        {
          id: "global.delete-target",
          defaultMessage: "Delete {target}"
        },
        { target: `${doc.version}` }
      )
    }
  )))))))) : /* @__PURE__ */ react.createElement(helper_plugin_esm/* EmptyStateLayout */.x7, null)), /* @__PURE__ */ react.createElement(
    helper_plugin_esm/* ConfirmDialog */.QH,
    {
      isConfirmButtonLoading,
      onConfirm: handleConfirmDelete,
      onToggleDialog: handleShowConfirmDelete,
      isOpen: showConfirmDelete
    }
  )));
};
/* harmony default export */ const pages_PluginPage = (PluginPage);


/***/ }),

/***/ 4733:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ utils_useReactQuery)
});

// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var es = __webpack_require__(88767);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 18 modules
var helper_plugin_esm = __webpack_require__(86597);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pluginId.js
var pluginId = __webpack_require__(49950);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/utils/api.js


const deleteDoc = ({ prefix, version }) => {
  return (0,helper_plugin_esm/* request */.WY)(`${prefix}/deleteDoc/${version}`, { method: "DELETE" });
};
const fetchDocumentationVersions = async (toggleNotification) => {
  try {
    const data = await (0,helper_plugin_esm/* request */.WY)(`/${pluginId/* default */.Z}/getInfos`, { method: "GET" });
    return data;
  } catch (err) {
    toggleNotification({
      type: "warning",
      message: { id: "notification.error" }
    });
    return null;
  }
};
const regenerateDoc = ({ prefix, version }) => {
  return (0,helper_plugin_esm/* request */.WY)(`${prefix}/regenerateDoc`, { method: "POST", body: { version } });
};
const updateSettings = ({ prefix, body }) => (0,helper_plugin_esm/* request */.WY)(`${prefix}/updateSettings`, { method: "PUT", body });


// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/utils/getTrad.js
var getTrad = __webpack_require__(798);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/utils/useReactQuery.js




const useReactQuery = () => {
  const queryClient = (0,es.useQueryClient)();
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const { isLoading, data } = (0,es.useQuery)(
    "get-documentation",
    () => fetchDocumentationVersions(toggleNotification)
  );
  const handleError = (err) => {
    toggleNotification({
      type: "warning",
      message: err.response.payload.message
    });
  };
  const handleSuccess = (type, tradId) => {
    queryClient.invalidateQueries("get-documentation");
    toggleNotification({
      type,
      message: { id: (0,getTrad/* default */.Z)(tradId) }
    });
  };
  const deleteMutation = (0,es.useMutation)(deleteDoc, {
    onSuccess: () => handleSuccess("info", "notification.delete.success"),
    onError: (error) => handleError(error)
  });
  const submitMutation = (0,es.useMutation)(updateSettings, {
    onSuccess: () => handleSuccess("success", "notification.update.success"),
    onError: handleError
  });
  const regenerateDocMutation = (0,es.useMutation)(regenerateDoc, {
    onSuccess: () => handleSuccess("info", "notification.generate.success"),
    onError: (error) => handleError(error)
  });
  return { data, isLoading, deleteMutation, submitMutation, regenerateDocMutation };
};
/* harmony default export */ const utils_useReactQuery = (useReactQuery);


/***/ }),

/***/ 798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pluginId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49950);

const getTrad = (id) => `${_pluginId__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z}.${id}`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTrad);


/***/ }),

/***/ 93742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* reexport safe */ _getTrad__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _getTrad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(798);



/***/ }),

/***/ 49066:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45697);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41580);



const p = ({ children: e }) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Box_Box_js__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, { paddingLeft: 10, paddingRight: 10 }, e);
p.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_2__.node.isRequired
};



/***/ }),

/***/ 53979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "T": () => (/* binding */ p)
});

// UNUSED EXPORTS: BaseHeaderLayout

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(11047);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useElementOnScreen.js

const b = (t) => {
  const e = (0,react.useRef)(null), [s, c] = (0,react.useState)(!0), i = ([n]) => {
    c(n.isIntersecting);
  };
  return (0,react.useEffect)(() => {
    const n = e.current, r = new IntersectionObserver(i, t);
    return n && r.observe(e.current), () => {
      n && r.disconnect();
    };
  }, [e, t]), [e, s];
};


// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.module.js
var index_module = __webpack_require__(95355);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useResizeObserver.js


const c = (e, i) => {
  const t = (0,index_module/* useCallbackRef */.W)(i);
  (0,react.useLayoutEffect)(() => {
    const r = new ResizeObserver(t);
    return Array.isArray(e) ? e.forEach((n) => {
      n.current && r.observe(n.current);
    }) : e.current && r.observe(e.current), () => {
      r.disconnect();
    };
  }, [e, t]);
};


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(75515);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js








const L = () => {
  const n = (0,react.useRef)(null), [o, a] = (0,react.useState)(null), [r, d] = b({
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  return c(r, () => {
    r.current && a(r.current.getBoundingClientRect());
  }), (0,react.useEffect)(() => {
    n.current && a(n.current.getBoundingClientRect());
  }, [n]), {
    containerRef: r,
    isVisible: d,
    baseHeaderLayoutRef: n,
    headerSize: o
  };
}, p = (n) => {
  const { containerRef: o, isVisible: a, baseHeaderLayoutRef: r, headerSize: d } = L();
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("div", { style: { height: d?.height }, ref: o }, a && /* @__PURE__ */ react.createElement(s, { ref: r, ...n })), !a && /* @__PURE__ */ react.createElement(s, { ...n, sticky: !0, width: d?.width }));
};
p.displayName = "HeaderLayout";
const x = (0,styled_components_browser_esm/* default */.ZP)(Box/* Box */.x)`
  width: ${(n) => n.width}px;
`, s = react.forwardRef(
  ({ navigationAction: n, primaryAction: o, secondaryAction: a, subtitle: r, title: d, sticky: f, width: g, ...u }, y) => {
    const m = typeof r == "string";
    return f ? /* @__PURE__ */ react.createElement(
      x,
      {
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        position: "fixed",
        top: 0,
        right: 0,
        background: "neutral0",
        shadow: "tableShadow",
        width: g,
        zIndex: 4,
        "data-strapi-header-sticky": !0
      },
      /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "space-between" }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, null, n && /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingRight: 3 }, n), /* @__PURE__ */ react.createElement(Box/* Box */.x, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "beta", as: "h1", ...u }, d), m ? /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "pi", textColor: "neutral600" }, r) : r), a ? /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingLeft: 4 }, a) : null), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, null, o ? /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingLeft: 2 }, o) : void 0))
    ) : /* @__PURE__ */ react.createElement(
      Box/* Box */.x,
      {
        ref: y,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 8,
        paddingTop: n ? 6 : 8,
        background: "neutral100",
        "data-strapi-header": !0
      },
      n ? /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingBottom: 2 }, n) : null,
      /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "space-between" }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { minWidth: 0 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "h1", variant: "alpha", ...u }, d), a ? /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingLeft: 4 }, a) : null), o),
      m ? /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "epsilon", textColor: "neutral600", as: "p" }, r) : r
    );
  }
);
s.displayName = "BaseHeaderLayout";
s.defaultProps = {
  navigationAction: void 0,
  primaryAction: void 0,
  secondaryAction: void 0,
  subtitle: void 0,
  sticky: !1,
  width: void 0
};
s.propTypes = {
  navigationAction: prop_types.node,
  primaryAction: prop_types.node,
  secondaryAction: prop_types.node,
  sticky: prop_types.bool,
  subtitle: prop_types.oneOfType([prop_types.string, prop_types.node]),
  title: prop_types.string.isRequired,
  width: prop_types.number
};
p.defaultProps = {
  navigationAction: void 0,
  primaryAction: void 0,
  secondaryAction: void 0,
  subtitle: void 0
};
p.propTypes = {
  navigationAction: prop_types.node,
  primaryAction: prop_types.node,
  secondaryAction: prop_types.node,
  subtitle: prop_types.oneOfType([prop_types.string, prop_types.node]),
  title: prop_types.string.isRequired
};



/***/ }),

/***/ 17034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ i)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45697);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88972);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41580);




const a = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x)`
  display: grid;
  grid-template-columns: ${({ hasSideNav: e }) => e ? "auto 1fr" : "1fr"};
`, m = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x)`
  overflow-x: hidden;
`, i = ({ sideNav: e, children: n }) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(a, { hasSideNav: Boolean(e) }, e, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(m, { paddingBottom: 10 }, n));
i.defaultProps = {
  sideNav: void 0
};
i.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_3__.node.isRequired,
  sideNav: prop_types__WEBPACK_IMPORTED_MODULE_3__.node
};



/***/ }),

/***/ 185:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45697);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88972);



const r = styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"].main */ .ZP.main`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`, e = ({ labelledBy: o, ...t }) => {
  const n = o || "main-content-title";
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(r, { "aria-labelledby": n, id: "main-content", tabIndex: -1, ...t });
};
e.defaultProps = {
  labelledBy: void 0
};
e.propTypes = {
  labelledBy: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
};



/***/ }),

/***/ 30815:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);

const o = (l) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1rem",
  height: "1rem",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...l,
  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.681 2.804A9.64 9.64 0 0 0 11.818 2C6.398 2 2 6.48 2 12c0 5.521 4.397 10 9.818 10 2.03 0 4.011-.641 5.67-1.835a9.987 9.987 0 0 0 3.589-4.831 1.117 1.117 0 0 0-.664-1.418 1.086 1.086 0 0 0-1.393.676 7.769 7.769 0 0 1-2.792 3.758 7.546 7.546 0 0 1-4.41 1.428V4.222h.002a7.492 7.492 0 0 1 3.003.625 7.61 7.61 0 0 1 2.5 1.762l.464.551-2.986 3.042a.186.186 0 0 0 .129.316H22V3.317a.188.188 0 0 0-.112-.172.179.179 0 0 0-.199.04l-2.355 2.4-.394-.468-.02-.02a9.791 9.791 0 0 0-3.239-2.293Zm-3.863 1.418V2v2.222Zm0 0v15.556c-4.216 0-7.636-3.484-7.636-7.778s3.42-7.777 7.636-7.778Z",
    fill: "#212134"
  })
}), t = o;



/***/ })

}]);