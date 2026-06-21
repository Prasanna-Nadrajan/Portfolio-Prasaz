import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SkillNode = {
  name: string;
  description?: string;
  children?: SkillNode[];
};

const skillData: SkillNode = {
  name: "My Skills",
  children: [
    {
      name: "Data Science & AI",
      children: [
        { name: "Python", description: "Extensive experience in data analysis, machine learning models, and backend scripting. Used for everything from simple automation to complex deep learning pipelines." },
        { name: "Machine Learning", description: "Building predictive models, regression, classification, clustering, and evaluating model performance using various metrics." },
        {
          name: "Deep Learning", description: "Designing and training neural networks for complex pattern recognition tasks.", children: [
            { name: "TensorFlow", description: "Building, training, and deploying robust deep learning models for production environments." },
            { name: "Computer Vision", description: "Implementing image processing, object detection, segmentation, and facial recognition algorithms." },
          ]
        },
        { name: "Statistics", description: "Applying statistical testing, probability distributions, A/B testing, and hypothesis validation to ensure data-driven decisions." }
      ]
    },
    {
      name: "Data Analytics",
      children: [
        { name: "Data Visualization", description: "Creating compelling visual narratives from complex data to uncover hidden trends and communicate insights effectively." },
        { name: "SQL", description: "Writing complex queries, optimizing database performance, and designing efficient relational schemas." },
        { name: "Power BI", description: "Developing interactive dashboards and comprehensive business intelligence reporting solutions." }
      ]
    },
    {
      name: "Web Development",
      children: [
        { name: "Frontend Eng.", description: "Building responsive, accessible, and highly performant user interfaces with modern web technologies." },
        { name: "React", description: "Component-driven development, complex state management, and building interactive single-page applications." },
        { name: "TypeScript", description: "Leveraging type-safe JavaScript to build scalable, maintainable, and bug-free enterprise applications." }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────
//  Desktop: Interactive Expandable Tree Node
// ─────────────────────────────────────────────────────────
const TreeNode = ({
  node,
  onNodeClick,
  isRoot = false,
}: {
  node: SkillNode;
  onNodeClick: (node: SkillNode) => void;
  isRoot?: boolean;
}) => {
  const [expanded, setExpanded] = useState(isRoot);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    // If it has a description and no children, open the modal
    if (node.description && !hasChildren) {
      onNodeClick(node);
      return;
    }
    // If it has children, toggle expand/collapse
    if (hasChildren) {
      setExpanded((prev) => !prev);
      // Also open modal if it has a description
      if (node.description) {
        onNodeClick(node);
      }
    }
  };

  return (
    <div className="tree-node-wrapper">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`tree-node ${isRoot ? 'is-root' : ''} ${hasChildren ? 'has-children' : ''} ${expanded && hasChildren ? 'is-expanded' : ''}`}
        onClick={handleClick}
      >
        <span className="tree-node-text">{node.name}</span>

        {/* Info indicator for leaf nodes with description */}
        {node.description && !hasChildren && (
          <div className="tree-node-indicator">
            <span className="tree-node-indicator-text">i</span>
          </div>
        )}

        {/* Expand/collapse chevron for branch nodes */}
        {hasChildren && !isRoot && (
          <motion.div
            className="tree-node-chevron"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {hasChildren && expanded && (
          <motion.div
            className="tree-children"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Vertical line from parent to the top connecting line */}
            <div className="tree-line-v-top"></div>

            {node.children!.map((child, i) => (
              <div key={i} className="tree-child-wrapper">
                {/* Horizontal connection lines */}
                {i === 0 && node.children!.length > 1 && (
                  <div className="tree-line-h-first"></div>
                )}
                {i === node.children!.length - 1 && node.children!.length > 1 && (
                  <div className="tree-line-h-last"></div>
                )}
                {i !== 0 && i !== node.children!.length - 1 && node.children!.length > 1 && (
                  <div className="tree-line-h-mid"></div>
                )}

                {/* Vertical line down to child */}
                <div className="tree-line-v-child"></div>

                <TreeNode node={child} onNodeClick={onNodeClick} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
//  Mobile: Flat skill list with expandable categories
// ─────────────────────────────────────────────────────────
const MobileSkillItem = ({
  node,
  onNodeClick,
  depth = 0,
}: {
  node: SkillNode;
  onNodeClick: (node: SkillNode) => void;
  depth?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded((prev) => !prev);
    } else if (node.description) {
      onNodeClick(node);
    }
  };

  return (
    <div className={`mobile-skill-item depth-${depth}`}>
      <motion.button
        className={`mobile-skill-btn ${hasChildren ? 'is-branch' : 'is-leaf'} ${expanded ? 'is-expanded' : ''}`}
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
      >
        <div className="mobile-skill-label">
          <span className="mobile-skill-dot" />
          <span className="mobile-skill-name">{node.name}</span>
        </div>
        {hasChildren && (
          <motion.span
            className="mobile-skill-chevron"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown size={16} />
          </motion.span>
        )}
        {!hasChildren && node.description && (
          <span className="mobile-skill-info">i</span>
        )}
      </motion.button>

      <AnimatePresence initial={false}>
        {hasChildren && expanded && (
          <motion.div
            className="mobile-skill-children"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            {node.children!.map((child, i) => (
              <MobileSkillItem
                key={i}
                node={child}
                onNodeClick={onNodeClick}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────
interface SkillMapProps {
  scrollTriggerReady?: boolean;
}

export default function SkillMap({ scrollTriggerReady = true }: SkillMapProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  useGSAP(() => {
    if (!scrollTriggerReady || !sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.s-title .tl span', { y: 0 });
      gsap.set('.skill-map-desc', { opacity: 1, y: 0 });
      return;
    }

    const titleEl = sectionRef.current.querySelector('.s-title');
    if (titleEl) {
      const spans = titleEl.querySelectorAll('.tl span');
      gsap.to(spans, {
        y: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleEl, start: 'top 88%' },
      });
    }

    gsap.fromTo(
      '.skill-map-desc',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skill-map-desc', start: 'top 90%' },
      }
    );
  }, [scrollTriggerReady]);

  return (
    <section className="skill-map-section" id="skills" ref={sectionRef}>
      <div className="skill-map-container">
        <div className="s-header">
          <div>
            <div className="s-label">Technical Expertise</div>
            <h2 className="s-title">
              <span className="tl"><span>Skill</span></span>
            </h2>
          </div>
        </div>
        <p className="skill-map-desc" style={{ textAlign: 'left', marginBottom: '32px' }}>
          A comprehensive map of my technical expertise. Click on nodes to expand branches and explore detailed proficiencies.
        </p>

        {/* Desktop: Interactive tree */}
        <div className="skill-map-scroll skill-map-desktop">
          <div className="skill-map-tree-wrap">
            <TreeNode node={skillData} onNodeClick={setSelectedNode} isRoot={true} />
          </div>
        </div>

        {/* Mobile: Flat skill list */}
        <div className="skill-map-mobile">
          {skillData.children?.map((category, i) => (
            <MobileSkillItem
              key={i}
              node={category}
              onNodeClick={setSelectedNode}
              depth={0}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="sm-modal-backdrop"
            />
            <div className="sm-modal-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="sm-modal"
              >
                <button
                  onClick={() => setSelectedNode(null)}
                  className="sm-modal-close"
                >
                  <X size={20} />
                </button>

                <h3 className="sm-modal-title">{selectedNode.name}</h3>
                <div className="sm-modal-divider"></div>
                <p className="sm-modal-desc">
                  {selectedNode.description}
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
