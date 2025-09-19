// ./src/components/onboarding/ModulePage.jsx
// This is the submodule page that displays all the content for the current submodule of the current onboarding block the user is in!
import PropTypes from "prop-types";
import RichTextWithLinks from "./RichTextWithLinks";
import TaskCard from "./TaskCard";

const ModulePage = ({ data }) => {
  const { moduleTitle, infoSections = [], tasks = [], extraResources = [] } = data;

  return (
    <div className="mx-auto">
      <h1 className="text-xl font-bold text-prussian_blue mb-4">{moduleTitle}</h1>

      {/* Info Sections */}
      <section className="mb-6">
        {infoSections.map((section, idx) => {
          if (section.type === "text") {
            return (
              <p key={idx} className="text-prussian_blue text-base mb-2">
                <RichTextWithLinks 
                  text={section.text} 
                  links={section.links || []} 
                />
              </p>
            );
          }
          if (section.type === "document") {
            return (
              <p key={idx} className="mb-2">
                <a
                  href={section.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {section.title}
                </a>
              </p>
            );
          }
          if (section.type === "video") {
            return (
              <div key={idx} className="mb-4">
                <iframe
                  src={section.url}
                  title={section.title}
                  allowFullScreen
                  className="w-full h-60"
                ></iframe>
              </div>
            );
          }
          return null;
        })}
      </section>

      {/* Tasks */}
      <section className="mb-6 space-y-8">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} task={task} />
        ))}
      </section>

      {/* Extra Resources */}
      {extraResources.length > 0 && (
        <section>
          <h2 className="font-semibold text-lg text-prussian_blue mb-2">Extra Resources</h2>
          {extraResources.map((res, idx) => (
            <div key={idx} className="mb-4">
              {res.title && <h3 className="font-bold text-prussian_blue mb-1">{res.title}</h3>}
              {res.text && (
                <p className="text-prussian_blue text-base">
                  <RichTextWithLinks 
                    text={res.text} 
                    links={res.links || []} 
                  />
                </p>
              )}
              {res.url && !res.text && (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {res.title || res.url}
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

ModulePage.propTypes = {
  data: PropTypes.shape({
    moduleTitle: PropTypes.string.isRequired,
    infoSections: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        text: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        taskTitle: PropTypes.string.isRequired,
        taskDescription: PropTypes.string.isRequired,
        links: PropTypes.array,
        quizId: PropTypes.string,
      })
    ),
    extraResources: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        required: PropTypes.bool,
      })
    ),
  }).isRequired,
};

export default ModulePage;