if (void 0 === jQuery.migrateMute && (jQuery.migrateMute = !0), function(a, b, c) {
    function d(c) {
        var d = b.console;
        f[c] || (f[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), 
        a.migrateTrace && d.trace && d.trace()));
    }
    function e(b, e, f, g) {
        if (Object.defineProperty) try {
            return Object.defineProperty(b, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return d(g), f;
                },
                set: function(a) {
                    d(g), f = a;
                }
            }), c;
        } catch (h) {}
        a._definePropertyBroken = !0, b[e] = f;
    }
    var f = {};
    a.migrateWarnings = [], !a.migrateMute && b.console && b.console.log && b.console.log("JQMIGRATE: Logging is active"), 
    a.migrateTrace === c && (a.migrateTrace = !0), a.migrateReset = function() {
        f = {}, a.migrateWarnings.length = 0;
    }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
    var g = a("<input/>", {
        size: 1
    }).attr("size") && a.attrFn, h = a.attr, i = a.attrHooks.value && a.attrHooks.value.get || function() {
        return null;
    }, j = a.attrHooks.value && a.attrHooks.value.set || function() {
        return c;
    }, k = /^(?:input|button)$/i, l = /^[238]$/, m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, n = /^(?:checked|selected)$/i;
    e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"), a.attr = function(b, e, f, i) {
        var j = e.toLowerCase(), o = b && b.nodeType;
        return i && (4 > h.length && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), 
        !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
            get: function(b, d) {
                var e, f = a.prop(b, d);
                return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c;
            },
            set: function(b, c, d) {
                var e;
                return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), 
                b.setAttribute(d, d.toLowerCase())), d;
            }
        }, n.test(j) && d("jQuery.fn.attr('" + j + "') may use property instead of attribute")), 
        h.call(a, b, e, f));
    }, a.attrHooks.value = {
        get: function(a, b) {
            var c = (a.nodeName || "").toLowerCase();
            return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), 
            b in a ? a.value : null);
        },
        set: function(a, b) {
            var e = (a.nodeName || "").toLowerCase();
            return "button" === e ? j.apply(this, arguments) : ("input" !== e && "option" !== e && d("jQuery.fn.attr('value', val) no longer sets properties"), 
            a.value = b, c);
        }
    };
    var o, p, q = a.fn.init, r = a.parseJSON, s = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    a.fn.init = function(b, c, e) {
        var f;
        return b && "string" == typeof b && !a.isPlainObject(c) && (f = s.exec(a.trim(b))) && f[0] && ("<" !== b.charAt(0) && d("$(html) HTML strings must start with '<' character"), 
        f[3] && d("$(html) HTML text after last tag is ignored"), "#" === f[0].charAt(0) && (d("HTML string cannot start with a '#' character"), 
        a.error("JQMIGRATE: Invalid selector string (XSS)")), c && c.context && (c = c.context), 
        a.parseHTML) ? q.call(this, a.parseHTML(f[2], c, !0), c, e) : q.apply(this, arguments);
    }, a.fn.init.prototype = a.fn, a.parseJSON = function(a) {
        return a || null === a ? r.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), 
        null);
    }, a.uaMatch = function(a) {
        a = a.toLowerCase();
        var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0"
        };
    }, a.browser || (o = a.uaMatch(navigator.userAgent), p = {}, o.browser && (p[o.browser] = !0, 
    p.version = o.version), p.chrome ? p.webkit = !0 : p.webkit && (p.safari = !0), 
    a.browser = p), e(a, "browser", a.browser, "jQuery.browser is deprecated"), a.sub = function() {
        function b(a, c) {
            return new b.fn.init(a, c);
        }
        a.extend(!0, b, this), b.superclass = this, b.fn = b.prototype = this(), b.fn.constructor = b, 
        b.sub = this.sub, b.fn.init = function(d, e) {
            return e && e instanceof a && !(e instanceof b) && (e = b(e)), a.fn.init.call(this, d, e, c);
        }, b.fn.init.prototype = b.fn;
        var c = b(document);
        return d("jQuery.sub() is deprecated"), b;
    }, a.ajaxSetup({
        converters: {
            "text json": a.parseJSON
        }
    });
    var t = a.fn.data;
    a.fn.data = function(b) {
        var e, f, g = this[0];
        return !g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), 
        e !== c && e !== f || f === c) ? t.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), 
        f);
    };
    var u = /\/(java|ecma)script/i, v = a.fn.andSelf || a.fn.addBack;
    a.fn.andSelf = function() {
        return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), v.apply(this, arguments);
    }, a.clean || (a.clean = function(b, e, f, g) {
        e = e || document, e = !e.nodeType && e[0] || e, e = e.ownerDocument || e, d("jQuery.clean() is deprecated");
        var h, i, j, k, l = [];
        if (a.merge(l, a.buildFragment(b, e).childNodes), f) for (j = function(a) {
            return !a.type || u.test(a.type) ? g ? g.push(a.parentNode ? a.parentNode.removeChild(a) : a) : f.appendChild(a) : c;
        }, h = 0; null != (i = l[h]); h++) a.nodeName(i, "script") && j(i) || (f.appendChild(i), 
        i.getElementsByTagName !== c && (k = a.grep(a.merge([], i.getElementsByTagName("script")), j), 
        l.splice.apply(l, [ h + 1, 0 ].concat(k)), h += k.length));
        return l;
    });
    var w = a.event.add, x = a.event.remove, y = a.event.trigger, z = a.fn.toggle, A = a.fn.live, B = a.fn.die, C = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", D = RegExp("\\b(?:" + C + ")\\b"), E = /(?:^|\s)hover(\.\S+|)\b/, F = function(b) {
        return "string" != typeof b || a.event.special.hover ? b : (E.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), 
        b && b.replace(E, "mouseenter$1 mouseleave$1"));
    };
    a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), 
    a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), 
    a.event.add = function(a, b, c, e, f) {
        a !== document && D.test(b) && d("AJAX events should be attached to document: " + b), 
        w.call(this, a, F(b || ""), c, e, f);
    }, a.event.remove = function(a, b, c, d, e) {
        x.call(this, a, F(b) || "", c, d, e);
    }, a.fn.error = function() {
        var a = Array.prototype.slice.call(arguments, 0);
        return d("jQuery.fn.error() is deprecated"), a.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), 
        this);
    }, a.fn.toggle = function(b, c) {
        if (!a.isFunction(b) || !a.isFunction(c)) return z.apply(this, arguments);
        d("jQuery.fn.toggle(handler, handler...) is deprecated");
        var e = arguments, f = b.guid || a.guid++, g = 0, h = function(c) {
            var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
            return a._data(this, "lastToggle" + b.guid, d + 1), c.preventDefault(), e[d].apply(this, arguments) || !1;
        };
        for (h.guid = f; e.length > g; ) e[g++].guid = f;
        return this.click(h);
    }, a.fn.live = function(b, c, e) {
        return d("jQuery.fn.live() is deprecated"), A ? A.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), 
        this);
    }, a.fn.die = function(b, c) {
        return d("jQuery.fn.die() is deprecated"), B ? B.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), 
        this);
    }, a.event.trigger = function(a, b, c, e) {
        return c || D.test(a) || d("Global events are undocumented and deprecated"), y.call(this, a, b, c || document, e);
    }, a.each(C.split("|"), function(b, c) {
        a.event.special[c] = {
            setup: function() {
                var b = this;
                return b !== document && (a.event.add(document, c + "." + a.guid, function() {
                    a.event.trigger(c, null, b, !0);
                }), a._data(this, c, a.guid++)), !1;
            },
            teardown: function() {
                return this !== document && a.event.remove(document, c + "." + a._data(this, c)), 
                !1;
            }
        };
    });
}(jQuery, window), function(a, b) {
    function c(b, c) {
        var e, f, g, h = b.nodeName.toLowerCase();
        return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], 
        !!g && d(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && d(b);
    }
    function d(b) {
        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
            return "hidden" === a.css(this, "visibility");
        }).length;
    }
    var e = 0, f = /^ui-id-\d+$/;
    a.ui = a.ui || {}, a.extend(a.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), a.fn.extend({
        focus: function(b) {
            return function(c, d) {
                return "number" == typeof c ? this.each(function() {
                    var b = this;
                    setTimeout(function() {
                        a(b).focus(), d && d.call(b);
                    }, c);
                }) : b.apply(this, arguments);
            };
        }(a.fn.focus),
        scrollParent: function() {
            var b;
            return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"));
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"));
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b;
        },
        zIndex: function(c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) for (var d, e, f = a(this[0]); f.length && f[0] !== document; ) {
                if (d = f.css("position"), ("absolute" === d || "relative" === d || "fixed" === d) && (e = parseInt(f.css("zIndex"), 10), 
                !isNaN(e) && 0 !== e)) return e;
                f = f.parent();
            }
            return 0;
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++e);
            });
        },
        removeUniqueId: function() {
            return this.each(function() {
                f.test(this.id) && a(this).removeAttr("id");
            });
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
            return function(c) {
                return !!a.data(c, b);
            };
        }) : function(b, c, d) {
            return !!a.data(b, d[3]);
        },
        focusable: function(b) {
            return c(b, !isNaN(a.attr(b, "tabindex")));
        },
        tabbable: function(b) {
            var d = a.attr(b, "tabindex"), e = isNaN(d);
            return (e || d >= 0) && c(b, !e);
        }
    }), a("<a>").outerWidth(1).jquery || a.each([ "Width", "Height" ], function(c, d) {
        function e(b, c, d, e) {
            return a.each(f, function() {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), 
                e && (c -= parseFloat(a.css(b, "margin" + this)) || 0);
            }), c;
        }
        var f = "Width" === d ? [ "Left", "Right" ] : [ "Top", "Bottom" ], g = d.toLowerCase(), h = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        a.fn["inner" + d] = function(c) {
            return c === b ? h["inner" + d].call(this) : this.each(function() {
                a(this).css(g, e(this, c) + "px");
            });
        }, a.fn["outer" + d] = function(b, c) {
            return "number" != typeof b ? h["outer" + d].call(this, b) : this.each(function() {
                a(this).css(g, e(this, b, !0, c) + "px");
            });
        };
    }), a.fn.addBack || (a.fn.addBack = function(a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
        return function(c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this);
        };
    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
    a.support.selectstart = "onselectstart" in document.createElement("div"), a.fn.extend({
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault();
            });
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    }), a.extend(a.ui, {
        plugin: {
            add: function(b, c, d) {
                var e, f = a.ui[b].prototype;
                for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([ c, d[e] ]);
            },
            call: function(a, b, c) {
                var d, e = a.plugins[b];
                if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType) for (d = 0; e.length > d; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c);
            }
        },
        hasScroll: function(b, c) {
            if ("hidden" === a(b).css("overflow")) return !1;
            var d = c && "left" === c ? "scrollLeft" : "scrollTop", e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e);
        }
    });
}(jQuery), function(a, b) {
    var c = 0, d = Array.prototype.slice, e = a.cleanData;
    a.cleanData = function(b) {
        for (var c, d = 0; null != (c = b[d]); d++) try {
            a(c).triggerHandler("remove");
        } catch (f) {}
        e(b);
    }, a.widget = function(c, d, e) {
        var f, g, h, i, j = {}, k = c.split(".")[0];
        c = c.split(".")[1], f = k + "-" + c, e || (e = d, d = a.Widget), a.expr[":"][f.toLowerCase()] = function(b) {
            return !!a.data(b, f);
        }, a[k] = a[k] || {}, g = a[k][c], h = a[k][c] = function(a, c) {
            return this._createWidget ? (arguments.length && this._createWidget(a, c), b) : new h(a, c);
        }, a.extend(h, g, {
            version: e.version,
            _proto: a.extend({}, e),
            _childConstructors: []
        }), i = new d(), i.options = a.widget.extend({}, i.options), a.each(e, function(c, e) {
            return a.isFunction(e) ? (j[c] = function() {
                var a = function() {
                    return d.prototype[c].apply(this, arguments);
                }, b = function(a) {
                    return d.prototype[c].apply(this, a);
                };
                return function() {
                    var c, d = this._super, f = this._superApply;
                    return this._super = a, this._superApply = b, c = e.apply(this, arguments), this._super = d, 
                    this._superApply = f, c;
                };
            }(), b) : (j[c] = e, b);
        }), h.prototype = a.widget.extend(i, {
            widgetEventPrefix: g ? i.widgetEventPrefix : c
        }, j, {
            constructor: h,
            namespace: k,
            widgetName: c,
            widgetFullName: f
        }), g ? (a.each(g._childConstructors, function(b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, h, c._proto);
        }), delete g._childConstructors) : d._childConstructors.push(h), a.widget.bridge(c, h);
    }, a.widget.extend = function(c) {
        for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++) for (e in g[h]) f = g[h][e], 
        g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f);
        return c;
    }, a.widget.bridge = function(c, e) {
        var f = e.prototype.widgetFullName || c;
        a.fn[c] = function(g) {
            var h = "string" == typeof g, i = d.call(arguments, 1), j = this;
            return g = !h && i.length ? a.widget.extend.apply(null, [ g ].concat(i)) : g, this.each(h ? function() {
                var d, e = a.data(this, f);
                return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, i), d !== e && d !== b ? (j = d && d.jquery ? j.pushStack(d.get()) : d, 
                !1) : b) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; attempted to call method '" + g + "'");
            } : function() {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : a.data(this, f, new e(g, this));
            }), j;
        };
    }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(b, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, 
            this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), 
            this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), 
            this._on(!0, this.element, {
                remove: function(a) {
                    a.target === d && this.destroy();
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), 
            this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), 
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), 
            this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: a.noop,
        widget: function() {
            return this.element;
        },
        option: function(c, d) {
            var e, f, g, h = c;
            if (0 === arguments.length) return a.widget.extend({}, this.options);
            if ("string" == typeof c) if (h = {}, e = c.split("."), c = e.shift(), e.length) {
                for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; e.length - 1 > g; g++) f[e[g]] = f[e[g]] || {}, 
                f = f[e[g]];
                if (c = e.pop(), d === b) return f[c] === b ? null : f[c];
                f[c] = d;
            } else {
                if (d === b) return this.options[c] === b ? null : this.options[c];
                h[c] = d;
            }
            return this._setOptions(h), this;
        },
        _setOptions: function(a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this;
        },
        _setOption: function(a, b) {
            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), 
            this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
            this;
        },
        enable: function() {
            return this._setOption("disabled", !1);
        },
        disable: function() {
            return this._setOption("disabled", !0);
        },
        _on: function(c, d, e) {
            var f, g = this;
            "boolean" != typeof c && (e = d, d = c, c = !1), e ? (d = f = a(d), this.bindings = this.bindings.add(d)) : (e = d, 
            d = this.element, f = this.widget()), a.each(e, function(e, h) {
                function i() {
                    return c || g.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof h ? g[h] : h).apply(g, arguments) : b;
                }
                "string" != typeof h && (i.guid = h.guid = h.guid || i.guid || a.guid++);
                var j = e.match(/^(\w+)\s*(.*)$/), k = j[1] + g.eventNamespace, l = j[2];
                l ? f.delegate(l, k, i) : d.bind(k, i);
            });
        },
        _off: function(a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
            a.unbind(b).undelegate(b);
        },
        _delay: function(a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments);
            }
            var d = this;
            return setTimeout(c, b || 0);
        },
        _hoverable: function(b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function(b) {
                    a(b.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(b) {
                    a(b.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function(b) {
                    a(b.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(b) {
                    a(b.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), 
            c.target = this.element[0], f = c.originalEvent) for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [ c ].concat(d)) === !1 || c.isDefaultPrevented());
        }
    }, a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(b, c) {
        a.Widget.prototype["_" + b] = function(d, e, f) {
            "string" == typeof e && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {
                duration: e
            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                a(this)[b](), f && f.call(d[0]), c();
            });
        };
    });
}(jQuery), function(a) {
    var b = !1;
    a(document).mouseup(function() {
        b = !1;
    }), a.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a);
            }).bind("click." + this.widgetName, function(c) {
                return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), 
                c.stopImmediatePropagation(), !1) : void 0;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(c) {
            if (!b) {
                this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
                var d = this, e = 1 === c.which, f = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
                return e && !f && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, 
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, 
                !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), 
                this._mouseMoveDelegate = function(a) {
                    return d._mouseMove(a);
                }, this._mouseUpDelegate = function(a) {
                    return d._mouseUp(a);
                }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
                c.preventDefault(), b = !0, !0)) : !0;
            }
        },
        _mouseMove: function(b) {
            return a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !b.button ? this._mouseUp(b) : this._mouseStarted ? (this._mouseDrag(b), 
            b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, 
            this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted);
        },
        _mouseUp: function(b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
            this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), 
            this._mouseStop(b)), !1;
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    });
}(jQuery), function(a, b) {
    function c(a, b, c) {
        return [ parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1) ];
    }
    function d(b, c) {
        return parseInt(a.css(b, c), 10) || 0;
    }
    function e(b) {
        var c = b[0];
        return 9 === c.nodeType ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : a.isWindow(c) ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: b.scrollTop(),
                left: b.scrollLeft()
            }
        } : c.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: c.pageY,
                left: c.pageX
            }
        } : {
            width: b.outerWidth(),
            height: b.outerHeight(),
            offset: b.offset()
        };
    }
    a.ui = a.ui || {};
    var f, g = Math.max, h = Math.abs, i = Math.round, j = /left|center|right/, k = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, m = /^\w+/, n = /%$/, o = a.fn.position;
    a.position = {
        scrollbarWidth: function() {
            if (f !== b) return f;
            var c, d, e = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), g = e.children()[0];
            return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, 
            c === d && (d = e[0].clientWidth), e.remove(), f = c - d;
        },
        getScrollInfo: function(b) {
            var c = b.isWindow ? "" : b.element.css("overflow-x"), d = b.isWindow ? "" : b.element.css("overflow-y"), e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth, f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
            return {
                width: f ? a.position.scrollbarWidth() : 0,
                height: e ? a.position.scrollbarWidth() : 0
            };
        },
        getWithinInfo: function(b) {
            var c = a(b || window), d = a.isWindow(c[0]);
            return {
                element: c,
                isWindow: d,
                offset: c.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: c.scrollLeft(),
                scrollTop: c.scrollTop(),
                width: d ? c.width() : c.outerWidth(),
                height: d ? c.height() : c.outerHeight()
            };
        }
    }, a.fn.position = function(b) {
        if (!b || !b.of) return o.apply(this, arguments);
        b = a.extend({}, b);
        var f, n, p, q, r, s, t = a(b.of), u = a.position.getWithinInfo(b.within), v = a.position.getScrollInfo(u), w = (b.collision || "flip").split(" "), x = {};
        return s = e(t), t[0].preventDefault && (b.at = "left top"), n = s.width, p = s.height, 
        q = s.offset, r = a.extend({}, q), a.each([ "my", "at" ], function() {
            var a, c, d = (b[this] || "").split(" ");
            1 === d.length && (d = j.test(d[0]) ? d.concat([ "center" ]) : k.test(d[0]) ? [ "center" ].concat(d) : [ "center", "center" ]), 
            d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), 
            c = l.exec(d[1]), x[this] = [ a ? a[0] : 0, c ? c[0] : 0 ], b[this] = [ m.exec(d[0])[0], m.exec(d[1])[0] ];
        }), 1 === w.length && (w[1] = w[0]), "right" === b.at[0] ? r.left += n : "center" === b.at[0] && (r.left += n / 2), 
        "bottom" === b.at[1] ? r.top += p : "center" === b.at[1] && (r.top += p / 2), f = c(x.at, n, p), 
        r.left += f[0], r.top += f[1], this.each(function() {
            var e, j, k = a(this), l = k.outerWidth(), m = k.outerHeight(), o = d(this, "marginLeft"), s = d(this, "marginTop"), y = l + o + d(this, "marginRight") + v.width, z = m + s + d(this, "marginBottom") + v.height, A = a.extend({}, r), B = c(x.my, k.outerWidth(), k.outerHeight());
            "right" === b.my[0] ? A.left -= l : "center" === b.my[0] && (A.left -= l / 2), "bottom" === b.my[1] ? A.top -= m : "center" === b.my[1] && (A.top -= m / 2), 
            A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = i(A.left), 
            A.top = i(A.top)), e = {
                marginLeft: o,
                marginTop: s
            }, a.each([ "left", "top" ], function(c, d) {
                a.ui.position[w[c]] && a.ui.position[w[c]][d](A, {
                    targetWidth: n,
                    targetHeight: p,
                    elemWidth: l,
                    elemHeight: m,
                    collisionPosition: e,
                    collisionWidth: y,
                    collisionHeight: z,
                    offset: [ f[0] + B[0], f[1] + B[1] ],
                    my: b.my,
                    at: b.at,
                    within: u,
                    elem: k
                });
            }), b.using && (j = function(a) {
                var c = q.left - A.left, d = c + n - l, e = q.top - A.top, f = e + p - m, i = {
                    target: {
                        element: t,
                        left: q.left,
                        top: q.top,
                        width: n,
                        height: p
                    },
                    element: {
                        element: k,
                        left: A.left,
                        top: A.top,
                        width: l,
                        height: m
                    },
                    horizontal: 0 > d ? "left" : c > 0 ? "right" : "center",
                    vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle"
                };
                l > n && n > h(c + d) && (i.horizontal = "center"), m > p && p > h(e + f) && (i.vertical = "middle"), 
                i.important = g(h(c), h(d)) > g(h(e), h(f)) ? "horizontal" : "vertical", b.using.call(this, a, i);
            }), k.offset(a.extend(A, {
                using: j
            }));
        });
    }, a.ui.position = {
        fit: {
            left: function(a, b) {
                var c, d = b.within, e = d.isWindow ? d.scrollLeft : d.offset.left, f = d.width, h = a.left - b.collisionPosition.marginLeft, i = e - h, j = h + b.collisionWidth - f - e;
                b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, 
                a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left);
            },
            top: function(a, b) {
                var c, d = b.within, e = d.isWindow ? d.scrollTop : d.offset.top, f = b.within.height, h = a.top - b.collisionPosition.marginTop, i = e - h, j = h + b.collisionHeight - f - e;
                b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, 
                a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top);
            }
        },
        flip: {
            left: function(a, b) {
                var c, d, e = b.within, f = e.offset.left + e.scrollLeft, g = e.width, i = e.isWindow ? e.scrollLeft : e.offset.left, j = a.left - b.collisionPosition.marginLeft, k = j - i, l = j + b.collisionWidth - g - i, m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0, n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0, o = -2 * b.offset[0];
                0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || h(k) > c) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, 
                (d > 0 || l > h(d)) && (a.left += m + n + o));
            },
            top: function(a, b) {
                var c, d, e = b.within, f = e.offset.top + e.scrollTop, g = e.height, i = e.isWindow ? e.scrollTop : e.offset.top, j = a.top - b.collisionPosition.marginTop, k = j - i, l = j + b.collisionHeight - g - i, m = "top" === b.my[1], n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0, o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0, p = -2 * b.offset[1];
                0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || h(k) > d) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, 
                a.top + n + o + p > l && (c > 0 || l > h(c)) && (a.top += n + o + p));
            }
        },
        flipfit: {
            left: function() {
                a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments);
            },
            top: function() {
                a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments);
            }
        }
    }, function() {
        var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, g && a.extend(d, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (f in d) b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), 
        h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, 
        a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b);
    }();
}(jQuery), function(a) {
    a.widget("ui.draggable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), 
            this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), 
            this._mouseInit();
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
            this._mouseDestroy();
        },
        _mouseCapture: function(b) {
            var c = this.options;
            return this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), 
            this.handle ? (a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body");
            }), !0) : !1);
        },
        _mouseStart: function(b) {
            var c = this.options;
            return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), 
            this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), 
            this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
            this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), 
            this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, 
            this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), 
            this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), 
            a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), 
            a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0);
        },
        _mouseDrag: function(b, c) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), 
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), 
            !c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
                this.position = d.position;
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1;
        },
        _mouseStop: function(b) {
            var c = this, d = !1;
            return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), 
            this.dropped && (d = this.dropped, this.dropped = !1), "original" !== this.options.helper || a.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                c._trigger("stop", b) !== !1 && c._clear();
            }) : this._trigger("stop", b) !== !1 && this._clear(), !1) : !1;
        },
        _mouseUp: function(b) {
            return a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this);
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b);
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), 
            this;
        },
        _getHandle: function(b) {
            return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0;
        },
        _createHelper: function(b) {
            var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [ b ])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
            return d.parents("body").length || d.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), 
            d[0] === this.element[0] || /(fixed|absolute)/.test(d.css("position")) || d.css("position", "absolute"), 
            d;
        },
        _adjustOffsetFromHelper: function(b) {
            "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), 
            "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            var b = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), 
            b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                top: 0,
                left: 0
            }), {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            }
            return {
                top: 0,
                left: 0
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var b, c, d, e = this.options;
            return e.containment ? "window" === e.containment ? void (this.containment = [ a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : "document" === e.containment ? void (this.containment = [ 0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : e.containment.constructor === Array ? void (this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), 
            c = a(e.containment), d = c[0], void (d && (b = "hidden" !== c.css("overflow"), 
            this.containment = [ (parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
            this.relative_container = c))) : void (this.containment = null);
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = "absolute" === b ? 1 : -1, e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: e.scrollTop(),
                left: e.scrollLeft()
            }), {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * d
            };
        },
        _generatePosition: function(b) {
            var c, d, e, f, g = this.options, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = b.pageX, j = b.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: h.scrollTop(),
                left: h.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (d = this.relative_container.offset(), 
            c = [ this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top ]) : c = this.containment, 
            b.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), 
            b.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), b.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), 
            b.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, 
            j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, 
            f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, 
            i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f)), 
            {
                top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            };
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
            this.helper = null, this.cancelHelperRemoval = !1;
        },
        _trigger: function(b, c, d) {
            return d = d || this._uiHash(), a.ui.plugin.call(this, b, [ c, d ]), "drag" === b && (this.positionAbs = this._convertPositionTo("absolute")), 
            a.Widget.prototype._trigger.call(this, b, c, d);
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            };
        }
    }), a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(b, c) {
            var d = a(this).data("ui-draggable"), e = d.options, f = a.extend({}, c, {
                item: d.element
            });
            d.sortables = [], a(e.connectToSortable).each(function() {
                var c = a.data(this, "ui-sortable");
                c && !c.options.disabled && (d.sortables.push({
                    instance: c,
                    shouldRevert: c.options.revert
                }), c.refreshPositions(), c._trigger("activate", b, f));
            });
        },
        stop: function(b, c) {
            var d = a(this).data("ui-draggable"), e = a.extend({}, c, {
                item: d.element
            });
            a.each(d.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, 
                this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(b), 
                this.instance.options.helper = this.instance.options._helper, "original" === d.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e));
            });
        },
        drag: function(b, c) {
            var d = a(this).data("ui-draggable"), e = this;
            a.each(d.sortables, function() {
                var f = !1, g = this;
                this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, 
                this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (f = !0, 
                a.each(d.sortables, function() {
                    return this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, 
                    this.instance.offset.click = d.offset.click, this !== g && this.instance._intersectsWith(this.instance.containerCache) && a.contains(g.instance.element[0], this.instance.element[0]) && (f = !1), 
                    f;
                })), f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), 
                this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0];
                }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), 
                this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, 
                this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, 
                this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, 
                d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, 
                this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, 
                this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), 
                this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, 
                this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
                d._trigger("fromSortable", b), d.dropped = !1);
            });
        }
    }), a.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var b = a("body"), c = a(this).data("ui-draggable").options;
            b.css("cursor") && (c._cursor = b.css("cursor")), b.css("cursor", c.cursor);
        },
        stop: function() {
            var b = a(this).data("ui-draggable").options;
            b._cursor && a("body").css("cursor", b._cursor);
        }
    }), a.ui.plugin.add("draggable", "opacity", {
        start: function(b, c) {
            var d = a(c.helper), e = a(this).data("ui-draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity);
        },
        stop: function(b, c) {
            var d = a(this).data("ui-draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity);
        }
    }), a.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var b = a(this).data("ui-draggable");
            b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset());
        },
        drag: function(b) {
            var c = a(this).data("ui-draggable"), d = c.options, e = !1;
            c.scrollParent[0] !== document && "HTML" !== c.scrollParent[0].tagName ? (d.axis && "x" === d.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - b.pageY < d.scrollSensitivity ? c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop + d.scrollSpeed : b.pageY - c.overflowOffset.top < d.scrollSensitivity && (c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop - d.scrollSpeed)), 
            d.axis && "y" === d.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - b.pageX < d.scrollSensitivity ? c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft + d.scrollSpeed : b.pageX - c.overflowOffset.left < d.scrollSensitivity && (c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft - d.scrollSpeed))) : (d.axis && "x" === d.axis || (b.pageY - a(document).scrollTop() < d.scrollSensitivity ? e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < d.scrollSensitivity && (e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed))), 
            d.axis && "y" === d.axis || (b.pageX - a(document).scrollLeft() < d.scrollSensitivity ? e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < d.scrollSensitivity && (e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)))), 
            e !== !1 && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, b);
        }
    }), a.ui.plugin.add("draggable", "snap", {
        start: function() {
            var b = a(this).data("ui-draggable"), c = b.options;
            b.snapElements = [], a(c.snap.constructor !== String ? c.snap.items || ":data(ui-draggable)" : c.snap).each(function() {
                var c = a(this), d = c.offset();
                this !== b.element[0] && b.snapElements.push({
                    item: this,
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: d.top,
                    left: d.left
                });
            });
        },
        drag: function(b, c) {
            var d, e, f, g, h, i, j, k, l, m, n = a(this).data("ui-draggable"), o = n.options, p = o.snapTolerance, q = c.offset.left, r = q + n.helperProportions.width, s = c.offset.top, t = s + n.helperProportions.height;
            for (l = n.snapElements.length - 1; l >= 0; l--) h = n.snapElements[l].left, i = h + n.snapElements[l].width, 
            j = n.snapElements[l].top, k = j + n.snapElements[l].height, h - p > r || q > i + p || j - p > t || s > k + p || !a.contains(n.snapElements[l].item.ownerDocument, n.snapElements[l].item) ? (n.snapElements[l].snapping && n.options.snap.release && n.options.snap.release.call(n.element, b, a.extend(n._uiHash(), {
                snapItem: n.snapElements[l].item
            })), n.snapElements[l].snapping = !1) : ("inner" !== o.snapMode && (d = p >= Math.abs(j - t), 
            e = p >= Math.abs(k - s), f = p >= Math.abs(h - r), g = p >= Math.abs(i - q), d && (c.position.top = n._convertPositionTo("relative", {
                top: j - n.helperProportions.height,
                left: 0
            }).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {
                top: k,
                left: 0
            }).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h - n.helperProportions.width
            }).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: i
            }).left - n.margins.left)), m = d || e || f || g, "outer" !== o.snapMode && (d = p >= Math.abs(j - s), 
            e = p >= Math.abs(k - t), f = p >= Math.abs(h - q), g = p >= Math.abs(i - r), d && (c.position.top = n._convertPositionTo("relative", {
                top: j,
                left: 0
            }).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {
                top: k - n.helperProportions.height,
                left: 0
            }).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: i - n.helperProportions.width
            }).left - n.margins.left)), !n.snapElements[l].snapping && (d || e || f || g || m) && n.options.snap.snap && n.options.snap.snap.call(n.element, b, a.extend(n._uiHash(), {
                snapItem: n.snapElements[l].item
            })), n.snapElements[l].snapping = d || e || f || g || m);
        }
    }), a.ui.plugin.add("draggable", "stack", {
        start: function() {
            var b, c = this.data("ui-draggable").options, d = a.makeArray(a(c.stack)).sort(function(b, c) {
                return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0);
            });
            d.length && (b = parseInt(a(d[0]).css("zIndex"), 10) || 0, a(d).each(function(c) {
                a(this).css("zIndex", b + c);
            }), this.css("zIndex", b + d.length));
        }
    }), a.ui.plugin.add("draggable", "zIndex", {
        start: function(b, c) {
            var d = a(c.helper), e = a(this).data("ui-draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex);
        },
        stop: function(b, c) {
            var d = a(this).data("ui-draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex);
        }
    });
}(jQuery), function(a) {
    function b(a, b, c) {
        return a > b && b + c > a;
    }
    a.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var b = this.options, c = b.accept;
            this.isover = !1, this.isout = !0, this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c);
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], 
            a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable");
        },
        _destroy: function() {
            for (var b = 0, c = a.ui.ddmanager.droppables[this.options.scope]; c.length > b; b++) c[b] === this && c.splice(b, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled");
        },
        _setOption: function(b, c) {
            "accept" === b && (this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c);
            }), a.Widget.prototype._setOption.apply(this, arguments);
        },
        _activate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c));
        },
        _deactivate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), 
            c && this._trigger("deactivate", b, this.ui(c));
        },
        _over: function(b) {
            var c = a.ui.ddmanager.current;
            c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), 
            this._trigger("over", b, this.ui(c)));
        },
        _out: function(b) {
            var c = a.ui.ddmanager.current;
            c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), 
            this._trigger("out", b, this.ui(c)));
        },
        _drop: function(b, c) {
            var d = c || a.ui.ddmanager.current, e = !1;
            return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var b = a.data(this, "ui-droppable");
                return b.options.greedy && !b.options.disabled && b.options.scope === d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
                    offset: b.element.offset()
                }), b.options.tolerance) ? (e = !0, !1) : void 0;
            }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), 
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), 
            this.element) : !1) : !1;
        },
        ui: function(a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            };
        }
    }), a.ui.intersect = function(a, c, d) {
        if (!c.offset) return !1;
        var e, f, g = (a.positionAbs || a.position.absolute).left, h = g + a.helperProportions.width, i = (a.positionAbs || a.position.absolute).top, j = i + a.helperProportions.height, k = c.offset.left, l = k + c.proportions.width, m = c.offset.top, n = m + c.proportions.height;
        switch (d) {
          case "fit":
            return g >= k && l >= h && i >= m && n >= j;

          case "intersect":
            return g + a.helperProportions.width / 2 > k && l > h - a.helperProportions.width / 2 && i + a.helperProportions.height / 2 > m && n > j - a.helperProportions.height / 2;

          case "pointer":
            return e = (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left, 
            f = (a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top, 
            b(f, m, c.proportions.height) && b(e, k, c.proportions.width);

          case "touch":
            return (i >= m && n >= i || j >= m && n >= j || m > i && j > n) && (g >= k && l >= g || h >= k && l >= h || k > g && h > l);

          default:
            return !1;
        }
    }, a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(b, c) {
            var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [], g = c ? c.type : null, h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
            a: for (d = 0; f.length > d; d++) if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
                for (e = 0; h.length > e; e++) if (h[e] === f[d].element[0]) {
                    f[d].proportions.height = 0;
                    continue a;
                }
                f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), 
                f[d].offset = f[d].element.offset(), f[d].proportions = {
                    width: f[d].element[0].offsetWidth,
                    height: f[d].element[0].offsetHeight
                });
            }
        },
        drop: function(b, c) {
            var d = !1;
            return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), 
                !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, 
                this.isover = !1, this._deactivate.call(this, c)));
            }), d;
        },
        dragStart: function(b, c) {
            b.element.parentsUntil("body").bind("scroll.droppable", function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
            });
        },
        drag: function(b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var d, e, f, g = a.ui.intersect(b, this, this.options.tolerance), h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
                    h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
                        return a.data(this, "ui-droppable").options.scope === e;
                    }), f.length && (d = a.data(f[0], "ui-droppable"), d.greedyChild = "isover" === h)), 
                    d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, 
                    this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), 
                    d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)));
                }
            });
        },
        dragStop: function(b, c) {
            b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
        }
    };
}(jQuery), function(a) {
    function b(a) {
        return parseInt(a, 10) || 0;
    }
    function c(a) {
        return !isNaN(parseInt(a, 10));
    }
    a.widget("ui.resizable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var b, c, d, e, f, g = this, h = this.options;
            if (this.element.addClass("ui-resizable"), a.extend(this, {
                _aspectRatio: !!h.aspectRatio,
                aspectRatio: h.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), 
            this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), 
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), 
            b = this.handles.split(","), this.handles = {}, c = 0; b.length > c; c++) d = a.trim(b[c]), 
            f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), 
            e.css({
                zIndex: h.zIndex
            }), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, 
            this.element.append(e);
            this._renderAxis = function(b) {
                var c, d, e, f;
                b = b || this.element;
                for (c in this.handles) this.handles[c].constructor === String && (this.handles[c] = a(this.handles[c], this.element).show()), 
                this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (d = a(this.handles[c], this.element), 
                f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = [ "padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left" ].join(""), 
                b.css(e, f), this._proportionallyResize()), a(this.handles[c]).length;
            }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), 
            this._handles.mouseover(function() {
                g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), 
                g.axis = e && e[1] ? e[1] : "se");
            }), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show());
            }).mouseleave(function() {
                h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide());
            })), this._mouseInit();
        },
        _destroy: function() {
            this._mouseDestroy();
            var b, c = function(b) {
                a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
            };
            return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
                position: b.css("position"),
                width: b.outerWidth(),
                height: b.outerHeight(),
                top: b.css("top"),
                left: b.css("left")
            }).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), 
            c(this.originalElement), this;
        },
        _mouseCapture: function(b) {
            var c, d, e = !1;
            for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
            return !this.options.disabled && e;
        },
        _mouseStart: function(c) {
            var d, e, f, g = this.options, h = this.element.position(), i = this.element;
            return this.resizing = !0, /absolute/.test(i.css("position")) ? i.css({
                position: "absolute",
                top: i.css("top"),
                left: i.css("left")
            }) : i.is(".ui-draggable") && i.css({
                position: "absolute",
                top: h.top,
                left: h.left
            }), this._renderProxy(), d = b(this.helper.css("left")), e = b(this.helper.css("top")), 
            g.containment && (d += a(g.containment).scrollLeft() || 0, e += a(g.containment).scrollTop() || 0), 
            this.offset = this.helper.offset(), this.position = {
                left: d,
                top: e
            }, this.size = this._helper ? {
                width: i.outerWidth(),
                height: i.outerHeight()
            } : {
                width: i.width(),
                height: i.height()
            }, this.originalSize = this._helper ? {
                width: i.outerWidth(),
                height: i.outerHeight()
            } : {
                width: i.width(),
                height: i.height()
            }, this.originalPosition = {
                left: d,
                top: e
            }, this.sizeDiff = {
                width: i.outerWidth() - i.width(),
                height: i.outerHeight() - i.height()
            }, this.originalMousePosition = {
                left: c.pageX,
                top: c.pageY
            }, this.aspectRatio = "number" == typeof g.aspectRatio ? g.aspectRatio : this.originalSize.width / this.originalSize.height || 1, 
            f = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === f ? this.axis + "-resize" : f), 
            i.addClass("ui-resizable-resizing"), this._propagate("start", c), !0;
        },
        _mouseDrag: function(b) {
            var c, d = this.helper, e = {}, f = this.originalMousePosition, g = this.axis, h = this.position.top, i = this.position.left, j = this.size.width, k = this.size.height, l = b.pageX - f.left || 0, m = b.pageY - f.top || 0, n = this._change[g];
            return n ? (c = n.apply(this, [ b, l, m ]), this._updateVirtualBoundaries(b.shiftKey), 
            (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), 
            this._updateCache(c), this._propagate("resize", b), this.position.top !== h && (e.top = this.position.top + "px"), 
            this.position.left !== i && (e.left = this.position.left + "px"), this.size.width !== j && (e.width = this.size.width + "px"), 
            this.size.height !== k && (e.height = this.size.height + "px"), d.css(e), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), 
            a.isEmptyObject(e) || this._trigger("resize", b, this.ui()), !1) : !1;
        },
        _mouseStop: function(b) {
            this.resizing = !1;
            var c, d, e, f, g, h, i, j = this.options, k = this;
            return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), 
            e = d && a.ui.hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, 
            g = {
                width: k.helper.width() - f,
                height: k.helper.height() - e
            }, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, 
            i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, 
            j.animate || this.element.css(a.extend(g, {
                top: i,
                left: h
            })), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), 
            a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), 
            this._propagate("stop", b), this._helper && this.helper.remove(), !1;
        },
        _updateVirtualBoundaries: function(a) {
            var b, d, e, f, g, h = this.options;
            g = {
                minWidth: c(h.minWidth) ? h.minWidth : 0,
                maxWidth: c(h.maxWidth) ? h.maxWidth : 1 / 0,
                minHeight: c(h.minHeight) ? h.minHeight : 0,
                maxHeight: c(h.maxHeight) ? h.maxHeight : 1 / 0
            }, (this._aspectRatio || a) && (b = g.minHeight * this.aspectRatio, e = g.minWidth / this.aspectRatio, 
            d = g.maxHeight * this.aspectRatio, f = g.maxWidth / this.aspectRatio, b > g.minWidth && (g.minWidth = b), 
            e > g.minHeight && (g.minHeight = e), g.maxWidth > d && (g.maxWidth = d), g.maxHeight > f && (g.maxHeight = f)), 
            this._vBoundaries = g;
        },
        _updateCache: function(a) {
            this.offset = this.helper.offset(), c(a.left) && (this.position.left = a.left), 
            c(a.top) && (this.position.top = a.top), c(a.height) && (this.size.height = a.height), 
            c(a.width) && (this.size.width = a.width);
        },
        _updateRatio: function(a) {
            var b = this.position, d = this.size, e = this.axis;
            return c(a.height) ? a.width = a.height * this.aspectRatio : c(a.width) && (a.height = a.width / this.aspectRatio), 
            "sw" === e && (a.left = b.left + (d.width - a.width), a.top = null), "nw" === e && (a.top = b.top + (d.height - a.height), 
            a.left = b.left + (d.width - a.width)), a;
        },
        _respectSize: function(a) {
            var b = this._vBoundaries, d = this.axis, e = c(a.width) && b.maxWidth && b.maxWidth < a.width, f = c(a.height) && b.maxHeight && b.maxHeight < a.height, g = c(a.width) && b.minWidth && b.minWidth > a.width, h = c(a.height) && b.minHeight && b.minHeight > a.height, i = this.originalPosition.left + this.originalSize.width, j = this.position.top + this.size.height, k = /sw|nw|w/.test(d), l = /nw|ne|n/.test(d);
            return g && (a.width = b.minWidth), h && (a.height = b.minHeight), e && (a.width = b.maxWidth), 
            f && (a.height = b.maxHeight), g && k && (a.left = i - b.minWidth), e && k && (a.left = i - b.maxWidth), 
            h && l && (a.top = j - b.minHeight), f && l && (a.top = j - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, 
            a;
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var a, b, c, d, e, f = this.helper || this.element;
                for (a = 0; this._proportionallyResizeElements.length > a; a++) {
                    if (e = this._proportionallyResizeElements[a], !this.borderDif) for (this.borderDif = [], 
                    c = [ e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth") ], 
                    d = [ e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft") ], 
                    b = 0; c.length > b; b++) this.borderDif[b] = (parseInt(c[b], 10) || 0) + (parseInt(d[b], 10) || 0);
                    e.css({
                        height: f.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: f.width() - this.borderDif[1] - this.borderDif[3] || 0
                    });
                }
            }
        },
        _renderProxy: function() {
            var b = this.element, c = this.options;
            this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), 
            this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++c.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
        },
        _change: {
            e: function(a, b) {
                return {
                    width: this.originalSize.width + b
                };
            },
            w: function(a, b) {
                var c = this.originalSize, d = this.originalPosition;
                return {
                    left: d.left + b,
                    width: c.width - b
                };
            },
            n: function(a, b, c) {
                var d = this.originalSize, e = this.originalPosition;
                return {
                    top: e.top + c,
                    height: d.height - c
                };
            },
            s: function(a, b, c) {
                return {
                    height: this.originalSize.height + c
                };
            },
            se: function(b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ b, c, d ]));
            },
            sw: function(b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ b, c, d ]));
            },
            ne: function(b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ b, c, d ]));
            },
            nw: function(b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ b, c, d ]));
            }
        },
        _propagate: function(b, c) {
            a.ui.plugin.call(this, b, [ c, this.ui() ]), "resize" !== b && this._trigger(b, c, this.ui());
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            };
        }
    }), a.ui.plugin.add("resizable", "animate", {
        stop: function(b) {
            var c = a(this).data("ui-resizable"), d = c.options, e = c._proportionallyResizeElements, f = e.length && /textarea/i.test(e[0].nodeName), g = f && a.ui.hasScroll(e[0], "left") ? 0 : c.sizeDiff.height, h = f ? 0 : c.sizeDiff.width, i = {
                width: c.size.width - h,
                height: c.size.height - g
            }, j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
            c.element.animate(a.extend(i, k && j ? {
                top: k,
                left: j
            } : {}), {
                duration: d.animateDuration,
                easing: d.animateEasing,
                step: function() {
                    var d = {
                        width: parseInt(c.element.css("width"), 10),
                        height: parseInt(c.element.css("height"), 10),
                        top: parseInt(c.element.css("top"), 10),
                        left: parseInt(c.element.css("left"), 10)
                    };
                    e && e.length && a(e[0]).css({
                        width: d.width,
                        height: d.height
                    }), c._updateCache(d), c._propagate("resize", b);
                }
            });
        }
    }), a.ui.plugin.add("resizable", "containment", {
        start: function() {
            var c, d, e, f, g, h, i, j = a(this).data("ui-resizable"), k = j.options, l = j.element, m = k.containment, n = m instanceof a ? m.get(0) : /parent/.test(m) ? l.parent().get(0) : m;
            n && (j.containerElement = a(n), /document/.test(m) || m === document ? (j.containerOffset = {
                left: 0,
                top: 0
            }, j.containerPosition = {
                left: 0,
                top: 0
            }, j.parentData = {
                element: a(document),
                left: 0,
                top: 0,
                width: a(document).width(),
                height: a(document).height() || document.body.parentNode.scrollHeight
            }) : (c = a(n), d = [], a([ "Top", "Right", "Left", "Bottom" ]).each(function(a, e) {
                d[a] = b(c.css("padding" + e));
            }), j.containerOffset = c.offset(), j.containerPosition = c.position(), j.containerSize = {
                height: c.innerHeight() - d[3],
                width: c.innerWidth() - d[1]
            }, e = j.containerOffset, f = j.containerSize.height, g = j.containerSize.width, 
            h = a.ui.hasScroll(n, "left") ? n.scrollWidth : g, i = a.ui.hasScroll(n) ? n.scrollHeight : f, 
            j.parentData = {
                element: n,
                left: e.left,
                top: e.top,
                width: h,
                height: i
            }));
        },
        resize: function(b) {
            var c, d, e, f, g = a(this).data("ui-resizable"), h = g.options, i = g.containerOffset, j = g.position, k = g._aspectRatio || b.shiftKey, l = {
                top: 0,
                left: 0
            }, m = g.containerElement;
            m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), 
            k && (g.size.height = g.size.width / g.aspectRatio), g.position.left = h.helper ? i.left : 0), 
            j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), 
            k && (g.size.width = g.size.height * g.aspectRatio), g.position.top = g._helper ? i.top : 0), 
            g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top, 
            c = Math.abs((g._helper ? g.offset.left - l.left : g.offset.left - l.left) + g.sizeDiff.width), 
            d = Math.abs((g._helper ? g.offset.top - l.top : g.offset.top - i.top) + g.sizeDiff.height), 
            e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), 
            e && f && (c -= g.parentData.left), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, 
            k && (g.size.height = g.size.width / g.aspectRatio)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, 
            k && (g.size.width = g.size.height * g.aspectRatio));
        },
        stop: function() {
            var b = a(this).data("ui-resizable"), c = b.options, d = b.containerOffset, e = b.containerPosition, f = b.containerElement, g = a(b.helper), h = g.offset(), i = g.outerWidth() - b.sizeDiff.width, j = g.outerHeight() - b.sizeDiff.height;
            b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
                left: h.left - e.left - d.left,
                width: i,
                height: j
            }), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
                left: h.left - e.left - d.left,
                width: i,
                height: j
            });
        }
    }), a.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var b = a(this).data("ui-resizable"), c = b.options, d = function(b) {
                a(b).each(function() {
                    var b = a(this);
                    b.data("ui-resizable-alsoresize", {
                        width: parseInt(b.width(), 10),
                        height: parseInt(b.height(), 10),
                        left: parseInt(b.css("left"), 10),
                        top: parseInt(b.css("top"), 10)
                    });
                });
            };
            "object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], 
            d(c.alsoResize)) : a.each(c.alsoResize, function(a) {
                d(a);
            });
        },
        resize: function(b, c) {
            var d = a(this).data("ui-resizable"), e = d.options, f = d.originalSize, g = d.originalPosition, h = {
                height: d.size.height - f.height || 0,
                width: d.size.width - f.width || 0,
                top: d.position.top - g.top || 0,
                left: d.position.left - g.left || 0
            }, i = function(b, d) {
                a(b).each(function() {
                    var b = a(this), e = a(this).data("ui-resizable-alsoresize"), f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
                    a.each(g, function(a, b) {
                        var c = (e[b] || 0) + (h[b] || 0);
                        c && c >= 0 && (f[b] = c || null);
                    }), b.css(f);
                });
            };
            "object" != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function(a, b) {
                i(a, b);
            });
        },
        stop: function() {
            a(this).removeData("resizable-alsoresize");
        }
    }), a.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var b = a(this).data("ui-resizable"), c = b.options, d = b.size;
            b.ghost = b.originalElement.clone(), b.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: d.height,
                width: d.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), 
            b.ghost.appendTo(b.helper);
        },
        resize: function() {
            var b = a(this).data("ui-resizable");
            b.ghost && b.ghost.css({
                position: "relative",
                height: b.size.height,
                width: b.size.width
            });
        },
        stop: function() {
            var b = a(this).data("ui-resizable");
            b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0));
        }
    }), a.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var b = a(this).data("ui-resizable"), c = b.options, d = b.size, e = b.originalSize, f = b.originalPosition, g = b.axis, h = "number" == typeof c.grid ? [ c.grid, c.grid ] : c.grid, i = h[0] || 1, j = h[1] || 1, k = Math.round((d.width - e.width) / i) * i, l = Math.round((d.height - e.height) / j) * j, m = e.width + k, n = e.height + l, o = c.maxWidth && m > c.maxWidth, p = c.maxHeight && n > c.maxHeight, q = c.minWidth && c.minWidth > m, r = c.minHeight && c.minHeight > n;
            c.grid = h, q && (m += i), r && (n += j), o && (m -= i), p && (n -= j), /^(se|s|e)$/.test(g) ? (b.size.width = m, 
            b.size.height = n) : /^(ne)$/.test(g) ? (b.size.width = m, b.size.height = n, b.position.top = f.top - l) : /^(sw)$/.test(g) ? (b.size.width = m, 
            b.size.height = n, b.position.left = f.left - k) : (b.size.width = m, b.size.height = n, 
            b.position.top = f.top - l, b.position.left = f.left - k);
        }
    });
}(jQuery), function(a) {
    a.widget("ui.selectable", a.ui.mouse, {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var b, c = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function() {
                    var b = a(this), c = b.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: b,
                        left: c.left,
                        top: c.top,
                        right: c.left + b.outerWidth(),
                        bottom: c.top + b.outerHeight(),
                        startselected: !1,
                        selected: b.hasClass("ui-selected"),
                        selecting: b.hasClass("ui-selecting"),
                        unselecting: b.hasClass("ui-unselecting")
                    });
                });
            }, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), 
            this.helper = a("<div class='ui-selectable-helper'></div>");
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), 
            this._mouseDestroy();
        },
        _mouseStart: function(b) {
            var c = this, d = this.options;
            this.opos = [ b.pageX, b.pageY ], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), 
            this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
                left: b.pageX,
                top: b.pageY,
                width: 0,
                height: 0
            }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var d = a.data(this, "selectable-item");
                d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), 
                d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
                    unselecting: d.element
                }));
            }), a(b.target).parents().addBack().each(function() {
                var d, e = a.data(this, "selectable-item");
                return e ? (d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), 
                e.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), 
                e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {
                    selecting: e.element
                }) : c._trigger("unselecting", b, {
                    unselecting: e.element
                }), !1) : void 0;
            }));
        },
        _mouseDrag: function(b) {
            if (this.dragged = !0, !this.options.disabled) {
                var c, d = this, e = this.options, f = this.opos[0], g = this.opos[1], h = b.pageX, i = b.pageY;
                return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({
                    left: f,
                    top: g,
                    width: h - f,
                    height: i - g
                }), this.selectees.each(function() {
                    var c = a.data(this, "selectable-item"), j = !1;
                    c && c.element !== d.element[0] && ("touch" === e.tolerance ? j = !(c.left > h || f > c.right || c.top > i || g > c.bottom) : "fit" === e.tolerance && (j = c.left > f && h > c.right && c.top > g && i > c.bottom), 
                    j ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), 
                    c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, 
                    d._trigger("selecting", b, {
                        selecting: c.element
                    }))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), 
                    c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), 
                    c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), 
                    d._trigger("unselecting", b, {
                        unselecting: c.element
                    }))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), 
                    c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
                        unselecting: c.element
                    })))));
                }), !1;
            }
        },
        _mouseStop: function(b) {
            var c = this;
            return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function() {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, 
                c._trigger("unselected", b, {
                    unselected: d.element
                });
            }), a(".ui-selecting", this.element[0]).each(function() {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, 
                d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
                    selected: d.element
                });
            }), this._trigger("stop", b), this.helper.remove(), !1;
        }
    });
}(jQuery), function(a) {
    function b(a, b, c) {
        return a > b && b + c > a;
    }
    function c(a) {
        return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"));
    }
    a.widget("ui.sortable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var a = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
            this.floating = this.items.length ? "x" === a.axis || c(this.items[0].item) : !1, 
            this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
            return this;
        },
        _setOption: function(b, c) {
            "disabled" === b ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments);
        },
        _mouseCapture: function(b, c) {
            var d = null, e = !1, f = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), 
            a(b.target).parents().each(function() {
                return a.data(this, f.widgetName + "-item") === f ? (d = a(this), !1) : void 0;
            }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), d && (!this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function() {
                this === b.target && (e = !0);
            }), e)) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1);
        },
        _mouseStart: function(b, c, d) {
            var e, f, g = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), 
            this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
            this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
            this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, 
            this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), 
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
            g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), 
            this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), 
            g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
            this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
            this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
            this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
            !d) for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", b, this._uiHash(this));
            return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), 
            this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), 
            !0;
        },
        _mouseDrag: function(b) {
            var c, d, e, f, g = this.options, h = !1;
            for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), 
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), 
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - a(document).scrollTop() < g.scrollSensitivity ? h = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < g.scrollSensitivity && (h = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)), 
            b.pageX - a(document).scrollLeft() < g.scrollSensitivity ? h = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < g.scrollSensitivity && (h = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed))), 
            h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), 
            this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
            c = this.items.length - 1; c >= 0; c--) if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), 
            f && d.instance === this.currentContainer && e !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== e && !a.contains(this.placeholder[0], e) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], e) : !0)) {
                if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
                this._rearrange(b, d), this._trigger("change", b, this._uiHash());
                break;
            }
            return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), 
            this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
            !1;
        },
        _mouseStop: function(b, c) {
            if (b) {
                if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), 
                this.options.revert) {
                    var d = this, e = this.placeholder.offset(), f = this.options.axis, g = {};
                    f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), 
                    f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), 
                    this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function() {
                        d._clear(b);
                    });
                } else this._clear(b, c);
                return !1;
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), 
                this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), 
                this.containers[b].containerCache.over = 0);
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
            a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), 
            this;
        },
        serialize: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected), d = [];
            return b = b || {}, a(c).each(function() {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]));
            }), !d.length && b.key && d.push(b.key + "="), d.join("&");
        },
        toArray: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected), d = [];
            return b = b || {}, c.each(function() {
                d.push(a(b.item || this).attr(b.attribute || "id") || "");
            }), d;
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = "x" === this.options.axis || d + j > h && i > d + j, m = "y" === this.options.axis || b + k > f && g > b + k, n = l && m;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : b + this.helperProportions.width / 2 > f && g > c - this.helperProportions.width / 2 && d + this.helperProportions.height / 2 > h && i > e - this.helperProportions.height / 2;
        },
        _intersectsWithPointer: function(a) {
            var c = "x" === this.options.axis || b(this.positionAbs.top + this.offset.click.top, a.top, a.height), d = "y" === this.options.axis || b(this.positionAbs.left + this.offset.click.left, a.left, a.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
            return e ? this.floating ? g && "right" === g || "down" === f ? 2 : 1 : f && ("down" === f ? 2 : 1) : !1;
        },
        _intersectsWithSides: function(a) {
            var c = b(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height), d = b(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            return this.floating && f ? "right" === f && d || "left" === f && !d : e && ("down" === e && c || "up" === e && !c);
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== a && (a > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== a && (a > 0 ? "right" : "left");
        },
        refresh: function(a) {
            return this._refreshItems(a), this.refreshPositions(), this;
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor === String ? [ a.connectWith ] : a.connectWith;
        },
        _getItemsAsjQuery: function(b) {
            var c, d, e, f, g = [], h = [], i = this._connectWith();
            if (i && b) for (c = i.length - 1; c >= 0; c--) for (e = a(i[c]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), 
            f && f !== this && !f.options.disabled && h.push([ a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f ]);
            for (h.push([ a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]), 
            c = h.length - 1; c >= 0; c--) h[c][0].each(function() {
                g.push(this);
            });
            return a(g);
        },
        _removeCurrentsFromItems: function() {
            var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function(a) {
                for (var c = 0; b.length > c; c++) if (b[c] === a.item[0]) return !1;
                return !0;
            });
        },
        _refreshItems: function(b) {
            this.items = [], this.containers = [ this ];
            var c, d, e, f, g, h, i, j, k = this.items, l = [ [ a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this ] ], m = this._connectWith();
            if (m && this.ready) for (c = m.length - 1; c >= 0; c--) for (e = a(m[c]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), 
            f && f !== this && !f.options.disabled && (l.push([ a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
                item: this.currentItem
            }) : a(f.options.items, f.element), f ]), this.containers.push(f));
            for (c = l.length - 1; c >= 0; c--) for (g = l[c][1], h = l[c][0], d = 0, j = h.length; j > d; d++) i = a(h[d]), 
            i.data(this.widgetName + "-item", g), k.push({
                item: i,
                instance: g,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            });
        },
        refreshPositions: function(b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var c, d, e, f;
            for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, 
            b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, 
            d.top = f.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (c = this.containers.length - 1; c >= 0; c--) f = this.containers[c].element.offset(), 
            this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, 
            this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), 
            this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
            return this;
        },
        _createPlaceholder: function(b) {
            b = b || this;
            var c, d = b.options;
            d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
                element: function() {
                    var d = b.currentItem[0].nodeName.toLowerCase(), e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === d ? b.currentItem.children().each(function() {
                        a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(e);
                    }) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), 
                    e;
                },
                update: function(a, e) {
                    (!c || d.forcePlaceholderSize) && (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), 
                    e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)));
                }
            }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), 
            d.placeholder.update(b, b.placeholder);
        },
        _contactContainers: function(d) {
            var e, f, g, h, i, j, k, l, m, n, o = null, p = null;
            for (e = this.containers.length - 1; e >= 0; e--) if (!a.contains(this.currentItem[0], this.containers[e].element[0])) if (this._intersectsWith(this.containers[e].containerCache)) {
                if (o && a.contains(this.containers[e].element[0], o.element[0])) continue;
                o = this.containers[e], p = e;
            } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", d, this._uiHash(this)), 
            this.containers[e].containerCache.over = 0);
            if (o) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", d, this._uiHash(this)), 
            this.containers[p].containerCache.over = 1); else {
                for (g = 1e4, h = null, n = o.floating || c(this.currentItem), i = n ? "left" : "top", 
                j = n ? "width" : "height", k = this.positionAbs[i] + this.offset.click[i], f = this.items.length - 1; f >= 0; f--) a.contains(this.containers[p].element[0], this.items[f].item[0]) && this.items[f].item[0] !== this.currentItem[0] && (!n || b(this.positionAbs.top + this.offset.click.top, this.items[f].top, this.items[f].height)) && (l = this.items[f].item.offset()[i], 
                m = !1, Math.abs(l - k) > Math.abs(l + this.items[f][j] - k) && (m = !0, l += this.items[f][j]), 
                g > Math.abs(l - k) && (g = Math.abs(l - k), h = this.items[f], this.direction = m ? "up" : "down"));
                if (!h && !this.options.dropOnEmpty) return;
                if (this.currentContainer === this.containers[p]) return;
                h ? this._rearrange(d, h, null, !0) : this._rearrange(d, null, this.containers[p].element, !0), 
                this._trigger("change", d, this._uiHash()), this.containers[p]._trigger("change", d, this._uiHash(this)), 
                this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), 
                this.containers[p]._trigger("over", d, this._uiHash(this)), this.containers[p].containerCache.over = 1;
            }
        },
        _createHelper: function(b) {
            var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [ b, this.currentItem ])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
            return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), 
            d[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), 
            (!d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), 
            d;
        },
        _adjustOffsetFromHelper: function(b) {
            "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), 
            "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), 
            b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                top: 0,
                left: 0
            }), {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            }
            return {
                top: 0,
                left: 0
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var b, c, d, e = this.options;
            "parent" === e.containment && (e.containment = this.helper[0].parentNode), ("document" === e.containment || "window" === e.containment) && (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
            /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), 
            d = "hidden" !== a(b).css("overflow"), this.containment = [ c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ]);
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = "absolute" === b ? 1 : -1, e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, f = /(html|body)/i.test(e[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
            };
        },
        _generatePosition: function(b) {
            var c, d, e = this.options, f = b.pageX, g = b.pageY, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(h[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), 
            this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), 
            b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), 
            b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), 
            b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), 
            e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], 
            g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, 
            d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], 
            f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), 
            {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
            };
        },
        _rearrange: function(a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), 
            this.counter = this.counter ? ++this.counter : 1;
            var e = this.counter;
            this._delay(function() {
                e === this.counter && this.refreshPositions(!d);
            });
        },
        _clear: function(a, b) {
            this.reverting = !1;
            var c, d = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
            this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (c in this._storedCSS) ("auto" === this._storedCSS[c] || "static" === this._storedCSS[c]) && (this._storedCSS[c] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
            } else this.currentItem.show();
            for (this.fromOutside && !b && d.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside));
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || d.push(function(a) {
                this._trigger("update", a, this._uiHash());
            }), this !== this.currentContainer && (b || (d.push(function(a) {
                this._trigger("remove", a, this._uiHash());
            }), d.push(function(a) {
                return function(b) {
                    a._trigger("receive", b, this._uiHash(this));
                };
            }.call(this, this.currentContainer)), d.push(function(a) {
                return function(b) {
                    a._trigger("update", b, this._uiHash(this));
                };
            }.call(this, this.currentContainer)))), c = this.containers.length - 1; c >= 0; c--) b || d.push(function(a) {
                return function(b) {
                    a._trigger("deactivate", b, this._uiHash(this));
                };
            }.call(this, this.containers[c])), this.containers[c].containerCache.over && (d.push(function(a) {
                return function(b) {
                    a._trigger("out", b, this._uiHash(this));
                };
            }.call(this, this.containers[c])), this.containers[c].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), 
            this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), 
            this.dragging = !1, this.cancelHelperRemoval) {
                if (!b) {
                    for (this._trigger("beforeStop", a, this._uiHash()), c = 0; d.length > c; c++) d[c].call(this, a);
                    this._trigger("stop", a, this._uiHash());
                }
                return this.fromOutside = !1, !1;
            }
            if (b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
            this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, 
            !b) {
                for (c = 0; d.length > c; c++) d[c].call(this, a);
                this._trigger("stop", a, this._uiHash());
            }
            return this.fromOutside = !1, !0;
        },
        _trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
        },
        _uiHash: function(b) {
            var c = b || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: b ? b.element : null
            };
        }
    });
}(jQuery), function(a) {
    var b = 0, c = {}, d = {};
    c.height = c.paddingTop = c.paddingBottom = c.borderTopWidth = c.borderBottomWidth = "hide", 
    d.height = d.paddingTop = d.paddingBottom = d.borderTopWidth = d.borderBottomWidth = "show", 
    a.widget("ui.accordion", {
        version: "1.10.3",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function() {
            var b = this.options;
            this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), 
            b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), 
            0 > b.active && (b.active += this.headers.length), this._refresh();
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : a(),
                content: this.active.length ? this.active.next() : a()
            };
        },
        _createIcons: function() {
            var b = this.options.icons;
            b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), 
            this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), 
            this.headers.addClass("ui-accordion-icons"));
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();
        },
        _destroy: function() {
            var a;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), 
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id");
            }), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id");
            }), "content" !== this.options.heightStyle && a.css("height", "");
        },
        _setOption: function(a, b) {
            return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), 
            this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), 
            "icons" === a && (this._destroyIcons(), b && this._createIcons()), void ("disabled" === a && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b)));
        },
        _keydown: function(b) {
            if (!b.altKey && !b.ctrlKey) {
                var c = a.ui.keyCode, d = this.headers.length, e = this.headers.index(b.target), f = !1;
                switch (b.keyCode) {
                  case c.RIGHT:
                  case c.DOWN:
                    f = this.headers[(e + 1) % d];
                    break;

                  case c.LEFT:
                  case c.UP:
                    f = this.headers[(e - 1 + d) % d];
                    break;

                  case c.SPACE:
                  case c.ENTER:
                    this._eventHandler(b);
                    break;

                  case c.HOME:
                    f = this.headers[0];
                    break;

                  case c.END:
                    f = this.headers[d - 1];
                }
                f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault());
            }
        },
        _panelKeyDown: function(b) {
            b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus();
        },
        refresh: function() {
            var b = this.options;
            this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, 
            this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, 
            this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), 
            this._destroyIcons(), this._refresh();
        },
        _processPanels: function() {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), 
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide();
        },
        _refresh: function() {
            var c, d = this.options, e = d.heightStyle, f = this.element.parent(), g = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++b);
            this.active = this._findActive(d.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), 
            this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(b) {
                var c = a(this), d = c.attr("id"), e = c.next(), f = e.attr("id");
                d || (d = g + "-header-" + b, c.attr("id", d)), f || (f = g + "-panel-" + b, e.attr("id", f)), 
                c.attr("aria-controls", f), e.attr("aria-labelledby", d);
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                tabIndex: 0
            }).next().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(d.event), 
            "fill" === e ? (c = f.height(), this.element.siblings(":visible").each(function() {
                var b = a(this), d = b.css("position");
                "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0));
            }), this.headers.each(function() {
                c -= a(this).outerHeight(!0);
            }), this.headers.next().each(function() {
                a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()));
            }).css("overflow", "auto")) : "auto" === e && (c = 0, this.headers.next().each(function() {
                c = Math.max(c, a(this).css("height", "").height());
            }).height(c));
        },
        _activate: function(b) {
            var c = this._findActive(b)[0];
            c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop
            }));
        },
        _findActive: function(b) {
            return "number" == typeof b ? this.headers.eq(b) : a();
        },
        _setupEvents: function(b) {
            var c = {
                keydown: "_keydown"
            };
            b && a.each(b.split(" "), function(a, b) {
                c[b] = "_eventHandler";
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), 
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers);
        },
        _eventHandler: function(b) {
            var c = this.options, d = this.active, e = a(b.currentTarget), f = e[0] === d[0], g = f && c.collapsible, h = g ? a() : e.next(), i = d.next(), j = {
                oldHeader: d,
                oldPanel: i,
                newHeader: g ? a() : e,
                newPanel: h
            };
            b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = g ? !1 : this.headers.index(e), 
            this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), 
            c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), 
            f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), 
            c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), 
            e.next().addClass("ui-accordion-content-active")));
        },
        _toggle: function(b) {
            var c = b.newPanel, d = this.prevShow.length ? this.prevShow : b.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, 
            this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), 
            d.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), d.prev().attr("aria-selected", "false"), c.length && d.length ? d.prev().attr("tabIndex", -1) : c.length && this.headers.filter(function() {
                return 0 === a(this).attr("tabIndex");
            }).attr("tabIndex", -1), c.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            });
        },
        _animate: function(a, b, e) {
            var f, g, h, i = this, j = 0, k = a.length && (!b.length || a.index() < b.index()), l = this.options.animate || {}, m = k && l.down || l, n = function() {
                i._toggleComplete(e);
            };
            return "number" == typeof m && (h = m), "string" == typeof m && (g = m), g = g || m.easing || l.easing, 
            h = h || m.duration || l.duration, b.length ? a.length ? (f = a.show().outerHeight(), 
            b.animate(c, {
                duration: h,
                easing: g,
                step: function(a, b) {
                    b.now = Math.round(a);
                }
            }), void a.hide().animate(d, {
                duration: h,
                easing: g,
                complete: n,
                step: function(a, c) {
                    c.now = Math.round(a), "height" !== c.prop ? j += c.now : "content" !== i.options.heightStyle && (c.now = Math.round(f - b.outerHeight() - j), 
                    j = 0);
                }
            })) : b.animate(c, h, g, n) : a.animate(d, h, g, n);
        },
        _toggleComplete: function(a) {
            var b = a.oldPanel;
            b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), 
            b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a);
        }
    });
}(jQuery), function(a) {
    var b = 0;
    a.widget("ui.autocomplete", {
        version: "1.10.3",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var b, c, d, e = this.element[0].nodeName.toLowerCase(), f = "textarea" === e, g = "input" === e;
            this.isMultiLine = f ? !0 : g ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[f || g ? "val" : "text"], 
            this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), 
            this._on(this.element, {
                keydown: function(e) {
                    if (this.element.prop("readOnly")) return b = !0, d = !0, void (c = !0);
                    b = !1, d = !1, c = !1;
                    var f = a.ui.keyCode;
                    switch (e.keyCode) {
                      case f.PAGE_UP:
                        b = !0, this._move("previousPage", e);
                        break;

                      case f.PAGE_DOWN:
                        b = !0, this._move("nextPage", e);
                        break;

                      case f.UP:
                        b = !0, this._keyEvent("previous", e);
                        break;

                      case f.DOWN:
                        b = !0, this._keyEvent("next", e);
                        break;

                      case f.ENTER:
                      case f.NUMPAD_ENTER:
                        this.menu.active && (b = !0, e.preventDefault(), this.menu.select(e));
                        break;

                      case f.TAB:
                        this.menu.active && this.menu.select(e);
                        break;

                      case f.ESCAPE:
                        this.menu.element.is(":visible") && (this._value(this.term), this.close(e), e.preventDefault());
                        break;

                      default:
                        c = !0, this._searchTimeout(e);
                    }
                },
                keypress: function(d) {
                    if (b) return b = !1, void ((!this.isMultiLine || this.menu.element.is(":visible")) && d.preventDefault());
                    if (!c) {
                        var e = a.ui.keyCode;
                        switch (d.keyCode) {
                          case e.PAGE_UP:
                            this._move("previousPage", d);
                            break;

                          case e.PAGE_DOWN:
                            this._move("nextPage", d);
                            break;

                          case e.UP:
                            this._keyEvent("previous", d);
                            break;

                          case e.DOWN:
                            this._keyEvent("next", d);
                        }
                    }
                },
                input: function(a) {
                    return d ? (d = !1, void a.preventDefault()) : void this._searchTimeout(a);
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value();
                },
                blur: function(a) {
                    return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), 
                    this.close(a), void this._change(a));
                }
            }), this._initSource(), this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu"), this._on(this.menu.element, {
                mousedown: function(b) {
                    b.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur;
                    });
                    var c = this.menu.element[0];
                    a(b.target).closest(".ui-menu-item").length || this._delay(function() {
                        var b = this;
                        this.document.one("mousedown", function(d) {
                            d.target === b.element[0] || d.target === c || a.contains(c, d.target) || b.close();
                        });
                    });
                },
                menufocus: function(b, c) {
                    if (this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type))) return this.menu.blur(), 
                    void this.document.one("mousemove", function() {
                        a(b.target).trigger(b.originalEvent);
                    });
                    var d = c.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", b, {
                        item: d
                    }) ? b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(d.value) : this.liveRegion.text(d.value);
                },
                menuselect: function(a, b) {
                    var c = b.item.data("ui-autocomplete-item"), d = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = d, 
                    this._delay(function() {
                        this.previous = d, this.selectedItem = c;
                    })), !1 !== this._trigger("select", a, {
                        item: c
                    }) && this._value(c.value), this.term = this._value(), this.close(a), this.selectedItem = c;
                }
            }), this.liveRegion = a("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), 
            this.menu.element.remove(), this.liveRegion.remove();
        },
        _setOption: function(a, b) {
            this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), 
            "disabled" === a && b && this.xhr && this.xhr.abort();
        },
        _appendTo: function() {
            var b = this.options.appendTo;
            return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b || (b = this.element.closest(".ui-front")), 
            b.length || (b = this.document[0].body), b;
        },
        _initSource: function() {
            var b, c, d = this;
            a.isArray(this.options.source) ? (b = this.options.source, this.source = function(c, d) {
                d(a.ui.autocomplete.filter(b, c.term));
            }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function(b, e) {
                d.xhr && d.xhr.abort(), d.xhr = a.ajax({
                    url: c,
                    data: b,
                    dataType: "json",
                    success: function(a) {
                        e(a);
                    },
                    error: function() {
                        e([]);
                    }
                });
            }) : this.source = this.options.source;
        },
        _searchTimeout: function(a) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, a));
            }, this.options.delay);
        },
        search: function(a, b) {
            return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : void 0;
        },
        _search: function(a) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, 
            this.source({
                term: a
            }, this._response());
        },
        _response: function() {
            var a = this, c = ++b;
            return function(d) {
                c === b && a.__response(d), a.pending--, a.pending || a.element.removeClass("ui-autocomplete-loading");
            };
        },
        __response: function(a) {
            a && (a = this._normalize(a)), this._trigger("response", null, {
                content: a
            }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), 
            this._trigger("open")) : this._close();
        },
        close: function(a) {
            this.cancelSearch = !0, this._close(a);
        },
        _close: function(a) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), 
            this.isNewMenu = !0, this._trigger("close", a));
        },
        _change: function(a) {
            this.previous !== this._value() && this._trigger("change", a, {
                item: this.selectedItem
            });
        },
        _normalize: function(b) {
            return b.length && b[0].label && b[0].value ? b : a.map(b, function(b) {
                return "string" == typeof b ? {
                    label: b,
                    value: b
                } : a.extend({
                    label: b.label || b.value,
                    value: b.value || b.label
                }, b);
            });
        },
        _suggest: function(b) {
            var c = this.menu.element.empty();
            this._renderMenu(c, b), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), 
            c.position(a.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next();
        },
        _resizeMenu: function() {
            var a = this.menu.element;
            a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()));
        },
        _renderMenu: function(b, c) {
            var d = this;
            a.each(c, function(a, c) {
                d._renderItemData(b, c);
            });
        },
        _renderItemData: function(a, b) {
            return this._renderItem(a, b).data("ui-autocomplete-item", b);
        },
        _renderItem: function(b, c) {
            return a("<li>").append(a("<a>").text(c.label)).appendTo(b);
        },
        _move: function(a, b) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this._value(this.term), 
            void this.menu.blur()) : void this.menu[a](b) : void this.search(null, b);
        },
        widget: function() {
            return this.menu.element;
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function(a, b) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(a, b), b.preventDefault());
        }
    }), a.extend(a.ui.autocomplete, {
        escapeRegex: function(a) {
            return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function(b, c) {
            var d = RegExp(a.ui.autocomplete.escapeRegex(c), "i");
            return a.grep(b, function(a) {
                return d.test(a.label || a.value || a);
            });
        }
    }), a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(a) {
                    return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                }
            }
        },
        __response: function(a) {
            var b;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (b = a && a.length ? this.options.messages.results(a.length) : this.options.messages.noResults, 
            this.liveRegion.text(b));
        }
    });
}(jQuery), function(a) {
    var b, c, d, e, f = "ui-button ui-widget ui-state-default ui-corner-all", g = "ui-state-hover ui-state-active ", h = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", i = function() {
        var b = a(this);
        setTimeout(function() {
            b.find(":ui-button").button("refresh");
        }, 1);
    }, j = function(b) {
        var c = b.name, d = b.form, e = a([]);
        return c && (c = c.replace(/'/g, "\\'"), e = d ? a(d).find("[name='" + c + "']") : a("[name='" + c + "']", b.ownerDocument).filter(function() {
            return !this.form;
        })), e;
    };
    a.widget("ui.button", {
        version: "1.10.3",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, i), 
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), 
            this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var g = this, h = this.options, k = "checkbox" === this.type || "radio" === this.type, l = k ? "" : "ui-state-active", m = "ui-state-focus";
            null === h.label && (h.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), 
            this._hoverable(this.buttonElement), this.buttonElement.addClass(f).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                h.disabled || this === b && a(this).addClass("ui-state-active");
            }).bind("mouseleave" + this.eventNamespace, function() {
                h.disabled || a(this).removeClass(l);
            }).bind("click" + this.eventNamespace, function(a) {
                h.disabled && (a.preventDefault(), a.stopImmediatePropagation());
            }), this.element.bind("focus" + this.eventNamespace, function() {
                g.buttonElement.addClass(m);
            }).bind("blur" + this.eventNamespace, function() {
                g.buttonElement.removeClass(m);
            }), k && (this.element.bind("change" + this.eventNamespace, function() {
                e || g.refresh();
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(a) {
                h.disabled || (e = !1, c = a.pageX, d = a.pageY);
            }).bind("mouseup" + this.eventNamespace, function(a) {
                h.disabled || (c !== a.pageX || d !== a.pageY) && (e = !0);
            })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return h.disabled || e ? !1 : void 0;
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (h.disabled || e) return !1;
                a(this).addClass("ui-state-active"), g.buttonElement.attr("aria-pressed", "true");
                var b = g.element[0];
                j(b).not(b).map(function() {
                    return a(this).button("widget")[0];
                }).removeClass("ui-state-active").attr("aria-pressed", "false");
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return h.disabled ? !1 : (a(this).addClass("ui-state-active"), b = this, void g.document.one("mouseup", function() {
                    b = null;
                }));
            }).bind("mouseup" + this.eventNamespace, function() {
                return h.disabled ? !1 : void a(this).removeClass("ui-state-active");
            }).bind("keydown" + this.eventNamespace, function(b) {
                return h.disabled ? !1 : void ((b.keyCode === a.ui.keyCode.SPACE || b.keyCode === a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active"));
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                a(this).removeClass("ui-state-active");
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
                b.keyCode === a.ui.keyCode.SPACE && a(this).click();
            })), this._setOption("disabled", h.disabled), this._resetButton();
        },
        _determineButtonType: function() {
            var a, b, c;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", 
            "checkbox" === this.type || "radio" === this.type ? (a = this.element.parents().last(), 
            b = "label[for='" + this.element.attr("id") + "']", this.buttonElement = a.find(b), 
            this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), 
            this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), 
            this.element.addClass("ui-helper-hidden-accessible"), c = this.element.is(":checked"), 
            c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", c)) : this.buttonElement = this.element;
        },
        widget: function() {
            return this.buttonElement;
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(f + " " + g + " " + h).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), 
            this.hasTitle || this.buttonElement.removeAttr("title");
        },
        _setOption: function(a, b) {
            return this._super(a, b), "disabled" === a ? void (b ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1)) : void this._resetButton();
        },
        refresh: function() {
            var b = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            b !== this.options.disabled && this._setOption("disabled", b), "radio" === this.type ? j(this.element[0]).each(function() {
                a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
        },
        _resetButton: function() {
            if ("input" === this.type) return void (this.options.label && this.element.val(this.options.label));
            var b = this.buttonElement.removeClass(h), c = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(), d = this.options.icons, e = d.primary && d.secondary, f = [];
            d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), 
            d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), 
            d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), 
            this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), 
            this.hasTitle || b.attr("title", a.trim(c)))) : f.push("ui-button-text-only"), b.addClass(f.join(" "));
        }
    }), a.widget("ui.buttonset", {
        version: "1.10.3",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset");
        },
        _init: function() {
            this.refresh();
        },
        _setOption: function(a, b) {
            "disabled" === a && this.buttons.button("option", a, b), this._super(a, b);
        },
        refresh: function() {
            var b = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return a(this).button("widget")[0];
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end();
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                return a(this).button("widget")[0];
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
        }
    });
}(jQuery), function(a, b) {
    function c() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, 
        this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", 
        this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", 
        this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", 
        this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", 
        this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, a.extend(this._defaults, this.regional[""]), this.dpDiv = d(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }
    function d(b) {
        var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return b.delegate(c, "mouseout", function() {
            a(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).removeClass("ui-datepicker-prev-hover"), 
            -1 !== this.className.indexOf("ui-datepicker-next") && a(this).removeClass("ui-datepicker-next-hover");
        }).delegate(c, "mouseover", function() {
            a.datepicker._isDisabledDatepicker(f.inline ? b.parent()[0] : f.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), 
            a(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).addClass("ui-datepicker-prev-hover"), 
            -1 !== this.className.indexOf("ui-datepicker-next") && a(this).addClass("ui-datepicker-next-hover"));
        });
    }
    function e(b, c) {
        a.extend(b, c);
        for (var d in c) null == c[d] && (b[d] = c[d]);
        return b;
    }
    a.extend(a.ui, {
        datepicker: {
            version: "1.10.3"
        }
    });
    var f, g = "datepicker";
    a.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv;
        },
        setDefaults: function(a) {
            return e(this._defaults, a || {}), this;
        },
        _attachDatepicker: function(b, c) {
            var d, e, f;
            d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, 
            b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), 
            "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f);
        },
        _newInst: function(b, c) {
            var e = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: e,
                input: b,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: c,
                dpDiv: c ? d(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            };
        },
        _connectDatepicker: function(b, c) {
            var d = a(b);
            c.append = a([]), c.trigger = a([]), d.hasClass(this.markerClassName) || (this._attachments(d, c), 
            d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), 
            this._autoSize(c), a.data(b, g, c), c.settings.disabled && this._disableDatepicker(b));
        },
        _attachments: function(b, c) {
            var d, e, f, g = this._get(c, "appendText"), h = this._get(c, "isRTL");
            c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), 
            b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), 
            d = this._get(c, "showOn"), ("focus" === d || "both" === d) && b.focus(this._showDatepicker), 
            ("button" === d || "both" === d) && (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), 
            c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: e,
                title: e
            }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
                src: f,
                alt: e,
                title: e
            }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function() {
                return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), 
                a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1;
            }));
        },
        _autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b, c, d, e, f = new Date(2009, 11, 20), g = this._get(a, "dateFormat");
                g.match(/[DM]/) && (b = function(a) {
                    for (c = 0, d = 0, e = 0; a.length > e; e++) a[e].length > c && (c = a[e].length, 
                    d = e);
                    return d;
                }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), 
                f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), 
                a.input.attr("size", this._formatDate(a, f).length);
            }
        },
        _inlineDatepicker: function(b, c) {
            var d = a(b);
            d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), 
            a.data(b, g, c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), 
            this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function(b, c, d, f, h) {
            var i, j, k, l, m, n = this._dialogInst;
            return n || (this.uuid += 1, i = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + i + "' style='position: absolute; top: -100px; width: 0px;'/>"), 
            this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), 
            n = this._dialogInst = this._newInst(this._dialogInput, !1), n.settings = {}, a.data(this._dialogInput[0], g, n)), 
            e(n.settings, f || {}), c = c && c.constructor === Date ? this._formatDate(n, c) : c, 
            this._dialogInput.val(c), this._pos = h ? h.length ? h : [ h.pageX, h.pageY ] : null, 
            this._pos || (j = document.documentElement.clientWidth, k = document.documentElement.clientHeight, 
            l = document.documentElement.scrollLeft || document.body.scrollLeft, m = document.documentElement.scrollTop || document.body.scrollTop, 
            this._pos = [ j / 2 - 100 + l, k / 2 - 150 + m ]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), 
            n.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), 
            this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), 
            a.data(this._dialogInput[0], g, n), this;
        },
        _destroyDatepicker: function(b) {
            var c, d = a(b), e = a.data(b, g);
            d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), a.removeData(b, g), 
            "input" === c ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === c || "span" === c) && d.removeClass(this.markerClassName).empty());
        },
        _enableDatepicker: function(b) {
            var c, d, e = a(b), f = a.data(b, g);
            e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !1, 
            f.trigger.filter("button").each(function() {
                this.disabled = !1;
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === c || "span" === c) && (d = e.children("." + this._inlineClass), 
            d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), 
            this._disabledInputs = a.map(this._disabledInputs, function(a) {
                return a === b ? null : a;
            }));
        },
        _disableDatepicker: function(b) {
            var c, d, e = a(b), f = a.data(b, g);
            e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !0, 
            f.trigger.filter("button").each(function() {
                this.disabled = !0;
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === c || "span" === c) && (d = e.children("." + this._inlineClass), 
            d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), 
            this._disabledInputs = a.map(this._disabledInputs, function(a) {
                return a === b ? null : a;
            }), this._disabledInputs[this._disabledInputs.length] = b);
        },
        _isDisabledDatepicker: function(a) {
            if (!a) return !1;
            for (var b = 0; this._disabledInputs.length > b; b++) if (this._disabledInputs[b] === a) return !0;
            return !1;
        },
        _getInst: function(b) {
            try {
                return a.data(b, g);
            } catch (c) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(c, d, f) {
            var g, h, i, j, k = this._getInst(c);
            return 2 === arguments.length && "string" == typeof d ? "defaults" === d ? a.extend({}, a.datepicker._defaults) : k ? "all" === d ? a.extend({}, k.settings) : this._get(k, d) : null : (g = d || {}, 
            "string" == typeof d && (g = {}, g[d] = f), k && (this._curInst === k && this._hideDatepicker(), 
            h = this._getDateDatepicker(c, !0), i = this._getMinMaxDate(k, "min"), j = this._getMinMaxDate(k, "max"), 
            e(k.settings, g), null !== i && g.dateFormat !== b && g.minDate === b && (k.settings.minDate = this._formatDate(k, i)), 
            null !== j && g.dateFormat !== b && g.maxDate === b && (k.settings.maxDate = this._formatDate(k, j)), 
            "disabled" in g && (g.disabled ? this._disableDatepicker(c) : this._enableDatepicker(c)), 
            this._attachments(a(c), k), this._autoSize(k), this._setDate(k, h), this._updateAlternate(k), 
            this._updateDatepicker(k)), b);
        },
        _changeDatepicker: function(a, b, c) {
            this._optionDatepicker(a, b, c);
        },
        _refreshDatepicker: function(a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b);
        },
        _setDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c));
        },
        _getDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null;
        },
        _doKeyDown: function(b) {
            var c, d, e, f = a.datepicker._getInst(b.target), g = !0, h = f.dpDiv.is(".ui-datepicker-rtl");
            if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
              case 9:
                a.datepicker._hideDatepicker(), g = !1;
                break;

              case 13:
                return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), 
                e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), 
                c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [ d, f ])) : a.datepicker._hideDatepicker(), 
                !1;

              case 27:
                a.datepicker._hideDatepicker();
                break;

              case 33:
                a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 34:
                a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 35:
                (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
                break;

              case 36:
                (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
                break;

              case 37:
                (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), 
                g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 38:
                (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
                break;

              case 39:
                (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), 
                g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 40:
                (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
                break;

              default:
                g = !1;
            } else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
            g && (b.preventDefault(), b.stopPropagation());
        },
        _doKeyPress: function(c) {
            var d, e, f = a.datepicker._getInst(c.target);
            return a.datepicker._get(f, "constrainInput") ? (d = a.datepicker._possibleChars(a.datepicker._get(f, "dateFormat")), 
            e = String.fromCharCode(null == c.charCode ? c.keyCode : c.charCode), c.ctrlKey || c.metaKey || " " > e || !d || d.indexOf(e) > -1) : b;
        },
        _doKeyUp: function(b) {
            var c, d = a.datepicker._getInst(b.target);
            if (d.input.val() !== d.lastVal) try {
                c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), 
                c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d));
            } catch (e) {}
            return !0;
        },
        _showDatepicker: function(b) {
            if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), 
            !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
                var c, d, f, g, h, i, j;
                c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), 
                c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), 
                d = a.datepicker._get(c, "beforeShow"), f = d ? d.apply(b, [ b, c ]) : {}, f !== !1 && (e(c.settings, f), 
                c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), 
                a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), 
                a.datepicker._pos[1] += b.offsetHeight), g = !1, a(b).parents().each(function() {
                    return g |= "fixed" === a(this).css("position"), !g;
                }), h = {
                    left: a.datepicker._pos[0],
                    top: a.datepicker._pos[1]
                }, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), a.datepicker._updateDatepicker(c), h = a.datepicker._checkOffset(c, h, g), c.dpDiv.css({
                    position: a.datepicker._inDialog && a.blockUI ? "static" : g ? "fixed" : "absolute",
                    display: "none",
                    left: h.left + "px",
                    top: h.top + "px"
                }), c.inline || (i = a.datepicker._get(c, "showAnim"), j = a.datepicker._get(c, "duration"), 
                c.dpDiv.zIndex(a(b).zIndex() + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[i] ? c.dpDiv.show(i, a.datepicker._get(c, "showOptions"), j) : c.dpDiv[i || "show"](i ? j : null), 
                a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c));
            }
        },
        _updateDatepicker: function(b) {
            this.maxRows = 4, f = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b), 
            b.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var c, d = this._getNumberOfMonths(b), e = d[1], g = 17;
            b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 
            e > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", g * e + "em"), 
            b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), 
            b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), 
            b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), 
            b.yearshtml && (c = b.yearshtml, setTimeout(function() {
                c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), 
                c = b.yearshtml = null;
            }, 0));
        },
        _shouldFocusInput: function(a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus");
        },
        _checkOffset: function(b, c, d) {
            var e = b.dpDiv.outerWidth(), f = b.dpDiv.outerHeight(), g = b.input ? b.input.outerWidth() : 0, h = b.input ? b.input.outerHeight() : 0, i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()), j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
            return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, 
            c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, 
            c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), 
            c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c;
        },
        _findPos: function(b) {
            for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b)); ) b = b[e ? "previousSibling" : "nextSibling"];
            return c = a(b).offset(), [ c.left, c.top ];
        },
        _hideDatepicker: function(b) {
            var c, d, e, f, h = this._curInst;
            !h || b && h !== a.data(b, g) || this._datepickerShowing && (c = this._get(h, "showAnim"), 
            d = this._get(h, "duration"), e = function() {
                a.datepicker._tidyDialog(h);
            }, a.effects && (a.effects.effect[c] || a.effects[c]) ? h.dpDiv.hide(c, a.datepicker._get(h, "showOptions"), d, e) : h.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e), 
            c || e(), this._datepickerShowing = !1, f = this._get(h, "onClose"), f && f.apply(h.input ? h.input[0] : null, [ h.input ? h.input.val() : "", h ]), 
            this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1);
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(b) {
            if (a.datepicker._curInst) {
                var c = a(b.target), d = a.datepicker._getInst(c[0]);
                (c[0].id !== a.datepicker._mainDivId && 0 === c.parents("#" + a.datepicker._mainDivId).length && !c.hasClass(a.datepicker.markerClassName) && !c.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || c.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== d) && a.datepicker._hideDatepicker();
            }
        },
        _adjustDate: function(b, c, d) {
            var e = a(b), f = this._getInst(e[0]);
            this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), 
            this._updateDatepicker(f));
        },
        _gotoToday: function(b) {
            var c, d = a(b), e = this._getInst(d[0]);
            this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, 
            e.drawYear = e.selectedYear = e.currentYear) : (c = new Date(), e.selectedDay = c.getDate(), 
            e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), 
            this._notifyChange(e), this._adjustDate(d);
        },
        _selectMonthYear: function(b, c, d) {
            var e = a(b), f = this._getInst(e[0]);
            f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), 
            this._notifyChange(f), this._adjustDate(e);
        },
        _selectDay: function(b, c, d, e) {
            var f, g = a(b);
            a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), 
            f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, 
            f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)));
        },
        _clearDate: function(b) {
            var c = a(b);
            this._selectDate(c, "");
        },
        _selectDate: function(b, c) {
            var d, e = a(b), f = this._getInst(e[0]);
            c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), 
            d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [ c, f ]) : f.input && f.input.trigger("change"), 
            f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], 
            "object" != typeof f.input[0] && f.input.focus(), this._lastInput = null);
        },
        _updateAlternate: function(b) {
            var c, d, e, f = this._get(b, "altField");
            f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), 
            e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function() {
                a(this).val(e);
            }));
        },
        noWeekends: function(a) {
            var b = a.getDay();
            return [ b > 0 && 6 > b, "" ];
        },
        iso8601Week: function(a) {
            var b, c = new Date(a.getTime());
            return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), 
            c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1;
        },
        parseDate: function(c, d, e) {
            if (null == c || null == d) throw "Invalid arguments";
            if (d = "object" == typeof d ? "" + d : d + "", "" === d) return null;
            var f, g, h, i, j = 0, k = (e ? e.shortYearCutoff : null) || this._defaults.shortYearCutoff, l = "string" != typeof k ? k : new Date().getFullYear() % 100 + parseInt(k, 10), m = (e ? e.dayNamesShort : null) || this._defaults.dayNamesShort, n = (e ? e.dayNames : null) || this._defaults.dayNames, o = (e ? e.monthNamesShort : null) || this._defaults.monthNamesShort, p = (e ? e.monthNames : null) || this._defaults.monthNames, q = -1, r = -1, s = -1, t = -1, u = !1, v = function(a) {
                var b = c.length > f + 1 && c.charAt(f + 1) === a;
                return b && f++, b;
            }, w = function(a) {
                var b = v(a), c = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2, e = RegExp("^\\d{1," + c + "}"), f = d.substring(j).match(e);
                if (!f) throw "Missing number at position " + j;
                return j += f[0].length, parseInt(f[0], 10);
            }, x = function(c, e, f) {
                var g = -1, h = a.map(v(c) ? f : e, function(a, b) {
                    return [ [ b, a ] ];
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length);
                });
                if (a.each(h, function(a, c) {
                    var e = c[1];
                    return d.substr(j, e.length).toLowerCase() === e.toLowerCase() ? (g = c[0], j += e.length, 
                    !1) : b;
                }), -1 !== g) return g + 1;
                throw "Unknown name at position " + j;
            }, y = function() {
                if (d.charAt(j) !== c.charAt(f)) throw "Unexpected literal at position " + j;
                j++;
            };
            for (f = 0; c.length > f; f++) if (u) "'" !== c.charAt(f) || v("'") ? y() : u = !1; else switch (c.charAt(f)) {
              case "d":
                s = w("d");
                break;

              case "D":
                x("D", m, n);
                break;

              case "o":
                t = w("o");
                break;

              case "m":
                r = w("m");
                break;

              case "M":
                r = x("M", o, p);
                break;

              case "y":
                q = w("y");
                break;

              case "@":
                i = new Date(w("@")), q = i.getFullYear(), r = i.getMonth() + 1, s = i.getDate();
                break;

              case "!":
                i = new Date((w("!") - this._ticksTo1970) / 1e4), q = i.getFullYear(), r = i.getMonth() + 1, 
                s = i.getDate();
                break;

              case "'":
                v("'") ? y() : u = !0;
                break;

              default:
                y();
            }
            if (d.length > j && (h = d.substr(j), !/^\s+/.test(h))) throw "Extra/unparsed characters found in date: " + h;
            if (-1 === q ? q = new Date().getFullYear() : 100 > q && (q += new Date().getFullYear() - new Date().getFullYear() % 100 + (l >= q ? 0 : -100)), 
            t > -1) for (r = 1, s = t; g = this._getDaysInMonth(q, r - 1), !(g >= s); ) r++, 
            s -= g;
            if (i = this._daylightSavingAdjust(new Date(q, r - 1, s)), i.getFullYear() !== q || i.getMonth() + 1 !== r || i.getDate() !== s) throw "Invalid date";
            return i;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(a, b, c) {
            if (!b) return "";
            var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = function(b) {
                var c = a.length > d + 1 && a.charAt(d + 1) === b;
                return c && d++, c;
            }, j = function(a, b, c) {
                var d = "" + b;
                if (i(a)) for (;c > d.length; ) d = "0" + d;
                return d;
            }, k = function(a, b, c, d) {
                return i(a) ? d[b] : c[b];
            }, l = "", m = !1;
            if (b) for (d = 0; a.length > d; d++) if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1; else switch (a.charAt(d)) {
              case "d":
                l += j("d", b.getDate(), 2);
                break;

              case "D":
                l += k("D", b.getDay(), e, f);
                break;

              case "o":
                l += j("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;

              case "m":
                l += j("m", b.getMonth() + 1, 2);
                break;

              case "M":
                l += k("M", b.getMonth(), g, h);
                break;

              case "y":
                l += i("y") ? b.getFullYear() : (10 > b.getYear() % 100 ? "0" : "") + b.getYear() % 100;
                break;

              case "@":
                l += b.getTime();
                break;

              case "!":
                l += 1e4 * b.getTime() + this._ticksTo1970;
                break;

              case "'":
                i("'") ? l += "'" : m = !0;
                break;

              default:
                l += a.charAt(d);
            }
            return l;
        },
        _possibleChars: function(a) {
            var b, c = "", d = !1, e = function(c) {
                var d = a.length > b + 1 && a.charAt(b + 1) === c;
                return d && b++, d;
            };
            for (b = 0; a.length > b; b++) if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1; else switch (a.charAt(b)) {
              case "d":
              case "m":
              case "y":
              case "@":
                c += "0123456789";
                break;

              case "D":
              case "M":
                return null;

              case "'":
                e("'") ? c += "'" : d = !0;
                break;

              default:
                c += a.charAt(b);
            }
            return c;
        },
        _get: function(a, c) {
            return a.settings[c] !== b ? a.settings[c] : this._defaults[c];
        },
        _setDateFromField: function(a, b) {
            if (a.input.val() !== a.lastVal) {
                var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e = this._getDefaultDate(a), f = e, g = this._getFormatConfig(a);
                try {
                    f = this.parseDate(c, d, g) || e;
                } catch (h) {
                    d = b ? "" : d;
                }
                a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), 
                a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, 
                this._adjustInstDate(a);
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date()));
        },
        _determineDate: function(b, c, d) {
            var e = function(a) {
                var b = new Date();
                return b.setDate(b.getDate() + a), b;
            }, f = function(c) {
                try {
                    return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b));
                } catch (d) {}
                for (var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date(), f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c); j; ) {
                    switch (j[2] || "d") {
                      case "d":
                      case "D":
                        h += parseInt(j[1], 10);
                        break;

                      case "w":
                      case "W":
                        h += 7 * parseInt(j[1], 10);
                        break;

                      case "m":
                      case "M":
                        g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                        break;

                      case "y":
                      case "Y":
                        f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                    }
                    j = i.exec(c);
                }
                return new Date(f, g, h);
            }, g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
            return g = g && "Invalid Date" == "" + g ? d : g, g && (g.setHours(0), g.setMinutes(0), 
            g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g);
        },
        _daylightSavingAdjust: function(a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null;
        },
        _setDate: function(a, b, c) {
            var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date()));
            a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), 
            a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), 
            this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a));
        },
        _getDate: function(a) {
            var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return b;
        },
        _attachHandlers: function(b) {
            var c = this._get(b, "stepMonths"), d = "#" + b.id.replace(/\\\\/g, "\\");
            b.dpDiv.find("[data-handler]").map(function() {
                var b = {
                    prev: function() {
                        a.datepicker._adjustDate(d, -c, "M");
                    },
                    next: function() {
                        a.datepicker._adjustDate(d, +c, "M");
                    },
                    hide: function() {
                        a.datepicker._hideDatepicker();
                    },
                    today: function() {
                        a.datepicker._gotoToday(d);
                    },
                    selectDay: function() {
                        return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), 
                        !1;
                    },
                    selectMonth: function() {
                        return a.datepicker._selectMonthYear(d, this, "M"), !1;
                    },
                    selectYear: function() {
                        return a.datepicker._selectMonthYear(d, this, "Y"), !1;
                    }
                };
                a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")]);
            });
        },
        _generateHTML: function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date(), P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())), Q = this._get(a, "isRTL"), R = this._get(a, "showButtonPanel"), S = this._get(a, "hideIfNoPrevNext"), T = this._get(a, "navigationAsDateFormat"), U = this._getNumberOfMonths(a), V = this._get(a, "showCurrentAtPos"), W = this._get(a, "stepMonths"), X = 1 !== U[0] || 1 !== U[1], Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), Z = this._getMinMaxDate(a, "min"), $ = this._getMinMaxDate(a, "max"), _ = a.drawMonth - V, ab = a.drawYear;
            if (0 > _ && (_ += 12, ab--), $) for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), 
            b = Z && Z > b ? Z : b; this._daylightSavingAdjust(new Date(ab, _, 1)) > b; ) _--, 
            0 > _ && (_ = 11, ab--);
            for (a.drawMonth = _, a.drawYear = ab, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(ab, _ - W, 1)), this._getFormatConfig(a)) : c, 
            d = this._canAdjustMonth(a, -1, ab, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", 
            e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(ab, _ + W, 1)), this._getFormatConfig(a)) : e, 
            f = this._canAdjustMonth(a, 1, ab, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", 
            g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, 
            g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", 
            j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", 
            k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), 
            m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), 
            p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), 
            s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; U[0] > w; w++) {
                for (x = "", this.maxRows = 4, y = 0; U[1] > y; y++) {
                    if (z = this._daylightSavingAdjust(new Date(ab, _, a.selectedDay)), A = " ui-corner-all", 
                    B = "", X) {
                        if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
                          case 0:
                            B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
                            break;

                          case U[1] - 1:
                            B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
                            break;

                          default:
                            B += " ui-datepicker-group-middle", A = "";
                        }
                        B += "'>";
                    }
                    for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, ab, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>", 
                    C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", 
                    v = 0; 7 > v; v++) D = (v + k) % 7, C += "<th" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + m[D] + "'>" + n[D] + "</span></th>";
                    for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(ab, _), ab === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), 
                    F = (this._getFirstDayOfMonth(ab, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X && this.maxRows > G ? this.maxRows : G, 
                    this.maxRows = H, I = this._daylightSavingAdjust(new Date(ab, _, 1 - F)), J = 0; H > J; J++) {
                        for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", 
                        v = 0; 7 > v; v++) L = q ? q.apply(a.input ? a.input[0] : null, [ I ]) : [ !0, "" ], 
                        M = I.getMonth() !== _, N = M && !s || !L[0] || Z && Z > I || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", 
                        I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
                        B += K + "</tr>";
                    }
                    _++, _ > 11 && (_ = 0, ab++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), 
                    x += B;
                }
                u += x;
            }
            return u += j, a._keyEvent = !1, u;
        },
        _generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"), r = this._get(a, "changeYear"), s = this._get(a, "showMonthAfterYear"), t = "<div class='ui-datepicker-title'>", u = "";
            if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>"; else {
                for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", 
                k = 0; 12 > k; k++) (!i || k >= d.getMonth()) && (!j || e.getMonth() >= k) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                u += "</select>";
            }
            if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml) if (a.yearshtml = "", 
            f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>"; else {
                for (l = this._get(a, "yearRange").split(":"), m = new Date().getFullYear(), n = function(a) {
                    var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                    return isNaN(b) ? m : b;
                }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, 
                p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p >= o; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null;
            }
            return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), 
            t += "</div>";
        },
        _adjustInstDate: function(a, b, c) {
            var d = a.drawYear + ("Y" === c ? b : 0), e = a.drawMonth + ("M" === c ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
            a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), 
            ("M" === c || "Y" === c) && this._notifyChange(a);
        },
        _restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && c > b ? c : b;
            return d && e > d ? d : e;
        },
        _notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [ a.selectedYear, a.selectedMonth + 1, a ]);
        },
        _getNumberOfMonths: function(a) {
            var b = this._get(a, "numberOfMonths");
            return null == b ? [ 1, 1 ] : "number" == typeof b ? [ 1, b ] : b;
        },
        _getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null);
        },
        _getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate();
        },
        _getFirstDayOfMonth: function(a, b) {
            return new Date(a, b, 1).getDay();
        },
        _canAdjustMonth: function(a, b, c, d) {
            var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : e[0] * e[1]), 1));
            return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), 
            this._isInRange(a, f);
        },
        _isInRange: function(a, b) {
            var c, d, e = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max"), g = null, h = null, i = this._get(a, "yearRange");
            return i && (c = i.split(":"), d = new Date().getFullYear(), g = parseInt(c[0], 10), 
            h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), 
            (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || h >= b.getFullYear());
        },
        _getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            return b = "string" != typeof b ? b : new Date().getFullYear() % 100 + parseInt(b, 10), 
            {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            };
        },
        _formatDate: function(a, b, c, d) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a));
        }
    }), a.fn.datepicker = function(b) {
        if (!this.length) return this;
        a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), 
        a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
        var c = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [ this[0] ].concat(c)) : this.each(function() {
            "string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [ this ].concat(c)) : a.datepicker._attachDatepicker(this, b);
        }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [ this[0] ].concat(c));
    }, a.datepicker = new c(), a.datepicker.initialized = !1, a.datepicker.uuid = new Date().getTime(), 
    a.datepicker.version = "1.10.3";
}(jQuery), function(a) {
    var b = {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0
    }, c = {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0
    };
    a.widget("ui.dialog", {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(b) {
                    var c = a(this).css(b).offset().top;
                    0 > c && a(this).css("top", b.top - c);
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, 
            this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), 
            this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), 
            this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1;
        },
        _init: function() {
            this.options.autoOpen && this.open();
        },
        _appendTo: function() {
            var b = this.options.appendTo;
            return b && (b.jquery || b.nodeType) ? a(b) : this.document.find(b || "body").eq(0);
        },
        _destroy: function() {
            var a, b = this.originalPosition;
            this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), 
            this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), 
            a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element);
        },
        widget: function() {
            return this.uiDialog;
        },
        disable: a.noop,
        enable: a.noop,
        close: function(b) {
            var c = this;
            this._isOpen && this._trigger("beforeClose", b) !== !1 && (this._isOpen = !1, this._destroyOverlay(), 
            this.opener.filter(":focusable").focus().length || a(this.document[0].activeElement).blur(), 
            this._hide(this.uiDialog, this.options.hide, function() {
                c._trigger("close", b);
            }));
        },
        isOpen: function() {
            return this._isOpen;
        },
        moveToTop: function() {
            this._moveToTop();
        },
        _moveToTop: function(a, b) {
            var c = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return c && !b && this._trigger("focus", a), c;
        },
        open: function() {
            var b = this;
            return this._isOpen ? void (this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, 
            this.opener = a(this.document[0].activeElement), this._size(), this._position(), 
            this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                b._focusTabbable(), b._trigger("focus");
            }), void this._trigger("open"));
        },
        _focusTabbable: function() {
            var a = this.element.find("[autofocus]");
            a.length || (a = this.element.find(":tabbable")), a.length || (a = this.uiDialogButtonPane.find(":tabbable")), 
            a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")), a.length || (a = this.uiDialog), 
            a.eq(0).focus();
        },
        _keepFocus: function(b) {
            function c() {
                var b = this.document[0].activeElement, c = this.uiDialog[0] === b || a.contains(this.uiDialog[0], b);
                c || this._focusTabbable();
            }
            b.preventDefault(), c.call(this), this._delay(c);
        },
        _createWrapper: function() {
            this.uiDialog = a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function(b) {
                    if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) return b.preventDefault(), 
                    void this.close(b);
                    if (b.keyCode === a.ui.keyCode.TAB) {
                        var c = this.uiDialog.find(":tabbable"), d = c.filter(":first"), e = c.filter(":last");
                        b.target !== e[0] && b.target !== this.uiDialog[0] || b.shiftKey ? b.target !== d[0] && b.target !== this.uiDialog[0] || !b.shiftKey || (e.focus(1), 
                        b.preventDefault()) : (d.focus(1), b.preventDefault());
                    }
                },
                mousedown: function(a) {
                    this._moveToTop(a) && this._focusTabbable();
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            });
        },
        _createTitlebar: function() {
            var b;
            this.uiDialogTitlebar = a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), 
            this._on(this.uiDialogTitlebar, {
                mousedown: function(b) {
                    a(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus();
                }
            }), this.uiDialogTitlebarClose = a("<button></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function(a) {
                    a.preventDefault(), this.close(a);
                }
            }), b = a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), 
            this._title(b), this.uiDialog.attr({
                "aria-labelledby": b.attr("id")
            });
        },
        _title: function(a) {
            this.options.title || a.html("&#160;"), a.text(this.options.title);
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), 
            this.uiButtonSet = a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), 
            this._createButtons();
        },
        _createButtons: function() {
            var b = this, c = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(c) || a.isArray(c) && !c.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (a.each(c, function(c, d) {
                var e, f;
                d = a.isFunction(d) ? {
                    click: d,
                    text: c
                } : d, d = a.extend({
                    type: "button"
                }, d), e = d.click, d.click = function() {
                    e.apply(b.element[0], arguments);
                }, f = {
                    icons: d.icons,
                    text: d.showText
                }, delete d.icons, delete d.showText, a("<button></button>", d).button(f).appendTo(b.uiButtonSet);
            }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog));
        },
        _makeDraggable: function() {
            function b(a) {
                return {
                    position: a.position,
                    offset: a.offset
                };
            }
            var c = this, d = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(d, e) {
                    a(this).addClass("ui-dialog-dragging"), c._blockFrames(), c._trigger("dragStart", d, b(e));
                },
                drag: function(a, d) {
                    c._trigger("drag", a, b(d));
                },
                stop: function(e, f) {
                    d.position = [ f.position.left - c.document.scrollLeft(), f.position.top - c.document.scrollTop() ], 
                    a(this).removeClass("ui-dialog-dragging"), c._unblockFrames(), c._trigger("dragStop", e, b(f));
                }
            });
        },
        _makeResizable: function() {
            function b(a) {
                return {
                    originalPosition: a.originalPosition,
                    originalSize: a.originalSize,
                    position: a.position,
                    size: a.size
                };
            }
            var c = this, d = this.options, e = d.resizable, f = this.uiDialog.css("position"), g = "string" == typeof e ? e : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: d.maxWidth,
                maxHeight: d.maxHeight,
                minWidth: d.minWidth,
                minHeight: this._minHeight(),
                handles: g,
                start: function(d, e) {
                    a(this).addClass("ui-dialog-resizing"), c._blockFrames(), c._trigger("resizeStart", d, b(e));
                },
                resize: function(a, d) {
                    c._trigger("resize", a, b(d));
                },
                stop: function(e, f) {
                    d.height = a(this).height(), d.width = a(this).width(), a(this).removeClass("ui-dialog-resizing"), 
                    c._unblockFrames(), c._trigger("resizeStop", e, b(f));
                }
            }).css("position", f);
        },
        _minHeight: function() {
            var a = this.options;
            return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height);
        },
        _position: function() {
            var a = this.uiDialog.is(":visible");
            a || this.uiDialog.show(), this.uiDialog.position(this.options.position), a || this.uiDialog.hide();
        },
        _setOptions: function(d) {
            var e = this, f = !1, g = {};
            a.each(d, function(a, d) {
                e._setOption(a, d), a in b && (f = !0), a in c && (g[a] = d);
            }), f && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", g);
        },
        _setOption: function(a, b) {
            var c, d, e = this.uiDialog;
            "dialogClass" === a && e.removeClass(this.options.dialogClass).addClass(b), "disabled" !== a && (this._super(a, b), 
            "appendTo" === a && this.uiDialog.appendTo(this._appendTo()), "buttons" === a && this._createButtons(), 
            "closeText" === a && this.uiDialogTitlebarClose.button({
                label: "" + b
            }), "draggable" === a && (c = e.is(":data(ui-draggable)"), c && !b && e.draggable("destroy"), 
            !c && b && this._makeDraggable()), "position" === a && this._position(), "resizable" === a && (d = e.is(":data(ui-resizable)"), 
            d && !b && e.resizable("destroy"), d && "string" == typeof b && e.resizable("option", "handles", b), 
            d || b === !1 || this._makeResizable()), "title" === a && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
        },
        _size: function() {
            var a, b, c, d = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), d.minWidth > d.width && (d.width = d.minWidth), a = this.uiDialog.css({
                height: "auto",
                width: d.width
            }).outerHeight(), b = Math.max(0, d.minHeight - a), c = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - a) : "none", 
            "auto" === d.height ? this.element.css({
                minHeight: b,
                maxHeight: c,
                height: "auto"
            }) : this.element.height(Math.max(0, d.height - a)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var b = a(this);
                return a("<div>").css({
                    position: "absolute",
                    width: b.outerWidth(),
                    height: b.outerHeight()
                }).appendTo(b.parent()).offset(b.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _allowInteraction: function(b) {
            return a(b.target).closest(".ui-dialog").length ? !0 : !!a(b.target).closest(".ui-datepicker").length;
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var b = this, c = this.widgetFullName;
                a.ui.dialog.overlayInstances || this._delay(function() {
                    a.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(d) {
                        b._allowInteraction(d) || (d.preventDefault(), a(".ui-dialog:visible:last .ui-dialog-content").data(c)._focusTabbable());
                    });
                }), this.overlay = a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), 
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), a.ui.dialog.overlayInstances++;
            }
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && (a.ui.dialog.overlayInstances--, a.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), 
            this.overlay.remove(), this.overlay = null);
        }
    }), a.ui.dialog.overlayInstances = 0, a.uiBackCompat !== !1 && a.widget("ui.dialog", a.ui.dialog, {
        _position: function() {
            var b, c = this.options.position, d = [], e = [ 0, 0 ];
            c ? (("string" == typeof c || "object" == typeof c && "0" in c) && (d = c.split ? c.split(" ") : [ c[0], c[1] ], 
            1 === d.length && (d[1] = d[0]), a.each([ "left", "top" ], function(a, b) {
                +d[a] === d[a] && (e[a] = d[a], d[a] = b);
            }), c = {
                my: d[0] + (0 > e[0] ? e[0] : "+" + e[0]) + " " + d[1] + (0 > e[1] ? e[1] : "+" + e[1]),
                at: d.join(" ")
            }), c = a.extend({}, a.ui.dialog.prototype.options.position, c)) : c = a.ui.dialog.prototype.options.position, 
            b = this.uiDialog.is(":visible"), b || this.uiDialog.show(), this.uiDialog.position(c), 
            b || this.uiDialog.hide();
        }
    });
}(jQuery), function(a) {
    a.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function(a) {
                this.options.disabled && a.preventDefault();
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), 
            this._on({
                "mousedown .ui-menu-item > a": function(a) {
                    a.preventDefault();
                },
                "click .ui-state-disabled > a": function(a) {
                    a.preventDefault();
                },
                "click .ui-menu-item:has(a)": function(b) {
                    var c = a(b.target).closest(".ui-menu-item");
                    !this.mouseHandled && c.not(".ui-state-disabled").length && (this.mouseHandled = !0, 
                    this.select(b), c.has(".ui-menu").length ? this.expand(b) : this.element.is(":focus") || (this.element.trigger("focus", [ !0 ]), 
                    this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                },
                "mouseenter .ui-menu-item": function(b) {
                    var c = a(b.currentTarget);
                    c.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c);
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(a, b) {
                    var c = this.active || this.element.children(".ui-menu-item").eq(0);
                    b || this.focus(a, c);
                },
                blur: function(b) {
                    this._delay(function() {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b);
                    });
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(b) {
                    a(b.target).closest(".ui-menu").length || this.collapseAll(b), this.mouseHandled = !1;
                }
            });
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), 
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var b = a(this);
                b.data("ui-menu-submenu-carat") && b.remove();
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
        },
        _keydown: function(b) {
            function c(a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }
            var d, e, f, g, h, i = !0;
            switch (b.keyCode) {
              case a.ui.keyCode.PAGE_UP:
                this.previousPage(b);
                break;

              case a.ui.keyCode.PAGE_DOWN:
                this.nextPage(b);
                break;

              case a.ui.keyCode.HOME:
                this._move("first", "first", b);
                break;

              case a.ui.keyCode.END:
                this._move("last", "last", b);
                break;

              case a.ui.keyCode.UP:
                this.previous(b);
                break;

              case a.ui.keyCode.DOWN:
                this.next(b);
                break;

              case a.ui.keyCode.LEFT:
                this.collapse(b);
                break;

              case a.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                break;

              case a.ui.keyCode.ENTER:
              case a.ui.keyCode.SPACE:
                this._activate(b);
                break;

              case a.ui.keyCode.ESCAPE:
                this.collapse(b);
                break;

              default:
                i = !1, e = this.previousFilter || "", f = String.fromCharCode(b.keyCode), g = !1, 
                clearTimeout(this.filterTimer), f === e ? g = !0 : f = e + f, h = RegExp("^" + c(f), "i"), 
                d = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return h.test(a(this).children("a").text());
                }), d = g && -1 !== d.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : d, 
                d.length || (f = String.fromCharCode(b.keyCode), h = RegExp("^" + c(f), "i"), d = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return h.test(a(this).children("a").text());
                })), d.length ? (this.focus(b, d), d.length > 1 ? (this.previousFilter = f, this.filterTimer = this._delay(function() {
                    delete this.previousFilter;
                }, 1e3)) : delete this.previousFilter) : delete this.previousFilter;
            }
            i && b.preventDefault();
        },
        _activate: function(a) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(a) : this.select(a));
        },
        refresh: function() {
            var b, c = this.options.icons.submenu, d = this.element.find(this.options.menus);
            d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var b = a(this), d = b.prev("a"), e = a("<span>").addClass("ui-menu-icon ui-icon " + c).data("ui-menu-submenu-carat", !0);
                d.attr("aria-haspopup", "true").prepend(e), b.attr("aria-labelledby", d.attr("id"));
            }), b = d.add(this.element), b.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), b.children(":not(.ui-menu-item)").each(function() {
                var b = a(this);
                /[^\-\u2014\u2013\s]/.test(b.text()) || b.addClass("ui-widget-content ui-menu-divider");
            }), b.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur();
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role];
        },
        _setOption: function(a, b) {
            "icons" === a && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu), 
            this._super(a, b);
        },
        focus: function(a, b) {
            var c, d;
            this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), 
            d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), 
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), 
            a && "keydown" === a.type ? this._close() : this.timer = this._delay(function() {
                this._close();
            }, this.delay), c = b.children(".ui-menu"), c.length && /^mouse/.test(a.type) && this._startOpening(c), 
            this.activeMenu = b.parent(), this._trigger("focus", a, {
                item: b
            });
        },
        _scrollIntoView: function(b) {
            var c, d, e, f, g, h;
            this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, 
            d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, 
            f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.height(), 0 > e ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h));
        },
        blur: function(a, b) {
            b || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), 
            this.active = null, this._trigger("blur", a, {
                item: this.active
            }));
        },
        _startOpening: function(a) {
            clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(a);
            }, this.delay));
        },
        _open: function(b) {
            var c = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), 
            b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c);
        },
        collapseAll: function(b, c) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d;
            }, this.delay);
        },
        _close: function(a) {
            a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active");
        },
        collapse: function(a) {
            var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            b && b.length && (this._close(), this.focus(a, b));
        },
        expand: function(a) {
            var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            b && b.length && (this._open(b.parent()), this._delay(function() {
                this.focus(a, b);
            }));
        },
        next: function(a) {
            this._move("next", "first", a);
        },
        previous: function(a) {
            this._move("prev", "last", a);
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function(a, b, c) {
            var d;
            this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), 
            d && d.length && this.active || (d = this.activeMenu.children(".ui-menu-item")[b]()), 
            this.focus(c, d);
        },
        nextPage: function(b) {
            var c, d, e;
            return this.active ? void (this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, 
            e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return c = a(this), 0 > c.offset().top - d - e;
            }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]()))) : void this.next(b);
        },
        previousPage: function(b) {
            var c, d, e;
            return this.active ? void (this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, 
            e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return c = a(this), c.offset().top - d + e > 0;
            }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item").first()))) : void this.next(b);
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function(b) {
            this.active = this.active || a(b.target).closest(".ui-menu-item");
            var c = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c);
        }
    });
}(jQuery), function(a, b) {
    a.widget("ui.progressbar", {
        version: "1.10.3",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), 
            this._refreshValue();
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), 
            this.valueDiv.remove();
        },
        value: function(a) {
            return a === b ? this.options.value : (this.options.value = this._constrainedValue(a), 
            this._refreshValue(), b);
        },
        _constrainedValue: function(a) {
            return a === b && (a = this.options.value), this.indeterminate = a === !1, "number" != typeof a && (a = 0), 
            this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, a));
        },
        _setOptions: function(a) {
            var b = a.value;
            delete a.value, this._super(a), this.options.value = this._constrainedValue(b), 
            this._refreshValue();
        },
        _setOption: function(a, b) {
            "max" === a && (b = Math.max(this.min, b)), this._super(a, b);
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
        },
        _refreshValue: function() {
            var b = this.options.value, c = this._percentage();
            this.valueDiv.toggle(this.indeterminate || b > this.min).toggleClass("ui-corner-right", b === this.options.max).width(c.toFixed(0) + "%"), 
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), 
            this.overlayDiv || (this.overlayDiv = a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": b
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== b && (this.oldValue = b, 
            this._trigger("change")), b === this.options.max && this._trigger("complete");
        }
    });
}(jQuery), function(a) {
    var b = 5;
    a.widget("ui.slider", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, 
            this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), 
            this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1;
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
        },
        _createHandles: function() {
            var b, c, d = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", g = [];
            for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), 
            e = e.slice(0, c)), b = e.length; c > b; b++) g.push(f);
            this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), 
            this.handles.each(function(b) {
                a(this).data("ui-slider-handle-index", b);
            });
        },
        _createRange: function() {
            var b = this.options, c = "";
            b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [ b.values[0], b.values[0] ] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [ this._valueMin(), this._valueMin() ]), 
            this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), 
            this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : this.range = a([]);
        },
        _setupEvents: function() {
            var a = this.handles.add(this.range).filter("a");
            this._off(a), this._on(a, this._handleEvents), this._hoverable(a), this._focusable(a);
        },
        _destroy: function() {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), 
            this._mouseDestroy();
        },
        _mouseCapture: function(b) {
            var c, d, e, f, g, h, i, j, k = this, l = this.options;
            return l.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), c = {
                x: b.pageX,
                y: b.pageY
            }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, 
            this.handles.each(function(b) {
                var c = Math.abs(d - k.values(b));
                (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, 
                f = a(this), g = b);
            }), h = this._start(b, g), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = g, 
            f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), 
            this._clickOffset = j ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - i.left - f.width() / 2,
                top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, 
            !0));
        },
        _mouseStart: function() {
            return !0;
        },
        _mouseDrag: function(a) {
            var b = {
                x: a.pageX,
                y: a.pageY
            }, c = this._normValueFromMouse(b);
            return this._slide(a, this._handleIndex, c), !1;
        },
        _mouseStop: function(a) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), 
            this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, 
            this._animateOff = !1, !1;
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(a) {
            var b, c, d, e, f;
            return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, 
            c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), 
            d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), 
            e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f);
        },
        _start: function(a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (c.value = this.values(b), 
            c.values = this.values()), this._trigger("start", a, c);
        },
        _slide: function(a, b, c) {
            var d, e, f;
            this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 
            2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), 
            c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c,
                values: e
            }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c
            }), f !== !1 && this.value(c));
        },
        _stop: function(a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            this.options.values && this.options.values.length && (c.value = this.values(b), 
            c.values = this.values()), this._trigger("stop", a, c);
        },
        _change: function(a, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(b), 
                c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c);
            }
        },
        value: function(a) {
            return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), 
            void this._change(null, 0)) : this._value();
        },
        values: function(b, c) {
            var d, e, f;
            if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), 
            this._refreshValue(), void this._change(null, b);
            if (!arguments.length) return this._values();
            if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
            for (d = this.options.values, e = arguments[0], f = 0; d.length > f; f += 1) d[f] = this._trimAlignValue(e[f]), 
            this._change(null, f);
            this._refreshValue();
        },
        _setOption: function(b, c) {
            var d, e = 0;
            switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), 
            this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), 
            this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), 
            a.Widget.prototype._setOption.apply(this, arguments), b) {
              case "orientation":
                this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), 
                this._refreshValue();
                break;

              case "value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;

              case "values":
                for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) this._change(null, d);
                this._animateOff = !1;
                break;

              case "min":
              case "max":
                this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                break;

              case "range":
                this._animateOff = !0, this._refresh(), this._animateOff = !1;
            }
        },
        _value: function() {
            var a = this.options.value;
            return a = this._trimAlignValue(a);
        },
        _values: function(a) {
            var b, c, d;
            if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
            if (this.options.values && this.options.values.length) {
                for (c = this.options.values.slice(), d = 0; c.length > d; d += 1) c[d] = this._trimAlignValue(c[d]);
                return c;
            }
            return [];
        },
        _trimAlignValue: function(a) {
            if (this._valueMin() >= a) return this._valueMin();
            if (a >= this._valueMax()) return this._valueMax();
            var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
            return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5));
        },
        _valueMin: function() {
            return this.options.min;
        },
        _valueMax: function() {
            return this.options.max;
        },
        _refreshValue: function() {
            var b, c, d, e, f, g = this.options.range, h = this.options, i = this, j = this._animateOff ? !1 : h.animate, k = {};
            this.options.values && this.options.values.length ? this.handles.each(function(d) {
                c = 100 * ((i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin())), k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", 
                a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
                    left: c + "%"
                }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
                    width: c - b + "%"
                }, {
                    queue: !1,
                    duration: h.animate
                })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
                    bottom: c + "%"
                }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
                    height: c - b + "%"
                }, {
                    queue: !1,
                    duration: h.animate
                }))), b = c;
            }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? 100 * ((d - e) / (f - e)) : 0, 
            k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), 
            "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
                width: c + "%"
            }, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({
                width: 100 - c + "%"
            }, {
                queue: !1,
                duration: h.animate
            }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
                height: c + "%"
            }, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({
                height: 100 - c + "%"
            }, {
                queue: !1,
                duration: h.animate
            }));
        },
        _handleEvents: {
            keydown: function(c) {
                var d, e, f, g, h = a(c.target).data("ui-slider-handle-index");
                switch (c.keyCode) {
                  case a.ui.keyCode.HOME:
                  case a.ui.keyCode.END:
                  case a.ui.keyCode.PAGE_UP:
                  case a.ui.keyCode.PAGE_DOWN:
                  case a.ui.keyCode.UP:
                  case a.ui.keyCode.RIGHT:
                  case a.ui.keyCode.DOWN:
                  case a.ui.keyCode.LEFT:
                    if (c.preventDefault(), !this._keySliding && (this._keySliding = !0, a(c.target).addClass("ui-state-active"), 
                    d = this._start(c, h), d === !1)) return;
                }
                switch (g = this.options.step, e = f = this.options.values && this.options.values.length ? this.values(h) : this.value(), 
                c.keyCode) {
                  case a.ui.keyCode.HOME:
                    f = this._valueMin();
                    break;

                  case a.ui.keyCode.END:
                    f = this._valueMax();
                    break;

                  case a.ui.keyCode.PAGE_UP:
                    f = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / b);
                    break;

                  case a.ui.keyCode.PAGE_DOWN:
                    f = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / b);
                    break;

                  case a.ui.keyCode.UP:
                  case a.ui.keyCode.RIGHT:
                    if (e === this._valueMax()) return;
                    f = this._trimAlignValue(e + g);
                    break;

                  case a.ui.keyCode.DOWN:
                  case a.ui.keyCode.LEFT:
                    if (e === this._valueMin()) return;
                    f = this._trimAlignValue(e - g);
                }
                this._slide(c, h, f);
            },
            click: function(a) {
                a.preventDefault();
            },
            keyup: function(b) {
                var c = a(b.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), 
                a(b.target).removeClass("ui-state-active"));
            }
        }
    });
}(jQuery), function(a) {
    function b(a) {
        return function() {
            var b = this.element.val();
            a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change");
        };
    }
    a.widget("ui.spinner", {
        version: "1.10.3",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), 
            this._setOption("step", this.options.step), this._value(this.element.val(), !0), 
            this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _getCreateOptions: function() {
            var b = {}, c = this.element;
            return a.each([ "min", "max", "step" ], function(a, d) {
                var e = c.attr(d);
                void 0 !== e && e.length && (b[d] = e);
            }), b;
        },
        _events: {
            keydown: function(a) {
                this._start(a) && this._keydown(a) && a.preventDefault();
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val();
            },
            blur: function(a) {
                return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), 
                void (this.previous !== this.element.val() && this._trigger("change", a)));
            },
            mousewheel: function(a, b) {
                if (b) {
                    if (!this.spinning && !this._start(a)) return !1;
                    this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), 
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(a);
                    }, 100), a.preventDefault();
                }
            },
            "mousedown .ui-spinner-button": function(b) {
                function c() {
                    var a = this.element[0] === this.document[0].activeElement;
                    a || (this.element.focus(), this.previous = d, this._delay(function() {
                        this.previous = d;
                    }));
                }
                var d;
                d = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), 
                b.preventDefault(), c.call(this), this.cancelBlur = !0, this._delay(function() {
                    delete this.cancelBlur, c.call(this);
                }), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b);
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(b) {
                return a(b.currentTarget).hasClass("ui-state-active") ? this._start(b) === !1 ? !1 : void this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b) : void 0;
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), 
            this.buttons.height() > Math.ceil(.5 * a.height()) && a.height() > 0 && a.height(a.height()), 
            this.options.disabled && this.disable();
        },
        _keydown: function(b) {
            var c = this.options, d = a.ui.keyCode;
            switch (b.keyCode) {
              case d.UP:
                return this._repeat(null, 1, b), !0;

              case d.DOWN:
                return this._repeat(null, -1, b), !0;

              case d.PAGE_UP:
                return this._repeat(null, c.page, b), !0;

              case d.PAGE_DOWN:
                return this._repeat(null, -c.page, b), !0;
            }
            return !1;
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>";
        },
        _start: function(a) {
            return this.spinning || this._trigger("start", a) !== !1 ? (this.counter || (this.counter = 1), 
            this.spinning = !0, !0) : !1;
        },
        _repeat: function(a, b, c) {
            a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                this._repeat(40, b, c);
            }, a), this._spin(b * this.options.step, c);
        },
        _spin: function(a, b) {
            var c = this.value() || 0;
            this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), 
            this.spinning && this._trigger("spin", b, {
                value: c
            }) === !1 || (this._value(c), this.counter++);
        },
        _increment: function(b) {
            var c = this.options.incremental;
            return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1) : 1;
        },
        _precision: function() {
            var a = this._precisionOf(this.options.step);
            return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), 
            a;
        },
        _precisionOf: function(a) {
            var b = "" + a, c = b.indexOf(".");
            return -1 === c ? 0 : b.length - c - 1;
        },
        _adjustValue: function(a) {
            var b, c, d = this.options;
            return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, 
            a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && d.min > a ? d.min : a;
        },
        _stop: function(a) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), 
            this.counter = 0, this.spinning = !1, this._trigger("stop", a));
        },
        _setOption: function(a, b) {
            if ("culture" === a || "numberFormat" === a) {
                var c = this._parse(this.element.val());
                return this.options[a] = b, void this.element.val(this._format(c));
            }
            ("max" === a || "min" === a || "step" === a) && "string" == typeof b && (b = this._parse(b)), 
            "icons" === a && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(b.up), 
            this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(b.down)), 
            this._super(a, b), "disabled" === a && (b ? (this.element.prop("disabled", !0), 
            this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")));
        },
        _setOptions: b(function(a) {
            this._super(a), this._value(this.element.val());
        }),
        _parse: function(a) {
            return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), 
            "" === a || isNaN(a) ? null : a;
        },
        _format: function(a) {
            return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a;
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            });
        },
        _value: function(a, b) {
            var c;
            "" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), 
            a = this._format(c))), this.element.val(a), this._refresh();
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), 
            this.uiSpinner.replaceWith(this.element);
        },
        stepUp: b(function(a) {
            this._stepUp(a);
        }),
        _stepUp: function(a) {
            this._start() && (this._spin((a || 1) * this.options.step), this._stop());
        },
        stepDown: b(function(a) {
            this._stepDown(a);
        }),
        _stepDown: function(a) {
            this._start() && (this._spin((a || 1) * -this.options.step), this._stop());
        },
        pageUp: b(function(a) {
            this._stepUp((a || 1) * this.options.page);
        }),
        pageDown: b(function(a) {
            this._stepDown((a || 1) * this.options.page);
        }),
        value: function(a) {
            return arguments.length ? void b(this._value).call(this, a) : this._parse(this.element.val());
        },
        widget: function() {
            return this.uiSpinner;
        }
    });
}(jQuery), function(a, b) {
    function c() {
        return ++e;
    }
    function d(a) {
        return a.hash.length > 1 && decodeURIComponent(a.href.replace(f, "")) === decodeURIComponent(location.href.replace(f, ""));
    }
    var e = 0, f = /#.*$/;
    a.widget("ui.tabs", {
        version: "1.10.3",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var b = this, c = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", c.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(b) {
                a(this).is(".ui-state-disabled") && b.preventDefault();
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                a(this).closest("li").is(".ui-state-disabled") && this.blur();
            }), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function(a) {
                return b.tabs.index(a);
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(c.active) : a(), 
            this._refresh(), this.active.length && this.load(c.active);
        },
        _initialActive: function() {
            var c = this.options.active, d = this.options.collapsible, e = location.hash.substring(1);
            return null === c && (e && this.tabs.each(function(d, f) {
                return a(f).attr("aria-controls") === e ? (c = d, !1) : b;
            }), null === c && (c = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === c || -1 === c) && (c = this.tabs.length ? 0 : !1)), 
            c !== !1 && (c = this.tabs.index(this.tabs.eq(c)), -1 === c && (c = d ? !1 : 0)), 
            !d && c === !1 && this.anchors.length && (c = 0), c;
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : a()
            };
        },
        _tabKeydown: function(c) {
            var d = a(this.document[0].activeElement).closest("li"), e = this.tabs.index(d), f = !0;
            if (!this._handlePageNav(c)) {
                switch (c.keyCode) {
                  case a.ui.keyCode.RIGHT:
                  case a.ui.keyCode.DOWN:
                    e++;
                    break;

                  case a.ui.keyCode.UP:
                  case a.ui.keyCode.LEFT:
                    f = !1, e--;
                    break;

                  case a.ui.keyCode.END:
                    e = this.anchors.length - 1;
                    break;

                  case a.ui.keyCode.HOME:
                    e = 0;
                    break;

                  case a.ui.keyCode.SPACE:
                    return c.preventDefault(), clearTimeout(this.activating), this._activate(e), b;

                  case a.ui.keyCode.ENTER:
                    return c.preventDefault(), clearTimeout(this.activating), this._activate(e === this.options.active ? !1 : e), 
                    b;

                  default:
                    return;
                }
                c.preventDefault(), clearTimeout(this.activating), e = this._focusNextTab(e, f), 
                c.ctrlKey || (d.attr("aria-selected", "false"), this.tabs.eq(e).attr("aria-selected", "true"), 
                this.activating = this._delay(function() {
                    this.option("active", e);
                }, this.delay));
            }
        },
        _panelKeydown: function(b) {
            this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), 
            this.active.focus());
        },
        _handlePageNav: function(c) {
            return c.altKey && c.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), 
            !0) : c.altKey && c.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), 
            !0) : b;
        },
        _findNextTab: function(b, c) {
            function d() {
                return b > e && (b = 0), 0 > b && (b = e), b;
            }
            for (var e = this.tabs.length - 1; -1 !== a.inArray(d(), this.options.disabled); ) b = c ? b + 1 : b - 1;
            return b;
        },
        _focusNextTab: function(a, b) {
            return a = this._findNextTab(a, b), this.tabs.eq(a).focus(), a;
        },
        _setOption: function(a, c) {
            return "active" === a ? (this._activate(c), b) : "disabled" === a ? (this._setupDisabled(c), 
            b) : (this._super(a, c), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", c), 
            c || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(c), 
            "heightStyle" === a && this._setupHeightStyle(c), b);
        },
        _tabId: function(a) {
            return a.attr("aria-controls") || "ui-tabs-" + c();
        },
        _sanitizeSelector: function(a) {
            return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
        },
        refresh: function() {
            var b = this.options, c = this.tablist.children(":has(a[href])");
            b.disabled = a.map(c.filter(".ui-state-disabled"), function(a) {
                return c.index(a);
            }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, 
            this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, 
            this.active = a()), this._refresh();
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), 
            this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0);
        },
        _processTabs: function() {
            var b = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), 
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function() {
                return a("a", this)[0];
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = a(), this.anchors.each(function(c, e) {
                var f, g, h, i = a(e).uniqueId().attr("id"), j = a(e).closest("li"), k = j.attr("aria-controls");
                d(e) ? (f = e.hash, g = b.element.find(b._sanitizeSelector(f))) : (h = b._tabId(j), 
                f = "#" + h, g = b.element.find(f), g.length || (g = b._createPanel(h), g.insertAfter(b.panels[c - 1] || b.tablist)), 
                g.attr("aria-live", "polite")), g.length && (b.panels = b.panels.add(g)), k && j.data("ui-tabs-aria-controls", k), 
                j.attr({
                    "aria-controls": f.substring(1),
                    "aria-labelledby": i
                }), g.attr("aria-labelledby", i);
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel");
        },
        _getList: function() {
            return this.element.find("ol,ul").eq(0);
        },
        _createPanel: function(b) {
            return a("<div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0);
        },
        _setupDisabled: function(b) {
            a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
            for (var c, d = 0; c = this.tabs[d]; d++) b === !0 || -1 !== a.inArray(d, b) ? a(c).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = b;
        },
        _setupEvents: function(b) {
            var c = {
                click: function(a) {
                    a.preventDefault();
                }
            };
            b && a.each(b.split(" "), function(a, b) {
                c[b] = "_eventHandler";
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, c), 
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs);
        },
        _setupHeightStyle: function(b) {
            var c, d = this.element.parent();
            "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), 
            this.element.siblings(":visible").each(function() {
                var b = a(this), d = b.css("position");
                "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0));
            }), this.element.children().not(this.panels).each(function() {
                c -= a(this).outerHeight(!0);
            }), this.panels.each(function() {
                a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()));
            }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function() {
                c = Math.max(c, a(this).height("").height());
            }).height(c));
        },
        _eventHandler: function(b) {
            var c = this.options, d = this.active, e = a(b.currentTarget), f = e.closest("li"), g = f[0] === d[0], h = g && c.collapsible, i = h ? a() : this._getPanelForTab(f), j = d.length ? this._getPanelForTab(d) : a(), k = {
                oldTab: d,
                oldPanel: j,
                newTab: h ? a() : f,
                newPanel: i
            };
            b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = h ? !1 : this.tabs.index(f), 
            this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), 
            i.length && this.load(this.tabs.index(f), b), this._toggle(b, k));
        },
        _toggle: function(b, c) {
            function d() {
                f.running = !1, f._trigger("activate", b, c);
            }
            function e() {
                c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), g.length && f.options.show ? f._show(g, f.options.show, d) : (g.show(), 
                d());
            }
            var f = this, g = c.newPanel, h = c.oldPanel;
            this.running = !0, h.length && this.options.hide ? this._hide(h, this.options.hide, function() {
                c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), e();
            }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), h.hide(), 
            e()), h.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), c.oldTab.attr("aria-selected", "false"), g.length && h.length ? c.oldTab.attr("tabIndex", -1) : g.length && this.tabs.filter(function() {
                return 0 === a(this).attr("tabIndex");
            }).attr("tabIndex", -1), g.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), c.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            });
        },
        _activate: function(b) {
            var c, d = this._findActive(b);
            d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], 
            this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop
            }));
        },
        _findActive: function(b) {
            return b === !1 ? a() : this.tabs.eq(b);
        },
        _getIndex: function(a) {
            return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), 
            a;
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), 
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), 
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), 
            this.tabs.add(this.panels).each(function() {
                a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");
            }), this.tabs.each(function() {
                var b = a(this), c = b.data("ui-tabs-aria-controls");
                c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls");
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
        },
        enable: function(c) {
            var d = this.options.disabled;
            d !== !1 && (c === b ? d = !1 : (c = this._getIndex(c), d = a.isArray(d) ? a.map(d, function(a) {
                return a !== c ? a : null;
            }) : a.map(this.tabs, function(a, b) {
                return b !== c ? b : null;
            })), this._setupDisabled(d));
        },
        disable: function(c) {
            var d = this.options.disabled;
            if (d !== !0) {
                if (c === b) d = !0; else {
                    if (c = this._getIndex(c), -1 !== a.inArray(c, d)) return;
                    d = a.isArray(d) ? a.merge([ c ], d).sort() : [ c ];
                }
                this._setupDisabled(d);
            }
        },
        load: function(b, c) {
            b = this._getIndex(b);
            var e = this, f = this.tabs.eq(b), g = f.find(".ui-tabs-anchor"), h = this._getPanelForTab(f), i = {
                tab: f,
                panel: h
            };
            d(g[0]) || (this.xhr = a.ajax(this._ajaxSettings(g, c, i)), this.xhr && "canceled" !== this.xhr.statusText && (f.addClass("ui-tabs-loading"), 
            h.attr("aria-busy", "true"), this.xhr.success(function(a) {
                setTimeout(function() {
                    h.html(a), e._trigger("load", c, i);
                }, 1);
            }).complete(function(a, b) {
                setTimeout(function() {
                    "abort" === b && e.panels.stop(!1, !0), f.removeClass("ui-tabs-loading"), h.removeAttr("aria-busy"), 
                    a === e.xhr && delete e.xhr;
                }, 1);
            })));
        },
        _ajaxSettings: function(b, c, d) {
            var e = this;
            return {
                url: b.attr("href"),
                beforeSend: function(b, f) {
                    return e._trigger("beforeLoad", c, a.extend({
                        jqXHR: b,
                        ajaxSettings: f
                    }, d));
                }
            };
        },
        _getPanelForTab: function(b) {
            var c = a(b).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + c));
        }
    });
}(jQuery), function(a) {
    function b(b, c) {
        var d = (b.attr("aria-describedby") || "").split(/\s+/);
        d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" ")));
    }
    function c(b) {
        var c = b.data("ui-tooltip-id"), d = (b.attr("aria-describedby") || "").split(/\s+/), e = a.inArray(c, d);
        -1 !== e && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), 
        d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby");
    }
    var d = 0;
    a.widget("ui.tooltip", {
        version: "1.10.3",
        options: {
            content: function() {
                var b = a(this).attr("title") || "";
                return a("<a>").text(b).html();
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable();
        },
        _setOption: function(b, c) {
            var d = this;
            return "disabled" === b ? (this[c ? "_disable" : "_enable"](), void (this.options[b] = c)) : (this._super(b, c), 
            void ("content" === b && a.each(this.tooltips, function(a, b) {
                d._updateContent(b);
            })));
        },
        _disable: function() {
            var b = this;
            a.each(this.tooltips, function(c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0], b.close(e, !0);
            }), this.element.find(this.options.items).addBack().each(function() {
                var b = a(this);
                b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "");
            });
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var b = a(this);
                b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"));
            });
        },
        open: function(b) {
            var c = this, d = a(b ? b.target : this.element).closest(this.options.items);
            d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), 
            d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function() {
                var b, d = a(this);
                d.data("ui-tooltip-open") && (b = a.Event("blur"), b.target = b.currentTarget = this, 
                c.close(b, !0)), d.attr("title") && (d.uniqueId(), c.parents[this.id] = {
                    element: this,
                    title: d.attr("title")
                }, d.attr("title", ""));
            }), this._updateContent(d, b));
        },
        _updateContent: function(a, b) {
            var c, d = this.options.content, e = this, f = b ? b.type : null;
            return "string" == typeof d ? this._open(b, a, d) : (c = d.call(a[0], function(c) {
                a.data("ui-tooltip-open") && e._delay(function() {
                    b && (b.type = f), this._open(b, a, c);
                });
            }), void (c && this._open(b, a, c)));
        },
        _open: function(c, d, e) {
            function f(a) {
                j.of = a, g.is(":hidden") || g.position(j);
            }
            var g, h, i, j = a.extend({}, this.options.position);
            if (e) {
                if (g = this._find(d), g.length) return void g.find(".ui-tooltip-content").html(e);
                d.is("[title]") && (c && "mouseover" === c.type ? d.attr("title", "") : d.removeAttr("title")), 
                g = this._tooltip(d), b(d, g.attr("id")), g.find(".ui-tooltip-content").html(e), 
                this.options.track && c && /^mouse/.test(c.type) ? (this._on(this.document, {
                    mousemove: f
                }), f(c)) : g.position(a.extend({
                    of: d
                }, this.options.position)), g.hide(), this._show(g, this.options.show), this.options.show && this.options.show.delay && (i = this.delayedShow = setInterval(function() {
                    g.is(":visible") && (f(j.of), clearInterval(i));
                }, a.fx.interval)), this._trigger("open", c, {
                    tooltip: g
                }), h = {
                    keyup: function(b) {
                        if (b.keyCode === a.ui.keyCode.ESCAPE) {
                            var c = a.Event(b);
                            c.currentTarget = d[0], this.close(c, !0);
                        }
                    },
                    remove: function() {
                        this._removeTooltip(g);
                    }
                }, c && "mouseover" !== c.type || (h.mouseleave = "close"), c && "focusin" !== c.type || (h.focusout = "close"), 
                this._on(!0, d, h);
            }
        },
        close: function(b) {
            var d = this, e = a(b ? b.currentTarget : this.element), f = this._find(e);
            this.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")), 
            c(e), f.stop(!0), this._hide(f, this.options.hide, function() {
                d._removeTooltip(a(this));
            }), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), 
            e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), 
            b && "mouseleave" === b.type && a.each(this.parents, function(b, c) {
                a(c.element).attr("title", c.title), delete d.parents[b];
            }), this.closing = !0, this._trigger("close", b, {
                tooltip: f
            }), this.closing = !1);
        },
        _tooltip: function(b) {
            var c = "ui-tooltip-" + d++, e = a("<div>").attr({
                id: c,
                role: "tooltip"
            }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return a("<div>").addClass("ui-tooltip-content").appendTo(e), e.appendTo(this.document[0].body), 
            this.tooltips[c] = b, e;
        },
        _find: function(b) {
            var c = b.data("ui-tooltip-id");
            return c ? a("#" + c) : a();
        },
        _removeTooltip: function(a) {
            a.remove(), delete this.tooltips[a.attr("id")];
        },
        _destroy: function() {
            var b = this;
            a.each(this.tooltips, function(c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0], b.close(e, !0), a("#" + c).remove(), d.data("ui-tooltip-title") && (d.attr("title", d.data("ui-tooltip-title")), 
                d.removeData("ui-tooltip-title"));
            });
        }
    });
}(jQuery), function(a, b) {
    var c = "ui-effects-";
    a.effects = {
        effect: {}
    }, function(a, b) {
        function c(a, b, c) {
            var d = l[b.type] || {};
            return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), 
            isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : a > d.max ? d.max : a);
        }
        function d(c) {
            var d = j(), e = d._rgba = [];
            return c = c.toLowerCase(), o(i, function(a, f) {
                var g, h = f.re.exec(c), i = h && f.parse(h), j = f.space || "rgba";
                return i ? (g = d[j](i), d[k[j].cache] = g[k[j].cache], e = d._rgba = g._rgba, !1) : b;
            }), e.length ? ("0,0,0,0" === e.join() && a.extend(e, f.transparent), d) : f[c];
        }
        function e(a, b, c) {
            return c = (c + 1) % 1, 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a;
        }
        var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", h = /^([\-+])=\s*(\d+\.?\d*)/, i = [ {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(a) {
                return [ a[1], a[2], a[3], a[4] ];
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(a) {
                return [ 2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4] ];
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(a) {
                return [ parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16) ];
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(a) {
                return [ parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16) ];
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(a) {
                return [ a[1], a[2] / 100, a[3] / 100, a[4] ];
            }
        } ], j = a.Color = function(b, c, d, e) {
            return new a.Color.fn.parse(b, c, d, e);
        }, k = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, l = {
            "byte": {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, m = j.support = {}, n = a("<p>")[0], o = a.each;
        n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, 
        o(k, function(a, b) {
            b.cache = "_" + a, b.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            };
        }), j.fn = a.extend(j.prototype, {
            parse: function(e, g, h, i) {
                if (e === b) return this._rgba = [ null, null, null, null ], this;
                (e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
                var l = this, m = a.type(e), n = this._rgba = [];
                return g !== b && (e = [ e, g, h, i ], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function(a, b) {
                    n[b.idx] = c(e[b.idx], b);
                }), this) : "object" === m ? (e instanceof j ? o(k, function(a, b) {
                    e[b.cache] && (l[b.cache] = e[b.cache].slice());
                }) : o(k, function(b, d) {
                    var f = d.cache;
                    o(d.props, function(a, b) {
                        if (!l[f] && d.to) {
                            if ("alpha" === a || null == e[a]) return;
                            l[f] = d.to(l._rgba);
                        }
                        l[f][b.idx] = c(e[a], b, !0);
                    }), l[f] && 0 > a.inArray(null, l[f].slice(0, 3)) && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])));
                }), this) : b;
            },
            is: function(a) {
                var c = j(a), d = !0, e = this;
                return o(k, function(a, f) {
                    var g, h = c[f.cache];
                    return h && (g = e[f.cache] || f.to && f.to(e._rgba) || [], o(f.props, function(a, c) {
                        return null != h[c.idx] ? d = h[c.idx] === g[c.idx] : b;
                    })), d;
                }), d;
            },
            _space: function() {
                var a = [], b = this;
                return o(k, function(c, d) {
                    b[d.cache] && a.push(c);
                }), a.pop();
            },
            transition: function(a, b) {
                var d = j(a), e = d._space(), f = k[e], g = 0 === this.alpha() ? j("transparent") : this, h = g[f.cache] || f.to(g._rgba), i = h.slice();
                return d = d[f.cache], o(f.props, function(a, e) {
                    var f = e.idx, g = h[f], j = d[f], k = l[e.type] || {};
                    null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), 
                    i[f] = c((j - g) * b + g, e)));
                }), this[e](i);
            },
            blend: function(b) {
                if (1 === this._rgba[3]) return this;
                var c = this._rgba.slice(), d = c.pop(), e = j(b)._rgba;
                return j(a.map(c, function(a, b) {
                    return (1 - d) * e[b] + d * a;
                }));
            },
            toRgbaString: function() {
                var b = "rgba(", c = a.map(this._rgba, function(a, b) {
                    return null == a ? b > 2 ? 1 : 0 : a;
                });
                return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")";
            },
            toHslaString: function() {
                var b = "hsla(", c = a.map(this.hsla(), function(a, b) {
                    return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), 
                    a;
                });
                return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")";
            },
            toHexString: function(b) {
                var c = this._rgba.slice(), d = c.pop();
                return b && c.push(~~(255 * d)), "#" + a.map(c, function(a) {
                    return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a;
                }).join("");
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
            }
        }), j.fn.parse.prototype = j.fn, k.hsla.to = function(a) {
            if (null == a[0] || null == a[1] || null == a[2]) return [ null, null, null, a[3] ];
            var b, c, d = a[0] / 255, e = a[1] / 255, f = a[2] / 255, g = a[3], h = Math.max(d, e, f), i = Math.min(d, e, f), j = h - i, k = h + i, l = .5 * k;
            return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, 
            c = 0 === j ? 0 : .5 >= l ? j / k : j / (2 - k), [ Math.round(b) % 360, c, l, null == g ? 1 : g ];
        }, k.hsla.from = function(a) {
            if (null == a[0] || null == a[1] || null == a[2]) return [ null, null, null, a[3] ];
            var b = a[0] / 360, c = a[1], d = a[2], f = a[3], g = .5 >= d ? d * (1 + c) : d + c - d * c, h = 2 * d - g;
            return [ Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f ];
        }, o(k, function(d, e) {
            var f = e.props, g = e.cache, i = e.to, k = e.from;
            j.fn[d] = function(d) {
                if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
                var e, h = a.type(d), l = "array" === h || "object" === h ? d : arguments, m = this[g].slice();
                return o(f, function(a, b) {
                    var d = l["object" === h ? a : b.idx];
                    null == d && (d = m[b.idx]), m[b.idx] = c(d, b);
                }), k ? (e = j(k(m)), e[g] = m, e) : j(m);
            }, o(f, function(b, c) {
                j.fn[b] || (j.fn[b] = function(e) {
                    var f, g = a.type(e), i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d, j = this[i](), k = j[c.idx];
                    return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), 
                    null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), 
                    j[c.idx] = e, this[i](j)));
                });
            });
        }), j.hook = function(b) {
            var c = b.split(" ");
            o(c, function(b, c) {
                a.cssHooks[c] = {
                    set: function(b, e) {
                        var f, g, h = "";
                        if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
                            if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
                                for (g = "backgroundColor" === c ? b.parentNode : b; ("" === h || "transparent" === h) && g && g.style; ) try {
                                    h = a.css(g, "backgroundColor"), g = g.parentNode;
                                } catch (i) {}
                                e = e.blend(h && "transparent" !== h ? h : "_default");
                            }
                            e = e.toRgbaString();
                        }
                        try {
                            b.style[c] = e;
                        } catch (i) {}
                    }
                }, a.fx.step[c] = function(b) {
                    b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos));
                };
            });
        }, j.hook(g), a.cssHooks.borderColor = {
            expand: function(a) {
                var b = {};
                return o([ "Top", "Right", "Bottom", "Left" ], function(c, d) {
                    b["border" + d + "Color"] = a;
                }), b;
            }
        }, f = a.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [ null, null, null, 0 ],
            _default: "#ffffff"
        };
    }(jQuery), function() {
        function c(b) {
            var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle, f = {};
            if (e && e.length && e[0] && e[e[0]]) for (d = e.length; d--; ) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]); else for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
            return f;
        }
        function d(b, c) {
            var d, e, g = {};
            for (d in c) e = c[d], b[d] !== e && (f[d] || (a.fx.step[d] || !isNaN(parseFloat(e))) && (g[d] = e));
            return g;
        }
        var e = [ "add", "remove", "toggle" ], f = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        a.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function(b, c) {
            a.fx.step[c] = function(a) {
                ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (jQuery.style(a.elem, c, a.end), 
                a.setAttr = !0);
            };
        }), a.fn.addBack || (a.fn.addBack = function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }), a.effects.animateClass = function(b, f, g, h) {
            var i = a.speed(f, g, h);
            return this.queue(function() {
                var f, g = a(this), h = g.attr("class") || "", j = i.children ? g.find("*").addBack() : g;
                j = j.map(function() {
                    var b = a(this);
                    return {
                        el: b,
                        start: c(this)
                    };
                }), f = function() {
                    a.each(e, function(a, c) {
                        b[c] && g[c + "Class"](b[c]);
                    });
                }, f(), j = j.map(function() {
                    return this.end = c(this.el[0]), this.diff = d(this.start, this.end), this;
                }), g.attr("class", h), j = j.map(function() {
                    var b = this, c = a.Deferred(), d = a.extend({}, i, {
                        queue: !1,
                        complete: function() {
                            c.resolve(b);
                        }
                    });
                    return this.el.animate(this.diff, d), c.promise();
                }), a.when.apply(a, j.get()).done(function() {
                    f(), a.each(arguments, function() {
                        var b = this.el;
                        a.each(this.diff, function(a) {
                            b.css(a, "");
                        });
                    }), i.complete.call(g[0]);
                });
            });
        }, a.fn.extend({
            addClass: function(b) {
                return function(c, d, e, f) {
                    return d ? a.effects.animateClass.call(this, {
                        add: c
                    }, d, e, f) : b.apply(this, arguments);
                };
            }(a.fn.addClass),
            removeClass: function(b) {
                return function(c, d, e, f) {
                    return arguments.length > 1 ? a.effects.animateClass.call(this, {
                        remove: c
                    }, d, e, f) : b.apply(this, arguments);
                };
            }(a.fn.removeClass),
            toggleClass: function(c) {
                return function(d, e, f, g, h) {
                    return "boolean" == typeof e || e === b ? f ? a.effects.animateClass.call(this, e ? {
                        add: d
                    } : {
                        remove: d
                    }, f, g, h) : c.apply(this, arguments) : a.effects.animateClass.call(this, {
                        toggle: d
                    }, e, f, g);
                };
            }(a.fn.toggleClass),
            switchClass: function(b, c, d, e, f) {
                return a.effects.animateClass.call(this, {
                    add: c,
                    remove: b
                }, d, e, f);
            }
        });
    }(), function() {
        function d(b, c, d, e) {
            return a.isPlainObject(b) && (c = b, b = b.effect), b = {
                effect: b
            }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, 
            d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, 
            b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, 
            b.complete = e || c.complete, b;
        }
        function e(b) {
            return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? a.isFunction(b) ? !0 : "object" != typeof b || b.effect ? !1 : !0 : !0;
        }
        a.extend(a.effects, {
            version: "1.10.3",
            save: function(a, b) {
                for (var d = 0; b.length > d; d++) null !== b[d] && a.data(c + b[d], a[0].style[b[d]]);
            },
            restore: function(a, d) {
                var e, f;
                for (f = 0; d.length > f; f++) null !== d[f] && (e = a.data(c + d[f]), e === b && (e = ""), 
                a.css(d[f], e));
            },
            setMode: function(a, b) {
                return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b;
            },
            getBaseline: function(a, b) {
                var c, d;
                switch (a[0]) {
                  case "top":
                    c = 0;
                    break;

                  case "middle":
                    c = .5;
                    break;

                  case "bottom":
                    c = 1;
                    break;

                  default:
                    c = a[0] / b.height;
                }
                switch (a[1]) {
                  case "left":
                    d = 0;
                    break;

                  case "center":
                    d = .5;
                    break;

                  case "right":
                    d = 1;
                    break;

                  default:
                    d = a[1] / b.width;
                }
                return {
                    x: d,
                    y: c
                };
            },
            createWrapper: function(b) {
                if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                var c = {
                    width: b.outerWidth(!0),
                    height: b.outerHeight(!0),
                    "float": b.css("float")
                }, d = a("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }), e = {
                    width: b.width(),
                    height: b.height()
                }, f = document.activeElement;
                try {
                    f.id;
                } catch (g) {
                    f = document.body;
                }
                return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), 
                "static" === b.css("position") ? (d.css({
                    position: "relative"
                }), b.css({
                    position: "relative"
                })) : (a.extend(c, {
                    position: b.css("position"),
                    zIndex: b.css("z-index")
                }), a.each([ "top", "left", "bottom", "right" ], function(a, d) {
                    c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto");
                }), b.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), b.css(e), d.css(c).show();
            },
            removeWrapper: function(b) {
                var c = document.activeElement;
                return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), 
                b;
            },
            setTransition: function(b, c, d, e) {
                return e = e || {}, a.each(c, function(a, c) {
                    var f = b.cssUnit(c);
                    f[0] > 0 && (e[c] = f[0] * d + f[1]);
                }), e;
            }
        }), a.fn.extend({
            effect: function() {
                function b(b) {
                    function d() {
                        a.isFunction(f) && f.call(e[0]), a.isFunction(b) && b();
                    }
                    var e = a(this), f = c.complete, h = c.mode;
                    (e.is(":hidden") ? "hide" === h : "show" === h) ? (e[h](), d()) : g.call(e[0], c, d);
                }
                var c = d.apply(this, arguments), e = c.mode, f = c.queue, g = a.effects.effect[c.effect];
                return a.fx.off || !g ? e ? this[e](c.duration, c.complete) : this.each(function() {
                    c.complete && c.complete.call(this);
                }) : f === !1 ? this.each(b) : this.queue(f || "fx", b);
            },
            show: function(a) {
                return function(b) {
                    if (e(b)) return a.apply(this, arguments);
                    var c = d.apply(this, arguments);
                    return c.mode = "show", this.effect.call(this, c);
                };
            }(a.fn.show),
            hide: function(a) {
                return function(b) {
                    if (e(b)) return a.apply(this, arguments);
                    var c = d.apply(this, arguments);
                    return c.mode = "hide", this.effect.call(this, c);
                };
            }(a.fn.hide),
            toggle: function(a) {
                return function(b) {
                    if (e(b) || "boolean" == typeof b) return a.apply(this, arguments);
                    var c = d.apply(this, arguments);
                    return c.mode = "toggle", this.effect.call(this, c);
                };
            }(a.fn.toggle),
            cssUnit: function(b) {
                var c = this.css(b), d = [];
                return a.each([ "em", "px", "%", "pt" ], function(a, b) {
                    c.indexOf(b) > 0 && (d = [ parseFloat(c), b ]);
                }), d;
            }
        });
    }(), function() {
        var b = {};
        a.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(a, c) {
            b[c] = function(b) {
                return Math.pow(b, a + 2);
            };
        }), a.extend(b, {
            Sine: function(a) {
                return 1 - Math.cos(a * Math.PI / 2);
            },
            Circ: function(a) {
                return 1 - Math.sqrt(1 - a * a);
            },
            Elastic: function(a) {
                return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15);
            },
            Back: function(a) {
                return a * a * (3 * a - 2);
            },
            Bounce: function(a) {
                for (var b, c = 4; ((b = Math.pow(2, --c)) - 1) / 11 > a; ) ;
                return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2);
            }
        }), a.each(b, function(b, c) {
            a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
                return 1 - c(1 - a);
            }, a.easing["easeInOut" + b] = function(a) {
                return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2;
            };
        });
    }();
}(jQuery), function(a) {
    var b = /up|down|vertical/, c = /up|left|vertical|horizontal/;
    a.effects.effect.blind = function(d, e) {
        var f, g, h, i = a(this), j = [ "position", "top", "bottom", "left", "right", "height", "width" ], k = a.effects.setMode(i, d.mode || "hide"), l = d.direction || "up", m = b.test(l), n = m ? "height" : "width", o = m ? "top" : "left", p = c.test(l), q = {}, r = "show" === k;
        i.parent().is(".ui-effects-wrapper") ? a.effects.save(i.parent(), j) : a.effects.save(i, j), 
        i.show(), f = a.effects.createWrapper(i).css({
            overflow: "hidden"
        }), g = f[n](), h = parseFloat(f.css(o)) || 0, q[n] = r ? g : 0, p || (i.css(m ? "bottom" : "right", 0).css(m ? "top" : "left", "auto").css({
            position: "absolute"
        }), q[o] = r ? h : g + h), r && (f.css(n, 0), p || f.css(o, h + g)), f.animate(q, {
            duration: d.duration,
            easing: d.easing,
            queue: !1,
            complete: function() {
                "hide" === k && i.hide(), a.effects.restore(i, j), a.effects.removeWrapper(i), e();
            }
        });
    };
}(jQuery), function(a) {
    a.effects.effect.bounce = function(b, c) {
        var d, e, f, g = a(this), h = [ "position", "top", "bottom", "left", "right", "height", "width" ], i = a.effects.setMode(g, b.mode || "effect"), j = "hide" === i, k = "show" === i, l = b.direction || "up", m = b.distance, n = b.times || 5, o = 2 * n + (k || j ? 1 : 0), p = b.duration / o, q = b.easing, r = "up" === l || "down" === l ? "top" : "left", s = "up" === l || "left" === l, t = g.queue(), u = t.length;
        for ((k || j) && h.push("opacity"), a.effects.save(g, h), g.show(), a.effects.createWrapper(g), 
        m || (m = g["top" === r ? "outerHeight" : "outerWidth"]() / 3), k && (f = {
            opacity: 1
        }, f[r] = 0, g.css("opacity", 0).css(r, s ? 2 * -m : 2 * m).animate(f, p, q)), j && (m /= Math.pow(2, n - 1)), 
        f = {}, f[r] = 0, d = 0; n > d; d++) e = {}, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q).animate(f, p, q), 
        m = j ? 2 * m : m / 2;
        j && (e = {
            opacity: 0
        }, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q)), g.queue(function() {
            j && g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c();
        }), u > 1 && t.splice.apply(t, [ 1, 0 ].concat(t.splice(u, o + 1))), g.dequeue();
    };
}(jQuery), function(a) {
    a.effects.effect.clip = function(b, c) {
        var d, e, f, g = a(this), h = [ "position", "top", "bottom", "left", "right", "height", "width" ], i = a.effects.setMode(g, b.mode || "hide"), j = "show" === i, k = b.direction || "vertical", l = "vertical" === k, m = l ? "height" : "width", n = l ? "top" : "left", o = {};
        a.effects.save(g, h), g.show(), d = a.effects.createWrapper(g).css({
            overflow: "hidden"
        }), e = "IMG" === g[0].tagName ? d : g, f = e[m](), j && (e.css(m, 0), e.css(n, f / 2)), 
        o[m] = j ? f : 0, o[n] = j ? 0 : f / 2, e.animate(o, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function() {
                j || g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c();
            }
        });
    };
}(jQuery), function(a) {
    a.effects.effect.drop = function(b, c) {
        var d, e = a(this), f = [ "position", "top", "bottom", "left", "right", "opacity", "height", "width" ], g = a.effects.setMode(e, b.mode || "hide"), h = "show" === g, i = b.direction || "left", j = "up" === i || "down" === i ? "top" : "left", k = "up" === i || "left" === i ? "pos" : "neg", l = {
            opacity: h ? 1 : 0
        };
        a.effects.save(e, f), e.show(), a.effects.createWrapper(e), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0) / 2, 
        h && e.css("opacity", 0).css(j, "pos" === k ? -d : d), l[j] = (h ? "pos" === k ? "+=" : "-=" : "pos" === k ? "-=" : "+=") + d, 
        e.animate(l, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function() {
                "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c();
            }
        });
    };
}(jQuery), function(a) {
    a.effects.effect.explode = function(b, c) {
        function d() {
            t.push(this), t.length === l * m && e();
        }
        function e() {
            n.css({
                visibility: "visible"
            }), a(t).remove(), p || n.hide(), c();
        }
        var f, g, h, i, j, k, l = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3, m = l, n = a(this), o = a.effects.setMode(n, b.mode || "hide"), p = "show" === o, q = n.show().css("visibility", "hidden").offset(), r = Math.ceil(n.outerWidth() / m), s = Math.ceil(n.outerHeight() / l), t = [];
        for (f = 0; l > f; f++) for (i = q.top + f * s, k = f - (l - 1) / 2, g = 0; m > g; g++) h = q.left + g * r, 
        j = g - (m - 1) / 2, n.clone().appendTo("body").wrap("<div></div>").css({
            position: "absolute",
            visibility: "visible",
            left: -g * r,
            top: -f * s
        }).parent().addClass("ui-effects-explode").css({
            position: "absolute",
            overflow: "hidden",
            width: r,
            height: s,
            left: h + (p ? j * r : 0),
            top: i + (p ? k * s : 0),
            opacity: p ? 0 : 1
        }).animate({
            left: h + (p ? 0 : j * r),
            top: i + (p ? 0 : k * s),
            opacity: p ? 1 : 0
        }, b.duration || 500, b.easing, d);
    };
}(jQuery), function(a) {
    a.effects.effect.fade = function(b, c) {
        var d = a(this), e = a.effects.setMode(d, b.mode || "toggle");
        d.animate({
            opacity: e
        }, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: c
        });
    };
}(jQuery), function(a) {
    a.effects.effect.fold = function(b, c) {
        var d, e, f = a(this), g = [ "position", "top", "bottom", "left", "right", "height", "width" ], h = a.effects.setMode(f, b.mode || "hide"), i = "show" === h, j = "hide" === h, k = b.size || 15, l = /([0-9]+)%/.exec(k), m = !!b.horizFirst, n = i !== m, o = n ? [ "width", "height" ] : [ "height", "width" ], p = b.duration / 2, q = {}, r = {};
        a.effects.save(f, g), f.show(), d = a.effects.createWrapper(f).css({
            overflow: "hidden"
        }), e = n ? [ d.width(), d.height() ] : [ d.height(), d.width() ], l && (k = parseInt(l[1], 10) / 100 * e[j ? 0 : 1]), 
        i && d.css(m ? {
            height: 0,
            width: k
        } : {
            height: k,
            width: 0
        }), q[o[0]] = i ? e[0] : k, r[o[1]] = i ? e[1] : 0, d.animate(q, p, b.easing).animate(r, p, b.easing, function() {
            j && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c();
        });
    };
}(jQuery), function(a) {
    a.effects.effect.highlight = function(b, c) {
        var d = a(this), e = [ "backgroundImage", "backgroundColor", "opacity" ], f = a.effects.setMode(d, b.mode || "show"), g = {
            backgroundColor: d.css("backgroundColor")
        };
        "hide" === f && (g.opacity = 0), a.effects.save(d, e), d.show().css({
            backgroundImage: "none",
            backgroundColor: b.color || "#ffff99"
        }).animate(g, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function() {
                "hide" === f && d.hide(), a.effects.restore(d, e), c();
            }
        });
    };
}(jQuery), function(a) {
    a.effects.effect.pulsate = function(b, c) {
        var d, e = a(this), f = a.effects.setMode(e, b.mode || "show"), g = "show" === f, h = "hide" === f, i = g || "hide" === f, j = 2 * (b.times || 5) + (i ? 1 : 0), k = b.duration / j, l = 0, m = e.queue(), n = m.length;
        for ((g || !e.is(":visible")) && (e.css("opacity", 0).show(), l = 1), d = 1; j > d; d++) e.animate({
            opacity: l
        }, k, b.easing), l = 1 - l;
        e.animate({
            opacity: l
        }, k, b.easing), e.queue(function() {
            h && e.hide(), c();
        }), n > 1 && m.splice.apply(m, [ 1, 0 ].concat(m.splice(n, j + 1))), e.dequeue();
    };
}(jQuery), function(a) {
    a.effects.effect.puff = function(b, c) {
        var d = a(this), e = a.effects.setMode(d, b.mode || "hide"), f = "hide" === e, g = parseInt(b.percent, 10) || 150, h = g / 100, i = {
            height: d.height(),
            width: d.width(),
            outerHeight: d.outerHeight(),
            outerWidth: d.outerWidth()
        };
        a.extend(b, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: e,
            complete: c,
            percent: f ? g : 100,
            from: f ? i : {
                height: i.height * h,
                width: i.width * h,
                outerHeight: i.outerHeight * h,
                outerWidth: i.outerWidth * h
            }
        }), d.effect(b);
    }, a.effects.effect.scale = function(b, c) {
        var d = a(this), e = a.extend(!0, {}, b), f = a.effects.setMode(d, b.mode || "effect"), g = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "hide" === f ? 0 : 100), h = b.direction || "both", i = b.origin, j = {
            height: d.height(),
            width: d.width(),
            outerHeight: d.outerHeight(),
            outerWidth: d.outerWidth()
        }, k = {
            y: "horizontal" !== h ? g / 100 : 1,
            x: "vertical" !== h ? g / 100 : 1
        };
        e.effect = "size", e.queue = !1, e.complete = c, "effect" !== f && (e.origin = i || [ "middle", "center" ], 
        e.restore = !0), e.from = b.from || ("show" === f ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : j), e.to = {
            height: j.height * k.y,
            width: j.width * k.x,
            outerHeight: j.outerHeight * k.y,
            outerWidth: j.outerWidth * k.x
        }, e.fade && ("show" === f && (e.from.opacity = 0, e.to.opacity = 1), "hide" === f && (e.from.opacity = 1, 
        e.to.opacity = 0)), d.effect(e);
    }, a.effects.effect.size = function(b, c) {
        var d, e, f, g = a(this), h = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ], i = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ], j = [ "width", "height", "overflow" ], k = [ "fontSize" ], l = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ], m = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ], n = a.effects.setMode(g, b.mode || "effect"), o = b.restore || "effect" !== n, p = b.scale || "both", q = b.origin || [ "middle", "center" ], r = g.css("position"), s = o ? h : i, t = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        "show" === n && g.show(), d = {
            height: g.height(),
            width: g.width(),
            outerHeight: g.outerHeight(),
            outerWidth: g.outerWidth()
        }, "toggle" === b.mode && "show" === n ? (g.from = b.to || t, g.to = b.from || d) : (g.from = b.from || ("show" === n ? t : d), 
        g.to = b.to || ("hide" === n ? t : d)), f = {
            from: {
                y: g.from.height / d.height,
                x: g.from.width / d.width
            },
            to: {
                y: g.to.height / d.height,
                x: g.to.width / d.width
            }
        }, ("box" === p || "both" === p) && (f.from.y !== f.to.y && (s = s.concat(l), g.from = a.effects.setTransition(g, l, f.from.y, g.from), 
        g.to = a.effects.setTransition(g, l, f.to.y, g.to)), f.from.x !== f.to.x && (s = s.concat(m), 
        g.from = a.effects.setTransition(g, m, f.from.x, g.from), g.to = a.effects.setTransition(g, m, f.to.x, g.to))), 
        ("content" === p || "both" === p) && f.from.y !== f.to.y && (s = s.concat(k).concat(j), 
        g.from = a.effects.setTransition(g, k, f.from.y, g.from), g.to = a.effects.setTransition(g, k, f.to.y, g.to)), 
        a.effects.save(g, s), g.show(), a.effects.createWrapper(g), g.css("overflow", "hidden").css(g.from), 
        q && (e = a.effects.getBaseline(q, d), g.from.top = (d.outerHeight - g.outerHeight()) * e.y, 
        g.from.left = (d.outerWidth - g.outerWidth()) * e.x, g.to.top = (d.outerHeight - g.to.outerHeight) * e.y, 
        g.to.left = (d.outerWidth - g.to.outerWidth) * e.x), g.css(g.from), ("content" === p || "both" === p) && (l = l.concat([ "marginTop", "marginBottom" ]).concat(k), 
        m = m.concat([ "marginLeft", "marginRight" ]), j = h.concat(l).concat(m), g.find("*[width]").each(function() {
            var c = a(this), d = {
                height: c.height(),
                width: c.width(),
                outerHeight: c.outerHeight(),
                outerWidth: c.outerWidth()
            };
            o && a.effects.save(c, j), c.from = {
                height: d.height * f.from.y,
                width: d.width * f.from.x,
                outerHeight: d.outerHeight * f.from.y,
                outerWidth: d.outerWidth * f.from.x
            }, c.to = {
                height: d.height * f.to.y,
                width: d.width * f.to.x,
                outerHeight: d.height * f.to.y,
                outerWidth: d.width * f.to.x
            }, f.from.y !== f.to.y && (c.from = a.effects.setTransition(c, l, f.from.y, c.from), 
            c.to = a.effects.setTransition(c, l, f.to.y, c.to)), f.from.x !== f.to.x && (c.from = a.effects.setTransition(c, m, f.from.x, c.from), 
            c.to = a.effects.setTransition(c, m, f.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function() {
                o && a.effects.restore(c, j);
            });
        })), g.animate(g.to, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function() {
                0 === g.to.opacity && g.css("opacity", g.from.opacity), "hide" === n && g.hide(), 
                a.effects.restore(g, s), o || ("static" === r ? g.css({
                    position: "relative",
                    top: g.to.top,
                    left: g.to.left
                }) : a.each([ "top", "left" ], function(a, b) {
                    g.css(b, function(b, c) {
                        var d = parseInt(c, 10), e = a ? g.to.left : g.to.top;
                        return "auto" === c ? e + "px" : d + e + "px";
                    });
                })), a.effects.removeWrapper(g), c();
            }
        });
    };
}(jQuery), function(a) {
    a.effects.effect.shake = function(b, c) {
        var d, e = a(this), f = [ "position", "top", "bottom", "left", "right", "height", "width" ], g = a.effects.setMode(e, b.mode || "effect"), h = b.direction || "left", i = b.distance || 20, j = b.times || 3, k = 2 * j + 1, l = Math.round(b.duration / k), m = "up" === h || "down" === h ? "top" : "left", n = "up" === h || "left" === h, o = {}, p = {}, q = {}, r = e.queue(), s = r.length;
        for (a.effects.save(e, f), e.show(), a.effects.createWrapper(e), o[m] = (n ? "-=" : "+=") + i, 
        p[m] = (n ? "+=" : "-=") + 2 * i, q[m] = (n ? "-=" : "+=") + 2 * i, e.animate(o, l, b.easing), 
        d = 1; j > d; d++) e.animate(p, l, b.easing).animate(q, l, b.easing);
        e.animate(p, l, b.easing).animate(o, l / 2, b.easing).queue(function() {
            "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c();
        }), s > 1 && r.splice.apply(r, [ 1, 0 ].concat(r.splice(s, k + 1))), e.dequeue();
    };
}(jQuery), function(a) {
    a.effects.effect.slide = function(b, c) {
        var d, e = a(this), f = [ "position", "top", "bottom", "left", "right", "width", "height" ], g = a.effects.setMode(e, b.mode || "show"), h = "show" === g, i = b.direction || "left", j = "up" === i || "down" === i ? "top" : "left", k = "up" === i || "left" === i, l = {};
        a.effects.save(e, f), e.show(), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0), 
        a.effects.createWrapper(e).css({
            overflow: "hidden"
        }), h && e.css(j, k ? isNaN(d) ? "-" + d : -d : d), l[j] = (h ? k ? "+=" : "-=" : k ? "-=" : "+=") + d, 
        e.animate(l, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function() {
                "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c();
            }
        });
    };
}(jQuery), function(a) {
    a.effects.effect.transfer = function(b, c) {
        var d = a(this), e = a(b.to), f = "fixed" === e.css("position"), g = a("body"), h = f ? g.scrollTop() : 0, i = f ? g.scrollLeft() : 0, j = e.offset(), k = {
            top: j.top - h,
            left: j.left - i,
            height: e.innerHeight(),
            width: e.innerWidth()
        }, l = d.offset(), m = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(b.className).css({
            top: l.top - h,
            left: l.left - i,
            height: d.innerHeight(),
            width: d.innerWidth(),
            position: f ? "fixed" : "absolute"
        }).animate(k, b.duration, b.easing, function() {
            m.remove(), c();
        });
    };
}(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(a) {
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery), +function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {
            end: b[c]
        };
        return !1;
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0;
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
        });
    }
    var c = '[data-dismiss="alert"]', d = function(b) {
        a(b).on("click", c, this.close);
    };
    d.VERSION = "3.3.0", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove();
        }
        var e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), 
        b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
        });
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };
    c.VERSION = "3.3.0", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, 
            d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
        }, this), 0);
    }, c.prototype.toggle = function() {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), 
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active");
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", "focus" == b.type);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, 
        this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    c.VERSION = "3.3.0", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        switch (a.which) {
          case 37:
            this.prev();
            break;

          case 39:
            this.next();
            break;

          default:
            return;
        }
        a.preventDefault();
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), 
        this;
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = "prev" == a ? -1 : 1, d = this.getItemIndex(b), e = (d + c) % this.$items.length;
        return this.$items.eq(e);
    }, c.prototype.to = function(a) {
        var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a);
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval, h = "next" == b ? "left" : "right", i = "next" == b ? "first" : "last", j = this;
        if (!f.length) {
            if (!this.options.wrap) return;
            f = this.$element.find(".item")[i]();
        }
        if (f.hasClass("active")) return this.sliding = !1;
        var k = f[0], l = a.Event("slide.bs.carousel", {
            relatedTarget: k,
            direction: h
        });
        if (this.$element.trigger(l), !l.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var m = a(this.$indicators.children()[this.getItemIndex(f)]);
                m && m.addClass("active");
            }
            var n = a.Event("slid.bs.carousel", {
                relatedTarget: k,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), 
            f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([ b, h ].join(" ")).addClass("active"), e.removeClass([ "active", h ].join(" ")), 
                j.sliding = !1, setTimeout(function() {
                    j.$element.trigger(n);
                }, 0);
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), 
            this.sliding = !1, this.$element.trigger(n)), g && this.cycle(), this;
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this;
    };
    var e = function(c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), 
    a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d);
    }
    function c(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.collapse"), f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), 
            "string" == typeof b && e[b]();
        });
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a(this.options.trigger).filter('[href="#' + b.id + '"], [data-target="#' + b.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    d.VERSION = "3.3.0", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, 
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase([ "scroll", g ].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e);
        }, this)).end();
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : a.extend({}, e.data(), {
            trigger: this
        });
        c.call(f, h);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this), e = c(d), f = {
                relatedTarget: this
            };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), 
            e.removeClass("open").trigger("hidden.bs.dropdown", f)));
        }));
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    function d(b) {
        return this.each(function() {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
        });
    }
    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    g.VERSION = "3.3.0", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
            }
            return !1;
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27|32)/.test(b.which)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d), g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), 
                d.trigger("click");
                var h = " li:not(.divider):visible a", i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), 
                    i.eq(j).trigger("focus");
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown);
}(jQuery), +function(a) {
    "use strict";
    function b(b, d) {
        return this.each(function() {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
        });
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, 
        this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    c.VERSION = "3.3.0", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, 
    c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function(b) {
        var d = this, e = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), 
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), 
        this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), 
            e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), 
            d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f);
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
        }));
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), 
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), 
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), 
        a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
        }, this));
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
        });
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function(b) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b();
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
        } else b && b();
    }, c.prototype.checkScrollbar = function() {
        this.scrollbarWidth = this.measureScrollbar();
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "");
    }, c.prototype.measureScrollbar = function() {
        if (document.body.clientWidth >= window.innerWidth) return 0;
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(e) && e
        }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus");
            });
        }), b.call(f, g, this);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b, g = f && f.selector;
            (e || "destroy" != b) && (g ? (e || d.data("bs.tooltip", e = {}), e[g] || (e[g] = new c(this, f))) : e || d.data("bs.tooltip", e = new c(this, f)), 
            "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
        this.init("tooltip", a, b);
    };
    c.VERSION = "3.3.0", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), 
        this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), 
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, c.prototype.getDelegateOptions = function() {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void (c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", 
        c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show());
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", 
        c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide();
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this, f = this.tip(), g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
            if (j) {
                var n = h, o = this.options.container ? a(this.options.container) : this.$element.parent(), p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, 
                f.removeClass(n).addClass(h);
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r();
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, 
        a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                });
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l);
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), 
            b && b();
        }
        var e = this, f = this.tip(), g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), 
        a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), 
        this.hoverState = null, this);
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function() {
        return this.getTitle();
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
            top: 0,
            left: 0
        } : b.offset(), g = {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        }, h = d ? {
            width: a(window).width(),
            height: a(window).height()
        } : null;
        return a.extend({}, e, g, h, f);
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k);
        }
        return e;
    }, c.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a;
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template);
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.enable = function() {
        this.enabled = !0;
    }, c.prototype.disable = function() {
        this.enabled = !1;
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type);
        });
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b, g = f && f.selector;
            (e || "destroy" != b) && (g ? (e || d.data("bs.popover", e = {}), e[g] || (e[g] = new c(this, f))) : e || d.data("bs.popover", e = new c(this, f)), 
            "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, 
    c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), 
        a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, c.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), 
        this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], 
        this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), 
        this.refresh(), this.process();
    }
    function c(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }
    b.VERSION = "3.3.0", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function() {
        var b = "offset", c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), 
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [ [ f[b]().top + c, e ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            d.offsets.push(this[0]), d.targets.push(this[1]);
        });
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--; ) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]);
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), 
        d.trigger("activate.bs.scrollspy");
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b) {
        this.element = a(b);
    };
    c.VERSION = "3.3.0", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {
                relatedTarget: b[0]
            }), g = a.Event("show.bs.tab", {
                relatedTarget: e[0]
            });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    });
                });
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, 
            b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            e && e();
        }
        var g = d.find("> .active"), h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), 
        g.removeClass("in");
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this;
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show");
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition();
    };
    c.VERSION = "3.3.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
        return null != c && c >= i ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = a("body").height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), 
            "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            });
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this;
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), 
            null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
        });
    });
}(jQuery), function(a, b) {
    var c = a();
    a.fn.dropdownHover = function(d) {
        return "ontouchstart" in document ? this : (c = c.add(this.parent()), this.each(function() {
            var e, f = a(this), g = f.parent(), h = {
                delay: 500,
                instantlyCloseOthers: !0
            }, i = {
                delay: a(this).data("delay"),
                instantlyCloseOthers: a(this).data("close-others")
            }, j = "show.bs.dropdown", k = "hide.bs.dropdown", l = a.extend(!0, {}, h, d, i);
            g.hover(function(a) {
                return g.hasClass("open") || f.is(a.target) ? (c.find(":focus").blur(), l.instantlyCloseOthers === !0 && c.removeClass("open"), 
                b.clearTimeout(e), g.addClass("open"), void f.trigger(j)) : !0;
            }, function() {
                e = b.setTimeout(function() {
                    g.removeClass("open"), f.trigger(k);
                }, l.delay);
            }), f.hover(function() {
                c.find(":focus").blur(), l.instantlyCloseOthers === !0 && c.removeClass("open"), 
                b.clearTimeout(e), g.addClass("open"), f.trigger(j);
            }), g.find(".dropdown-submenu").each(function() {
                var c, d = a(this);
                d.hover(function() {
                    b.clearTimeout(c), d.children(".dropdown-menu").show(), d.siblings().children(".dropdown-menu").hide();
                }, function() {
                    var a = d.children(".dropdown-menu");
                    c = b.setTimeout(function() {
                        a.hide();
                    }, l.delay);
                });
            });
        }));
    }, a(document).ready(function() {
        a('[data-hover="dropdown"]').dropdownHover();
    });
}(jQuery, this), !function(a) {
    jQuery.fn.extend({
        slimScroll: function(b) {
            var c = {
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px",
                animate: !0
            }, d = a.extend(c, b);
            return this.each(function() {
                function c(b) {
                    if (j) {
                        var b = b || window.event, c = 0;
                        b.wheelDelta && (c = -b.wheelDelta / 120), b.detail && (c = b.detail / 3);
                        var f = b.target || b.srcTarget || b.srcElement;
                        a(f).closest("." + d.wrapperClass).is(v.parent()) && e(c, !0), b.preventDefault && !u && b.preventDefault(), 
                        u || (b.returnValue = !1);
                    }
                }
                function e(a, b, c) {
                    u = !1;
                    var e = a, f = v.outerHeight() - A.outerHeight();
                    if (b && (e = parseInt(A.css("top")) + a * parseInt(d.wheelStep) / 100 * A.outerHeight(), 
                    e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), A.css({
                        top: e + "px"
                    })), p = parseInt(A.css("top")) / (v.outerHeight() - A.outerHeight()), e = p * (v[0].scrollHeight - v.outerHeight()), 
                    c) {
                        e = a;
                        var g = e / v[0].scrollHeight * v.outerHeight();
                        g = Math.min(Math.max(g, 0), f), A.css({
                            top: g + "px"
                        });
                    }
                    "scrollTo" in d && d.animate ? v.animate({
                        scrollTop: e
                    }) : v.scrollTop(e), v.trigger("slimscrolling", ~~e), h(), i();
                }
                function f() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", c, !1), this.addEventListener("mousewheel", c, !1)) : document.attachEvent("onmousewheel", c);
                }
                function g() {
                    o = Math.max(v.outerHeight() / v[0].scrollHeight * v.outerHeight(), s), A.css({
                        height: o + "px"
                    });
                    var a = o == v.outerHeight() ? "none" : "block";
                    A.css({
                        display: a
                    });
                }
                function h() {
                    if (g(), clearTimeout(m), p == ~~p) {
                        if (u = d.allowPageScroll, q != p) {
                            var a = 0 == ~~p ? "top" : "bottom";
                            v.trigger("slimscroll", a);
                        }
                    } else u = !1;
                    return q = p, o >= v.outerHeight() ? void (u = !0) : (A.stop(!0, !0).fadeIn("fast"), 
                    void (d.railVisible && z.stop(!0, !0).fadeIn("fast")));
                }
                function i() {
                    d.alwaysVisible || (m = setTimeout(function() {
                        d.disableFadeOut && j || k || l || (A.fadeOut("slow"), z.fadeOut("slow"));
                    }, 1e3));
                }
                var j, k, l, m, n, o, p, q, r = "<div></div>", s = 30, u = !1, v = a(this);
                if ("ontouchstart" in window && window.navigator.msPointerEnabled && v.css("-ms-touch-action", "none"), 
                v.parent().hasClass(d.wrapperClass)) {
                    var w = v.scrollTop();
                    if (A = v.parent().find("." + d.barClass), z = v.parent().find("." + d.railClass), 
                    g(), a.isPlainObject(b)) {
                        if ("height" in b && "auto" == b.height) {
                            v.parent().css("height", "auto"), v.css("height", "auto");
                            var x = v.parent().parent().height();
                            v.parent().css("height", x), v.css("height", x);
                        }
                        if ("scrollTo" in b) w = parseInt(d.scrollTo); else if ("scrollBy" in b) w += parseInt(d.scrollBy); else if ("destroy" in b) return A.remove(), 
                        z.remove(), void v.unwrap();
                        e(w, !1, !0);
                    }
                } else {
                    d.height = "auto" == b.height ? v.parent().height() : b.height;
                    var y = a(r).addClass(d.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: d.width,
                        height: d.height
                    });
                    v.css({
                        overflow: "hidden",
                        width: d.width,
                        height: d.height
                    });
                    var z = a(r).addClass(d.railClass).css({
                        width: d.size,
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: d.alwaysVisible && d.railVisible ? "block" : "none",
                        "border-radius": d.railBorderRadius,
                        background: d.railColor,
                        opacity: d.railOpacity,
                        zIndex: 90
                    }), A = a(r).addClass(d.barClass).css({
                        background: d.color,
                        width: d.size,
                        position: "absolute",
                        top: 0,
                        opacity: d.opacity,
                        display: d.alwaysVisible ? "block" : "none",
                        "border-radius": d.borderRadius,
                        BorderRadius: d.borderRadius,
                        MozBorderRadius: d.borderRadius,
                        WebkitBorderRadius: d.borderRadius,
                        zIndex: 99
                    }), B = "right" == d.position ? {
                        right: d.distance
                    } : {
                        left: d.distance
                    };
                    z.css(B), A.css(B), v.wrap(y), v.parent().append(A), v.parent().append(z), d.railDraggable && A.bind("mousedown", function(b) {
                        var c = a(document);
                        return l = !0, t = parseFloat(A.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY, A.css("top", currTop), e(0, A.position().top, !1);
                        }), c.bind("mouseup.slimscroll", function() {
                            l = !1, i(), c.unbind(".slimscroll");
                        }), !1;
                    }).bind("selectstart.slimscroll", function(a) {
                        return a.stopPropagation(), a.preventDefault(), !1;
                    }), "ontouchstart" in window && window.navigator.msPointerEnabled && (v.bind("MSPointerDown", function(a) {
                        n = a.originalEvent.pageY;
                    }), v.bind("MSPointerMove", function(a) {
                        a.originalEvent.preventDefault();
                        var b = (n - a.originalEvent.pageY) / d.touchScrollStep;
                        e(b, !0), n = a.originalEvent.pageY;
                    })), z.hover(function() {
                        h();
                    }, function() {
                        i();
                    }), A.hover(function() {
                        k = !0;
                    }, function() {
                        k = !1;
                    }), v.hover(function() {
                        j = !0, h(), i();
                    }, function() {
                        j = !1, i();
                    }), v.bind("touchstart", function(a) {
                        a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY);
                    }), v.bind("touchmove", function(a) {
                        if (u || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
                            var b = (n - a.originalEvent.touches[0].pageY) / d.touchScrollStep;
                            e(b, !0), n = a.originalEvent.touches[0].pageY;
                        }
                    }), g(), "bottom" === d.start ? (A.css({
                        top: v.outerHeight() - A.outerHeight()
                    }), e(0, !0)) : "top" !== d.start && (e(a(d.start).position().top, null, !0), d.alwaysVisible || A.hide()), 
                    f();
                }
            }), this;
        }
    }), jQuery.fn.extend({
        slimscroll: jQuery.fn.slimScroll
    });
}(jQuery), !function() {
    "use strict";
    function a(a) {
        function b(b, d) {
            var f, p, q = b == window, r = d && void 0 !== d.message ? d.message : void 0;
            if (d = a.extend({}, a.blockUI.defaults, d || {}), !d.ignoreIfBlocked || !a(b).data("blockUI.isBlocked")) {
                if (d.overlayCSS = a.extend({}, a.blockUI.defaults.overlayCSS, d.overlayCSS || {}), 
                f = a.extend({}, a.blockUI.defaults.css, d.css || {}), d.onOverlayClick && (d.overlayCSS.cursor = "pointer"), 
                p = a.extend({}, a.blockUI.defaults.themedCSS, d.themedCSS || {}), r = void 0 === r ? d.message : r, 
                q && n && c(window, {
                    fadeOut: 0
                }), r && "string" != typeof r && (r.parentNode || r.jquery)) {
                    var s = r.jquery ? r[0] : r, t = {};
                    a(b).data("blockUI.history", t), t.el = s, t.parent = s.parentNode, t.display = s.style.display, 
                    t.position = s.style.position, t.parent && t.parent.removeChild(s);
                }
                a(b).data("blockUI.onUnblock", d.onUnblock);
                var u, v, w, x, y = d.baseZ;
                u = a(k || d.forceIframe ? '<iframe class="blockUI" style="z-index:' + y++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + d.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'), 
                v = a(d.theme ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + y++ + ';display:none"></div>' : '<div class="blockUI blockOverlay" style="z-index:' + y++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), 
                d.theme && q ? (x = '<div class="blockUI ' + d.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (y + 10) + ';display:none;position:fixed">', 
                d.title && (x += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (d.title || "&nbsp;") + "</div>"), 
                x += '<div class="ui-widget-content ui-dialog-content"></div>', x += "</div>") : d.theme ? (x = '<div class="blockUI ' + d.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (y + 10) + ';display:none;position:absolute">', 
                d.title && (x += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (d.title || "&nbsp;") + "</div>"), 
                x += '<div class="ui-widget-content ui-dialog-content"></div>', x += "</div>") : x = q ? '<div class="blockUI ' + d.blockMsgClass + ' blockPage" style="z-index:' + (y + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + d.blockMsgClass + ' blockElement" style="z-index:' + (y + 10) + ';display:none;position:absolute"></div>', 
                w = a(x), r && (d.theme ? (w.css(p), w.addClass("ui-widget-content")) : w.css(f)), 
                d.theme || v.css(d.overlayCSS), v.css("position", q ? "fixed" : "absolute"), (k || d.forceIframe) && u.css("opacity", 0);
                var z = [ u, v, w ], A = a(q ? "body" : b);
                a.each(z, function() {
                    this.appendTo(A);
                }), d.theme && d.draggable && a.fn.draggable && w.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                });
                var B = m && (!a.support.boxModel || a("object,embed", q ? null : b).length > 0);
                if (l || B) {
                    if (q && d.allowBodyStretch && a.support.boxModel && a("html,body").css("height", "100%"), 
                    (l || !a.support.boxModel) && !q) var C = i(b, "borderTopWidth"), D = i(b, "borderLeftWidth"), E = C ? "(0 - " + C + ")" : 0, F = D ? "(0 - " + D + ")" : 0;
                    a.each(z, function(a, b) {
                        var c = b[0].style;
                        if (c.position = "absolute", 2 > a) q ? c.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + d.quirksmodeOffsetHack + ') + "px"') : c.setExpression("height", 'this.parentNode.offsetHeight + "px"'), 
                        q ? c.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : c.setExpression("width", 'this.parentNode.offsetWidth + "px"'), 
                        F && c.setExpression("left", F), E && c.setExpression("top", E); else if (d.centerY) q && c.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), 
                        c.marginTop = 0; else if (!d.centerY && q) {
                            var e = d.css && d.css.top ? parseInt(d.css.top, 10) : 0, f = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + e + ') + "px"';
                            c.setExpression("top", f);
                        }
                    });
                }
                if (r && (d.theme ? w.find(".ui-widget-content").append(r) : w.append(r), (r.jquery || r.nodeType) && a(r).show()), 
                (k || d.forceIframe) && d.showOverlay && u.show(), d.fadeIn) {
                    var G = d.onBlock ? d.onBlock : j, H = d.showOverlay && !r ? G : j, I = r ? G : j;
                    d.showOverlay && v._fadeIn(d.fadeIn, H), r && w._fadeIn(d.fadeIn, I);
                } else d.showOverlay && v.show(), r && w.show(), d.onBlock && d.onBlock();
                if (e(1, b, d), q ? (n = w[0], o = a(d.focusableElements, n), d.focusInput && setTimeout(g, 20)) : h(w[0], d.centerX, d.centerY), 
                d.timeout) {
                    var J = setTimeout(function() {
                        q ? a.unblockUI(d) : a(b).unblock(d);
                    }, d.timeout);
                    a(b).data("blockUI.timeout", J);
                }
            }
        }
        function c(b, c) {
            var f, g = b == window, h = a(b), i = h.data("blockUI.history"), j = h.data("blockUI.timeout");
            j && (clearTimeout(j), h.removeData("blockUI.timeout")), c = a.extend({}, a.blockUI.defaults, c || {}), 
            e(0, b, c), null === c.onUnblock && (c.onUnblock = h.data("blockUI.onUnblock"), 
            h.removeData("blockUI.onUnblock"));
            var k;
            k = g ? a("body").children().filter(".blockUI").add("body > .blockUI") : h.find(">.blockUI"), 
            c.cursorReset && (k.length > 1 && (k[1].style.cursor = c.cursorReset), k.length > 2 && (k[2].style.cursor = c.cursorReset)), 
            g && (n = o = null), c.fadeOut ? (f = k.length, k.stop().fadeOut(c.fadeOut, function() {
                0 === --f && d(k, i, c, b);
            })) : d(k, i, c, b);
        }
        function d(b, c, d, e) {
            var f = a(e);
            if (!f.data("blockUI.isBlocked")) {
                b.each(function() {
                    this.parentNode && this.parentNode.removeChild(this);
                }), c && c.el && (c.el.style.display = c.display, c.el.style.position = c.position, 
                c.parent && c.parent.appendChild(c.el), f.removeData("blockUI.history")), f.data("blockUI.static") && f.css("position", "static"), 
                "function" == typeof d.onUnblock && d.onUnblock(e, d);
                var g = a(document.body), h = g.width(), i = g[0].style.width;
                g.width(h - 1).width(h), g[0].style.width = i;
            }
        }
        function e(b, c, d) {
            var e = c == window, g = a(c);
            if ((b || (!e || n) && (e || g.data("blockUI.isBlocked"))) && (g.data("blockUI.isBlocked", b), 
            e && d.bindEvents && (!b || d.showOverlay))) {
                var h = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
                b ? a(document).bind(h, d, f) : a(document).unbind(h, f);
            }
        }
        function f(b) {
            if ("keydown" === b.type && b.keyCode && 9 == b.keyCode && n && b.data.constrainTabKey) {
                var c = o, d = !b.shiftKey && b.target === c[c.length - 1], e = b.shiftKey && b.target === c[0];
                if (d || e) return setTimeout(function() {
                    g(e);
                }, 10), !1;
            }
            var f = b.data, h = a(b.target);
            return h.hasClass("blockOverlay") && f.onOverlayClick && f.onOverlayClick(b), h.parents("div." + f.blockMsgClass).length > 0 ? !0 : 0 === h.parents().children().filter("div.blockUI").length;
        }
        function g(a) {
            if (o) {
                var b = o[a === !0 ? o.length - 1 : 0];
                b && b.focus();
            }
        }
        function h(a, b, c) {
            var d = a.parentNode, e = a.style, f = (d.offsetWidth - a.offsetWidth) / 2 - i(d, "borderLeftWidth"), g = (d.offsetHeight - a.offsetHeight) / 2 - i(d, "borderTopWidth");
            b && (e.left = f > 0 ? f + "px" : "0"), c && (e.top = g > 0 ? g + "px" : "0");
        }
        function i(b, c) {
            return parseInt(a.css(b, c), 10) || 0;
        }
        a.fn._fadeIn = a.fn.fadeIn;
        var j = a.noop || function() {}, k = /MSIE/.test(navigator.userAgent), l = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent), m = (document.documentMode || 0, 
        a.isFunction(document.createElement("div").style.setExpression));
        a.blockUI = function(a) {
            b(window, a);
        }, a.unblockUI = function(a) {
            c(window, a);
        }, a.growlUI = function(b, c, d, e) {
            var f = a('<div class="growlUI"></div>');
            b && f.append("<h1>" + b + "</h1>"), c && f.append("<h2>" + c + "</h2>"), void 0 === d && (d = 3e3);
            var g = function(b) {
                b = b || {}, a.blockUI({
                    message: f,
                    fadeIn: "undefined" != typeof b.fadeIn ? b.fadeIn : 700,
                    fadeOut: "undefined" != typeof b.fadeOut ? b.fadeOut : 1e3,
                    timeout: "undefined" != typeof b.timeout ? b.timeout : d,
                    centerY: !1,
                    showOverlay: !1,
                    onUnblock: e,
                    css: a.blockUI.defaults.growlCSS
                });
            };
            g(), f.css("opacity"), f.mouseover(function() {
                g({
                    fadeIn: 0,
                    timeout: 3e4
                });
                var b = a(".blockMsg");
                b.stop(), b.fadeTo(300, 1);
            }).mouseout(function() {
                a(".blockMsg").fadeOut(1e3);
            });
        }, a.fn.block = function(c) {
            if (this[0] === window) return a.blockUI(c), this;
            var d = a.extend({}, a.blockUI.defaults, c || {});
            return this.each(function() {
                var b = a(this);
                d.ignoreIfBlocked && b.data("blockUI.isBlocked") || b.unblock({
                    fadeOut: 0
                });
            }), this.each(function() {
                "static" == a.css(this, "position") && (this.style.position = "relative", a(this).data("blockUI.static", !0)), 
                this.style.zoom = 1, b(this, c);
            });
        }, a.fn.unblock = function(b) {
            return this[0] === window ? (a.unblockUI(b), this) : this.each(function() {
                c(this, b);
            });
        }, a.blockUI.version = 2.66, a.blockUI.defaults = {
            message: "<h1>Please wait...</h1>",
            title: null,
            draggable: !0,
            theme: !1,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: .6,
                cursor: "wait"
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: .6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1e3,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: !1
        };
        var n = null, o = [];
    }
    "function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], a) : a(jQuery);
}(), function(a) {
    "function" == typeof define && define.amd ? define([ "jquery" ], a) : a(jQuery);
}(function(a) {
    function b(a) {
        return a;
    }
    function c(a) {
        return decodeURIComponent(a.replace(e, " "));
    }
    function d(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return f.json ? JSON.parse(a) : a;
        } catch (b) {}
    }
    var e = /\+/g, f = a.cookie = function(e, g, h) {
        if (void 0 !== g) {
            if (h = a.extend({}, f.defaults, h), "number" == typeof h.expires) {
                var i = h.expires, j = h.expires = new Date();
                j.setDate(j.getDate() + i);
            }
            return g = f.json ? JSON.stringify(g) : String(g), document.cookie = [ f.raw ? e : encodeURIComponent(e), "=", f.raw ? g : encodeURIComponent(g), h.expires ? "; expires=" + h.expires.toUTCString() : "", h.path ? "; path=" + h.path : "", h.domain ? "; domain=" + h.domain : "", h.secure ? "; secure" : "" ].join("");
        }
        for (var k = f.raw ? b : c, l = document.cookie.split("; "), m = e ? void 0 : {}, n = 0, o = l.length; o > n; n++) {
            var p = l[n].split("="), q = k(p.shift()), r = k(p.join("="));
            if (e && e === q) {
                m = d(r);
                break;
            }
            e || (m[q] = d(r));
        }
        return m;
    };
    f.defaults = {}, a.removeCookie = function(b, c) {
        return void 0 !== a.cookie(b) ? (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })), !0) : !1;
    };
}), function(a, b) {
    "use strict";
    function c(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return a.prop ? a.prop.apply(a, b) : a.attr.apply(a, b);
    }
    function d(a, b, c) {
        var d, e;
        for (d in c) c.hasOwnProperty(d) && (e = d.replace(/ |$/g, b.eventNamespace), a.bind(e, c[d]));
    }
    function e(a, b, c) {
        d(a, c, {
            focus: function() {
                b.addClass(c.focusClass);
            },
            blur: function() {
                b.removeClass(c.focusClass), b.removeClass(c.activeClass);
            },
            mouseenter: function() {
                b.addClass(c.hoverClass);
            },
            mouseleave: function() {
                b.removeClass(c.hoverClass), b.removeClass(c.activeClass);
            },
            "mousedown touchbegin": function() {
                a.is(":disabled") || b.addClass(c.activeClass);
            },
            "mouseup touchend": function() {
                b.removeClass(c.activeClass);
            }
        });
    }
    function f(a, b) {
        a.removeClass(b.hoverClass + " " + b.focusClass + " " + b.activeClass);
    }
    function g(a, b, c) {
        c ? a.addClass(b) : a.removeClass(b);
    }
    function h(a, b, c) {
        var d = "checked", e = b.is(":" + d);
        b.prop ? b.prop(d, e) : e ? b.attr(d, d) : b.removeAttr(d), g(a, c.checkedClass, e);
    }
    function i(a, b, c) {
        g(a, c.disabledClass, b.is(":disabled"));
    }
    function j(a, b, c) {
        switch (c) {
          case "after":
            return a.after(b), a.next();

          case "before":
            return a.before(b), a.prev();

          case "wrap":
            return a.wrap(b), a.parent();
        }
        return null;
    }
    function k(b, d, e) {
        var f, g, h;
        return e || (e = {}), e = a.extend({
            bind: {},
            divClass: null,
            divWrap: "wrap",
            spanClass: null,
            spanHtml: null,
            spanWrap: "wrap"
        }, e), f = a("<div />"), g = a("<span />"), d.autoHide && b.is(":hidden") && "none" === b.css("display") && f.hide(), 
        e.divClass && f.addClass(e.divClass), d.wrapperClass && f.addClass(d.wrapperClass), 
        e.spanClass && g.addClass(e.spanClass), h = c(b, "id"), d.useID && h && c(f, "id", d.idPrefix + "-" + h), 
        e.spanHtml && g.html(e.spanHtml), f = j(b, f, e.divWrap), g = j(b, g, e.spanWrap), 
        i(f, b, d), {
            div: f,
            span: g
        };
    }
    function l(b, c) {
        var d;
        return c.wrapperClass ? (d = a("<span />").addClass(c.wrapperClass), d = j(b, d, "wrap")) : null;
    }
    function m() {
        var b, c, d, e;
        return e = "rgb(120,2,153)", c = a('<div style="width:0;height:0;color:' + e + '">'), 
        a("body").append(c), d = c.get(0), b = window.getComputedStyle ? window.getComputedStyle(d, "").color : (d.currentStyle || d.style || {}).color, 
        c.remove(), b.replace(/ /g, "") !== e;
    }
    function n(b) {
        return b ? a("<span />").text(b).html() : "";
    }
    function o() {
        return navigator.cpuClass && !navigator.product;
    }
    function p() {
        return void 0 !== window.XMLHttpRequest ? !0 : !1;
    }
    function q(a) {
        var b;
        return a[0].multiple ? !0 : (b = c(a, "size"), !b || 1 >= b ? !1 : !0);
    }
    function r() {
        return !1;
    }
    function s(a, b) {
        var c = "none";
        d(a, b, {
            "selectstart dragstart mousedown": r
        }), a.css({
            MozUserSelect: c,
            msUserSelect: c,
            webkitUserSelect: c,
            userSelect: c
        });
    }
    function t(a, b, c) {
        var d = a.val();
        "" === d ? d = c.fileDefaultHtml : (d = d.split(/[\/\\]+/), d = d[d.length - 1]), 
        b.text(d);
    }
    function u(a, b, c) {
        var d, e;
        for (d = [], a.each(function() {
            var a;
            for (a in b) Object.prototype.hasOwnProperty.call(b, a) && (d.push({
                el: this,
                name: a,
                old: this.style[a]
            }), this.style[a] = b[a]);
        }), c(); d.length; ) e = d.pop(), e.el.style[e.name] = e.old;
    }
    function v(a, b) {
        var c;
        c = a.parents(), c.push(a[0]), c = c.not(":visible"), u(c, {
            visibility: "hidden",
            display: "block",
            position: "absolute"
        }, b);
    }
    function w(a, b) {
        return function() {
            a.unwrap().unwrap().unbind(b.eventNamespace);
        };
    }
    var x = !0, y = !1, z = [ {
        match: function(a) {
            return a.is("a, button, :submit, :reset, input[type='button']");
        },
        apply: function(a, b) {
            var g, h, j, l, m;
            return h = b.submitDefaultHtml, a.is(":reset") && (h = b.resetDefaultHtml), l = a.is("a, button") ? function() {
                return a.html() || h;
            } : function() {
                return n(c(a, "value")) || h;
            }, j = k(a, b, {
                divClass: b.buttonClass,
                spanHtml: l()
            }), g = j.div, e(a, g, b), m = !1, d(g, b, {
                "click touchend": function() {
                    var b, d, e, f;
                    m || a.is(":disabled") || (m = !0, a[0].dispatchEvent ? (b = document.createEvent("MouseEvents"), 
                    b.initEvent("click", !0, !0), d = a[0].dispatchEvent(b), a.is("a") && d && (e = c(a, "target"), 
                    f = c(a, "href"), e && "_self" !== e ? window.open(f, e) : document.location.href = f)) : a.click(), 
                    m = !1);
                }
            }), s(g, b), {
                remove: function() {
                    return g.after(a), g.remove(), a.unbind(b.eventNamespace), a;
                },
                update: function() {
                    f(g, b), i(g, a, b), a.detach(), j.span.html(l()).append(a);
                }
            };
        }
    }, {
        match: function(a) {
            return a.is(":checkbox");
        },
        apply: function(a, b) {
            var c, g, j;
            return c = k(a, b, {
                divClass: b.checkboxClass
            }), g = c.div, j = c.span, e(a, g, b), d(a, b, {
                "click touchend": function() {
                    h(j, a, b);
                }
            }), h(j, a, b), {
                remove: w(a, b),
                update: function() {
                    f(g, b), j.removeClass(b.checkedClass), h(j, a, b), i(g, a, b);
                }
            };
        }
    }, {
        match: function(a) {
            return a.is(":file");
        },
        apply: function(b, g) {
            function h() {
                t(b, n, g);
            }
            var l, m, n, p;
            return l = k(b, g, {
                divClass: g.fileClass,
                spanClass: g.fileButtonClass,
                spanHtml: g.fileButtonHtml,
                spanWrap: "after"
            }), m = l.div, p = l.span, n = a("<span />").html(g.fileDefaultHtml), n.addClass(g.filenameClass), 
            n = j(b, n, "after"), c(b, "size") || c(b, "size", m.width() / 10), e(b, m, g), 
            h(), o() ? d(b, g, {
                click: function() {
                    b.trigger("change"), setTimeout(h, 0);
                }
            }) : d(b, g, {
                change: h
            }), s(n, g), s(p, g), {
                remove: function() {
                    return n.remove(), p.remove(), b.unwrap().unbind(g.eventNamespace);
                },
                update: function() {
                    f(m, g), t(b, n, g), i(m, b, g);
                }
            };
        }
    }, {
        match: function(a) {
            if (a.is("input")) {
                var b = (" " + c(a, "type") + " ").toLowerCase(), d = " color date datetime datetime-local email month number password search tel text time url week ";
                return d.indexOf(b) >= 0;
            }
            return !1;
        },
        apply: function(a, b) {
            var d, f;
            return d = c(a, "type"), a.addClass(b.inputClass), f = l(a, b), e(a, a, b), b.inputAddTypeAsClass && a.addClass(d), 
            {
                remove: function() {
                    a.removeClass(b.inputClass), b.inputAddTypeAsClass && a.removeClass(d), f && a.unwrap();
                },
                update: r
            };
        }
    }, {
        match: function(a) {
            return a.is(":radio");
        },
        apply: function(b, g) {
            var j, l, m;
            return j = k(b, g, {
                divClass: g.radioClass
            }), l = j.div, m = j.span, e(b, l, g), d(b, g, {
                "click touchend": function() {
                    a.uniform.update(a(':radio[name="' + c(b, "name") + '"]'));
                }
            }), h(m, b, g), {
                remove: w(b, g),
                update: function() {
                    f(l, g), h(m, b, g), i(l, b, g);
                }
            };
        }
    }, {
        match: function(a) {
            return a.is("select") && !q(a) ? !0 : !1;
        },
        apply: function(b, c) {
            var g, h, j, l;
            return c.selectAutoWidth && v(b, function() {
                l = b.width();
            }), g = k(b, c, {
                divClass: c.selectClass,
                spanHtml: (b.find(":selected:first") || b.find("option:first")).html(),
                spanWrap: "before"
            }), h = g.div, j = g.span, c.selectAutoWidth ? v(b, function() {
                u(a([ j[0], h[0] ]), {
                    display: "block"
                }, function() {
                    var a;
                    a = j.outerWidth() - j.width(), h.width(l + a), j.width(l);
                });
            }) : h.addClass("fixedWidth"), e(b, h, c), d(b, c, {
                change: function() {
                    j.html(b.find(":selected").html()), h.removeClass(c.activeClass);
                },
                "click touchend": function() {
                    var a = b.find(":selected").html();
                    j.html() !== a && b.trigger("change");
                },
                keyup: function() {
                    j.html(b.find(":selected").html());
                }
            }), s(j, c), {
                remove: function() {
                    return j.remove(), b.unwrap().unbind(c.eventNamespace), b;
                },
                update: function() {
                    c.selectAutoWidth ? (a.uniform.restore(b), b.uniform(c)) : (f(h, c), j.html(b.find(":selected").html()), 
                    i(h, b, c));
                }
            };
        }
    }, {
        match: function(a) {
            return a.is("select") && q(a) ? !0 : !1;
        },
        apply: function(a, b) {
            var c;
            return a.addClass(b.selectMultiClass), c = l(a, b), e(a, a, b), {
                remove: function() {
                    a.removeClass(b.selectMultiClass), c && a.unwrap();
                },
                update: r
            };
        }
    }, {
        match: function(a) {
            return a.is("textarea");
        },
        apply: function(a, b) {
            var c;
            return a.addClass(b.textareaClass), c = l(a, b), e(a, a, b), {
                remove: function() {
                    a.removeClass(b.textareaClass), c && a.unwrap();
                },
                update: r
            };
        }
    } ];
    o() && !p() && (x = !1), a.uniform = {
        defaults: {
            activeClass: "active",
            autoHide: !0,
            buttonClass: "button",
            checkboxClass: "checker",
            checkedClass: "checked",
            disabledClass: "disabled",
            eventNamespace: ".uniform",
            fileButtonClass: "action",
            fileButtonHtml: "Choose File",
            fileClass: "uploader",
            fileDefaultHtml: "No file selected",
            filenameClass: "filename",
            focusClass: "focus",
            hoverClass: "hover",
            idPrefix: "uniform",
            inputAddTypeAsClass: !0,
            inputClass: "uniform-input",
            radioClass: "radio",
            resetDefaultHtml: "Reset",
            resetSelector: !1,
            selectAutoWidth: !0,
            selectClass: "selector",
            selectMultiClass: "uniform-multiselect",
            submitDefaultHtml: "Submit",
            textareaClass: "uniform",
            useID: !0,
            wrapperClass: null
        },
        elements: []
    }, a.fn.uniform = function(b) {
        var c = this;
        return b = a.extend({}, a.uniform.defaults, b), y || (y = !0, m() && (x = !1)), 
        x ? (b.resetSelector && a(b.resetSelector).mouseup(function() {
            window.setTimeout(function() {
                a.uniform.update(c);
            }, 10);
        }), this.each(function() {
            var c, d, e, f = a(this);
            if (f.data("uniformed")) return void a.uniform.update(f);
            for (c = 0; z.length > c; c += 1) if (d = z[c], d.match(f, b)) return e = d.apply(f, b), 
            f.data("uniformed", e), void a.uniform.elements.push(f.get(0));
        })) : this;
    }, a.uniform.restore = a.fn.uniform.restore = function(c) {
        c === b && (c = a.uniform.elements), a(c).each(function() {
            var b, c, d = a(this);
            c = d.data("uniformed"), c && (c.remove(), b = a.inArray(this, a.uniform.elements), 
            b >= 0 && a.uniform.elements.splice(b, 1), d.removeData("uniformed"));
        });
    }, a.uniform.update = a.fn.uniform.update = function(c) {
        c === b && (c = a.uniform.elements), a(c).each(function() {
            var b, c = a(this);
            b = c.data("uniformed"), b && b.update(c, b.options);
        });
    };
}(jQuery), function() {
    var a = [].slice;
    !function(b, c) {
        "use strict";
        var d;
        return d = function() {
            function a(a, c) {
                null == c && (c = {}), this.$element = b(a), this.options = b.extend({}, b.fn.bootstrapSwitch.defaults, {
                    state: this.$element.is(":checked"),
                    size: this.$element.data("size"),
                    animate: this.$element.data("animate"),
                    disabled: this.$element.is(":disabled"),
                    readonly: this.$element.is("[readonly]"),
                    indeterminate: this.$element.data("indeterminate"),
                    onColor: this.$element.data("on-color"),
                    offColor: this.$element.data("off-color"),
                    onText: this.$element.data("on-text"),
                    offText: this.$element.data("off-text"),
                    labelText: this.$element.data("label-text"),
                    baseClass: this.$element.data("base-class"),
                    wrapperClass: this.$element.data("wrapper-class"),
                    radioAllOff: this.$element.data("radio-all-off")
                }, c), this.$wrapper = b("<div>", {
                    "class": function(a) {
                        return function() {
                            var b;
                            return b = [ "" + a.options.baseClass ].concat(a._getClasses(a.options.wrapperClass)), 
                            b.push(a.options.state ? "" + a.options.baseClass + "-on" : "" + a.options.baseClass + "-off"), 
                            null != a.options.size && b.push("" + a.options.baseClass + "-" + a.options.size), 
                            a.options.animate && b.push("" + a.options.baseClass + "-animate"), a.options.disabled && b.push("" + a.options.baseClass + "-disabled"), 
                            a.options.readonly && b.push("" + a.options.baseClass + "-readonly"), a.options.indeterminate && b.push("" + a.options.baseClass + "-indeterminate"), 
                            a.$element.attr("id") && b.push("" + a.options.baseClass + "-id-" + a.$element.attr("id")), 
                            b.join(" ");
                        };
                    }(this)()
                }), this.$container = b("<div>", {
                    "class": "" + this.options.baseClass + "-container"
                }), this.$on = b("<span>", {
                    html: this.options.onText,
                    "class": "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor
                }), this.$off = b("<span>", {
                    html: this.options.offText,
                    "class": "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor
                }), this.$label = b("<label>", {
                    html: this.options.labelText,
                    "class": "" + this.options.baseClass + "-label"
                }), this.options.indeterminate && this.$element.prop("indeterminate", !0), this.$element.on("init.bootstrapSwitch", function(b) {
                    return function() {
                        return b.options.onInit.apply(a, arguments);
                    };
                }(this)), this.$element.on("switchChange.bootstrapSwitch", function(b) {
                    return function() {
                        return b.options.onSwitchChange.apply(a, arguments);
                    };
                }(this)), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), 
                this.$element.before(this.$on).before(this.$label).before(this.$off).trigger("init.bootstrapSwitch"), 
                this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler();
            }
            return a.prototype._constructor = a, a.prototype.state = function(a, b) {
                return "undefined" == typeof a ? this.options.state : this.options.disabled || this.options.readonly || this.options.indeterminate ? this.$element : this.options.state && !this.options.radioAllOff && this.$element.is(":radio") ? this.$element : (a = !!a, 
                this.$element.prop("checked", a).trigger("change.bootstrapSwitch", b), this.$element);
            }, a.prototype.toggleState = function(a) {
                return this.options.disabled || this.options.readonly || this.options.indeterminate ? this.$element : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", a);
            }, a.prototype.size = function(a) {
                return "undefined" == typeof a ? this.options.size : (null != this.options.size && this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size), 
                a && this.$wrapper.addClass("" + this.options.baseClass + "-" + a), this.options.size = a, 
                this.$element);
            }, a.prototype.animate = function(a) {
                return "undefined" == typeof a ? this.options.animate : (a = !!a, this.$wrapper[a ? "addClass" : "removeClass"]("" + this.options.baseClass + "-animate"), 
                this.options.animate = a, this.$element);
            }, a.prototype.disabled = function(a) {
                return "undefined" == typeof a ? this.options.disabled : (a = !!a, this.$wrapper[a ? "addClass" : "removeClass"]("" + this.options.baseClass + "-disabled"), 
                this.$element.prop("disabled", a), this.options.disabled = a, this.$element);
            }, a.prototype.toggleDisabled = function() {
                return this.$element.prop("disabled", !this.options.disabled), this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled"), 
                this.options.disabled = !this.options.disabled, this.$element;
            }, a.prototype.readonly = function(a) {
                return "undefined" == typeof a ? this.options.readonly : (a = !!a, this.$wrapper[a ? "addClass" : "removeClass"]("" + this.options.baseClass + "-readonly"), 
                this.$element.prop("readonly", a), this.options.readonly = a, this.$element);
            }, a.prototype.toggleReadonly = function() {
                return this.$element.prop("readonly", !this.options.readonly), this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly"), 
                this.options.readonly = !this.options.readonly, this.$element;
            }, a.prototype.indeterminate = function(a) {
                return "undefined" == typeof a ? this.options.indeterminate : (a = !!a, this.$wrapper[a ? "addClass" : "removeClass"]("" + this.options.baseClass + "-indeterminate"), 
                this.$element.prop("indeterminate", a), this.options.indeterminate = a, this.$element);
            }, a.prototype.toggleIndeterminate = function() {
                return this.$element.prop("indeterminate", !this.options.indeterminate), this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate"), 
                this.options.indeterminate = !this.options.indeterminate, this.$element;
            }, a.prototype.onColor = function(a) {
                var b;
                return b = this.options.onColor, "undefined" == typeof a ? b : (null != b && this.$on.removeClass("" + this.options.baseClass + "-" + b), 
                this.$on.addClass("" + this.options.baseClass + "-" + a), this.options.onColor = a, 
                this.$element);
            }, a.prototype.offColor = function(a) {
                var b;
                return b = this.options.offColor, "undefined" == typeof a ? b : (null != b && this.$off.removeClass("" + this.options.baseClass + "-" + b), 
                this.$off.addClass("" + this.options.baseClass + "-" + a), this.options.offColor = a, 
                this.$element);
            }, a.prototype.onText = function(a) {
                return "undefined" == typeof a ? this.options.onText : (this.$on.html(a), this.options.onText = a, 
                this.$element);
            }, a.prototype.offText = function(a) {
                return "undefined" == typeof a ? this.options.offText : (this.$off.html(a), this.options.offText = a, 
                this.$element);
            }, a.prototype.labelText = function(a) {
                return "undefined" == typeof a ? this.options.labelText : (this.$label.html(a), 
                this.options.labelText = a, this.$element);
            }, a.prototype.baseClass = function() {
                return this.options.baseClass;
            }, a.prototype.wrapperClass = function(a) {
                return "undefined" == typeof a ? this.options.wrapperClass : (a || (a = b.fn.bootstrapSwitch.defaults.wrapperClass), 
                this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")), 
                this.$wrapper.addClass(this._getClasses(a).join(" ")), this.options.wrapperClass = a, 
                this.$element);
            }, a.prototype.radioAllOff = function(a) {
                return "undefined" == typeof a ? this.options.radioAllOff : (this.options.radioAllOff = a, 
                this.$element);
            }, a.prototype.onInit = function(a) {
                return "undefined" == typeof a ? this.options.onInit : (a || (a = b.fn.bootstrapSwitch.defaults.onInit), 
                this.options.onInit = a, this.$element);
            }, a.prototype.onSwitchChange = function(a) {
                return "undefined" == typeof a ? this.options.onSwitchChange : (a || (a = b.fn.bootstrapSwitch.defaults.onSwitchChange), 
                this.options.onSwitchChange = a, this.$element);
            }, a.prototype.destroy = function() {
                var a;
                return a = this.$element.closest("form"), a.length && a.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), 
                this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), 
                this.$element;
            }, a.prototype._elementHandlers = function() {
                return this.$element.on({
                    "change.bootstrapSwitch": function(a) {
                        return function(c, d) {
                            var e;
                            return c.preventDefault(), c.stopImmediatePropagation(), e = a.$element.is(":checked"), 
                            e !== a.options.state ? (a.options.state = e, a.$wrapper.removeClass(e ? "" + a.options.baseClass + "-off" : "" + a.options.baseClass + "-on").addClass(e ? "" + a.options.baseClass + "-on" : "" + a.options.baseClass + "-off"), 
                            d ? void 0 : (a.$element.is(":radio") && b("[name='" + a.$element.attr("name") + "']").not(a.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), 
                            a.$element.trigger("switchChange.bootstrapSwitch", [ e ]))) : void 0;
                        };
                    }(this),
                    "focus.bootstrapSwitch": function(a) {
                        return function(b) {
                            return b.preventDefault(), a.$wrapper.addClass("" + a.options.baseClass + "-focused");
                        };
                    }(this),
                    "blur.bootstrapSwitch": function(a) {
                        return function(b) {
                            return b.preventDefault(), a.$wrapper.removeClass("" + a.options.baseClass + "-focused");
                        };
                    }(this),
                    "keydown.bootstrapSwitch": function(a) {
                        return function(b) {
                            if (b.which && !a.options.disabled && !a.options.readonly && !a.options.indeterminate) switch (b.which) {
                              case 37:
                                return b.preventDefault(), b.stopImmediatePropagation(), a.state(!1);

                              case 39:
                                return b.preventDefault(), b.stopImmediatePropagation(), a.state(!0);
                            }
                        };
                    }(this)
                });
            }, a.prototype._handleHandlers = function() {
                return this.$on.on("click.bootstrapSwitch", function(a) {
                    return function() {
                        return a.state(!1), a.$element.trigger("focus.bootstrapSwitch");
                    };
                }(this)), this.$off.on("click.bootstrapSwitch", function(a) {
                    return function() {
                        return a.state(!0), a.$element.trigger("focus.bootstrapSwitch");
                    };
                }(this));
            }, a.prototype._labelHandlers = function() {
                return this.$label.on({
                    "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function(a) {
                        return function(b) {
                            var c, d, e, f;
                            return a.isLabelDragging ? (b.preventDefault(), a.isLabelDragged = !0, d = b.pageX || b.originalEvent.touches[0].pageX, 
                            e = (d - a.$wrapper.offset().left) / a.$wrapper.width() * 100, c = 25, f = 75, a.options.animate && a.$wrapper.removeClass("" + a.options.baseClass + "-animate"), 
                            c > e ? e = c : e > f && (e = f), a.$container.css("margin-left", "" + (e - f) + "%"), 
                            a.$element.trigger("focus.bootstrapSwitch")) : void 0;
                        };
                    }(this),
                    "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function(a) {
                        return function(b) {
                            return a.isLabelDragging || a.options.disabled || a.options.readonly || a.options.indeterminate ? void 0 : (b.preventDefault(), 
                            a.isLabelDragging = !0, a.$element.trigger("focus.bootstrapSwitch"));
                        };
                    }(this),
                    "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function(a) {
                        return function(b) {
                            return a.isLabelDragging ? (b.preventDefault(), a.isLabelDragged ? (a.isLabelDragged = !1, 
                            a.state(parseInt(a.$container.css("margin-left"), 10) > -(a.$container.width() / 6)), 
                            a.options.animate && a.$wrapper.addClass("" + a.options.baseClass + "-animate"), 
                            a.$container.css("margin-left", "")) : a.state(!a.options.state), a.isLabelDragging = !1) : void 0;
                        };
                    }(this),
                    "mouseleave.bootstrapSwitch": function(a) {
                        return function() {
                            return a.$label.trigger("mouseup.bootstrapSwitch");
                        };
                    }(this)
                });
            }, a.prototype._formHandler = function() {
                var a;
                return a = this.$element.closest("form"), a.data("bootstrap-switch") ? void 0 : a.on("reset.bootstrapSwitch", function() {
                    return c.setTimeout(function() {
                        return a.find("input").filter(function() {
                            return b(this).data("bootstrap-switch");
                        }).each(function() {
                            return b(this).bootstrapSwitch("state", this.checked);
                        });
                    }, 1);
                }).data("bootstrap-switch", !0);
            }, a.prototype._getClasses = function(a) {
                var c, d, e, f;
                if (!b.isArray(a)) return [ "" + this.options.baseClass + "-" + a ];
                for (d = [], e = 0, f = a.length; f > e; e++) c = a[e], d.push("" + this.options.baseClass + "-" + c);
                return d;
            }, a;
        }(), b.fn.bootstrapSwitch = function() {
            var c, e, f;
            return e = arguments[0], c = 2 <= arguments.length ? a.call(arguments, 1) : [], 
            f = this, this.each(function() {
                var a, g;
                return a = b(this), g = a.data("bootstrap-switch"), g || a.data("bootstrap-switch", g = new d(this, e)), 
                "string" == typeof e ? f = g[e].apply(g, c) : void 0;
            }), f;
        }, b.fn.bootstrapSwitch.Constructor = d, b.fn.bootstrapSwitch.defaults = {
            state: !0,
            size: null,
            animate: !0,
            disabled: !1,
            readonly: !1,
            indeterminate: !1,
            onColor: "primary",
            offColor: "default",
            onText: "ON",
            offText: "OFF",
            labelText: "&nbsp;",
            baseClass: "bootstrap-switch",
            wrapperClass: "wrapper",
            radioAllOff: !1,
            onInit: function() {},
            onSwitchChange: function() {}
        };
    }(window.jQuery, window);
}.call(this), function(a) {
    function b(a, b, c) {
        switch (arguments.length) {
          case 2:
            return null != a ? a : b;

          case 3:
            return null != a ? a : null != b ? b : c;

          default:
            throw new Error("Implement me");
        }
    }
    function c(a, b) {
        return zb.call(a, b);
    }
    function d() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }
    function e(a) {
        tb.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a);
    }
    function f(a, b) {
        var c = !0;
        return m(function() {
            return c && (e(a), c = !1), b.apply(this, arguments);
        }, b);
    }
    function g(a, b) {
        qc[a] || (e(b), qc[a] = !0);
    }
    function h(a, b) {
        return function(c) {
            return p(a.call(this, c), b);
        };
    }
    function i(a, b) {
        return function(c) {
            return this.localeData().ordinal(a.call(this, c), b);
        };
    }
    function j() {}
    function k(a, b) {
        b !== !1 && F(a), n(this, a), this._d = new Date(+a._d);
    }
    function l(a) {
        var b = y(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
        this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, 
        this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = tb.localeData(), 
        this._bubble();
    }
    function m(a, b) {
        for (var d in b) c(b, d) && (a[d] = b[d]);
        return c(b, "toString") && (a.toString = b.toString), c(b, "valueOf") && (a.valueOf = b.valueOf), 
        a;
    }
    function n(a, b) {
        var c, d, e;
        if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), 
        "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), 
        "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), 
        "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), 
        "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = b._pf), 
        "undefined" != typeof b._locale && (a._locale = b._locale), Ib.length > 0) for (c in Ib) d = Ib[c], 
        e = b[d], "undefined" != typeof e && (a[d] = e);
        return a;
    }
    function o(a) {
        return 0 > a ? Math.ceil(a) : Math.floor(a);
    }
    function p(a, b, c) {
        for (var d = "" + Math.abs(a), e = a >= 0; d.length < b; ) d = "0" + d;
        return (e ? c ? "+" : "" : "-") + d;
    }
    function q(a, b) {
        var c = {
            milliseconds: 0,
            months: 0
        };
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, 
        c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
    }
    function r(a, b) {
        var c;
        return b = K(b, a), a.isBefore(b) ? c = q(a, b) : (c = q(b, a), c.milliseconds = -c.milliseconds, 
        c.months = -c.months), c;
    }
    function s(a, b) {
        return function(c, d) {
            var e, f;
            return null === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), 
            f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = tb.duration(c, d), 
            t(this, e, a), this;
        };
    }
    function t(a, b, c, d) {
        var e = b._milliseconds, f = b._days, g = b._months;
        d = null == d ? !0 : d, e && a._d.setTime(+a._d + e * c), f && nb(a, "Date", mb(a, "Date") + f * c), 
        g && lb(a, mb(a, "Month") + g * c), d && tb.updateOffset(a, f || g);
    }
    function u(a) {
        return "[object Array]" === Object.prototype.toString.call(a);
    }
    function v(a) {
        return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date;
    }
    function w(a, b, c) {
        var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
        for (d = 0; e > d; d++) (c && a[d] !== b[d] || !c && A(a[d]) !== A(b[d])) && g++;
        return g + f;
    }
    function x(a) {
        if (a) {
            var b = a.toLowerCase().replace(/(.)s$/, "$1");
            a = jc[a] || kc[b] || b;
        }
        return a;
    }
    function y(a) {
        var b, d, e = {};
        for (d in a) c(a, d) && (b = x(d), b && (e[b] = a[d]));
        return e;
    }
    function z(b) {
        var c, d;
        if (0 === b.indexOf("week")) c = 7, d = "day"; else {
            if (0 !== b.indexOf("month")) return;
            c = 12, d = "month";
        }
        tb[b] = function(e, f) {
            var g, h, i = tb._locale[b], j = [];
            if ("number" == typeof e && (f = e, e = a), h = function(a) {
                var b = tb().utc().set(d, a);
                return i.call(tb._locale, b, e || "");
            }, null != f) return h(f);
            for (g = 0; c > g; g++) j.push(h(g));
            return j;
        };
    }
    function A(a) {
        var b = +a, c = 0;
        return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c;
    }
    function B(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
    }
    function C(a, b, c) {
        return hb(tb([ a, 11, 31 + b - c ]), b, c).week;
    }
    function D(a) {
        return E(a) ? 366 : 365;
    }
    function E(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
    }
    function F(a) {
        var b;
        a._a && -2 === a._pf.overflow && (b = a._a[Bb] < 0 || a._a[Bb] > 11 ? Bb : a._a[Cb] < 1 || a._a[Cb] > B(a._a[Ab], a._a[Bb]) ? Cb : a._a[Db] < 0 || a._a[Db] > 23 ? Db : a._a[Eb] < 0 || a._a[Eb] > 59 ? Eb : a._a[Fb] < 0 || a._a[Fb] > 59 ? Fb : a._a[Gb] < 0 || a._a[Gb] > 999 ? Gb : -1, 
        a._pf._overflowDayOfYear && (Ab > b || b > Cb) && (b = Cb), a._pf.overflow = b);
    }
    function G(a) {
        return null == a._isValid && (a._isValid = !isNaN(a._d.getTime()) && a._pf.overflow < 0 && !a._pf.empty && !a._pf.invalidMonth && !a._pf.nullInput && !a._pf.invalidFormat && !a._pf.userInvalidated, 
        a._strict && (a._isValid = a._isValid && 0 === a._pf.charsLeftOver && 0 === a._pf.unusedTokens.length)), 
        a._isValid;
    }
    function H(a) {
        return a ? a.toLowerCase().replace("_", "-") : a;
    }
    function I(a) {
        for (var b, c, d, e, f = 0; f < a.length; ) {
            for (e = H(a[f]).split("-"), b = e.length, c = H(a[f + 1]), c = c ? c.split("-") : null; b > 0; ) {
                if (d = J(e.slice(0, b).join("-"))) return d;
                if (c && c.length >= b && w(e, c, !0) >= b - 1) break;
                b--;
            }
            f++;
        }
        return null;
    }
    function J(a) {
        var b = null;
        if (!Hb[a] && Jb) try {
            b = tb.locale(), require("./locale/" + a), tb.locale(b);
        } catch (c) {}
        return Hb[a];
    }
    function K(a, b) {
        return b._isUTC ? tb(a).zone(b._offset || 0) : tb(a).local();
    }
    function L(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
    }
    function M(a) {
        var b, c, d = a.match(Nb);
        for (b = 0, c = d.length; c > b; b++) d[b] = pc[d[b]] ? pc[d[b]] : L(d[b]);
        return function(e) {
            var f = "";
            for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
            return f;
        };
    }
    function N(a, b) {
        return a.isValid() ? (b = O(b, a.localeData()), lc[b] || (lc[b] = M(b)), lc[b](a)) : a.localeData().invalidDate();
    }
    function O(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a;
        }
        var d = 5;
        for (Ob.lastIndex = 0; d >= 0 && Ob.test(a); ) a = a.replace(Ob, c), Ob.lastIndex = 0, 
        d -= 1;
        return a;
    }
    function P(a, b) {
        var c, d = b._strict;
        switch (a) {
          case "Q":
            return Zb;

          case "DDDD":
            return _b;

          case "YYYY":
          case "GGGG":
          case "gggg":
            return d ? ac : Rb;

          case "Y":
          case "G":
          case "g":
            return cc;

          case "YYYYYY":
          case "YYYYY":
          case "GGGGG":
          case "ggggg":
            return d ? bc : Sb;

          case "S":
            if (d) return Zb;

          case "SS":
            if (d) return $b;

          case "SSS":
            if (d) return _b;

          case "DDD":
            return Qb;

          case "MMM":
          case "MMMM":
          case "dd":
          case "ddd":
          case "dddd":
            return Ub;

          case "a":
          case "A":
            return b._locale._meridiemParse;

          case "X":
            return Xb;

          case "Z":
          case "ZZ":
            return Vb;

          case "T":
            return Wb;

          case "SSSS":
            return Tb;

          case "MM":
          case "DD":
          case "YY":
          case "GG":
          case "gg":
          case "HH":
          case "hh":
          case "mm":
          case "ss":
          case "ww":
          case "WW":
            return d ? $b : Pb;

          case "M":
          case "D":
          case "d":
          case "H":
          case "h":
          case "m":
          case "s":
          case "w":
          case "W":
          case "e":
          case "E":
            return Pb;

          case "Do":
            return Yb;

          default:
            return c = new RegExp(Y(X(a.replace("\\", "")), "i"));
        }
    }
    function Q(a) {
        a = a || "";
        var b = a.match(Vb) || [], c = b[b.length - 1] || [], d = (c + "").match(hc) || [ "-", 0, 0 ], e = +(60 * d[1]) + A(d[2]);
        return "+" === d[0] ? -e : e;
    }
    function R(a, b, c) {
        var d, e = c._a;
        switch (a) {
          case "Q":
            null != b && (e[Bb] = 3 * (A(b) - 1));
            break;

          case "M":
          case "MM":
            null != b && (e[Bb] = A(b) - 1);
            break;

          case "MMM":
          case "MMMM":
            d = c._locale.monthsParse(b), null != d ? e[Bb] = d : c._pf.invalidMonth = b;
            break;

          case "D":
          case "DD":
            null != b && (e[Cb] = A(b));
            break;

          case "Do":
            null != b && (e[Cb] = A(parseInt(b, 10)));
            break;

          case "DDD":
          case "DDDD":
            null != b && (c._dayOfYear = A(b));
            break;

          case "YY":
            e[Ab] = tb.parseTwoDigitYear(b);
            break;

          case "YYYY":
          case "YYYYY":
          case "YYYYYY":
            e[Ab] = A(b);
            break;

          case "a":
          case "A":
            c._isPm = c._locale.isPM(b);
            break;

          case "H":
          case "HH":
          case "h":
          case "hh":
            e[Db] = A(b);
            break;

          case "m":
          case "mm":
            e[Eb] = A(b);
            break;

          case "s":
          case "ss":
            e[Fb] = A(b);
            break;

          case "S":
          case "SS":
          case "SSS":
          case "SSSS":
            e[Gb] = A(1e3 * ("0." + b));
            break;

          case "X":
            c._d = new Date(1e3 * parseFloat(b));
            break;

          case "Z":
          case "ZZ":
            c._useUTC = !0, c._tzm = Q(b);
            break;

          case "dd":
          case "ddd":
          case "dddd":
            d = c._locale.weekdaysParse(b), null != d ? (c._w = c._w || {}, c._w.d = d) : c._pf.invalidWeekday = b;
            break;

          case "w":
          case "ww":
          case "W":
          case "WW":
          case "d":
          case "e":
          case "E":
            a = a.substr(0, 1);

          case "gggg":
          case "GGGG":
          case "GGGGG":
            a = a.substr(0, 2), b && (c._w = c._w || {}, c._w[a] = A(b));
            break;

          case "gg":
          case "GG":
            c._w = c._w || {}, c._w[a] = tb.parseTwoDigitYear(b);
        }
    }
    function S(a) {
        var c, d, e, f, g, h, i;
        c = a._w, null != c.GG || null != c.W || null != c.E ? (g = 1, h = 4, d = b(c.GG, a._a[Ab], hb(tb(), 1, 4).year), 
        e = b(c.W, 1), f = b(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, 
        d = b(c.gg, a._a[Ab], hb(tb(), g, h).year), e = b(c.w, 1), null != c.d ? (f = c.d, 
        g > f && ++e) : f = null != c.e ? c.e + g : g), i = ib(d, e, f, h, g), a._a[Ab] = i.year, 
        a._dayOfYear = i.dayOfYear;
    }
    function T(a) {
        var c, d, e, f, g = [];
        if (!a._d) {
            for (e = V(a), a._w && null == a._a[Cb] && null == a._a[Bb] && S(a), a._dayOfYear && (f = b(a._a[Ab], e[Ab]), 
            a._dayOfYear > D(f) && (a._pf._overflowDayOfYear = !0), d = db(f, 0, a._dayOfYear), 
            a._a[Bb] = d.getUTCMonth(), a._a[Cb] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c) a._a[c] = g[c] = e[c];
            for (;7 > c; c++) a._a[c] = g[c] = null == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
            a._d = (a._useUTC ? db : cb).apply(null, g), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() + a._tzm);
        }
    }
    function U(a) {
        var b;
        a._d || (b = y(a._i), a._a = [ b.year, b.month, b.day, b.hour, b.minute, b.second, b.millisecond ], 
        T(a));
    }
    function V(a) {
        var b = new Date();
        return a._useUTC ? [ b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate() ] : [ b.getFullYear(), b.getMonth(), b.getDate() ];
    }
    function W(a) {
        if (a._f === tb.ISO_8601) return void $(a);
        a._a = [], a._pf.empty = !0;
        var b, c, d, e, f, g = "" + a._i, h = g.length, i = 0;
        for (d = O(a._f, a._locale).match(Nb) || [], b = 0; b < d.length; b++) e = d[b], 
        c = (g.match(P(e, a)) || [])[0], c && (f = g.substr(0, g.indexOf(c)), f.length > 0 && a._pf.unusedInput.push(f), 
        g = g.slice(g.indexOf(c) + c.length), i += c.length), pc[e] ? (c ? a._pf.empty = !1 : a._pf.unusedTokens.push(e), 
        R(e, c, a)) : a._strict && !c && a._pf.unusedTokens.push(e);
        a._pf.charsLeftOver = h - i, g.length > 0 && a._pf.unusedInput.push(g), a._isPm && a._a[Db] < 12 && (a._a[Db] += 12), 
        a._isPm === !1 && 12 === a._a[Db] && (a._a[Db] = 0), T(a), F(a);
    }
    function X(a) {
        return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
            return b || c || d || e;
        });
    }
    function Y(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function Z(a) {
        var b, c, e, f, g;
        if (0 === a._f.length) return a._pf.invalidFormat = !0, void (a._d = new Date(0/0));
        for (f = 0; f < a._f.length; f++) g = 0, b = n({}, a), null != a._useUTC && (b._useUTC = a._useUTC), 
        b._pf = d(), b._f = a._f[f], W(b), G(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, 
        b._pf.score = g, (null == e || e > g) && (e = g, c = b));
        m(a, c || b);
    }
    function $(a) {
        var b, c, d = a._i, e = dc.exec(d);
        if (e) {
            for (a._pf.iso = !0, b = 0, c = fc.length; c > b; b++) if (fc[b][1].exec(d)) {
                a._f = fc[b][0] + (e[6] || " ");
                break;
            }
            for (b = 0, c = gc.length; c > b; b++) if (gc[b][1].exec(d)) {
                a._f += gc[b][0];
                break;
            }
            d.match(Vb) && (a._f += "Z"), W(a);
        } else a._isValid = !1;
    }
    function _(a) {
        $(a), a._isValid === !1 && (delete a._isValid, tb.createFromInputFallback(a));
    }
    function ab(a, b) {
        var c, d = [];
        for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
        return d;
    }
    function bb(b) {
        var c, d = b._i;
        d === a ? b._d = new Date() : v(d) ? b._d = new Date(+d) : null !== (c = Kb.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? _(b) : u(d) ? (b._a = ab(d.slice(0), function(a) {
            return parseInt(a, 10);
        }), T(b)) : "object" == typeof d ? U(b) : "number" == typeof d ? b._d = new Date(d) : tb.createFromInputFallback(b);
    }
    function cb(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return 1970 > a && h.setFullYear(a), h;
    }
    function db(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return 1970 > a && b.setUTCFullYear(a), b;
    }
    function eb(a, b) {
        if ("string" == typeof a) if (isNaN(a)) {
            if (a = b.weekdaysParse(a), "number" != typeof a) return null;
        } else a = parseInt(a, 10);
        return a;
    }
    function fb(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d);
    }
    function gb(a, b, c) {
        var d = tb.duration(a).abs(), e = yb(d.as("s")), f = yb(d.as("m")), g = yb(d.as("h")), h = yb(d.as("d")), i = yb(d.as("M")), j = yb(d.as("y")), k = e < mc.s && [ "s", e ] || 1 === f && [ "m" ] || f < mc.m && [ "mm", f ] || 1 === g && [ "h" ] || g < mc.h && [ "hh", g ] || 1 === h && [ "d" ] || h < mc.d && [ "dd", h ] || 1 === i && [ "M" ] || i < mc.M && [ "MM", i ] || 1 === j && [ "y" ] || [ "yy", j ];
        return k[2] = b, k[3] = +a > 0, k[4] = c, fb.apply({}, k);
    }
    function hb(a, b, c) {
        var d, e = c - b, f = c - a.day();
        return f > e && (f -= 7), e - 7 > f && (f += 7), d = tb(a).add(f, "d"), {
            week: Math.ceil(d.dayOfYear() / 7),
            year: d.year()
        };
    }
    function ib(a, b, c, d, e) {
        var f, g, h = db(a, 0, 1).getUTCDay();
        return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), 
        g = 7 * (b - 1) + (c - e) + f + 1, {
            year: g > 0 ? a : a - 1,
            dayOfYear: g > 0 ? g : D(a - 1) + g
        };
    }
    function jb(b) {
        var c = b._i, d = b._f;
        return b._locale = b._locale || tb.localeData(b._l), null === c || d === a && "" === c ? tb.invalid({
            nullInput: !0
        }) : ("string" == typeof c && (b._i = c = b._locale.preparse(c)), tb.isMoment(c) ? new k(c, !0) : (d ? u(d) ? Z(b) : W(b) : bb(b), 
        new k(b)));
    }
    function kb(a, b) {
        var c, d;
        if (1 === b.length && u(b[0]) && (b = b[0]), !b.length) return tb();
        for (c = b[0], d = 1; d < b.length; ++d) b[d][a](c) && (c = b[d]);
        return c;
    }
    function lb(a, b) {
        var c;
        return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), B(a.year(), b)), 
        a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a);
    }
    function mb(a, b) {
        return a._d["get" + (a._isUTC ? "UTC" : "") + b]();
    }
    function nb(a, b, c) {
        return "Month" === b ? lb(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
    }
    function ob(a, b) {
        return function(c) {
            return null != c ? (nb(this, a, c), tb.updateOffset(this, b), this) : mb(this, a);
        };
    }
    function pb(a) {
        return 400 * a / 146097;
    }
    function qb(a) {
        return 146097 * a / 400;
    }
    function rb(a) {
        tb.duration.fn[a] = function() {
            return this._data[a];
        };
    }
    function sb(a) {
        "undefined" == typeof ender && (ub = xb.moment, xb.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", tb) : tb);
    }
    for (var tb, ub, vb, wb = "2.8.3", xb = "undefined" != typeof global ? global : this, yb = Math.round, zb = Object.prototype.hasOwnProperty, Ab = 0, Bb = 1, Cb = 2, Db = 3, Eb = 4, Fb = 5, Gb = 6, Hb = {}, Ib = [], Jb = "undefined" != typeof module && module.exports, Kb = /^\/?Date\((\-?\d+)/i, Lb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Mb = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Nb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Ob = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Pb = /\d\d?/, Qb = /\d{1,3}/, Rb = /\d{1,4}/, Sb = /[+\-]?\d{1,6}/, Tb = /\d+/, Ub = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Vb = /Z|[\+\-]\d\d:?\d\d/gi, Wb = /T/i, Xb = /[\+\-]?\d+(\.\d{1,3})?/, Yb = /\d{1,2}/, Zb = /\d/, $b = /\d\d/, _b = /\d{3}/, ac = /\d{4}/, bc = /[+-]?\d{6}/, cc = /[+-]?\d+/, dc = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ec = "YYYY-MM-DDTHH:mm:ssZ", fc = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], gc = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], hc = /([\+\-]|\d\d)/gi, ic = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), 
    {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }), jc = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, kc = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, lc = {}, mc = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, nc = "DDD w W M D d".split(" "), oc = "M D H h m s w W".split(" "), pc = {
        M: function() {
            return this.month() + 1;
        },
        MMM: function(a) {
            return this.localeData().monthsShort(this, a);
        },
        MMMM: function(a) {
            return this.localeData().months(this, a);
        },
        D: function() {
            return this.date();
        },
        DDD: function() {
            return this.dayOfYear();
        },
        d: function() {
            return this.day();
        },
        dd: function(a) {
            return this.localeData().weekdaysMin(this, a);
        },
        ddd: function(a) {
            return this.localeData().weekdaysShort(this, a);
        },
        dddd: function(a) {
            return this.localeData().weekdays(this, a);
        },
        w: function() {
            return this.week();
        },
        W: function() {
            return this.isoWeek();
        },
        YY: function() {
            return p(this.year() % 100, 2);
        },
        YYYY: function() {
            return p(this.year(), 4);
        },
        YYYYY: function() {
            return p(this.year(), 5);
        },
        YYYYYY: function() {
            var a = this.year(), b = a >= 0 ? "+" : "-";
            return b + p(Math.abs(a), 6);
        },
        gg: function() {
            return p(this.weekYear() % 100, 2);
        },
        gggg: function() {
            return p(this.weekYear(), 4);
        },
        ggggg: function() {
            return p(this.weekYear(), 5);
        },
        GG: function() {
            return p(this.isoWeekYear() % 100, 2);
        },
        GGGG: function() {
            return p(this.isoWeekYear(), 4);
        },
        GGGGG: function() {
            return p(this.isoWeekYear(), 5);
        },
        e: function() {
            return this.weekday();
        },
        E: function() {
            return this.isoWeekday();
        },
        a: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), !0);
        },
        A: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), !1);
        },
        H: function() {
            return this.hours();
        },
        h: function() {
            return this.hours() % 12 || 12;
        },
        m: function() {
            return this.minutes();
        },
        s: function() {
            return this.seconds();
        },
        S: function() {
            return A(this.milliseconds() / 100);
        },
        SS: function() {
            return p(A(this.milliseconds() / 10), 2);
        },
        SSS: function() {
            return p(this.milliseconds(), 3);
        },
        SSSS: function() {
            return p(this.milliseconds(), 3);
        },
        Z: function() {
            var a = -this.zone(), b = "+";
            return 0 > a && (a = -a, b = "-"), b + p(A(a / 60), 2) + ":" + p(A(a) % 60, 2);
        },
        ZZ: function() {
            var a = -this.zone(), b = "+";
            return 0 > a && (a = -a, b = "-"), b + p(A(a / 60), 2) + p(A(a) % 60, 2);
        },
        z: function() {
            return this.zoneAbbr();
        },
        zz: function() {
            return this.zoneName();
        },
        X: function() {
            return this.unix();
        },
        Q: function() {
            return this.quarter();
        }
    }, qc = {}, rc = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; nc.length; ) vb = nc.pop(), 
    pc[vb + "o"] = i(pc[vb], vb);
    for (;oc.length; ) vb = oc.pop(), pc[vb + vb] = h(pc[vb], 2);
    pc.DDDD = h(pc.DDD, 3), m(j.prototype, {
        set: function(a) {
            var b, c;
            for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(a) {
            return this._months[a.month()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(a) {
            return this._monthsShort[a.month()];
        },
        monthsParse: function(a) {
            var b, c, d;
            for (this._monthsParse || (this._monthsParse = []), b = 0; 12 > b; b++) if (this._monthsParse[b] || (c = tb.utc([ 2e3, b ]), 
            d = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""), this._monthsParse[b] = new RegExp(d.replace(".", ""), "i")), 
            this._monthsParse[b].test(a)) return b;
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(a) {
            return this._weekdays[a.day()];
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(a) {
            return this._weekdaysShort[a.day()];
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(a) {
            return this._weekdaysMin[a.day()];
        },
        weekdaysParse: function(a) {
            var b, c, d;
            for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++) if (this._weekdaysParse[b] || (c = tb([ 2e3, 1 ]).day(b), 
            d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), 
            this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b;
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function(a) {
            var b = this._longDateFormat[a];
            return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
                return a.slice(1);
            }), this._longDateFormat[a] = b), b;
        },
        isPM: function(a) {
            return "p" === (a + "").toLowerCase().charAt(0);
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(a, b) {
            var c = this._calendar[a];
            return "function" == typeof c ? c.apply(b) : c;
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(a, b, c, d) {
            var e = this._relativeTime[c];
            return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a);
        },
        pastFuture: function(a, b) {
            var c = this._relativeTime[a > 0 ? "future" : "past"];
            return "function" == typeof c ? c(b) : c.replace(/%s/i, b);
        },
        ordinal: function(a) {
            return this._ordinal.replace("%d", a);
        },
        _ordinal: "%d",
        preparse: function(a) {
            return a;
        },
        postformat: function(a) {
            return a;
        },
        week: function(a) {
            return hb(a, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate;
        }
    }), tb = function(b, c, e, f) {
        var g;
        return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, 
        g._i = b, g._f = c, g._l = e, g._strict = f, g._isUTC = !1, g._pf = d(), jb(g);
    }, tb.suppressDeprecationWarnings = !1, tb.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
        a._d = new Date(a._i);
    }), tb.min = function() {
        var a = [].slice.call(arguments, 0);
        return kb("isBefore", a);
    }, tb.max = function() {
        var a = [].slice.call(arguments, 0);
        return kb("isAfter", a);
    }, tb.utc = function(b, c, e, f) {
        var g;
        return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, 
        g._useUTC = !0, g._isUTC = !0, g._l = e, g._i = b, g._f = c, g._strict = f, g._pf = d(), 
        jb(g).utc();
    }, tb.unix = function(a) {
        return tb(1e3 * a);
    }, tb.duration = function(a, b) {
        var d, e, f, g, h = a, i = null;
        return tb.isDuration(a) ? h = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : "number" == typeof a ? (h = {}, b ? h[b] = a : h.milliseconds = a) : (i = Lb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, 
        h = {
            y: 0,
            d: A(i[Cb]) * d,
            h: A(i[Db]) * d,
            m: A(i[Eb]) * d,
            s: A(i[Fb]) * d,
            ms: A(i[Gb]) * d
        }) : (i = Mb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, f = function(a) {
            var b = a && parseFloat(a.replace(",", "."));
            return (isNaN(b) ? 0 : b) * d;
        }, h = {
            y: f(i[2]),
            M: f(i[3]),
            d: f(i[4]),
            h: f(i[5]),
            m: f(i[6]),
            s: f(i[7]),
            w: f(i[8])
        }) : "object" == typeof h && ("from" in h || "to" in h) && (g = r(tb(h.from), tb(h.to)), 
        h = {}, h.ms = g.milliseconds, h.M = g.months), e = new l(h), tb.isDuration(a) && c(a, "_locale") && (e._locale = a._locale), 
        e;
    }, tb.version = wb, tb.defaultFormat = ec, tb.ISO_8601 = function() {}, tb.momentProperties = Ib, 
    tb.updateOffset = function() {}, tb.relativeTimeThreshold = function(b, c) {
        return mc[b] === a ? !1 : c === a ? mc[b] : (mc[b] = c, !0);
    }, tb.lang = f("moment.lang is deprecated. Use moment.locale instead.", function(a, b) {
        return tb.locale(a, b);
    }), tb.locale = function(a, b) {
        var c;
        return a && (c = "undefined" != typeof b ? tb.defineLocale(a, b) : tb.localeData(a), 
        c && (tb.duration._locale = tb._locale = c)), tb._locale._abbr;
    }, tb.defineLocale = function(a, b) {
        return null !== b ? (b.abbr = a, Hb[a] || (Hb[a] = new j()), Hb[a].set(b), tb.locale(a), 
        Hb[a]) : (delete Hb[a], null);
    }, tb.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function(a) {
        return tb.localeData(a);
    }), tb.localeData = function(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return tb._locale;
        if (!u(a)) {
            if (b = J(a)) return b;
            a = [ a ];
        }
        return I(a);
    }, tb.isMoment = function(a) {
        return a instanceof k || null != a && c(a, "_isAMomentObject");
    }, tb.isDuration = function(a) {
        return a instanceof l;
    };
    for (vb = rc.length - 1; vb >= 0; --vb) z(rc[vb]);
    tb.normalizeUnits = function(a) {
        return x(a);
    }, tb.invalid = function(a) {
        var b = tb.utc(0/0);
        return null != a ? m(b._pf, a) : b._pf.userInvalidated = !0, b;
    }, tb.parseZone = function() {
        return tb.apply(null, arguments).parseZone();
    }, tb.parseTwoDigitYear = function(a) {
        return A(a) + (A(a) > 68 ? 1900 : 2e3);
    }, m(tb.fn = k.prototype, {
        clone: function() {
            return tb(this);
        },
        valueOf: function() {
            return +this._d + 6e4 * (this._offset || 0);
        },
        unix: function() {
            return Math.floor(+this / 1e3);
        },
        toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d;
        },
        toISOString: function() {
            var a = tb(this).utc();
            return 0 < a.year() && a.year() <= 9999 ? N(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : N(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        },
        toArray: function() {
            var a = this;
            return [ a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds() ];
        },
        isValid: function() {
            return G(this);
        },
        isDSTShifted: function() {
            return this._a ? this.isValid() && w(this._a, (this._isUTC ? tb.utc(this._a) : tb(this._a)).toArray()) > 0 : !1;
        },
        parsingFlags: function() {
            return m({}, this._pf);
        },
        invalidAt: function() {
            return this._pf.overflow;
        },
        utc: function(a) {
            return this.zone(0, a);
        },
        local: function(a) {
            return this._isUTC && (this.zone(0, a), this._isUTC = !1, a && this.add(this._dateTzOffset(), "m")), 
            this;
        },
        format: function(a) {
            var b = N(this, a || tb.defaultFormat);
            return this.localeData().postformat(b);
        },
        add: s(1, "add"),
        subtract: s(-1, "subtract"),
        diff: function(a, b, c) {
            var d, e, f, g = K(a, this), h = 6e4 * (this.zone() - g.zone());
            return b = x(b), "year" === b || "month" === b ? (d = 432e5 * (this.daysInMonth() + g.daysInMonth()), 
            e = 12 * (this.year() - g.year()) + (this.month() - g.month()), f = this - tb(this).startOf("month") - (g - tb(g).startOf("month")), 
            f -= 6e4 * (this.zone() - tb(this).startOf("month").zone() - (g.zone() - tb(g).startOf("month").zone())), 
            e += f / d, "year" === b && (e /= 12)) : (d = this - g, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - h) / 864e5 : "week" === b ? (d - h) / 6048e5 : d), 
            c ? e : o(e);
        },
        from: function(a, b) {
            return tb.duration({
                to: this,
                from: a
            }).locale(this.locale()).humanize(!b);
        },
        fromNow: function(a) {
            return this.from(tb(), a);
        },
        calendar: function(a) {
            var b = a || tb(), c = K(b, this).startOf("day"), d = this.diff(c, "days", !0), e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(e, this));
        },
        isLeapYear: function() {
            return E(this.year());
        },
        isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
        },
        day: function(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != a ? (a = eb(a, this.localeData()), this.add(a - b, "d")) : b;
        },
        month: ob("Month", !0),
        startOf: function(a) {
            switch (a = x(a)) {
              case "year":
                this.month(0);

              case "quarter":
              case "month":
                this.date(1);

              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);

              case "hour":
                this.minutes(0);

              case "minute":
                this.seconds(0);

              case "second":
                this.milliseconds(0);
            }
            return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), 
            this;
        },
        endOf: function(a) {
            return a = x(a), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms");
        },
        isAfter: function(a, b) {
            return b = x("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), 
            +this > +a) : +this.clone().startOf(b) > +tb(a).startOf(b);
        },
        isBefore: function(a, b) {
            return b = x("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), 
            +a > +this) : +this.clone().startOf(b) < +tb(a).startOf(b);
        },
        isSame: function(a, b) {
            return b = x(b || "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), 
            +this === +a) : +this.clone().startOf(b) === +K(a, this).startOf(b);
        },
        min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a) {
            return a = tb.apply(null, arguments), this > a ? this : a;
        }),
        max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a) {
            return a = tb.apply(null, arguments), a > this ? this : a;
        }),
        zone: function(a, b) {
            var c, d = this._offset || 0;
            return null == a ? this._isUTC ? d : this._dateTzOffset() : ("string" == typeof a && (a = Q(a)), 
            Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && b && (c = this._dateTzOffset()), 
            this._offset = a, this._isUTC = !0, null != c && this.subtract(c, "m"), d !== a && (!b || this._changeInProgress ? t(this, tb.duration(d - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
            tb.updateOffset(this, !0), this._changeInProgress = null)), this);
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : "";
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },
        parseZone: function() {
            return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), 
            this;
        },
        hasAlignedHourOffset: function(a) {
            return a = a ? tb(a).zone() : 0, (this.zone() - a) % 60 === 0;
        },
        daysInMonth: function() {
            return B(this.year(), this.month());
        },
        dayOfYear: function(a) {
            var b = yb((tb(this).startOf("day") - tb(this).startOf("year")) / 864e5) + 1;
            return null == a ? b : this.add(a - b, "d");
        },
        quarter: function(a) {
            return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
        },
        weekYear: function(a) {
            var b = hb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null == a ? b : this.add(a - b, "y");
        },
        isoWeekYear: function(a) {
            var b = hb(this, 1, 4).year;
            return null == a ? b : this.add(a - b, "y");
        },
        week: function(a) {
            var b = this.localeData().week(this);
            return null == a ? b : this.add(7 * (a - b), "d");
        },
        isoWeek: function(a) {
            var b = hb(this, 1, 4).week;
            return null == a ? b : this.add(7 * (a - b), "d");
        },
        weekday: function(a) {
            var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == a ? b : this.add(a - b, "d");
        },
        isoWeekday: function(a) {
            return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7);
        },
        isoWeeksInYear: function() {
            return C(this.year(), 1, 4);
        },
        weeksInYear: function() {
            var a = this.localeData()._week;
            return C(this.year(), a.dow, a.doy);
        },
        get: function(a) {
            return a = x(a), this[a]();
        },
        set: function(a, b) {
            return a = x(a), "function" == typeof this[a] && this[a](b), this;
        },
        locale: function(b) {
            var c;
            return b === a ? this._locale._abbr : (c = tb.localeData(b), null != c && (this._locale = c), 
            this);
        },
        lang: f("moment().lang() is deprecated. Use moment().localeData() instead.", function(b) {
            return b === a ? this.localeData() : this.locale(b);
        }),
        localeData: function() {
            return this._locale;
        },
        _dateTzOffset: function() {
            return 15 * Math.round(this._d.getTimezoneOffset() / 15);
        }
    }), tb.fn.millisecond = tb.fn.milliseconds = ob("Milliseconds", !1), tb.fn.second = tb.fn.seconds = ob("Seconds", !1), 
    tb.fn.minute = tb.fn.minutes = ob("Minutes", !1), tb.fn.hour = tb.fn.hours = ob("Hours", !0), 
    tb.fn.date = ob("Date", !0), tb.fn.dates = f("dates accessor is deprecated. Use date instead.", ob("Date", !0)), 
    tb.fn.year = ob("FullYear", !0), tb.fn.years = f("years accessor is deprecated. Use year instead.", ob("FullYear", !0)), 
    tb.fn.days = tb.fn.day, tb.fn.months = tb.fn.month, tb.fn.weeks = tb.fn.week, tb.fn.isoWeeks = tb.fn.isoWeek, 
    tb.fn.quarters = tb.fn.quarter, tb.fn.toJSON = tb.fn.toISOString, m(tb.duration.fn = l.prototype, {
        _bubble: function() {
            var a, b, c, d = this._milliseconds, e = this._days, f = this._months, g = this._data, h = 0;
            g.milliseconds = d % 1e3, a = o(d / 1e3), g.seconds = a % 60, b = o(a / 60), g.minutes = b % 60, 
            c = o(b / 60), g.hours = c % 24, e += o(c / 24), h = o(pb(e)), e -= o(qb(h)), f += o(e / 30), 
            e %= 30, h += o(f / 12), f %= 12, g.days = e, g.months = f, g.years = h;
        },
        abs: function() {
            return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), 
            this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), 
            this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), 
            this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), 
            this._data.years = Math.abs(this._data.years), this;
        },
        weeks: function() {
            return o(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12);
        },
        humanize: function(a) {
            var b = gb(this, !a, this.localeData());
            return a && (b = this.localeData().pastFuture(+this, b)), this.localeData().postformat(b);
        },
        add: function(a, b) {
            var c = tb.duration(a, b);
            return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months, 
            this._bubble(), this;
        },
        subtract: function(a, b) {
            var c = tb.duration(a, b);
            return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, 
            this._bubble(), this;
        },
        get: function(a) {
            return a = x(a), this[a.toLowerCase() + "s"]();
        },
        as: function(a) {
            var b, c;
            if (a = x(a), "month" === a || "year" === a) return b = this._days + this._milliseconds / 864e5, 
            c = this._months + 12 * pb(b), "month" === a ? c : c / 12;
            switch (b = this._days + qb(this._months / 12), a) {
              case "week":
                return b / 7 + this._milliseconds / 6048e5;

              case "day":
                return b + this._milliseconds / 864e5;

              case "hour":
                return 24 * b + this._milliseconds / 36e5;

              case "minute":
                return 24 * b * 60 + this._milliseconds / 6e4;

              case "second":
                return 24 * b * 60 * 60 + this._milliseconds / 1e3;

              case "millisecond":
                return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;

              default:
                throw new Error("Unknown unit " + a);
            }
        },
        lang: tb.fn.lang,
        locale: tb.fn.locale,
        toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
            return this.toISOString();
        }),
        toISOString: function() {
            var a = Math.abs(this.years()), b = Math.abs(this.months()), c = Math.abs(this.days()), d = Math.abs(this.hours()), e = Math.abs(this.minutes()), f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D";
        },
        localeData: function() {
            return this._locale;
        }
    }), tb.duration.fn.toString = tb.duration.fn.toISOString;
    for (vb in ic) c(ic, vb) && rb(vb.toLowerCase());
    tb.duration.fn.asMilliseconds = function() {
        return this.as("ms");
    }, tb.duration.fn.asSeconds = function() {
        return this.as("s");
    }, tb.duration.fn.asMinutes = function() {
        return this.as("m");
    }, tb.duration.fn.asHours = function() {
        return this.as("h");
    }, tb.duration.fn.asDays = function() {
        return this.as("d");
    }, tb.duration.fn.asWeeks = function() {
        return this.as("weeks");
    }, tb.duration.fn.asMonths = function() {
        return this.as("M");
    }, tb.duration.fn.asYears = function() {
        return this.as("y");
    }, tb.locale("en", {
        ordinal: function(a) {
            var b = a % 10, c = 1 === A(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c;
        }
    }), Jb ? module.exports = tb : "function" == typeof define && define.amd ? (define("moment", function(a, b, c) {
        return c.config && c.config() && c.config().noGlobal === !0 && (xb.moment = ub), 
        tb;
    }), sb(!0)) : sb();
}.call(this), !function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.bootbox = b(a.jQuery);
}(this, function a(b, c) {
    "use strict";
    function d(a) {
        var b = q[o.locale];
        return b ? b[a] : q.en[a];
    }
    function e(a, c, d) {
        a.stopPropagation(), a.preventDefault();
        var e = b.isFunction(d) && d(a) === !1;
        e || c.modal("hide");
    }
    function f(a) {
        var b, c = 0;
        for (b in a) c++;
        return c;
    }
    function g(a, c) {
        var d = 0;
        b.each(a, function(a, b) {
            c(a, b, d++);
        });
    }
    function h(a) {
        var c, d;
        if ("object" != typeof a) throw new Error("Please supply an object of options");
        if (!a.message) throw new Error("Please specify a message");
        return a = b.extend({}, o, a), a.buttons || (a.buttons = {}), a.backdrop = a.backdrop ? "static" : !1, 
        c = a.buttons, d = f(c), g(c, function(a, e, f) {
            if (b.isFunction(e) && (e = c[a] = {
                callback: e
            }), "object" !== b.type(e)) throw new Error("button with key " + a + " must be an object");
            e.label || (e.label = a), e.className || (e.className = 2 >= d && f === d - 1 ? "btn-primary" : "btn-default");
        }), a;
    }
    function i(a, b) {
        var c = a.length, d = {};
        if (1 > c || c > 2) throw new Error("Invalid argument length");
        return 2 === c || "string" == typeof a[0] ? (d[b[0]] = a[0], d[b[1]] = a[1]) : d = a[0], 
        d;
    }
    function j(a, c, d) {
        return b.extend(!0, {}, a, i(c, d));
    }
    function k(a, b, c, d) {
        var e = {
            className: "bootbox-" + a,
            buttons: l.apply(null, b)
        };
        return m(j(e, d, c), b);
    }
    function l() {
        for (var a = {}, b = 0, c = arguments.length; c > b; b++) {
            var e = arguments[b], f = e.toLowerCase(), g = e.toUpperCase();
            a[f] = {
                label: d(g)
            };
        }
        return a;
    }
    function m(a, b) {
        var d = {};
        return g(b, function(a, b) {
            d[b] = !0;
        }), g(a.buttons, function(a) {
            if (d[a] === c) throw new Error("button key " + a + " is not allowed (options are " + b.join("\n") + ")");
        }), a;
    }
    var n = {
        dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
        header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
        footer: "<div class='modal-footer'></div>",
        closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form: "<form class='bootbox-form'></form>",
        inputs: {
            text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
        }
    }, o = {
        locale: "en",
        backdrop: !0,
        animate: !0,
        className: null,
        closeButton: !0,
        show: !0,
        container: "body"
    }, p = {};
    p.alert = function() {
        var a;
        if (a = k("alert", [ "ok" ], [ "message", "callback" ], arguments), a.callback && !b.isFunction(a.callback)) throw new Error("alert requires callback property to be a function when provided");
        return a.buttons.ok.callback = a.onEscape = function() {
            return b.isFunction(a.callback) ? a.callback() : !0;
        }, p.dialog(a);
    }, p.confirm = function() {
        var a;
        if (a = k("confirm", [ "cancel", "confirm" ], [ "message", "callback" ], arguments), 
        a.buttons.cancel.callback = a.onEscape = function() {
            return a.callback(!1);
        }, a.buttons.confirm.callback = function() {
            return a.callback(!0);
        }, !b.isFunction(a.callback)) throw new Error("confirm requires a callback");
        return p.dialog(a);
    }, p.prompt = function() {
        var a, d, e, f, h, i, k;
        if (f = b(n.form), d = {
            className: "bootbox-prompt",
            buttons: l("cancel", "confirm"),
            value: "",
            inputType: "text"
        }, a = m(j(d, arguments, [ "title", "callback" ]), [ "cancel", "confirm" ]), i = a.show === c ? !0 : a.show, 
        a.message = f, a.buttons.cancel.callback = a.onEscape = function() {
            return a.callback(null);
        }, a.buttons.confirm.callback = function() {
            var c;
            switch (a.inputType) {
              case "text":
              case "textarea":
              case "email":
              case "select":
              case "date":
              case "time":
              case "number":
              case "password":
                c = h.val();
                break;

              case "checkbox":
                var d = h.find("input:checked");
                c = [], g(d, function(a, d) {
                    c.push(b(d).val());
                });
            }
            return a.callback(c);
        }, a.show = !1, !a.title) throw new Error("prompt requires a title");
        if (!b.isFunction(a.callback)) throw new Error("prompt requires a callback");
        if (!n.inputs[a.inputType]) throw new Error("invalid prompt type");
        switch (h = b(n.inputs[a.inputType]), a.inputType) {
          case "text":
          case "textarea":
          case "email":
          case "date":
          case "time":
          case "number":
          case "password":
            h.val(a.value);
            break;

          case "select":
            var o = {};
            if (k = a.inputOptions || [], !k.length) throw new Error("prompt with select requires options");
            g(k, function(a, d) {
                var e = h;
                if (d.value === c || d.text === c) throw new Error("given options in wrong format");
                d.group && (o[d.group] || (o[d.group] = b("<optgroup/>").attr("label", d.group)), 
                e = o[d.group]), e.append("<option value='" + d.value + "'>" + d.text + "</option>");
            }), g(o, function(a, b) {
                h.append(b);
            }), h.val(a.value);
            break;

          case "checkbox":
            var q = b.isArray(a.value) ? a.value : [ a.value ];
            if (k = a.inputOptions || [], !k.length) throw new Error("prompt with checkbox requires options");
            if (!k[0].value || !k[0].text) throw new Error("given options in wrong format");
            h = b("<div/>"), g(k, function(c, d) {
                var e = b(n.inputs[a.inputType]);
                e.find("input").attr("value", d.value), e.find("label").append(d.text), g(q, function(a, b) {
                    b === d.value && e.find("input").prop("checked", !0);
                }), h.append(e);
            });
        }
        return a.placeholder && h.attr("placeholder", a.placeholder), a.pattern && h.attr("pattern", a.pattern), 
        f.append(h), f.on("submit", function(a) {
            a.preventDefault(), a.stopPropagation(), e.find(".btn-primary").click();
        }), e = p.dialog(a), e.off("shown.bs.modal"), e.on("shown.bs.modal", function() {
            h.focus();
        }), i === !0 && e.modal("show"), e;
    }, p.dialog = function(a) {
        a = h(a);
        var c = b(n.dialog), d = c.find(".modal-dialog"), f = c.find(".modal-body"), i = a.buttons, j = "", k = {
            onEscape: a.onEscape
        };
        if (g(i, function(a, b) {
            j += "<button data-bb-handler='" + a + "' type='button' class='btn " + b.className + "'>" + b.label + "</button>", 
            k[a] = b.callback;
        }), f.find(".bootbox-body").html(a.message), a.animate === !0 && c.addClass("fade"), 
        a.className && c.addClass(a.className), "large" === a.size && d.addClass("modal-lg"), 
        "small" === a.size && d.addClass("modal-sm"), a.title && f.before(n.header), a.closeButton) {
            var l = b(n.closeButton);
            a.title ? c.find(".modal-header").prepend(l) : l.css("margin-top", "-10px").prependTo(f);
        }
        return a.title && c.find(".modal-title").html(a.title), j.length && (f.after(n.footer), 
        c.find(".modal-footer").html(j)), c.on("hidden.bs.modal", function(a) {
            a.target === this && c.remove();
        }), c.on("shown.bs.modal", function() {
            c.find(".btn-primary:first").focus();
        }), c.on("escape.close.bb", function(a) {
            k.onEscape && e(a, c, k.onEscape);
        }), c.on("click", ".modal-footer button", function(a) {
            var d = b(this).data("bb-handler");
            e(a, c, k[d]);
        }), c.on("click", ".bootbox-close-button", function(a) {
            e(a, c, k.onEscape);
        }), c.on("keyup", function(a) {
            27 === a.which && c.trigger("escape.close.bb");
        }), b(a.container).append(c), c.modal({
            backdrop: a.backdrop,
            keyboard: !1,
            show: !1
        }), a.show && c.modal("show"), c;
    }, p.setDefaults = function() {
        var a = {};
        2 === arguments.length ? a[arguments[0]] = arguments[1] : a = arguments[0], b.extend(o, a);
    }, p.hideAll = function() {
        return b(".bootbox").modal("hide"), p;
    };
    var q = {
        br: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Sim"
        },
        cs: {
            OK: "OK",
            CANCEL: "Zrušit",
            CONFIRM: "Potvrdit"
        },
        da: {
            OK: "OK",
            CANCEL: "Annuller",
            CONFIRM: "Accepter"
        },
        de: {
            OK: "OK",
            CANCEL: "Abbrechen",
            CONFIRM: "Akzeptieren"
        },
        el: {
            OK: "Εντάξει",
            CANCEL: "Ακύρωση",
            CONFIRM: "Επιβεβαίωση"
        },
        en: {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        },
        es: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Aceptar"
        },
        et: {
            OK: "OK",
            CANCEL: "Katkesta",
            CONFIRM: "OK"
        },
        fi: {
            OK: "OK",
            CANCEL: "Peruuta",
            CONFIRM: "OK"
        },
        fr: {
            OK: "OK",
            CANCEL: "Annuler",
            CONFIRM: "D'accord"
        },
        he: {
            OK: "אישור",
            CANCEL: "ביטול",
            CONFIRM: "אישור"
        },
        id: {
            OK: "OK",
            CANCEL: "Batal",
            CONFIRM: "OK"
        },
        it: {
            OK: "OK",
            CANCEL: "Annulla",
            CONFIRM: "Conferma"
        },
        ja: {
            OK: "OK",
            CANCEL: "キャンセル",
            CONFIRM: "確認"
        },
        lt: {
            OK: "Gerai",
            CANCEL: "Atšaukti",
            CONFIRM: "Patvirtinti"
        },
        lv: {
            OK: "Labi",
            CANCEL: "Atcelt",
            CONFIRM: "Apstiprināt"
        },
        nl: {
            OK: "OK",
            CANCEL: "Annuleren",
            CONFIRM: "Accepteren"
        },
        no: {
            OK: "OK",
            CANCEL: "Avbryt",
            CONFIRM: "OK"
        },
        pl: {
            OK: "OK",
            CANCEL: "Anuluj",
            CONFIRM: "Potwierdź"
        },
        pt: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Confirmar"
        },
        ru: {
            OK: "OK",
            CANCEL: "Отмена",
            CONFIRM: "Применить"
        },
        sv: {
            OK: "OK",
            CANCEL: "Avbryt",
            CONFIRM: "OK"
        },
        tr: {
            OK: "Tamam",
            CANCEL: "İptal",
            CONFIRM: "Onayla"
        },
        zh_CN: {
            OK: "OK",
            CANCEL: "取消",
            CONFIRM: "确认"
        },
        zh_TW: {
            OK: "OK",
            CANCEL: "取消",
            CONFIRM: "確認"
        }
    };
    return p.init = function(c) {
        return a(c || b);
    }, p;
}), !function(a) {
    "use strict";
    function b(a) {
        return function(b) {
            return b && this === b.target ? a.apply(this, arguments) : void 0;
        };
    }
    var c = function(a, b) {
        this.init(a, b);
    };
    c.prototype = {
        constructor: c,
        init: function(b, c) {
            if (this.$element = a(b), this.options = a.extend({}, a.fn.modalmanager.defaults, this.$element.data(), "object" == typeof c && c), 
            this.stack = [], this.backdropCount = 0, this.options.resize) {
                var d, e = this;
                a(window).on("resize.modal", function() {
                    d && clearTimeout(d), d = setTimeout(function() {
                        for (var a = 0; a < e.stack.length; a++) e.stack[a].isShown && e.stack[a].layout();
                    }, 10);
                });
            }
        },
        createModal: function(b, c) {
            a(b).modal(a.extend({
                manager: this
            }, c));
        },
        appendModal: function(c) {
            this.stack.push(c);
            var d = this;
            c.$element.on("show.modalmanager", b(function() {
                var b = function() {
                    c.isShown = !0;
                    var b = a.support.transition && c.$element.hasClass("fade");
                    d.$element.toggleClass("modal-open", d.hasOpenModal()).toggleClass("page-overflow", a(window).height() < d.$element.height()), 
                    c.$parent = c.$element.parent(), c.$container = d.createContainer(c), c.$element.appendTo(c.$container), 
                    d.backdrop(c, function() {
                        c.$element.show(), b && c.$element[0].offsetWidth, c.layout(), c.$element.addClass("in").attr("aria-hidden", !1);
                        var e = function() {
                            d.setFocus(), c.$element.trigger("shown");
                        };
                        b ? c.$element.one(a.support.transition.end, e) : e();
                    });
                };
                c.options.replace ? d.replace(b) : b();
            })), c.$element.on("hidden.modalmanager", b(function() {
                if (d.backdrop(c), c.$element.parent().length) if (c.$backdrop) {
                    var b = a.support.transition && c.$element.hasClass("fade");
                    b && c.$element[0].offsetWidth, a.support.transition && c.$element.hasClass("fade") ? c.$backdrop.one(a.support.transition.end, function() {
                        c.destroy();
                    }) : c.destroy();
                } else c.destroy(); else d.destroyModal(c);
            })), c.$element.on("destroyed.modalmanager", b(function() {
                d.destroyModal(c);
            }));
        },
        getOpenModals: function() {
            for (var a = [], b = 0; b < this.stack.length; b++) this.stack[b].isShown && a.push(this.stack[b]);
            return a;
        },
        hasOpenModal: function() {
            return this.getOpenModals().length > 0;
        },
        setFocus: function() {
            for (var a, b = 0; b < this.stack.length; b++) this.stack[b].isShown && (a = this.stack[b]);
            a && a.focus();
        },
        destroyModal: function(a) {
            a.$element.off(".modalmanager"), a.$backdrop && this.removeBackdrop(a), this.stack.splice(this.getIndexOfModal(a), 1);
            var b = this.hasOpenModal();
            this.$element.toggleClass("modal-open", b), b || this.$element.removeClass("page-overflow"), 
            this.removeContainer(a), this.setFocus();
        },
        getModalAt: function(a) {
            return this.stack[a];
        },
        getIndexOfModal: function(a) {
            for (var b = 0; b < this.stack.length; b++) if (a === this.stack[b]) return b;
        },
        replace: function(c) {
            for (var d, e = 0; e < this.stack.length; e++) this.stack[e].isShown && (d = this.stack[e]);
            d ? (this.$backdropHandle = d.$backdrop, d.$backdrop = null, c && d.$element.one("hidden", b(a.proxy(c, this))), 
            d.hide()) : c && c();
        },
        removeBackdrop: function(a) {
            a.$backdrop.remove(), a.$backdrop = null;
        },
        createBackdrop: function(b, c) {
            var d;
            return this.$backdropHandle ? (d = this.$backdropHandle, d.off(".modalmanager"), 
            this.$backdropHandle = null, this.isLoading && this.removeSpinner()) : d = a(c).addClass(b).appendTo(this.$element), 
            d;
        },
        removeContainer: function(a) {
            a.$container.remove(), a.$container = null;
        },
        createContainer: function(c) {
            var e;
            return e = a('<div class="modal-scrollable">').css("z-index", d("modal", this.getOpenModals().length)).appendTo(this.$element), 
            c && "static" != c.options.backdrop ? e.on("click.modal", b(function() {
                c.hide();
            })) : c && e.on("click.modal", b(function() {
                c.attention();
            })), e;
        },
        backdrop: function(b, c) {
            var e = b.$element.hasClass("fade") ? "fade" : "", f = b.options.backdrop && this.backdropCount < this.options.backdropLimit;
            if (b.isShown && f) {
                var g = a.support.transition && e && !this.$backdropHandle;
                b.$backdrop = this.createBackdrop(e, b.options.backdropTemplate), b.$backdrop.css("z-index", d("backdrop", this.getOpenModals().length)), 
                g && b.$backdrop[0].offsetWidth, b.$backdrop.addClass("in"), this.backdropCount += 1, 
                g ? b.$backdrop.one(a.support.transition.end, c) : c();
            } else if (!b.isShown && b.$backdrop) {
                b.$backdrop.removeClass("in"), this.backdropCount -= 1;
                var h = this;
                a.support.transition && b.$element.hasClass("fade") ? b.$backdrop.one(a.support.transition.end, function() {
                    h.removeBackdrop(b);
                }) : h.removeBackdrop(b);
            } else c && c();
        },
        removeSpinner: function() {
            this.$spinner && this.$spinner.remove(), this.$spinner = null, this.isLoading = !1;
        },
        removeLoading: function() {
            this.$backdropHandle && this.$backdropHandle.remove(), this.$backdropHandle = null, 
            this.removeSpinner();
        },
        loading: function(b) {
            if (b = b || function() {}, this.$element.toggleClass("modal-open", !this.isLoading || this.hasOpenModal()).toggleClass("page-overflow", a(window).height() < this.$element.height()), 
            this.isLoading) if (this.isLoading && this.$backdropHandle) {
                this.$backdropHandle.removeClass("in");
                var c = this;
                a.support.transition ? this.$backdropHandle.one(a.support.transition.end, function() {
                    c.removeLoading();
                }) : c.removeLoading();
            } else b && b(this.isLoading); else {
                this.$backdropHandle = this.createBackdrop("fade", this.options.backdropTemplate), 
                this.$backdropHandle[0].offsetWidth;
                var e = this.getOpenModals();
                this.$backdropHandle.css("z-index", d("backdrop", e.length + 1)).addClass("in");
                var f = a(this.options.spinner).css("z-index", d("modal", e.length + 1)).appendTo(this.$element).addClass("in");
                this.$spinner = a(this.createContainer()).append(f).on("click.modalmanager", a.proxy(this.loading, this)), 
                this.isLoading = !0, a.support.transition ? this.$backdropHandle.one(a.support.transition.end, b) : b();
            }
        }
    };
    var d = function() {
        var b, c = {};
        return function(d, e) {
            if ("undefined" == typeof b) {
                var f = a('<div class="modal hide" />').appendTo("body"), g = a('<div class="modal-backdrop hide" />').appendTo("body");
                c.modal = +f.css("z-index"), c.backdrop = +g.css("z-index"), b = c.modal - c.backdrop, 
                f.remove(), g.remove(), g = f = null;
            }
            return c[d] + b * e;
        };
    }();
    a.fn.modalmanager = function(b, d) {
        return this.each(function() {
            var e = a(this), f = e.data("modalmanager");
            f || e.data("modalmanager", f = new c(this, b)), "string" == typeof b && f[b].apply(f, [].concat(d));
        });
    }, a.fn.modalmanager.defaults = {
        backdropLimit: 999,
        resize: !0,
        spinner: '<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
        backdropTemplate: '<div class="modal-backdrop" />'
    }, a.fn.modalmanager.Constructor = c, a(function() {
        a(document).off("show.bs.modal").off("hidden.bs.modal");
    });
}(jQuery), !function(a) {
    "use strict";
    var b = function(a, b) {
        this.init(a, b);
    };
    b.prototype = {
        constructor: b,
        init: function(b, c) {
            var d = this;
            this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), 
            this.options.remote && this.$element.find(".modal-body").load(this.options.remote, function() {
                var b = a.Event("loaded");
                d.$element.trigger(b);
            });
            var e = "function" == typeof this.options.manager ? this.options.manager.call(this) : this.options.manager;
            e = e.appendModal ? e : a(e).modalmanager().data("modalmanager"), e.appendModal(this);
        },
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]();
        },
        show: function() {
            var b = a.Event("show");
            this.isShown || (this.$element.trigger(b), b.isDefaultPrevented() || (this.escape(), 
            this.tab(), this.options.loading && this.loading()));
        },
        hide: function(b) {
            b && b.preventDefault(), b = a.Event("hide"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, 
            this.escape(), this.tab(), this.isLoading && this.loading(), a(document).off("focusin.modal"), 
            this.$element.removeClass("in").removeClass("animated").removeClass(this.options.attentionAnimation).removeClass("modal-overflow").attr("aria-hidden", !0), 
            a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal());
        },
        layout: function() {
            var b = this.options.height ? "height" : "max-height", c = this.options.height || this.options.maxHeight;
            if (this.options.width) {
                this.$element.css("width", this.options.width);
                var d = this;
                this.$element.css("margin-left", function() {
                    return /%/gi.test(d.options.width) ? -(parseInt(d.options.width) / 2) + "%" : -(a(this).width() / 2) + "px";
                });
            } else this.$element.css("width", ""), this.$element.css("margin-left", "");
            this.$element.find(".modal-body").css("overflow", "").css(b, ""), c && this.$element.find(".modal-body").css("overflow", "auto").css(b, c);
            var e = a(window).height() - 10 < this.$element.height();
            e || this.options.modalOverflow ? this.$element.css("margin-top", 0).addClass("modal-overflow") : this.$element.css("margin-top", 0 - this.$element.height() / 2).removeClass("modal-overflow");
        },
        tab: function() {
            var b = this;
            this.isShown && this.options.consumeTab ? this.$element.on("keydown.tabindex.modal", "[data-tabindex]", function(c) {
                if (c.keyCode && 9 == c.keyCode) {
                    var d = [], e = Number(a(this).data("tabindex"));
                    b.$element.find("[data-tabindex]:enabled:visible:not([readonly])").each(function() {
                        d.push(Number(a(this).data("tabindex")));
                    }), d.sort(function(a, b) {
                        return a - b;
                    });
                    var f = a.inArray(e, d);
                    c.shiftKey ? 0 == f ? b.$element.find("[data-tabindex=" + d[d.length - 1] + "]").focus() : b.$element.find("[data-tabindex=" + d[f - 1] + "]").focus() : f < d.length - 1 ? b.$element.find("[data-tabindex=" + d[f + 1] + "]").focus() : b.$element.find("[data-tabindex=" + d[0] + "]").focus(), 
                    c.preventDefault();
                }
            }) : this.isShown || this.$element.off("keydown.tabindex.modal");
        },
        escape: function() {
            var a = this;
            this.isShown && this.options.keyboard ? (this.$element.attr("tabindex") || this.$element.attr("tabindex", -1), 
            this.$element.on("keyup.dismiss.modal", function(b) {
                27 == b.which && a.hide();
            })) : this.isShown || this.$element.off("keyup.dismiss.modal");
        },
        hideWithTransition: function() {
            var b = this, c = setTimeout(function() {
                b.$element.off(a.support.transition.end), b.hideModal();
            }, 500);
            this.$element.one(a.support.transition.end, function() {
                clearTimeout(c), b.hideModal();
            });
        },
        hideModal: function() {
            var a = this.options.height ? "height" : "max-height", b = this.options.height || this.options.maxHeight;
            b && this.$element.find(".modal-body").css("overflow", "").css(a, ""), this.$element.hide().trigger("hidden");
        },
        removeLoading: function() {
            this.$loading.remove(), this.$loading = null, this.isLoading = !1;
        },
        loading: function(b) {
            b = b || function() {};
            var c = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isLoading) if (this.isLoading && this.$loading) {
                this.$loading.removeClass("in");
                var d = this;
                a.support.transition && this.$element.hasClass("fade") ? this.$loading.one(a.support.transition.end, function() {
                    d.removeLoading();
                }) : d.removeLoading();
            } else b && b(this.isLoading); else {
                var e = a.support.transition && c;
                this.$loading = a('<div class="loading-mask ' + c + '">').append(this.options.spinner).appendTo(this.$element), 
                e && this.$loading[0].offsetWidth, this.$loading.addClass("in"), this.isLoading = !0, 
                e ? this.$loading.one(a.support.transition.end, b) : b();
            }
        },
        focus: function() {
            var a = this.$element.find(this.options.focusOn);
            a = a.length ? a : this.$element, a.focus();
        },
        attention: function() {
            if (this.options.attentionAnimation) {
                this.$element.removeClass("animated").removeClass(this.options.attentionAnimation);
                var a = this;
                setTimeout(function() {
                    a.$element.addClass("animated").addClass(a.options.attentionAnimation);
                }, 0);
            }
            this.focus();
        },
        destroy: function() {
            var b = a.Event("destroy");
            this.$element.trigger(b), b.isDefaultPrevented() || (this.$element.off(".modal").removeData("modal").removeClass("in").attr("aria-hidden", !0), 
            this.$parent !== this.$element.parent() ? this.$element.appendTo(this.$parent) : this.$parent.length || (this.$element.remove(), 
            this.$element = null), this.$element.trigger("destroyed"));
        }
    }, a.fn.modal = function(c, d) {
        return this.each(function() {
            var e = a(this), f = e.data("modal"), g = a.extend({}, a.fn.modal.defaults, e.data(), "object" == typeof c && c);
            f || e.data("modal", f = new b(this, g)), "string" == typeof c ? f[c].apply(f, [].concat(d)) : g.show && f.show();
        });
    }, a.fn.modal.defaults = {
        keyboard: !0,
        backdrop: !0,
        loading: !1,
        show: !0,
        width: null,
        height: null,
        maxHeight: null,
        modalOverflow: !1,
        consumeTab: !0,
        focusOn: null,
        replace: !1,
        resize: !1,
        attentionAnimation: "shake",
        manager: "body",
        spinner: '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
        backdropTemplate: '<div class="modal-backdrop" />'
    }, a.fn.modal.Constructor = b, a(function() {
        a(document).off("click.modal").on("click.modal.data-api", '[data-toggle="modal"]', function(b) {
            var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({
                remote: !/#/.test(d) && d
            }, e.data(), c.data());
            b.preventDefault(), e.modal(f).one("hide", function() {
                c.focus();
            });
        });
    });
}(window.jQuery), !function(a) {
    a([ "jquery" ], function(a) {
        return function() {
            function b(a, b, c) {
                return o({
                    type: u.error,
                    iconClass: p().iconClasses.error,
                    message: a,
                    optionsOverride: c,
                    title: b
                });
            }
            function c(b, c) {
                return b || (b = p()), r = a("#" + b.containerId), r.length ? r : (c && (r = l(b)), 
                r);
            }
            function d(a, b, c) {
                return o({
                    type: u.info,
                    iconClass: p().iconClasses.info,
                    message: a,
                    optionsOverride: c,
                    title: b
                });
            }
            function e(a) {
                s = a;
            }
            function f(a, b, c) {
                return o({
                    type: u.success,
                    iconClass: p().iconClasses.success,
                    message: a,
                    optionsOverride: c,
                    title: b
                });
            }
            function g(a, b, c) {
                return o({
                    type: u.warning,
                    iconClass: p().iconClasses.warning,
                    message: a,
                    optionsOverride: c,
                    title: b
                });
            }
            function h(a) {
                var b = p();
                r || c(b), k(a, b) || j(b);
            }
            function i(b) {
                var d = p();
                return r || c(d), b && 0 === a(":focus", b).length ? void q(b) : void (r.children().length && r.remove());
            }
            function j(b) {
                for (var c = r.children(), d = c.length - 1; d >= 0; d--) k(a(c[d]), b);
            }
            function k(b, c) {
                return b && 0 === a(":focus", b).length ? (b[c.hideMethod]({
                    duration: c.hideDuration,
                    easing: c.hideEasing,
                    complete: function() {
                        q(b);
                    }
                }), !0) : !1;
            }
            function l(b) {
                return r = a("<div/>").attr("id", b.containerId).addClass(b.positionClass).attr("aria-live", "polite").attr("role", "alert"), 
                r.appendTo(a(b.target)), r;
            }
            function m() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: !0
                };
            }
            function n(a) {
                s && s(a);
            }
            function o(b) {
                function d(b) {
                    return !a(":focus", j).length || b ? j[g.hideMethod]({
                        duration: g.hideDuration,
                        easing: g.hideEasing,
                        complete: function() {
                            q(j), g.onHidden && "hidden" !== o.state && g.onHidden(), o.state = "hidden", o.endTime = new Date(), 
                            n(o);
                        }
                    }) : void 0;
                }
                function e() {
                    (g.timeOut > 0 || g.extendedTimeOut > 0) && (i = setTimeout(d, g.extendedTimeOut));
                }
                function f() {
                    clearTimeout(i), j.stop(!0, !0)[g.showMethod]({
                        duration: g.showDuration,
                        easing: g.showEasing
                    });
                }
                var g = p(), h = b.iconClass || g.iconClass;
                "undefined" != typeof b.optionsOverride && (g = a.extend(g, b.optionsOverride), 
                h = b.optionsOverride.iconClass || h), t++, r = c(g, !0);
                var i = null, j = a("<div/>"), k = a("<div/>"), l = a("<div/>"), m = a(g.closeHtml), o = {
                    toastId: t,
                    state: "visible",
                    startTime: new Date(),
                    options: g,
                    map: b
                };
                return b.iconClass && j.addClass(g.toastClass).addClass(h), b.title && (k.append(b.title).addClass(g.titleClass), 
                j.append(k)), b.message && (l.append(b.message).addClass(g.messageClass), j.append(l)), 
                g.closeButton && (m.addClass("toast-close-button").attr("role", "button"), j.prepend(m)), 
                j.hide(), g.newestOnTop ? r.prepend(j) : r.append(j), j[g.showMethod]({
                    duration: g.showDuration,
                    easing: g.showEasing,
                    complete: g.onShown
                }), g.timeOut > 0 && (i = setTimeout(d, g.timeOut)), j.hover(f, e), !g.onclick && g.tapToDismiss && j.click(d), 
                g.closeButton && m && m.click(function(a) {
                    a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble && a.cancelBubble !== !0 && (a.cancelBubble = !0), 
                    d(!0);
                }), g.onclick && j.click(function() {
                    g.onclick(), d();
                }), n(o), g.debug && console && console.log(o), j;
            }
            function p() {
                return a.extend({}, m(), v.options);
            }
            function q(a) {
                r || (r = c()), a.is(":visible") || (a.remove(), a = null, 0 === r.children().length && r.remove());
            }
            var r, s, t = 0, u = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            }, v = {
                clear: h,
                remove: i,
                error: b,
                getContainer: c,
                info: d,
                options: {},
                subscribe: e,
                success: f,
                version: "2.0.3",
                warning: g
            };
            return v;
        }();
    });
}("function" == typeof define && define.amd ? define : function(a, b) {
    "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : window.toastr = b(window.jQuery);
});