---
title: DOM API
---

## Get elements

`document.getElementById('addTodoButton')` Returns a single Element, or null if no matching element is found. Only available in 'document' but not in any Element

`document/element.getElementsByClassName('brand-color')` and `document/element.getElementsByTagName('p')` Returns multiple items in the form of an HTMLCollection. On an Element it will return only descendants.

`document.querySelector('.header')` Returns the first Element that matches the selector or null

## Events

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

`element.addEventListener('click', () => {})`

## Links

https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#dom_interfaces

https://ui.dev/dom
