// ./src/components/onboarding/ModulePage.jsx
// This is the submodule page that displays all the content for the current submodule of the current onboarding block the user is in!
import PropTypes from "prop-types";
import RichTextWithLinks from "./RichTextWithLinks";
import TaskCard from "./TaskCard";
import VideoGallery from "./videos/VideoGallery";

const ModulePage = ({ data }) => {
  const { moduleTitle, infoSections = [], tasks = [], extraResources = [] } = data;

  // Render segments with **bold** in prussian_blue
  const renderWithBold = (text, links = []) => {
    const segments = text.split(/(\*\*[^*]+\*\*)/g);
    return segments.map((seg, i) => {
      if (/^\*\*[^*]+\*\*$/.test(seg)) {
        const content = seg.slice(2, -2);
        return (
          <strong key={i} className="font-bold text-prussian_blue">
            {content}
          </strong>
        );
      }
      return (
        <RichTextWithLinks
          key={i}
          text={seg}
          links={links}
        />
      );
    });
  };

  // Parse text into paragraphs, ULs, and OLs, with bold support
  const parseFormattedText = (text, links = []) => {
    if (!text) return null;

    const processedText = text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    const lines = processedText.split("\n");
    const elements = [];
    let listType = null;
    let listItems = [];
    let key = 0;

    const flushList = () => {
      if (!listType || !listItems.length) return;
      const Tag = listType === "ul" ? "ul" : "ol";
      elements.push(
        <Tag
          key={key++}
          className={`${listType === "ul" ? "list-disc" : "list-decimal"} list-outside ml-10 mb-4`}
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="mb-1">
              {renderWithBold(item, links)}
            </li>
          ))}
        </Tag>
      );
      listType = null;
      listItems = [];
    };

    lines.forEach(line => {
      const trimmed = line.trim();
      const ulMatch = /^\s*\*\s+(.*)$/.exec(line);
      const olMatch = /^\s*\d+[.)]\s+(.*)$/.exec(line);

      if (ulMatch) {
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
          <div key={key++} className="mb-2" style={{ whiteSpace: "pre-wrap" }}>
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
      <h1 className="text-2xl font-bold text-prussian_blue mb-4">{moduleTitle}</h1>

      {/* Info Sections */}
      <section className="mb-6">
        {infoSections.map((section, idx) => {
          if (section.type === "text") {
            return (
              <div key={idx} className="text-prussian_blue text-base mb-2">
                {parseFormattedText(section.text, section.links || [])}
              </div>
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
                <VideoGallery
                  videos={[{ url: section.url, title: section.title, required: false }]}
                />
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
          <h2 className="font-bold text-lg text-prussian_blue mb-2">Extra Resources</h2>
          {extraResources.map((res, idx) => {
            if (res.type === "video") {
              return (
                <div key={idx} className="mb-4">
                  <VideoGallery
                    videos={[{ url: res.url, title: res.title, required: false }]}
                  />
                </div>
              );
            }
            return (
              <div key={idx} className="mb-4">
                {res.title && <h3 className="font-semibold text-prussian_blue mb-1">{res.title}</h3>}
                {res.text && (
                  <div className="text-prussian_blue text-base">
                    {parseFormattedText(res.text, res.links || [])}
                  </div>
                )}
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

// import PropTypes from "prop-types";
// import RichTextWithLinks from "./RichTextWithLinks";
// import TaskCard from "./TaskCard";
// import VideoGallery from "./videos/VideoGallery";

// const ModulePage = ({ data }) => {
//   const { moduleTitle, infoSections = [], tasks = [], extraResources = [] } = data;

//   // Function to parse formatted text with markdown-like syntax (same as in TaskCard)
//   const parseFormattedText = (text, links = []) => {
//     if (!text) return null;

//     // Convert escaped \n and \t to actual newlines and tabs
//     const processedText = text
//       .replace(/\\n/g, '\n')
//       .replace(/\\t/g, '\t');

//     // Split by actual newlines
//     const lines = processedText.split('\n');
    
//     const elements = [];
//     let listType = null; // 'ul' or 'ol'
//     let listItems = [];
//     let keyCounter = 0;

//     // Helper function to close current list block
//     const flushList = () => {
//       if (!listType || listItems.length === 0) return;
      
//       if (listType === "ul") {
//         elements.push(
//           <ul key={`list-${keyCounter++}`} className="list-disc list-outside ml-10 mb-4">
//             {listItems.map((item, idx) => (
//               <li key={`ul-item-${idx}`} className="mb-1">
//                 <RichTextWithLinks 
//                   text={item} 
//                   links={links} 
//                 />
//               </li>
//             ))}
//           </ul>
//         );
//       } else if (listType === "ol") {
//         elements.push(
//           <ol key={`list-${keyCounter++}`} className="list-decimal list-outside ml-10 mb-4">
//             {listItems.map((item, idx) => (
//               <li key={`ol-item-${idx}`} className="mb-1">
//                 <RichTextWithLinks 
//                   text={item} 
//                   links={links} 
//                 />
//               </li>
//             ))}
//           </ol>
//         );
//       }
      
//       listType = null;
//       listItems = [];
//     };

//     lines.forEach((line) => {
//       const trimmed = line.trim();

//       // Capture the full content after * including spaces and text
//       const unorderedMatch = /^(\s*)\*\s+(.*)$/.exec(line);
      
//       // Capture the full content after the number including spaces and text
//       const orderedMatch = /^(\s*)(\d+)[.)]\s+(.*)$/.exec(line);

//       if (unorderedMatch) {
//         // Flush previous list if different type
//         if (listType !== "ul") flushList();
//         listType = "ul";
        
//         // Preserve the full content as captured by regex group 2
//         listItems.push(unorderedMatch[2]);
        
//       } else if (orderedMatch) {
//         // Flush previous list if different type
//         if (listType !== "ol") flushList();
//         listType = "ol";
        
//         // Preserve the full content as captured by regex group 3
//         listItems.push(orderedMatch[3]);
        
//       } else if (trimmed === "") {
//         // Empty line means flush list and add spacing
//         flushList();
//         elements.push(<div key={`spacer-${keyCounter++}`} className="mb-3"></div>);
        
//       } else {
//         // Normal paragraph or line, flush list first
//         flushList();
        
//         // Convert tabs to spaces and preserve formatting
//         const processedLine = line.replace(/\t/g, '    ');
        
//         elements.push(
//           <div key={`text-${keyCounter++}`} className="mb-2" style={{ whiteSpace: "pre-wrap" }}>
//             <RichTextWithLinks 
//               text={processedLine} 
//               links={links} 
//             />
//           </div>
//         );
//       }
//     });

//     // Flush any remaining list
//     flushList();

//     return elements.length > 0 ? <div>{elements}</div> : null;
//   };

//   return (
//     <div className="mx-auto">
//       <h1 className="text-2xl font-bold text-prussian_blue mb-4">{moduleTitle}</h1>

//       {/* Info Sections */}
//       <section className="mb-6">
//         {infoSections.map((section, idx) => {
//           if (section.type === "text") {
//             return (
//               <div key={idx} className="text-prussian_blue text-base mb-2">
//                 {parseFormattedText(section.text, section.links || [])}
//               </div>
//             );
//           }
//           if (section.type === "document") {
//             return (
//               <p key={idx} className="mb-2">
//                 <a
//                   href={section.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {section.title}
//                 </a>
//               </p>
//             );
//           }
//           if (section.type === "video") {
//             return (
//               <div key={idx} className="mb-4">
//                 <VideoGallery
//                   videos={[{ url: section.url, title: section.title, required: false }]}
//                 />
//               </div>
//             );
//           }
//           return null;
//         })}
//       </section>

//       {/* Tasks */}
//       <section className="mb-6 space-y-8">
//         {tasks.map((task, idx) => (
//           <TaskCard key={idx} task={task} />
//         ))}
//       </section>

//       {/* Extra Resources */}
//       {extraResources.length > 0 && (
//         <section>
//           <h2 className="font-bold text-lg text-prussian_blue mb-2">Extra Resources</h2>
//           {extraResources.map((res, idx) => {
//             if (res.type === "video") {
//               return (
//                 <div key={idx} className="mb-4">
//                   <VideoGallery
//                     videos={[{ url: res.url, title: res.title, required: false }]}
//                   />
//                 </div>
//               );
//             }
//             return (
//               <div key={idx} className="mb-4">
//                 {res.title && <h3 className="font-semibold text-prussian_blue mb-1">{res.title}</h3>}
//                 {res.text && (
//                   <div className="text-prussian_blue text-base">
//                     {parseFormattedText(res.text, res.links || [])}
//                   </div>
//                 )}
//                 {res.url && !res.text && (
//                   <a
//                     href={res.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     {res.title || res.url}
//                   </a>
//                 )}
//               </div>
//             );
//           })}
//         </section>
//       )}
//     </div>
//   );
// };

// ModulePage.propTypes = {
//   data: PropTypes.shape({
//     moduleTitle: PropTypes.string.isRequired,
//     infoSections: PropTypes.arrayOf(
//       PropTypes.shape({
//         type: PropTypes.string.isRequired,
//         text: PropTypes.string,
//         url: PropTypes.string,
//         title: PropTypes.string,
//         links: PropTypes.array,
//       })
//     ),
//     tasks: PropTypes.arrayOf(
//       PropTypes.shape({
//         taskTitle: PropTypes.string.isRequired,
//         taskDescription: PropTypes.string.isRequired,
//         links: PropTypes.array,
//         quizId: PropTypes.string,
//       })
//     ),
//     extraResources: PropTypes.arrayOf(
//       PropTypes.shape({
//         title: PropTypes.string,
//         text: PropTypes.string,
//         url: PropTypes.string,
//         links: PropTypes.array,
//       })
//     ),
//     links: PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired,
//         required: PropTypes.bool,
//       })
//     ),
//   }).isRequired,
// };

// export default ModulePage;

// import PropTypes from "prop-types";
// import RichTextWithLinks from "./RichTextWithLinks";
// import TaskCard from "./TaskCard";
// import VideoGallery from "./videos/VideoGallery";

// const ModulePage = ({ data }) => {
//   const { moduleTitle, infoSections = [], tasks = [], extraResources = [] } = data;

//   return (
//     <div className="mx-auto">
//       <h1 className="text-2xl font-bold text-prussian_blue mb-4">{moduleTitle}</h1>

//       {/* Info Sections */}
//       <section className="mb-6">
//         {infoSections.map((section, idx) => {
//           if (section.type === "text") {
//             return (
//               <p key={idx} className="text-prussian_blue text-base mb-2">
//                 <RichTextWithLinks 
//                   text={section.text} 
//                   links={section.links || []} 
//                 />
//               </p>
//             );
//           }
//           if (section.type === "document") {
//             return (
//               <p key={idx} className="mb-2">
//                 <a
//                   href={section.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {section.title}
//                 </a>
//               </p>
//             );
//           }
//           if (section.type === "video") {
//             return (
//               <div key={idx} className="mb-4">
//                 <VideoGallery
//                   videos={[{ url: section.url, title: section.title, required: false }]}
//                 />
//               </div>
//             );
//           }
//           return null;
//         })}
//       </section>

//       {/* Tasks */}
//       <section className="mb-6 space-y-8">
//         {tasks.map((task, idx) => (
//           <TaskCard key={idx} task={task} />
//         ))}
//       </section>

//       {/* Extra Resources */}
//       {extraResources.length > 0 && (
//         <section>
//           <h2 className="font-bold text-lg text-prussian_blue mb-2">Extra Resources</h2>
//           {extraResources.map((res, idx) => {
//             if (res.type === "video") {
//               return (
//                 <div key={idx} className="mb-4">
//                   <VideoGallery
//                     videos={[{ url: res.url, title: res.title, required: false }]}
//                   />
//                 </div>
//               );
//             }
//             return (
//               <div key={idx} className="mb-4">
//                 {res.title && <h3 className="font-semibold text-prussian_blue mb-1">{res.title}</h3>}
//                 {res.text && (
//                   <p className="text-prussian_blue text-base">
//                     <RichTextWithLinks text={res.text} links={res.links || []} />
//                   </p>
//                 )}
//                 {res.url && !res.text && (
//                   <a
//                     href={res.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     {res.title || res.url}
//                   </a>
//                 )}
//               </div>
//             );
//           })}
//         </section>
//       )}
//     </div>
//   );
// };

// ModulePage.propTypes = {
//   data: PropTypes.shape({
//     moduleTitle: PropTypes.string.isRequired,
//     infoSections: PropTypes.arrayOf(
//       PropTypes.shape({
//         type: PropTypes.string.isRequired,
//         text: PropTypes.string,
//         url: PropTypes.string,
//         title: PropTypes.string,
//       })
//     ),
//     tasks: PropTypes.arrayOf(
//       PropTypes.shape({
//         taskTitle: PropTypes.string.isRequired,
//         taskDescription: PropTypes.string.isRequired,
//         links: PropTypes.array,
//         quizId: PropTypes.string,
//       })
//     ),
//     extraResources: PropTypes.arrayOf(
//       PropTypes.shape({
//         title: PropTypes.string,
//         text: PropTypes.string,
//         url: PropTypes.string,
//       })
//     ),
//     links: PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired,
//         required: PropTypes.bool,
//       })
//     ),
//   }).isRequired,
// };

// export default ModulePage;