---
title: DOM API
---

## Get elements

`document.getElementById('addTodoButton')` Returns a single Element, or null if no matching element is found. Only available in 'document' but not in any Element

`document/element.getElementsByClassName('brand-color')` and `document/element.getElementsByTagName('p')` Returns multiple items in the form of an HTMLCollection. On an Element it will return only descendants.

`document/element.querySelector('.header')` Returns 1 Element, the first that matches the selector or null.

`document/element.querySelectorAll('#some-id')` Returns multiple elements.

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
document.getElementById('form').onsubmit = function (event) {
  event.preventDefault()
  document.getElementById('username').value
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
const item = document.createElement('li')
item.innerHTML = 'Some text'
document.getElementById('items').appendChild(item)
```

## `data-xxx` attribute

To create an element with a data-id attribute like this:

```html
<input data-id="{{ item.id }}" />
```

We do:

```js
element.setAttribute('data-id', id)
```

And to retrieve the data attribute value in JavaScript we use the [`dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) property:

```js
const id = element.dataset.id
// Or on a click event on the element
const id = event.target.dataset.id
```

Note that any hyphen (`-`) in the html is removed and convert to camelCase. Eg `<input data-item-id="{{ item.id }}" />` becomes `element.dataset.itemId`. See https://stackoverflow.com/questions/22753629/jquery-get-html-5-data-attributes-with-hyphens-and-case-sensitivity

## Add/remove class

[`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)

```js
element.className = 'hidden'
element.className = ''
```

[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

```js
element.classList.add('hidden')
element.classList.remove('hidden')
element.classList.replace('hidden', 'visible')
element.classList.toggle('hidden') // Adds class if present, removes it otherwise. Returns boolean
element.classList.toggle('hidden', i < 10)
```

## Links

https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#dom_interfaces

https://ui.dev/dom
