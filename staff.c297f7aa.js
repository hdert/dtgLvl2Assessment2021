(function () {
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire8131"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      let init = $parcel$inits[id];
      delete $parcel$inits[id];
      let module = {id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire8131"] = parcelRequire;
}
var $a56c10b4ba7b13eb18268be3933fb39e$exports = {};
parcelRequire.register("6Ncvj", function(module, exports) {
(function(global, factory) {
    typeof module.exports === 'object' && "object" !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SelectorEngine = factory());
})(module.exports, function() {
    'use strict';
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */ const NODE_TEXT = 3;
    const SelectorEngine = {
        find (selector, element = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne (selector, element = document.documentElement) {
            return Element.prototype.querySelector.call(element, selector);
        },
        children (element, selector) {
            return [].concat(...element.children).filter((child)=>child.matches(selector)
            );
        },
        parents (element, selector) {
            const parents = [];
            let ancestor = element.parentNode;
            while(ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT){
                if (ancestor.matches(selector)) parents.push(ancestor);
                ancestor = ancestor.parentNode;
            }
            return parents;
        },
        prev (element, selector) {
            let previous = element.previousElementSibling;
            while(previous){
                if (previous.matches(selector)) return [
                    previous
                ];
                previous = previous.previousElementSibling;
            }
            return [];
        },
        next (element, selector) {
            let next = element.nextElementSibling;
            while(next){
                if (next.matches(selector)) return [
                    next
                ];
                next = next.nextElementSibling;
            }
            return [];
        }
    };
    return SelectorEngine;
});

});


parcelRequire.register("5lFcn", function(module, exports) {
(function(global, factory) {
    typeof module.exports === 'object' && "object" !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Data = factory());
})(module.exports, function() {
    'use strict';
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */ const elementMap = new Map();
    var data = {
        set (element, key, instance) {
            if (!elementMap.has(element)) elementMap.set(element, new Map());
            const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
            // can be removed later when multiple key/instances are fine to be used
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
                // eslint-disable-next-line no-console
                console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
                return;
            }
            instanceMap.set(key, instance);
        },
        get (element, key) {
            if (elementMap.has(element)) return elementMap.get(element).get(key) || null;
            return null;
        },
        remove (element, key) {
            if (!elementMap.has(element)) return;
            const instanceMap = elementMap.get(element);
            instanceMap.delete(key); // free up element references if there are no instances left for an element
            if (instanceMap.size === 0) elementMap.delete(element);
        }
    };
    return data;
});

});


