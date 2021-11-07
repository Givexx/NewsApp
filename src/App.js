import React, {useState, useEffect} from 'react';
import notImg from './notImg.png';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const api = {
      key : '1SqnAuQEhsRH4xDsTKAAMscAZSAdS28bX1fcC0xKLQPXRkRT'
    }

    fetch(`https://api.currentsapi.services/v1/search?keywords=Amazon&language=en&apiKey=${api.key}`)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='loading'>Loading...</div>;
  } else {
    return (
      <div className='container'>
      <div className='header'>Below there is a list of carefully picked links to news sources around the world. You will be able to catch up with what is happening on this planet straightaway.</div>
      <div className='allItems'>{items.news.map(item => {
       return (
       <div className='item' key={item.id}>
         <div className='div1'>
         <div className='title'>{item.title}</div>
         <div className='info'>{item.description}</div>
         </div>
         <div className='div2'>
         <a href={item.url} target="_blank" className='readMore'>Read More - მეტის ნახვა</a>
         {item.image === 'None'? <img className='img' src={notImg} alt='img'/> : <img className='img' src={item.image} alt='img'/>}
         <div className='author'>&#9201; {item.published.slice(0, 10)} &#8644; &#128102; {item.author.slice(0,17)}</div>
         </div>
       </div>
       )
      })}</div>
      <div className='me'>Developed By Givi Abuladze</div>
      </div>
    );
  }
}

export default App;


