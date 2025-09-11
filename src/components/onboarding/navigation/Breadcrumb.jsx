import PropTypes from 'prop-types';

const Breadcrumb = ({ path, onNavigate }) => {
  return (
    <nav className="text-prussian_blue mb-4" aria-label="breadcrumb">
      <ol className="list-reset flex space-x-2">
        {path.map((item, idx) => (
          <li key={item.label} className="flex items-center">
            <button
              className="hover:underline cursor-pointer"
              onClick={() => onNavigate(item.route)}
              disabled={idx === path.length - 1}
            >
              {item.label}
            </button>
            {idx < path.length - 1 && <span className="mx-2">{'>'}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Breadcrumb;