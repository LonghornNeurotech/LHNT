// Landing page for all logged in members of Longhorn Neurotech!
import { useNavigate } from 'react-router-dom';

const SILVER_LAKE_BLUE = '#5D89BA';
const PRUSSIAN_BLUE = '#003153';
const LIGHT_CREAM = '#FFF8D6';
const VANILLA = '#F3E5AB';
const BONE_WHITE = '#F9F6EE';

const options = [
  { label: 'General Info', enabled: false },
  { label: 'Programs', enabled: true },
  { label: 'Additional Resources', enabled: false },
  { label: 'Completion Information', enabled: false },
  { label: 'Ask Questions', enabled: false },
];

const MemberHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: PRUSSIAN_BLUE,
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        background: BONE_WHITE,
        borderRadius: '18px',
        padding: '2.2em 3em',
        boxShadow: `0 8px 32px 0 ${SILVER_LAKE_BLUE}44`,
        minWidth: '320px',
        maxWidth: '372px',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: PRUSSIAN_BLUE,
          fontWeight: 700,
          fontSize: '2rem',
          marginBottom: '2.2rem',
        }}>
          Member Menu
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1em' }}>
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.enabled ? () => navigate('/programs') : undefined}
              disabled={!opt.enabled}
              style={{
                background: opt.enabled ? SILVER_LAKE_BLUE : VANILLA,
                color: opt.enabled ? LIGHT_CREAM : SILVER_LAKE_BLUE,
                border: 'none',
                borderRadius: '9px',
                padding: '1em 0',
                fontSize: '1.12rem',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: opt.enabled ? 'pointer' : 'not-allowed',
                opacity: opt.enabled ? 1 : 0.6,
                transition: 'background 0.2s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberHome;
