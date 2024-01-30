import { useEffect, useState } from "react"
import { RevealSlides } from "./Reveal"

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

// import './custom_theme_starter.css';

function App() {
  const [theme, setTheme] = useState("black")
  const [text, setText] = useState("What we are starting with")
  const [presState, setPresState] = useState({"indexh": -1, "indexv": -1, "indexf": -1, "paused": false, "overview": false })
  const [useCustomTheme, setUseCustomTheme] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme("none")
    }, 3000);

    const timer2 = setTimeout(() => {
      setTheme("white")
    }, 6000);

    const timer3 = setTimeout(() => {
      setText("We interrupt this program to bring you a special report.")
    }, 9000);

    const timer4 = setTimeout(() => {
      setPresState({"indexh": 1, "indexv": 0, "indexf": 0, "paused": true, "overview": false });
    }, 12000);

    const timer5 = setTimeout(() => {
      setUseCustomTheme(true);
    }, 15000);

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, []);

  return (
    <>
      <RevealSlides presState={presState} plugins={[RevealZoom, RevealNotes]} theme={theme} onStateChange={(state)=>console.log(state)} >
        <section>
          <h1>Slide 1</h1>
          <p>{text}</p>
        </section>
        <section>Slide 2</section>
      </RevealSlides>
      {useCustomTheme && <link rel="stylesheet" href="/src/custom_theme_starter.css" />}
    </>
  )
}

export default App
