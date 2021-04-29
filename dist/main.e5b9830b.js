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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList'); //获取类为siteList

var $lastLi = $siteList.find('li.last'); //在siteList中找到li里面的类为last的元素

var x = localStorage.getItem('x'); //把x从localStorage里面取出来

var xObject = JSON.parse(x); //把x变为对象

var hashMap = xObject || //当xObject第一次操作时为空，就用下面的代码作为出是值
[//要注意，hashMap是全局变量，不要被污染了。因为我们开了parcel，parcel默认帮我们开了一个作用域，所以不用担心这个问题
{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}, {
  logo: 'Z',
  url: 'https://www.zhihu.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, ''); //把http，https，www,/去除加一个空
};

var render = function render() {
  $siteList.find('li:not(.last)').remove(); //删除除了last的所有元素，因为会重复保存之前的元素

  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n          <div class=\"logo\">".concat(node.logo, "</div>\n          <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n          <div class=\"close\">\n          <svg class=\"icon\" >\n          <use xlink:href=\"#icon-close\">\n          </use>\n      </svg>\n          </div>\n        </div>\n      </a>\n        </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url, '_self');
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); //然后遍历这个hashMap，直接创建li，这样就不用再HTML里面写了

$('.addButton').on('click', function () {
  //监听点击
  var url = window.prompt('请输入需要添加的网址');

  if (url.indexOf('https') !== 0) {
    //如果用户输入的不是http开头的，帮他加上
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  //监听用户关闭页面
  var string = JSON.stringify(hashMap); //localStorage只能存字符串，要把hashMap变成字符串

  localStorage.setItem('x', string); //在本地的存储里面设置一个x，值为string
}; //监听用户关闭页面，在页面关闭的时候把hashMap存到localStorage里面你
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e5b9830b.js.map