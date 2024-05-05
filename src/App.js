import React, { useState } from 'react';
import profile from './profile.jpeg'; // Update the image file name and path if needed

function App() {
  // Portfolio State
  // You can set up your portfolio state here if needed

  // Newsletter Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    interest1: false,
    interest2: false,
    interest3: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setInterests({
      ...interests,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Portfolio Elements */}
      <h1>Hi, I'm Lang'at Joel</h1>
      <img src={profile} alt="My profile pic" />
      <h2>About Me</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <a href="https://github.com/yourgithubusername" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/yourlinkedinusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>

      {/* Newsletter Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Areas of Interest:</label>
          <div>
            <input type="checkbox" id="interest1" name="interest1" checked={interests.interest1} onChange={handleCheckboxChange} />
            <label htmlFor="interest1">Interest 1</label>
          </div>
          <div>
            <input type="checkbox" id="interest2" name="interest2" checked={interests.interest2} onChange={handleCheckboxChange} />
            <label htmlFor="interest2">Interest 2</label>
          </div>
          <div>
            <input type="checkbox" id="interest3" name="interest3" checked={interests.interest3} onChange={handleCheckboxChange} />
            <label htmlFor="interest3">Interest 3</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Submitted Message */}
      {submitted && (
        <p>Thank you for signing up, {name}! Your interests: {Object.keys(interests).filter(key => interests[key]).join(', ')}</p>
      )}
    </div>
  );
}

export default App;
