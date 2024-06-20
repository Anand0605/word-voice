import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      setResult(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setResult(null); // Clear previous results if there's an error
    }
  };

  const handleSearch = () => {
    if (inputText) {
      fetchData();
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis is not supported in this browser.');
    }
  };

  return (
    <div className='main'>
      <div className="center-div">
            <div className="search">
                <input
                   type="text"
                    placeholder="Type text...."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
               />
                <button onClick={handleSearch}>Search</button>
             </div>
             <div className="all-result">
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {result && (
            <div>
              {result.map((entry, index) => (
                <div key={index}>
                  <div className='search-result'>
                    {entry.word}
                    <button className='sound-btn' onClick={() => speakText(entry.word)}>🔊</button>
                  </div>
                  {entry.meanings.length > 0 && (
                    <div>
                      <h4>
                        {entry.meanings[0].partOfSpeech}

                      </h4>
                      <ul>
                        {entry.meanings[0].definitions.map((definition, j) => (
                          <li key={j}>
                            {definition.definition}

                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
        </div>
       
      </div>
    </div>


  );
};

export default App;
