---
title: React, the boring but important parts
date: '2018-01-10T15:58:27+00:00'
---

Hi ! In this post, I'll try to simplify and show you some of React's very basic, yet powerful, features.

PS : This is not one of those _Read this and you'll be ready to become an awesome React developer_. I'm trying to help you _Master_ React, but one blog post at a time.

# JSX

It's Javascript in an HTML way... I know it sounds (and looks) weird but bare with me, because once you learn how to write JSX, you'il love it. First, let me show you what would a Paragraph **component** look like using normal Javascript

```javascript
'use strict'

var Paragraph = function Paragraph(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('p', null, 'this is a paragraph')
  )
}
```

Right now, you might be asking yourself _WTF is this..._. But don't worry though, let's write the same component but this time using JSX:

```js
const Paragraph = props => (
  <div>
    <p>this is a paragraph</p>
  </div>
)
```

Isn't JSX awesome ? thought so 😏.

# Components

In React, there are two kinds of components, **stateful components** and **stateless components**.

## Stateless components

Stateless components are functions that accept a single argument and return DOM elements. the Paragraph components that we have above for example is a stateless components, it accepts _props_ as an argument and returns a _p_ inside a _div_.

> PS: the argument _props_ is immutable, it can't be changed inside the component.

## Stateful components

Stateful components are components that have _state_ and some other features.

### State

A state is just an object that makes the component dynamic and determines how the component must be rendered, inside it, you need to store any data that is related or used by the component.

All this bla bla is weird so EXAMPLE TIME :

Let's say we have a component that has an _input_ and an _h3_, and we want to show whatever in the _h3_ is written in the _input_

```js
import React, { Component } from 'react'

class ExampleComponent extends Component {
  state = {
    text: 'this is the initial text',
  }

  handleChange = event => {
    this.setState({ text: event.target.value })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <h3>{this.state.text}</h3>
      </div>
    )
  }
}
```

Okay so let's break down this example :

1. line 1 : We import React and Component from the _react_ library.

2. line 3 : then we declare a class (thanks to ES6), we call it _ExampleComponent_ and it extends Component.

3. lines 5 to 7 : we create the state object (thanks to ES7's Class Properties) and populate it with a placeholder text.

4. lines 13 to 20 : we declare the _render_ method, which is mandatory for any React Stateful component, this method **should** return markup. In our declaration, we return an _input_ and an _h3_ both wrapped with a _div_. Again, what we need is to get whatever is written in the _input_, store it in our state and show it as an h3. the OnChange prop is a default prop that takes a _callback_ and gives it a DOM event as an argument. This prop/method gets call everytime a _Change_ event happens on the _input_

5. lines 9 to 11 : this is the callback that we pass to _input_'s _onChange_ prop. it take _event_ as an argument, and uses the _setState_ method to set the _text_

> PS: DO NOT CHANGE THE STATE LIKE THIS : `this.state.text = 'something'`,
> if you do so, **React won't know if the state has changed or not**, hence it won't rerender your component. EVERYTIME you want to change the state, use the setState method like this: `this.setState({ text: 'something' })`

### Lifecycle methods

Apart from _state_, another feature that Stateful components have but the Stateless ones lack is the Lifecycle Methods.

These methods get called depending on weither the component gets mounted or unmounted, created or destroyed and when there's a rendering error.

When a component is created and inserted into the DOM, these methods get called:

- constructor()
- componentWillMount()
- render()
- componentDidMount()

When a component is created and inserted into the DOM, these methods get called:

- `constructor()`
- `componentWillMount()`
- `render()`
- `componentDidMount()`

When a component's props or state gets changed, the component rerenders and these methods get called:

- `componentWillReceiveProps()`
- `shouldComponentUpdate()`
- `componentWillUpdate()`
- `render()`
- `componentDidUpdate()`

When a component is getting removed from the DOM, `componentWillUnmount()` get called

To declare one of these methods, you simply declare them the same way we declared the _render_ method in the last example.

## Fragments

**HISTORY TIME** : Before React 16, to render multiple elements, we needed to wrap them with an element, like a _div_

```js
const ThreeLines = (props) => (
  <div>
    <h1>title 1</h1>
    <h1>title 2</h1>
    <h1>title 3</h1>
  <div>
)
```

and with React 16, a better way to render multiple elements was to return them inside an array:

```js
const ThreeLines = props => [
  <h1>title 1</h1>,
  <h1>title 2</h1>,
  <h1>title 3</h1>,
]
```

But this solution came with it's own issues. You HAD to add a key prop to the elements in order to silence a React warning in the console for example.

With React 16.2, things got a bit easier and better thanks to **Fragments** :

```js
const ThreeLines = (props) => (
  <React.Fragment>
    <h1>title 1</h1>
    <h1>title 2</h1>
    <h1>title 3</h1>
  <React.Fragment>
)
```

Once rendered, this component would look like :

```js
    <h1>title 1</h1>
    <h1>title 2</h1>
    <h1>title 3</h1>
```

See, no more wrapping divs and no more Array-like crappy syntax.

# Conclusion

I tried to be as concise as possible so that I won't scare you off learning React, but the truth is that React is _simple_ compared to other front end frameworks.

I will announce next week's subject throught Twitter and email, so don't forget to subscribe :D

Have a great week and see you soon !
