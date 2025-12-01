// ./src/components/onboarding/ModulePage.jsx
// This is the submodule page that displays all the content for the current submodule of the current onboarding block the user is in!
import PropTypes from "prop-types";
import RichTextWithLinks from "./RichTextWithLinks";
import TaskCard from "./TaskCard";
import VideoGallery from "./videos/VideoGallery";

const ModulePage = ({ data }) => {
  const { infoSections = [], tasks = [], extraResources = [] } = data;

  // Ensures every segment is inline, preventing line break bugs in lists.
  const renderWithBold = (text, links = []) => {
    const segments = text.split(/(\*\*[^*]+\*\*)/g);
    return segments.map((seg, i) => {
      if (/^\*\*[^*]+\*\*$/.test(seg)) {
        const content = seg.slice(2, -2);
        return (
          <span key={i} style={{ display: "inline" }}>
            <strong className="font-bold text-prussian_blue">{content}</strong>
          </span>
        );
      }
      return (
        <span key={i} style={{ display: "inline" }}>
          <RichTextWithLinks text={seg} links={links} />
        </span>
      );
    });
  };

  const parseFormattedText = (text, links = []) => {
    if (!text) return null;
    const processed = text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    const lines = processed.split("\n");
    const elements = [];
    let listType = null, listItems = [], key = 0;

    const flushList = () => {
      if (!listType || !listItems.length) return;
      const Tag = listType === "ul" ? "ul" : "ol";
      elements.push(
        <Tag
          key={key++}
          className={`${listType === "ul" ? "list-disc" : "list-decimal"} list-outside ml-10 mb-4`}
        >
          {listItems.map((item, i) => (
            <li key={i} className="mb-1">
              <span className="whitespace-pre-wrap">{renderWithBold(item, links)}</span>
            </li>
          ))}
        </Tag>
      );
      listType = null;
      listItems = [];
    };

    lines.forEach(line => {
      const trimmed = line.trim();
      const headingMatch = /^##\s+(.*)$/.exec(line);
      const ulMatch = /^\s*\*\s+(.*)$/.exec(line);
      const olMatch = /^\s*\d+[.)]\s+(.*)$/.exec(line);

      if (headingMatch) {
        flushList();
        elements.push(
          <h3 key={key++} className="text-lg font-semibold text-prussian_blue mb-2">
            {renderWithBold(headingMatch[1], links)}
          </h3>
        );
      } else if (ulMatch) {
        if (listType !== "ul") flushList();
        listType = "ul";
        listItems.push(ulMatch[1]);
      } else if (olMatch) {
        if (listType !== "ol") flushList();
        listType = "ol";
        listItems.push(olMatch[1]);
      } else if (!trimmed) {
        flushList();
        elements.push(<div key={key++} className="mb-3" />);
      } else {
        flushList();
        const withTabs = line.replace(/\t/g, "    ");
        elements.push(
          <div key={key++} className="mb-2 whitespace-pre-wrap">
            {renderWithBold(withTabs, links)}
          </div>
        );
      }
    });

    flushList();
    return elements.length ? <div>{elements}</div> : null;
  };

  return (
    <div className="mx-auto">
      <section className="mb-6">
        {infoSections.map((section, i) => {
          if (section.type === "text") {
            return (
              <div key={i} className="text-prussian_blue text-base mb-2">
                {parseFormattedText(section.text, section.links || [])}
              </div>
            );
          }
          if (section.type === "document") {
            return (
              <p key={i} className="mb-2">
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
              <div key={i} className="mb-4">
                <VideoGallery videos={[{ url: section.url, title: section.title, required: false }]} />
              </div>
            );
          }
          return null;
        })}
      </section>
      <section className="mb-6 space-y-8">
        {tasks.map((t, i) => (
          <TaskCard key={i} task={t} />
        ))}
      </section>
      {extraResources.length > 0 && (
        <section>
          <h2 className="font-bold text-lg text-prussian_blue mb-2">Extra Resources</h2>
          {extraResources.map((res, i) => {
            if (res.type === "video") {
              return (
                <div key={i} className="mb-4">
                  <VideoGallery videos={[{ url: res.url, title: res.title, required: false }]} />
                </div>
              );
            }
            return (
              <div key={i} className="mb-4">
                {res.title && <h3 className="font-semibold text-prussian_blue mb-1">{res.title}</h3>}
                {res.text && <div className="text-prussian_blue text-base">{parseFormattedText(res.text, res.links || [])}</div>}
                {!res.text && res.url && (
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
            );
          })}
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
        links: PropTypes.array,
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
        links: PropTypes.array,
      })
    ),
  }).isRequired,
};

export default ModulePage;