/* @ds-bundle: {"format":3,"namespace":"MIFDesignSystem_831149","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ThemeToggle","sourcePath":"components/core/ThemeToggle.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"CodeBlock","sourcePath":"components/mif/CodeBlock.jsx"},{"name":"DualView","sourcePath":"components/mif/DualView.jsx"},{"name":"FrontmatterRow","sourcePath":"components/mif/FrontmatterRow.jsx"},{"name":"KnowledgeGraph","sourcePath":"components/mif/KnowledgeGraph.jsx"},{"name":"MemoryRecord","sourcePath":"components/mif/MemoryRecord.jsx"},{"name":"RelationshipEdge","sourcePath":"components/mif/RelationshipEdge.jsx"},{"name":"TypeBadge","sourcePath":"components/mif/TypeBadge.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"7b6ea935d189","components/core/Badge.jsx":"645bc6b98d85","components/core/Button.jsx":"8c83b17fdc2c","components/core/Callout.jsx":"e828d91ffb5b","components/core/Card.jsx":"726c15ed522b","components/core/Chip.jsx":"b566f06552b4","components/core/IconButton.jsx":"9c1a420efe0d","components/core/ThemeToggle.jsx":"f7d92921340f","components/forms/Checkbox.jsx":"919620ddb913","components/forms/Input.jsx":"dfc9a86c4fe0","components/forms/Select.jsx":"b5d090eeb564","components/forms/Switch.jsx":"787e404bdb8b","components/forms/Textarea.jsx":"9f05a6831d9c","components/mif/CodeBlock.jsx":"6e565b0a62eb","components/mif/DualView.jsx":"335844ee3aa0","components/mif/FrontmatterRow.jsx":"71a6358c8942","components/mif/KnowledgeGraph.jsx":"f716a8e75734","components/mif/MemoryRecord.jsx":"4c0349da2d27","components/mif/RelationshipEdge.jsx":"5344d3d0baa5","components/mif/TypeBadge.jsx":"b48c56762058","components/mif/graphLayout.js":"799d30a49d41","components/navigation/Tabs.jsx":"36d68b797db8","ui_kits/graph-explorer/GraphExplorerData.js":"5c40b0d5d98b","ui_kits/graph-explorer/GraphExplorerSidebar.jsx":"5d96246f8cde","ui_kits/mif-site/DocsView.jsx":"55ab61389fa8","ui_kits/mif-site/HarnessPromo.jsx":"ab6b064863a8","ui_kits/mif-site/HomeView.jsx":"f0bd1c274bd7","ui_kits/mif-site/SiteFooter.jsx":"d2d205f2660c","ui_kits/mif-site/SiteHeader.jsx":"c70b8078ed2d","ui_kits/mif-site/SpecView.jsx":"9517cbcbaa67","ui_kits/research-harness/HarnessGraph.jsx":"a57c4a1aa931","ui_kits/research-harness/HarnessMain.jsx":"cda9326ce3ba","ui_kits/research-harness/HarnessSidebar.jsx":"0f02a8ce192e"},"inlinedExternals":[],"unexposedExports":[{"name":"generateDemoGraph","sourcePath":"components/mif/graphLayout.js"},{"name":"prepareGraph","sourcePath":"components/mif/graphLayout.js"},{"name":"runLayout","sourcePath":"components/mif/graphLayout.js"}]} */

(() => {

const __ds_ns = (window.MIFDesignSystem_831149 = window.MIFDesignSystem_831149 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Avatar — a mono-initial identity token. `kind` tints the ring: agent (cyan),
 * person (amber), system (neutral) — echoing the two-reader palette.
 */
function Avatar({
  initials = "",
  kind = "person",
  size = 36,
  src = null,
  style,
  ...rest
}) {
  const tones = {
    agent: "var(--machine)",
    person: "var(--human)",
    system: "var(--border-strong)"
  };
  const ring = tones[kind] || tones.person;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      background: "var(--overlay)",
      border: `1.5px solid ${ring}`,
      color: "var(--text)",
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: size * 0.36,
      letterSpacing: "0.02em",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials.slice(0, 2).toUpperCase());
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Badge — a compact status/level marker. Solid or soft-tinted.
 * Use for conformance levels (Level 1/2/3), status, counts.
 */
function Badge({
  tone = "machine",
  variant = "soft",
  children,
  style,
  ...rest
}) {
  const palette = {
    machine: {
      solid: "var(--machine)",
      tint: "var(--machine-low)",
      text: "var(--machine)"
    },
    human: {
      solid: "var(--human)",
      tint: "var(--human-low)",
      text: "var(--human)"
    },
    green: {
      solid: "var(--green)",
      tint: "rgba(63,185,80,0.14)",
      text: "var(--green)"
    },
    pink: {
      solid: "var(--pink)",
      tint: "rgba(242,85,125,0.14)",
      text: "var(--pink)"
    },
    violet: {
      solid: "var(--violet)",
      tint: "rgba(163,113,247,0.16)",
      text: "var(--violet)"
    },
    neutral: {
      solid: "var(--gray-4)",
      tint: "var(--overlay)",
      text: "var(--text-2)"
    }
  };
  const p = palette[tone] || palette.machine;
  const solid = variant === "solid";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      lineHeight: 1,
      padding: "0.28rem 0.5rem",
      borderRadius: "var(--radius-sm)",
      background: solid ? p.solid : p.tint,
      color: solid ? "var(--void)" : p.text,
      border: solid ? "1px solid transparent" : `1px solid ${p.tint}`,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Button — the primary interactive element.
 * machine-cyan is the primary action; the brand's accent lives on interaction.
 */
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  type = "button",
  onClick,
  style,
  children,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "0.35rem 0.7rem",
      fontSize: "0.8rem",
      gap: "0.35rem"
    },
    md: {
      padding: "0.55rem 1rem",
      fontSize: "0.9rem",
      gap: "0.45rem"
    },
    lg: {
      padding: "0.7rem 1.3rem",
      fontSize: "1rem",
      gap: "0.5rem"
    }
  };
  const variants = {
    primary: {
      background: "var(--machine)",
      color: "var(--void)",
      border: "1px solid var(--machine)",
      fontWeight: 700
    },
    secondary: {
      background: "var(--elevated)",
      color: "var(--text)",
      border: "1px solid var(--border)",
      fontWeight: 600
    },
    ghost: {
      background: "transparent",
      color: "var(--text-2)",
      border: "1px solid transparent",
      fontWeight: 600
    },
    danger: {
      background: "transparent",
      color: "var(--danger)",
      border: "1px solid var(--border)",
      fontWeight: 600
    }
  };
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      background: "var(--machine-strong)",
      borderColor: "var(--machine-strong)"
    },
    secondary: {
      borderColor: "var(--border-strong)"
    },
    ghost: {
      background: "var(--elevated)",
      color: "var(--text)"
    },
    danger: {
      borderColor: "var(--danger)",
      background: "rgba(242,85,125,0.08)"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: sizes[size].gap,
      fontFamily: "var(--font-mono)",
      fontSize: sizes[size].fontSize,
      letterSpacing: "0.02em",
      lineHeight: 1,
      padding: sizes[size].padding,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transform: active && !disabled ? "translateY(1px)" : "none",
      transition: "background var(--motion), border-color var(--motion), transform var(--dur-fast) var(--ease), color var(--motion)",
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, leadingIcon), children, trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, trailingIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Callout — the "promise" block. Amber inline-start marker echoes the brand's
 * blockquote treatment (human emphasis, used sparingly). Tones re-color the marker + icon.
 */
function Callout({
  tone = "human",
  title = null,
  style,
  children,
  ...rest
}) {
  const tones = {
    human: {
      bar: "var(--human)",
      text: "var(--human)"
    },
    machine: {
      bar: "var(--machine)",
      text: "var(--machine)"
    },
    green: {
      bar: "var(--green)",
      text: "var(--green)"
    },
    pink: {
      bar: "var(--pink)",
      text: "var(--pink)"
    },
    neutral: {
      bar: "var(--border-strong)",
      text: "var(--text-2)"
    }
  };
  const t = tones[tone] || tones.human;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--elevated)",
      borderRadius: "var(--radius-md)",
      borderInlineStart: `3px solid ${t.bar}`,
      border: "1px solid var(--border)",
      borderLeft: `3px solid ${t.bar}`,
      padding: "1rem 1.1rem",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: t.text,
      marginBottom: "0.4rem"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-2)",
      fontSize: "0.95rem",
      lineHeight: 1.6
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Card — the elevated panel from the landing page. Optional mono kicker in cyan,
 * hover lifts and the border turns machine-cyan (the "signal on interaction" motif).
 */
function Card({
  kicker = null,
  title = null,
  href = null,
  interactive = false,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const isLink = !!href;
  const lift = interactive || isLink;
  const Tag = isLink ? "a" : "div";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      textDecoration: "none",
      color: "var(--text)",
      background: "var(--elevated)",
      border: `1px solid ${lift && hover ? "var(--machine)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      padding: "1.25rem 1.25rem 1.4rem",
      transform: lift && hover ? "translateY(-2px)" : "none",
      transition: "border-color var(--motion), transform var(--motion)",
      cursor: isLink ? "pointer" : "default",
      ...style
    }
  }, rest), kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
      letterSpacing: "0.04em",
      color: "var(--machine)",
      marginBottom: "0.4rem"
    }
  }, kicker), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.15rem",
      letterSpacing: "0.02em",
      marginBottom: "0.3rem"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--muted)",
      fontSize: "0.92rem",
      lineHeight: 1.55
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Chip — the pill token from the landing page. Reads as a small mono capsule.
 * Tones map to the brand's dual-reader palette: human (amber), machine (cyan), neutral.
 */
function Chip({
  tone = "neutral",
  children,
  style,
  ...rest
}) {
  const tones = {
    human: "var(--human)",
    machine: "var(--machine)",
    neutral: "var(--text-2)",
    violet: "var(--violet)",
    green: "var(--green)",
    pink: "var(--pink)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.85rem",
      lineHeight: 1,
      padding: "0.4rem 0.8rem",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border)",
      background: "var(--elevated)",
      color: tones[tone] || tones.neutral,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF IconButton — a square icon-only control. Ghost by default; hover raises the
 * surface. Pass a Lucide (or any) SVG node as children.
 */
function IconButton({
  variant = "ghost",
  size = "md",
  disabled = false,
  label,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dims = {
    sm: 30,
    md: 36,
    lg: 42
  }[size];
  const variants = {
    ghost: {
      background: "transparent",
      color: "var(--text-2)",
      border: "1px solid transparent"
    },
    outline: {
      background: "var(--elevated)",
      color: "var(--text-2)",
      border: "1px solid var(--border)"
    },
    solid: {
      background: "var(--machine)",
      color: "var(--void)",
      border: "1px solid var(--machine)"
    }
  };
  const hoverStyle = !disabled && hover ? {
    ghost: {
      background: "var(--elevated)",
      color: "var(--text)"
    },
    outline: {
      borderColor: "var(--border-strong)",
      color: "var(--text)"
    },
    solid: {
      background: "var(--machine-strong)",
      borderColor: "var(--machine-strong)"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dims,
      height: dims,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "background var(--motion), border-color var(--motion), color var(--motion)",
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/ThemeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF ThemeToggle — flips between the dark (canonical) and light theme. A minimal
 * inline sun/moon glyph, matching the mark's round-cap stroke style. Controlled.
 */
function ThemeToggle({
  theme = "dark",
  onChange,
  size = "md",
  style,
  ...rest
}) {
  const dims = {
    sm: 30,
    md: 36,
    lg: 42
  }[size] || 36;
  const isDark = theme === "dark";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
    title: isDark ? "Switch to light theme" : "Switch to dark theme",
    onClick: () => onChange && onChange(isDark ? "light" : "dark"),
    style: {
      width: dims,
      height: dims,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      color: "var(--text-2)",
      cursor: "pointer",
      transition: "border-color var(--motion), color var(--motion)",
      ...style
    }
  }, rest), isDark ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4.5",
    stroke: "currentColor",
    strokeWidth: "2"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Checkbox — square check with machine-cyan fill when selected.
 */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label = null,
  id,
  style,
  ...rest
}) {
  const fieldId = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    id: fieldId,
    role: "checkbox",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: "18px",
      height: "18px",
      flex: "none",
      borderRadius: "var(--radius-sm)",
      background: checked ? "var(--machine)" : "var(--overlay)",
      border: `1px solid ${checked ? "var(--machine)" : "var(--border)"}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      cursor: "inherit",
      transition: "background var(--motion), border-color var(--motion)"
    }
  }, rest), checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l4 4L19 7",
    stroke: "var(--void)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)",
      fontSize: "0.9rem"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Input — text field on the overlay surface. Focus ring is machine-cyan.
 * Optional mono label and leading glyph.
 */
