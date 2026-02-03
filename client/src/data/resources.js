
export const resources = {
    'cyber-security': {
        '1': {
            'calculus': {
                name: 'Calculus',
                chapters: [
                    {
                        id: 'assignments',
                        title: 'Assignments',
                        items: [
                            { title: 'Assignment 1', type: 'pdf', url: 'Assignment _1.pdf' },
                            { title: 'Assignment 2', type: 'pdf', url: 'Assignment_2.pdf' },
                            { title: 'Assignment 3', type: 'pdf', url: 'Assignment_3.pdf' },
                            { title: 'Assignment 4', type: 'pdf', url: 'Assignment_4.pdf' },
                        ]
                    },
                    {
                        id: 'chapters',
                        title: 'Chapters & Notes',
                        items: [
                            { title: 'Chapter 1', type: 'pdf', url: 'Chp1.pdf' },
                            { title: 'Chapter 2', type: 'pdf', url: 'Chp2.pdf' },
                            { title: 'Chapter 3', type: 'pdf', url: 'Chp3.pdf' },
                            { title: 'Chapter 4', type: 'pdf', url: 'Chp4.pdf' },
                        ]
                    },
                    {
                        id: 'tutorials',
                        title: 'Tutorials',
                        items: [
                            { title: 'Tutorial 1A-1', type: 'pdf', url: 'Tutorial 1A-1.pdf' },
                            { title: 'Tutorial 1A-2', type: 'pdf', url: 'Tutorial 1A-2.pdf' },
                            { title: 'Tutorial 1B', type: 'pdf', url: 'Tutorial 1B.pdf' },
                            { title: 'Tutorial 2A', type: 'pdf', url: 'Tutorial 2A.pdf' },
                            { title: 'Tutorial 2B', type: 'pdf', url: 'Tutorial 2B.pdf' },
                            { title: 'Tutorial 3A', type: 'pdf', url: 'Tutorial 3A.pdf' },
                            { title: 'Tutorial 3B', type: 'pdf', url: 'Tutorial 3B.pdf' },
                            { title: 'Tutorial 4A', type: 'pdf', url: 'Tutorial 4A.pdf' },
                            { title: 'Tutorial 4B', type: 'pdf', url: 'Tutorial 4B.pdf' },
                        ]
                    }
                ]
            },
            'eee': {
                name: 'Basic Electrical Engg (EEE)',
                chapters: [
                    {
                        id: 'assignments',
                        title: 'Assignments',
                        items: [
                            { title: 'Assignment 1', type: 'pdf', url: 'Assignment-1.pdf' },
                            { title: 'Assignment 2', type: 'pdf', url: 'Assignment-2.pdf' },
                            { title: 'Assignment 3', type: 'pdf', url: 'Assignment-3.pdf' },
                        ]
                    },
                    {
                        id: 'notes',
                        title: 'Lecture Notes',
                        items: [
                            { title: 'Chapter 1 Notes', type: 'pdf', url: 'Chp1.pdf' },
                            { title: 'Chapter 2 Notes', type: 'pdf', url: 'Chp2.pdf' },
                            { title: 'Chapter 2 Problems', type: 'pdf', url: 'Chp2_problems.pdf' },
                            { title: 'Chapter 3 Notes', type: 'pdf', url: 'Chp3.pdf' },
                            { title: 'Chapter 4 Notes', type: 'pdf', url: 'Chp4.pdf' },
                            { title: 'Lab Manual', type: 'pdf', url: 'EEE lab manual.pdf' },
                        ]
                    },
                    {
                        id: 'slides',
                        title: 'Presentation Slides',
                        items: [
                            { title: 'Chp 1 PPT', type: 'ppt', url: 'Chp1.pptx' },
                            { title: 'Chp 2 PPT', type: 'ppt', url: 'Chp2.pptx' },
                            { title: 'Chp 3 PPT', type: 'ppt', url: 'Chp3.pptx' },
                            { title: 'Chp 4 PPT', type: 'ppt', url: 'Chp4.pptx' },
                        ]
                    }
                ]
            },
            'fcs': {
                name: 'Fundamentals of CS (FCS)',
                chapters: [
                    {
                        id: 'content',
                        title: 'Course Content',
                        items: [
                            { title: 'Chapter 1', type: 'pdf', url: 'Chp1.pdf' },
                            { title: 'Chapter 2', type: 'pdf', url: 'Chp2.pdf' },
                            { title: 'Chapter 3', type: 'pdf', url: 'Chp3.pdf' },
                            { title: 'Chapter 4', type: 'pdf', url: 'Chp4.pdf' },
                            { title: 'Chapter 5', type: 'pdf', url: 'Chp5.pdf' },
                        ]
                    },
                    {
                        id: 'assignments',
                        title: 'Assignments & QB',
                        items: [
                            { title: 'Assignment 1', type: 'pdf', url: 'Assignment-1.pdf' },
                            { title: 'Assignment 2', type: 'pdf', url: 'Assignment-2.pdf' },
                            { title: 'Assignment 3', type: 'pdf', url: 'Assignment-3.pdf' },
                            { title: 'Question Bank', type: 'pdf', url: 'Question_Bank.pdf' },
                            { title: 'Syllabus', type: 'pdf', url: 'Syllabus_Summary.pdf' },
                        ]
                    }
                ]
            },
            'pps': {
                name: 'Programming (PPS)',
                chapters: [
                    {
                        id: 'all',
                        title: 'All Resources',
                        items: [
                            { title: 'Assignment 1', type: 'pdf', url: 'Assignment-1.pdf' },
                            { title: 'Assignment 2', type: 'pdf', url: 'Assignment-2.pdf' },
                            { title: 'Chapter 1', type: 'pdf', url: 'Chp1.pdf' },
                            { title: 'Chapter 2', type: 'pdf', url: 'Chp2.pdf' },
                        ]
                    }
                ]
            },
            'web-designing': {
                name: 'Web Designing',
                chapters: [
                    { id: 'all', title: 'Resources', items: [] }
                ]
            }
        }
    }
};

export const getResourceUrl = (subject, filename) => {
    // Mapping internal ID to folder name
    const folderMap = {
        'calculus': 'Calculus',
        'eee': 'EEE',
        'fcs': 'FCS',
        'pps': 'PPS',
        'web-designing': 'Web designing'
    };

    const safeFilename = encodeURIComponent(filename);
    const safeFolder = encodeURIComponent(folderMap[subject]);

    // Updated path to match physical location (sem-1/Calculus/...)
    return `/materials/cyber-security/sem-1/${safeFolder}/${safeFilename}`;
};
