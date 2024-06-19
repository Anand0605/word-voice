import React from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {

  const [inputText, setInputtext] = useState("")

  console.log(inputText)

 useEffect(() => {
    const fetchdata = async () => {

      const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/village'

      try {
        const response = await fetch(url)
        const result = await response.json();
        console.log(result)
      } catch (error) {
        console.log('error', error)
      }

    }
    fetchdata()
    // empty dependency array ensure code run after initial render
  }, [])


  return (
    <div className='main'>
      <div className="center-div">
        <input type="text" placeholder='type text....' value={inputText} onChange={(e) => { setInputtext(e.target.value) }} />
        <button>Search</button>
      </div>
      
      

    </div>
  )
}

export default App