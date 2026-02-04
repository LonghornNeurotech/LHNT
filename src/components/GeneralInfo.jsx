// General Info page - only accessible to logged in members
// Provides general information about the onboarding process for members
const PRUSSIAN_BLUE = '#003153';
const BONE_WHITE   = '#F9F6EE';

const GeneralInfo = () => (
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
        Welcome to Longhorn Neurotech Onboarding!
      </h1>
      <div
        className="pt-4 mb-8 text-prussian_blue"
        style={{ color: PRUSSIAN_BLUE, fontSize: '1.3rem' }}
      >
        We’re so excited to have you here. Longhorn Neurotech (LHNT) isn’t just a student organization; it’s a place to learn, build, and explore the future of neurotech together.
      </div>
      <div className="space-y-8">
        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            Why Onboarding?
          </h2>
          <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">
              <strong>Our goal</strong> is to make sure every new member gains real, hands-on knowledge in the areas that power LHNT’s teams: hardware, software, and research.
            </li>
            <li className="text-lg leading-relaxed">
              Onboarding helps you build a strong technical foundation and experience working within teams, so when spring comes around, you’ll be ready to join one of our official project teams.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            How It Works:
          </h2>
          <ol className="list-decimal pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">
              <strong>Hardware vs Software Blocks</strong> The provided onboarding pages are grouped into hardware blocks (for Hardware project teams) and software blocks (for Software project teams). All onboarding blocks are available to all LHNT members, regardless of what team any member is part of.
            </li>
            <li className="text-lg leading-relaxed">
              <strong>General Skills Block:</strong> Everyone completes these core modules to get familiar with either hardware or software basics.
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Specific Skills Blocks:</strong> You’ll work through training tailored to the skillset you were admitted to.
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Module Overview pages:</strong> Each module has a module overview page that introduce the concepts and examples of our projects teams applying those concepts in their projects!
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Required Tasks:</strong> Each submodule may contain a number of required tasks for each member to do. For completing a specific submodule, each member must complete all of the required tasks specified in that specific submodule. If there are no required tasks in the submodule, then visiting that submodule automatically marks that submodule completed.
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Completing a Module:</strong> To complete a specific module, each member must complete all submodules for that module. A checkmark will be visibly marked next to the module in the vertical module navbar to mark your successful completion of that module!
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Onboarding Competition (October to December):</strong> Teams of new members will take on a relevant, hands-on neurotech challenge. Projects will be ranked by our leadership, and the results will help determine spring team placements.
            </li>
          </ol>
        </section>

        <section>
          <h2
            className="font-bold mb-3"
            style={{ color: PRUSSIAN_BLUE, fontSize: '1.75rem' }}
          >
            What’s Next?
          </h2>
          <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
            <li className="text-lg leading-relaxed">
              Get started with your onboarding by heading over to the Member Home page and selecting the Programs & Training button on there. Navigate to either the software or hardware blocks and then choose any specific onboarding block you want to start first.
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Any tasks, submodules, and modules can be completed in any order as you please!</strong> If you encountered any difficulties, head over to the Member Home page and select the Ask Questions / Get Help button to see contact details of people you can contact for help.
            </li>
            <li className="text-lg leading-relaxed">
              <strong>Complete your modules → Team up for the competition → Join your spring project team!</strong>
            </li>
            <li className="text-lg leading-relaxed">
              Along the way, you’ll gain experience you can put on your CV and the confidence to contribute meaningfully to real neurotech projects.
            </li>
          </ul>
        </section>

        <div
          className="text-center font-normal pt-2 italic"
          style={{ color: PRUSSIAN_BLUE, fontSize: '1.5rem', lineHeight: '1.6' }}
        >
          We’re so excited to see what you’ll create. Welcome to the future of neurotechnology at UT!
        </div>
      </div>
    </div>
  </div>
);

export default GeneralInfo;