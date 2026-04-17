const candidateProfileGirl = {
    reg: '202662224846EH',
    fullName: 'AGBOR PATRA NYEN-OME',
    photo: 'assets/Images/passport.jpeg',
    examNumber: 'C00809235',
    examCentre: "K'ELIZ INTERNATIONAL SCHOOL CBT.MBUTU ISIAHIA UMUEJIJE OSISIOMA NGWA L.G. A. ABIA STATE.",
    subjectCombination: 'Use of English, Physics, Biology, Chemistry'
};

const candidateProfileDummyOne = {
    reg: '202699887654AA',
    fullName: 'EMMANUELLA KUNLE OBI',
    photo: 'assets/Images/emmanuella-passport.jpeg',
    examNumber: 'C00809236',
    examCentre: 'JOS INTERNATIONAL EXAM CENTRE, JOS NORTH, PLATEAU STATE.',
    subjectCombination: 'Use of English, Physics, Biology, Chemistry'
};

const candidateProfileDummyTwo = {
    reg: '202677665544BB',
    fullName: 'ONEN CHINEDU NWACHUKWU',
    photo: 'assets/Images/onen-passport.jpg',
    examNumber: 'C00809237',
    examCentre: 'ILE-IFE CBT CENTRE, OAU CAMPUS, OSUN STATE.',
    subjectCombination: 'Use of English, Physics, Biology, Chemistry'
};

const candidateProfiles = {
    [candidateProfileGirl.reg]: candidateProfileGirl,
    [candidateProfileDummyOne.reg]: candidateProfileDummyOne,
    [candidateProfileDummyTwo.reg]: candidateProfileDummyTwo
};

function getCandidateProfile(regNumber) {
    if (!regNumber) return null;
    const normalizedReg = regNumber.toString().trim().toUpperCase();
    return candidateProfiles[normalizedReg] || null;
}

function getExamStateStorageKey(regNumber) {
    const normalizedReg = regNumber.toString().trim().toUpperCase();
    return `jambExamState_${normalizedReg}`;
}

function getExamFinishedStorageKey(regNumber) {
    const normalizedReg = regNumber.toString().trim().toUpperCase();
    return `examFinished_${normalizedReg}`;
}
