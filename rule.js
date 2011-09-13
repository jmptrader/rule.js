(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  (function(name, definition) {
    if (typeof define === 'function') {
      return define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
      return module.exports = definition();
    } else {
      return this[name] = definition();
    }
  })('rule', function() {
    var rule;
    rule = function(f) {
      return rule.U.bind(f, rule)(rule);
    };
    rule.domReady = function(f) {
      return rule.U.domReady(rule.U.bind(f, rule));
    };
    rule._meta = {
      version: '0.1',
      author: 'Rod Vagg <rod@vagg.org> @rvagg'
    };
    rule.U = (function() {
      var addClass, bind, cumulativeDelayed, delayed, domReady, each, element, elements, extend, fieldValue, fire, formSerializers, hasClass, hide, invoke, isArray, isFloat, isFunction, isInt, isRegex, isString, isVisible, lib, observe, removeClass, show, styleValue, toArray, toggle, toggleClass, trim;
      lib = typeof Prototype !== "undefined" && Prototype !== null ? 'prototype' : typeof jQuery !== "undefined" && jQuery !== null ? 'jquery' : typeof ender !== "undefined" && ender !== null ? 'ender' : 'unknown';
      styleValue = function(e, key) {};
      isFunction = function(f) {
        return Object.prototype.toString.call(f) === '[object Function]';
      };
      isString = function(s) {
        return Object.prototype.toString.call(s) === '[object String]';
      };
      isArray = function(a) {
        return Object.prototype.toString.call(a) === '[object Array]';
      };
      isRegex = function(a) {
        return Object.prototype.toString.call(a) === '[object RegExp]';
      };
      toArray = function(a) {
        var length, ret;
        if (!(a != null)) {
          return null;
        }
        if (Object(a)['toArray'] != null) {
          return a.toArray();
        }
        ret = new Array(length = a.length || 0);
        while (length--) {
          ret[length] = a[length];
        }
        return ret;
      };
      bind = function(f, ctx) {
        return function() {
          return f.apply(ctx, arguments);
        };
      };
      toggleClass = function(e, c) {
        if (hasClass(e, c)) {
          return removeClass(e, c);
        } else {
          return addClass(e, c);
        }
      };
      invoke = function() {
        var args, arr, e, func, _i, _len, _results;
        args = toArray(arguments);
        arr = args.shift();
        func = args.shift();
        _results = [];
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          e = arr[_i];
          _results.push(e[func].apply(e, args));
        }
        return _results;
      };
      each = function(arr, func, args) {
        var e, _i, _len;
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          e = arr[_i];
          func.apply(null, [e].concat(args));
        }
        return true;
      };
      extend = function(dst, src) {
        var key, value;
        if (!(dst != null)) {
          return null;
        }
        if (!(src != null)) {
          return dst;
        }
        for (key in src) {
          value = src[key];
          dst[key] = value;
        }
        return dst;
      };
      trim = function(s) {
        if (s != null) {
          s = /^\s*(.*)$/.exec(s.replace(/^(.*\S)\s*$/, '$1'))[1];
        }
        return s;
      };
      isInt = function(s) {
        if (s.indexOf(' ') !== -1) {
          return false;
        }
        if (s === '' || parseInt(s, 10) !== (s * 1)) {
          return false;
        }
        return true;
      };
      isFloat = function(s) {
        if (s.indexOf(' ') !== -1) {
          return false;
        }
        if (s === '' || parseFloat(s, 10) !== (s * 1)) {
          return false;
        }
        return true;
      };
      isVisible = function(e) {
        while (e && e.parentNode) {
          if (styleValue(e, 'display') === 'none') {
            return false;
          }
          e = e.parentNode;
        }
        return true;
      };
      delayed = function() {
        var args, f, func, timeout;
        args = toArray(arguments);
        func = args.shift();
        timeout = args.shift() * 1000;
        f = function() {
          return func.apply(func, args);
        };
        return function() {
          return setTimeout(f, timeout);
        };
      };
      cumulativeDelayed = function() {
        var args, func, timeout, __delayedId;
        args = toArray(arguments);
        func = args.shift();
        timeout = args.shift() * 1000;
        __delayedId = null;
        return function() {
          var f, _args;
          _args = args.concat(toArray(arguments));
          if (__delayedId !== null) {
            clearTimeout(__delayedId);
          }
          f = function() {
            return func.apply(f, _args);
          };
          return __delayedId = setTimeout(f, timeout);
        };
      };
      if (lib === 'jquery') {
        elements = jQuery;
        element = function(id) {
          var ele;
          if (!(id != null) || !isString(id) || id.length === 0) {
            return null;
          }
          if (id.charAt(0) !== '#') {
            id = '#' + id;
          }
          ele = elements(id);
          if (ele.length > 0) {
            return ele[0];
          }
          return null;
        };
        observe = function(ele, event, listener) {
          return jQuery(ele).bind(event, listener);
        };
        fire = function(ele, event, memo) {
          return jQuery(ele).trigger(event, memo);
        };
        show = function(e) {
          return jQuery(e).show();
        };
        hide = function(e) {
          return jQuery(e).hide();
        };
        toggle = function(e) {
          return jQuery(e).toggle();
        };
        hasClass = function(e, c) {
          return jQuery(e).hasClass(c);
        };
        addClass = function(e, c) {
          return jQuery(e).addClass(c);
        };
        removeClass = function(e, c) {
          return jQuery(e).removeClass(c);
        };
        domReady = function(f) {
          return jQuery.ready(f);
        };
        fieldValue = function(elements) {
          var ele, key, ret, value, _i, _len, _ref;
          ret = [];
          _ref = elements.serializeArray();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ele = _ref[_i];
            for (key in ele) {
              value = ele[key];
              if (key === 'value') {
                ret.push(value);
              }
            }
          }
          switch (ret.length) {
            case 0:
              return null;
            case 1:
              return ret[0];
            default:
              return ret;
          }
        };
        styleValue = function(e, key) {
          return jQuery.css(e, key);
        };
      } else if (lib === 'prototype') {
        elements = $$;
        element = function(id) {
          if (!(id != null) || !isString(id)) {
            return null;
          }
          if (id.charAt(0) === '#') {
            id = id.substring(1);
          }
          return $(id);
        };
        observe = function(ele, event, listener) {
          var ob;
          ob = function(e) {
            return Event.observe(e, event, listener);
          };
          if (isString(ele)) {
            return elements(ele).each(ob);
          } else {
            return ob(ele);
          }
        };
        fire = function(ele, event, memo) {
          var f;
          f = function(e) {
            return Element.fire(e, event, memo);
          };
          if (Object.isString(ele)) {
            return elements(ele).each(f);
          } else {
            return f(ele);
          }
        };
        hasClass = Element.hasClassName;
        show = Element.show;
        hide = Element.hide;
        toggle = Element.toggle;
        addClass = Element.addClassName;
        removeClass = Element.removeClassName;
        domReady = function(f) {
          return document.observe('dom:loaded', f);
        };
        fieldValue = function(elements) {
          var key, ret, value, _ref;
          ret = [];
          _ref = Form.serializeElements(elements, {
            hash: true
          });
          for (key in _ref) {
            value = _ref[key];
            ret.push(value);
          }
          switch (ret.length) {
            case 0:
              return null;
            case 1:
              return ret[0];
            default:
              return ret;
          }
        };
        styleValue = function(e, key) {
          return $(e).getStyle(key);
        };
      } else if (lib === 'ender') {
        elements = ender;
        element = function(id) {
          var ele;
          if (!(id != null) || !isString(id) || id.length === 0) {
            return null;
          }
          if (id.charAt(0) !== '#') {
            id = '#' + id;
          }
          ele = elements(id);
          if (ele.length > 0) {
            return ele[0];
          }
          return null;
        };
        observe = function(ele, event, listener) {
          return ender(ele).bind(event, listener);
        };
        fire = function(ele, event, memo) {
          return ender(ele).emit(event, memo);
        };
        show = function(e) {
          return ender(e).show();
        };
        hide = function(e) {
          return ender(e).hide();
        };
        toggle = function(e) {
          return ender(e).toggle();
        };
        hasClass = function(e, c) {
          return ender(e).hasClass(c);
        };
        addClass = function(e, c) {
          return ender(e).addClass(c);
        };
        removeClass = function(e, c) {
          return ender(e).removeClass(c);
        };
        domReady = function(f) {
          return ender.domReady(f);
        };
        fieldValue = function(elements) {
          var e, ret, value, _i, _len;
          ret = [];
          for (_i = 0, _len = elements.length; _i < _len; _i++) {
            e = elements[_i];
            value = formSerializers[e.tagName.toLowerCase()](e);
            if (value !== null) {
              ret.push(value);
            }
          }
          switch (ret.length) {
            case 0:
              return null;
            case 1:
              return ret[0];
            default:
              return ret;
          }
        };
        styleValue = function(e, key) {
          return ender(e).css(key);
        };
        formSerializers = (function() {
          var input, inputSelector, optionValue, select, selectMany, selectOne, valueSelector;
          input = function(e) {
            var type;
            if ((type = e.type.toLowerCase()) === 'checkbox' || type === 'radio') {
              return inputSelector(e);
            }
            return valueSelector(e);
          };
          inputSelector = function(e) {
            if (e.checked) {
              return e.value;
            } else {
              return null;
            }
          };
          valueSelector = function(e) {
            return e.value;
          };
          select = function(e) {
            if (e.type.toLowerCase() === 'select-one') {
              return selectOne(e);
            } else {
              return selectMany(e);
            }
          };
          selectOne = function(e) {
            var i;
            if ((i = e.selectedIndex) >= 0) {
              return optionValue(e.options[i]);
            } else {
              return null;
            }
          };
          selectMany = function(e) {
            var o, values, _i, _len, _ref, _results;
            if (!(e.length != null)) {
              return null;
            }
            values = [];
            _ref = e.options(where(o.selected));
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              o = _ref[_i];
              _results.push(values.push(optionValue(o)));
            }
            return _results;
          };
          optionValue = function(e) {
            if (e.value != null) {
              return e.value;
            } else {
              return e.text;
            }
          };
          return {
            input: input,
            select: select,
            textarea: valueSelector,
            button: valueSelector
          };
        })();
      } else {
        throw "PrototypeJS or jQuery required for rule.js";
      }
      return {
        isFunction: isFunction,
        isString: isString,
        isArray: isArray,
        isRegex: isRegex,
        toArray: toArray,
        elements: elements,
        element: element,
        observe: observe,
        fire: fire,
        bind: bind,
        hasClass: hasClass,
        show: show,
        hide: hide,
        toggle: toggle,
        isVisible: isVisible,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        invoke: invoke,
        each: each,
        domReady: domReady,
        extend: extend,
        fieldValue: fieldValue,
        trim: trim,
        isInt: isInt,
        isFloat: isFloat,
        delayed: delayed,
        cumulativeDelayed: cumulativeDelayed
      };
    })();
    rule.C = {};
    (function(c, u) {
      c.Base = (function() {
        function Base(t, child) {
          this.t = t;
          this.child = child;
        }
        Base.prototype.connect = function(parent) {
          var _ref;
          this.parent = parent;
          if (u.isFunction((_ref = this.child) != null ? _ref.connect : void 0)) {
            return this.child.connect(this);
          }
        };
        Base.prototype.setTrigger = function(t) {
          if ((this.parent != null) && u.isFunction(this.parent.setTrigger)) {
            return this.parent.setTrigger(t);
          }
        };
        Base.prototype.setCondition = function(c) {
          if ((this.parent != null) && u.isFunction(this.parent.setCondition)) {
            return this.parent.setCondition(c);
          }
        };
        Base.prototype.setAction = function(a) {
          if ((this.parent != null) && u.isFunction(this.parent.setAction)) {
            return this.parent.setAction(a);
          }
        };
        Base.prototype.setActionOtherwise = function(ao) {
          if ((this.parent != null) && u.isFunction(this.parent.setActionOtherwise)) {
            return this.parent.setActionOtherwise(ao);
          }
        };
        Base.prototype.trigger = function(c, event) {
          if ((this.parent != null) && u.isFunction(this.parent.trigger)) {
            return this.parent.trigger(c, event);
          }
        };
        Base.prototype.toString = function() {
          return 'Base';
        };
        return Base;
      })();
      c.Root = (function() {
        __extends(Root, c.Base);
        function Root(args) {
          var r;
          if (arguments.length === 0) {
            return;
          }
          if (!u.isArray(args)) {
            args = u.toArray(arguments);
          }
          this.triggers = [];
          this.conditions = [];
          this.actions = [];
          this.actionsOtherwise = [];
          this.t = args.shift();
          this.name = args.shift();
          while ((r = args.shift()) != null) {
            if (u.isFunction(r.connect)) {
              r.connect(this);
            }
          }
          this;
        }
        Root.prototype.setTrigger = function(t) {
          return this.triggers.push(t);
        };
        Root.prototype.setCondition = function(c) {
          return this.conditions.push(c);
        };
        Root.prototype.setAction = function(a) {
          return this.actions.push(a);
        };
        Root.prototype.setActionOtherwise = function(a) {
          return this.actionsOtherwise.push(a);
        };
        Root.prototype.trigger = function(e, event) {
          return this["invokeActions" + (this.conditionsSatisfied(e, event) ? '' : 'Otherwise')](e, event);
        };
        Root.prototype.conditionsSatisfied = function(e, event) {
          var c, _i, _len, _ref;
          _ref = this.conditions;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            if (!c.satisfied(e, event)) {
              return false;
            }
          }
          return true;
        };
        Root.prototype.invokeActions = function(e, event) {
          return u.invoke(this.actions, 'trigger', e, event);
        };
        Root.prototype.invokeActionsOtherwise = function(e, event) {
          return u.invoke(this.actionsOtherwise, 'trigger', e, event);
        };
        return Root;
      })();
      c.Condition = (function() {
        __extends(Condition, c.Base);
        function Condition() {
          Condition.__super__.constructor.apply(this, arguments);
        }
        Condition.prototype.toString = function() {
          return 'Condition';
        };
        Condition.prototype.connect = function(r) {
          Condition.__super__.connect.call(this, r);
          return this.setCondition(this);
        };
        Condition.prototype.satisfied = function(c, event) {
          return true;
        };
        return Condition;
      })();
      c.ConditionAnd = (function() {
        __extends(ConditionAnd, c.Root);
        function ConditionAnd(args) {
          if (arguments.length === 0) {
            return;
          }
          if (!u.isArray(args)) {
            args = u.toArray(arguments);
          }
          args = [this.toString().toLowerCase(), this.toString().toLowerCase()].concat(args);
          ConditionAnd.__super__.constructor.call(this, args);
          this;
        }
        ConditionAnd.prototype.connect = function(parent) {
          this.parent = parent;
          if ((this.parent != null) && u.isFunction(this.parent.setCondition)) {
            return this.parent.setCondition(this);
          }
        };
        ConditionAnd.prototype.satisfied = function(e, event) {
          return this.conditionsSatisfied(e, event);
        };
        ConditionAnd.prototype.toString = function() {
          return 'And';
        };
        return ConditionAnd;
      })();
      c.ConditionOr = (function() {
        __extends(ConditionOr, c.ConditionAnd);
        function ConditionOr() {
          ConditionOr.__super__.constructor.apply(this, arguments);
        }
        ConditionOr.prototype.conditionsSatisfied = function(e, event) {
          var c, _i, _len, _ref;
          _ref = this.conditions;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            if (c.satisfied(e, event)) {
              return true;
            }
          }
          return false;
        };
        ConditionOr.prototype.toString = function() {
          return 'Or';
        };
        return ConditionOr;
      })();
      c.When = (function() {
        __extends(When, c.Base);
        function When(t, child) {
          var args, func;
          if (arguments.length === 0) {
            return;
          }
          if (u.isFunction(child)) {
            args = u.toArray(arguments);
            args.shift();
            func = args.shift();
            child = func.apply(null, args);
          }
          When.__super__.constructor.call(this, t, child);
        }
        When.prototype.toString = function() {
          return 'When';
        };
        return When;
      })();
      c.SimpleElementsCondition = (function() {
        __extends(SimpleElementsCondition, c.Condition);
        function SimpleElementsCondition() {
          if (arguments.length === 0) {
            return;
          }
          this.args = u.toArray(arguments);
          SimpleElementsCondition.__super__.constructor.call(this, this.args.shift());
          this.func = this.args.shift();
          this.elements = this.args.shift();
        }
        SimpleElementsCondition.prototype.toString = function() {
          return 'SimpleElementsCondition';
        };
        SimpleElementsCondition.prototype.satisfied = function() {
          var e, _i, _len, _ref;
          _ref = u.elements(this.elements);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            if (!this.func.apply(null, [e].concat(this.args))) {
              return false;
            }
          }
          return true;
        };
        return SimpleElementsCondition;
      })();
      c.Event = (function() {
        __extends(Event, c.Base);
        function Event(eventType, e, options) {
          this.eventType = eventType;
          this.e = e;
          this.options = options != null ? options : {};
          Event.__super__.constructor.call(this, this.eventType);
        }
        Event.prototype.connect = function(r) {
          var f;
          Event.__super__.connect.call(this, r);
          this.setTrigger(this);
          if ((this.e != null) && (this.eventType != null)) {
            f = u.bind(this.event, this);
            if (this.options.delayed != null) {
              f = u.delayed(f, this.options.delayed);
            } else if (this.options.cumulativeDelayed != null) {
              f = u.cumulativeDelayed(f, this.options.cumulativeDelayed);
            }
            return u.observe(this.e, this.eventType, f);
          }
        };
        Event.prototype.event = function(event) {
          return this.trigger(this, event);
        };
        Event.prototype.toString = function() {
          return "Event [" + (this.t != null ? this.t : void 0) + "]";
        };
        return Event;
      })();
      c.CustomEvent = (function() {
        __extends(CustomEvent, c.Event);
        function CustomEvent(t, e, eventType, options) {
          if (options == null) {
            options = {};
          }
          CustomEvent.__super__.constructor.call(this, t, e, options);
          this.eventType = eventType;
          this.t = t;
        }
        return CustomEvent;
      })();
      c.Otherwise = (function() {
        __extends(Otherwise, c.Base);
        function Otherwise() {
          Otherwise.__super__.constructor.apply(this, arguments);
        }
        Otherwise.prototype.setAction = function() {
          return this.setActionOtherwise.apply(this, arguments);
        };
        Otherwise.prototype.toString = function() {
          return 'Otherwise';
        };
        return Otherwise;
      })();
      c.Action = (function() {
        __extends(Action, c.Base);
        function Action() {
          Action.__super__.constructor.apply(this, arguments);
        }
        Action.prototype.toString = function() {
          return 'Action';
        };
        Action.prototype.connect = function(r) {
          Action.__super__.connect.call(this, r);
          return this.setAction(this);
        };
        Action.prototype.trigger = function() {};
        return Action;
      })();
      c.SimpleElementsAction = (function() {
        __extends(SimpleElementsAction, c.Action);
        function SimpleElementsAction() {
          if (arguments.length === 0) {
            return;
          }
          this.args = u.toArray(arguments);
          SimpleElementsAction.__super__.constructor.call(this, this.args.shift());
          this.func = this.args.shift();
          this.elements = this.args.shift();
        }
        SimpleElementsAction.prototype.toString = function() {
          return 'SimpleElementsAction';
        };
        SimpleElementsAction.prototype.trigger = function() {
          return u.each(u.elements(this.elements), this.func, this.args);
        };
        return SimpleElementsAction;
      })();
      c.ValidatorBase = (function() {
        __extends(ValidatorBase, c.Condition);
        function ValidatorBase(t, elements, options, defaultOptions) {
          this.elements = elements;
          if (arguments.length === 0) {
            return;
          }
          ValidatorBase.__super__.constructor.call(this, t);
          this.options = u.extend(defaultOptions, options);
        }
        ValidatorBase.prototype.satisfied = function() {
          var value, values, _i, _len;
          values = this.fieldValues();
          for (_i = 0, _len = values.length; _i < _len; _i++) {
            value = values[_i];
            if (this.valid(value)) {
              return true;
            }
          }
          return false;
        };
        ValidatorBase.prototype.fieldValues = function() {
          var values;
          values = u.fieldValue(u.elements(this.elements));
          if (!u.isArray(values)) {
            values = [values];
          }
          return values;
        };
        ValidatorBase.prototype.valid = function(value) {
          return false;
        };
        ValidatorBase.prototype.trim = function(value) {
          if (this.options.trim === true) {
            return u.trim(value);
          }
          return value;
        };
        return ValidatorBase;
      })();
      c.ValidatorRequired = (function() {
        __extends(ValidatorRequired, c.ValidatorBase);
        function ValidatorRequired(t, elements, options) {
          this.elements = elements;
          ValidatorRequired.__super__.constructor.call(this, t, this.elements, options, {
            trim: false
          });
        }
        ValidatorRequired.prototype.valid = function(value) {
          value = this.trim(value);
          return (value != null ? value.length : void 0) > 0;
        };
        ValidatorRequired.prototype.toString = function() {
          return 'ValidatorRequired';
        };
        return ValidatorRequired;
      })();
      c.ValidatorInteger = (function() {
        __extends(ValidatorInteger, c.ValidatorBase);
        function ValidatorInteger(t, elements, options) {
          this.elements = elements;
          ValidatorInteger.__super__.constructor.call(this, t, this.elements, options, {
            trim: false
          });
        }
        ValidatorInteger.prototype.valid = function(value) {
          var i;
          value = this.trim(value);
          if (value === '') {
            return true;
          }
          if (!u.isInt(value)) {
            return false;
          }
          i = parseInt(value, 10);
          if ((this.options.max != null) && i > this.options.max) {
            return false;
          }
          if ((this.options.min != null) && i < this.options.min) {
            return false;
          }
          return true;
        };
        ValidatorInteger.prototype.toString = function() {
          return 'ValidatorInteger';
        };
        return ValidatorInteger;
      })();
      c.ValidatorFloat = (function() {
        __extends(ValidatorFloat, c.ValidatorBase);
        function ValidatorFloat(t, elements, options) {
          this.elements = elements;
          ValidatorFloat.__super__.constructor.call(this, t, this.elements, options, {
            trim: false
          });
        }
        ValidatorFloat.prototype.valid = function(value) {
          var f;
          value = this.trim(value);
          if (value === '') {
            return true;
          }
          if (!u.isFloat(value)) {
            return false;
          }
          f = parseFloat(value, 10);
          if ((this.options.maxInclusive != null) && f > this.options.maxInclusive) {
            return false;
          }
          if ((this.options.minInclusive != null) && f < this.options.minInclusive) {
            return false;
          }
          if ((this.options.maxExclusive != null) && f >= this.options.maxExclusive) {
            return false;
          }
          if ((this.options.minExclusive != null) && f <= this.options.minExclusive) {
            return false;
          }
          return true;
        };
        ValidatorFloat.prototype.toString = function() {
          return 'ValidatorFloat';
        };
        return ValidatorFloat;
      })();
      c.ValidatorRegex = (function() {
        __extends(ValidatorRegex, c.ValidatorBase);
        function ValidatorRegex(t, elements, options) {
          this.elements = elements;
          if (u.isString(options)) {
            this.regex = new RegExp(options);
            options = {};
          }
          if (u.isRegex(options)) {
            this.regex = options;
            options = {};
          }
          ValidatorRegex.__super__.constructor.call(this, t, this.elements, options, {
            trim: false
          });
          if (this.options.regex != null) {
            if (u.isString(this.options.regex)) {
              this.regex = new RegExp(this.options.regex, this.options.options != null ? this.options.options : '');
            }
            if (u.isRegex(this.options.regex)) {
              this.regex = this.options.regex;
            }
          }
        }
        ValidatorRegex.prototype.valid = function(value) {
          value = this.trim(value);
          if (value === '') {
            return true;
          }
          if (this.regex != null) {
            return this.regex.test(value);
          }
          return false;
        };
        ValidatorRegex.prototype.toString = function() {
          return 'ValidatorRegex';
        };
        return ValidatorRegex;
      })();
      return c.ValidatorEmail = (function() {
        __extends(ValidatorEmail, c.ValidatorRegex);
        function ValidatorEmail(t, elements, options) {
          this.elements = elements;
          ValidatorEmail.__super__.constructor.call(this, t, this.elements, options, {
            trim: false
          });
          this.regex = new RegExp('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))$');
        }
        return ValidatorEmail;
      })();
    })(rule.C, rule.U);
    (function(r) {
      var k, meths, v, _results;
      meths = {
        define: 'Root',
        on: 'Base',
        "do": 'Base',
        otherwise: 'Otherwise',
        "when": 'When',
        validate: 'When',
        "and": 'ConditionAnd',
        "or": 'ConditionOr',
        required: 'ValidatorRequired',
        "int": 'ValidatorInteger',
        "float": 'ValidatorFloat',
        event: 'CustomEvent',
        click: 'Event',
        change: 'Event',
        keyup: 'Event',
        classChange: {
          "class": 'Event',
          curry: ['rule:classChange']
        },
        show: {
          "class": 'SimpleElementsAction',
          curry: [r.U.show]
        },
        hide: {
          "class": 'SimpleElementsAction',
          curry: [r.U.hide]
        },
        toggle: {
          "class": 'SimpleElementsAction',
          curry: [r.U.toggle]
        },
        addClass: {
          "class": 'SimpleElementsAction',
          curry: [r.U.addClass]
        },
        removeClass: {
          "class": 'SimpleElementsAction',
          curry: [r.U.removeClass]
        },
        toggleClass: {
          "class": 'SimpleElementsAction',
          curry: [r.U.toggleClass]
        },
        run: 'Action',
        hasClass: {
          "class": 'SimpleElementsCondition',
          curry: [r.U.hasClass]
        }
      };
      _results = [];
      for (k in meths) {
        v = meths[k];
        _results.push(r[k] = (function(k, v) {
          return function() {
            var a, args, c, clazz, f, _i, _len;
            clazz = v["class"] != null ? v["class"] : v;
            args = [k];
            if (v.curry != null) {
              args = args.concat(v.curry);
            }
            for (_i = 0, _len = arguments.length; _i < _len; _i++) {
              a = arguments[_i];
              args.push(a);
            }
            f = new (c = r.C[clazz]);
            c.prototype.constructor.apply(f, args);
            return f;
          };
        })(k, v));
      }
      return _results;
    })(rule);
    return rule;
  });
}).call(this);
