type Category = 'internal'|'external';
type Influence = 'low'|'medium'|'high';

export interface Stakeholder {
    id: number;
    name: string;
    category: Category;
    organization?: string;
    influence: Influence;
};