parcelRequire.register("3vb2O", function(module, exports) {
(function(global, factory) {
    typeof module.exports === 'object' && "object" !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EventHandler = factory());
})(module.exports, function() {
    'use strict';
    const getjQuery = ()=>{
        const { jQuery: jQuery  } = window;
        if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) return jQuery;
        return null;
    };
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */ const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    const stripNameRegex = /\..*/;
    const stripUidRegex = /::\d+$/;
    const eventRegistry = {
    }; // Events storage
    let uidEvent = 1;
    const customEvents = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    };
    const customEventsRegex = /^(mouseenter|mouseleave)/i;
    const nativeEvents = new Set([
        'click',
        'dblclick',
        'mouseup',
        'mousedown',
        'contextmenu',
        'mousewheel',
        'DOMMouseScroll',
        'mouseover',
        'mouseout',
        'mousemove',
        'selectstart',
        'selectend',
        'keydown',
        'keypress',
        'keyup',
        'orientationchange',
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
        'pointerdown',
        'pointermove',
        'pointerup',
        'pointerleave',
        'pointercancel',
        'gesturestart',
        'gesturechange',
        'gestureend',
        'focus',
        'blur',
        'change',
        'reset',
        'select',
        'submit',
        'focusin',
        'focusout',
        'load',
        'unload',
        'beforeunload',
        'resize',
        'move',
        'DOMContentLoaded',
        'readystatechange',
        'error',
        'abort',
        'scroll'
    ]);
    /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */ function getUidEvent(element, uid) {
        return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
    }
    function getEvent(element) {
        const uid = getUidEvent(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {
        };
        return eventRegistry[uid];
    }
    function bootstrapHandler(element, fn) {
        return function handler(event) {
            event.delegateTarget = element;
            if (handler.oneOff) EventHandler.off(element, event.type, fn);
            return fn.apply(element, [
                event
            ]);
        };
    }
    function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
            const domElements = element.querySelectorAll(selector);
            for(let { target: target  } = event; target && target !== this; target = target.parentNode){
                for(let i = domElements.length; i--;)if (domElements[i] === target) {
                    event.delegateTarget = target;
                    if (handler.oneOff) // eslint-disable-next-line unicorn/consistent-destructuring
                    EventHandler.off(element, event.type, selector, fn);
                    return fn.apply(target, [
                        event
                    ]);
                }
            } // To please ESLint
            return null;
        };
    }
    function findHandler(events, handler, delegationSelector = null) {
        const uidEventList = Object.keys(events);
        for(let i = 0, len = uidEventList.length; i < len; i++){
            const event = events[uidEventList[i]];
            if (event.originalHandler === handler && event.delegationSelector === delegationSelector) return event;
        }
        return null;
    }
    function normalizeParams(originalTypeEvent, handler, delegationFn) {
        const delegation = typeof handler === 'string';
        const originalHandler = delegation ? delegationFn : handler;
        let typeEvent = getTypeEvent(originalTypeEvent);
        const isNative = nativeEvents.has(typeEvent);
        if (!isNative) typeEvent = originalTypeEvent;
        return [
            delegation,
            originalHandler,
            typeEvent
        ];
    }
    function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
        if (typeof originalTypeEvent !== 'string' || !element) return;
        if (!handler) {
            handler = delegationFn;
            delegationFn = null;
        } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
        // this prevents the handler from being dispatched the same way as mouseover or mouseout does
        if (customEventsRegex.test(originalTypeEvent)) {
            const wrapFn = (fn)=>{
                return function(event) {
                    if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) return fn.call(this, event);
                };
            };
            if (delegationFn) delegationFn = wrapFn(delegationFn);
            else handler = wrapFn(handler);
        }
        const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
        const events = getEvent(element);
        const handlers = events[typeEvent] || (events[typeEvent] = {
        });
        const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
        if (previousFn) {
            previousFn.oneOff = previousFn.oneOff && oneOff;
            return;
        }
        const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
        const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
        fn.delegationSelector = delegation ? handler : null;
        fn.originalHandler = originalHandler;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element.addEventListener(typeEvent, fn, delegation);
    }
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        const fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) return;
        element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
    }
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        const storeElementEvent = events[typeEvent] || {
        };
        Object.keys(storeElementEvent).forEach((handlerKey)=>{
            if (handlerKey.includes(namespace)) {
                const event = storeElementEvent[handlerKey];
                removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
            }
        });
    }
    function getTypeEvent(event) {
        // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
        event = event.replace(stripNameRegex, '');
        return customEvents[event] || event;
    }
    const EventHandler = {
        on (element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, false);
        },
        one (element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, true);
        },
        off (element, originalTypeEvent, handler, delegationFn) {
            if (typeof originalTypeEvent !== 'string' || !element) return;
            const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
            const inNamespace = typeEvent !== originalTypeEvent;
            const events = getEvent(element);
            const isNamespace = originalTypeEvent.startsWith('.');
            if (typeof originalHandler !== 'undefined') {
                // Simplest case: handler is passed, remove that listener ONLY.
                if (!events || !events[typeEvent]) return;
                removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
                return;
            }
            if (isNamespace) Object.keys(events).forEach((elementEvent)=>{
                removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            });
            const storeElementEvent = events[typeEvent] || {
            };
            Object.keys(storeElementEvent).forEach((keyHandlers)=>{
                const handlerKey = keyHandlers.replace(stripUidRegex, '');
                if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                    const event = storeElementEvent[keyHandlers];
                    removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
                }
            });
        },
        trigger (element, event, args) {
            if (typeof event !== 'string' || !element) return null;
            const $ = getjQuery();
            const typeEvent = getTypeEvent(event);
            const inNamespace = event !== typeEvent;
            const isNative = nativeEvents.has(typeEvent);
            let jQueryEvent;
            let bubbles = true;
            let nativeDispatch = true;
            let defaultPrevented = false;
            let evt = null;
            if (inNamespace && $) {
                jQueryEvent = $.Event(event, args);
                $(element).trigger(jQueryEvent);
                bubbles = !jQueryEvent.isPropagationStopped();
                nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
                defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            if (isNative) {
                evt = document.createEvent('HTMLEvents');
                evt.initEvent(typeEvent, bubbles, true);
            } else evt = new CustomEvent(event, {
                bubbles: bubbles,
                cancelable: true
            });
             // merge custom information in our event
            if (typeof args !== 'undefined') Object.keys(args).forEach((key)=>{
                Object.defineProperty(evt, key, {
                    get () {
                        return args[key];
                    }
                });
            });
            if (defaultPrevented) evt.preventDefault();
            if (nativeDispatch) element.dispatchEvent(evt);
            if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') jQueryEvent.preventDefault();
            return evt;
        }
    };
    return EventHandler;
});

});


parcelRequire.register("MuH6Y", function(module, exports) {
(function(global, factory) {
    typeof module.exports === 'object' && "object" !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Manipulator = factory());
})(module.exports, function() {
    'use strict';
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ function normalizeData(val) {
        if (val === 'true') return true;
        if (val === 'false') return false;
        if (val === Number(val).toString()) return Number(val);
        if (val === '' || val === 'null') return null;
        return val;
    }
    function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, (chr)=>`-${chr.toLowerCase()}`
        );
    }
    const Manipulator = {
        setDataAttribute (element, key, value) {
            element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
        },
        removeDataAttribute (element, key) {
            element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
        },
        getDataAttributes (element) {
            if (!element) return {
            };
            const attributes = {
            };
            Object.keys(element.dataset).filter((key)=>key.startsWith('bs')
            ).forEach((key)=>{
                let pureKey = key.replace(/^bs/, '');
                pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
                attributes[pureKey] = normalizeData(element.dataset[key]);
            });
            return attributes;
        },
        getDataAttribute (element, key) {
            return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
        },
        offset (element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };
        },
        position (element) {
            return {
                top: element.offsetTop,
                left: element.offsetLeft
            };
        }
    };
    return Manipulator;
});

});


