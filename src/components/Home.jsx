/* Home page */
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SponsorsWidget from "./SponsorWidget";
import CarouselComponent from "./Carousel.jsx";
import labImage from "/assets/lab.jpg";
import styles from "./page.module.css";

const Home = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Scroll reveal refs and parameters
  const container = useRef(null);
  const stickyMask = useRef(null);
  const [maskSize, setMaskSize] = useState(100); // Start with larger mask
  const [isVideoSection, setIsVideoSection] = useState(true);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    const handleScroll = () => {
      if (!container.current) return;

      const containerHeight = container.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate progress for the first 100vh of scroll
      const firstSectionProgress = Math.min(scrollPosition / windowHeight, 1);

      // Mask shrinks from 200% to 80% in the first section
      const newSize = 100 + firstSectionProgress * 6000;

      // Update mask size
      if (stickyMask.current) {
        stickyMask.current.style.webkitMaskSize = `${newSize}%`;
        stickyMask.current.style.maskSize = `${newSize}%`;
      }

      setMaskSize(newSize);

      // Check if we've scrolled past the video section
      if (scrollPosition > windowHeight) {
        setIsVideoSection(false);
      } else {
        setIsVideoSection(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial calculation
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, inView]);

  return (
    <main className="w-full overflow-x-hidden">
      {/* Video Scroll Reveal Section */}
      <div ref={container} className={styles.container}>
        <div className={styles.videoWrapper}>
          <div
            ref={stickyMask}
            className={styles.stickyMask}
            style={{
              maskSize: `${maskSize}%`,
              WebkitMaskSize: `${maskSize}%`,
              opacity: isVideoSection ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/nature.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <div
        className={`w-full transition-opacity duration-500 ${
          isVideoSection ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Hero Section with Nature Video */}
        <div className="w-full h-[70vh] bg-black relative">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/assets/nature.mp4" type="video/mp4" />
            </video>
            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-8xl md:text-8xl font-['Antonio'] text-white mb-6 tracking-tight">
                Longhorn Neurotech
              </h1>
              <p className="text-3xl md:text-3xl text-white font-['Antonio']">
                From Brainwaves to Breakthroughs
              </p>
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-['Antonio'] text-[#213C58] mb-12 text-center">
              Who We Are
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ x: -100, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg font=['Anton']">
                Welcome to Longhorn Neurotech, a student organization with a
                singular focus: facilitating your entry into the world of neural
                engineering. Our purpose is to provide you with the knowledge,
                experiences, and connections necessary for a successful career
                in academia or industry. Through active participation in the
                NeuroTechX (NTX) international undergraduate student
                competition, we offer a platform for you to sharpen your skills
                and collaborate with like-minded peers.
              </p>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src={labImage}
                alt="Neurotech Lab"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-[#598BBC] py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: '40%' }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >

            <h2 className="text-5xl font-['Antonio'] text-[#BF5801] mb-12 text-center">
              Our Mission
            </h2>
            <p className="text-lg bg-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
              In addition to competition, we take education seriously. Our club
              is dedicated to creating and curating educational content that
              ensures a deep understanding of neural engineering concepts. We
              believe that a strong foundation is crucial for your growth in
              this complex field. Furthermore, we understand the significance of
              networking. Longhorn Neurotech provides opportunities to connect
              with guest speakers who are established professionals in neural
              engineering.
            </p>
          </motion.div>
        </div>

        {/* Projects Section */}
        <div className="bg-gray-50 py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-5xl font-['Antonio'] text-[#213C58] mb-12 text-center">
              Our Projects
            </h2>
            <div className="mb-20">
              <CarouselComponent />
            </div>
          </motion.div>
        </div>

        {/* Sponsors Section */}
        <SponsorsWidget />
      </div>
    </main>
  );
};

export default Home;
