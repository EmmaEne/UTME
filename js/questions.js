// JAMB CBT Mock Question Database
// Counts: English (60), Math (40), Physics (40), Chemistry (40)

const questionsData = {
    "English": [],
    "Mathematics": [],
    "Physics": [],
    "Chemistry": []
};

// Helper to generate mock questions
function generateMockQuestions(subject, count) {
    const list = [];
    const subjectsMeta = {
        "English": {
            samples: [
                "Select the word that is nearest in meaning to the underlined word.",
                "Choose the option that best completes the sentence.",
                "Identify the correctly spelled word from the options.",
                "Which part of speech is the underlined word?",
                "Select the appropriate preposition for the gap."
            ],
            options: [["Subtle", "Obvious", "Crucial", "Minor"], ["is", "are", "was", "were"], ["Accommodation", "Accomodation", "Acomodation", "Accommodatoin"]]
        },
        "Mathematics": {
            samples: ["Solve for x", "Find the area of", "Calculate the value of", "What is the square root of", "Solve the quadratic equation"],
            options: [["10", "20", "30", "40"], ["5", "10", "15", "20"], ["45", "90", "180", "360"]]
        },
        "Physics": {
            samples: ["What is the SI unit of", "Define the law of", "Calculate the velocity of", "The rate of change of", "Identify the vector quantity"],
            options: [["Joule", "Newton", "Watt", "Pascal"], ["Meters", "Seconds", "Kilograms", "Amperes"]]
        },
        "Chemistry": {
            samples: ["What is the atomic number of", "Identify the noble gas", "The formula for", "Is the substance acidic or basic?", "Which element belongs to"],
            options: [["Hydrogen", "Helium", "Lithium", "Beryllium"], ["H2O", "CO2", "NaCl", "HCl"]]
        }
    };

    const meta = subjectsMeta[subject];

    for (let i = 1; i <= count; i++) {
        const sampleText = meta.samples[i % meta.samples.length];
        const sampleOpts = meta.options[i % meta.options.length];
        
        list.push({
            id: i,
            question: `${sampleText} (Mock Question #${i} for ${subject})`,
            options: sampleOpts || ["Option A", "Option B", "Option C", "Option D"],
            answer: sampleOpts ? sampleOpts[0] : "Option A"
        });
    }
    return list;
}

// Populate with exact JAMB requirement counts
questionsData["English"] = generateMockQuestions("English", 60);
questionsData["Mathematics"] = generateMockQuestions("Mathematics", 40);
questionsData["Physics"] = generateMockQuestions("Physics", 40);
questionsData["Chemistry"] = generateMockQuestions("Chemistry", 40);

// Global export
window.questionsData = questionsData;
