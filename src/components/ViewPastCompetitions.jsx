import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';

const PRUSSIAN_BLUE = '#003153';
const BONE_WHITE = '#F9F6EE';
const SILVER_LAKE_BLUE = '#5D89BA';

// Photo carousel component
const PhotoCarousel = ({ title, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!items || items.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="space-y-4">
      <h2 className="font-bold" style={{ color: PRUSSIAN_BLUE, fontSize: '1.8rem' }}>
        {title}
      </h2>
      <div className="relative w-full">
        <style>
          {`
            .carousel-control-prev,
            .carousel-control-next {
              width: 80px !important;
              height: 80px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              background: rgba(0, 0, 0, 0.3) !important;
              border-radius: 50% !important;
              margin: 0 2rem !important;
              opacity: 0.7 !important;
              transition: all 0.3s ease !important;
              z-index: 10 !important;
            }

            .carousel-control-prev:hover,
            .carousel-control-next:hover {
              background: rgba(0, 0, 0, 0.6) !important;
              opacity: 1 !important;
            }

            .carousel-control-prev-icon,
            .carousel-control-next-icon {
              width: 40px !important;
              height: 40px !important;
            }

            .carousel-indicators {
              z-index: 10 !important;
            }

            .carousel-item {
              transition: transform 0.6s ease-in-out !important;
            }
          `}
        </style>
        <BootstrapCarousel
          className="rounded-2xl overflow-hidden"
          interval={5000}
          controls={items.length > 1}
          indicators={items.length > 1}
          onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
        >
          {items.map((item) => (
            <BootstrapCarousel.Item key={item.src}>
              <div
                className="relative w-full h-[440px] overflow-hidden cursor-pointer"
                style={{ background: '#0b0f14' }}
                onClick={() => setIsFullscreen(true)}
              >
                <img
                  className="w-full h-full object-contain"
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                />
              </div>
            </BootstrapCarousel.Item>
          ))}
        </BootstrapCarousel>
      </div>

      {/* Show enlarged version of the photo for users to easily see against a shaded background of page */}
      {isFullscreen &&
        createPortal(
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            {/* Button to exit display of enlarged photo */}
            <button
              type="button"
              className="absolute top-4 right-4 text-white text-2xl p-2 rounded-full hover:bg-white/10"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close full screen image"
            >
              ✕
            </button>

            {/* Previous and Next navigation button for the enlarged photo */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={goToPrevious}
                  className="carousel-control-prev"
                  style={{ left: '2rem' }}
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={goToNext}
                  className="carousel-control-next"
                  style={{ right: '2rem' }}
                >
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                </button>
              </>
            )}
            <img
              src={items[activeIndex].src}
              alt={items[activeIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>,
          document.body
        )}
    </section>
  );
};

PhotoCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Past competition photos data that includes each photos' direct image URL
const ViewPastCompetitions = () => {
  const photoLinks = useMemo(
    () => [
      {
        alt: 'Past competition photo 1',
        src: 'https://prod-resources-birch.joinswsh.com/cache/v0/gathering/b58bff09-11ba-44ab-9171-795dd1b70b0b/photos/2dd2d131-34cb-489f-8112-9ed29b467686/956e37fa-0371-457c-b144-006d057eaef0/optimize/xxl/1x1/inside/jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcm9kLXJlc291cmNlcy1iaXJjaC5qb2luc3dzaC5jb20vY2FjaGUvdjAvZ2F0aGVyaW5nL2I1OGJmZjA5LTExYmEtNDRhYi05MTcxLTc5NWRkMWI3MGIwYi9waG90b3MvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3MTE3NDgwMH19fV19&Key-Pair-Id=K1JZNMMJVUO2SG&Signature=Nt9vCHxCAaquaG0uiEECYSp42kh-NTPA2vZD81daV3e9gg6~ttLF1EBPfk42QHVYn-Zrv4SouhDJAJfv82KbY6yt9v81~nHk7Qtn-N6qdu7gZzH2o9wc1sjDhsU3fMzfg04h9UGZHpHnaBLOYEFb4rKNs-R~-pPbw42CbIcZDcWF8AtTSR3sgtaQjrx5pAzCh38v~QI5DmDzvRMtrCsIvqPaOmPY-HoAXowbFkAuMYqoxOtsXQsRGNvjLXu813ASehFwCQpcIcRIpoRCoq~0S-J21iSXTRDCYi9NRiQ-1lV6js0de536dSqcGDQC30VSjKU2Yw~T8KA3MPkY-Z7Kjg__',
      },
      {
        alt: 'Past competition photo 2',
        src: 'https://prod-resources-birch.joinswsh.com/cache/v0/gathering/b58bff09-11ba-44ab-9171-795dd1b70b0b/photos/2dd2d131-34cb-489f-8112-9ed29b467686/6cd1d9bf-647f-4e99-b55e-1c317de7e4d2/optimize/xxl/1x1/inside/jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcm9kLXJlc291cmNlcy1iaXJjaC5qb2luc3dzaC5jb20vY2FjaGUvdjAvZ2F0aGVyaW5nL2I1OGJmZjA5LTExYmEtNDRhYi05MTcxLTc5NWRkMWI3MGIwYi9waG90b3MvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3MTE3NDgwMH19fV19&Key-Pair-Id=K1JZNMMJVUO2SG&Signature=Nt9vCHxCAaquaG0uiEECYSp42kh-NTPA2vZD81daV3e9gg6~ttLF1EBPfk42QHVYn-Zrv4SouhDJAJfv82KbY6yt9v81~nHk7Qtn-N6qdu7gZzH2o9wc1sjDhsU3fMzfg04h9UGZHpHnaBLOYEFb4rKNs-R~-pPbw42CbIcZDcWF8AtTSR3sgtaQjrx5pAzCh38v~QI5DmDzvRMtrCsIvqPaOmPY-HoAXowbFkAuMYqoxOtsXQsRGNvjLXu813ASehFwCQpcIcRIpoRCoq~0S-J21iSXTRDCYi9NRiQ-1lV6js0de536dSqcGDQC30VSjKU2Yw~T8KA3MPkY-Z7Kjg__',
      },
      {
        alt: 'Past competition photo 3',
        src: 'https://prod-resources-birch.joinswsh.com/cache/v0/gathering/b58bff09-11ba-44ab-9171-795dd1b70b0b/photos/2dd2d131-34cb-489f-8112-9ed29b467686/7bd1b712-92a3-4d8d-a0bf-685a2fcd534e/optimize/xxl/1x1/inside/jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcm9kLXJlc291cmNlcy1iaXJjaC5qb2luc3dzaC5jb20vY2FjaGUvdjAvZ2F0aGVyaW5nL2I1OGJmZjA5LTExYmEtNDRhYi05MTcxLTc5NWRkMWI3MGIwYi9waG90b3MvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3MTE3NDgwMH19fV19&Key-Pair-Id=K1JZNMMJVUO2SG&Signature=Nt9vCHxCAaquaG0uiEECYSp42kh-NTPA2vZD81daV3e9gg6~ttLF1EBPfk42QHVYn-Zrv4SouhDJAJfv82KbY6yt9v81~nHk7Qtn-N6qdu7gZzH2o9wc1sjDhsU3fMzfg04h9UGZHpHnaBLOYEFb4rKNs-R~-pPbw42CbIcZDcWF8AtTSR3sgtaQjrx5pAzCh38v~QI5DmDzvRMtrCsIvqPaOmPY-HoAXowbFkAuMYqoxOtsXQsRGNvjLXu813ASehFwCQpcIcRIpoRCoq~0S-J21iSXTRDCYi9NRiQ-1lV6js0de536dSqcGDQC30VSjKU2Yw~T8KA3MPkY-Z7Kjg__',
      },
      {
        alt: 'Past competition photo 4',
        src: 'https://prod-resources-birch.joinswsh.com/cache/v0/gathering/b58bff09-11ba-44ab-9171-795dd1b70b0b/photos/2dd2d131-34cb-489f-8112-9ed29b467686/5cec10d5-fbd4-42e1-b645-2d5ee6f0aa4c/optimize/xxl/1x1/inside/jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcm9kLXJlc291cmNlcy1iaXJjaC5qb2luc3dzaC5jb20vY2FjaGUvdjAvZ2F0aGVyaW5nL2I1OGJmZjA5LTExYmEtNDRhYi05MTcxLTc5NWRkMWI3MGIwYi9waG90b3MvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3MTE3NDgwMH19fV19&Key-Pair-Id=K1JZNMMJVUO2SG&Signature=Nt9vCHxCAaquaG0uiEECYSp42kh-NTPA2vZD81daV3e9gg6~ttLF1EBPfk42QHVYn-Zrv4SouhDJAJfv82KbY6yt9v81~nHk7Qtn-N6qdu7gZzH2o9wc1sjDhsU3fMzfg04h9UGZHpHnaBLOYEFb4rKNs-R~-pPbw42CbIcZDcWF8AtTSR3sgtaQjrx5pAzCh38v~QI5DmDzvRMtrCsIvqPaOmPY-HoAXowbFkAuMYqoxOtsXQsRGNvjLXu813ASehFwCQpcIcRIpoRCoq~0S-J21iSXTRDCYi9NRiQ-1lV6js0de536dSqcGDQC30VSjKU2Yw~T8KA3MPkY-Z7Kjg__',
      },
      {
        alt: 'Past competition photo 5',
        src: 'https://prod-resources-birch.joinswsh.com/cache/v0/gathering/b58bff09-11ba-44ab-9171-795dd1b70b0b/photos/2dd2d131-34cb-489f-8112-9ed29b467686/6d88c45d-093d-4d1d-8652-717c95357207/optimize/xxl/1x1/inside/jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcm9kLXJlc291cmNlcy1iaXJjaC5qb2luc3dzaC5jb20vY2FjaGUvdjAvZ2F0aGVyaW5nL2I1OGJmZjA5LTExYmEtNDRhYi05MTcxLTc5NWRkMWI3MGIwYi9waG90b3MvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3MTE3MTIwMH19fV19&Key-Pair-Id=K1JZNMMJVUO2SG&Signature=jZzEbYBYyyCpq9klLWVRiYxTjNW7GZY0R7wdq8fvyFDdK7OztiV0PR4w5H91mPhFeCODFaCr2Nwlaw9KZHWBb4yWjrDWt0QgZDcVkLn65zliql62FRNRocJkdX38Gxl7BNyZQ5uFpXQnyXfIb6jbthhyTfxINeab2FTHTI94SDcwYqIZ5Oev4fNaCmkEDNt~URbUpQXA8M2XG65ZGuYVvez5PL6O51j5~x-IOOrkuN1aFCGb5lntYh1FOcaUq4XXkC9Fb46UGDqZ3y9~NmOhwFMwfreDJiE5co~g11u~~FvaeZH4dcLuwdlXHakvny7a9BAvqbO2l8Hjx6KILwgnRQ__',
      },
    ],
    []
  );

  // Presentation slides by members in past compeittions data, including viewable links and labels
  const slideLinks = useMemo(
    () => [
      {
        label: 'LHNT EEG-Controlled Beds',
        href: 'https://drive.google.com/file/d/1T77akeb97Yeyou1nG86EzTL3Io5Z5Cz9/view?usp=sharing',
      },
      {
        label: 'LHNT Prosthetic Infrared Sensors',
        href: 'https://drive.google.com/file/d/16UTgtYQ0uXUvFBD36k27L6zJIImOWoI7/view?usp=sharing',
      },
      {
        label: 'LHNT The Brain Brick Car',
        href: 'https://drive.google.com/file/d/1beELekrl1ov1cZRwilXsu1qA20UTdWBZ/view?usp=sharing',
      },
    ],
    []
  );

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-10"
      style={{ background: PRUSSIAN_BLUE }}
    >
      {/* Card containing contents of the View Past Competitions page */}
      <div
        className="rounded-2xl p-8 md:p-12 max-w-5xl w-full shadow-2xl space-y-10"
        style={{ background: BONE_WHITE }}
      >
        {/* Header for Past Competitions page */}
        <header className="space-y-3">
          <h1
            className="text-center font-bold"
            style={{ color: PRUSSIAN_BLUE, fontSize: '2.6rem', lineHeight: '1.2' }}
          >
            View Past Competitions
          </h1>
          <p className="text-center text-lg" style={{ color: PRUSSIAN_BLUE }}>
            Explore highlights and notable presentation slides from our first-ever onboarding competition for our project members hosted on Fall 2025!
          </p>
        </header>

        {/* Carousel of past competitions photos */}
        <PhotoCarousel title="Past Competition Photos" items={photoLinks} />

        {/* Past Presentation slides links section */}
        {slideLinks.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-bold" style={{ color: PRUSSIAN_BLUE, fontSize: '1.8rem' }}>
              Past Presentation Slides
            </h2>
            <ul className="list-disc pl-6 space-y-2" style={{ color: PRUSSIAN_BLUE }}>
              {slideLinks.map((slide) => (
                <li key={slide.href} className="text-lg">
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: SILVER_LAKE_BLUE }}
                  >
                    {slide.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ViewPastCompetitions;
