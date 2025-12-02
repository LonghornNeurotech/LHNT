// Unique module intro content for each onboarding module overview page (X_0).
//
// Each entry provides the following fields:
// concepts: a string OR an array of strings (each string is a paragraph)
// applications: a string OR an array of strings (each string is a paragraph)
//
// Key format: `${blockKey}:${moduleNumber}` (moduleNumber is "1", "2", "3", ...)

export const MODULE_INTRO_CONTENT = {
  // -------------------------
  // SOFTWARE BLOCK 1 (General Skills)
  // -------------------------
  "softwareB1:1": {
    concepts:
      "In this module, you’ll get comfortable thinking like a builder in Python: writing clean code, working with arrays, and handling time-based data. The goal is to make data feel “touchable”: you can load it, reshape it, visualize it, and confidently debug what’s happening at each step.",
    applications:
      "The Signals team uses Python to catching noisy or broken data early. The ML Development team uses Python to build quick baselines for the EMG Gesture Recognition project, so the team can measure progress week to week.",
  },
  "softwareB1:2": {
    concepts:
      "In this module, you’ll learn the “common sense math” behind decision‑making with data: how to summarize messy measurements, reason about uncertainty, and tell the difference between a real improvement and random variation. It’s the toolkit that keeps you from over‑trusting a single plot or one good run.",
    applications:
      "The Signals team uses statistics to quantify whether preprocessing actually reduces noise. The ML Development team uses statistics to compare models fairly, so we don’t ship a model that looks good by accident but fails on new data.",
  },

  // -------------------------
  // SOFTWARE BLOCK 2 (Virtual Reality)
  // -------------------------
  "softwareB2:1": {
    concepts:
      "In this module, you’ll learn the fundamentals of C++ as a “performance language”: how programs are structured, how to reason about speed and memory, and how to write code that behaves predictably. Even if you don’t live in C++, this mindset helps you build systems that feel responsive and stable.",
    applications:
      "In practice, these skills matter when building real-time demos and simulators. The ML Development team’s Lunar Lander Toy research and the Signals team’s analysis tooling both benefit from a performance mindset where you keep data moving smoothly and avoid slow, fragile code paths during live tests.",
  },
  "softwareB2:2": {
    concepts:
      "In this module, you’ll learn how interactive applications for project demos are built: screens, buttons, user flows, and the logic that connects them. The focus is on creating experiences that feel intuitive where someone can explore a demo of your project without needing a developer standing next to them. You'll get a feel for it by using the Unity 3D interface and then apply your experience using it to make engaging and interactive demos of your project.",
    applications:
      [
        "This is how prototypes demos become shareable. Many software team use simple interactive apps to demo progress, visualize results, and make experiments repeatable. For example, ML Development can turn model outputs into a clear demo flow, while Signals can use simple UI ideas to make validation tools easier for everyone to use.",
        "Unity 3D can also be used to make computer vision demos, such as seeing through the eyes of a rover landing on the moon. Currently, the ML Development team on the Computer Vision side is working on the Lunar Landing Toy Project."
      ]
  },

  // -------------------------
  // SOFTWARE BLOCK 3 (Signals)
  // -------------------------
  "softwareB3:1": {
    concepts:
      "In this module, you’ll learn what brain and EEG signals “mean” in a practical sense: what information they can carry, what can distort them, and how to recognize patterns versus artifacts. The goal is to build intuition: when you look at a signal, you can tell what’s plausible and what’s suspicious.",
    applications:
      "This connects directly to the EEG team’s work on better electrodes because cleaner contact and less noise means better recordings. It also supports the Signals team’s validation scripts: the script can only catch problems if we understand what real EEG should look like and how artifacts tend to appear.",
  },
  "softwareB3:2": {
    concepts:
      "In this module, you’ll learn how to clean signals without accidentally deleting the information you care about. You’ll build intuition for filtering (removing specific kinds of noise) and for frequency thinking—where you can understand a signal by breaking it into “how much of each rhythm” it contains.",
    applications:
      "Filtering is a day‑to‑day tool. The Signals team uses these ideas to prepare EEG/EMG recordings so models aren’t trained on noise, and ML Development can use frequency features (like FFT-style summaries) to improve gesture recognition when raw time signals are too messy.",
  },
  "softwareB3:3": {
    concepts:
      "In this module, you’ll learn how to make complex datasets understandable. When you have many features, dimensionality reduction and simple classifiers help you see whether the data naturally clusters, whether classes overlap, and what might be driving differences.",
    applications:
      "This is especially useful for ML Development when exploring EMG gesture data: if gestures don’t separate in a simple visualization, the team knows to revisit features or preprocessing. The Signals team can also use these tools as a quick ‘health check’ to see whether the pipeline is producing meaningful structure at all.",
  },

  // -------------------------
  // SOFTWARE BLOCK 4 (Machine Learning)
  // -------------------------
  "softwareB4:1": {
    concepts:
      "In this module, you’ll learn how models learn patterns: starting with the simplest baselines and building toward neural network intuition. The key takeaway is how to frame a problem, choose a model that’s “good enough to start,” and understand what the model is actually doing when it makes a prediction.",
    applications:
      "For the EMG Gesture Recognition project, ML Development uses these baseline models as the first milestone: a simple classifier that works sets a measurable bar. The Signals team benefits too because good baselines reveal whether data quality and preprocessing are helping or hurting performance.",
  },
  "softwareB4:2": {
    concepts:
      "In this module, you’ll learn how modern ML projects are built in practice: training loops, experimentation, and models that can learn richer patterns (like convolutional networks). The goal is to move from “I ran a tutorial” to “I can iterate on a model and explain why it improved.”",
    applications:
      "ML Development applies this directly in two areas: the EMG Gesture Recognition project (where model design can meaningfully change accuracy) and the Lunar Lander Toy work (where vision and learning ideas are tested quickly). These tools make experimentation fast enough to drive weekly progress.",
  },
  "softwareB4:3": {
    concepts:
      [
        "In this module, you’ll learn the quiet superpower of Machine Learning: preprocessing. Segmenting signals into consistent chunks, normalizing values, and extracting frequency information can make models dramatically more reliable.",
        "The next submodules in this module introduces the particular application of preprocessing on collected brain signals to help analyze these signals."
      ],
    applications:
      "This is where the Signals and ML Development teams meet. Signals builds validation and preprocessing that produces stable inputs, and ML Development trains models on those inputs to ensure improvements are real, repeatable, and not dependent on a lucky recording session.",
  },

  // -------------------------
  // HARDWARE BLOCK 1 (General Skills)
  // -------------------------
  "hardwareB1:1": {
    concepts:
      [
        "In this module, you’ll learn how to document your work: what you built, what you changed, why you changed it, and how to reproduce it. Clear and detailed documentation makes it easy for both you and your team to continue later because the documentation serve as a useful reference of the progress made so far.",
        "Great documentation also serve as a way to clearly explain about your work to others outside Longhorn Neurotech, which can be an immediately useful starting point in job interviews and in your resume.",
        "For hardware medical devices (like prosthetic hands), there's a solid standard of documentation quality required for medical devices manufacturers. The next submodule provides you the needed insights for making that standard of documentation quality required, but take to heart that making great documentation is all about being clear and being detailed."
      ],
    applications:
      [
        "Documentation matters across hardware teams. The Prosthetic team uses documentation to track their prosthetic design iterations. The Wheelchair team uses it to keep wiring and control changes understandable to everyone. The EMG team uses it to record what housing designs were comfortable and which ones caused sensor issues.",
        "There will also be frequent times where multiple different teams will collaborate on the same project, and great documentation is needed for these teams to smoothly coordinate their works together. The Signals team currently write the software to interpret the brain signals recorded from the EEG headset that the EEG team is making improvements on now, but great documentation on the EEG headset is needed for the Signals team to build accurate and realiable signal-processing software."
      ]
  },
  "hardwareB1:2": {
    concepts:
      "In this module, you'll get started on using a powerful Computer-Aided Design (CAD) tool: the Fusion 360. You’ll also learn the core CAD habits that make designs editable: clean sketches, constraints, and assemblies that don’t fall apart when you change one dimension. The aim is to design parts that you can iterate quickly and not parts that only work once.",
    applications:
      "There are many powerful CAD tools, including Fusion 360, that many hardware teams uses to design prototype sketches before building the prototype itself. The Prosthetic team relies on CAD to refine hand parts for fit and motion, and the EMG team uses CAD to design sensor housings that are comfortable, protective, and consistent. These projects improve fastest when CAD changes are quick and controlled.",
  },
  "hardwareB1:3": {
    concepts:
      "In this module, you’ll learn the basics of circuits as a system: how current flows, what common components do, and how to read a schematic like a story. You’ll also build the “debug mindset” that helps you narrow problems in electronic circuits down instead of guessing.",
    applications:
      "The Wheelchair team uses these fundamentals to build safer motorization electronics and diagnose wiring issues. The EEG team also benefits when reasoning about contact quality and noise because a lot of ‘bad EEG’ is really ‘bad electrical connections.’",
  },

  // -------------------------
  // HARDWARE BLOCK 2 (Design)
  // -------------------------
  "hardwareB2:1": {
    concepts:
      "In this module, you’ll be introduced to some powerful design software tools to make hardware prototype designs, such as Blender and MeshLab. You'll learn how to shape and refine designs with more advanced modeling techniques. The focus is on turning a rough shape into something manufacturable, testable, and comfortable to use.",
    applications:
      "The Prosthetic team applies these skills when refining hand geometry for real use, and the EMG team uses them to improve sensor housings so they fit well and survive movement. The Computer Vision (hardware) team also benefits when designing clean, testable hardware layouts for the rover-style system.",
  },
  "hardwareB2:2": {
    concepts:
      "In this module, you’ll learn how to take electronics from a diagram to a reliable physical build: creating boards, placing components thoughtfully, and soldering with consistency. The goal is to make hardware that’s easy to test and doesn’t fail unexpectedly.",
    applications:
      "The Wheelchair team uses these skills to build dependable motorization/control electronics. The Computer Vision (hardware) team’s rover circuit work also depends on clear schematics and solid assembly—because good design is only real once it’s buildable and debuggable.",
  },
  "hardwareB2:3": {
    concepts:
      [
        "Making the prototypes and for most parts of the final version of the hardware product itself relatively quickly is centered on using the different types of 3D printers available in the Texas Inventionworks.",
        "To be allowed to use a specific type of 3D printer in Texas Inventionworks, you are required to first complete the training module for that printer. The submodules in this module provide the corresponding links to the training modules you'll need to complete.",
        "One useful tip to know is that each 3D printer have their own strengths and drawbacks. Both the material and the prototype design for the hardware the team can influence which 3D printers are more suited to use over other 3D printers, which you can narrow down on which 3D printer training module to complete first.",
      ],
    applications:
      "Every hardware team uses 3D printers to make and iterate on their prototypes. The EEG team uses structured testing to chase down noise sources, the Prosthetic team iterates on fit and motion until it feels natural, and the Wheelchair team validates that control and power systems behave safely and predictably.",
  },

  // -------------------------
  // HARDWARE BLOCK 3 (Electronics)
  // -------------------------
  "hardwareB3:1": {
    concepts:
      "In this module, you’ll learn how to measure what your circuit is actually doing. Tools like multimeters and oscilloscopes turn mystery bugs into numbers and waveforms you can reason about, which is the fastest path to confident debugging.",
    applications:
      "These tools are essential for teams building real systems. The Wheelchair team can diagnose power drops or noisy lines, and the Computer Vision (hardware) team can verify that the rover-style electronics behave correctly before higher-level features are added.",
  },
  "hardwareB3:2": {
    concepts:
      "In this module, you’ll learn how microcontrollers and embedded systems become the ‘brains’ of a prototype: reading sensors, making decisions, and controlling outputs. You’ll also learn the workflow around building boards and keeping hardware changes manageable.",
    applications:
      "The Wheelchair team uses microcontrollers for sensing and control logic, while the EEG and EMG teams can use embedded setups to build test rigs and repeatable data collection. This is where prototypes start acting like real devices.",
  },
  "hardwareB3:3": {
    concepts:
      "In this module, you’ll build the hands-on skill in electronics: soldering. The focus is consistency to ensure electornics connections that don’t wiggle loose, don’t introduce noise, and don’t fail during a demo.",
    applications:
      "This skill shows up everywhere in hardware projects. A prosthetic hand prototype, a motorized wheelchair control board, an EEG electrode test setup, or an EMG housing prototype all become dramatically more dependable when the physical connections are clean and robust.",
  },

  // -------------------------
  // HARDWARE BLOCK 4 (Hardware–Software Interfacing)
  // -------------------------
  "hardwareB4:1": {
    concepts:
    [
      "In this module, you’ll learn how code and hardware talk to each other: reading data, sending commands, and building small programs that make devices feel controllable. The goal is to make hardware behavior inspectable instead of mysterious.",
      "You'll get started on two frequently used programming languages to make the code: C++ and Python."
    ],
    applications:
      "This matters when turning prototypes into tools. The Wheelchair team benefits from reliable control code, and the EEG/EMG teams benefit from scripts that collect data consistently so signals are usable for validation and model training.",
  },
  "hardwareB4:2": {
    concepts:
    [
      "In this module, you’ll learn how to integrate embedded code with real components: sensors, motors, and simple control logic. It’s the bridge between a circuit that powers on and a device that does something meaningful on purpose.",
      "This module features a frequently used microcontroller platform known as the Arduino. The Arduino is completely built on the C++ programming language, so you'll get started on applying what you learned about C++ from the previous module to make the Arduino work for you in this module too!"
    ],
    applications:
      "The Wheelchair team can apply this to motor driver control and sensor integration, and the Prosthetic team can apply it to driving actuators and validating motion sequences. It’s how prototypes become interactive systems.",
  },
  "hardwareB4:3": {
    concepts:
      [
        "In this module, you’ll learn how wireless connectivity turns a standalone device into a usable platform capable of sending data, receiving commands, and debugging communication when things inevitably go wrong.",
        "An Arduino is capable of communicating with other Arduino and other devices thanks to both Bluetooth and WiFi, and the microcontroller on the Arduino that supports this is ESP32. So you'll be able to expand what you learned about the Arduino in the previous module to make wireless communication to other devices in this module!"
      ],
    applications:
      "Wireless communication makes the device more portable for use without relying on existing wire cables connecting between multiple devices. The EMG team can stream muscle-signal data more conveniently, the Wheelchair team can add telemetry for debugging and safety, and EEG experiments become easier when data collection doesn’t depend on fragile cables.",
  },
};