parcelRequire.register("1NNbZ", function(module, exports) {



(function(global, factory) {
    typeof module.exports === 'object' && "object" !== 'undefined' ? module.exports = factory((parcelRequire("5lFcn")), (parcelRequire("6Ncvj")), (parcelRequire("3vb2O"))) : typeof define === 'function' && define.amd ? define([
        './dom/data',
        './dom/selector-engine',
        './dom/event-handler'
    ], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Base = factory(global.Data, global.SelectorEngine, global.EventHandler));
})(module.exports, function(Data, SelectorEngine, EventHandler) {
    'use strict';
    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : {
            'default': e
        };
    }
    var Data__default = /*#__PURE__*/ _interopDefaultLegacy(Data);
    var SelectorEngine__default = /*#__PURE__*/ _interopDefaultLegacy(SelectorEngine);
    var EventHandler__default = /*#__PURE__*/ _interopDefaultLegacy(EventHandler);
    const MILLISECONDS_MULTIPLIER = 1000;
    const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
    const getTransitionDurationFromElement = (element)=>{
        if (!element) return 0;
         // Get transition-duration of the element
        let { transitionDuration: transitionDuration , transitionDelay: transitionDelay  } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found
        if (!floatTransitionDuration && !floatTransitionDelay) return 0;
         // If multiple durations are defined, take the first
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    };
    const triggerTransitionEnd = (element)=>{
        element.dispatchEvent(new Event(TRANSITION_END));
    };
    const isElement = (obj)=>{
        if (!obj || typeof obj !== 'object') return false;
        if (typeof obj.jquery !== 'undefined') obj = obj[0];
        return typeof obj.nodeType !== 'undefined';
    };
    const getElement = (obj)=>{
        if (isElement(obj)) // it's a jQuery object or a node element
        return obj.jquery ? obj[0] : obj;
        if (typeof obj === 'string' && obj.length > 0) return SelectorEngine__default['default'].findOne(obj);
        return null;
    };
    const emulateTransitionEnd = (element, duration)=>{
        let called = false;
        const durationPadding = 5;
        const emulatedDuration = duration + durationPadding;
        function listener() {
            called = true;
            element.removeEventListener(TRANSITION_END, listener);
        }
        element.addEventListener(TRANSITION_END, listener);
        setTimeout(()=>{
            if (!called) triggerTransitionEnd(element);
        }, emulatedDuration);
    };
    const execute = (callback)=>{
        if (typeof callback === 'function') callback();
    };
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */ const VERSION = '5.0.1';
    class BaseComponent {
        constructor(element1){
            element1 = getElement(element1);
            if (!element1) return;
            this._element = element1;
            Data__default['default'].set(this._element, this.constructor.DATA_KEY, this);
        }
        dispose() {
            Data__default['default'].remove(this._element, this.constructor.DATA_KEY);
            EventHandler__default['default'].off(this._element, this.constructor.EVENT_KEY);
            Object.getOwnPropertyNames(this).forEach((propertyName)=>{
                this[propertyName] = null;
            });
        }
        _queueCallback(callback, element, isAnimated = true) {
            if (!isAnimated) {
                execute(callback);
                return;
            }
            const transitionDuration = getTransitionDurationFromElement(element);
            EventHandler__default['default'].one(element, 'transitionend', ()=>execute(callback)
            );
            emulateTransitionEnd(element, transitionDuration);
        }
        /** Static */ static getInstance(element) {
            return Data__default['default'].get(element, this.DATA_KEY);
        }
        static get VERSION() {
            return VERSION;
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
        }
    }
    return BaseComponent;
});

});


