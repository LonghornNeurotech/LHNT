import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const ModulePage = ({ moduleData, completedTasks, onTaskComplete }) => (
  <div className="module-page">
    <h2>{moduleData.moduleTitle}</h2>
    <div className="module-info">
      {moduleData.info.map((info, idx) => (
        <p key={idx}>{info}</p>
      ))}
    </div>
    <div className="tasks-list">
      {moduleData.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isCompleted={completedTasks.includes(task.id)}
          onComplete={() => onTaskComplete(task.id)}
        />
      ))}
    </div>
  </div>
);

ModulePage.propTypes = {
  moduleData: PropTypes.shape({
    moduleTitle: PropTypes.string.isRequired,
    info: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  completedTasks: PropTypes.array.isRequired,
  onTaskComplete: PropTypes.func.isRequired,
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