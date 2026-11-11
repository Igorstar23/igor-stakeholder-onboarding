import type {Stakeholder, StakeholderData, Role, Influence} from "../types";

export class StakeholderAPI {
    private static isBadRequest = false;

    static REQUEST_TIME_DELAY = 200;

    private static stakeholders: Stakeholder[] = [
        {
            id: '0',
            data: { 
                name: 'John',
                email: 'john@gmail.com',
                role: 'frontend',
                organization: "Netcracker",
                influence: 'low'
            }
        },
        {
            id: '1',
            data: {
                name: 'Nico',
                email: 'nico@gmail.com',
                role: 'backend',
                organization: "Netcracker",
                influence: 'medium'
            }
        },
        {
            id: '2',
            data: {
                name: 'Albert',
                email: 'albert@gmail.com',
                role: 'fullstack',
                organization: "Netcracker",
                influence: 'high'
            }
        },
        {
            id: '3',
            data: {
                name: 'Tony',
                email: 'tony@gmail.com',
                role: 'frontend',
                organization: "EPAM",
                influence: 'low'
            }
        },
        {
            id: '4',
            data: {
                name: 'Ford',
                email: 'ford@gmail.com',
                role: 'backend',
                organization: "EPAM",
                influence: 'medium'
            }
        },
        {
            id: '5',
            data: {
                name: 'Carl',
                email: 'carl@gmail.com',
                role: 'fullstack',
                organization: "EPAM",
                influence: 'high'
            }
        }
    ];


    private static delay(time: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    private static async checkBadRequest(): Promise<void> {
        await this.delay(this.REQUEST_TIME_DELAY);

        if (this.isBadRequest) {
            this.isBadRequest = false;
            throw new Error('Simulate API error!');
        }
    }

    static failNextRequest() { this.isBadRequest = true; }

    static async list(): Promise<Stakeholder[]> {
        await this.checkBadRequest();

        return [...this.stakeholders];
    }

    static async create(data:StakeholderData): Promise<Stakeholder> {
        await this.checkBadRequest();

        const newStakeholder: Stakeholder = {id:'', data: data};
        newStakeholder.id = crypto.randomUUID();
        this.stakeholders = [...this.stakeholders, newStakeholder];
        return newStakeholder;
    }

    static async update(id:string, newData: StakeholderData): Promise<Stakeholder> {
        await this.checkBadRequest();

        let index = this.stakeholders.findIndex((stakeholder) => stakeholder.id === id);

        if (index === -1) throw new Error(`Error, Stakeholder with id = ${id} isn't exist!`);
        let newStakeholder = {id : id, data: newData};
        this.stakeholders = this.stakeholders.map((stakeholder) => (stakeholder.id === id? newStakeholder : stakeholder));
        return newStakeholder;
    }

    static async remove(id: string) {
        await this.checkBadRequest();

        let index = this.stakeholders.findIndex((stakeholder)=>(stakeholder.id === id));
        
        if (index === -1) throw new Error(`Error remove, because element with id = ${id} isn't exist!`);
        this.stakeholders = this.stakeholders.filter((stakeholder) => (stakeholder.id !== id));
    }
};