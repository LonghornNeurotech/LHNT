const PRUSSIAN_BLUE = '#003153';
const BONE_WHITE   = '#F9F6EE';

// Competition Info page - only accessible to logged in members
// Provides information about upcoming onboarding competition available for all members
const CompetitionInfo = () => (
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
        Longhorn Neurotech Onboarding Project Competition Information
      </h1>
      <div
        className="pt-4 mb-8 text-prussian_blue"
        style={{ color: PRUSSIAN_BLUE, fontSize: '1.3rem' }}
      >
        Get ready! Once you complete the onboarding modules, you’ll have the chance to put your new skills into action in our Onboarding Project Competition, starting in late October.
      </div>
      <div className="space-y-8">
        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            What is it?
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: PRUSSIAN_BLUE }}>
            The competition is a chance for new members to work in small teams on hands-on neurotech projects inspired by the work that Longhorn Neurotech (LHNT) is currently doing.
          </p>
          <h3
            className="font-bold mb-3 mt-6"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.4rem' }}
          >
            These projects are designed to:
          </h3>
          <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">Give you relevant experience in hardware, software, and research.</li>
            <li className="text-lg leading-relaxed">Help you apply what you learned in the onboarding modules.</li>
            <li className="text-lg leading-relaxed">Provide a strong addition to your resume and CV.</li>
          </ul>
        </section>

        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            How does it work?
          </h2>
          <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">After completing all modules, you’ll form teams with another 4–5 onboarding members.</li>
            <li className="text-lg leading-relaxed">Each team will take on a project challenge related to neurotechnology.</li>
            <li className="text-lg leading-relaxed">Projects will be ranked and evaluated by a judging panel.</li>
            <li className="text-lg leading-relaxed">Your performance will help determine role placement in official LHNT project teams for the year.</li>
          </ul>
        </section>

        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            Why compete?
          </h2>
          <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">Gain real-world neurotech experience that connects directly to our ongoing projects.</li>
            <li className="text-lg leading-relaxed">Meet and collaborate with other motivated new members.</li>
            <li className="text-lg leading-relaxed">Stand out early as you build your place in LHNT.</li>
          </ul>
        </section>

        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            Timeline:
          </h2>
          <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed"><strong>Competition launch:</strong> late October</li>
            <li className="text-lg leading-relaxed"><strong>Final presentations + evaluation:</strong> early December</li>
            <li className="text-lg leading-relaxed"><strong>More details coming soon!</strong></li>
          </ul>
        </section>

        <div className="space-y-4 pt-2">
          <p
            className="text-center font-normal italic"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.5rem', lineHeight: '1.6' }}
          >
            Stay tuned! We’ll be sharing the full competition structure, team formation process, and project prompts in October. We can’t wait to see what you build, create, and innovate!
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CompetitionInfo;