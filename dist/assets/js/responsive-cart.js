'use strict';

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target, firstSource) {
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

window.addEventListener("DOMContentLoaded", function () {

  var defaults = {
    'width': 1024, //ширина при которой таблица адаптируется
    'cost': 'inner' //указывает на то, находится ли окончательная цена "Итого: 5 000 руб" в последней строке таблицы
  };

  window.ResponsiveCart = function ResponsiveCart(elements, options) {
    if (!(this instanceof ResponsiveCart)) return new ResponsiveCart(elements, options);
    this.options = Object.assign({}, defaults, options);
    this.elements = typeof elements === "string" ? document.querySelectorAll(elements) : elements.length ? elements : [elements];
    this.init();
  };

  ResponsiveCart.prototype.init = function () {
    var self = this,
        flag = false,
        prx = 'at__',
        el = self.elements[0];

    function responsiveCart() {
      var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      //отображаем адаптивный вид корзины
      if (w < self.options.width) {
        el.style.display = 'none';
        if (!flag) {

          //Функция преобразования табличной верстки в блочную
          var parseTable = function parseTable(arr, cost) {
            var wrap = '<div class="' + prx + 'list" />',
                item = '<div class="' + prx + 'item" />';
            cost = '<div class="' + prx + 'cost" />' + cost;
            //Добавляем в DOM обертку товаров
            el.insertAdjacentHTML('afterend', wrap);
            var wrapSel = document.querySelector('.' + prx + 'list');
            for (var i = 0; i < arr.length; i++) {
              if (i == 0) {
                wrapSel.innerHTML = arr[i];
              } else {
                var html = wrapSel.innerHTML;
                wrapSel.innerHTML = html + arr[i];
              }
            }
            //Добавляем общую стоимость
            wrapSel.insertAdjacentHTML('afterend', cost);
            //Добавляем тайтлы
            var elements = document.querySelectorAll('.' + prx + 'item');
            Array.prototype.forEach.call(elements, function (el, i) {
              var child = el.querySelectorAll('div');
              for (var i = 0; i <= child.length - 1; i++) {
                var title = '<div class="' + prx + 'title">' + titleArr[i] + '</div>',
                    childhtml = '<div class="' + prx + 'body">' + child[i].innerHTML + '</div>';
                child[i].innerHTML = title + childhtml;
              }
            });
          };

          //Функция парсинга tr
          var parseTr = function parseTr(count) {
            var td = str[count].innerHTML,
                target = "td>",
                pos = -1;
            td = td.replace(/(\r\n|\n|\r)/gm, '');
            td = td.replace(/\s{2,}/g, '');
            while ((pos = td.indexOf(target, pos + 1)) != -1) {
              td = td.replace(target, "div>");
            }
            bodyArr.push('<div class="' + prx + 'item">' + td + '</div>');
          };

          //если общая стоимость находится внутри таблицы


          flag = true;

          var str = el.querySelectorAll('tr'),
              firstStr = str[0].children,
              titleArr = [],
              bodyArr = [],
              cost;

          //забираем заголовки первой tr и кладем их в массив
          for (var i = 0; i < firstStr.length; i++) {
            var text = firstStr[i].innerText;
            titleArr.push(text);
          };;if (self.options.cost == 'inner') {
            //Забираем весь текст с последней tr
            cost = str[str.length - 1].innerText;
            //Проходимся по всем tr, кроме первой и последней и забираем HTML в каждой td
            for (var i = 1; i < str.length - 1; i++) {
              parseTr(i);
            };
          } else {
            //общая стоимость находится за пределами таблицы
            for (var i = 1; i < str.length; i++) {
              parseTr(i);
            };
          }
          parseTable(bodyArr, cost);
        }
      } else {
        if (flag == true) {
          var remove = function remove(elem) {
            elem.parentNode.removeChild(elem);
          };

          remove(document.querySelector('.' + prx + 'list'));
          remove(document.querySelector('.' + prx + 'cost'));
        }
        flag = false;
        el.style.display = 'table';
      }
    };

    //Запускаем функцию при загрузке
    window.onload = function (event) {
      responsiveCart();
    };

    //Запускаем функцию на ресайз
    window.onresize = function (event) {
      responsiveCart();
    };
  };

  //Вызов метода
  ResponsiveCart('#cartTable', {});
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3BvbnNpdmUtY2FydC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJhc3NpZ24iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsInZhbHVlIiwidGFyZ2V0IiwiZmlyc3RTb3VyY2UiLCJ1bmRlZmluZWQiLCJUeXBlRXJyb3IiLCJ0byIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJuZXh0U291cmNlIiwia2V5c0FycmF5Iiwia2V5cyIsIm5leHRJbmRleCIsImxlbiIsIm5leHRLZXkiLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlZmF1bHRzIiwiUmVzcG9uc2l2ZUNhcnQiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbml0IiwicHJvdG90eXBlIiwic2VsZiIsImZsYWciLCJwcngiLCJlbCIsInJlc3BvbnNpdmVDYXJ0IiwidyIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImJvZHkiLCJ3aWR0aCIsInN0eWxlIiwiZGlzcGxheSIsInBhcnNlVGFibGUiLCJhcnIiLCJjb3N0Iiwid3JhcCIsIml0ZW0iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJ3cmFwU2VsIiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsImh0bWwiLCJBcnJheSIsImZvckVhY2giLCJjYWxsIiwiY2hpbGQiLCJ0aXRsZSIsInRpdGxlQXJyIiwiY2hpbGRodG1sIiwicGFyc2VUciIsImNvdW50IiwidGQiLCJzdHIiLCJwb3MiLCJyZXBsYWNlIiwiaW5kZXhPZiIsImJvZHlBcnIiLCJwdXNoIiwiZmlyc3RTdHIiLCJjaGlsZHJlbiIsInRleHQiLCJpbm5lclRleHQiLCJyZW1vdmUiLCJlbGVtIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwib25sb2FkIiwiZXZlbnQi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R0FBbUIsT0FBbkI7QUFDRDtBQUNGOztBQUVEO0FBQ0F0QixXQUFPeUQsTUFBUCxHQUFnQixVQUFTQyxLQUFULEVBQWdCO0FBQzlCNUM7QUFDRCxLQUZEOztBQUlBO0FBQ0FkLFdBQU8yRCxRQUFQLEdBQWtCLFVBQVNELEtBQVQsRUFBZ0I7QUFDaEM1QztBQUNELEtBRkQ7QUFHRCxHQTNHRDs7QUE2R0E7QUFDQVgsaUJBQWUsWUFBZixFQUE2QixFQUE3QjtBQUdILENBaElBIiwiZmlsZSI6InJlc3BvbnNpdmUtY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBpZiAoIU9iamVjdC5hc3NpZ24pIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2Fzc2lnbicsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uKHRhcmdldCwgZmlyc3RTb3VyY2UpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGlmIChuZXh0U291cmNlID09PSB1bmRlZmluZWQgfHwgbmV4dFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSk7XG4gICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICB2YXIgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH1cbiAgfSk7XG59XG5cbiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAnd2lkdGgnIDogIDEwMjQsIC8v0YjQuNGA0LjQvdCwINC/0YDQuCDQutC+0YLQvtGA0L7QuSDRgtCw0LHQu9C40YbQsCDQsNC00LDQv9GC0LjRgNGD0LXRgtGB0Y9cbiAgICAgICdjb3N0JyA6ICdpbm5lcicsIC8v0YPQutCw0LfRi9Cy0LDQtdGCINC90LAg0YLQviwg0L3QsNGF0L7QtNC40YLRgdGPINC70Lgg0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdCw0Y8g0YbQtdC90LAgXCLQmNGC0L7Qs9C+OiA1IDAwMCDRgNGD0LFcIiDQsiDQv9C+0YHQu9C10LTQvdC10Lkg0YHRgtGA0L7QutC1INGC0LDQsdC70LjRhtGLXG4gICAgfTtcblxuICAgIHdpbmRvdy5SZXNwb25zaXZlQ2FydCA9IGZ1bmN0aW9uIFJlc3BvbnNpdmVDYXJ0KGVsZW1lbnRzLCBvcHRpb25zKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzcG9uc2l2ZUNhcnQpKSByZXR1cm4gbmV3IFJlc3BvbnNpdmVDYXJ0KGVsZW1lbnRzLCBvcHRpb25zKTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0eXBlb2YgZWxlbWVudHMgPT09IFwic3RyaW5nXCIgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKSA6XG4gICAgICAgICAgZWxlbWVudHMubGVuZ3RoID8gZWxlbWVudHMgOiBbZWxlbWVudHNdO1xuICAgICAgdGhpcy5pbml0KClcbiAgICB9O1xuICAgIFxuICAgIFJlc3BvbnNpdmVDYXJ0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgZmxhZyA9IGZhbHNlLFxuICAgICAgICAgIHByeCA9ICdhdF9fJyxcbiAgICAgICAgICBlbCA9IHNlbGYuZWxlbWVudHNbMF07XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3BvbnNpdmVDYXJ0KCkge1xuICAgICAgICB2YXIgdyA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIC8v0L7RgtC+0LHRgNCw0LbQsNC10Lwg0LDQtNCw0L/RgtC40LLQvdGL0Lkg0LLQuNC0INC60L7RgNC30LjQvdGLXG4gICAgICAgIGlmKHcgPCBzZWxmLm9wdGlvbnMud2lkdGgpIHtcbiAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGlmKCFmbGFnKSB7XG4gICAgICAgICAgICBmbGFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIHN0ciA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJyksXG4gICAgICAgICAgICAgIGZpcnN0U3RyID0gc3RyWzBdLmNoaWxkcmVuLCBcbiAgICAgICAgICAgICAgdGl0bGVBcnIgPSBbXSxcbiAgICAgICAgICAgICAgYm9keUFyciA9IFtdLFxuICAgICAgICAgICAgICBjb3N0O1xuICAgICAgICAgIFxuICAgICAgICAgICAgLy/Qt9Cw0LHQuNGA0LDQtdC8INC30LDQs9C+0LvQvtCy0LrQuCDQv9C10YDQstC+0LkgdHIg0Lgg0LrQu9Cw0LTQtdC8INC40YUg0LIg0LzQsNGB0YHQuNCyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlyc3RTdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIHRleHQgPSBmaXJzdFN0cltpXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgIHRpdGxlQXJyLnB1c2godGV4dCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL9Ck0YPQvdC60YbQuNGPINC/0YDQtdC+0LHRgNCw0LfQvtCy0LDQvdC40Y8g0YLQsNCx0LvQuNGH0L3QvtC5INCy0LXRgNGB0YLQutC4INCyINCx0LvQvtGH0L3Rg9GOXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXJzZVRhYmxlKGFyciwgY29zdCkge1xuICAgICAgICAgICAgICB2YXIgd3JhcCA9ICc8ZGl2IGNsYXNzPVwiJysgcHJ4ICsgJ2xpc3RcIiAvPicsXG4gICAgICAgICAgICAgICAgICBpdGVtID0gJzxkaXYgY2xhc3M9XCInKyBwcnggKyAnaXRlbVwiIC8+JztcbiAgICAgICAgICAgICAgICAgIGNvc3QgPSAnPGRpdiBjbGFzcz1cIicrIHByeCArICdjb3N0XCIgLz4nICsgY29zdDsgICAgXG4gICAgICAgICAgICAgIC8v0JTQvtCx0LDQstC70Y/QtdC8INCyIERPTSDQvtCx0LXRgNGC0LrRgyDRgtC+0LLQsNGA0L7QslxuICAgICAgICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgd3JhcCk7XG4gICAgICAgICAgICAgIHZhciB3cmFwU2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicrIHByeCArICdsaXN0Jyk7ICBcbiAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgd3JhcFNlbC5pbm5lckhUTUwgPSBhcnJbaV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZhciBodG1sID0gd3JhcFNlbC5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgICB3cmFwU2VsLmlubmVySFRNTCA9IGh0bWwgKyBhcnJbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8v0JTQvtCx0LDQstC70Y/QtdC8INC+0LHRidGD0Y4g0YHRgtC+0LjQvNC+0YHRgtGMXG4gICAgICAgICAgICAgIHdyYXBTZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGNvc3QpO1xuICAgICAgICAgICAgICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDRgtCw0LnRgtC70YtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicrIHByeCArICdpdGVtJyk7XG4gICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uKGVsLCBpKXtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTsgICBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDw9IGNoaWxkLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gJzxkaXYgY2xhc3M9XCInKyBwcnggKyAndGl0bGVcIj4nICsgdGl0bGVBcnJbaV0gKyAnPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgICBjaGlsZGh0bWwgPSAnPGRpdiBjbGFzcz1cIicrIHByeCArICdib2R5XCI+JyArIGNoaWxkW2ldLmlubmVySFRNTCArICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgY2hpbGRbaV0uaW5uZXJIVE1MID0gdGl0bGUgKyBjaGlsZGh0bWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8v0KTRg9C90LrRhtC40Y8g0L/QsNGA0YHQuNC90LPQsCB0clxuICAgICAgICAgICAgZnVuY3Rpb24gcGFyc2VUcihjb3VudCkge1xuICAgICAgICAgICAgICB2YXIgdGQgPSBzdHJbY291bnRdLmlubmVySFRNTCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gXCJ0ZD5cIixcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gLTE7XG4gICAgICAgICAgICAgIHRkID0gdGQucmVwbGFjZSgvKFxcclxcbnxcXG58XFxyKS9nbSwgJycpO1xuICAgICAgICAgICAgICB0ZCA9IHRkLnJlcGxhY2UoL1xcc3syLH0vZywgJycpO1xuICAgICAgICAgICAgICB3aGlsZSAoKHBvcyA9IHRkLmluZGV4T2YodGFyZ2V0LCBwb3MgKyAxKSkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0ZCA9IHRkLnJlcGxhY2UodGFyZ2V0LCBcImRpdj5cIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYm9keUFyci5wdXNoKCc8ZGl2IGNsYXNzPVwiJysgcHJ4ICsgJ2l0ZW1cIj4nICArIHRkICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL9C10YHQu9C4INC+0LHRidCw0Y8g0YHRgtC+0LjQvNC+0YHRgtGMINC90LDRhdC+0LTQuNGC0YHRjyDQstC90YPRgtGA0Lgg0YLQsNCx0LvQuNGG0YtcbiAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb3N0ID09ICdpbm5lcicpIHtcbiAgICAgICAgICAgICAgLy/Ql9Cw0LHQuNGA0LDQtdC8INCy0LXRgdGMINGC0LXQutGB0YIg0YEg0L/QvtGB0LvQtdC00L3QtdC5IHRyXG4gICAgICAgICAgICAgIGNvc3QgPSBzdHJbc3RyLmxlbmd0aCAtIDFdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgLy/Qn9GA0L7RhdC+0LTQuNC80YHRjyDQv9C+INCy0YHQtdC8IHRyLCDQutGA0L7QvNC1INC/0LXRgNCy0L7QuSDQuCDQv9C+0YHQu9C10LTQvdC10Lkg0Lgg0LfQsNCx0LjRgNCw0LXQvCBIVE1MINCyINC60LDQttC00L7QuSB0ZFxuICAgICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgc3RyLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcnNlVHIoaSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgeyAvL9C+0LHRidCw0Y8g0YHRgtC+0LjQvNC+0YHRgtGMINC90LDRhdC+0LTQuNGC0YHRjyDQt9CwINC/0YDQtdC00LXQu9Cw0LzQuCDRgtCw0LHQu9C40YbRi1xuICAgICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VUcihpKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBwYXJzZVRhYmxlKGJvZHlBcnIsIGNvc3QpO1xuICAgICAgICAgIH0gIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKGZsYWcgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlKGVsZW0pIHtcbiAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVtb3ZlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nKyBwcnggKyAnbGlzdCcpKTtcbiAgICAgICAgICAgIHJlbW92ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJysgcHJ4ICsgJ2Nvc3QnKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ3RhYmxlJztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy/Ql9Cw0L/Rg9GB0LrQsNC10Lwg0YTRg9C90LrRhtC40Y4g0L/RgNC4INC30LDQs9GA0YPQt9C60LVcbiAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXNwb25zaXZlQ2FydCgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvL9CX0LDQv9GD0YHQutCw0LXQvCDRhNGD0L3QutGG0LjRjiDQvdCwINGA0LXRgdCw0LnQt1xuICAgICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmVzcG9uc2l2ZUNhcnQoKTtcbiAgICAgIH07IFxuICAgIH07XG5cbiAgICAvL9CS0YvQt9C+0LIg0LzQtdGC0L7QtNCwXG4gICAgUmVzcG9uc2l2ZUNhcnQoJyNjYXJ0VGFibGUnLCB7XG4gICAgICBcbiAgICB9KTtcbn0pOyJdfQ==
