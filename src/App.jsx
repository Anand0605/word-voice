import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [wordMeaning, setWordMeaning] = useState(null)
  const [input, setInput] = useState('')

  const getMeaning = async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
    const data = await res.json()
    console.log(data)
    setWordMeaning(data)
  }

  return (
    <>
      <div>Dictionary App</div>
      <input 
        type="text"
        placeholder='type input....'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={getMeaning}>search</button>
      {wordMeaning && wordMeaning.length > 0 && (
        <div>
          <h2>{wordMeaning[0].word}</h2>
          <p><strong>Phonetic:</strong> {wordMeaning[0].phonetic}</p>
          {wordMeaning[0].meanings.map((meaning, index) => (
            <div key={index}>
              <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
              {meaning.definitions.map((definition, defIndex) => (
                <p key={defIndex}>
                  <strong>Definition:</strong> {definition.definition}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
