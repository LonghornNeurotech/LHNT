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
    // { label: 'Block 2: Virtual Reality', id: 'softwareB2' },  // For now software onboarding block 2 is hidden because it's temporarily not needed but still keep the data for it not deleted.
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
        padding: '2.2em 3em',
        boxShadow: `0 8px 32px 0 ${SILVER_LAKE_BLUE}44`,
        width: '90%',
        maxWidth: '600px',
        height: '200%',
        maxHeight: '1200px'
      }}>
        {!group ? (
          <>
            <h2 style={{
              textAlign: 'center',
              color: PRUSSIAN_BLUE,
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 2vw, 3rem)',
              lineHeight: 1.18,
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
                  padding: '1.3em 1em',
                  fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
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
                  padding: '1.3em 1em',
                  fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
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
                  padding: '0.8em 1em',
                  fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  marginTop: '0.6em',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
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
              fontSize: 'clamp(2.5rem, 2vw, 3rem)',
              lineHeight: 1.18,
              marginBottom: '1em',
            }}>
              Select your onboarding block
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1em' }}>
              {onboardingBlockMap[group].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => navigate(`/onboarding/${id}/1_0`)}
                  style={{
                    background: SILVER_LAKE_BLUE,
                    color: BONE_WHITE,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '1.3em 1em',
                    fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
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
                  padding: '0.8em 1em',
                  fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  marginTop: '0.6em',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px 0 ${SILVER_LAKE_BLUE}66`;
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