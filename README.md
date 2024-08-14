# react-reveal-slides

<p align="center">
  Create and add <a href="https://revealjs.com/">reveal.js</a> HTML presentations entirely in react!
</p>

![react-reveal-slides](https://github.com/bouzidanas/react-reveal-slides/blob/master/public/react-reveal-slides-demo.gif)

## Overview
- Add multiple slide decks to your React app
- Embed React components inside presentations
  - By default, presentation content can be written entirely in JSX
- Dynamically alter presentation content
- Dynamically change configuration options. Supports all config options. Change theme, transition, and more
- Control slide state from outside the presentation
  - Via props
  - Via Reveal.js API accessed through refs
- Includes slide state change callback
- Accepts Reveal.js plugins

## Installation

This package is still in development and not yet published to npm. You can install it directly from github:

```bash
npm install reveal.js bouzidanas/react-reveal-slides 
```
and to get types for typescript
```bash
npm i --save-dev @types/reveal.js
```

## Usage
  
```tsx
import { RevealSlides } from "react-reveal-slides"

// Make sure reveal.js is installed with npm for the following imports to work
// Plugins
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

function App() {
  return (
    <RevealSlides controls={false} plugins={[RevealZoom, RevealNotes]} onStateChange={(state)=>console.log(state)}>
      <section key="0" data-background-color="#0c1821">
        <section key="0-0">
          <h2>react-reveal-slides</h2>
          <p>Create dynamic Reveal.js slides</p>
        </section>
        <section key="0-1">
          <ul>
            <li className="fragment">Easily make presentation content dynamic</li>
            <li className="fragment">Easily add presentations to React apps</li>
            <li className="fragment">Embed React components inside presentations</li>
          </ul>
        </section>
      </section>
      <section key="1" data-background-color='#bf4f41'>
        <section key="1-0">
          <h2>Free reign over your presentation</h2>
          <p>This package makes no efforts to impead or restrict what you can do.</p>
        </section>
        <section key="1-1">
          <p>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
        </section>
        <section key="1-2">  
          <p>Simply put, React already takes care of converting JSX into something Reveal.js can work with.</p>
          <aside className="notes">Shhh, these are your private notes 📝</aside>
        </section>
      </section>
    </RevealSlides>
  )
}

export default App
```

### Themes

Reveal.js comes with a variety of themes including: `black`, `white`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`, `blood`, `moon`, and `night`.

To use a theme, you can import the desired Reveal.js theme css file in your project. For example, to use the `black` theme, you can import the css file like so:

```tsx
import 'reveal.js/dist/theme/black.css'

// or alternatively
import '../node_modules/reveal.js/dist/theme/black.css'
```
To use any of the other themes, simply replace `black` with the desired theme name.

### Tips

#### Dimensions
By default, the RevealSlides component will take up the entire width and height of its parent container. If you want to change the dimensions of the presentation, you can do so by changing the width and height of the parent container. 

If you do not see the presentation, one thing to check is the dimensions of the parent container.

#### Data attributes
`data-` attributes can be added in JSX (as props) same as how you would in markup except in the case of boolean data attributes. In that case, you must set the value to an empty string. For example, `data-markdown` should be `data-markdown=""` in JSX.

# License
[![Static Badge](https://img.shields.io/badge/License-MIT-415a77?style=for-the-badge)](https://github.com/bouzidanas/react-reveal-slides/blob/master/LICENSE)
