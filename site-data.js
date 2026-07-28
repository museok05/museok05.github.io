/*
 * Edit this file to update the project carousel, detail modal, and skills loop.
 * Keep media in /assets. Each project has one carousel cover and a separate
 * gallery containing any number of detail images.
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
      title: "Driver Dashboard",
      category: "PCB/Electronics Design",
      year: "2025-2026",
      coverImage: "assets/Dashboard_PCB.png",
      coverAlt: "Driver Dashboard prototype integrated with its steering controls",
      gallery: [ {
          src: "assets/Dashboard_PCB.png",
          alt: "Fully assembled Driver Dashboard PCB with Display powered on",
          caption: "Driver Dashboard PCB",
        },
        {
          src: "assets/Dashboard_Integration.png",
          alt: "Driver Dashboard prototype integrated with its steering controls",
          caption: "Driver Dashboard integration test",
        },

        {
          src: "assets/dashboard_front.jpg",
          alt: "Close up view of Dashboard Front",
          caption: "Close up view of Dashboard Front with Rework completed",
        },
        {
          src: "assets/dashboard_back.jpg",
          alt: "Fully assembled Driver Dashboard PCB back view",
          caption: "Rear view of Driver Dashboard",
        },
      ],
      modelFile: "assets/models/E_PAS_DRD_2.0.glb",
      stepFile: "",
      summary:
          "The Driver Dashboard PCB was designed for UBC Solar’s race car as the primary interface between the driver and the vehicle’s low-voltage electrical system.\n\nUnlike most other boards in the car, the Driver Dashboard directly interacts with the driver through physical switches, LEDs, and an LCD display. It allows the driver to control important vehicle functions, including drive states, motor power modes, lighting systems, and audio features. It also displays real-time information such as vehicle speed, active drive state, selected power mode, battery-pack status, and system faults.\n\nWithin the vehicle architecture, the Driver Dashboard acts as the central driver-interface and control board for the low-voltage system. It exchanges CAN messages with the battery management system, motor-control electronics, telemetry system, solar-array electronics, and other vehicle PCBs. These messages allow the dashboard to receive diagnostic information, communicate driver commands, identify faults, and provide the pit crew with real-time vehicle data during competition.",
      tags: ["Altium Designer", "PCB Design", "UBC Solar Car"],
      challenge:
  "One of the main challenges was integrating several electrical and driver-facing functions onto a compact PCB while maintaining reliability in a demanding vehicle environment.\n\nThe PCB was required to fit within a maximum area of 150 mm × 100 mm so that it could be securely mounted without obstructing the driver’s view or interfering with the steering column and surrounding mechanical structures. The limited board area also created placement and routing constraints for the microcontroller, communication interfaces, power circuitry, connectors, switches, LEDs, and LCD.\n\nThe board also needed to operate reliably inside a hot and electrically noisy race-car environment. This required careful consideration of power regulation, signal integrity, electromagnetic interference, electrical protection, thermal performance, and access for programming and debugging.\n\nBecause the Driver Dashboard interfaces with several vehicle subsystems, its requirements depended on input from the firmware, mechanical, vehicle dynamics, structures, and driver teams. Balancing these requirements while maintaining the project schedule was a significant system-integration challenge.",
      approach:
  "The board was designed around an STM32F103 microcontroller, which provides the processing platform for vehicle-state control, driver-input handling, fault management, and communication with other vehicle systems.\n\nAn SPI-driven LCD was included to display detailed vehicle information, while LEDs provide immediate visual indication of important states and faults. Physical switches allow the driver to select drive states, motor power modes, and other vehicle functions.\n\nCAN communication was implemented to exchange commands and diagnostic information with the battery management system, motor-control electronics, telemetry system, solar-array electronics, and other low-voltage PCBs.\n\nThe board also includes audio and analog circuitry along with several power-regulation stages. DC-DC converters and LDO regulators generate the required voltage rails from the vehicle’s 12 V low-voltage supply while balancing conversion efficiency and noise performance.\n\nProtection circuitry was added to improve system reliability, including ESD protection, reverse-polarity protection, input and output fusing, MOSFET-based switching, and signal-conditioning circuitry.\n\nSeveral physical mock-up and integration tests were conducted with the vehicle dynamics and structures teams to confirm the PCB dimensions, mounting position, connector access, driver visibility, and clearance from the steering column.\n\nAlthough I did not develop the production firmware, I worked with the firmware team to define the required switches, indicators, communication interfaces, pin assignments, and debugging access. The board includes a dedicated SWD connector for programming and debugging the STM32 using a J-Link or ST-Link.\n\nAltium Designer was used throughout the project, from component selection and schematic capture to PCB layout and design review. The layout required careful placement and routing of power circuitry, CAN differential pairs, analog and audio signals, microcontroller interfaces, and driver-facing components within the constrained board dimensions.",
      outcome:
  "The completed design provided UBC Solar with a compact, vehicle-ready Driver Dashboard PCB that centralizes driver controls, status displays, fault information, and communication with the race car’s low-voltage systems.\n\nThe project required balancing electrical performance, driver usability, mechanical constraints, safety, reliability, and requirements from several engineering subteams. Through the design process, I gained experience taking a PCB from initial system requirements through schematic design, PCB layout, integration planning, and preparation for vehicle testing.\n\nThe project also strengthened my understanding of mixed-signal PCB design, microcontroller integration, CAN-based vehicle architectures, power regulation, protection circuitry, and cross-functional engineering collaboration.\n\nA separate project blog post provides a deeper breakdown of the design decisions, integration challenges, bring-up process, debugging issues, and lessons learned throughout the project.",
      projectUrl: "",
      githubUrl: "",
      blogUrl: "posts/dashboard-blog.html",
    },
    {
      id: "project-02",
      title: "Project Two",
      category: "Embedded Systems",
      year: "Add year",
      coverImage: "assets/project-02.jpg",
      coverAlt: "Embedded electronics prototype with a sensor module",
      gallery: [
        {
          src: "assets/project-02.jpg",
          alt: "Embedded electronics prototype with a sensor module",
          caption: "",
        },
      ],
      stepFile: "",
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
      coverImage: "assets/project-03.jpg",
      coverAlt: "Electronics testing setup with an oscilloscope",
      gallery: [
        {
          src: "assets/project-03.jpg",
          alt: "Electronics testing setup with an oscilloscope",
          caption: "",
        },
      ],
      stepFile: "",
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
