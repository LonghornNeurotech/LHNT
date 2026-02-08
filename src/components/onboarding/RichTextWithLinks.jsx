// ./src/components/onboarding/RichTextWithLinks.jsx
// This is the clickable links embedded in the text content of the submodule page for user to click on.
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const RichTextWithLinks = ({ text, links = [], onLinkClick, clickedLabels }) => {
  const [clickedLinks, setClickedLinks] = useState({});

  useEffect(() => {
    if (!clickedLabels) return;
    const labels = Array.isArray(clickedLabels)
      ? clickedLabels
      : clickedLabels instanceof Set
        ? Array.from(clickedLabels)
        : [];
    if (!labels.length) return;
    setClickedLinks((prev) => {
      const next = { ...prev };
      labels.forEach((label) => {
        next[label] = true;
      });
      return next;
    });
  }, [clickedLabels]);

  const linkMap = Object.fromEntries(links.map((link) => [link.label, link]));

  const regex = /\[([^\]]+)]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const label = match[1];
    const link = linkMap[label];

    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (link) {
      const isClicked = clickedLinks[label] || false;
      const baseClass = link.required
        ? "text-orange-600 font-semibold underline"
        : "text-blue-600 underline";
      const clickedClass = link.required
        ? "text-green-800 font-semibold underline"
        : "text-blue-800 underline";

      parts.push(
        <a
          key={match.index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isClicked ? clickedClass : baseClass} hover:opacity-80`}
          onClick={() => {
            setClickedLinks((prev) => ({ ...prev, [label]: true }));
            // Call the parent component's link click handler
            if (onLinkClick) {
              onLinkClick(label, link.required);
            }
          }}
        >
          {label}
        </a>
      );
    } else {
      parts.push(match[0]);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span>{parts}</span>;
};

RichTextWithLinks.propTypes = {
  text: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ),
  onLinkClick: PropTypes.func,
  clickedLabels: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(Set)]),
};

export default RichTextWithLinks;