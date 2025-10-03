// This is the footer that displays all of Longhorn Neurotech's sponsors!
import { Link } from "react-router-dom";

const SponsorsWidget = () => {
  return (
    <div className="bg-black w-full py-8 flex flex-col items-center text-white">
      <h2 className="text-4xl text-[#598BBC] font-['Antonio']">Sponsors</h2>
      <div className="md:flex max-sm:grid-cols- max-sm: justify-center gap-20 mt-4 px-4">
        {/* Replace these divs with sponsor images */}
        <Link to="https://santacruzlab.org/" className="h-32 w-64">
          <img
            src="/assets/scl.png"
            alt="Santa Cruz Lab"
            className="h-full w-full object-contain max-sm:h-16 max-sm:w-32"
          />
        </Link>
        <Link to="https://cockrell.utexas.edu/" className="w-1/4 mt-10 ">
          <img
            src="/assets/cse.svg"
            alt="Crockell School of Engineering"
            className="w-full object-contain max-sm:h-16 max-sm:w-32 "
          />
        </Link>
        <Link
          to="https://neurotechx.com/"
          className="w-1/6 mt-10  max-sm:h-8 max-sm:w-16"
        >
          <img
            src="/assets/ntx.png"
            alt="NeuroTechX"
            className="w-full object-contain max-sm:h-16 max-sm:w-32"
          />
        </Link>
        <Link
          to="https://inventionworks.engr.utexas.edu/about"
          className="w-1/12 mt-10  max-sm:h-8 max-sm:w-16"
        >
          <img
            src="/assets/tiw.svg"
            alt="Texas InventionWorks"
            className="w-full object-contain max-sm:h-16 max-sm:w-32"
          />
        </Link>
      </div>
    </div>
  );
};

export default SponsorsWidget;
