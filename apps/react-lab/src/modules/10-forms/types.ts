
export interface StakeholderFormValue {
    name: string;
    email: string;
    role: string;
    influence: string;
    notes: string;
};

export const initStakeholderValue: StakeholderFormValue = {
    name: '',
    email: '',
    role: '',
    influence: '',
    notes: ''
}