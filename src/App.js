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
        <img
        
      src="./me.jpeg"


          alt="Profile"
        />

        <h1>Abhidev Mohan</h1>
        <p>CSE Student – SJCET Palai</p>

        <div className="buttons">
          <a
            href="https://github.com/abhidev17"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

        <a href="./resume.pdf"

>

  Download Resume
</a>

        </div>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I am a Computer Science student learning React and Web Development,
          passionate about building real-world projects.
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
          <li>KTU Exam Management System</li>
        </ul>
      </section>

      <footer>
        <p>Contact: abhidevmohan17@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
