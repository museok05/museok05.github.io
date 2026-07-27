/*
 * Edit this file to update the project carousel, detail modal, and skills loop.
 * Keep media in /assets and use relative paths such as assets/project-01.jpg.
 */
window.PORTFOLIO_DATA = {
  skills: [
    {
      name: "C",
      category: "Programming",
      icon: "assets/skills/c.svg",
    },
    {
      name: "Altium Designer",
      category: "PCB design",
      icon: "assets/skills/altium-designer.svg",
    },
    {
      name: "LTspice",
      category: "Circuit simulation",
      icon: "assets/skills/ltspice.svg",
    },
  ],
  projects: [
    {
      id: "project-01",
      title: "E-PAS DRD Rev 2.0",
      category: "PCB Design",
      year: "Add year",
      image: "assets/project-01.jpg",
      modelFile: "assets/models/E_PAS_DRD_2.0.glb",
      stepFile: "",
      alt: "Solar energy electronics prototype on a lab bench",
      summary:
        "Interactive 3D assembly preview exported from Altium Designer.",
      tags: ["Altium Designer", "PCB Design", "STEP"],
      challenge:
        "Describe the design problem, requirements, constraints, and your responsibility.",
      approach:
        "Explain the system you designed, the decisions you made, and how you tested it.",
      outcome:
        "Share the result, evidence, lessons learned, and what you would improve next.",
      projectUrl: "",
      githubUrl: "",
    },
    {
      id: "project-02",
      title: "Project Two",
      category: "Embedded Systems",
      year: "Add year",
      image: "assets/project-02.jpg",
      stepFile: "",
      alt: "Embedded electronics prototype with a sensor module",
      summary:
        "Use this entry for a course project, design team contribution, or personal build.",
      tags: ["Add technology", "Add skill"],
      challenge:
        "Describe the design problem, requirements, constraints, and your responsibility.",
      approach:
        "Explain the system you designed, the decisions you made, and how you tested it.",
      outcome:
        "Share the result, evidence, lessons learned, and what you would improve next.",
      projectUrl: "",
      githubUrl: "",
    },
    {
      id: "project-03",
      title: "Project Three",
      category: "Testing & Validation",
      year: "Add year",
      image: "assets/project-03.jpg",
      stepFile: "",
      alt: "Electronics testing setup with an oscilloscope",
      summary:
        "Add another project with a clear problem, process, technical contribution, and result.",
      tags: ["Add technology", "Add skill"],
      challenge:
        "Describe the design problem, requirements, constraints, and your responsibility.",
      approach:
        "Explain the system you designed, the decisions you made, and how you tested it.",
      outcome:
        "Share the result, evidence, lessons learned, and what you would improve next.",
      projectUrl: "",
      githubUrl: "",
    },
  ],
};
