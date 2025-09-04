// Programs Menu to go to Onboarding material for a member!
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SILVER_LAKE_BLUE = '#5D89BA';
const PRUSSIAN_BLUE = '#003153';
const LIGHT_CREAM = '#FFF8D6';
const BONE_WHITE = '#F9F6EE';

// Mapping option sets to PDF files
// Make sure to match file name here with EXACT file name in onboarding directory!
const pdfMap = {
  Software: [
    { label: 'Block 1: General Skills', file: 'Software - B1_ General Skills.pdf' },
    { label: 'Block 2: Virtual Reality', file: 'Software - B2_ Virtual Reality.pdf' },
    { label: 'Block 3: Signals', file: 'Software - B3_ Signals.pdf' },
    { label: 'Block 4: Machine Learning', file: 'Software - B4_ Machine Learning.pdf' }
  ],
  Hardware: [
    { label: 'Block 1: General Skills', file: 'Hardware - B1_ General Skills.pdf' },
    { label: 'Block 2: Design', file: 'Hardware - B2_ Design.pdf' },
    { label: 'Block 3: Electronics', file: 'Hardware - B3_ Electronics.pdf' },
    { label: 'Block 4: Hardware-Software Interfacing', file: 'Hardware - B4_ Hardware-Software Interfacing.pdf' }
  ]
};

const ProgramsMenu = () => {
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();  // <-- Added navigate hook

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
        padding: '3em 3.3em',
        boxShadow: `0 8px 32px 0 ${SILVER_LAKE_BLUE}44`,
        minWidth: '320px',
        maxWidth: '400px',
      }}>
        {!group ? (
          <>
            <h2 style={{
              textAlign: 'center',
              color: PRUSSIAN_BLUE,
              fontWeight: 700,
              fontSize: '2.3rem',
              lineHeight: 1.14,
              marginBottom: '1em',
            }}>
              Which team are you in?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3em' }}>
              <button
                onClick={() => setGroup('Software')}
                style={{
                  background: SILVER_LAKE_BLUE,
                  color: BONE_WHITE,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1.3em 0',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                Software
              </button>
              <button
                onClick={() => setGroup('Hardware')}
                style={{
                  background: SILVER_LAKE_BLUE,
                  color: BONE_WHITE,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1.3em 0',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                Hardware
              </button>

              {/* <-- Added Back button here to allow user to navigate back to MemberHome */}
              <button
                onClick={() => navigate('/member')}
                style={{
                  background: PRUSSIAN_BLUE,
                  color: LIGHT_CREAM,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.8em 0',
                  fontSize: '1.19rem',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  cursor: 'pointer',
                  marginTop: '1em',
                  transition: 'background 0.3s',
                }}
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{
              textAlign: 'center',
              color: PRUSSIAN_BLUE,
              fontWeight: 700,
              fontSize: '2.2rem',
              lineHeight: 1.15,
              marginBottom: '1em',
            }}>
              Select your onboarding block
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
              {pdfMap[group].map(({ label, file }) => (
                <a
                  key={file}
                  href={`/onboarding/${encodeURIComponent(file)}`}  // <-- Added encodeURIComponent for safety with spaces in filenames
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: SILVER_LAKE_BLUE,
                    color: BONE_WHITE,
                    borderRadius: '10px',
                    padding: '1.14em 0',
                    fontSize: '1.28rem',
                    fontWeight: 700,
                    letterSpacing: '1.1px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    marginBottom: '0.6em',
                    transition: 'background 0.3s',
                  }}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => setGroup(null)}
                style={{
                  background: PRUSSIAN_BLUE,
                  color: LIGHT_CREAM,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.8em 0',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  marginTop: '1em',
                  transition: 'background 0.3s',
                }}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramsMenu;