// Landing page for all logged in members of Longhorn Neurotech!
import { useNavigate } from 'react-router-dom';

const SILVER_LAKE_BLUE = '#5D89BA';
const PRUSSIAN_BLUE = '#003153';
const BONE_WHITE = '#F9F6EE';
const DISABLED_STATUS = 'rgba(93,137,186,0.13';

const options = [
  { label: 'General Info', enabled: true, route: '/general-info' },
  { label: 'Programs', enabled: true, route: '/programs' },
  { label: 'Additional Resources', enabled: false },
  { label: 'Competition Information', enabled: true, route: '/competition-info' },
  { label: 'Contact Us', enabled: true, route: '/contact-us' },
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
          fontSize: '2.5rem',
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
                padding: '1.3em 0',
                fontSize: '1.35rem',
                fontWeight: 700,
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
