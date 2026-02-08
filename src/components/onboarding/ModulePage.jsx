// ./src/components/onboarding/ModulePage.jsx
// This is the submodule page that displays all the content for the current submodule of the current onboarding block the user is in!
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import RichTextWithLinks from "./RichTextWithLinks";
import TaskCard from "./TaskCard";
import VideoGallery from "./videos/VideoGallery";
import { useProgress } from "../../context/useProgress";

const ModulePage = ({ data }) => {
  const { infoSections = [], tasks = [], extraResources = [] } = data;
  const { onboardingBlock, moduleSubmodule } = useParams();
  const { progress, markSubmoduleVisited, updateSubmoduleCompletion } = useProgress();

  useEffect(() => {
    if (!onboardingBlock || !moduleSubmodule) return;
    markSubmoduleVisited(onboardingBlock, moduleSubmodule);
  }, [onboardingBlock, moduleSubmodule, markSubmoduleVisited]);

  useEffect(() => {
    if (!onboardingBlock || !moduleSubmodule) return;
    updateSubmoduleCompletion(onboardingBlock, moduleSubmodule, tasks || []);
  }, [onboardingBlock, moduleSubmodule, tasks, progress, updateSubmoduleCompletion]);

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

  // Supports for display of multiple videos in the module page's info section and in the extra resources section
  const normalizeOptionalVideos = (entry) => {
    if (!entry) return [];
    if (Array.isArray(entry.videos)) {
      return entry.videos
        .filter((v) => v?.url && v?.title)
        .map((v) => ({ ...v, required: false }));
    }
    if (entry.url && entry.title) {
      return [{ url: entry.url, title: entry.title, required: false }];
    }
    return [];
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
          if (section.type === "video" || section.type === "videos") {
            const videos = normalizeOptionalVideos(section);
            if (!videos.length) return null;
            return (
              <div key={i} className="mb-4">
                <VideoGallery videos={videos} />
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
            if (res.type === "video" || res.type === "videos") {
              const videos = normalizeOptionalVideos(res);
              if (!videos.length) return null;
              return (
                <div key={i} className="mb-4">
                  <VideoGallery videos={videos} />
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
        videos: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
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
        videos: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ),
  }).isRequired,
};

export default ModulePage;