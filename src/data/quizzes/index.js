// index.js file to import all quiz JSON files and export them together
const quizzes = import.meta.glob("./*.json", { eager: true });

const quizzesData = {};

for (const path in quizzes) {
  const match = path.match(/\.\/(.*)\.json$/);
  if (match) {
    const key = match[1];
    quizzesData[key] = quizzes[path];
  }
}

export default quizzesData;