function Input({
  label = null,
  hint = null,
  invalid = false,
  leadingIcon = null,
  mono = false,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const borderColor = invalid ? "var(--danger)" : focus ? "var(--machine)" : "var(--border)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.04em",
      color: "var(--text-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "var(--overlay)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      padding: "0 0.75rem",
      boxShadow: focus ? "0 0 0 3px rgba(52,211,232,0.15)" : "none",
      transition: "border-color var(--motion), box-shadow var(--motion)"
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--muted)"
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "var(--text)",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: "0.92rem",
      padding: "0.55rem 0",
      minWidth: 0,
      ...style
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.78rem",
      color: invalid ? "var(--danger)" : "var(--muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Select — native select styled to match Input, with an inline chevron affordance.
 */
function Select({
  label = null,
  hint = null,
  invalid = false,
  options = [],
  style,
  id,
  children,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const borderColor = invalid ? "var(--danger)" : focus ? "var(--machine)" : "var(--border)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.04em",
      color: "var(--text-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      appearance: "none",
      WebkitAppearance: "none",
      background: "var(--overlay)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      color: "var(--text)",
      fontFamily: "var(--font-sans)",
      fontSize: "0.92rem",
      padding: "0.55rem 2.2rem 0.55rem 0.75rem",
      outline: "none",
      boxShadow: focus ? "0 0 0 3px rgba(52,211,232,0.15)" : "none",
      transition: "border-color var(--motion), box-shadow var(--motion)",
      ...style
    }
  }, rest), options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)), children), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      position: "absolute",
      right: "0.7rem",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "var(--muted)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.78rem",
      color: invalid ? "var(--danger)" : "var(--muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Switch — a toggle. On = machine-cyan track. Used for view/mode toggles.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label = null,
  id,
  style,
  ...rest
}) {
  const fieldId = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    id: fieldId,
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: "38px",
      height: "22px",
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--machine)" : "var(--overlay)",
      border: `1px solid ${checked ? "var(--machine)" : "var(--border)"}`,
      position: "relative",
      padding: 0,
      cursor: "inherit",
      transition: "background var(--motion), border-color var(--motion)"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "2px",
      left: checked ? "18px" : "2px",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      background: checked ? "var(--void)" : "var(--text-2)",
      transition: "left var(--motion)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)",
      fontSize: "0.9rem"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Textarea — multi-line field. Mono by default (frontmatter / markdown authoring).
 */
function Textarea({
  label = null,
  hint = null,
  invalid = false,
  mono = true,
  rows = 4,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const borderColor = invalid ? "var(--danger)" : focus ? "var(--machine)" : "var(--border)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.04em",
      color: "var(--text-2)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      background: "var(--overlay)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      color: "var(--text)",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      padding: "0.6rem 0.75rem",
      outline: "none",
      resize: "vertical",
      boxShadow: focus ? "0 0 0 3px rgba(52,211,232,0.15)" : "none",
      transition: "border-color var(--motion), box-shadow var(--motion)",
      ...style
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.78rem",
      color: invalid ? "var(--danger)" : "var(--muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/mif/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF CodeBlock — a mono panel with an optional titled header (filename + language chip)
 * and syntax-tinted content. Renders raw children (pre-highlighted) or plain text via `code`.
 * Keys tint cyan, values amber when `lang="frontmatter"` and `code` is a plain string.
 */
function CodeBlock({
  title = null,
  lang = "text",
  code = null,
  style,
  children,
  ...rest
}) {
  const renderFrontmatter = src => src.split("\n").map((line, i) => {
    const m = line.match(/^(\s*)([\w@$-]+)(:)(.*)$/);
    if (m) {
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("span", null, m[1]), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--machine)"
        }
      }, m[2]), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--muted)"
        }
      }, m[3]), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--human)"
        }
      }, m[4]));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        color: "var(--text-2)"
      }
    }, line || "\u00a0");
  });
  const body = children ? children : lang === "frontmatter" && typeof code === "string" ? renderFrontmatter(code) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)"
    }
  }, code);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--overlay)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem 0.85rem",
      borderBottom: "1px solid var(--hairline)",
      background: "var(--void)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      color: "var(--text-2)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--machine)"
    }
  }, lang)), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: "0.9rem 1rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.82rem",
      lineHeight: 1.65,
      color: "var(--text-2)",
      overflowX: "auto"
    }
  }, body));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/mif/FrontmatterRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF FrontmatterRow — a key/value metadata row. Mono key in cyan, mono value.
 * Compose a stack of these to render a concept's frontmatter or a provenance block.
 */
