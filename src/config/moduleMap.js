// moduleMap.js
export const moduleMap = {
  hardwareb2: {
    title: "Hardware Block 2: Design",
    groups: [
      {
        label: "Module 1",
        id: "1",
        submodules: [
          { moduleId: "1_1", label: "Module 1.1" },
          { moduleId: "1_2", label: "Module 1.2" },
          { moduleId: "1_3", label: "Module 1.3" },
        ]
      },
      {
        label: "Module 2",
        id: "2",
        submodules: [
          { moduleId: "2_1", label: "Module 2.1" },
          { moduleId: "2_2", label: "Module 2.2" },
        ]
      },
      {
        label: "Module 3",
        id: "3",
        submodules: [
          { moduleId: "3_1", label: "Module 3.1" },
          { moduleId: "3_2", label: "Module 3.2" },
          { moduleId: "3_3", label: "Module 3.3" },
          { moduleId: "3_4", label: "Module 3.4" }
        ]
      }
    ]
  }
};
