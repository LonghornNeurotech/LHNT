// moduleMap.js provides the needed content to display in ModuleNavbar component,
// specifies navigation routes for each submodule in each onboarding block, 
// and groups each submodule under each module for each onboarding block.
const moduleMap = {
  softwareB1: {
    title: "Software Block 1: General Skills",
    groups: {
      "Module 1": ["1_1", "1_2"],
      "Module 2": ["2_1"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: Python Basics",
        path: "/onboarding/softwareB1/1_1"
      },
      "1_2": {
        title: "Module 1.2: Numpy and Time Series",
        path: "/onboarding/softwareB1/1_2"
      },
      "2_1": {
        title: "Module 2.1: Statistics",
        path: "/onboarding/softwareB1/2_1"
      }
    }
  },
  softwareB2: {
    title: "Software Block 2: Virtual Reality",
    groups: {
      "Module 1": ["1_1"],
      "Module 2": ["2_1", "2_2"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: C++",
        path: "/onboarding/softwareB2/1_1"
      },
      "2_1": {
        title: "Module 2.1: Unity 3D User Interface",
        path: "/onboarding/softwareB2/2_1"
      },
      "2_2": {
        title: "Module 2.2: Unity 3D Basic Applications",
        path: "/onboarding/softwareB2/2_2"
      }
    }
  },
  softwareB3: {
    title: "Software Block 3: Signals",
    groups: {
      "Module 1": ["1_1", "1_2"],
      "Module 2": ["2_1", "2_2"],
      "Module 3": ["3_1", "3_2", "3_3"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: Brain Signals",
        path: "/onboarding/softwareB3/1_1"
      },
      "1_2": {
        title: "Module 1.2: EEG Signals",
        path: "/onboarding/softwareB3/1_2"
      },
      "2_1": {
        title: "Module 2.1: Bandpass and Notch Filtering",
        path: "/onboarding/softwareB3/2_1"
      },
      "2_2": {
        title: "Module 2.2: Fourier Transforms",
        path: "/onboarding/softwareB3/2_2"
      },
      "3_1": {
        title: "Module 3.1: t-SNE",
        path: "/onboarding/softwareB3/3_1"
      },
      "3_2": {
        title: "Module 3.2: PCA",
        path: "/onboarding/softwareB3/3_2"
      },
      "3_3": {
        title: "Module 3.3: LDA",
        path: "/onboarding/softwareB3/3_3"
      }
    }
  },
  softwareB4: {
    title: "Software Block 4: Machine Learning",
    groups: {
      "Module 1": ["1_1", "1_2"],
      "Module 2": ["2_1", "2_2"],
      "Module 3": ["3_1", "3_2"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: Linear Regression and Classification",
        path: "/onboarding/softwareB4/1_1"
      },
      "1_2": {
        title: "Module 1.2: Neural Networks Basics + Math Behind It",
        path: "/onboarding/softwareB4/1_2"
      },
      "2_1": {
        title: "Module 2.1: PyTorch",
        path: "/onboarding/softwareB4/2_1"
      },
      "2_2": {
        title: "Module 2.2: Convolutional Neural Networks (with EEG Applications)",
        path: "/onboarding/softwareB4/2_2"
      },
      "3_1": {
        title: "Module 3.1: Bandpass Filtering, Segmentation, Normalization",
        path: "/onboarding/softwareB4/3_1"
      },
      "3_2": {
        title: "Module 3.2: Fast Fourier Transforms (FFT)",
        path: "/onboarding/softwareB4/3_2"
      }
    }
  },
  hardwareB1: {
    title: "Hardware Block 1: General Skills",
    groups: {
      "Module 1": ["1_1"],
      "Module 2": ["2_1"],
      "Module 3": ["3_1", "3_2"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: Documentation",
        path: "/onboarding/hardwareB1/1_1"
      },
      "2_1": {
        title: "Module 2.1: Fusion 360 (CAD)",
        path: "/onboarding/hardwareB1/2_1"
      },
      "3_1": {
        title: "Module 3.1: Electronic Basics",
        path: "/onboarding/hardwareB1/3_1"
      },
      "3_2": {
        title: "Module 3.2: Electronic Systems",
        path: "/onboarding/hardwareB1/3_2"
      }
    }
  },
  hardwareB2: {
    title: "Hardware Block 2: Design",
    groups: {
      "Module 1": ["1_1", "1_2", "1_3"],
      "Module 2": ["2_1", "2_2"],
      "Module 3": ["3_1", "3_2", "3_3", "3_4"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: Advanced CAD",
        path: "/onboarding/hardwareB2/1_1"
      },
      "1_2": {
        title: "Module 1.2: Blender",
        path: "/onboarding/hardwareB2/1_2"
      },
      "1_3": {
        title: "Module 1.3: MeshLab",
        path: "/onboarding/hardwareB2/1_3"
      },
      "2_1": {
        title: "Module 2.1: Reverse Engineering and Spatial Visualization",
        path: "/onboarding/hardwareB2/2_1"
      },
      "2_2": {
        title: "Module 2.2: CAD Skills",
        path: "/onboarding/hardwareB2/2_2"
      },
      "3_1": {
        title: "Module 3.1: Basics of 3D Printing",
        path: "/onboarding/hardwareB2/3_1"
      },
      "3_2": {
        title: "Module 3.2: Bambu Lab P1P 3D Printing Training",
        path: "/onboarding/hardwareB2/3_2"
      },
      "3_3": {
        title: "Module 3.3: Raise3D Advanced Filament Printers Training",
        path: "/onboarding/hardwareB2/3_3"
      },
      "3_4": {
        title: "Module 3.4: SLA 3D Printing Training",
        path: "/onboarding/hardwareB2/3_4"
      }
    }
  }, 
  hardwareB3: {
    title: "Hardware Block 3: Electronics",
    groups: {
      "Module 1": ["1_1", "1_2", "1_3"],
      "Module 2": ["2_1", "2_2", "2_3", "2_4"],
      "Module 3": ["3_1", "3_2"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: Breadboard",
        path: "/onboarding/hardwareB3/1_1"
      },
      "1_2": {
        title: "Module 1.2: Multimeter",
        path: "/onboarding/hardwareB3/1_2"
      },
      "1_3": {
        title: "Module 1.3: Oscilloscope",
        path: "/onboarding/hardwareB3/1_3"
      },
      "2_1": {
        title: "Module 2.1: Tinkering Arduino on Tinkercad",
        path: "/onboarding/hardwareB3/2_1"
      },
      "2_2": {
        title: "Module 2.2: ESP32",
        path: "/onboarding/hardwareB3/2_2"
      },
      "2_3": {
        title: "Module 2.3: Eagle PCB",
        path: "/onboarding/hardwareB3/2_3"
      },
      "2_4": {
        title: "Module 2.4: KiCad",
        path: "/onboarding/hardwareB3/2_4"
      },
      "3_1": {
        title: "Module 3.1: Soldering Basics",
        path: "/onboarding/hardwareB3/3_1"
      },
      "3_2": {
        title: "Module 3.2: Basic Soldering Training",
        path: "/onboarding/hardwareB3/3_2"
      }
    }
  },
  hardwareB4: {
    title: "Hardware Block 4: Hardware-Software Interfacing",
    groups: {
      "Module 1": ["1_1", "1_2"],
      "Module 2": ["2_1", "2_2"],
      "Module 3": ["3_1", "3_2"]
    },
    modules: {
      "1_1": {
        title: "Module 1.1: C++",
        path: "/onboarding/hardwareB4/1_1"
      },
      "1_2": {
        title: "Module 1.2: Python",
        path: "/onboarding/hardwareB4/1_2"
      },
      "2_1": {
        title: "Module 2.1: Arduino",
        path: "/onboarding/hardwareB4/2_1"
      },
      "2_2": {
        title: "Module 2.2: C++ on Arduino",
        path: "/onboarding/hardwareB4/2_2"
      },
      "3_1": {
        title: "Module 3.1: Bluetooth and WiFi",
        path: "/onboarding/hardwareB4/3_1"
      },
      "3_2": {
        title: "Module 3.2: ESP32",
        path: "/onboarding/hardwareB4/3_2"
      }
    }
  }
};

export default moduleMap;