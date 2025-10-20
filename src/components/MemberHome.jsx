// Landing page for all logged in members of Longhorn Neurotech!
import { useNavigate } from 'react-router-dom';

const SILVER_LAKE_BLUE = '#5D89BA';
const PRUSSIAN_BLUE = '#003153';
const BONE_WHITE = '#F9F6EE';
const DISABLED_STATUS = 'rgba(93,137,186,0.13';

const options = [
  { label: 'General Info', enabled: true, route: '/general-info' },
  { label: 'Programs', enabled: true, route: '/programs' },
  { label: 'Competition Information', enabled: true, route: '/competition-info' },
  { label: 'Ask Questions', enabled: true, route: '/ask-questions' },
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
        width: '90%',
        maxWidth: '600px',
        height: '200%',
        maxHeight: '1200px'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: PRUSSIAN_BLUE,
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 2vw, 3rem)',
          lineHeight: 1.18,
          marginBottom: '2.5rem',
        }}>
          Member Home
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1em' }}>
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.enabled && opt.route ? () => navigate(opt.route) : undefined}
              disabled={!opt.enabled}
              style={{
                background: opt.enabled ? SILVER_LAKE_BLUE : DISABLED_STATUS,
                color: opt.enabled ? BONE_WHITE : SILVER_LAKE_BLUE,
                border: 'none',
                borderRadius: '9px',
                padding: '1.3em 1em',
                fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                fontWeight: 700,
                letterSpacing: '1px',
                cursor: opt.enabled ? 'pointer' : 'not-allowed',
                opacity: opt.enabled ? 1 : 0.6,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (opt.enabled) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
                }
              }}
              onMouseLeave={(e) => {
                if (opt.enabled) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
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
