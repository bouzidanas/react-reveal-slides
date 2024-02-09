import { CSSProperties, useEffect, useState } from "react"
import { RevealSlides } from "./Reveal"
import { BiLogoGithub } from "react-icons/bi";

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

// import './custom_theme_starter.css';

// const CodePrezCard = ({code = "", lineNumbers, children}:{code?: string, lineNumbers?: string, children?: (React.ReactNode[] | React.ReactNode)}) => {
//   return (
//     <div style={{width: "70%", height: "fit-content"}}>
//       <pre>
//         <code data-line-numbers={lineNumbers}>
//           {code}
//         </code>
//       </pre>
//       <div style={{width: "100%", height: "200px"}}>
//         <RevealSlides key="rs-2" keyboardCondition="focused" embedded>
//           {children}
//         </RevealSlides>
//       </div>
//     </div>
//   );
// }

const showIntro = false;

function App() {
  const [theme, setTheme] = useState("black")
  const [presState, setPresState] = useState({"indexh": -1, "indexv": -1, "indexf": -1, "paused": false, "overview": false })
  const [useCustomTheme] = useState(false);
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>("edges");
  const [headerFontColor, setHeaderFontColor] = useState("white");
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [headerVisible, setHeaderVisible] = useState<CSSProperties["visibility"]>("hidden");

  const timeDelta = 1000;

  const handleOnStateChange = (state: Reveal.RevealState) => {
    console.log(state);
    
    if (state.indexh === 0 && state.indexv === 0){
      setHeaderFontColor("white");
      setHeaderVisible("hidden");
      setHeaderOpacity(0);
    }
    else if (state.indexh === 0 && state.indexv === 1) {
      setHeaderFontColor("black");
      setHeaderVisible("visible");
      setHeaderOpacity(1);
    }
    else if (state.indexh > 2) {
      setHeaderFontColor("black");
    }
    else {
      setHeaderFontColor("white");
    }
  }

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      setTheme("black")
    }, 3*timeDelta);

    // const timer2 = setTimeout(() => {
    //   setFirstSlideText("Explore new possibilities thanks to the React framework and ecosystem")
    // }, 6*timeDelta);

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
      <div key="header-navbar" style={{position: "absolute", top: "0", left: "0", width: "100%", height: "4.5rem", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "1000000001", visibility: headerVisible, opacity: headerOpacity, transition: "opacity 1s ease-in-out 0.8s"}}>
        <div style={{width: "62vw", minHeight: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h3 style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: headerFontColor, transition: "color 1.2s ease-in-out"}}>react-reveal-slides</h3>
          <a href='https://github.com/bouzidanas/react-reveal-slides' target='_blank' rel='noreferrer'>
            <BiLogoGithub style={{color: headerFontColor, fontSize: "2.5rem", transition: "color 1.2s ease-in-out"}} />
          </a>
        </div>
      </div>
      <RevealSlides key="rs-2" scrollSnap="proximity" minScale={1} maxScale={1} transition="slide" width={"100%"} margin={0.01} view="scroll" controlsLayout={controlsLayout} presState={presState} plugins={[RevealZoom, RevealNotes]} theme={theme} onStateChange={handleOnStateChange} >
        <section key="0">
          <section key="0-0" data-auto-animate data-background-color="#0c1821">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
              <div style={{position: "absolute", left: "-100vw", top: "0px", width: "100vw", height: "100vh", backgroundColor: "#e9e7e6", zIndex: "3"}}></div>
              <h2 style={{color: "#E7AD52", opacity: 1, height: "5.4vw", fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw", zIndex: "3"}}>react-reveal-slides</h2>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "0px", backgroundColor: "black", overflow: "hidden", borderRadius: "0rem", zIndex: "3"}}>
                <img src="man-walking.jpg" alt="man-walking" style={{filter: "brightness(0.75)", maxWidth: "unset", minWidth: "100vw", maxHeight: "unset"}} />
                <div style={{opacity: 0, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "38vh", transform: "translate(-50%, -50%)"}}>REACT</div>
                <div style={{opacity: 0, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "52vh", transform: "translate(-50%, -50%)"}}>+</div>
                <div style={{opacity: 0, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "66vh", transform: "translate(-50%, -50%)"}}>REVEAL.JS</div>
              </div>
            </div>
          </section>
          <section key="0-0-a" data-auto-animate data-background-color="#0c1821">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>  
              <div style={{position: "absolute", left: "0px", top: "0px", width: "100vw", height: "100vh", backgroundColor: "#e9e7e6", zIndex: "3", animation: "bgSlideInFromLeft 1.2s ease-in-out"}}></div>
              <h2 style={{color: "#E7AD52", opacity: 0, height: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw", zIndex: "3", animation: "firstTitleOut 1s ease-in-out"}}>react-reveal-slides</h2>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "64vw", height: "32vw", backgroundColor: "black", overflow: "hidden", borderRadius: "1.2rem", animation: "growWindow 1s ease-in-out", zIndex: "3"}}>
                <img src="man-walking.jpg" alt="man-walking" style={{filter: "brightness(0.75)", maxWidth: "unset", minWidth: "90vw", maxHeight: "unset", animation: "imgZoomOut 1s ease-in-out"}} />
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "37vh", transform: "translate(-50%, -50%)"}}>REACT</div>
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "52vh", transform: "translate(-50%, -50%)"}}>+</div>
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "67vh", transform: "translate(-50%, -50%)"}}>REVEAL.JS</div>
              </div>
            </div>
          </section>
          <section data-background-color="#222222" key="0-1" style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw"}}>
              <p className="fragment fade-in-then-semi-out" data-fragment-index="0" style={{lineHeight: "0.9"}}>ADD PRESENTATIONS TO REACT APPS</p>
              <p className="fragment fade-in-then-semi-out" style={{lineHeight: "0.9"}}>ADD REACT COMPONENTS TO PRESENTATIONS</p>
              <p className="fragment fade-in-then-semi-out" style={{lineHeight: "0.9"}}>MAKE REVEAL PRESENTATIONS EVEN MORE DYNAMIC</p>
          </section>
        </section>
        <section key="1" >
          <section key="1-0">
            <h2 style={{color: "#432534"}}> 
              Free reign over your presentation
            </h2>
            <p>This package makes no efforts to impead or restrict what you can do.</p>
          </section>
          <section key="1-1" data-background-color='#bf4f41'>
            <p>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
          </section>
          <section key="1-2">  
            <p>Simply put, React already takes care of converting JSX into something Reveal.js can work with.</p>
            <aside className="notes">
              Shhh, these are your private notes 📝
            </aside>
          </section>
          <section key="1-3">
            <p>So, if you can make a React component, you can make a Reveal.js slide.</p>
          </section>
        </section>
        <section key="2">
          <h2>Custom Themes</h2>
        </section>
        <section key="3" data-background-color="#dedede">
          <h2>The end</h2>
        </section>
      {useCustomTheme && <link rel="stylesheet" href="/custom_theme_starter.css" />}
      </RevealSlides> 
    </>
  )
}

export default App