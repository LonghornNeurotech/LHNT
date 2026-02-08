const modules = import.meta.glob("./*.json", { eager: true });

const tasksData = {};

for (const path in modules) {
  // Extract file name without extension to use as key
  const match = path.match(/\.\/(.*)\.json$/);
  if (match) {
    const key = match[1];
    // Vite JSON eager imports can be either the raw object or a module with `default`
    tasksData[key] = modules[path]?.default ?? modules[path];
  }
}

export default tasksData;