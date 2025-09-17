import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const ModulePage = ({ moduleData, completedTasks, onCompleteTask }) => (
  <div className="module-page" style={{ maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
    <h2 className="text-2xl font-bold text-prussian_blue mb-4">
      {moduleData.moduleTitle}
    </h2>
    <section className="mb-6">
      {moduleData.info.map((paragraph, idx) => (
        <p
          key={idx}
          className="text-gray-800 mb-3"
          style={{ textIndent: "2em" }}
        >
          {paragraph}
        </p>
      ))}
    </section>
    <section className="mb-6">
      {moduleData.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isCompleted={completedTasks.includes(task.id)}
          onComplete={() => onCompleteTask(task.id)}
        />
      ))}
    </section>
  </div>
);

ModulePage.propTypes = {
  moduleData: PropTypes.shape({
    moduleTitle: PropTypes.string.isRequired,
    info: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  completedTasks: PropTypes.array.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
};

export default ModulePage;


// import PropTypes from 'prop-types';
// import TaskCard from './TaskCard';

// const ModulePage = ({ moduleData, completedTasks, onTaskComplete }) => {
//   const { moduleTitle, description, tasks } = moduleData;

//   return (
//     <section className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">{moduleTitle}</h2>
//       <p className="mb-6 text-prussian_blue">{description}</p>

//       {tasks.map((task, idx) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           taskNumber={idx + 1}
//           completed={completedTasks.includes(task.id)}
//           onComplete={() => onTaskComplete(task.id)}
//         />
//       ))}
//     </section>
//   );
// };

// ModulePage.propTypes = {
//   moduleData: PropTypes.shape({
//     moduleTitle: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     tasks: PropTypes.array.isRequired,
//   }).isRequired,
//   completedTasks: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onTaskComplete: PropTypes.func.isRequired,
// };

// export default ModulePage;