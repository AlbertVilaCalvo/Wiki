---
title: Forms
---

https://html.spec.whatwg.org/multipage/forms.html#forms

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form

https://developer.mozilla.org/en-US/docs/Learn/Forms

https://www.w3schools.com/tags/ref_httpmethods.asp

https://stackoverflow.com/questions/504947/when-should-i-use-get-or-post-method-whats-the-difference-between-them

https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get

An HTML `<form>` only supports GET and POST methods, whereas Fetch supports GET, POST, PUT, DELETE, HEAD and OPTIONS ([source](https://fetch.spec.whatwg.org/#methods)).

Note that if the form is inside a `<dialog>` we can use `method='dialog'` ([source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method)).

## GET

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET

`<form action='/search' method='get'>`

Form data is added to the URL as query parameters.

- No request body, and hence no Content-type
- Idempotent
- Can be cached
- Can be bookmarked
- Length is restricted
- Not for sensitive data
- Saved in browser history

## POST

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST

`<form action='/create-user' method='post'>`

Form data is stringified and set as the request body.

- Content-type: application/x-www-form-urlencoded by default, can be controlled by the attribute `enctype`
  - Use multipart/form-data if the form contains `<input>` elements with type=file
- Request Body: field1=value1&field2=value2
- Not idempotent, may have side effects
- Length not restricted
- For sensitive data
- Not saved in browser history

## Form vs AJAX

When a form is submitted the client navigates to a new URL, sending the data, then it waits for the server response, and finally the browser (client) page refreshes. The request is synchronous and the server dictates how the view updates.

In contrast, when we do an AJAX request, we don’t have to navigate anywhere, and the client does not have to refresh. The request is asynchronous and the client dictates how the view updates.

## `<selectmenu>` (instead of `<select>`)

_Still a draft!_

Can be customized, see https://web.dev/state-of-css-2022/#customizing-select-elements

## `<search>` (new)

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search