(function(global, factory) {
    typeof $a56c10b4ba7b13eb18268be3933fb39e$exports === 'object' && "object" !== 'undefined' ? $a56c10b4ba7b13eb18268be3933fb39e$exports = factory((parcelRequire("6Ncvj")), (parcelRequire("5lFcn")), (parcelRequire("3vb2O")), (parcelRequire("MuH6Y")), (parcelRequire("1NNbZ"))) : typeof define === 'function' && define.amd ? define([
        './dom/selector-engine',
        './dom/data',
        './dom/event-handler',
        './dom/manipulator',
        './base-component'
    ], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Carousel = factory(global.SelectorEngine, global.Data, global.EventHandler, global.Manipulator, global.Base));
})($a56c10b4ba7b13eb18268be3933fb39e$exports, function(SelectorEngine, Data, EventHandler, Manipulator, BaseComponent) {
    'use strict';
    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : {
            'default': e
        };
    }
    var SelectorEngine__default = /*#__PURE__*/ _interopDefaultLegacy(SelectorEngine);
    var Data__default = /*#__PURE__*/ _interopDefaultLegacy(Data);
    var EventHandler__default = /*#__PURE__*/ _interopDefaultLegacy(EventHandler);
    var Manipulator__default = /*#__PURE__*/ _interopDefaultLegacy(Manipulator);
    var BaseComponent__default = /*#__PURE__*/ _interopDefaultLegacy(BaseComponent);
    const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
    const toType = (obj)=>{
        if (obj === null || obj === undefined) return `${obj}`;
        return ({
        }).toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    };
    const getSelector = (element)=>{
        let selector = element.getAttribute('data-bs-target');
        if (!selector || selector === '#') {
            let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
            // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
            // `document.querySelector` will rightfully complain it is invalid.
            // See https://github.com/twbs/bootstrap/issues/32273
            if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) return null;
             // Just in case some CMS puts out a full URL with the anchor appended
            if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) hrefAttr = `#${hrefAttr.split('#')[1]}`;
            selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
        }
        return selector;
    };
    const getElementFromSelector = (element)=>{
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
    };
    const triggerTransitionEnd = (element)=>{
        element.dispatchEvent(new Event(TRANSITION_END));
    };
    const isElement = (obj)=>{
        if (!obj || typeof obj !== 'object') return false;
        if (typeof obj.jquery !== 'undefined') obj = obj[0];
        return typeof obj.nodeType !== 'undefined';
    };
    const typeCheckConfig = (componentName, config, configTypes)=>{
        Object.keys(configTypes).forEach((property)=>{
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? 'element' : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        });
    };
    const isVisible = (element)=>{
        if (!element) return false;
        if (element.style && element.parentNode && element.parentNode.style) {
            const elementStyle = getComputedStyle(element);
            const parentNodeStyle = getComputedStyle(element.parentNode);
            return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
        }
        return false;
    };
    const reflow = (element)=>element.offsetHeight
    ;
    const getjQuery = ()=>{
        const { jQuery: jQuery  } = window;
        if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) return jQuery;
        return null;
    };
    const onDOMContentLoaded = (callback)=>{
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback);
        else callback();
    };
    const isRTL = ()=>document.documentElement.dir === 'rtl'
    ;
    const defineJQueryPlugin = (plugin)=>{
        onDOMContentLoaded(()=>{
            const $ = getjQuery();
            /* istanbul ignore if */ if ($) {
                const name = plugin.NAME;
                const JQUERY_NO_CONFLICT = $.fn[name];
                $.fn[name] = plugin.jQueryInterface;
                $.fn[name].Constructor = plugin;
                $.fn[name].noConflict = ()=>{
                    $.fn[name] = JQUERY_NO_CONFLICT;
                    return plugin.jQueryInterface;
                };
            }
        });
    };
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */ const NAME = 'carousel';
    const DATA_KEY = 'bs.carousel';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const ARROW_LEFT_KEY = 'ArrowLeft';
    const ARROW_RIGHT_KEY = 'ArrowRight';
    const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
    const SWIPE_THRESHOLD = 40;
    const Default = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true,
        touch: true
    };
    const DefaultType = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean',
        touch: 'boolean'
    };
    const ORDER_NEXT = 'next';
    const ORDER_PREV = 'prev';
    const DIRECTION_LEFT = 'left';
    const DIRECTION_RIGHT = 'right';
    const EVENT_SLIDE = `slide${EVENT_KEY}`;
    const EVENT_SLID = `slid${EVENT_KEY}`;
    const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
    const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
    const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
    const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
    const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
    const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
    const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
    const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
    const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
    const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
    const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
    const CLASS_NAME_CAROUSEL = 'carousel';
    const CLASS_NAME_ACTIVE = 'active';
    const CLASS_NAME_SLIDE = 'slide';
    const CLASS_NAME_END = 'carousel-item-end';
    const CLASS_NAME_START = 'carousel-item-start';
    const CLASS_NAME_NEXT = 'carousel-item-next';
    const CLASS_NAME_PREV = 'carousel-item-prev';
    const CLASS_NAME_POINTER_EVENT = 'pointer-event';
    const SELECTOR_ACTIVE = '.active';
    const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
    const SELECTOR_ITEM = '.carousel-item';
    const SELECTOR_ITEM_IMG = '.carousel-item img';
    const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
    const SELECTOR_INDICATORS = '.carousel-indicators';
    const SELECTOR_INDICATOR = '[data-bs-target]';
    const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
    const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
    const POINTER_TYPE_TOUCH = 'touch';
    const POINTER_TYPE_PEN = 'pen';
    /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */ class Carousel extends BaseComponent__default['default'] {
        constructor(element1, config1){
            super(element1);
            this._items = null;
            this._interval = null;
            this._activeElement = null;
            this._isPaused = false;
            this._isSliding = false;
            this.touchTimeout = null;
            this.touchStartX = 0;
            this.touchDeltaX = 0;
            this._config = this._getConfig(config1);
            this._indicatorsElement = SelectorEngine__default['default'].findOne(SELECTOR_INDICATORS, this._element);
            this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
            this._pointerEvent = Boolean(window.PointerEvent);
            this._addEventListeners();
        }
        static get Default() {
            return Default;
        }
        static get NAME() {
            return NAME;
        }
        next() {
            if (!this._isSliding) this._slide(ORDER_NEXT);
        }
        nextWhenVisible() {
            // Don't call next when the page isn't visible
            // or the carousel or its parent isn't visible
            if (!document.hidden && isVisible(this._element)) this.next();
        }
        prev() {
            if (!this._isSliding) this._slide(ORDER_PREV);
        }
        pause(event) {
            if (!event) this._isPaused = true;
            if (SelectorEngine__default['default'].findOne(SELECTOR_NEXT_PREV, this._element)) {
                triggerTransitionEnd(this._element);
                this.cycle(true);
            }
            clearInterval(this._interval);
            this._interval = null;
        }
        cycle(event) {
            if (!event) this._isPaused = false;
            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }
            if (this._config && this._config.interval && !this._isPaused) {
                this._updateInterval();
                this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
            }
        }
        to(index) {
            this._activeElement = SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element);
            const activeIndex = this._getItemIndex(this._activeElement);
            if (index > this._items.length - 1 || index < 0) return;
            if (this._isSliding) {
                EventHandler__default['default'].one(this._element, EVENT_SLID, ()=>this.to(index)
                );
                return;
            }
            if (activeIndex === index) {
                this.pause();
                this.cycle();
                return;
            }
            const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
            this._slide(order, this._items[index]);
        }
        _getConfig(config) {
            config = {
                ...Default,
                ...config
            };
            typeCheckConfig(NAME, config, DefaultType);
            return config;
        }
        _handleSwipe() {
            const absDeltax = Math.abs(this.touchDeltaX);
            if (absDeltax <= SWIPE_THRESHOLD) return;
            const direction = absDeltax / this.touchDeltaX;
            this.touchDeltaX = 0;
            if (!direction) return;
            this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
        }
        _addEventListeners() {
            if (this._config.keyboard) EventHandler__default['default'].on(this._element, EVENT_KEYDOWN, (event)=>this._keydown(event)
            );
            if (this._config.pause === 'hover') {
                EventHandler__default['default'].on(this._element, EVENT_MOUSEENTER, (event)=>this.pause(event)
                );
                EventHandler__default['default'].on(this._element, EVENT_MOUSELEAVE, (event)=>this.cycle(event)
                );
            }
            if (this._config.touch && this._touchSupported) this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            const start = (event)=>{
                if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) this.touchStartX = event.clientX;
                else if (!this._pointerEvent) this.touchStartX = event.touches[0].clientX;
            };
            const move = (event)=>{
                // ensure swiping with one touch and not pinching
                this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
            };
            const end = (event)=>{
                if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) this.touchDeltaX = event.clientX - this.touchStartX;
                this._handleSwipe();
                if (this._config.pause === 'hover') {
                    // If it's a touch-enabled device, mouseenter/leave are fired as
                    // part of the mouse compatibility events on first tap - the carousel
                    // would stop cycling until user tapped out of it;
                    // here, we listen for touchend, explicitly pause the carousel
                    // (as if it's the second time we tap on it, mouseenter compat event
                    // is NOT fired) and after a timeout (to allow for mouse compatibility
                    // events to fire) we explicitly restart cycling
                    this.pause();
                    if (this.touchTimeout) clearTimeout(this.touchTimeout);
                    this.touchTimeout = setTimeout((event1)=>this.cycle(event1)
                    , TOUCHEVENT_COMPAT_WAIT + this._config.interval);
                }
            };
            SelectorEngine__default['default'].find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg)=>{
                EventHandler__default['default'].on(itemImg, EVENT_DRAG_START, (e)=>e.preventDefault()
                );
            });
            if (this._pointerEvent) {
                EventHandler__default['default'].on(this._element, EVENT_POINTERDOWN, (event)=>start(event)
                );
                EventHandler__default['default'].on(this._element, EVENT_POINTERUP, (event)=>end(event)
                );
                this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            } else {
                EventHandler__default['default'].on(this._element, EVENT_TOUCHSTART, (event)=>start(event)
                );
                EventHandler__default['default'].on(this._element, EVENT_TOUCHMOVE, (event)=>move(event)
                );
                EventHandler__default['default'].on(this._element, EVENT_TOUCHEND, (event)=>end(event)
                );
            }
        }
        _keydown(event) {
            if (/input|textarea/i.test(event.target.tagName)) return;
            if (event.key === ARROW_LEFT_KEY) {
                event.preventDefault();
                this._slide(DIRECTION_RIGHT);
            } else if (event.key === ARROW_RIGHT_KEY) {
                event.preventDefault();
                this._slide(DIRECTION_LEFT);
            }
        }
        _getItemIndex(element) {
            this._items = element && element.parentNode ? SelectorEngine__default['default'].find(SELECTOR_ITEM, element.parentNode) : [];
            return this._items.indexOf(element);
        }
        _getItemByOrder(order, activeElement) {
            const isNext = order === ORDER_NEXT;
            const isPrev = order === ORDER_PREV;
            const activeIndex = this._getItemIndex(activeElement);
            const lastItemIndex = this._items.length - 1;
            const isGoingToWrap = isPrev && activeIndex === 0 || isNext && activeIndex === lastItemIndex;
            if (isGoingToWrap && !this._config.wrap) return activeElement;
            const delta = isPrev ? -1 : 1;
            const itemIndex = (activeIndex + delta) % this._items.length;
            return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        }
        _triggerSlideEvent(relatedTarget, eventDirectionName) {
            const targetIndex = this._getItemIndex(relatedTarget);
            const fromIndex = this._getItemIndex(SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element));
            return EventHandler__default['default'].trigger(this._element, EVENT_SLIDE, {
                relatedTarget: relatedTarget,
                direction: eventDirectionName,
                from: fromIndex,
                to: targetIndex
            });
        }
        _setActiveIndicatorElement(element) {
            if (this._indicatorsElement) {
                const activeIndicator = SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE, this._indicatorsElement);
                activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
                activeIndicator.removeAttribute('aria-current');
                const indicators = SelectorEngine__default['default'].find(SELECTOR_INDICATOR, this._indicatorsElement);
                for(let i = 0; i < indicators.length; i++)if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
                    indicators[i].classList.add(CLASS_NAME_ACTIVE);
                    indicators[i].setAttribute('aria-current', 'true');
                    break;
                }
            }
        }
        _updateInterval() {
            const element2 = this._activeElement || SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element);
            if (!element2) return;
            const elementInterval = Number.parseInt(element2.getAttribute('data-bs-interval'), 10);
            if (elementInterval) {
                this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                this._config.interval = elementInterval;
            } else this._config.interval = this._config.defaultInterval || this._config.interval;
        }
        _slide(directionOrOrder, element) {
            const order = this._directionToOrder(directionOrOrder);
            const activeElement = SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element);
            const activeElementIndex = this._getItemIndex(activeElement);
            const nextElement = element || this._getItemByOrder(order, activeElement);
            const nextElementIndex = this._getItemIndex(nextElement);
            const isCycling = Boolean(this._interval);
            const isNext = order === ORDER_NEXT;
            const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
            const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
            const eventDirectionName = this._orderToDirection(order);
            if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
                this._isSliding = false;
                return;
            }
            const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
            if (slideEvent.defaultPrevented) return;
            if (!activeElement || !nextElement) // Some weirdness is happening, so we bail
            return;
            this._isSliding = true;
            if (isCycling) this.pause();
            this._setActiveIndicatorElement(nextElement);
            this._activeElement = nextElement;
            const triggerSlidEvent = ()=>{
                EventHandler__default['default'].trigger(this._element, EVENT_SLID, {
                    relatedTarget: nextElement,
                    direction: eventDirectionName,
                    from: activeElementIndex,
                    to: nextElementIndex
                });
            };
            if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
                nextElement.classList.add(orderClassName);
                reflow(nextElement);
                activeElement.classList.add(directionalClassName);
                nextElement.classList.add(directionalClassName);
                const completeCallBack = ()=>{
                    nextElement.classList.remove(directionalClassName, orderClassName);
                    nextElement.classList.add(CLASS_NAME_ACTIVE);
                    activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
                    this._isSliding = false;
                    setTimeout(triggerSlidEvent, 0);
                };
                this._queueCallback(completeCallBack, activeElement, true);
            } else {
                activeElement.classList.remove(CLASS_NAME_ACTIVE);
                nextElement.classList.add(CLASS_NAME_ACTIVE);
                this._isSliding = false;
                triggerSlidEvent();
            }
            if (isCycling) this.cycle();
        }
        _directionToOrder(direction) {
            if (![
                DIRECTION_RIGHT,
                DIRECTION_LEFT
            ].includes(direction)) return direction;
            if (isRTL()) return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
            return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
        }
        _orderToDirection(order) {
            if (![
                ORDER_NEXT,
                ORDER_PREV
            ].includes(order)) return order;
            if (isRTL()) return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
            return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
        }
        static carouselInterface(element, config) {
            let data = Data__default['default'].get(element, DATA_KEY);
            let _config = {
                ...Default,
                ...Manipulator__default['default'].getDataAttributes(element)
            };
            if (typeof config === 'object') _config = {
                ..._config,
                ...config
            };
            const action = typeof config === 'string' ? config : _config.slide;
            if (!data) data = new Carousel(element, _config);
            if (typeof config === 'number') data.to(config);
            else if (typeof action === 'string') {
                if (typeof data[action] === 'undefined') throw new TypeError(`No method named "${action}"`);
                data[action]();
            } else if (_config.interval && _config.ride) {
                data.pause();
                data.cycle();
            }
        }
        static jQueryInterface(config) {
            return this.each(function() {
                Carousel.carouselInterface(this, config);
            });
        }
        static dataApiClickHandler(event) {
            const target = getElementFromSelector(this);
            if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) return;
            const config2 = {
                ...Manipulator__default['default'].getDataAttributes(target),
                ...Manipulator__default['default'].getDataAttributes(this)
            };
            const slideIndex = this.getAttribute('data-bs-slide-to');
            if (slideIndex) config2.interval = false;
            Carousel.carouselInterface(target, config2);
            if (slideIndex) Data__default['default'].get(target, DATA_KEY).to(slideIndex);
            event.preventDefault();
        }
    }
    /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */ EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
    EventHandler__default['default'].on(window, EVENT_LOAD_DATA_API, ()=>{
        const carousels = SelectorEngine__default['default'].find(SELECTOR_DATA_RIDE);
        for(let i = 0, len = carousels.length; i < len; i++)Carousel.carouselInterface(carousels[i], Data__default['default'].get(carousels[i], DATA_KEY));
    });
    /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Carousel to jQuery only if jQuery is present
   */ defineJQueryPlugin(Carousel);
    return Carousel;
});


