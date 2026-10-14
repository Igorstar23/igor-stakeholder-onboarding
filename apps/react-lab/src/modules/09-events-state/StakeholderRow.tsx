import type { Stakeholder } from "./types";

export default function StakeholderRow({record, handleSelectClick, handleRemoveClick}:
    {
        record:Stakeholder, 
        handleSelectClick: (id:number)=> void,
        handleRemoveClick: (id:number)=> void
    }) {

    return (
        <div className="stakeholderrow">
            <button onClick={()=>handleSelectClick(record.id)}>Select/Unselect</button>
            <button onClick={()=>handleRemoveClick(record.id)}>Remove</button>
        </div>
    );
}