import type { Stakeholder } from "./types";

export function StakeholderTable({stakeholders, onEdit, onDelete}:
    {stakeholders:Stakeholder[]; onEdit(id:string):void; onDelete(id:string):void;}
) {
    return (
        <div className="stakeholder-table">
            {stakeholders.length > 0?
                (
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>role</th>
                                <th>organization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stakeholders.map(
                                    (stakeholder:Stakeholder) => (
                                        <tr key={stakeholder.id}>
                                            <td>{stakeholder.id}</td>
                                            <td>{stakeholder.name}</td>
                                            <td>{stakeholder.role}</td>
                                            <td>{stakeholder.organization}</td>
                                            <td>
                                                <button onClick={()=>onEdit(stakeholder.id)}>Edit</button>
                                                <button onClick={()=>onDelete(stakeholder.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )   
                                )
                            }
                        </tbody>
                    </table>
                ) : 
                (
                    <h2>Stakeholder search is empty!</h2>
                )
            }
        </div>
    );
}