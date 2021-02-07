import { SkillBars } from "react-skills";
import "../styles/About.css";
const About = () => {
  const skillsData = [
    {
      name: "C++",
      level: 60,
      color: "#EA526F",
    },
    {
      name: "Java",
      level: 70,
      color: "#25CED1",
    },
    {
      name: "Algorithms",
      level: 50,
      color: "#3D314A",
    },
    {
      name: "HTML5",
      level: 90,
      color: "#FE5F55",
    },
    {
      name: "CSS3",
      level: 70,
      color: "#CE84AD",
    },
    {
      name: "JavaScript",
      level: 80,
      color: "#91972A",
    },
    {
      name: "ReactJS",
      level: 90,
      color: "#15616D",
    },
    {
      name: "Redux",
      level: 80,
      color: "#3C1742",
    },
    {
      name: "NodeJS",
      level: 75,
      color: "#561643",
    },
    {
      name: "ExpressJS",
      level: 75,
      color: "#FCFC62",
    },
    {
      name: "PostgreSQL",
      level: 60,
      color: "#ECA72C",
    },
    {
      name: "MongoDB",
      level: 70,
      color: "#44355B",
    },
    {
      name: "GIT & Github",
      level: 85,
      color: "#EE5622",
    },
  ];
  return (
    <div className="about">
      <div className="container">
        <h2>About the developer</h2>
        <p>
          My name is Omar Ashraf Abouassy, 21 years old. I'm a vet student from
          cairo, Egypt.
        </p>
        <p>Developing websites and programming in general is my hobby.</p>
        <p>
          I am seeking a full stack position to make use of my skills and create
          modern full stack websites
        </p>
        <h3 className="my_skills">skills</h3>
        <SkillBars skills={skillsData} />
        <h3 className="contact_me">contact</h3>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/omarabouassy/">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.facebook.com/omarabouassy/">Facebook</a>
          </li>
          <li>
            <a href="https://twitter.com/oabuassy">Twitter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default About;
