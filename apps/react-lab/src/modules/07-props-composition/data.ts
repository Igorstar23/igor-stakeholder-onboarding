import * as typs from './types';

export const teamMembers: typs.TeamMember[] = [
    {
        id: 1,
        name: "Jhon Smith",
        role: 'frontend',
        bio: "Builds accessible and responsive user interfaces",
        skills: ["write frontend", "read code"],
        availability: 'busy',
        avatarUrl: "google.com/1"
    },
    {
        id: 2,
        name: "Mario Alexandro",
        role: 'backend',
        bio: "Designs APIs and reliable backend services",
        skills: ["write backend", "read code", "setting BD"],
        availability: 'busy',
        avatarUrl: "google.com/2"
    },
    {
        id: 3,
        name: "Frenk Mozart",
        role: 'fullstack',
        bio: "Works across frontend, backend, and deployment",
        skills: ["write backend", "write frontend", "read code", "deployment", "setting BD"],
        availability: 'busy',
        avatarUrl: "google.com/3"
    },
    {
        id: 4,
        name: "Tom Holland",
        role: 'frontend',
        bio: "Builds responsive user interfaces",
        skills: ["write frontend", "read code"],
        availability: 'available'
    }
];