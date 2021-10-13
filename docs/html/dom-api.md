---
title: DOM API
---


## Get elements

`document.getElementById('addTodoButton')` Returns a single Element, or null if no matching element is found. Only available in 'document' but not in any Element

`document/element.getElementsByClassName('brand-color')` and `document/element.getElementsByTagName('p')` Returns multiple items in the form of an HTMLCollection. On an Element it will return only descendants.

`document.querySelector('.header')` Returns the first Element that matches the selector or null


## Events

Event reference: https://developer.mozilla.org/en-US/docs/Web/Events

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

`element.addEventListener('click', () => {})`


### `<form>` submit event

```html
<form id="form">
  <input type="text" id="username" />
  <input type="submit" value="Sign Up" />
</form>
```

```js
document.getElementById("form").onsubmit = function (event) {
  event.preventDefault()
  document.getElementById("username").value
  // Do AJAX call...
}
```


## Add element to a list

```html
<ul id="items">
  <li>Something</li>
</ul>
```

```js
const item = document.createElement("li");
item.innerHTML = 'Some text';
document.getElementById("items").appendChild(item);
```


## Add/remove class

[`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)

```js
element.className = "hidden"
element.className = ""
```

[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

```js
element.classList.add("hidden")
element.classList.remove("hidden")
element.classList.replace("hidden", "visible")
element.classList.toggle("hidden") // Adds class if present, removes it otherwise. Returns boolean
element.classList.toggle("hidden", i < 10 )
```


## Links

https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#dom_interfaces

https://ui.dev/dom
