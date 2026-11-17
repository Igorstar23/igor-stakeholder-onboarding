export type Role = 'frontend'|'backend'|'fullstack'|'';
export type Influence = 'low'|'medium'|'high'|'';

export interface StakeholderData {
    name: string;
    email: string;
    role: Role;
    organization: string;
    influence: Influence;
}

export interface Stakeholder {
    id: string;
    data: StakeholderData;
};