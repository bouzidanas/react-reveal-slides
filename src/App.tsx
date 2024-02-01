import { useEffect, useState } from "react"
import { RevealSlides } from "./Reveal"

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

// import './custom_theme_starter.css';

const CodePrezCard = ({code = "", lineNumbers, children}:{code?: string, lineNumbers?: string, children?: (React.ReactNode[] | React.ReactNode)}) => {
  return (
    <div style={{width: "70%", height: "fit-content"}}>
      <pre>
        <code data-line-numbers={lineNumbers}>
          {code}
        </code>
      </pre>
      <div style={{width: "100%", height: "200px"}}>
        <RevealSlides key="rs-2" keyboardCondition="focused" embedded>
          {children}
        </RevealSlides>
      </div>
    </div>
  );
}

const showIntro = false;

function App() {
  const [theme, setTheme] = useState("night")
  const [firstSlideText, setFirstSlideText] = useState("Create dynamic Reveal.js slides")
  const [presState, setPresState] = useState({"indexh": -1, "indexv": -1, "indexf": -1, "paused": false, "overview": false })
  const [useCustomTheme] = useState(false);
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>("edges");

  const timeDelta = 1000;

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      setTheme("none")
    }, 3*timeDelta);

    const timer2 = setTimeout(() => {
      setFirstSlideText("Explore new possibilities thanks to the React framework and ecosystem")
    }, 6*timeDelta);

    const timer2a = setTimeout(() => {
      setPresState({"indexh": 0, "indexv": 1, "indexf": 0, "paused": false, "overview": false });
    }, 9*timeDelta);

    const timer2b = setTimeout(() => {
      setPresState({"indexh": 0, "indexv": 1, "indexf": 1, "paused": false, "overview": false });
    }, 12*timeDelta);

    const timer2c = setTimeout(() => {
      setPresState({"indexh": 0, "indexv": 1, "indexf": 2, "paused": false, "overview": false });
    }, 15*timeDelta);
    
    // const timer3 = setTimeout(() => {
    //   setTheme("white")
    // }, 9*timeDelta);

    // const timer4 = setTimeout(() => {
    //   setPresState({"indexh": 1, "indexv": 0, "indexf": 0, "paused": true, "overview": false });
    // }, 12*timeDelta);

    // const timer5 = setTimeout(() => {
    //   setUseCustomTheme(true);
    // }, 15*timeDelta);

    // const timer6 = setTimeout(() => {
    //   setControlsLayout("bottom-right");
    // }, 18*timeDelta);

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer2a)
      clearTimeout(timer2b)
      clearTimeout(timer2c)
      // clearTimeout(timer3)
      // clearTimeout(timer4)
      // clearTimeout(timer5)
      // clearTimeout(timer6)
    }
  }, []);

  return (
    <>
      <RevealSlides key="rs-2" controlsLayout={controlsLayout} presState={presState} plugins={[RevealZoom, RevealNotes]} theme={theme} onStateChange={(state)=>console.log(state)} >
        <section key="0" data-background-color="#0c1821">
          <section key="0-0">
            <h2 style={{color: "#E7AD52", marginTop: "-0.5rem"}}>react-reveal-slides</h2>
            <p key={firstSlideText} style={{animation: "fadeIn 500ms ease-in-out", height: "7rem"}}>{firstSlideText}</p>
          </section>
          <section key="0-1">
            <ul style={{listStyleType: "emoji"}}>
              <li className="fragment" style={{margin: "0.7rem"}}>Easily make presentation content dynamic</li>
              <li className="fragment" style={{margin: "0.7rem"}}>Easily add presentations to React apps</li>
              <li className="fragment" style={{margin: "0.7rem"}}>Embed React components inside presentations</li>
            </ul>
          </section>
        </section>
        <section key="1" data-background-color='#bf4f41'>
          <section key="1-0">
            <h2 style={{color: "#432534"}}> 
              Free reign over your presentation
            </h2>
            <p>This package makes no efforts to impead or restrict what you can do.</p>
          </section>
          <section key="1-1">
            <p>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
          </section>
          <section key="1-2">  
            <p>Simply put, React already takes care of converting JSX into something Reveal.js can work with.</p>
            <aside className="notes">
              Shhh, these are your private notes 📝
            </aside>
          </section>
          <section key="1-3">
            <CodePrezCard code={`
              <RevealSlides>
                <section>
                  <h1>Slide 1</h1>
                </section>
                <section>
                  <h1>Slide 2</h1>
                </section>
              </RevealSlides>
            `}>
              <section>
                <h1>Slide 1</h1>
              </section>
              <section>
                <h1>Slide 2</h1>
              </section>
            </CodePrezCard> 
          </section>
        </section>
      {useCustomTheme && <link rel="stylesheet" href="/custom_theme_starter.css" />}
      </RevealSlides> 
    </>
  )
}

export default App