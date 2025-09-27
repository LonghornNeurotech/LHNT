// Programs Menu to go to Onboarding material for a member!
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SILVER_LAKE_BLUE = '#5D89BA';
const PRUSSIAN_BLUE = '#003153';
const LIGHT_CREAM = '#FFF8D6';
const BONE_WHITE = '#F9F6EE';

const onboardingBlockMap = {
  Software: [
    { label: 'Block 1: General Skills', id: 'softwareB1' },
    { label: 'Block 2: Virtual Reality', id: 'softwareB2' },
    { label: 'Block 3: Signals', id: 'softwareB3' },
    { label: 'Block 4: Machine Learning', id: 'softwareB4' }
  ],
  Hardware: [
    { label: 'Block 1: General Skills', id: 'hardwareB1' },
    { label: 'Block 2: Design', id: 'hardwareB2' },
    { label: 'Block 3: Electronics', id: 'hardwareB3' },
    { label: 'Block 4: Hardware-Software Interfacing', id: 'hardwareB4' }
  ]
};

const ProgramsMenu = () => {
  const [group, setGroup] = useState(null);
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
              {onboardingBlockMap[group].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => navigate(`/onboarding/${id}/0_1`)}
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
                    marginBottom: '0.6em',
                    border: 'none',
                    transition: 'background 0.3s',
                  }}
                >
                  {label}
                </button>
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