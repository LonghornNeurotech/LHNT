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
      "In this module, you’ll learn how interactive applications are built: screens, buttons, user flows, and the logic that connects them. The focus is on creating experiences that feel intuitive where someone can explore a demo without needing a developer standing next to them.",
    applications:
      "This is how prototypes become shareable. Teams use simple interactive apps to demo progress, visualize results, and make experiments repeatable. For example, ML Development can turn model outputs into a clear demo flow, while Signals can use simple UI ideas to make validation tools easier for everyone to use.",
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
      "In this module, you’ll learn the quiet superpower of ML: preprocessing. Segmenting signals into consistent chunks, normalizing values, and extracting frequency information can make models dramatically more reliable—sometimes more than changing the model architecture.",
    applications:
      "This is where the Signals and ML Development teams meet. Signals builds validation and preprocessing that produces stable inputs, and ML Development trains models on those inputs—so improvements are real, repeatable, and not dependent on a lucky recording session.",
  },

  // -------------------------
  // HARDWARE BLOCK 1 (General Skills)
  // -------------------------
  "hardwareB1:1": {
    concepts:
      "In this module, you’ll learn how to document work so it’s actually usable later: what you built, what you changed, why you changed it, and how to reproduce it. Great documentation turns a one-person prototype into a team project that can survive handoffs.",
    applications:
      "This matters across hardware teams. The Prosthetic team uses documentation to track design iterations, the Wheelchair team uses it to keep wiring and control changes understandable, and the EMG team uses it to record what housing designs were comfortable and which ones caused sensor issues.",
  },
  "hardwareB1:2": {
    concepts:
      "In this module, you’ll learn the core CAD habits that make designs editable: clean sketches, constraints, and assemblies that don’t fall apart when you change one dimension. The aim is to design parts that you can iterate quickly—not parts that only work once.",
    applications:
      "The Prosthetic team relies on CAD to refine hand parts for fit and motion, and the EMG team uses CAD to design sensor housings that are comfortable, protective, and consistent. These projects improve fastest when CAD changes are quick and controlled.",
  },
  "hardwareB1:3": {
    concepts:
      "In this module, you’ll learn the basics of circuits as a system: how current flows, what common components do, and how to read a schematic like a story. You’ll also build the “debug mindset” that helps you narrow problems down instead of guessing.",
    applications:
      "The Wheelchair team uses these fundamentals to build safer motorization electronics and diagnose wiring issues. The EEG team also benefits when reasoning about contact quality and noise—because a lot of ‘bad EEG’ is really ‘bad electrical connections.’",
  },

  // -------------------------
  // HARDWARE BLOCK 2 (Design)
  // -------------------------
  "hardwareB2:1": {
    concepts:
      "In this module, you’ll learn how to shape and refine designs beyond basic parts—working with more advanced modeling and the mindset of simulation and iteration. The focus is on turning a rough shape into something manufacturable, testable, and comfortable to use.",
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
      "In this module, you’ll learn the craft of finishing: testing what you built, debugging what’s wrong, documenting what changed, and assembling a prototype that holds up outside the lab. It’s how you turn a pile of parts into a system someone else can use.",
    applications:
      "Every hardware team lives here. The EEG team uses structured testing to chase down noise sources, the Prosthetic team iterates on fit and motion until it feels natural, and the Wheelchair team validates that control and power systems behave safely and predictably.",
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
      "In this module, you’ll learn how microcontrollers and embedded systems become the ‘brains’ of a prototype—reading sensors, making decisions, and controlling outputs. You’ll also learn the workflow around building boards and keeping hardware changes manageable.",
    applications:
      "The Wheelchair team uses microcontrollers for sensing and control logic, while the EEG and EMG teams can use embedded setups to build test rigs and repeatable data collection. This is where prototypes start acting like real devices.",
  },
  "hardwareB3:3": {
    concepts:
      "In this module, you’ll build the hands-on skill that makes everything else reliable: soldering. The focus is consistency—connections that don’t wiggle loose, don’t introduce noise, and don’t fail during a demo.",
    applications:
      "This supports every hardware effort. A prosthetic hand prototype, a motorized wheelchair control board, an EEG electrode test setup, or an EMG housing prototype all become dramatically more dependable when the physical connections are clean and robust.",
  },

  // -------------------------
  // HARDWARE BLOCK 4 (Hardware–Software Interfacing)
  // -------------------------
  "hardwareB4:1": {
    concepts:
      "In this module, you’ll learn how code and hardware talk to each other—reading data, sending commands, and building small programs that make devices feel controllable. The goal is to make hardware behavior inspectable instead of mysterious.",
    applications:
      "This matters when turning prototypes into tools. The Wheelchair team benefits from reliable control code, and the EEG/EMG teams benefit from scripts that collect data consistently—so signals are usable for validation and model training.",
  },
  "hardwareB4:2": {
    concepts:
      "In this module, you’ll learn how to integrate embedded code with real components: sensors, motors, and simple control logic. It’s the bridge between a circuit that powers on and a device that does something meaningful on purpose.",
    applications:
      "The Wheelchair team can apply this to motor driver control and sensor integration, and the Prosthetic team can apply it to driving actuators and validating motion sequences. It’s how prototypes become interactive systems.",
  },
  "hardwareB4:3": {
    concepts:
      "In this module, you’ll learn how wireless connectivity turns a standalone device into a usable platform—sending data, receiving commands, and debugging communication when things inevitably go wrong.",
    applications:
      "This enables cleaner workflows for teams. The EMG team can stream muscle-signal data more conveniently, the Wheelchair team can add telemetry for debugging and safety, and EEG experiments become easier when data collection doesn’t depend on fragile cables.",
  },
};

