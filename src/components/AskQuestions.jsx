const PRUSSIAN_BLUE = '#003153';
const BONE_WHITE   = '#F9F6EE';

// Ask Questions page - only accessible to logged in members
// Provides contact information for members to reach out if have any questions about onboarding process
const AskQuestions = () => (
  <div
    className="min-h-screen flex justify-center items-center px-4 py-8"
    style={{ background: PRUSSIAN_BLUE }}
  >
    <div
      className="rounded-2xl p-8 md:p-12 max-w-4xl w-full shadow-2xl"
      style={{ background: BONE_WHITE }}
    >
      <h1
        className="text-center font-bold"
        style={{ color: PRUSSIAN_BLUE, fontSize: '2.5rem', lineHeight: '1.2' }}
      >
        Contact Us
      </h1>
      <div
        className="pt-4 mb-8 text-prussian_blue"
        style={{ color: PRUSSIAN_BLUE, fontSize: '1.3rem' }}
      >
        We’re here to help! If you have any questions while completing the onboarding modules, please reach out to the appropriate contact below:
      </div>

      <div className="space-y-8">
        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            General Questions:
          </h2>
          <ul className="space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">
              <strong>Netta Blinchevsky</strong> (Education Lead) — <a href="mailto:nettablin@utexas.edu" className="text-blue-600 hover:underline">nettablin@utexas.edu</a>
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Raquel Paz Bergia</strong> (President) — <a href="mailto:raquelpazbergia@utexas.edu" className="text-blue-600 hover:underline">raquelpazbergia@utexas.edu</a>
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            Technical Questions:
          </h2>
          <div className="space-y-6">
            <div>
              <h3
                className="font-bold mb-2"
                style={{ color: PRUSSIAN_BLUE, fontSize: '1.4rem' }}
              >
                Hardware Team
              </h3>
              <ul className="space-y-2" style={{ color: PRUSSIAN_BLUE }}>
                <li className="text-lg leading-relaxed">
                  <strong>Victor (Vic) Moran</strong> (Hardware Director) — <a href="mailto:vic.rw.moran@gmail.com" className="text-blue-600 hover:underline">vic.rw.moran@gmail.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className="font-bold mb-2"
                style={{ color: PRUSSIAN_BLUE, fontSize: '1.4rem' }}
              >
                Software Team
              </h3>
              <ul className="space-y-2" style={{ color: PRUSSIAN_BLUE }}>
                <li className="text-lg leading-relaxed">
                  <strong>Alex Johnson</strong> (Software Director) — <a href="mailto:alexdjohnson74@utexas.edu" className="text-blue-600 hover:underline">alexdjohnson74@utexas.edu</a>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className="font-bold mb-2"
                style={{ color: PRUSSIAN_BLUE, fontSize: '1.4rem' }}
              >
                Research Team
              </h3>
              <ul className="space-y-2" style={{ color: PRUSSIAN_BLUE }}>
                <li className="text-lg leading-relaxed">
                  <strong>Aryan Roghani</strong> (R&amp;D Director) — <a href="mailto:aryanroghani4444@gmail.com" className="text-blue-600 hover:underline">aryanroghani4444@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div
          className="text-center font-normal pt-2 italic"
          style={{ color: PRUSSIAN_BLUE, fontSize: '1.5rem', lineHeight: '1.6' }}
        >
          We encourage you to contact the team that best fits your question, but if you’re unsure where to start, feel free to reach out to Netta, and she’ll connect you with the right person.
        </div>
      </div>
    </div>
  </div>
);

export default AskQuestions;