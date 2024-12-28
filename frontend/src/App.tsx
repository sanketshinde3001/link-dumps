import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [data, setdata] = useState("");

  async function fetchinfo() {
    const response= await axios.get('http://localhost:3000')
    setdata(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchinfo();
  }, []);

  return (
    <>
      <div>{data}</div>
    </>
  )
}

export default App