function FrontmatterRow({
  name,
  children,
  value,
  tone = "default",
  copyable = false,
  style,
  ...rest
}) {
  const [copied, setCopied] = React.useState(false);
  const valueColor = {
    default: "var(--text)",
    muted: "var(--text-2)",
    human: "var(--human)"
  }[tone] || "var(--text)";
  const raw = children ?? value;
  function doCopy(e) {
    e.stopPropagation();
    const text = typeof raw === "string" ? raw : String(raw ?? "");
    navigator.clipboard.writeText(text).then(function () {
      setCopied(true);
      setTimeout(function () { setCopied(false); }, 1200);
    });
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "1rem",
      alignItems: "baseline",
      padding: "0.4rem 0",
      borderBottom: "1px solid var(--hairline)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.82rem",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--machine)",
      minWidth: "8.5rem",
      flex: "none"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: valueColor,
      wordBreak: "break-word",
      flex: 1
    }
  }, raw), copyable && /*#__PURE__*/React.createElement("button", {
    onClick: doCopy,
    title: copied ? "Copied" : "Copy",
    "aria-label": copied ? "Copied" : "Copy " + name,
    style: {
      flex: "none", border: "none", background: "transparent", cursor: "pointer",
      color: copied ? "var(--machine)" : "var(--muted)", padding: "0.1rem", lineHeight: 0,
    }
  }, copied ? /*#__PURE__*/React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/React.createElement("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })) : /*#__PURE__*/React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/React.createElement("rect", { x: "9", y: "9", width: "12", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "2" }), /*#__PURE__*/React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1", stroke: "currentColor", strokeWidth: "2" }))));
}
Object.assign(__ds_scope, { FrontmatterRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/FrontmatterRow.jsx", error: String((e && e.message) || e) }); }

// components/mif/RelationshipEdge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF RelationshipEdge — a typed relationship between two concepts, rendered as
 * source · —type→ · target. The typed overlay on OKF's untyped links, made visible.
 */
function RelationshipEdge({
  source,
  type = "derived-from",
  target,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
      padding: "0.4rem 0.6rem",
      borderRadius: "var(--radius-md)",
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, source), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      color: "var(--machine)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "1px",
      background: "var(--border-strong)"
    }
  }), type, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6",
    stroke: "var(--machine)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)"
    }
  }, target));
}
Object.assign(__ds_scope, { RelationshipEdge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/RelationshipEdge.jsx", error: String((e && e.message) || e) }); }

// components/mif/TypeBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF TypeBadge — the base knowledge type marker: semantic / episodic / procedural.
 * Each carries a fixed tone so a type is recognizable at a glance across the system.
 */
const TYPES = {
  semantic: {
    tone: "var(--machine)",
    tint: "var(--machine-low)",
    label: "semantic"
  },
  episodic: {
    tone: "var(--human)",
    tint: "var(--human-low)",
    label: "episodic"
  },
  procedural: {
    tone: "var(--violet)",
    tint: "rgba(163,113,247,0.14)",
    label: "procedural"
  }
};
function TypeBadge({
  type = "semantic",
  dot = true,
  style,
  ...rest
}) {
  const t = TYPES[type] || TYPES.semantic;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "0.3rem 0.6rem",
      borderRadius: "var(--radius-pill)",
      background: t.tint,
      color: t.tone,
      border: `1px solid ${t.tone}`,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: t.tone
    }
  }), t.label);
}
Object.assign(__ds_scope, { TypeBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/TypeBadge.jsx", error: String((e && e.message) || e) }); }

// components/mif/graphLayout.js
try { (() => {
/**
 * MIF graph layout engine — dependency-free force-directed layout that scales to
 * tens of thousands of nodes. Barnes-Hut approximates repulsion (O(n log n) instead
 * of O(n^2)); the simulation runs chunked across animation frames so it never blocks
 * the main thread. No npm packages, no DOM — pure math, consumed by KnowledgeGraph.jsx.
 */

const THETA = 0.85; // Barnes-Hut approximation threshold (higher = faster, coarser)
const MAX_FORCE = 60; // clamp to avoid singularities when nodes nearly overlap
const MAX_DEPTH = 28; // quadtree recursion cap (guards degenerate/duplicate points)

// ---------------------------------------------------------------- quadtree

function makeQuad(x0, y0, x1, y1) {
  return {
    x0,
    y0,
    x1,
    y1,
    mass: 0,
    cx: 0,
    cy: 0,
    node: null,
    children: null
  };
}
function subdivide(qt) {
  const mx = (qt.x0 + qt.x1) / 2,
    my = (qt.y0 + qt.y1) / 2;
  qt.children = [makeQuad(qt.x0, qt.y0, mx, my), makeQuad(mx, qt.y0, qt.x1, my), makeQuad(qt.x0, my, mx, qt.y1), makeQuad(mx, my, qt.x1, qt.y1)];
}
function quadOf(qt, n) {
  const mx = (qt.x0 + qt.x1) / 2,
    my = (qt.y0 + qt.y1) / 2;
  const right = n.x >= mx,
    bottom = n.y >= my;
  if (!right && !bottom) return 0;
  if (right && !bottom) return 1;
  if (!right && bottom) return 2;
  return 3;
}
function insert(qt, n, depth) {
  if (qt.mass === 0 && !qt.children) {
    qt.node = n;
    qt.mass = n.mass || 1;
    qt.cx = n.x;
    qt.cy = n.y;
    return;
  }
  const m = n.mass || 1;
  const newMass = qt.mass + m;
  qt.cx = (qt.cx * qt.mass + n.x * m) / newMass;
  qt.cy = (qt.cy * qt.mass + n.y * m) / newMass;
  qt.mass = newMass;
  if (depth >= MAX_DEPTH) return; // merge into aggregate mass, stop subdividing

  if (!qt.children) {
    subdivide(qt);
    const existing = qt.node;
    qt.node = null;
    insert(qt.children[quadOf(qt, existing)], existing, depth + 1);
    insert(qt.children[quadOf(qt, n)], n, depth + 1);
  } else {
    insert(qt.children[quadOf(qt, n)], n, depth + 1);
  }
}
function buildQuadtree(nodes) {
  let x0 = Infinity,
    y0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity;
  for (const n of nodes) {
    if (n.x < x0) x0 = n.x;
    if (n.x > x1) x1 = n.x;
    if (n.y < y0) y0 = n.y;
    if (n.y > y1) y1 = n.y;
  }
  if (!isFinite(x0)) {
    x0 = y0 = -1;
    x1 = y1 = 1;
  }
  const pad = Math.max(1, (x1 - x0) * 0.05, (y1 - y0) * 0.05);
  const root = makeQuad(x0 - pad, y0 - pad, x1 + pad, y1 + pad);
  for (const n of nodes) insert(root, n, 0);
  return root;
}
function applyRepulsion(qt, n, strength, out) {
  if (qt.mass === 0) return;
  const dx = n.x - qt.cx,
    dy = n.y - qt.cy;
  const distSq = dx * dx + dy * dy;
  if (distSq < 1e-4) return; // self or exact overlap
  const size = qt.x1 - qt.x0;
  if (!qt.children || size * size / distSq < THETA * THETA) {
    const dist = Math.sqrt(distSq);
    const force = Math.min(strength * qt.mass / distSq, MAX_FORCE);
    out.fx += dx / dist * force;
    out.fy += dy / dist * force;
    return;
  }
  for (const c of qt.children) applyRepulsion(c, n, strength, out);
}

// ---------------------------------------------------------------- graph prep

/**
 * Normalizes raw {id,label,type,group} nodes and {source,target,type} edges into a
 * simulation-ready graph: resolves edge endpoints to node refs, assigns cluster
 * centers per group (falling back to type, then a single cluster), and seeds
 * starting positions near their cluster.
 */
function prepareGraph(rawNodes, rawEdges) {
  const groupOrder = [];
  const groupIndex = new Map();
  const nodes = (rawNodes || []).map(n => {
    const key = n.group || n.type || "default";
    if (!groupIndex.has(key)) {
      groupIndex.set(key, groupOrder.length);
      groupOrder.push(key);
    }
    return {
      ...n,
      id: n.id,
      label: n.label != null ? n.label : n.id,
      type: n.type || "semantic",
      group: key,
      weight: n.weight || 1,
      mass: 1,
      degree: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    };
  });
  const groupCount = Math.max(groupOrder.length, 1);
  const centers = new Map();
  groupOrder.forEach((key, i) => {
    const angle = i / groupCount * Math.PI * 2;
    const R = 180 + groupCount * 34;
    centers.set(key, {
      x: Math.cos(angle) * R,
      y: Math.sin(angle) * R
    });
  });
  nodes.forEach(n => {
    const c = centers.get(n.group) || {
      x: 0,
      y: 0
    };
    const a = Math.random() * Math.PI * 2,
      r = Math.random() * 60;
    n.x = c.x + Math.cos(a) * r;
    n.y = c.y + Math.sin(a) * r;
    n.clusterX = c.x;
    n.clusterY = c.y;
  });
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const edges = [];
  for (const e of rawEdges || []) {
    const s = nodeMap.get(e.source),
      t = nodeMap.get(e.target);
    if (!s || !t || s === t) continue;
    s.degree++;
    t.degree++;
    edges.push({
      source: e.source,
      target: e.target,
      type: e.type || "related",
      _s: s,
      _t: t
    });
  }
  return {
    nodes,
    edges
  };
}
function layoutStep(nodes, edges, opts) {
  const {
    repulsion = 900,
    springLength = 42,
    springStrength = 0.02,
    centerStrength = 0.012,
    damping = 0.82
  } = opts;
  const qt = buildQuadtree(nodes);
  for (const n of nodes) {
    const out = {
      fx: 0,
      fy: 0
    };
    applyRepulsion(qt, n, repulsion, out);
    out.fx += (n.clusterX - n.x) * centerStrength;
    out.fy += (n.clusterY - n.y) * centerStrength;
    n._fx = out.fx;
    n._fy = out.fy;
  }
  for (const e of edges) {
    const a = e._s,
      b = e._t;
    const dx = b.x - a.x,
      dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
    const f = (dist - springLength) * springStrength;
    const fx = dx / dist * f,
      fy = dy / dist * f;
    a._fx += fx;
    a._fy += fy;
    b._fx -= fx;
    b._fy -= fy;
  }
  for (const n of nodes) {
    n.vx = (n.vx + n._fx) * damping;
    n.vy = (n.vy + n._fy) * damping;
    n.x += n.vx;
    n.y += n.vy;
  }
}

/**
 * Runs the simulation and reports progress. Small/medium graphs settle synchronously
 * in a single pass — this is the common case, and it makes them immune to any
 * animation-frame scheduling quirks (backgrounded tabs, host re-renders interrupting
 * a chunked loop): there's no async gap in which the layout can be left unfinished.
 * Only graphs above the threshold are chunked across animation frames, so a 25k-node
 * layout still can't block the main thread. Returns a cancel function.
 */
const SYNC_THRESHOLD = 800;
function runLayout(nodes, edges, opts = {}) {
  const {
    iterations = 140,
    onProgress,
    onDone
  } = opts;
  if (nodes.length <= SYNC_THRESHOLD) {
    for (let i = 0; i < iterations; i++) layoutStep(nodes, edges, opts);
    if (onProgress) onProgress(1);
    if (onDone) onDone();
    return () => {};
  }
  let i = 0;
  let cancelled = false;
  const stepsPerFrame = nodes.length > 4000 ? 1 : 2;
  function frame() {
    if (cancelled) return;
    for (let s = 0; s < stepsPerFrame && i < iterations; s++, i++) {
      layoutStep(nodes, edges, opts);
    }
    if (onProgress) onProgress(Math.min(i / iterations, 1));
    if (i < iterations) setTimeout(frame, 0);else if (onDone) onDone();
  }
  setTimeout(frame, 0);
  return () => {
    cancelled = true;
  };
}

/**
 * Synthetic demo graph generator for stress-testing / previews. Creates sub-groups
 * per type (so the layout shows visible community structure) with mostly-intra-group
 * edges and a fraction of cross-group edges — echoing MIF's cross-topic concordance.
 */
function generateDemoGraph(nodeCount = 300) {
  const types = ["semantic", "episodic", "procedural"];
  const groupsPerType = Math.max(2, Math.round(Math.sqrt(nodeCount) / 3));
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const type = types[i % types.length];
    nodes.push({
      id: "n" + i,
      label: type + "-concept-" + i,
      type,
      group: type + "-" + i % groupsPerType
    });
  }
  const byGroup = new Map();
  nodes.forEach(n => {
    if (!byGroup.has(n.group)) byGroup.set(n.group, []);
    byGroup.get(n.group).push(n);
  });
  const groupKeys = [...byGroup.keys()];
  const edgeTypes = ["derived-from", "supports", "conflicts-with", "supersedes", "part-of"];
  const edges = [];
  for (let i = 0; i < nodeCount; i++) {
    const n = nodes[i];
    const degree = 1 + Math.floor(Math.random() * 2);
    for (let d = 0; d < degree; d++) {
      const pool = Math.random() < 0.82 ? byGroup.get(n.group) : byGroup.get(groupKeys[Math.random() * groupKeys.length | 0]);
      const target = pool[Math.random() * pool.length | 0];
      if (target && target.id !== n.id) {
        edges.push({
          source: n.id,
          target: target.id,
          type: edgeTypes[Math.random() * edgeTypes.length | 0]
        });
      }
    }
  }
  return {
    nodes,
    edges
  };
}
Object.assign(__ds_scope, { prepareGraph, runLayout, generateDemoGraph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/graphLayout.js", error: String((e && e.message) || e) }); }

// components/mif/KnowledgeGraph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TYPE_CHIP_TONE = {
  semantic: "machine",
  episodic: "human",
  procedural: "violet"
};
const TYPE_LABEL = {
  semantic: "semantic",
  episodic: "episodic",
  procedural: "procedural"
};
const MIN_SCREEN_RADIUS = 2.5;
function nodeRadius(n, scale) {
  const worldR = Math.min(2.2 + Math.sqrt(n.degree || 1) * 1.1, 9);
  return Math.max(worldR, MIN_SCREEN_RADIUS / scale);
}
function readThemeColors(el) {
  const cs = getComputedStyle(el);
  const g = (name, fallback) => (cs.getPropertyValue(name) || fallback).trim();
  return {
    bg: g("--base", "#0e121b"),
    edge: g("--border-strong", "#3c4b63"),
    text: g("--text", "#e8eef6"),
    ring: g("--text", "#e8eef6"),
    semantic: g("--machine", "#34d3e8"),
    episodic: g("--human", "#f5b642"),
    procedural: g("--violet", "#a371f7"),
    mono: g("--font-mono", "monospace")
  };
}
function buildGrid(nodes, cellSize) {
  const grid = new Map();
  for (const n of nodes) {
    const cx = Math.floor(n.x / cellSize),
      cy = Math.floor(n.y / cellSize);
    const key = cx + "," + cy;
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(n);
  }
  return grid;
}

/**
 * MIF KnowledgeGraph — a dependency-free, canvas-rendered force-directed graph.
 * Search, per-type filtering, wheel-zoom + drag-pan, and hover/click inspection are
 * all built in. Scales from a handful of nodes to tens of thousands: layout runs via
 * Barnes-Hut approximation chunked across animation frames, and rendering batches
 * nodes/edges into a handful of canvas fill/stroke calls regardless of graph size.
 */
function KnowledgeGraph({
  nodes,
  edges,
  height = 520,
  iterations = 140,
  maxRenderNodes = 6000,
  onSelectNode,
  style,
  ...rest
}) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const graphRef = React.useRef({
    nodes: [],
    edges: []
  });
  const transformRef = React.useRef({
    scale: 0.35,
    x: 0,
    y: 0
  });
  const dragRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const cellSizeRef = React.useRef(46);
  const cancelRef = React.useRef(null);
  const filterRef = React.useRef({
    search: "",
    isolate: false,
    hidden: new Set()
  });
  const autoFitRef = React.useRef(true); // keep re-fitting on resize until the user manually navigates

  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState("layout");
  const [search, setSearch] = React.useState("");
  const [isolate, setIsolate] = React.useState(false);
  const [hidden, setHidden] = React.useState(() => new Set());
  const [hover, setHover] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [counts, setCounts] = React.useState({
    total: 0,
    edges: 0,
    matched: 0,
    visible: 0
  });
  const redraw = React.useCallback(() => {
    const canvas = canvasRef.current,
      container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    // CSS-pixel dimensions come straight from the container's live layout box, not the
    // canvas backing store — so a draw is correct even if resizeCanvas hasn't run yet.
    const cw = container.clientWidth || 1,
      ch = container.clientHeight || 1;
    if (canvas.width !== Math.round(cw * dpr)) canvas.width = Math.max(1, Math.round(cw * dpr));
    if (canvas.height !== Math.round(ch * dpr)) canvas.height = Math.max(1, Math.round(ch * dpr));
    const colors = readThemeColors(container);
    const {
      scale,
      x: panX,
      y: panY
    } = transformRef.current;
    const {
      search: term,
      isolate: iso,
      hidden: hiddenSet
    } = filterRef.current;
    const graph = graphRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, cw, ch);
    ctx.save();
    ctx.translate(cw / 2 + panX, ch / 2 + panY);
    ctx.scale(scale, scale);
    const viewLeft = (-cw / 2 - panX) / scale,
      viewRight = (cw / 2 - panX) / scale;
    const viewTop = (-ch / 2 - panY) / scale,
      viewBottom = (ch / 2 - panY) / scale;
    const margin = 60;
    const term_ = term.trim().toLowerCase();
    const hasSearch = term_.length > 0;
    const visible = [];
    for (const n of graph.nodes) {
      if (hiddenSet.has(n.type)) continue;
      if (n.x < viewLeft - margin || n.x > viewRight + margin || n.y < viewTop - margin || n.y > viewBottom + margin) continue;
      visible.push(n);
    }
    let toDraw = visible;
    if (visible.length > maxRenderNodes) {
      const stride = Math.ceil(visible.length / maxRenderNodes);
      toDraw = visible.filter((_, i) => i % stride === 0);
    }

    // edges — single batched stroke, only past a legible zoom level
    if (scale > 0.18) {
      const drawSet = new Set(toDraw.map(n => n.id));
      ctx.lineWidth = Math.max(0.4 / scale, 0.15);
      ctx.strokeStyle = colors.edge;
      ctx.globalAlpha = Math.min(0.5, scale * 0.4);
      const path = new Path2D();
      for (const e of graph.edges) {
        if (!drawSet.has(e.source) && !drawSet.has(e.target)) continue;
        if (hiddenSet.has(e._s.type) || hiddenSet.has(e._t.type)) continue;
        path.moveTo(e._s.x, e._s.y);
        path.lineTo(e._t.x, e._t.y);
      }
      ctx.stroke(path);
      ctx.globalAlpha = 1;
    }

    // nodes — batched into one Path2D per (type × matched) group
    const groups = {};
    let matchedCount = 0;
    for (const n of toDraw) {
      const isMatch = !hasSearch || n.label && n.label.toLowerCase().includes(term_);
      if (isMatch && hasSearch) matchedCount++;
      if (hasSearch && iso && !isMatch) continue;
      const key = n.type + (isMatch ? ":m" : ":d");
      if (!groups[key]) groups[key] = {
        path: new Path2D(),
        dim: hasSearch && !isMatch,
        type: n.type
      };
      const r = nodeRadius(n, scale);
      groups[key].path.moveTo(n.x + r, n.y);
      groups[key].path.arc(n.x, n.y, r, 0, Math.PI * 2);
    }
    Object.values(groups).forEach(g => {
      ctx.globalAlpha = g.dim ? 0.12 : 0.92;
      ctx.fillStyle = colors[g.type] || colors.text;
      ctx.fill(g.path);
    });
    ctx.globalAlpha = 1;

    // labels — capped count, only when zoomed in enough to be legible
    if (scale > 1.1) {
      const withLabels = (hasSearch ? toDraw.filter(n => n.label.toLowerCase().includes(term_)) : toDraw).sort((a, b) => (b.degree || 0) - (a.degree || 0)).slice(0, 140);
      ctx.font = 11 / scale + "px " + colors.mono;
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "middle";
      for (const n of withLabels) {
        const r = nodeRadius(n, scale);
        ctx.fillText(n.label, n.x + r + 4 / scale, n.y);
      }
    }

    // selection / hover ring
    [selected, hover && hover.node].forEach(n => {
      if (!n) return;
      const r = nodeRadius(n, scale) + 2.5;
      ctx.lineWidth = 1.8 / scale;
      ctx.strokeStyle = colors.ring;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();
    setCounts({
      total: graph.nodes.length,
      edges: graph.edges.length,
      matched: hasSearch ? matchedCount : graph.nodes.length,
      visible: toDraw.length
    });
  }, [maxRenderNodes, selected, hover]);
  const fitToView = React.useCallback(() => {
    const container = containerRef.current;
    const nodes = graphRef.current.nodes;
    if (!container || !nodes.length) return;
    let x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;
    for (const n of nodes) {
      if (n.x < x0) x0 = n.x;
      if (n.x > x1) x1 = n.x;
      if (n.y < y0) y0 = n.y;
      if (n.y > y1) y1 = n.y;
    }
    const cw = container.clientWidth || 1,
      ch = container.clientHeight || 1;
    const bw = Math.max(x1 - x0, 1),
      bh = Math.max(y1 - y0, 1);
    const scale = Math.min(cw / bw, ch / bh, 2.2) * 0.85;
    transformRef.current = {
      scale,
      x: -((x0 + x1) / 2) * scale,
      y: -((y0 + y1) / 2) * scale
    };
    redraw();
  }, [redraw]);
  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current,
      container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, container.clientWidth) * dpr;
    canvas.height = Math.max(1, container.clientHeight) * dpr;
    redraw();
  }, [redraw]);
  const screenToWorld = React.useCallback((sx, sy) => {
    const container = containerRef.current;
    const cw = container.clientWidth || 1,
      ch = container.clientHeight || 1;
    const {
      scale,
      x: panX,
      y: panY
    } = transformRef.current;
    return {
      x: (sx - cw / 2 - panX) / scale,
      y: (sy - ch / 2 - panY) / scale
    };
  }, []);
  const hitTest = React.useCallback((wx, wy) => {
    const grid = gridRef.current;
    if (!grid) return null;
    const cs = cellSizeRef.current;
    const cx = Math.floor(wx / cs),
      cy = Math.floor(wy / cs);
    const {
      scale
    } = transformRef.current;
    const threshold = 20 / scale;
    let best = null,
      bestDist = threshold;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const bucket = grid.get(cx + dx + "," + (cy + dy));
        if (!bucket) continue;
        for (const n of bucket) {
          if (filterRef.current.hidden.has(n.type)) continue;
          const d = Math.hypot(n.x - wx, n.y - wy);
          if (d < bestDist) {
            bestDist = d;
            best = n;
          }
        }
      }
    }
    return best;
  }, []);
  const zoomBy = React.useCallback((factor, sx, sy) => {
    autoFitRef.current = false; // user is taking manual control of the view
    const before = screenToWorld(sx, sy);
    const t = transformRef.current;
    t.scale = Math.min(Math.max(t.scale * factor, 0.03), 8);
    const container = containerRef.current;
    const cw = container.clientWidth || 1,
      ch = container.clientHeight || 1;
    t.x = sx - cw / 2 - before.x * t.scale;
    t.y = sy - ch / 2 - before.y * t.scale;
    redraw();
  }, [redraw, screenToWorld]);

  // (re)build the simulation whenever the input graph changes
  React.useEffect(() => {
    resizeCanvas(); // ensure the canvas has real pixel dimensions before we draw/fit anything
    const prepared = __ds_scope.prepareGraph(nodes || [], edges || []);
    graphRef.current = prepared;
    gridRef.current = null;
    setPhase("layout");
    setProgress(0);
    setSelected(null);
    setHover(null);
    transformRef.current = {
      scale: 0.3,
      x: 0,
      y: 0
    };
    if (cancelRef.current) cancelRef.current();
    cancelRef.current = __ds_scope.runLayout(prepared.nodes, prepared.edges, {
      iterations,
      onProgress: p => {
        setProgress(p);
        redraw();
      },
      onDone: () => {
        cellSizeRef.current = 46;
        gridRef.current = buildGrid(prepared.nodes, cellSizeRef.current);
        setPhase("ready");
        resizeCanvas(); // re-check in case the container size settled while we were laying out
        fitToView();
      }
    });
    return () => {
      if (cancelRef.current) cancelRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, iterations]);

  // mirror filter state into a ref (read by the imperative redraw loop) + trigger redraw
  React.useEffect(() => {
    filterRef.current = {
      search,
      isolate,
      hidden
    };
    redraw();
  }, [search, isolate, hidden, redraw]);

  // canvas plumbing: resize, wheel-zoom, drag-pan, hover/click
  React.useEffect(() => {
    resizeCanvas();
    const ro = new ResizeObserver(() => {
      // the container can settle to its final size shortly after mount (e.g. the
      // preview iframe finishing its own layout pass) — keep re-fitting until the
      // user has taken manual control (panned/zoomed), so the graph always ends up
      // filling the canvas rather than being sized to a transient measurement.
      if (autoFitRef.current) fitToView();else resizeCanvas();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    const canvas = canvasRef.current;
    function onWheel(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      zoomBy(Math.pow(1.0016, -e.deltaY), e.clientX - rect.left, e.clientY - rect.top);
    }
    function onPointerDown(e) {
      autoFitRef.current = false; // user is taking manual control of the view
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        panX: transformRef.current.x,
        panY: transformRef.current.y,
        moved: false
      };
      canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left,
        sy = e.clientY - rect.top;
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startX,
          dy = e.clientY - dragRef.current.startY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragRef.current.moved = true;
        transformRef.current.x = dragRef.current.panX + dx;
        transformRef.current.y = dragRef.current.panY + dy;
        redraw();
        return;
      }
      const world = screenToWorld(sx, sy);
      const node = hitTest(world.x, world.y);
      setHover(node ? {
        node,
        sx,
        sy
      } : null);
    }
    function onPointerUp(e) {
      const wasDrag = dragRef.current && dragRef.current.moved;
      if (!wasDrag) {
        const rect = canvas.getBoundingClientRect();
        const world = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
        const node = hitTest(world.x, world.y);
        setSelected(node);
        if (onSelectNode) onSelectNode(node);
      }
      dragRef.current = null;
    }
    canvas.addEventListener("wheel", onWheel, {
      passive: false
    });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", () => setHover(null));
    return () => {
      ro.disconnect();
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const presentTypes = React.useMemo(() => {
    const s = new Set();
    (nodes || []).forEach(n => s.add(n.type || "semantic"));
    return [...s];
  }, [nodes]);
  function toggleType(t) {
    setHidden(prev => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);else next.add(t);
      return next;
    });
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.6rem",
      minHeight: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.6rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search nodes\u2026",
    style: {
      minWidth: "10rem"
    },
    hint: undefined
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.4rem"
    }
  }, presentTypes.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => toggleType(t),
    style: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: TYPE_CHIP_TONE[t] || "neutral",
    style: {
      opacity: hidden.has(t) ? 0.35 : 1
    }
  }, TYPE_LABEL[t] || t)))), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: isolate,
    onChange: setIsolate,
    label: "Isolate matches"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.3rem",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Zoom out",
    variant: "outline",
    size: "sm",
    onClick: () => {
      const c = containerRef.current;
      zoomBy(0.7, (c && c.clientWidth || 0) / 2, (c && c.clientHeight || 0) / 2);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Zoom in",
    variant: "outline",
    size: "sm",
    onClick: () => {
      const c = containerRef.current;
      zoomBy(1.4, (c && c.clientWidth || 0) / 2, (c && c.clientHeight || 0) / 2);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Fit to view",
    variant: "outline",
    size: "sm",
    onClick: fitToView
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: {
      position: "relative",
      ...(height === "100%" || height === "fill" ? {
        flex: "1 1 auto",
        minHeight: 0
      } // fill the remaining space of a flexed ancestor (full-screen hosts)
      : {
        height: typeof height === "number" ? height + "px" : height
      }),
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border)",
      overflow: "hidden",
      background: "var(--base)"
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      width: "100%",
      height: "100%",
      display: "block",
      cursor: dragRef.current ? "grabbing" : "grab",
      touchAction: "none"
    }
  }), phase === "layout" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      background: "rgba(10,13,19,0.35)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
      color: "var(--text-2)"
    }
  }, "Arranging ", (nodes || []).length.toLocaleString(), " nodes\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "12rem",
      height: "3px",
      background: "var(--overlay)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: progress * 100 + "%",
      height: "100%",
      background: "var(--machine)",
      transition: "width 0.1s linear"
    }
  }))), hover && hover.node && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: hover.sx + 12,
      top: hover.sy + 12,
      pointerEvents: "none",
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      padding: "0.35rem 0.6rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      color: "var(--text)",
      boxShadow: "var(--shadow-md)",
      maxWidth: "16rem",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", null, hover.node.label), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--muted)",
      fontSize: "0.68rem",
      marginTop: "0.15rem"
    }
  }, hover.node.type, " \xB7 degree ", hover.node.degree)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "0.75rem",
      bottom: "0.6rem",
      display: "flex",
      gap: "0.9rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, counts.total.toLocaleString(), " nodes"), /*#__PURE__*/React.createElement("span", null, counts.edges.toLocaleString(), " edges"), search.trim() && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--machine)"
    }
  }, counts.matched.toLocaleString(), " matched"))));
}
Object.assign(__ds_scope, { KnowledgeGraph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/KnowledgeGraph.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF Tabs — underline tab bar. The active tab is marked by a machine-cyan underline.
 * Ideal for dual-view toggles (Markdown | JSON-LD).
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(tabs[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = id => {
    setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "0.25rem",
      borderBottom: "1px solid var(--border)",
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => select(t.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        letterSpacing: "0.02em",
        color: on ? "var(--text)" : "var(--muted)",
        padding: "0.55rem 0.75rem",
        borderBottom: `2px solid ${on ? "var(--machine)" : "transparent"}`,
        marginBottom: "-1px",
        transition: "color var(--motion), border-color var(--motion)"
      }
    }, t.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex"
      }
    }, t.icon), t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/mif/DualView.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIF DualView — the brand thesis made interactive. One artifact, two readers:
 * a Markdown tab (what a person reads) and a JSON-LD tab (what a parser resolves),
 * toggled with a machine-cyan underline. Pass both projections; they are the same document.
 */
function DualView({
  markdown = "",
  jsonld = "",
  title = "concept",
  style,
  ...rest
}) {
  const [view, setView] = React.useState("markdown");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.6rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    value: view,
    onChange: setView,
    tabs: [{
      id: "markdown",
      label: "Markdown",
      icon: /*#__PURE__*/React.createElement(Dot, {
        color: "var(--human)"
      })
    }, {
      id: "jsonld",
      label: "JSON-LD",
      icon: /*#__PURE__*/React.createElement(Dot, {
        color: "var(--machine)"
      })
    }],
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: view === "markdown" ? `${title}.md` : `${title}.jsonld`,
    lang: view === "markdown" ? "frontmatter" : "json",
    code: view === "markdown" ? markdown : jsonld
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.55rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      color: "var(--muted)",
      letterSpacing: "0.03em"
    }
  }, "one artifact \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--human)"
    }
  }, "human-readable"), " \u21C4 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--machine)"
    }
  }, "machine-parseable"), " \xB7 losslessly"));
}
function Dot({
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: color,
      display: "inline-block"
    }
  });
}
Object.assign(__ds_scope, { DualView });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/DualView.jsx", error: String((e && e.message) || e) }); }

