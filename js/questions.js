// JAMB CBT Mock Question Database
// Counts: English (60), Biology (40), Physics (40), Chemistry (40)

const questionsData = {
    "English": [
        {
            id: 1,
            question: "Who is the protagonist of the 2026 JAMB recommended text 'The Lekki Headmaster'?",
            options: ["Mrs. Ibidun Gloss", "Mr. Adewale Adebepo", "Kabir Alabi Garba", "Mr. Stardom"],
            answer: "Mr. Adewale Adebepo"
        },
        {
            id: 2,
            question: "What is the primary dilemma faced by the protagonist in 'The Lekki Headmaster'?",
            options: ["Whether to start a new business or keep teaching", "Whether to stay in Nigeria or migrate to the UK", "Whether to merge Stardom Schools with another institution", "Whether to retire or continue working"],
            answer: "Whether to stay in Nigeria or migrate to the UK"
        },
        {
            id: 3,
            question: "The protagonist in 'The Lekki Headmaster' is the principal of which school?",
            options: ["Lekki International School", "Stardom Schools", "Kabir Memorial College", "Lagos Unity Academy"],
            answer: "Stardom Schools"
        },
        {
            id: 4,
            question: "What is the nickname by which Adewale Adebepo is often called?",
            options: ["Wale", "Bepo", "Headie", "Ade"],
            answer: "Bepo"
        },
        {
            id: 5,
            question: "'The Lekki Headmaster' by Kabir Alabi Garba explores themes of education, integrity, and ____?",
            options: ["Space exploration", "The Japa syndrome", "Ancient mythology", "Maritime law"],
            answer: "The Japa syndrome"
        }
    ],
    "Biology": [],
    "Physics": [],
    "Chemistry": []
};

// Helper to generate mock questions
function generateMockQuestions(subject, count, startId) {
    const list = [];
    const subjectsMeta = {
        "English": {
            samples: [
                "Choose the option that is nearest in meaning to the underlined word: The manager's **clandestine** activities were finally exposed.",
                "Choose the option that best completes the sentence: Neither the students nor their teacher ___ present at the meeting.",
                "Select the correctly spelled word from the options:",
                "From the options, choose the word that has the same vowel sound as 'meat':",
                "Identify the figure of speech in: 'The wind whispered through the trees'."
            ],
            options: [["Secret", "Open", "Legal", "Public"], ["was", "were", "is", "be"], ["Embarrassment", "Embarasment", "Embarassment", "Embarasment"], ["Key", "Great", "Break", "Met"], ["Personification", "Metaphor", "Simile", "Oxymoron"]]
        },
        "Biology": {
            samples: [
                "The organelle responsible for protein synthesis in the cell is:",
                "Which of the following is a characteristic of mammals?",
                "The process by which plants lose water through their leaves is called:",
                "Identify the part of the brain that controls balance and posture:",
                "In which of the following organisms is the contractile vacuole found?"
            ],
            options: [["Ribosome", "Mitochondrion", "Lysosome", "Nucleus"], ["Presence of hair", "Cold-blooded nature", "Laying of eggs", "Branching respiration"], ["Transpiration", "Respiration", "Digestion", "Excretion"], ["Cerebellum", "Cerebrum", "Medulla Oblongata", "Hypothalamus"], ["Amoeba", "Tapeworm", "Snail", "Frog"]]
        },
        "Physics": {
            samples: [
                "Which of the following is a fundamental quantity?",
                "The SI unit of force is:",
                "Calculate the work done when a force of 10N moves an object through 5m:",
                "The rate of change of momentum is equal to:",
                "Which of the following instruments is used to measure atmospheric pressure?"
            ],
            options: [["Luminous Intensity", "Velocity", "Pressure", "Momentum"], ["Newton", "Joule", "Watt", "Pascal"], ["50 J", "15 J", "2 J", "0.5 J"], ["Force", "Power", "Work", "Energy"], ["Barometer", "Thermometer", "Hydrometer", "Altimeter"]]
        },
        "Chemistry": {
            samples: [
                "The phenomenon of an element existing in different forms in the same physical state is known as:",
                "What is the atomic number of Oxygen?",
                "Which of the following is an example of a physical change?",
                "The formula for common salt is:",
                "Which of the following elements is a noble gas?"
            ],
            options: [["Allotropy", "Isotopy", "Isomerism", "Hygroscopy"], ["8", "16", "6", "12"], ["Melting of ice", "Burning of wood", "Rusting of iron", "Souring of milk"], ["NaCl", "KCl", "MgCl2", "CaCl2"], ["Helium", "Hydrogen", "Oxygen", "Nitrogen"]]
        }
    };

    const meta = subjectsMeta[subject];

    for (let i = startId; i <= count; i++) {
        const sampleText = meta.samples[i % meta.samples.length];
        const sampleOpts = meta.options[i % meta.options.length];
        
        list.push({
            id: i,
            question: `${sampleText} (Past Question Style #${i})`,
            options: sampleOpts || ["Option A", "Option B", "Option C", "Option D"],
            answer: sampleOpts ? sampleOpts[0] : "Option A"
        });
    }
    return list;
}

// Populate with exact JAMB requirement counts
questionsData["English"] = questionsData["English"].concat(generateMockQuestions("English", 60, 6));
questionsData["Biology"] = generateMockQuestions("Biology", 40, 1);
questionsData["Physics"] = generateMockQuestions("Physics", 40, 1);
questionsData["Chemistry"] = generateMockQuestions("Chemistry", 40, 1);

// Global export
window.questionsData = questionsData;
