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
      previewImage: "assets/project-02.jpg",
      previewAlt: "Embedded firmware project preview",
      gallery: [
        {
          src: "assets/project-02.jpg",
          alt: "Embedded electronics prototype with a sensor module",
          caption: "",
        },
      ],
      modelFile: "",
      stepFile: "",
      summary:
  "The Hardware Bring-Up and Validation Firmware was developed for UBC Solar as a reusable testing platform for PCBs built around the STM32F103 microcontroller.\n\nThe project was my first major introduction to embedded firmware development in C and was created to improve the handoff between the hardware and firmware subteams. Before a newly assembled board was passed to the firmware team, the validation program could be flashed onto the STM32 to verify basic microcontroller connectivity, detect unexpected GPIO behaviour, and confirm CAN communication.\n\nThe project addressed a recurring problem within the team: when a board failed during integration, it was often unclear whether the cause was a hardware issue, such as a soldering defect, missing power rail, or incorrect circuit connection, or a firmware issue, such as an incorrect peripheral configuration or communication address. The objective was to automate as much of the bring-up process as possible while minimizing the amount of manual testing required from the user.",
      tags: ["Add technology", "Add skill"],
      challenge:
  "The primary challenge was developing a general-purpose test program that could be reused across several UBC Solar boards despite differences in their pin assignments, external circuitry, and communication interfaces.\n\nThe firmware needed to detect possible shorts and unexpected connections between MCU pins, identify pins that were not behaving as expected, transmit and receive CAN messages, configure CAN filters and receive mailboxes correctly, and minimize manual interaction during board bring-up.\n\nBecause this was my first firmware project, my original implementation placed most of the testing logic inside one large loop. Although the program functioned, it quickly became difficult to read, debug, and modify. Even small changes required searching through a long sequence of tightly coupled logic.\n\nAnother challenge was that the firmware could not evaluate the microcontroller pins in isolation. External pull-up and pull-down resistors, peripheral circuits, voltage dividers, and power rails all affected the values measured by the STM32. This meant that a result appearing to indicate a fault could instead be caused by the intended hardware connected to that pin.\n\nCAN debugging created a similar issue. For much of the project, I assumed the problem was related to CAN initialization, filtering, or mailbox configuration because no messages were visible in PCAN-View. The actual cause was that the board's 5 V rail, which powered the CAN transceiver, had not been connected. A power indicator LED still illuminated while the board was powered from 3.3 V, making the missing supply less obvious.",
      approach:
  "I began by restructuring the firmware into smaller functions and test stages rather than keeping all of the logic inside one continuous loop. Separating initialization, GPIO testing, CAN configuration, message transmission, and result reporting made the program easier to understand and allowed individual tests to be modified without affecting the entire application.\n\nThe GPIO validation test worked by configuring selected MCU pins with internal pull-up or pull-down resistors and then reading the states of nearby or associated pins. If another pin changed to an unexpected logic level, the firmware could identify a possible short or incorrect connection.\n\nTesting revealed that this approach could also produce false results. On one previously validated steering-wheel PCB, a pin consistently read logic high even though the test expected a low state. Investigation showed that the internal pull resistor was interacting with an external resistor already present on the board, creating a voltage divider. The resulting voltage was approximately 2.8 V, which the STM32 interpreted as a digital high.\n\nBecause every board could contain different external circuitry, I documented which pins required special handling or needed to be excluded from the automated test. A future implementation could store these board-specific rules in configuration files or pin-definition tables rather than relying on manual documentation.\n\nFor CAN validation, I configured the STM32 to transmit diagnostic messages and receive selected CAN identifiers using appropriate filters and receive mailboxes. PCAN-View was used to observe the bus traffic and confirm that messages were being transmitted and received correctly.\n\nThe CAN debugging process reinforced the importance of verifying hardware conditions before assuming a firmware defect. After confirming and connecting the missing 5 V supply, the CAN transceiver became operational and the expected messages appeared. This experience changed my debugging process: I now verify power rails, transceiver enables, physical connections, and signal levels before spending significant time modifying communication code.\n\nThe project also introduced me to Git and collaborative version control. I learned how to clone the team repository, create branches, write meaningful commit messages, keep my local work synchronized with the main codebase, and submit firmware that followed the team's existing project structure and standards.",
      outcome:
  "The completed firmware gave UBC Solar a repeatable method for evaluating newly assembled STM32-based boards before they were transferred from the hardware team to the firmware team.\n\nBy identifying basic GPIO connectivity problems and confirming CAN communication earlier in the bring-up process, the tool reduced unnecessary back-and-forth between the two subteams by approximately 30%. It also helped distinguish hardware faults from firmware configuration problems before full vehicle integration began.\n\nThe project remains in use at UBC Solar as part of the team's board bring-up and validation process. Although some board-specific conditions can still produce false readings, the firmware provides a common starting point for evaluating assembly quality and communication functionality.\n\nFuture revisions could improve the system by replacing manual pin exceptions with board-specific configuration tables, improving fault reporting, and expanding validation to external daughterboards and peripherals communicating through UART, I2C, and SPI.\n\nMost importantly, the project changed how I understood embedded firmware. I initially viewed firmware and hardware design as separate disciplines. Through this project, I learned that embedded code directly controls and observes physical hardware states, and that effective debugging requires understanding the complete path from software configuration and MCU registers to power rails, external components, transceivers, and PCB assembly.",
      projectUrl: "https://github.com/museok05/Hardware_Validation",
      githubUrl: "",
    },
    {
      id: "project-03",
      title: "Project Three",
      category: "Testing & Validation",
      year: "Add year",
      coverImage: "assets/project-03.jpg",
      coverAlt: "Electronics testing setup with an oscilloscope",
      previewImage: "assets/project-03.jpg",
      previewAlt: "Electronics testing and validation project preview",
      gallery: [
        {
          src: "assets/project-03.jpg",
          alt: "Electronics testing setup with an oscilloscope",
          caption: "",
        },
      ],
      modelFile: "",
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