// components/mif/MemoryRecord.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CopyIconButton({ text, label }) {
  const [copied, setCopied] = React.useState(false);
  function doCopy() {
    navigator.clipboard.writeText(text || "").then(function () {
      setCopied(true);
      setTimeout(function () { setCopied(false); }, 1200);
    });
  }
  return /*#__PURE__*/React.createElement("button", {
    onClick: doCopy,
    title: copied ? "Copied" : "Copy " + label,
    "aria-label": copied ? "Copied" : "Copy " + label,
    style: {
      border: "none", background: "transparent", cursor: "pointer",
      color: copied ? "var(--machine)" : "var(--muted)", padding: "0.1rem", lineHeight: 0,
      display: "inline-flex", alignItems: "center",
    }
  }, copied ? /*#__PURE__*/React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/React.createElement("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })) : /*#__PURE__*/React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/React.createElement("rect", { x: "9", y: "9", width: "12", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "2" }), /*#__PURE__*/React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1", stroke: "currentColor", strokeWidth: "2" })));
}
const TRUST_TONE = {
  verified: "green",
  high_confidence: "green",
  moderate_confidence: "machine",
  low_confidence: "human",
  uncertain: "pink"
};
const SECTION_LABEL_STYLE = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "0.6rem"
};
function prune(obj) {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null) out[k] = v;
  });
  return out;
}
function buildJsonLd(record) {
  const obj = prune({
    "@context": "https://mif-spec.dev/schema/context.jsonld",
    "@type": record.type || "Memory",
    "@id": record.id,
    conceptType: record.conceptType,
    title: record.title,
    summary: record.summary,
    content: record.content,
    created: record.created,
    modified: record.modified,
    ontology: record.ontology,
    namespace: record.namespace,
    tags: record.tags,
    entities: record.entities,
    relationships: record.relationships,
    temporal: record.temporal,
    provenance: record.provenance,
    citations: record.citations
  });
  return JSON.stringify(obj, null, 2);
}
function buildFrontmatter(record) {
  const ont = record.ontology ? record.ontology.id + (record.ontology.version ? "@" + record.ontology.version : "") : undefined;
  const lines = ["@id: " + record.id, "conceptType: " + record.conceptType, record.title ? "title: " + record.title : null, ont ? "ontology: " + ont : null, record.namespace ? "namespace: " + record.namespace : null, record.tags && record.tags.length ? "tags: [" + record.tags.join(", ") + "]" : null, "created: " + record.created, record.modified ? "modified: " + record.modified : null].filter(Boolean);
  return "---\n" + lines.join("\n") + "\n---\n\n" + (record.content || "");
}

