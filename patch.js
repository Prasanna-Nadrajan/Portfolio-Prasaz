const fs = require('fs');

let expCode = fs.readFileSync('src/components/Experience.tsx', 'utf8');

// Add skills to experiences
expCode = expCode.replace("company: 'ARQ REC',", "skills: ['SQL', 'Python', 'Tableau', 'Data Modeling'],\n    company: 'ARQ REC',");
expCode = expCode.replace("company: 'Evo Astra Ventures',", "skills: ['Machine Learning', 'AWS', 'Pipelines', 'Pandas'],\n    company: 'Evo Astra Ventures',");
expCode = expCode.replace("company: 'Indian Space Academy',", "skills: ['Computer Vision', 'PyTorch', 'GIS', 'OpenCV'],\n    company: 'Indian Space Academy',");
expCode = expCode.replace("company: 'Medium',", "skills: ['Technical Writing', 'Data Science', 'Web Dev'],\n    company: 'Medium',");

// Modify the item render
const itemRender = `{experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={\`exp-tl-item \${isLeft ? 'exp-tl-left' : 'exp-tl-right'}\`}
            >
              {/* Large Watermark Year */}
              <div className="exp-tl-watermark">
                {exp.period.substring(0, 4)}
              </div>

              {/* Extra Info on Far Edge */}
              <div className="exp-tl-extra">
                {exp.skills?.map((skill, j) => (
                  <span key={j} className="exp-tl-skill">{skill}</span>
                ))}
              </div>

              {/* Dot on the track */}
              <div className="exp-tl-dot">
                <div className="exp-tl-dot-inner" />
              </div>

              {/* Card */}
              <div className="exp-tl-card">
                <span className="exp-tl-period">{exp.period}</span>
                <h3 className="exp-tl-company">{exp.company}</h3>
                <span className="exp-tl-role">{exp.role}</span>
                <p className="exp-tl-desc">{exp.description}</p>
              </div>
            </div>
          );
        })}`;

expCode = expCode.replace(/\{experiences\.map\(\(exp, i\) => \([\s\S]*?\)\)\}/, itemRender);

fs.writeFileSync('src/components/Experience.tsx', expCode);

let cssCode = fs.readFileSync('src/index.css', 'utf8');

// Update exp-tl-left and exp-tl-right
cssCode = cssCode.replace(
`.exp-tl-left {
    justify-content: flex-end;
    margin-right: 50%;
    padding-right: 48px;
    padding-left: 0;
    text-align: right;
}`,
`.exp-tl-left {
    justify-content: space-between;
    margin-right: 50%;
    padding-right: 48px;
    padding-left: 0;
    text-align: right;
}`);

cssCode = cssCode.replace(
`.exp-tl-right {
    justify-content: flex-start;
    margin-left: 50%;
    padding-left: 48px;
    padding-right: 0;
    text-align: left;
}`,
`.exp-tl-right {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-left: 50%;
    padding-left: 48px;
    padding-right: 0;
    text-align: left;
}`);

// Add styles for new elements
const extraCSS = \`
/* Watermark Year */
.exp-tl-watermark {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Syne', sans-serif;
    font-size: clamp(100px, 16vw, 300px);
    font-weight: 800;
    color: var(--muted);
    opacity: 0.04;
    z-index: 0;
    pointer-events: none;
    user-select: none;
    line-height: 1;
}

[data-theme="light"] .exp-tl-watermark {
    opacity: 0.08;
}

.exp-tl-left .exp-tl-watermark {
    left: 20px;
}

.exp-tl-right .exp-tl-watermark {
    right: 20px;
}

/* Extra Info / Skills */
.exp-tl-extra {
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 2;
    padding: 20px 0;
    opacity: 0; /* Animated with GSAP */
    transform: translateY(20px);
}

.exp-tl-left .exp-tl-extra {
    align-items: flex-start;
}

.exp-tl-right .exp-tl-extra {
    align-items: flex-end;
}

.exp-tl-skill {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 8px 16px;
    border-radius: 100px;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    background: var(--bg);
}

.exp-tl-item:hover .exp-tl-skill {
    border-color: var(--border-hover);
    color: var(--fg);
    transform: translateX(4px);
}

.exp-tl-right:hover .exp-tl-skill {
    transform: translateX(-4px);
}

@media (max-width: 900px) {
    .exp-tl-watermark {
        right: 10px !important;
        left: auto !important;
        font-size: clamp(80px, 20vw, 150px);
        opacity: 0.03;
    }
    
    .exp-tl-extra {
        display: none !important;
    }
    
    .exp-tl-right {
        flex-direction: row;
    }
}
\`;

cssCode = cssCode.replace('/* ---- Responsive: collapse to single column ---- */', extraCSS + '\\n/* ---- Responsive: collapse to single column ---- */');

fs.writeFileSync('src/index.css', cssCode);

console.log("Patched!");
