// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"banner1/Myapi.js":[function(require,module,exports) {
/*
* @Author: Marte
* @Date:   2018-04-10 16:50:37
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-25 12:34:37
*/
'use strict';

function Myapi() {
  //构造函数
  this.JSON = {
    index: 0,
    lagout: function lagout(thisObj, speed, bh) {
      //轮播图初始化
      this.speed = speed;
      var Parent = thisObj,
          imgUL = Parent.children('ul:first'),
          pointerUL = Parent.children('ul:last'),
          cutBut = Parent.children('a'),
          imgLI = imgUL.children('li'),
          img = imgLI.find('img'),
          W = img.width(),
          H = img.height();
      Parent.height(H + Math.abs(bh)).width(W);
      var dW = (Parent.width() - W) / 2,
          length = imgLI.size();
      imgUL.width(W * length).css('left', dW); //函数调用

      this.appendP(Parent, pointerUL, length);
      this.move(imgUL, pointerUL, W, dW, length);
      this.cut(imgUL, cutBut, W, dW, pointerUL, length);
      this.changes(imgUL, pointerUL, W, length, dW); //鼠标滑过暂停与启动

      Parent.hover($.proxy(function () {
        clearInterval(this.moveTimer);
        cutBut.animate({
          opacity: 0.8
        });
      }, this), $.proxy(function () {
        this.move(imgUL, pointerUL, W, dW, length);
        cutBut.animate({
          opacity: 0.2
        });
      }, this));
    },
    appendP: function appendP(P, objU, l) {
      //动态增添控制点
      for (var i = 0; i < l; i++) {
        var newi = $('<li></li>');

        if (i == 0) {
          newi.addClass('now');
        }

        ;
        objU.append(newi);
      }

      ;
      objU.width(objU.find('li:first').outerWidth(true) * l);
      objU.css('left', (P.width() - objU.width()) / 2);
    },
    move: function move(imgObj, pUL, w, d, l) {
      //自动播放
      this.moveTimer = setInterval($.proxy(function () {
        this.animate(imgObj, w, d);
        this.indexChange(pUL, l, 1);
      }, this), this.speed);
    },
    indexChange: function indexChange(obj, l, i) {
      //改变计数点
      if (this.index >= l - 1 && i > 0) {
        this.index = 0;
      } else if (this.index <= 0 && i < 0) {
        this.index = l - 1;
      } else {
        this.index += i;
      }

      obj.find('li').eq(this.index).addClass('now').siblings().removeClass('now');
    },
    animate: function animate(obj, w, d, In) {
      //自动播放动画函数
      obj.animate({
        left: -w + d
      }, $.proxy(function () {
        obj.css('left', d);

        if (w > 0) {
          if (In) {
            obj.append(obj.children('li:lt(' + In + ')'));
            console.log(obj.children('li:lt(' + In + ')'));
          } else {
            obj.append(obj.find('li:first'));
          }
        }
      }, this));
    },
    cut: function cut(imgObj, C, w, d, pUL, l) {
      //左右切换函数
      C.css('top', (imgObj.height() - C.height()) / 2);
      var THIS = this;
      C.on('click', function () {
        if ($(this).hasClass('next')) {
          THIS.animate(imgObj, w, d);
          THIS.indexChange(pUL, l, 1);
        } else {
          imgObj.css('left', -w + d);
          imgObj.prepend(imgObj.find('li:last'));
          THIS.animate(imgObj, 0, d);
          THIS.indexChange(pUL, l, -1);
        }
      });
    },
    changes: function changes(imgObj, obj, w, l, d) {
      //控制点切换
      var THIS = this;
      obj.find('li').on('click', function () {
        var nw = 0;
        var In = 0;
        $(this).addClass('now').siblings().removeClass('now');

        if ($(this).index() < THIS.index) {
          In = l - THIS.index + $(this).index();
          nw = In * w;
        } else {
          In = $(this).index() - THIS.index;
          nw = In * w;
        }

        THIS.index = $(this).index();
        THIS.animate(imgObj, nw, d, In);
      });
    }
  };
}

;
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51624" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","banner1/Myapi.js"], null)
//# sourceMappingURL=/Myapi.c0e012a2.js.map