/**
 * MIF MemoryRecord — the full memory unit, expanded: every field a MIF v1.0 concept
 * document can carry (https://mif-spec.dev/schema/mif.schema.json), rendered as one
 * scannable panel and closed out with the actual DualView projection (markdown ⇄
 * JSON-LD) of the same record. This is the "expand full details" destination for any
 * compact node/finding summary elsewhere in a MIF surface.
 */
function MemoryRecord({
  record,
  onClose,
  variant = "drawer",
  style,
  ...rest
}) {
  if (!record) return null;
  const trustTone = TRUST_TONE[record.provenance && record.provenance.trustLevel] || "neutral";
  const ontologyLabel = record.ontology ? record.ontology.id + (record.ontology.version ? "@" + record.ontology.version : "") : "—";
  const decay = record.temporal && record.temporal.decay;
  const body = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.6rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TypeBadge, {
    type: record.conceptType
  }), record.provenance && record.provenance.trustLevel && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: trustTone,
    variant: "solid"
  }, record.provenance.trustLevel.replace(/_/g, " ")), record.namespace && /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: "neutral"
  }, record.namespace)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "1.35rem",
      fontWeight: 700,
      letterSpacing: "0.01em",
      lineHeight: 1.35,
      margin: "0 0 0.6rem",
      color: "var(--text)"
    }
  }, record.title), record.summary && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-2)",
      lineHeight: 1.65,
      margin: 0
    }
  }, record.summary), record.tags && record.tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.4rem",
      flexWrap: "wrap",
      marginTop: "0.75rem"
    }
  }, record.tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: t,
    tone: "machine"
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: SECTION_LABEL_STYLE
  }, "Memory unit"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "0.2rem 1rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "@id",
    copyable: true
  }, record.id), /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "@type",
    tone: "muted"
  }, record.type || "Memory"), /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "conceptType",
    tone: "muted"
  }, record.conceptType), record.namespace && /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "namespace",
    tone: "muted",
    copyable: true
  }, record.namespace), /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "ontology",
    tone: "muted",
    copyable: true
  }, ontologyLabel), /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "created",
    tone: "muted"
  }, record.created), /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "modified",
    tone: "human",
    style: {
      borderBottom: "none"
    }
  }, record.modified || record.created))), record.relationships && record.relationships.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: SECTION_LABEL_STYLE
  }, "Typed relationships (", record.relationships.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      alignItems: "flex-start"
    }
  }, record.relationships.map((r, i) => /*#__PURE__*/React.createElement(__ds_scope.RelationshipEdge, {
    key: i,
    source: "this",
    type: r.type,
    target: r.targetLabel || r.target
  })))), record.entities && record.entities.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: SECTION_LABEL_STYLE
  }, "Referenced entities"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.4rem",
      flexWrap: "wrap"
    }
  }, record.entities.map((e, i) => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: i,
    tone: "human"
  }, e.name, e.entityType ? " · " + e.entityType : "")))), record.provenance && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: SECTION_LABEL_STYLE
  }, "Provenance"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "0.2rem 1rem",
      marginBottom: decay ? "0.75rem" : 0
    }
  }, record.provenance.sourceType && /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "sourceType",
    tone: "muted"
  }, record.provenance.sourceType), record.provenance.confidence != null && /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "confidence",
    tone: "muted"
  }, record.provenance.confidence), record.provenance.wasDerivedFrom && /*#__PURE__*/React.createElement(__ds_scope.FrontmatterRow, {
    name: "prov:wasDerivedFrom",
    tone: "human",
    style: {
      borderBottom: "none"
    }
  }, Array.isArray(record.provenance.wasDerivedFrom) ? record.provenance.wasDerivedFrom.join(", ") : record.provenance.wasDerivedFrom)), decay && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      color: "var(--muted)",
      marginBottom: "0.3rem"
    }
  }, /*#__PURE__*/React.createElement("span", null, "decay \xB7 ", decay.model, decay.halfLife ? " · half-life " + decay.halfLife : ""), /*#__PURE__*/React.createElement("span", null, Math.round((decay.currentStrength ?? 1) * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "4px",
      borderRadius: "var(--radius-pill)",
      background: "var(--overlay)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.round((decay.currentStrength ?? 1) * 100) + "%",
      height: "100%",
      background: "var(--machine)"
    }
  })))), record.citations && record.citations.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: SECTION_LABEL_STYLE
  }, "Citations"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  }, record.citations.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      flexWrap: "wrap",
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "0.5rem 0.75rem",
      fontSize: "0.85rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "neutral"
  }, c.citationRole || "source"), c.url ? /*#__PURE__*/React.createElement("a", {
    href: c.url,
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: "var(--text)"
    }
  }, c.title) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, c.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem"
    }
  }, c.citationType, c.date ? " · " + c.date : ""))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }
  }, /*#__PURE__*/React.createElement("div", {
    style: { ...SECTION_LABEL_STYLE, marginBottom: 0 }
  }, "One artifact, two readers"), /*#__PURE__*/React.createElement(CopyIconButton, {
    text: record.content,
    label: "content"
  })), /*#__PURE__*/React.createElement(__ds_scope.DualView, {
    title: (record.title || "memory").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    markdown: buildFrontmatter(record),
    jsonld: buildJsonLd(record)
  })));
  if (variant === "inline") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: style
    }, rest), body);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(10,13,19,0.6)",
      backdropFilter: "blur(2px)",
      display: "flex",
      justifyContent: "flex-end",
      zIndex: 50,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "min(640px, 92vw)",
      height: "100%",
      overflowY: "auto",
      background: "var(--void)",
      borderLeft: "1px solid var(--border)",
      boxShadow: "var(--shadow-lg)",
      padding: "1.75rem 2rem 3rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close",
    variant: "outline",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), body));
}
Object.assign(__ds_scope, { MemoryRecord });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mif/MemoryRecord.jsx", error: String((e && e.message) || e) }); }