var $1f9d29da9b2e58ee121ad5b883584b2e$exports = {};





(function(global, factory) {
    typeof $1f9d29da9b2e58ee121ad5b883584b2e$exports === 'object' && "object" !== 'undefined' ? $1f9d29da9b2e58ee121ad5b883584b2e$exports = factory((parcelRequire("6Ncvj")), (parcelRequire("5lFcn")), (parcelRequire("3vb2O")), (parcelRequire("MuH6Y")), (parcelRequire("1NNbZ"))) : typeof define === 'function' && define.amd ? define([
        './dom/selector-engine',
        './dom/data',
        './dom/event-handler',
        './dom/manipulator',
        './base-component'
    ], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory(global.SelectorEngine, global.Data, global.EventHandler, global.Manipulator, global.Base));
})($1f9d29da9b2e58ee121ad5b883584b2e$exports, function(SelectorEngine, Data, EventHandler, Manipulator, BaseComponent) {
    'use strict';
    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : {
            'default': e
        };
    }
    var SelectorEngine__default = /*#__PURE__*/ _interopDefaultLegacy(SelectorEngine);
    var Data__default = /*#__PURE__*/ _interopDefaultLegacy(Data);
    var EventHandler__default = /*#__PURE__*/ _interopDefaultLegacy(EventHandler);
    var Manipulator__default = /*#__PURE__*/ _interopDefaultLegacy(Manipulator);
    var BaseComponent__default = /*#__PURE__*/ _interopDefaultLegacy(BaseComponent);
    const toType = (obj)=>{
        if (obj === null || obj === undefined) return `${obj}`;
        return ({
        }).toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    };
    const getSelector = (element)=>{
        let selector = element.getAttribute('data-bs-target');
        if (!selector || selector === '#') {
            let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
            // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
            // `document.querySelector` will rightfully complain it is invalid.
            // See https://github.com/twbs/bootstrap/issues/32273
            if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) return null;
             // Just in case some CMS puts out a full URL with the anchor appended
            if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) hrefAttr = `#${hrefAttr.split('#')[1]}`;
            selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
        }
        return selector;
    };
    const getSelectorFromElement = (element)=>{
        const selector = getSelector(element);
        if (selector) return document.querySelector(selector) ? selector : null;
        return null;
    };
    const getElementFromSelector = (element)=>{
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
    };
    const isElement = (obj)=>{
        if (!obj || typeof obj !== 'object') return false;
        if (typeof obj.jquery !== 'undefined') obj = obj[0];
        return typeof obj.nodeType !== 'undefined';
    };
    const getElement = (obj)=>{
        if (isElement(obj)) // it's a jQuery object or a node element
        return obj.jquery ? obj[0] : obj;
        if (typeof obj === 'string' && obj.length > 0) return SelectorEngine__default['default'].findOne(obj);
        return null;
    };
    const typeCheckConfig = (componentName, config, configTypes)=>{
        Object.keys(configTypes).forEach((property)=>{
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? 'element' : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        });
    };
    const reflow = (element)=>element.offsetHeight
    ;
    const getjQuery = ()=>{
        const { jQuery: jQuery  } = window;
        if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) return jQuery;
        return null;
    };
    const onDOMContentLoaded = (callback)=>{
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback);
        else callback();
    };
    const defineJQueryPlugin = (plugin)=>{
        onDOMContentLoaded(()=>{
            const $ = getjQuery();
            /* istanbul ignore if */ if ($) {
                const name = plugin.NAME;
                const JQUERY_NO_CONFLICT = $.fn[name];
                $.fn[name] = plugin.jQueryInterface;
                $.fn[name].Constructor = plugin;
                $.fn[name].noConflict = ()=>{
                    $.fn[name] = JQUERY_NO_CONFLICT;
                    return plugin.jQueryInterface;
                };
            }
        });
    };
    /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */ /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */ const NAME = 'collapse';
    const DATA_KEY = 'bs.collapse';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const Default = {
        toggle: true,
        parent: ''
    };
    const DefaultType = {
        toggle: 'boolean',
        parent: '(string|element)'
    };
    const EVENT_SHOW = `show${EVENT_KEY}`;
    const EVENT_SHOWN = `shown${EVENT_KEY}`;
    const EVENT_HIDE = `hide${EVENT_KEY}`;
    const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
    const CLASS_NAME_SHOW = 'show';
    const CLASS_NAME_COLLAPSE = 'collapse';
    const CLASS_NAME_COLLAPSING = 'collapsing';
    const CLASS_NAME_COLLAPSED = 'collapsed';
    const WIDTH = 'width';
    const HEIGHT = 'height';
    const SELECTOR_ACTIVES = '.show, .collapsing';
    const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
    /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */ class Collapse extends BaseComponent__default['default'] {
        constructor(element1, config1){
            super(element1);
            this._isTransitioning = false;
            this._config = this._getConfig(config1);
            this._triggerArray = SelectorEngine__default['default'].find(`${SELECTOR_DATA_TOGGLE}[href="#${this._element.id}"],` + `${SELECTOR_DATA_TOGGLE}[data-bs-target="#${this._element.id}"]`);
            const toggleList = SelectorEngine__default['default'].find(SELECTOR_DATA_TOGGLE);
            for(let i = 0, len = toggleList.length; i < len; i++){
                const elem = toggleList[i];
                const selector = getSelectorFromElement(elem);
                const filterElement = SelectorEngine__default['default'].find(selector).filter((foundElem)=>foundElem === this._element
                );
                if (selector !== null && filterElement.length) {
                    this._selector = selector;
                    this._triggerArray.push(elem);
                }
            }
            this._parent = this._config.parent ? this._getParent() : null;
            if (!this._config.parent) this._addAriaAndCollapsedClass(this._element, this._triggerArray);
            if (this._config.toggle) this.toggle();
        }
        static get Default() {
            return Default;
        }
        static get NAME() {
            return NAME;
        }
        toggle() {
            if (this._element.classList.contains(CLASS_NAME_SHOW)) this.hide();
            else this.show();
        }
        show() {
            if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) return;
            let actives;
            let activesData;
            if (this._parent) {
                actives = SelectorEngine__default['default'].find(SELECTOR_ACTIVES, this._parent).filter((elem)=>{
                    if (typeof this._config.parent === 'string') return elem.getAttribute('data-bs-parent') === this._config.parent;
                    return elem.classList.contains(CLASS_NAME_COLLAPSE);
                });
                if (actives.length === 0) actives = null;
            }
            const container = SelectorEngine__default['default'].findOne(this._selector);
            if (actives) {
                const tempActiveData = actives.find((elem)=>container !== elem
                );
                activesData = tempActiveData ? Data__default['default'].get(tempActiveData, DATA_KEY) : null;
                if (activesData && activesData._isTransitioning) return;
            }
            const startEvent = EventHandler__default['default'].trigger(this._element, EVENT_SHOW);
            if (startEvent.defaultPrevented) return;
            if (actives) actives.forEach((elemActive)=>{
                if (container !== elemActive) Collapse.collapseInterface(elemActive, 'hide');
                if (!activesData) Data__default['default'].set(elemActive, DATA_KEY, null);
            });
            const dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.style[dimension] = 0;
            if (this._triggerArray.length) this._triggerArray.forEach((element1)=>{
                element1.classList.remove(CLASS_NAME_COLLAPSED);
                element1.setAttribute('aria-expanded', true);
            });
            this.setTransitioning(true);
            const complete = ()=>{
                this._element.classList.remove(CLASS_NAME_COLLAPSING);
                this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
                this._element.style[dimension] = '';
                this.setTransitioning(false);
                EventHandler__default['default'].trigger(this._element, EVENT_SHOWN);
            };
            const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            const scrollSize = `scroll${capitalizedDimension}`;
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = `${this._element[scrollSize]}px`;
        }
        hide() {
            if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) return;
            const startEvent = EventHandler__default['default'].trigger(this._element, EVENT_HIDE);
            if (startEvent.defaultPrevented) return;
            const dimension = this._getDimension();
            this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
            const triggerArrayLength = this._triggerArray.length;
            if (triggerArrayLength > 0) for(let i1 = 0; i1 < triggerArrayLength; i1++){
                const trigger = this._triggerArray[i1];
                const elem = getElementFromSelector(trigger);
                if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
                    trigger.classList.add(CLASS_NAME_COLLAPSED);
                    trigger.setAttribute('aria-expanded', false);
                }
            }
            this.setTransitioning(true);
            const complete = ()=>{
                this.setTransitioning(false);
                this._element.classList.remove(CLASS_NAME_COLLAPSING);
                this._element.classList.add(CLASS_NAME_COLLAPSE);
                EventHandler__default['default'].trigger(this._element, EVENT_HIDDEN);
            };
            this._element.style[dimension] = '';
            this._queueCallback(complete, this._element, true);
        }
        setTransitioning(isTransitioning) {
            this._isTransitioning = isTransitioning;
        }
        _getConfig(config) {
            config = {
                ...Default,
                ...config
            };
            config.toggle = Boolean(config.toggle); // Coerce string values
            typeCheckConfig(NAME, config, DefaultType);
            return config;
        }
        _getDimension() {
            return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
        }
        _getParent() {
            let { parent: parent  } = this._config;
            parent = getElement(parent);
            const selector = `${SELECTOR_DATA_TOGGLE}[data-bs-parent="${parent}"]`;
            SelectorEngine__default['default'].find(selector, parent).forEach((element1)=>{
                const selected = getElementFromSelector(element1);
                this._addAriaAndCollapsedClass(selected, [
                    element1
                ]);
            });
            return parent;
        }
        _addAriaAndCollapsedClass(element, triggerArray) {
            if (!element || !triggerArray.length) return;
            const isOpen = element.classList.contains(CLASS_NAME_SHOW);
            triggerArray.forEach((elem)=>{
                if (isOpen) elem.classList.remove(CLASS_NAME_COLLAPSED);
                else elem.classList.add(CLASS_NAME_COLLAPSED);
                elem.setAttribute('aria-expanded', isOpen);
            });
        }
        static collapseInterface(element, config) {
            let data = Data__default['default'].get(element, DATA_KEY);
            const _config = {
                ...Default,
                ...Manipulator__default['default'].getDataAttributes(element),
                ...typeof config === 'object' && config ? config : {
                }
            };
            if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) _config.toggle = false;
            if (!data) data = new Collapse(element, _config);
            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') throw new TypeError(`No method named "${config}"`);
                data[config]();
            }
        }
        static jQueryInterface(config) {
            return this.each(function() {
                Collapse.collapseInterface(this, config);
            });
        }
    }
    /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */ EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
        if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') event.preventDefault();
        const triggerData = Manipulator__default['default'].getDataAttributes(this);
        const selector = getSelectorFromElement(this);
        const selectorElements = SelectorEngine__default['default'].find(selector);
        selectorElements.forEach((element2)=>{
            const data = Data__default['default'].get(element2, DATA_KEY);
            let config2;
            if (data) {
                // update parent attribute
                if (data._parent === null && typeof triggerData.parent === 'string') {
                    data._config.parent = triggerData.parent;
                    data._parent = data._getParent();
                }
                config2 = 'toggle';
            } else config2 = triggerData;
            Collapse.collapseInterface(element2, config2);
        });
    });
    /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */ defineJQueryPlugin(Collapse);
    return Collapse;
});



})();
//# sourceMappingURL=staff.c297f7aa.js.map
