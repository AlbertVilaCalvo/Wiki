---
title: Chrome DevTools
---

https://developer.chrome.com/docs/devtools/

DevTools Tips: https://www.youtube.com/playlist?list=PLNYkxOF6rcIAcezfL8q0rjt13ufKseL5X

What's New in DevTools: https://www.youtube.com/playlist?list=PLNYkxOF6rcIBDSojZWBv4QJNoT4GNYzQD

## Console tab

How to speed up your workflow with Console shortcuts - https://www.youtube.com/watch?v=hdRDTj6ObiE

`$_` gives you the value of the last expression.

`$0`/`$1`/`$2`/`$3`/`$4` hold the element selected at the Elements tab.

`$('img')` we can use jQuery-like syntax to grab elements, instead of using something like `document.querySelector()`.

`$$('svg')` gives an array with all the SVG elements.

`$$('svg', 'main')` gives an array with all the SVG elements that belong to the `main` element.

`queryObjects(Promise)` queries objects by constructor.

`table(someobject)` shows the object in a table. Is a shortcut for `console.table()`.

`keys(someobject)` prints the object keys.

`values(someobject)` prints the object values.

`copy(values(someobject))` copes the object values. You can then paste it.

`getEventListeners($0)` shows all event listeners of an element.

`monitorEvents(window, 'resize')` will print the events to the console. Use `unmonitorEvents(window)` to stop listening.

`monitor(someFunction)` will log every function call, along with the arguments. Use `unmonitor(someFunction)` to stop listening.

`clear()` clears the console. Is a shortcut for `console.clear()`.

## Logpoints - Log messages without `console.log()` in your code

https://twitter.com/addyosmani/status/1561424823288356864

https://www.amitmerchant.com/log-messages-logpoints-chrome-devtools/

> Have you ever been in a situation where you’re testing an application but you don’t have access to the source code but you still want to debug some part of the code by console logging the variables?

## Network tab

https://developer.chrome.com/docs/devtools/network/

Holding the shift key while hovering over a request will highlight the initiator in green and dependencies in red. https://twitter.com/guaca/status/1544967782206431234

### Filters

https://developer.chrome.com/docs/devtools/network/reference/#filter-by-property

https://www.linkedin.com/posts/addyosmani_softwareengineering-webdevelopers-activity-6968232078484131841-l76u/

https://www.smashingmagazine.com/2021/02/useful-chrome-firefox-devtools-tips-shortcuts/#filters-in-the-network-panel-chrome-edge-firefox