// ui_kits/graph-explorer/GraphExplorerData.js
try { (() => {
// Graph Explorer — the corpus. Five topic clusters (the ontological spine plus the
// four Research Harness dimensions) resolved into one typed graph: findings, the
// entities they cite, and the cross-topic edges that make it a concordance rather
// than four disconnected lists. Hand-authored, not generated — every node is a real
// MIF concept, mirroring the Research Harness's actual findings where they overlap.

window.GraphExplorerData = function () {
  const TOPICS = [{
    id: "spec",
    name: "Core spec & ontology",
    ontology: "mif-core@1.0"
  }, {
    id: "mem",
    name: "Portable AI memory",
    ontology: "ai-memory@1.0"
  }, {
    id: "okf",
    name: "OKF conformance",
    ontology: "okf-overlay@1.0"
  }, {
    id: "prov",
    name: "Provenance & trust",
    ontology: "mif-prov@1.0"
  }, {
    id: "graph",
    name: "Knowledge graphs",
    ontology: "mif-graph@1.0"
  }];
  const ontologyOf = topic => TOPICS.find(t => t.id === topic).ontology;

  // { id, label, type, topic, kind: "finding" | "entity", detail? }
  const RAW_NODES = [
  // ---- spec ----
  ["spec-model", "MIF frontmatter model", "semantic", "spec", "entity"], ["spec-roundtrip", "Lossless round-trip guarantee", "semantic", "spec", "entity"], ["spec-canonical", "Canonical key ordering", "procedural", "spec", "entity"], ["spec-jsonld", "Canonical JSON-LD projection", "semantic", "spec", "entity"], ["spec-schema", "Published JSON Schemas", "semantic", "spec", "entity"], ["spec-urn", "urn:mif: identifier scheme", "procedural", "spec", "entity"],
  // ---- mem: Portable AI memory ----
  ["mem-f1", "Vendor stores diverge without a shared model", "episodic", "mem", "finding", "Vendor memory stores diverge within 30 days without a shared model."], ["mem-f2", "Session export drops trust metadata", "episodic", "mem", "finding", "Session replay loses trust metadata on export."], ["mem-f3", "Portable units must carry conceptType", "semantic", "mem", "finding", "A portable memory unit must carry conceptType at the boundary."], ["mem-mem0", "Mem0", "episodic", "mem", "entity"], ["mem-zep", "Zep", "episodic", "mem", "entity"], ["mem-letta", "Letta", "episodic", "mem", "entity"], ["mem-langmem", "LangMem", "episodic", "mem", "entity"], ["mem-migrationlogs", "migration-logs/2026-05", "episodic", "mem", "entity"], ["mem-driftclaim", "no-drift baseline claim (disproven)", "semantic", "mem", "entity"], ["mem-sessionexport", "session export format", "procedural", "mem", "entity"],
  // ---- okf: OKF conformance ----
  ["okf-f1", "A generic ontology alone suffices (disproven)", "semantic", "okf", "finding", "A generic ontology alone is sufficient for cross-topic queries."], ["okf-f2", "MIF is a superset of OKF, not subordinate", "semantic", "okf", "finding", "MIF conforms to OKF as a superset, not by subordination."], ["okf-spec", "OKF spec v2", "semantic", "okf", "entity"], ["okf-untyped", "OKF untyped links", "procedural", "okf", "entity"], ["okf-concordance", "Domain concordance pack", "semantic", "okf", "entity"], ["okf-domainpack", "Domain ontology pack", "semantic", "okf", "entity"], ["okf-evalrun", "eval/run-114", "episodic", "okf", "entity"], ["okf-conflict", "concordance-claim", "semantic", "okf", "entity"],
  // ---- prov: Provenance & trust ----
  ["prov-f1", "Every finding passes one falsification gate", "procedural", "prov", "finding", "Every finding must pass a single adversarial falsification gate."], ["prov-f2", "Trust decays without re-citation", "episodic", "prov", "finding", "trustLevel decays without re-citation after 180 days."], ["prov-trustlevel", "trustLevel enum", "semantic", "prov", "entity"], ["prov-wasderivedfrom", "prov:wasDerivedFrom", "semantic", "prov", "entity"], ["prov-citation", "citation object", "semantic", "prov", "entity"], ["prov-gate", "falsification gate", "procedural", "prov", "entity"], ["prov-goalloop", "goal-driven research loop", "procedural", "prov", "entity"], ["prov-oneshot", "one-shot-answer (superseded)", "procedural", "prov", "entity"],
  // ---- graph: Knowledge graphs ----
  ["graph-f1", "Cross-topic queries need typed edges", "semantic", "graph", "finding", "Cross-topic queries require typed edges, not free-text tags."], ["graph-f2", "Barnes-Hut keeps 25k nodes interactive", "procedural", "graph", "finding", "Barnes-Hut layout keeps 25,000-node graphs interactive."], ["graph-component", "KnowledgeGraph component", "procedural", "graph", "entity"], ["graph-quadtree", "quadtree repulsion", "procedural", "graph", "entity"], ["graph-entityres", "entity resolution pass", "procedural", "graph", "entity"], ["graph-crossedge", "cross-topic edge", "semantic", "graph", "entity"], ["graph-viewport", "viewport culling", "procedural", "graph", "entity"]];
  const nodes = RAW_NODES.map(([id, label, type, topic, kind, detail]) => ({
    id,
    label,
    type,
    group: topic,
    topic,
    kind,
    detail: detail || label,
    ontology: ontologyOf(topic)
  }));

  // ---- full MIF v1.0 records (https://mif-spec.dev/schema/mif.schema.json) ----
  // Every node gets a real record: the compact graph label/detail is just the
  // title/summary of this. Deterministic, not random — dates stagger from a base so
  // the corpus reads as accreted over time, the way the harness's actually would.
  const BASE_MS = Date.parse("2026-03-02T09:00:00Z");
  const isoAt = (i, offsetDays) => new Date(BASE_MS + (i * 33 + (offsetDays || 0)) * 3600 * 1000).toISOString();
  function buildRecord(node, index, allEdges) {
    const disproven = /\(disproven\)/.test(node.label);
    const superseded = /\(superseded\)/.test(node.label);
    const [ontId, ontVersion] = node.ontology.split("@");
    const outbound = allEdges.filter(e => e.source === node.id);
    const provenance = node.kind === "entity" ? {
      sourceType: "external_import",
      confidence: 0.9,
      trustLevel: "verified"
    } : disproven ? {
      sourceType: "agent_inferred",
      confidence: 0.32,
      trustLevel: "uncertain"
    } : superseded ? {
      sourceType: "agent_inferred",
      confidence: 0.55,
      trustLevel: "moderate_confidence"
    } : {
      sourceType: "agent_inferred",
      confidence: 0.88,
      trustLevel: "high_confidence"
    };
    const temporal = node.type === "episodic" && node.kind === "finding" ? {
      decay: {
        model: "exponential",
        halfLife: "P30D",
        currentStrength: disproven ? 0.18 : 0.62
      }
    } : undefined;
    const citations = node.kind === "finding" ? [{
      citationType: "specification",
      citationRole: disproven ? "refutes" : "supports",
      title: "mif-spec.dev/schema/mif.schema.json",
      url: "https://mif-spec.dev/schema/mif.schema.json",
      date: isoAt(index, 0).slice(0, 10)
    }] : undefined;
    return {
      id: "urn:mif:" + node.id,
      type: "Memory",
      conceptType: node.type,
      title: node.label.replace(/\s*\((disproven|superseded)\)\s*$/, ""),
      summary: node.detail,
      content: node.kind === "finding" ? node.detail + (disproven ? " Recorded as disproven — the negative result is kept as a durable constraint on future research." : "") : node.detail + " — a " + node.type + " concept in the " + node.topic + " topic cluster.",
      created: isoAt(index, 0),
      modified: superseded || disproven ? isoAt(index, 96) : undefined,
      ontology: {
        id: ontId,
        version: (ontVersion || "1.0") + ".0"
      },
      namespace: "harness/" + node.topic,
      tags: [node.topic, node.kind],
      relationships: outbound.map(e => {
        const target = nodes.find(n => n.id === e.target);
        return {
          type: e.type,
          target: "urn:mif:" + e.target,
          targetLabel: target ? target.label : e.target
        };
      }),
      provenance,
      temporal,
      citations
    };
  }
  const edges = [
  // spec — internal
  ["spec-roundtrip", "derived-from", "spec-model"], ["spec-jsonld", "derived-from", "spec-model"], ["spec-canonical", "part-of", "spec-roundtrip"], ["spec-schema", "supports", "spec-jsonld"], ["spec-urn", "part-of", "spec-model"],
  // mem
  ["mem-f1", "cites", "mem-migrationlogs"], ["mem-f1", "conflicts-with", "mem-driftclaim"], ["mem-f2", "derived-from", "mem-sessionexport"], ["mem-f3", "supports", "spec-model"], ["mem-mem0", "part-of", "mem-f1"], ["mem-zep", "part-of", "mem-f1"], ["mem-letta", "part-of", "mem-f1"], ["mem-langmem", "cites", "mem-f2"], ["mem-sessionexport", "conflicts-with", "prov-citation"], ["mem-f3", "cites", "spec-jsonld"],
  // okf
  ["okf-f1", "conflicts-with", "okf-conflict"], ["okf-f1", "cites", "okf-evalrun"], ["okf-f2", "supersedes", "okf-f1"], ["okf-f2", "supports", "okf-concordance"], ["okf-concordance", "part-of", "okf-domainpack"], ["okf-untyped", "conflicts-with", "graph-crossedge"], ["okf-spec", "derived-from", "spec-model"], ["okf-domainpack", "derived-from", "spec-schema"],
  // prov
  ["prov-f1", "part-of", "prov-goalloop"], ["prov-f1", "supersedes", "prov-oneshot"], ["prov-f2", "conflicts-with", "prov-trustlevel"], ["prov-gate", "supports", "prov-f1"], ["prov-citation", "part-of", "prov-wasderivedfrom"], ["prov-trustlevel", "supports", "spec-model"], ["prov-f2", "cites", "mem-sessionexport"],
  // graph
  ["graph-f1", "supports", "graph-crossedge"], ["graph-f1", "conflicts-with", "okf-untyped"], ["graph-f2", "derived-from", "graph-quadtree"], ["graph-component", "part-of", "graph-f2"], ["graph-viewport", "supports", "graph-component"], ["graph-entityres", "supports", "graph-crossedge"], ["graph-crossedge", "derived-from", "spec-jsonld"]].map(([source, type, target]) => ({
    source,
    type,
    target
  }));
  nodes.forEach((n, i) => {
    n.record = buildRecord(n, i, edges);
  });
  return {
    topics: TOPICS,
    nodes,
    edges
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/graph-explorer/GraphExplorerData.js", error: String((e && e.message) || e) }); }

// ui_kits/graph-explorer/GraphExplorerSidebar.jsx
try { (() => {
/* global React */
// Graph Explorer — left rail: topic filter (structural, drives which nodes are fed
// into the graph), the concept-type legend, and the node inspector (fills in when a
// node is selected on the canvas).

const TYPE_INFO = [{
  type: "semantic",
  desc: "declared knowledge, typed against an ontology"
}, {
  type: "episodic",
  desc: "an observed event, log entry, or vendor behavior"
}, {
  type: "procedural",
  desc: "a mechanism, gate, or process"
}];
function edgesForNode(edges, nodeId) {
  return edges.filter(e => e.source === nodeId || e.target === nodeId);
}
function GraphExplorerSidebar({
  NS,
  data,
  activeTopics,
  onToggleTopic,
  selected,
  onClear,
  counts,
  onExpand
}) {
  const {
    Checkbox,
    TypeBadge,
    Badge,
    FrontmatterRow,
    RelationshipEdge,
    IconButton,
    Button
  } = NS;
  const byId = React.useMemo(() => new Map(data.nodes.map(n => [n.id, n])), [data.nodes]);
  const selectedFull = selected ? byId.get(selected.id) : null;
  const related = selectedFull ? edgesForNode(data.edges, selectedFull.id) : [];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "21rem",
      flex: "none",
      background: "var(--void)",
      borderRight: "1px solid var(--hairline)",
      padding: "1.1rem 0.9rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.4rem",
      overflowY: "auto",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      padding: "0 0.4rem 0.6rem"
    }
  }, "Topics"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.1rem"
    }
  }, data.topics.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.3rem 0.4rem"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: activeTopics.has(t.id),
    onChange: () => onToggleTopic(t.id),
    label: t.name
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      color: "var(--muted)"
    }
  }, counts[t.id] || 0))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      padding: "0 0.4rem 0.6rem"
    }
  }, "Concept types"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.55rem",
      padding: "0 0.4rem"
    }
  }, TYPE_INFO.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.type,
    style: {
      display: "flex",
      gap: "0.6rem",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(TypeBadge, {
    type: t.type,
    style: {
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.78rem",
      color: "var(--text-2)",
      lineHeight: 1.5,
      paddingTop: "0.15rem"
    }
  }, t.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      flex: selectedFull ? "1" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 0.4rem 0.6rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)"
    }
  }, "Inspector"), selectedFull && /*#__PURE__*/React.createElement(IconButton, {
    label: "Clear selection",
    size: "sm",
    onClick: onClear
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), !selectedFull ? /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 0.4rem",
      padding: "0.9rem",
      borderRadius: "var(--radius-md)",
      border: "1px dashed var(--border)",
      color: "var(--muted)",
      fontSize: "0.82rem",
      lineHeight: 1.6
    }
  }, "Click a node to inspect its type, ontology, and typed relationships.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.9rem",
      padding: "0 0.15rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(TypeBadge, {
    type: selectedFull.type
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, selectedFull.kind)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.95rem",
      color: "var(--text)",
      lineHeight: 1.5
    }
  }, selectedFull.detail), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "0.2rem 0.9rem"
    }
  }, /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "@id"
  }, selectedFull.id), /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "conceptType",
    tone: "muted"
  }, selectedFull.type), /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "ontology",
    tone: "muted"
  }, selectedFull.ontology), /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "topic",
    tone: "human",
    style: {
      borderBottom: "none"
    }
  }, data.topics.find(t => t.id === selectedFull.topic).name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: "0.5rem"
    }
  }, "Typed relationships (", related.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
      alignItems: "flex-start"
    }
  }, related.length === 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.78rem",
      color: "var(--muted)"
    }
  }, "No edges in the current filter."), related.map((e, i) => {
    const otherId = e.source === selectedFull.id ? e.target : e.source;
    const other = byId.get(otherId);
    const outbound = e.source === selectedFull.id;
    return /*#__PURE__*/React.createElement(RelationshipEdge, {
      key: i,
      source: outbound ? "this" : other ? other.label : otherId,
      type: e.type,
      target: outbound ? other ? other.label : otherId : "this",
      style: {
        maxWidth: "100%"
      }
    });
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onExpand(selectedFull),
    style: {
      alignSelf: "flex-start"
    }
  }, "View full record", /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginLeft: "0.3rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 17L17 7M17 7H9M17 7V15",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))));
}
window.GraphExplorerSidebar = GraphExplorerSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/graph-explorer/GraphExplorerSidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mif-site/DocsView.jsx
try { (() => {
/* global React */
// MIF site — Docs view. A Starlight-style three-pane doc page: sidebar nav,
// prose column with a DualView and Callout, and an on-this-page rail.

function DocsView({
  NS
}) {
  const {
    Badge,
    Callout,
    DualView,
    TypeBadge,
    Tabs
  } = NS;
  const sidebar = [{
    group: "Tutorials",
    items: ["Your first concept", "From markdown to JSON-LD"]
  }, {
    group: "How-to guides",
    items: ["Validate a bundle", "Add typed relationships", "Migrate from 0.1"]
  }, {
    group: "Reference",
    items: ["Schema reference", "Frontmatter fields", "Conformance levels"]
  }, {
    group: "Explanation",
    items: ["Why dual-format", "OKF conformance"]
  }];
  const active = "Add typed relationships";
  const md = `---
type: semantic
created: 2026-01-15T10:30:00Z
title: API Rate Limit Policy
relationships:
  - type: derived-from
    target: /episodic/incident-2026-01.md
---

# API Rate Limit Policy

The gateway enforces 600 req/min per key.`;
  const jsonld = `{
  "@context": "https://mif-spec.dev/context",
  "@type": "Concept",
  "@id": "urn:mif:7b3c1e90-5a2f-4c8d",
  "conceptType": "semantic",
  "created": "2026-01-15T10:30:00Z",
  "relationships": [
    { "type": "derived-from",
      "target": "urn:mif:incident-2026-01" }
  ]
}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "16rem 1fr 13rem",
      maxWidth: "80rem",
      margin: "0 auto",
      minHeight: "70vh"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      borderRight: "1px solid var(--hairline)",
      padding: "2rem 1.25rem"
    }
  }, sidebar.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.group,
    style: {
      marginBottom: "1.4rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: "0.5rem"
    }
  }, s.group), s.items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "block",
      fontSize: "0.88rem",
      padding: "0.3rem 0.5rem",
      borderRadius: "var(--radius-sm)",
      textDecoration: "none",
      color: it === active ? "var(--machine)" : "var(--text-2)",
      background: it === active ? "var(--machine-low)" : "transparent",
      borderLeft: it === active ? "2px solid var(--machine)" : "2px solid transparent"
    }
  }, it))))), /*#__PURE__*/React.createElement("article", {
    style: {
      padding: "2.5rem 3rem",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(TypeBadge, {
    type: "semantic"
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "machine"
  }, "Level 2")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "2.2rem",
      fontWeight: 700,
      letterSpacing: "0.03em",
      margin: "0 0 1rem",
      color: "var(--text)"
    }
  }, "Typed relationships"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-2)",
      fontSize: "1.05rem",
      lineHeight: 1.7,
      margin: "0 0 1.25rem"
    }
  }, "MIF overlays a typed edge on OKF's untyped markdown links. A relationship is authoritative in frontmatter and mirrored as an OKF-legible body link, so the same document resolves for both a person and a parser."), /*#__PURE__*/React.createElement(Callout, {
    tone: "human",
    title: "One artifact, two readers",
    style: {
      margin: "0 0 1.5rem"
    }
  }, "The round-trip from markdown to JSON-LD and back is provably lossless \u2014 not \"close enough.\""), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "1.3rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      margin: "0 0 0.9rem",
      color: "var(--text)"
    }
  }, "The two projections"), /*#__PURE__*/React.createElement(DualView, {
    title: "rate-limit-policy",
    markdown: md,
    jsonld: jsonld
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      padding: "2.5rem 1.25rem",
      borderLeft: "1px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: "0.7rem"
    }
  }, "On this page"), ["Typed relationships", "The two projections", "Relationship types", "Validation"].map((t, i) => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "block",
      fontSize: "0.82rem",
      padding: "0.28rem 0",
      textDecoration: "none",
      color: i === 0 ? "var(--machine)" : "var(--muted)"
    }
  }, t))));
}
window.DocsView = DocsView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mif-site/DocsView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mif-site/HarnessPromo.jsx
try { (() => {
/* global React */
// MIF site — Harness promo route: a compact hero pointing at the research-harness kit.
function HarnessPromo({
  NS
}) {
  const {
    Chip,
    Callout
  } = NS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "56rem",
      margin: "0 auto",
      padding: "4rem 1.5rem 5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--machine)",
      marginBottom: "0.6rem"
    }
  }, "Research harness"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "2.6rem",
      fontWeight: 700,
      letterSpacing: "0.03em",
      margin: "0 0 1rem",
      color: "var(--text)"
    }
  }, "MIF, end to end."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-2)",
      fontSize: "1.1rem",
      lineHeight: 1.7,
      maxWidth: "42rem",
      margin: "0 0 1.5rem"
    }
  }, "A cloneable research engine with no output format of its own. Every finding is a MIF memory; the knowledge graph is MIF entities and typed relationships; citations and provenance are MIF objects. Findings survive an adversarial falsification gate or are recorded as disproven."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.7rem",
      flexWrap: "wrap",
      marginBottom: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "machine"
  }, "falsification gate"), /*#__PURE__*/React.createElement(Chip, {
    tone: "human"
  }, "durable & citable"), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "cross-topic concordance")), /*#__PURE__*/React.createElement(Callout, {
    tone: "human",
    title: "Not a deep-research button"
  }, "This is a falsified deep exploration and a persistent knowledge graph \u2014 not a one-shot answer. What you get back is a durable, MIF-native corpus you can build on."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "1.5rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.85rem",
      color: "var(--muted)"
    }
  }, "\u2192 See the full reading view in the ", /*#__PURE__*/React.createElement("a", {
    href: "../research-harness/index.html",
    style: {
      color: "var(--machine)"
    }
  }, "research-harness kit"), "."));
}
window.HarnessPromo = HarnessPromo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mif-site/HarnessPromo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mif-site/HomeView.jsx
try { (() => {
/* global React */
// MIF site — Home view. The landing hero + capability chips + navigation card grid,
// recreated from the org landing page, composing the DS Chip and Card primitives.

function HomeView({
  NS,
  onNavigate
}) {
  const {
    Chip,
    Card
  } = NS;
  const cards = [{
    k: "docs",
    h: "Documentation",
    p: "Tutorials, how-to guides, reference, and the architecture decision records.",
    to: "docs"
  }, {
    k: "spec",
    h: "Specification",
    p: "The normative MIF specification — data model, formats, and conformance.",
    to: "spec"
  }, {
    k: "schema",
    h: "Schemas",
    p: "The canonical MIF JSON Schemas, served at mif-spec.dev.",
    to: "spec"
  }, {
    k: "harness",
    h: "Research harness",
    p: "A cloneable, source-grounded research engine with pluggable packs.",
    to: "harness"
  }, {
    k: "ontologies",
    h: "Ontology corpus",
    p: "The growing corpus of MIF ontologies — YAML a person reads, JSON-LD a parser resolves.",
    to: "spec"
  }, {
    k: "plugin",
    h: "mif-docs plugin",
    p: "The Claude Code documentation skill suite — one skill per document genre.",
    to: "docs"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "64rem",
      margin: "0 auto",
      padding: "4rem 1.5rem 5rem"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mif-mark.svg",
    alt: "",
    style: {
      width: 84,
      height: 84,
      marginBottom: "1.5rem"
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(2.5rem,7vw,3.8rem)",
      fontWeight: 700,
      letterSpacing: "0.04em",
      margin: 0,
      color: "var(--text)"
    }
  }, "MIF"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--text-2)",
      letterSpacing: "0.06em",
      margin: "0.25rem 0 0"
    }
  }, "Modeled Information Format"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "clamp(1.25rem,3.5vw,1.7rem)",
      margin: "1.5rem 0 0",
      color: "var(--text)"
    }
  }, "Written once. Read by both."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-2)",
      maxWidth: "46rem",
      margin: "1rem 0 0",
      lineHeight: 1.6
    }
  }, "MIF is a vendor-neutral content model. One artifact a person reads and a parser reads \u2014 the same fields, the same meaning, with no translation and no drift between them."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      margin: "2rem 0 0"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "human"
  }, "human-readable"), /*#__PURE__*/React.createElement(Chip, {
    tone: "machine"
  }, "machine-parseable"), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "vendor-neutral"), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "OKF-compliant"), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "lossless round-trip")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(15rem,1fr))",
      gap: "1rem",
      margin: "3rem 0 0"
    }
  }, cards.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.k,
    kicker: c.k,
    title: c.h,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(c.to);
    }
  }, c.p))));
}
window.HomeView = HomeView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mif-site/HomeView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mif-site/SiteFooter.jsx
try { (() => {
/* global React */
// MIF site — Footer. Mono, muted, matching the landing chrome.
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      maxWidth: "64rem",
      margin: "0 auto",
      padding: "2.5rem 1.5rem 3rem",
      color: "var(--muted)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.82rem",
      borderTop: "1px solid var(--hairline)",
      display: "flex",
      gap: "0.6rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "modeled-information-format"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "var(--text-2)"
    }
  }, "mif-spec.dev"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "var(--text-2)"
    }
  }, "docs"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "MIT"));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mif-site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mif-site/SiteHeader.jsx
try { (() => {
/* global React */
// MIF site — top navigation bar. Mirrors the docs/landing chrome:
// chevron-M wordmark, mono nav links, machine-cyan active + GitHub action.

function SiteHeader({
  route,
  onNavigate,
  theme,
  onThemeChange
}) {
  const {
    ThemeToggle
  } = window.MIFDesignSystem_831149;
  const links = [{
    id: "home",
    label: "Home"
  }, {
    id: "docs",
    label: "Docs"
  }, {
    id: "spec",
    label: "Spec"
  }, {
    id: "harness",
    label: "Harness"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      padding: "0.85rem 1.5rem",
      background: "var(--nav-glass)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mif-mark.svg",
    alt: "",
    style: {
      width: 28,
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: "1.05rem",
      letterSpacing: "0.04em",
      color: "var(--text)"
    }
  }, "MIF")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "0.25rem",
      flex: 1
    }
  }, links.map(l => {
    const on = route === l.id;
    return /*#__PURE__*/React.createElement("a", {
      key: l.id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate(l.id);
      },
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        color: on ? "var(--machine)" : "var(--text-2)",
        padding: "0.4rem 0.7rem",
        borderRadius: "var(--radius-sm)",
        textDecoration: "none",
        background: on ? "var(--machine-low)" : "transparent"
      }
    }, l.label);
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.82rem",
      color: "var(--text-2)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "0.4rem 0.75rem",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
  })), "GitHub"), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onChange: onThemeChange,
    size: "sm"
  }));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mif-site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mif-site/SpecView.jsx
try { (() => {
/* global React */
// MIF site — Spec view. The schema reference: conformance-level property tables
// built from Badge + FrontmatterRow + CodeBlock.

function SpecView({
  NS
}) {
  const {
    Badge,
    CodeBlock,
    Callout
  } = NS;
  const levels = [{
    tone: "machine",
    name: "Level 1 — Core",
    note: "required to conform",
    rows: [["@context", "JSON-LD context binding terms to the MIF vocabulary"], ["@type", "Document type (Concept / Memory)"], ["@id", "Unique identifier in urn:mif: form"], ["conceptType", "semantic / episodic / procedural"], ["content", "The memory content, in Markdown"], ["created", "Creation timestamp (ISO 8601)"]]
  }, {
    tone: "human",
    name: "Level 2 — Standard",
    note: "recommended",
    rows: [["title", "Human-readable title"], ["namespace", "Hierarchical scope for the memory"], ["relationships", "Typed relationships to other memories"], ["entities", "Referenced people, orgs, technologies"], ["temporal", "Temporal validity data"]]
  }, {
    tone: "violet",
    name: "Level 3 — Full",
    note: "optional",
    rows: [["provenance", "Source + trust (W3C PROV + sourceType / trustLevel)"], ["embedding", "Model + source text for re-embedding"], ["citations", "Citation references with rich metadata"]]
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "60rem",
      margin: "0 auto",
      padding: "3rem 1.5rem 5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--machine)",
      marginBottom: "0.5rem"
    }
  }, "Specification \xB7 v1.0.0"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "2.4rem",
      fontWeight: 700,
      letterSpacing: "0.03em",
      margin: "0 0 0.75rem",
      color: "var(--text)"
    }
  }, "Schema reference"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-2)",
      fontSize: "1.05rem",
      lineHeight: 1.7,
      maxWidth: "44rem",
      margin: "0 0 1.5rem"
    }
  }, "A single MIF unit models 27 top-level properties, grouped by conformance level. Level 1 is the required set; everything in Standard is Level 2; the optional fields are Level 3."), /*#__PURE__*/React.createElement(Callout, {
    tone: "machine",
    title: "Canonical",
    style: {
      marginBottom: "2rem"
    }
  }, "The authoritative, machine-checkable definition of every property is ", /*#__PURE__*/React.createElement("code", null, "schema/mif.schema.json"), "."), levels.map(lvl => /*#__PURE__*/React.createElement("section", {
    key: lvl.name,
    style: {
      marginBottom: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "1.15rem",
      fontWeight: 700,
      margin: 0,
      color: "var(--text)"
    }
  }, lvl.name), /*#__PURE__*/React.createElement(Badge, {
    tone: lvl.tone
  }, lvl.note)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, lvl.rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r[0],
    style: {
      display: "grid",
      gridTemplateColumns: "12rem 1fr",
      gap: "1rem",
      padding: "0.7rem 1.1rem",
      borderTop: i === 0 ? "none" : "1px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.85rem",
      color: "var(--machine)"
    }
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)",
      fontSize: "0.9rem"
    }
  }, r[1])))))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "1.15rem",
      fontWeight: 700,
      margin: "2rem 0 0.9rem",
      color: "var(--text)"
    }
  }, "Validate"), /*#__PURE__*/React.createElement(CodeBlock, {
    title: "terminal",
    lang: "bash"
  }, `# OKF conformance + lossless round-trip
python scripts/okf_validate.py
python scripts/mif_convert.py roundtrip examples`));
}
window.SpecView = SpecView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mif-site/SpecView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-harness/HarnessGraph.jsx
try { (() => {
/* global React */
// Research Harness — Graph view. The corpus rendered as a live KnowledgeGraph: the
// findings feed's data as nodes/edges, plus supporting entities, so the topic's
// concordance is visible and explorable (search / filter / zoom).

function buildGraphFromFindings(findings) {
  const nodes = findings.map(f => ({
    id: f.id,
    label: f.title.slice(0, 42),
    type: f.conceptType
  }));
  const entityNames = ["Mem0", "Zep", "Letta", "MIF spec §4.2", "OKF conformance", "mif-docs plugin", "harness §3", "eval/run-114"];
  entityNames.forEach((name, i) => nodes.push({
    id: "entity-" + i,
    label: name,
    type: "procedural",
    group: "entity"
  }));
  const edges = [];
  findings.forEach((f, i) => {
    f.relationships.forEach(({
      type,
      targetLabel
    }) => {
      const hit = nodes.find(n => n.label && (n.label.includes(targetLabel) || targetLabel.includes(n.label)));
      const targetId = hit ? hit.id : "entity-" + i % entityNames.length;
      edges.push({
        source: f.id,
        target: targetId,
        type
      });
    });
    // connect each finding to a couple of supporting entities for a denser, explorable web
    edges.push({
      source: f.id,
      target: "entity-" + i % entityNames.length,
      type: "cites"
    });
    edges.push({
      source: f.id,
      target: "entity-" + (i + 3) % entityNames.length,
      type: "cites"
    });
  });
  return {
    nodes,
    edges
  };
}
function HarnessGraph({
  NS,
  findings,
  onExpand
}) {
  const {
    KnowledgeGraph,
    Callout,
    Button
  } = NS;
  const graph = React.useMemo(() => buildGraphFromFindings(findings), [findings]);
  const [picked, setPicked] = React.useState(null);
  const pickedFinding = picked && findings.find(f => f.id === picked.id);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.75rem 2rem",
      flex: 1,
      minWidth: 0,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: "0.4rem"
    }
  }, "Knowledge graph"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      margin: "0 0 0.75rem",
      color: "var(--text)"
    }
  }, "Findings & typed relationships"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-2)",
      lineHeight: 1.6,
      maxWidth: "42rem",
      margin: "0 0 1.25rem"
    }
  }, "Every held, disproven, and in-gate finding \u2014 plus the entities they cite \u2014 resolved into one queryable graph. Search a claim, isolate a type, or zoom into a cluster."), /*#__PURE__*/React.createElement(KnowledgeGraph, {
    nodes: graph.nodes,
    edges: graph.edges,
    height: 480,
    onSelectNode: setPicked
  }), picked && /*#__PURE__*/React.createElement(Callout, {
    tone: "machine",
    title: picked.type,
    style: {
      marginTop: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: pickedFinding ? "0.75rem" : 0
    }
  }, picked.label), pickedFinding && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onExpand(pickedFinding)
  }, "View full record", /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginLeft: "0.35rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 17L17 7M17 7H9M17 7V15",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
}
window.HarnessGraph = HarnessGraph;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-harness/HarnessGraph.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-harness/HarnessMain.jsx
try { (() => {
/* global React */
// Research Harness — findings feed + detail. Each finding is a MIF memory unit:
// a type, a trust level, a falsification status, citations, and typed edges.

function HarnessMain({
  NS,
  findings,
  selected,
  onSelect,
  onExpand
}) {
  const {
    Badge,
    TypeBadge,
    Chip,
    Callout,
    FrontmatterRow,
    RelationshipEdge,
    CodeBlock,
    Button
  } = NS;
  const f = findings.find(x => x.id === selected) || findings[0];
  const statusTone = {
    held: "green",
    disproven: "pink",
    falsifying: "human"
  };
  const statusLabel = {
    held: "held",
    disproven: "disproven",
    falsifying: "in gate"
  };
  const trustLabel = (f.provenance && f.provenance.trustLevel || "").replace(/_/g, " ");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "22rem 1fr",
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--hairline)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1rem 1.1rem 0.75rem",
      borderBottom: "1px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)"
    }
  }, "Findings"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1rem",
      color: "var(--text)",
      fontWeight: 600,
      marginTop: "0.15rem"
    }
  }, "Portable AI memory")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto"
    }
  }, findings.map(x => {
    const on = x.id === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: x.id,
      onClick: () => onSelect(x.id),
      style: {
        display: "block",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: on ? "var(--elevated)" : "transparent",
        border: "none",
        borderBottom: "1px solid var(--hairline)",
        borderLeft: on ? "2px solid var(--machine)" : "2px solid transparent",
        padding: "0.85rem 1.1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        marginBottom: "0.4rem"
      }
    }, /*#__PURE__*/React.createElement(TypeBadge, {
      type: x.conceptType,
      dot: false
    }), /*#__PURE__*/React.createElement(Badge, {
      tone: statusTone[x.status]
    }, statusLabel[x.status])), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "0.9rem",
        color: on ? "var(--text)" : "var(--text-2)",
        lineHeight: 1.45
      }
    }, x.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        color: "var(--muted)",
        marginTop: "0.4rem"
      }
    }, x.id, " \xB7 trust ", (x.provenance && x.provenance.trustLevel || "").replace(/_/g, " ")));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.75rem 2rem",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      marginBottom: "0.85rem"
    }
  }, /*#__PURE__*/React.createElement(TypeBadge, {
    type: f.conceptType
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: statusTone[f.status],
    variant: "solid"
  }, statusLabel[f.status]), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "trust: ", trustLabel)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      lineHeight: 1.3,
      margin: "0 0 1rem",
      color: "var(--text)"
    }
  }, f.title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-2)",
      lineHeight: 1.7,
      marginBottom: "1.5rem"
    }
  }, f.content), f.status === "held" ? /*#__PURE__*/React.createElement(Callout, {
    tone: "green",
    title: "Survived falsification",
    style: {
      marginBottom: "1.5rem"
    }
  }, "Attacked along ", f.attacks, " adversarial angles; no disconfirming evidence held up.") : f.status === "falsifying" ? /*#__PURE__*/React.createElement(Callout, {
    tone: "human",
    title: "In the falsification gate",
    style: {
      marginBottom: "1.5rem"
    }
  }, "Currently under adversarial review before it can be admitted to the graph.") : /*#__PURE__*/React.createElement(Callout, {
    tone: "pink",
    title: "Recorded as disproven",
    style: {
      marginBottom: "1.5rem"
    }
  }, "Kept in the corpus as a disproven finding \u2014 the negative result is itself durable."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      margin: "0 0 0.6rem"
    }
  }, "Memory unit"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "0.4rem 1rem",
      marginBottom: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "@id"
  }, f.id), /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "conceptType",
    tone: "muted"
  }, f.conceptType), /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "ontology",
    tone: "muted"
  }, f.ontology.id, "@", f.ontology.version), /*#__PURE__*/React.createElement(FrontmatterRow, {
    name: "trustLevel",
    tone: "human",
    style: {
      borderBottom: "none"
    }
  }, trustLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      margin: "0 0 0.6rem"
    }
  }, "Typed relationships"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      alignItems: "flex-start",
      marginBottom: "1.5rem"
    }
  }, f.relationships.map((e, i) => /*#__PURE__*/React.createElement(RelationshipEdge, {
    key: i,
    source: "this",
    type: e.type,
    target: e.targetLabel
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      margin: "0 0 0.6rem"
    }
  }, "Citations"), /*#__PURE__*/React.createElement(CodeBlock, {
    lang: "json",
    title: "citations",
    style: {
      marginBottom: "1.5rem"
    }
  }, JSON.stringify(f.citations, null, 2)), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onExpand(f)
  }, "View full record", /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginLeft: "0.35rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 17L17 7M17 7H9M17 7V15",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
}
window.HarnessMain = HarnessMain;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-harness/HarnessMain.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-harness/HarnessSidebar.jsx
try { (() => {
/* global React */
// Research Harness — left rail: topic registry + research dimensions.
function HarnessSidebar({
  topics,
  active,
  onSelect,
  view,
  onViewChange,
  theme,
  onThemeChange
}) {
  const {
    ThemeToggle
  } = window.MIFDesignSystem_831149;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "16rem",
      flex: "none",
      background: "var(--void)",
      borderRight: "1px solid var(--hairline)",
      padding: "1.1rem 0.9rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: "0 0.4rem"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mif-mark.svg",
    alt: "",
    style: {
      width: 26,
      height: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: "0.92rem",
      letterSpacing: "0.03em",
      color: "var(--text)"
    }
  }, "Research Harness"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.66rem",
      color: "var(--muted)",
      letterSpacing: "0.04em"
    }
  }, "MIF-native \xB7 v0.9")), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onChange: onThemeChange,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.3rem",
      padding: "0 0.1rem"
    }
  }, [{
    id: "findings",
    label: "Findings"
  }, {
    id: "graph",
    label: "Graph"
  }].map(v => {
    const on = v.id === view;
    return /*#__PURE__*/React.createElement("button", {
      key: v.id,
      onClick: () => onViewChange(v.id),
      style: {
        flex: 1,
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        padding: "0.4rem 0",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        border: "1px solid " + (on ? "var(--machine)" : "var(--border)"),
        background: on ? "var(--machine-low)" : "transparent",
        color: on ? "var(--machine)" : "var(--text-2)"
      }
    }, v.label);
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      padding: "0 0.4rem 0.5rem"
    }
  }, "Topics"), topics.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onSelect(t.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        width: "100%",
        background: on ? "var(--machine-low)" : "transparent",
        border: "none",
        borderLeft: on ? "2px solid var(--machine)" : "2px solid transparent",
        padding: "0.5rem 0.5rem",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: on ? "var(--machine)" : "var(--gray-4)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: "0.86rem",
        color: on ? "var(--text)" : "var(--text-2)"
      }
    }, t.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--muted)"
      }
    }, t.count));
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      padding: "0 0.4rem 0.5rem"
    }
  }, "Dimensions"), ["mechanisms", "counter-evidence", "adoption", "provenance"].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
      color: "var(--text-2)",
      padding: "0.32rem 0.5rem",
      display: "flex",
      gap: "0.5rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--machine)"
    }
  }, "\u203A"), d))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: "0.5rem 0.4rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      color: "var(--muted)",
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--green)"
    }
  }, "\u25CF"), " 41 findings held"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--pink)"
    }
  }, "\u25CF"), " 6 disproven"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--human)"
    }
  }, "\u25CF"), " 3 in falsification"))));
}
window.HarnessSidebar = HarnessSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-harness/HarnessSidebar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.DualView = __ds_scope.DualView;

__ds_ns.FrontmatterRow = __ds_scope.FrontmatterRow;

__ds_ns.KnowledgeGraph = __ds_scope.KnowledgeGraph;

__ds_ns.MemoryRecord = __ds_scope.MemoryRecord;

__ds_ns.RelationshipEdge = __ds_scope.RelationshipEdge;

__ds_ns.TypeBadge = __ds_scope.TypeBadge;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
