import "./App.css";

function App() {
  return (
    <div className="container">

      <nav className="navbar">
        <h2>Abhidev</h2>
        <div>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
        </div>
      </nav>

      <header className="hero">
        <img src="https://i.imgur.com/4M34hi2.png" alt="profile" />
        <h1>Abhidev Mohan</h1>
        <p>CSE Student – SJCET Palai</p>

        <div className="buttons">
          <a href="https://github.com/" target="_blank">GitHub</a>
          <a href="#">Download Resume</a>
        </div>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I am a Computer Science student passionate about Web Development,
          React and building real-world projects.
        </p>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <div className="skills">
          <span>C</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
        </div>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <ul>
          <li>Portfolio Website</li>
          <li>Campus Ride share mobile application </li>
        </ul>
      </section>

      <footer>
        <p>Contact: abhidevmohan17@gmail.com</p>
      </footer>

    </div>
  );
}

export default App;
