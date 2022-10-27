import '../components/index.css';

import { useState } from 'react';

import facebook from '../assets/images/facebook.png';
import instagram from '../assets/images/instagram.png';
import linkedin from '../assets/images/linkedin.png';
import pinterest from '../assets/images/pinterest.png';
import telegram from '../assets/images/telegram.png';
import tikTok from '../assets/images/tikTok.png';
import twitter from '../assets/images/twitter.png';
import whatsapp from '../assets/images/whatsapp.png';
import youtube from '../assets/images/youtube.png';

const obj = [
  { id: 1, src: facebook, alt: "facebook" },
  { id: 2, src: instagram, alt: "instagram" },
  { id: 3, src: linkedin, alt: "linkedin" },
  { id: 4, src: pinterest, alt: "pinterest" },
  { id: 5, src: telegram, alt: "telegram" },
  { id: 6, src: tikTok, alt: "tikTok" },
  { id: 7, src: twitter, alt: "twitter" },
  { id: 8, src: whatsapp, alt: "whatsapp" },
  { id: 9, src: youtube, alt: "youtube" },
]

function Cards() {
  const [state, setState] = useState([...obj])
  const [ids, setIds] = useState([])
  const [isShown, setIsShown] = useState(false);
  const [results, setResults] = useState([])
  const [element, setElement] = useState("")
  const [showResult, setShowResult] = useState(false);
  const [process, setProcess] = useState({
    start: new Date(),
  })

  function randomSpreed(e) {
    if (e.target.className === "img-class") {
      const id = +e.target.id
      if (ids.some(elem => elem === id)) {
        setIds([])
        alert("GAME OVER")
        setResults([
          ...results,
          {
            ...process,
            id: `ID-${Math.random().toFixed(16).split('.')[1]}`,
            end: new Date(),
            time: new Date() - process.start,
            steps: ids,
            result: "Lose"
          }])
      } else {
        setIds([...ids, id])
        setState([...state.sort(() => 0.5 - Math.random())])
        if (ids.length === 8) {
          setTimeout(() => {
            alert("Win")
            setResults([
              ...results,
              {
                ...process,
                id: `ID-${Math.random().toFixed(16).split('.')[1]}`,
                end: new Date(),
                time: new Date() - process.start,
                steps: ids,
                result: "Win"
              }])
          }, 0);
        }
      }
    }
  }

  function handleClick() {
    setIsShown(!isShown)
  }

  const handleMouseOver = (e) => {
    if (e.target.className === 'result-score')
      setElement(e.target.innerText)
    setShowResult(true);
  };

  const handleMouseOut = () => {
    setShowResult(false);
  };

  return (
    <>
      <h1 className='score'>Score :{ids.length}</h1>
      <button className='historyBtn' onClick={handleClick}>History</button>
      <h3 className='rule'>Each must be chosen only once</h3>
      <div className="box" onClick={randomSpreed}>
        {state.map(photo =>
          <img src={photo.src}
            key={photo.id}
            id={photo.id}
            alt={photo.alt}
            className="img-class" />)}
      </div>
      {isShown && (
        <div className="table-wrapper">
          <table className='history-result'>
            <thead className='head'>
              <tr>
                <th className='title'>ID</th>
                <th className='title'>Start</th>
                <th className='title'>End</th>
                <th className='title'>Time</th>
                <th className='title'>Steps</th>
                <th className='title'>Results</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {results.length ? results.map(elem =>
                <tr key={elem.id}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}>
                  <td className='result-score'>{elem.id}</td>
                  <td className='result-score'>{elem.start + ""}</td>
                  <td className='result-score'>{elem.end + ""}</td>
                  <td className='result-score'>{elem.time + ""}</td>
                  <td className='result-score'>{elem.steps}</td>
                  <td className='result-score'>{elem.result}</td>
                </tr>
              ) : <tr>
                <td className='result-score'></td>
                <td className='result-score'></td>
                <td className='result-score'></td>
                <td className='result-score'></td>
                <td className='result-score'></td>
                <td className='result-score'></td>
              </tr>}
            </tbody>
          </table>
        </div>
      )}
      {showResult && <div className='showResult'>
        <span className='res-elem' >{element}</span>
      </div>
      }
    </>
  )
}

export default Cards



