# going-buildless
A short introduction to native web components.

Why should we leverage the built-in libraries of modern web browsers? To create native web-components which are interoperable and future-ready of course!

## TLDR;

1. Clone this repo
2. From the root directory of the repo, start a python webserver: `python3 -m http.server`
3. Browse http://localhost:8000/index.html

No compilation step, no npm install, none of the faff. All of the interactive web components.

## Examining the native web component

https://github.com/cpbirch/going-buildless/blob/3a5683e208b91c910132dbbf065ee44752d72ec3/index.html#L11-L14

For this example, I created a native web component called `<zoe-list-item>`.  It's purpose is to present data with circles which vary in size and color as a nice list.  Click the button to cycle the colours.

There are two different ways of providing input.  The first is by attributes on the custom element itself: on line 11 I can set the circle size (1 to 10) and the colour (0 to 3).  Try changing these values to see what happens.

The second way to provide input is by inserting any valid html (or web component) and specifying it's 'slot'.  On line 12, try changing the `span` to some other html.  The important identifier is the `slot` attribute.

`<slot>`'s are just placeholders which allow you to add your own markup within a custom component.  It allows two different DOM trees to be composed together.

## A bit about encapsulation

If the buildless aspect hasn't grabbed you... and the simple composability hasn't yet whet your appetite... then how about redefining the `div` style? We can see how it's limited to the scope of the shadow DOM only.

https://github.com/cpbirch/going-buildless/blob/61c8a211f30acebe69ff9242a5e06813ccdaf25f/zoe-list-item.js#L15-L20

In line 16 to 20 above, we redefine `div` to have a grid layout with four columns.  Yet somehow this doesn't affect the layout of `index.html`.  How is this possible?  This is the beauty of the Shadow DOM and it's main difference from React and it's Virtual DOM.

<img width="1468" alt="image" src="https://github.com/cpbirch/going-buildless/assets/9862587/a83d2a07-debf-4ab5-9603-6238d311e072">

In the image above, you can see the DOM and how it's identical to the markup in [index.html](https://github.com/cpbirch/going-buildless/blob/61c8a211f30acebe69ff9242a5e06813ccdaf25f/index.html) but there is this interesting thing called *#shadow-root*

<img width="490" alt="image" src="https://github.com/cpbirch/going-buildless/assets/9862587/94553916-571f-4193-8fb9-7a7f0452d004">

Opening the shadow root shows the encapsulated markup.  In this Firefox debugger, clicking on the slot reveal arrow simply directs the focus on the span in the actual DOM.

So now, it feels like real programming.  Even using javascript, the only way to manipulate my component is to append child elements (they'll be put in slots) or set the defined attribute values.  If you want circles to be triangles, or colour them blue then you must edit the component itself.  Conversely, any definitions I create in my component will not affect any web page or application it's included in.

To learn more visit https://developer.mozilla.org/en-US/docs/Web/API/Web_components and https://lit.dev/ or watch a [Scott Davis video](https://youtu.be/s-nRD5EPq2k?si=hM4h8kksNYNzqc_b)

# History Lesson

In Scott's video (link above) he describes web development as "pathologically global".  The DOM itself is a mutable global variable. Any style sheet loaded is in the global namespace. Any javascript loaded by the page can manipulate the DOM.  A number of frameworks have been developed to solve this problem, by attempting to introduce encapsulation and make it easier to build reusable components.  Arguably, the most successful of these frameworks is React.

## The problems with React

These days, complex single page web applications are built by multiple teams.  I’ve worked at several clients where one team manages the web app framework (the container) and then multiple teams deploy their React components within the container.  Teams can usually make changes and release on demand (following good CI/CD practices) but they run into problems when they want to upgrade the version of React they are using.

The benefits of the React framework come at the cost of a global namespace and the need for multiple teams to be tied to the current React version.  The container team often has to coordinate all other teams to upgrade in lockstep.

Scoping is a problem with React.  I’ve always followed the safe practice of prefixing my CSS with my team name or my unique container name, so I don’t clash with anyone else.  The same for my components.

In addition to the global scope of naming, I’ve often come across the complexity of global state (Redux anyone?).  Despite my best effort to keep my state private, someone always goes and subscribes to it, creating a dependency that is now out of my control and that I don’t have tests for.  I make a change, my pipeline is green and then my smoke test tells me the website is broken.

Overall, programming web applications feels different to serverside programming because I’m no longer able to have well encapsulated software components, exposing only the behaviour I want them to while hiding the implementation.

## How did we get here with React?

Microsoft Internet Explorer.  The scourge of web devs in the naughties where we all had to collect our CSS workarounds to avoid this:

[<img src="css-is-awesome.png">](https://github.com/cpbirch/going-buildless)

But other browsers were just as bad.  Who remembers Opera?

The beauty of Facebook’s solution was to create a single framework which provided a Virtual DOM.  All manipulation by the developer was done and tested against the Virtual DOM provided by React, leaving React to create any workarounds or do other clever things so that the web application would render the same and work in web browsers which were most in use by the general public.

React has constantly been enhanced and improved over the years to be the helpful and dominant web application framework, used by me and thousands of developers all over the world.

But it’s been legacy code since 2019.  Why?

## The Shadow DOM

Since 2004, the W3C has had competition from https://whatwg.org/ - now the defacto web standards organisation.  Since 2011 the modern web components standards have been published by https://whatwg.org/ and available in Chrome and Firefox.  Since 2019, the standards have been implemented by Edge (>v72), Chrome, Firfox and Safari.  These standards cover javascript (ES6) and the DOM, and branched away from a single global DOM to use the Shadow DOM instead.

I love the Shadow DOM.  It makes programming web application feel like… well, programming.  Just like writing some Kotlin.  Or Python.  Using ES6 and the libraries / APIs built into modern browsers, I now have scoped variables and I have a scoped DOM.  I can write my web components with css styles which are contained within my component, having no effect outside it.  I can hide how my component is implemented but I can provide a clean interface to customise the component.  My component can store and manage it’s own state, I can determine which events I want to emit and which I want to keep contained.

Using Google’s small library ( https://lit.dev 5kb ) I can easily write native web components without boilerplate.  They can be deployed onto a shared UI without clashing with other components because they’re truly encapsulated.  Multiple teams can even upgrade lit.dev independently of each other because it’s also locally scoped and very lightweight.

But most of all, I love that I can write a bit of code, save it, reload it in the browser and see my change instantly.  No need to wait for a compilation step.  No complicated tooling.

## Try it for yourself

Open either of the two files (index.html or  zoe-list-item.js), make a change and save it.  Click reload in the browser and see the change instantly.

This demo is intended to be trivial but can easily be extended to use the Fetch API to get server side data which could then be rendered by a component.

