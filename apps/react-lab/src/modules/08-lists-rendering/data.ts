import type { Stakeholder } from "./types"

export const stakeholders:Stakeholder[] = [
    {
        id: 0,
        name: "A1",
        category: 'internal',
        organization: "Netcraker",
        influence: 'high'
    },
    {
        id: 1,
        name: "A2",
        category: 'internal',
        organization: "EPAM",
        influence: 'medium'
    },
    {
        id: 2,
        name: "A3",
        category: 'internal',
        influence: 'low',

    },
    {
        id:3,
        name: "B1",
        category: 'external',
        influence: 'high',
        organization: "Netcracker"
    },
    {
        id:4,
        name: "B2",
        category: 'external',
        influence: 'medium',
        organization: "EPAM"
    },
    {
        id:5,
        name: "B3",
        category: 'external',
        influence: 'low',
        organization: "SoftServe"
    }
];