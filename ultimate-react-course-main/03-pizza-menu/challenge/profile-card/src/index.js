import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA"
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D"
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF"
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33"
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB"
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00"
  }
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img className="avatar" src="profile-picture.jpeg" alt="profile" />
  );
}

function Intro() {
  return (
    <div className="intro">
      <h1>Christian Carbonari</h1>
      <p>
        I am a full stack web developer with a passion for
        creating user-friendly applications. I have experience using Ruby on Rails
        and I'm now learning React and Next.js.
      </p>
    </div>
  );
}

function SkillList() {

  return (
    <ul className="skill-list">
      {skills.map((skill, index) => (
        <Skill key={index} skill={skill.skill} color={skill.color} emoji={
          skill.level === "advanced" ? "💪" : skill.level === "intermediate" ? "👍" : "👶"
        } />
      ))}
    </ul>
  );
}

function Skill(props) {
  return (
    <li className="skill" style={{backgroundColor: props.color}}>
      <p>{props.skill}</p>
      <span>{props.emoji}</span>
    </li>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
