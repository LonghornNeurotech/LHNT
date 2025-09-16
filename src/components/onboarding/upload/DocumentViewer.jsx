import PropTypes from 'prop-types';

const DocumentViewer = ({ url }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    }}>
      <embed
        src={url}
        type="application/pdf"
        style={{
          maxWidth: 800,
          width: '100%',
          minHeight: 800,
          border: '1px solid #bbb',
          borderRadius: 8,
          background: '#fff',
        }}
      />
    </div>
  );
};

DocumentViewer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DocumentViewer;