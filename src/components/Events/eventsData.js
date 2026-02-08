/*  
    eventsData.js 

    The place to manually add, remove, or change
    any information about any Event for LHNT

    Just include each event as an object inside the 
    array [] like this:
    { 
        id: ,
        name: "Name of event",
        date: new Date("Date of event"),
        location: "Where event is happening",
        details: `Details about the event, including location 
            like {this.location} and date of event like
            {this.date}`,
        type: `Specify type of event`
        images: ["Place URL of event images here", "Place URL of more event images here"],
    }, 

    The event's type is associated with the type of event it is:
        * Project Meeting       (project members meetings)
        * General Meeting       (general meetings available for all)
        * Guest Speaker Talks   (guest speaker meetings)
        * Social Event          (social hangouts with members of LHNT)
    
*/

const events = [

    {
        id: 1,
        name: "Longhorn Neurotech x Sypnase Future of Neural Engineering Forum",
        date: new Date("2024-11-18"),
        location: "Welch Hall 2.224, University of Texas at Austin",
        details: `We featured seven interdisciplinary panels in an engaging forum led by esteemed 
            professors from neuroscience, computer science, philosophy, physics, arts, and 
            medical fields! Our guest speakers shared thought-provoking discussions with our members on Brain hacking & 
            Ethics, Direct brain-to-brain communication, False memory implantation, and 
            Brain Organoids and Human-AI co-evolution.`,
        type: `Guest Speaker Talks`,
        images: ["/assets/events/Longhorn Neurotech + Synapse Guest Speaker Panel.png", "/assets/events/DSCF0547.JPG", 
            "/assets/events/DSCF0600.JPG", "/assets/events/DSCF0607.JPG", "/assets/events/DSCF0611.JPG",
            "/assets/events/DSCF0617.JPG", "/assets/events/DSCF0650.JPG", "/assets/events/DSCF0657.JPG",
            "/assets/events/DSCF0659.JPG"],
        files: [
            {
                type: "pdf",
                name: "Future of Neural Engineering Forum Questions",
                link: "/assets/events/Final Three _  Forum Questions.docx.pdf"
            }
        ]
    },

    {
        id: 2,
        name: "Guest Speaker Dr. Scott Wood Talk",
        date: new Date("2024-11-04"),
        location: "Online on Zoom",
        details: `We hosted a completely online guest speaker session starring Dr. Scott
            Wood from NASA Johnson Space center!`,
        type: `Guest Speaker Talks`,
        images: ["/assets/events/Guest Speaker with Dr. Scott Wood.png"],
    },

    {
        id: 3,
        name: "General Meeting Featuring Dr. Jose Del R. Milan",
        date: new Date("2024-10-21"),
        location: "Burdine Hall 108",
        details: `We hosted Dr. Jose del R Millan in this general meeting! 
            His talk about his journey and his work in the exciting field of 
            Brain Computing Interface had furthered provided valuable insight for all 
            attendees who had looked to take their next step towards this field.
            Also, our very own Tony Chae had hosted their Journal Club presentation 
            in this general meeting too!`,
        type: `General Meeting`,
        images: ["/assets/events/General Meeting with Dr. Jose Del R. Milan.png"],
    },

    {
        id: 4,
        name: "Longhorn Neurotech's First General Meeting of the 2024-2025 Year",
        date: new Date("2024-09-11"),
        location: "BME 3.204",
        details: `We kickstarted Longhorn Neurotech's first general meeting of the 2024-2025 year 
            from 6 PM to 7PM on the scheduled date and location! Our officers provided all attendees
            a wonderful, detailed introduction to Longhorn Neurotech organization and the various 
            opportunties for prospective memebers to work in teams on many exciting projects 
            planned out for the 2024-2025 year! If you missed this event, don't worry. We host 
            the first general meeting of each year covering this content and the opportunties 
            to join Longhorn Neurotech someday in September each year!`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT First General Meeting.png"],
    },

    {
        id: 5,
        name: "Longhorn Neurotech Project Members 2024-2025 Photoshoot",
        date: new Date("2024-11-15"),
        location: "EER Stairway",
        details: `A legendary group photo of all Longhorn Neurotech's 2024-2025 project 
            members!`,
        type: `Project Meeting`,
        images: ["/assets/lab.jpg"],
    },

    {
        id: 6,
        name: "Exclusive Guest Speaker Talk with the renowned Dr. Jordan Amadio",
        date: new Date("2024-10-28"),
        location: "FAC 21",
        details: `Our Longhorn Neurotech project members are in for a treat: an 
            exclusive guest speaker talk and Q&A session with the director of neurosurgery 
            at Neuralink, Dr. Jordan Amadio! A legendary opportunity for our members to have
            learned directly from a leading expert on the past, present, and future 
            development of brain-computer interface technology!`,
        type: `Guest Speaker Talks`,
        images: ["/assets/DrJordan.jpg"],
    },

    {
        id: 7,
        name: "Guest Speakers Dr. Justin Kilmarx and Dr. Ivan Tashev talk",
        date: new Date("2024-10-09"),
        location: "The University of Texas at Austin",
        details: `We hosted Dr. Justin Kilmarx and Dr. Ivan Tashev, researchers from the
            Brain-Computer Interfaces project in Microsoft Research, in an engaging, in-person
            talk.`,
        type: `Guest Speaker Talks`,
        images: ["/assets/events/justin.png", "/assets/events/ivan_tashev.png"]
    },

    {
        id: 8,
        name: "Info Session #1",
        date: new Date("2025-09-09"),
        location: "Zoom",
        details: `We hosted our first info session of the 2025-2026 year remotely on Zoom,
            where our officers provided all attendees a wonderful, detailed introduction to Longhorn Neurotech organization and the various 
            opportunties for prospective memebers to work in teams on many exciting projects 
            planned out for the 2025-2026 year! If you missed this event, don't worry. There's another 
            info session on September 16, 2025 you can attend to learn about Longhorn Neurotech and the opportunties to join us.`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT Info Sessions.jpg"]
    },

    {
        id: 9,
        name: "Fall Kickoff Meeting",
        date: new Date("2025-09-14"),
        location: "TIW Headquarters in EER building",
        details: `We kickstarted our first project meeting to welcome all of our project members for another exciting, project-filled year! 
            Our project members have been introduced to all of our officers from the project team and presidential team for the 2025-2026 year
            and immediately began their onboarding process.`,
        type: `Project Meeting`,
        images: ["/assets/events/Fall 25 Kickoff.jpg"]
    },

    {
        id: 10,
        name: "Info Session #2",
        date: new Date("2025-09-16"),
        location: "BME Seminar Room",
        details: `We hosted our second info session of the 2025-2026 year in-person at BME Seminar Room,
            where our officers provided all attendees a wonderful, detailed introduction to Longhorn Neurotech 
            organization and the various opportunties for prospective memebers to work in teams on many exciting 
            projects planned out for the 2025-2026 year! If you missed this event, don't worry. We'll host 
            more info sessions and open up opportunties for prospective members to join us someday near the start 
            of next semester!`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT Info Sessions.jpg", "/assets/events/LHNT Info Session 2.jpg"]
    },

    {
        id: 11,
        name: "Journal Club Meeting #1",
        date: new Date("2025-10-19"),
        location: "EER 3.642D",
        details: `We hosted our first journal club meeting of the 2025-2026 year, open to anyone!
            There will be Journal Club meetings every other Sunday in the EER 3.642D from 3PM to 4PM, and interesting 
            discussion about neuroscience foudnations and novel neural engineering tools are included!`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT Journal Club.jpg"]
    },

    {
        id: 12,
        name: "Journal Club Meeting #2",
        date: new Date("2025-11-02"),
        location: "EER 3.642D",
        details: `We hosted our second journal club meeting of the 2025-2026 year, open to anyone! 
            Our Signals Lead and R&D Research Lead led an interesting discussion about neuromodulation and the Inverse
            Electrophysiology: Inferring Neuronal Characteristics from Optimal Stimulation Waveforms Using Machine Learning.
            There will be Journal Club meetings every other Sunday in the EER 3.642D from 3PM to 4PM, and interesting 
            discussion about neuroscience foudnations and novel neural engineering tools are included!`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT Journal Club.jpg"]
    },

    {
        id: 13,
        name: "Journal Club Meeting #3",
        date: new Date("2025-11-16"),
        location: "EER 3.642D",
        details: `We hosted our third journal club meeting of the 2025-2026 year, open to anyone!
            Our Signals Lead discussed about his paper covering the multimodal apporaches in mental state detection,
            and our R&D Research member discussed his paper covering on the workload estimator.
            There will be Journal Club meetings every other Sunday in the EER 3.642D from 3PM to 4PM, and interesting 
            discussion about neuroscience foudnations and novel neural engineering tools are included!`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT Journal Club.jpg"]
    },

    {
        id: 14,
        name: "Dr. Ilya Pyatnitskiy Talk",
        date: new Date("2025-11-09"),
        location: "WEL 1.316",
        details: `Dr. Ilya Pyatnitskiy, CEO of Neurawear and Co-Director of Wang Lab at UT BME, joined us in a special guest talk 
            to share his personal journey building his startup from a clinical, research, and entrepreneurial perspective. Dr. Pyatnitskiy 
            also shared about the interesting works being done at Neurawear: developing non-invasive devices for recording & stimulating 
            brain and peripheral neural activity using advanced hydrogen EEG electrodes and compact wearable ultrasound transducers. 
            Neurawear, affiliated with Wang Lab at UT as well as Dell Med, embarks on a mission to empower 
            clinicians and researchers worldwide with non-invasive tools that provide deeper insights into 
            neurological challenges and stimulate deep brain regions, ultimately transforming patient care and advancing our understanding 
            of the brain. We had a packed house for this talk, and our members eagerly received valuable insights about building a startup 
            and the kind of development into innovative wearable technology that Neurawear does!`,
        type: `Guest Speaker Talk`,
        images: ["/assets/events/Pyatnitskiy Talk.jpg", "/assets/events/Pyatnitskiy Talk Event.jpg", "/assets/events/Pyatnitskiy Talk Post-Talk.jpg"]
    },

    {
        id: 15,
        name: "Onboarding Competition Kickoff",
        date: new Date("2025-11-09"),
        location: "EER 3.642",
        details: `We kickstarted our organization's first-ever onboarding competition for our project members to participate!`,
        type: `Project Meeting`,
        images: []
    },

    {
        id: 16,
        name: "World of Engineering",
        date: new Date("2025-11-08"),
        location: "EER 0th Floor Lobby",
        details: `We showcased our EEG & Rover technology that our project members worked on and offered hands-on activities 
            for all attendees at the World of Engineering event!`,
        type: `Social Events`,
        images: ["/assets/events/World of Engineering Photo 1.jpg", 
            "/assets/events/World of Engineering Photo 2.jpg",
            "/assets/events/World of Engineering Photo 3.jpg",
            "/assets/events/World of Engineering Photo 4.jpg",
        ]
    },

    {
        id: 17,
        name: "LHNT Profit Share at Noam's Gelato & Bean",
        date: new Date("2025-09-24"),
        location: "2512 Rio Grande St, Austin, TX 78705",
        details: `We hosted a profit share, where our members enjoyed ice cream from Noam's Gelato & Bean and network with other members! It's a packed event!`,
        type: `Social Events`,
        images: ["/assets/events/Profit Share Photo 1.jpg", 
            "/assets/events/Profit Share Photo 2.jpg"
        ]
    },

];

const eventsData =  events.slice().sort((a, b) => b.date - a.date);

export default eventsData;