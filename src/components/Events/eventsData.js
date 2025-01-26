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
        details: `This forum will feature seven interdisciplinary panels led by esteemed 
            professors from neuroscience, computer science, philosophy, physics, arts, and 
            medical fields! There will be thought-provoking discussions on Brain hacking & 
            Ethics, Direct brain-to-brain communication, False memory implantation, and 
            Brain Organoids and Human-AI co-evolution. Please join us at 7:00 PM - 9:00 PM
            at the scheduled date!`,
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
        details: `Join us for a completely online guest speaker session starring Dr. Scott
            Wood from NASA Johnson Space center!`,
        type: `Guest Speaker Talks`,
        images: ["/assets/events/Guest Speaker with Dr. Scott Wood.png"],
    },

    {
        id: 3,
        name: "General Meeting Featuring Dr. Jose Del R. Milan",
        date: new Date("2024-10-21"),
        location: "Burdine Hall 108",
        details: `Synapse is hosting Dr. Jose del R Millan in this general meeting! 
            He’ll be giving a talk on his journey and his work in the exciting field of 
            Brain Computing Interface from 6-7PM at the scheduled date and location! 
            All are welcome, no RSVP or anything. Our very own Tony Chae will also host 
            their Journal Club presentation in this general meeting too!`,
        type: `General Meeting`,
        images: ["/assets/events/General Meeting with Dr. Jose Del R. Milan.png"],
    },

    {
        id: 4,
        name: "Longhorn Neurotech's First General Meeting of the 2024-2025 Year",
        date: new Date("2024-09-11"),
        location: "BME 3.204",
        details: `Longhorn Neurotech's first general meeting of the 2024-2025 year is 
            from 6 PM to 7PM on the scheduled date and location! Learn more about the 
            various opportunties and projects Longhorn Neurotech will provide this year!`,
        type: `General Meeting`,
        images: ["/assets/events/LHNT First General Meeting.png"],
    },

    {
        id: 5,
        name: "Longhorn Neurotech Project Members 2024-2025 Photoshoot",
        date: new Date("2024-11-15"),
        location: "EER Stairway",
        details: `Legendary group photo of all Longhorn Neurotech's 2024-2025 project 
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
            at Neuralink, Dr. Jordan Amadio! A legendary opportunity for our members to 
            learn directly from a leading expert on the past, present, and future 
            development of brain-computer interface technology!`,
        type: `Guest Speaker Talks`,
        images: ["/assets/DrJordan.jpg"],
    }

];

const eventsData =  events.slice().sort((a, b) => b.date - a.date);

export default eventsData;