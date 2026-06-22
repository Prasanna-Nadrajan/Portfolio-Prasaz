import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  scrollTriggerReady: boolean;
}

export default function Work({ scrollTriggerReady }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!scrollTriggerReady) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.pcard:not([hidden])', { opacity: 1, y: 0 });
      return;
    }

    gsap.set('.pcard:not([hidden])', { opacity: 0, y: 40 });

    const el = sectionRef.current?.querySelector('.s-title');
    if (el) {
      const spans = el.querySelectorAll('.tl span');
      gsap.to(spans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    }

    gsap.utils.toArray('.pcard:not([hidden])').forEach((card: any, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });

    ScrollTrigger.refresh();
  }, [scrollTriggerReady]);

  return (
    <section id="work" ref={sectionRef}>
      <div className="s-header">
        <div>
          <p className="s-label">Selected Projects</p>
          <h2 className="s-title">
            <span className="tl"><span>Work</span></span>
          </h2>
        </div>
      </div>

      <div className="projects">

        {/* Project 1 */}
        <a href="https://github.com/Prasanna-Nadrajan/Sentinal-AI" target="_blank" rel="noreferrer" className="pcard p-caixabank">
          <div className="pcard-inner">
            <div className="pcard-info">
              <div className="pcard-top" style={{ justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pnum">01</span>
                  <div className="tags">
                    <span className="tag">Machine Learning</span>
                    <span className="tag">Healthcare</span>
                  </div>
                </div>
                <div className="p-img-wrapper" style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/assets/images/portfolio/sepsis.png" alt="48-Hour Sepsis Forecasting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="p-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <div className="pcard-mid">
                <p className="pcompany">Python / TensorFlow</p>
                <h3 className="pname">48-Hour Sepsis Forecasting</h3>
                <p className="pyear">Early detection model using clinical data</p>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>
                An advanced predictive model utilizing machine learning to forecast sepsis onset in clinical environments. Built with Python, it analyzes real-time patient data to provide early warnings, significantly improving patient outcomes and reducing hospital mortality rates through timely intervention.
              </p>
              <div className="pmetrics">
                <div className="pmetric">
                  <span className="pm-val">48h</span>
                  <span className="pm-label">Early Detection Window</span>
                </div>
                <div className="pmetric">
                  <span className="pm-val">High</span>
                  <span className="pm-label">Predictive Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Project 2 */}
        <a href="https://github.com/Prasanna-Nadrajan/AI-Driven-Land-Use-and-Land-Cover-Classification-" target="_blank" rel="noreferrer" className="pcard p-gymondo1">
          <div className="pcard-inner">
            <div className="pcard-info">
              <div className="pcard-top" style={{ justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pnum">02</span>
                  <div className="tags">
                    <span className="tag">Ensemble Learning</span>
                    <span className="tag">Computer Vision</span>
                  </div>
                </div>
                <div className="p-img-wrapper" style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/assets/images/portfolio/LULC_classification.png" alt="LULC Classification" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="p-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <div className="pcard-mid">
                <p className="pcompany">Python / Scikit-learn</p>
                <h3 className="pname">LULC Classification</h3>
                <p className="pyear">Satellite imagery analysis</p>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>
                A comprehensive machine learning pipeline designed to classify Land Use and Land Cover from complex satellite imagery. Leveraging ensemble methods like Random Forests and Gradient Boosting, it achieves high accuracy in environmental monitoring and urban planning applications.
              </p>
              <div className="pmetrics">
                <div className="pmetric">
                  <span className="pm-val">Multi</span>
                  <span className="pm-label">Class Classifications</span>
                </div>
                <div className="pmetric">
                  <span className="pm-val">High</span>
                  <span className="pm-label">Model Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Project 3 */}
        <a href="https://github.com/Prasanna-Nadrajan/Ambulance_detecting_traffic_system" target="_blank" rel="noreferrer" className="pcard p-zattoo">
          <div className="pcard-inner">
            <div className="pcard-info">
              <div className="pcard-top" style={{ justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pnum">03</span>
                  <div className="tags">
                    <span className="tag">Computer Vision</span>
                    <span className="tag">Real-time</span>
                  </div>
                </div>
                <div className="p-img-wrapper" style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/assets/images/portfolio/Ambulance_detection.png" alt="Signal Sync" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="p-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <div className="pcard-mid">
                <p className="pcompany">OpenCV / YOLO</p>
                <h3 className="pname">Signal Sync</h3>
                <p className="pyear">Ambulance detecting traffic system</p>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>
                An innovative real-time computer vision system using OpenCV and YOLO to detect emergency vehicles in traffic. It automatically interfaces with traffic control systems to dynamically clear pathways for ambulances, significantly reducing critical response times during emergencies.
              </p>
              <div className="pmetrics">
                <div className="pmetric">
                  <span className="pm-val">Live</span>
                  <span className="pm-label">Real-time Detection</span>
                </div>
                <div className="pmetric">
                  <span className="pm-val">Auto</span>
                  <span className="pm-label">Traffic Light Control</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Project 4 */}
        <a href="https://github.com/Prasanna-Nadrajan/AI-powered-code-review-for-ML-pipelines" target="_blank" rel="noreferrer" className="pcard p-nt-quests">
          <div className="pcard-inner">
            <div className="pcard-info">
              <div className="pcard-top" style={{ justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pnum">04</span>
                  <div className="tags">
                    <span className="tag">Machine Learning</span>
                    <span className="tag">CI/CD</span>
                  </div>
                </div>
                <div className="p-img-wrapper" style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/assets/images/portfolio/ai-powered-code-reviewer-for-ml-pipelines.png" alt="Code Sage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="p-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <div className="pcard-mid">
                <p className="pcompany">Python / AST</p>
                <h3 className="pname">Code Sage</h3>
                <p className="pyear">Code Reviewer for ML-Pipelines</p>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>
                An intelligent, AI-powered code review assistant tailored specifically for Machine Learning pipelines. It automatically parses Python ASTs within CI/CD workflows to enforce best practices, catch potential bugs, and ensure robust model deployment with minimal human oversight.
              </p>
              <div className="pmetrics">
                <div className="pmetric">
                  <span className="pm-val">100%</span>
                  <span className="pm-label">Automated Review</span>
                </div>
                <div className="pmetric">
                  <span className="pm-val">Fast</span>
                  <span className="pm-label">Pipeline Integration</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Project 5 */}
        <a href="https://github.com/Prasanna-Nadrajan/Loan-Eligibility-Detector" target="_blank" rel="noreferrer" className="pcard p-nt-onboarding">
          <div className="pcard-inner">
            <div className="pcard-info">
              <div className="pcard-top" style={{ justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pnum">05</span>
                  <div className="tags">
                    <span className="tag">Data Science</span>
                    <span className="tag">Finance</span>
                  </div>
                </div>
                <div className="p-img-wrapper" style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/assets/images/portfolio/loan_eligibilty.png" alt="Credit Sense" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="p-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <div className="pcard-mid">
                <p className="pcompany">Python / Streamlit</p>
                <h3 className="pname">Credit Sense</h3>
                <p className="pyear">Loan Eligibility Predictor</p>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>
                A robust financial analytics platform that predicts credit default probabilities using advanced statistical modeling. By processing large-scale transaction histories and demographic data, it empowers financial institutions to make data-driven lending decisions and minimize risk exposure.
              </p>
              <div className="pmetrics">
                <div className="pmetric">
                  <span className="pm-val">Live</span>
                  <span className="pm-label">Interactive App</span>
                </div>
                <div className="pmetric">
                  <span className="pm-val">High</span>
                  <span className="pm-label">Prediction Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Project 6 */}
        <a href="https://github.com/Prasanna-Nadrajan/eDNA-VAI-Pipeline" target="_blank" rel="noreferrer" className="pcard p-gymondo2">
          <div className="pcard-inner">
            <div className="pcard-info">
              <div className="pcard-top" style={{ justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pnum">06</span>
                  <div className="tags">
                    <span className="tag">Deep Learning</span>
                    <span className="tag">Bioinformatics</span>
                  </div>
                </div>
                <div className="p-img-wrapper" style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/assets/images/portfolio/eDNA_Pipeline.png" alt="eDNA Lab" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="p-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <div className="pcard-mid">
                <p className="pcompany">Python / VAE</p>
                <h3 className="pname">eDNA Lab</h3>
                <p className="pyear">eDNA Analyser using unsupervised learning</p>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>
                A bioinformatics tool designed to analyze environmental DNA samples for biodiversity monitoring. It streamlines the processing of complex genomic sequences using Variational Autoencoders, enabling researchers to accurately identify species presence in ecosystems and track conservation metrics efficiently.
              </p>
              <div className="pmetrics">
                <div className="pmetric">
                  <span className="pm-val">Auto</span>
                  <span className="pm-label">Clustering</span>
                </div>
                <div className="pmetric">
                  <span className="pm-val">Deep</span>
                  <span className="pm-label">Biodiversity Assesment</span>
                </div>
              </div>
            </div>
          </div>
        </a>

      </div>

      <div className="pdf-strip" style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>Looking for more?</p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>View all my technical projects on GitHub.</p>
        </div>
        <a href="https://github.com/Prasanna-Nadrajan" target="_blank" rel="noopener" className="cv-btn">
          View GitHub
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12L12 2M12 2H4M12 2V10"></path>
          </svg>
        </a>
      </div>

    </section>
  );
}
