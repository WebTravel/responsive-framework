 if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

 window.addEventListener("DOMContentLoaded", function() {

    var defaults = {
      'width' :  1024
    };

    window.ResponsiveCart = function ResponsiveCart(elements, options) {
        if (!(this instanceof ResponsiveCart)) return new ResponsiveCart(elements, options);
        this.options = Object.assign({}, defaults, options);
        this.elements = typeof elements === "string" ? document.querySelectorAll(elements) :
            elements.length ? elements : [elements];
        this.init()
    };
    
    ResponsiveCart.prototype.init = function() {
        var self = this,
            flag = false,
            el = self.elements[0];

        function responsiveCart() {
          var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

          //отображаем адаптивный вид корзины
          if(w < self.options.width) {
            //забираем заголовки первой tr и кладем их в массив
             var firstStr = el.querySelectorAll('tr'),
                 strElem = firstStr[0].children,
                 titleArr = [];

                for(var i = 0; i < strElem.length; i++) {
                    var text = strElem[i].innerText;
                    titleArr.push(text);
                };

            
             
          }
        };

        //Запускаем функцию при загрузке
        window.onload = function(event) {
          responsiveCart();
        }
        
        //Запускаем функцию на ресайз
        window.onresize = function(event) {
          responsiveCart();
        };
        
    };

    //Вызов метода
    ResponsiveCart('#cartTable', {
      
    });

    
});