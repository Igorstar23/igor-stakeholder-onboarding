import type { Stakeholder } from "../types";

export default function StakeholderList(
    {data, onEdit, onDelete} :{data:Stakeholder[]; onEdit: (Stakeholder: Stakeholder) => void; onDelete: (id: string)=> void;}
) {

    function handleDelete(id: string) {
        const confirmed = window.confirm('Do you want to delete this Stakeholder ?');

        if (confirmed) onDelete(id);
    }

    function printStakeholder(stakeholder: Stakeholder) {
        return (
            <div className="stakeholderrow" key={stakeholder.id}>
                <ul>
                    <li>Name: {stakeholder.data.name}</li>
                    <li>Email: {stakeholder.data.email}</li>
                    <li>Role: {stakeholder.data.role}</li>
                    {stakeholder.data.organization && <li>Organization: {stakeholder.data.organization}</li>}
                    {stakeholder.data.influence && <li>Influence: {stakeholder.data.influence}</li>}
                </ul>
                <button onClick={()=>onEdit(stakeholder)}>Edit</button>
                <button onClick={()=>handleDelete(stakeholder.id)}>Delete</button>
            </div>
        );
    }
    
    return (
        <div className="stakeholders-list">
            <h2>Stakeholders list</h2>
            {data?.length > 0? data.map(
                    (item) => (
                        printStakeholder(item)
                    )
                ) : (<p role="alert">Stakeholder list is empty!</p>)
            }
        </div>
    );
}