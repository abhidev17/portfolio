import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
   <motion.div
  className="container"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

      <nav className="navbar">
        <motion.h2 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Abhidev
        </motion.h2>
        <div className="nav-links">
          <motion.a 
            href="#about"
            whileHover={{ color: "#0ea5e9", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            About
          </motion.a>
          <motion.a 
            href="#skills"
            whileHover={{ color: "#0ea5e9", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Skills
          </motion.a>
          <motion.a 
            href="#projects"
            whileHover={{ color: "#0ea5e9", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Projects
          </motion.a>
        </div>
      </nav>

      <header className="hero">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="./me.jpeg"
            alt="Profile"
            className="profile-img"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Abhidev Mohan
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          CSE Student – SJCET Palai
        </motion.p>

        <motion.div className="buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/abhidev17"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>→</span> GitHub
          </motion.a>

          <motion.a 
            href="./resume.pdf"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(14, 165, 233, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>⬇</span> Download Resume
          </motion.a>
        </motion.div>
      </header>

      <motion.section 
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>About Me</h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          I am a Computer Science student learning React and Web Development,
          passionate about building real-world projects and creating beautiful user experiences.
        </motion.p>
      </motion.section>

      <motion.section 
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Skills</h2>
        <motion.div 
          className="skills"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {["C", "HTML", "CSS", "JavaScript", "React"].map((skill) => (
            <motion.span
              key={skill}
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

   <motion.section 
     id="projects"
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
   >
  <h2>Projects</h2>

  <motion.div 
    className="projects"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >

    <motion.div 
      className="project-card"
      variants={itemVariants}
      whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(56, 189, 248, 0.3)" }}
    >
      <h3>Portfolio Website</h3>
      <p>Personal React portfolio with resume download and GitHub Pages deployment.</p>
      <motion.a 
        href="https://github.com/abhidev17/portfolio" 
        target="_blank" 
        rel="noreferrer"
        whileHover={{ x: 5 }}
      >
        View Code →
      </motion.a>
    </motion.div>

    <motion.div 
      className="project-card"
      variants={itemVariants}
      whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(56, 189, 248, 0.3)" }}
    >
      <h3>Campus Rideshare App</h3>
      <p>Mobile application for students to share rides inside campus.</p>
     <motion.a
  href="https://github.com/abhidev17/OOPs_Project"
  target="_blank"
  rel="noreferrer"
  whileHover={{ x: 5 }}
>
  View Code →
</motion.a>

    </motion.div>

  </motion.div>
</motion.section>



      <footer>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact: <a href="mailto:abhidevmohan17@gmail.com">abhidevmohan17@gmail.com</a>
        </motion.p>
      </footer>

      {showScroll && (
        <motion.button 
          className="scroll-to-top"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
      )}
    </motion.div>
  );
}

export default App;
