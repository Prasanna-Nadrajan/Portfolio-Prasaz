

const skills = [
  "Python",
  "Machine Learning",
  "Data Visualization",
  "React",
  "TensorFlow",
  "Computer Vision",
  "SQL",
  "Power BI",
  "Statistics",
  "TypeScript",
  "Deep Learning",
  "Frontend Engineering"
];

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {skills.map((skill, index) => (
          <span key={index} className="mq-item">{skill}</span>
        ))}
        {/* Duplicate for seamless infinite scrolling */}
        {skills.map((skill, index) => (
          <span key={`dup-${index}`} className="mq-item">{skill}</span>
        ))}
      </div>
    </div>
  );
}
