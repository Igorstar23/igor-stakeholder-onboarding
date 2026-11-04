export type Role = 'frontend'|'backend'|'fullstack';
export type Influence = 'low'|'medium'|'high';

export interface Stakeholder {
    id: string;
    name: string;
    email: string;
    role: Role;
    organization: string;
    influence: Influence;
};