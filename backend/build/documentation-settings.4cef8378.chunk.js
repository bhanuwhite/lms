"use strict";
(self["webpackChunklms"] = self["webpackChunklms"] || []).push([[8503],{

/***/ 31346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_SettingsPage)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 121 modules
var formik_esm = __webpack_require__(94649);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 18 modules
var helper_plugin_esm = __webpack_require__(86597);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(185);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(53979);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(29728);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(49066);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(11047);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(75515);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(11276);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(74571);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ToggleInput/ToggleInput.js + 1 modules
var ToggleInput = __webpack_require__(20707);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.js
var TextInput = __webpack_require__(16364);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Check.js
var Check = __webpack_require__(85018);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Eye.js
var Eye = __webpack_require__(8934);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/EyeStriked.js
var EyeStriked = __webpack_require__(94123);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/permissions.js
var permissions = __webpack_require__(80826);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/utils/index.js
var utils = __webpack_require__(93742);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/utils/useReactQuery.js + 1 modules
var useReactQuery = __webpack_require__(4733);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldAction.js
var FieldAction = __webpack_require__(25752);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/components/FieldActionWrapper/index.js


const FieldActionWrapper = (0,styled_components_browser_esm/* default */.ZP)(FieldAction/* FieldAction */.E)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
/* harmony default export */ const components_FieldActionWrapper = (FieldActionWrapper);

// EXTERNAL MODULE: ./node_modules/yup/es/index.js + 26 modules
var es = __webpack_require__(87561);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/utils/schema.js


const schema = es/* object */.Ry().shape({
  restrictedAccess: es/* boolean */.O7(),
  password: es/* string */.Z_().when("restrictedAccess", (value, initSchema) => {
    return value ? initSchema.required(helper_plugin_esm/* translatedErrors.required */.I0.required) : initSchema;
  })
});
/* harmony default export */ const utils_schema = (schema);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-documentation/admin/src/pages/SettingsPage/index.js











const SettingsPage = () => {
  (0,helper_plugin_esm/* useFocusWhenNavigate */.go)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { submitMutation, data, isLoading } = (0,useReactQuery/* default */.Z)();
  const [passwordShown, setPasswordShown] = (0,react.useState)(false);
  const handleUpdateSettingsSubmit = (body) => {
    submitMutation.mutate({
      prefix: data?.prefix,
      body
    });
  };
  return /* @__PURE__ */ react.createElement(Main/* Main */.o, null, isLoading ? /* @__PURE__ */ react.createElement(helper_plugin_esm/* LoadingIndicatorPage */.dO, null, "Plugin settings are loading") : /* @__PURE__ */ react.createElement(
    formik_esm/* Formik */.J9,
    {
      initialValues: {
        restrictedAccess: data?.documentationAccess.restrictedAccess || false,
        password: ""
      },
      onSubmit: handleUpdateSettingsSubmit,
      validationSchema: utils_schema
    },
    ({ handleSubmit, values, handleChange, errors, setFieldTouched, setFieldValue }) => {
      return /* @__PURE__ */ react.createElement(helper_plugin_esm/* Form */.l0, { noValidate: true, onSubmit: handleSubmit }, /* @__PURE__ */ react.createElement(
        HeaderLayout/* HeaderLayout */.T,
        {
          title: formatMessage({
            id: (0,utils/* getTrad */.O)("plugin.name"),
            defaultMessage: "Documentation"
          }),
          subtitle: formatMessage({
            id: (0,utils/* getTrad */.O)("pages.SettingsPage.header.description"),
            defaultMessage: "Configure the documentation plugin"
          }),
          primaryAction: /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPermissions */.jW, { permissions: permissions/* default.update */.Z.update }, /* @__PURE__ */ react.createElement(Button/* Button */.z, { type: "submit", startIcon: /* @__PURE__ */ react.createElement(Check/* default */.Z, null) }, formatMessage({
            id: (0,utils/* getTrad */.O)("pages.SettingsPage.Button.save"),
            defaultMessage: "Save"
          })))
        }
      ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, /* @__PURE__ */ react.createElement(
        Box/* Box */.x,
        {
          background: "neutral0",
          hasRadius: true,
          shadow: "filterShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 7,
          paddingRight: 7
        },
        /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 4 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "delta", as: "h2" }, formatMessage({
          id: "global.settings",
          defaultMessage: "Settings"
        })), /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { gap: 4 }, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6, s: 12 }, /* @__PURE__ */ react.createElement(
          ToggleInput/* ToggleInput */.s,
          {
            name: "restrictedAccess",
            label: formatMessage({
              id: (0,utils/* getTrad */.O)("pages.SettingsPage.toggle.label"),
              defaultMessage: "Restricted Access"
            }),
            hint: formatMessage({
              id: (0,utils/* getTrad */.O)("pages.SettingsPage.toggle.hint"),
              defaultMessage: "Make the documentation endpoint private"
            }),
            checked: values.restrictedAccess,
            onChange: () => {
              if (values.restrictedAccess === true) {
                setFieldValue("password", "", false);
                setFieldTouched("password", false, false);
              }
              setFieldValue("restrictedAccess", !values.restrictedAccess, false);
            },
            onLabel: "On",
            offLabel: "Off"
          }
        )), values.restrictedAccess && /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6, s: 12 }, /* @__PURE__ */ react.createElement(
          TextInput/* TextInput */.o,
          {
            label: formatMessage({
              id: "global.password",
              defaultMessage: "Password"
            }),
            name: "password",
            placeholder: "**********",
            type: passwordShown ? "text" : "password",
            value: values.password,
            onChange: handleChange,
            error: errors.password ? formatMessage({
              id: errors.password,
              defaultMessage: "Invalid value"
            }) : null,
            endAction: /* @__PURE__ */ react.createElement(
              components_FieldActionWrapper,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setPasswordShown((prev) => !prev);
                },
                label: formatMessage(
                  passwordShown ? {
                    id: "Auth.form.password.show-password",
                    defaultMessage: "Show password"
                  } : {
                    id: "Auth.form.password.hide-password",
                    defaultMessage: "Hide password"
                  }
                )
              },
              passwordShown ? /* @__PURE__ */ react.createElement(Eye/* default */.Z, null) : /* @__PURE__ */ react.createElement(EyeStriked/* default */.Z, null)
            )
          }
        ))))
      )));
    }
  ));
};
/* harmony default export */ const pages_SettingsPage = (SettingsPage);


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



/***/ })

}]);