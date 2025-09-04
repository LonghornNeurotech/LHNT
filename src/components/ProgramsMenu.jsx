// Programs Menu to go to Onboarding material for a member!
import { useState } from 'react';

const SILVER_LAKE_BLUE = '#5D89BA';
const PRUSSIAN_BLUE = '#003153';
const LIGHT_CREAM = '#FFF8D6';
const VANILLA = '#F3E5AB';
const BONE_WHITE = '#F9F6EE';

// Mapping option sets to PDF files
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
    { label: 'Block 3: Electronics', file: 'Hardware -B3_ Electronics.pdf' },
    { label: 'Block 4: Hardware-Software Interfacing', file: 'Hardware -B4_ Hardware-Software Interfacing.pdf' }
  ]
};

const ProgramsMenu = () => {
  const [group, setGroup] = useState(null);

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
        {!group ? (
          <>
            <h2 style={{
              textAlign: 'center',
              color: PRUSSIAN_BLUE,
              fontWeight: 700,
              fontSize: '1.4rem',
              marginBottom: '2rem',
            }}>
              Which major group are you in?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3em' }}>
              <button
                onClick={() => setGroup('Software')}
                style={{
                  background: SILVER_LAKE_BLUE,
                  color: LIGHT_CREAM,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1em 0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Software
              </button>
              <button
                onClick={() => setGroup('Hardware')}
                style={{
                  background: SILVER_LAKE_BLUE,
                  color: LIGHT_CREAM,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1em 0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Hardware
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{
              textAlign: 'center',
              color: PRUSSIAN_BLUE,
              fontWeight: 700,
              fontSize: '1.3rem',
              marginBottom: '2rem',
            }}>
              Select your onboarding block:
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3em' }}>
              {pdfMap[group].map(({ label, file }) => (
                <a
                    key={file}
                    href={`/onboarding/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        background: SILVER_LAKE_BLUE,
                        color: LIGHT_CREAM,
                        border: 'none',
                        borderRadius: '8px',
                        padding: '1em 0',
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        marginBottom: '0.5em',
                        transition: 'background 0.2s',
                    }}
                >
                    {label}
                </a>
              ))}
              <button
                onClick={() => setGroup(null)}
                style={{
                  background: VANILLA,
                  color: SILVER_LAKE_BLUE,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.9em 0',
                  fontSize: '0.96rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  marginTop: '0.5em',
                  transition: 'background 0.2s',
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
