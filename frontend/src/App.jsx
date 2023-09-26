import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();


  const handlesubmit = async (e)=>{
    
    e.preventDefault();
    const dataToSend = {
      name: name,
      email: email,
      message: message,
    };
  
    try {
      const response = await axios.post('http://localhost:5000', dataToSend);
      // console.log('Response from server:', response.data);
      alert(response.data)
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
  return (
    <>
      <div className="container">
      <div className="contact-container">
        <h2><span>Contact</span> Us</h2>
        <form onSubmit={handlesubmit}>
          <input
            className="animated-input"
            type="text"
            placeholder="Your Name"
           onChange={(e)=>setName(e.target.value)}
            required
          />
          <input
            className="animated-input"
            type="text"
            placeholder="Your Email"
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <textarea
            className="animated-input"
            placeholder="Your Message"
            rows="4"
            onChange={(e)=>setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="image-container">
        <img src="/image.png" />
      </div>
    </div>
    </>
  )
}

export default App
