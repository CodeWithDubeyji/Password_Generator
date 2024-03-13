import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(4)
  const [numInclude, setNumInclude] = useState(false)
  const [charInclude, setCharInclude] = useState(false)
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numInclude) str += "0123456789"
    if (charInclude) str += "!@#$%^&*(){}[]~`_"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
      
    }

    setPassword(pass)
  },
   [length, numInclude, charInclude, setPassword])

   useEffect(() => {
    passwordGenerator()
   }, [length, numInclude, charInclude, passwordGenerator]);

   const copyToClipboard = useCallback(() => {
    passwordRef.current?.select(password);
    passwordRef.current?.setSelectionRange(0,16);//Highlights the copied password
    window.navigator.clipboard.writeText(password)
   }, [password])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black bg-gray-600'>
      <h1 className='text-center text-lg my-4 text-white'>Password Generator</h1>
        <div className="flex shadow overflow-hidden rounded-lg mb-4">
          {/* Password Display */}
          <input type="text" value={password} className='outline-none text-md selection:bg-blue-200 w-full py-1 px-3' placeholder='Password' 
         ref={ passwordRef } readOnly />
         {/* Copy button */}
          <button className=' outline-none bg-blue-700 text-white hover:bg-blue-800 px-3 py-0.5 shrink-0' onClick={copyToClipboard}>Copy</button>
        </div>

        {/* controls */}
        <div className="flex text-white text-md gap-x-2">


          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={4}
            max={16}
            value={length}
            className=' cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
            />
            <label>Length: {length} </label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numInclude}
            className=' cursor-pointer'
            onChange={() => {setNumInclude((prev) => !prev)}}
            />
            <label>Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charInclude}
            className=' cursor-pointer'
            onChange={() => {setCharInclude((prev) => !prev)}}
            />
            <label>Characters</label>
          </div>

        </div>
    </div>
    </>
  )
}

export default App
