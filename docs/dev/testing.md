---
title: Testing
---

Write tests. Not too many. Mostly integration. - https://twitter.com/rauchg/status/807626710350839808

[Kent C. Dodds - How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)

> Think less about the code you are testing and more about the use cases that code supports.

The more your tests resemble the way your software is used, the more confidence they can give you. - https://twitter.com/kentcdodds/status/977018512689455106

Coverage is not strongly correlated with test suite effectiveness, by Laura Inozemtseva and Reid Holmes - https://www.cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf

Effective developer testing, by Maurício Aniche - https://docs.google.com/presentation/d/1MVmcp-I8FtVyN0cZ-qzWaKPt6iXtXykRemrFvBvyDPs/edit#slide=id.p

## Mocks

https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html

https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html

> The mocking structure become tightly coupled to implementation details causing many tests to break when those details are modified

Prefer Fakes Over Mocks - https://tyrrrz.me/blog/fakes-over-mocks

> Tests that rely on mocks are inherently coupled to the implementation of the system and are fragile as the result.
