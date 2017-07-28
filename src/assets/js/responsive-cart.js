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
      'width' :  1024, //ширина при которой таблица адаптируется
      'cost' : 'inner', //указывает на то, находится ли окончательная цена "Итого: 5 000 руб" в последней строке таблицы
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
          prx = 'at__',
          el = self.elements[0];

      function responsiveCart() {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        //отображаем адаптивный вид корзины
        if(w < self.options.width) {
          el.style.display = 'none';
          if(!flag) {
            flag = true;

            var str = el.querySelectorAll('tr'),
              firstStr = str[0].children, 
              titleArr = [],
              bodyArr = [],
              cost;
          
            //забираем заголовки первой tr и кладем их в массив
            for(var i = 0; i < firstStr.length; i++) {
              var text = firstStr[i].innerText;
              titleArr.push(text);
            };

            //Функция преобразования табличной верстки в блочную
            function parseTable(arr, cost) {
              var wrap = '<div class="'+ prx + 'list" />',
                  item = '<div class="'+ prx + 'item" />';
                  cost = '<div class="'+ prx + 'cost" />' + cost;    
              //Добавляем в DOM обертку товаров
              el.insertAdjacentHTML('afterend', wrap);
              var wrapSel = document.querySelector('.'+ prx + 'list');  
              for(var i = 0; i < arr.length; i++) {
                if(i == 0) {
                  wrapSel.innerHTML = arr[i];
                } else {
                  var html = wrapSel.innerHTML;
                  wrapSel.innerHTML = html + arr[i];
                }
              }
              //Добавляем общую стоимость
              wrapSel.insertAdjacentHTML('afterend', cost);
              //Добавляем тайтлы
              var elements = document.querySelectorAll('.'+ prx + 'item');
              Array.prototype.forEach.call(elements, function(el, i){
                var child = el.querySelectorAll('div');   
                for(var i = 0; i <= child.length - 1; i++) {
                  var title = '<div class="'+ prx + 'title">' + titleArr[i] + '</div>',
                      childhtml = '<div class="'+ prx + 'body">' + child[i].innerHTML + '</div>';
                  child[i].innerHTML = title + childhtml;
                }
              });
            };

            //Функция парсинга tr
            function parseTr(count) {
              var td = str[count].innerHTML,
                    target = "td>",
                    pos = -1;
              td = td.replace(/(\r\n|\n|\r)/gm, '');
              td = td.replace(/\s{2,}/g, '');
              while ((pos = td.indexOf(target, pos + 1)) != -1) {
                td = td.replace(target, "div>");
              }
              bodyArr.push('<div class="'+ prx + 'item">'  + td + '</div>');
            }

            //если общая стоимость находится внутри таблицы
            if(self.options.cost == 'inner') {
              //Забираем весь текст с последней tr
              cost = str[str.length - 1].innerText;
              //Проходимся по всем tr, кроме первой и последней и забираем HTML в каждой td
              for(var i = 1; i < str.length - 1; i++) {
                parseTr(i);
              };
            } else { //общая стоимость находится за пределами таблицы
              for(var i = 1; i < str.length; i++) {
                parseTr(i);
              };
            } 
            parseTable(bodyArr, cost);
          }  
        } else {
          if(flag == true) {
            function remove(elem) {
              elem.parentNode.removeChild(elem);
            }
            remove(document.querySelector('.'+ prx + 'list'));
            remove(document.querySelector('.'+ prx + 'cost'));
          }
          flag = false;
          el.style.display = 'table';
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