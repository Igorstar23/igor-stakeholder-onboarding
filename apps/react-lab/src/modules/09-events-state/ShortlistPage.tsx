import { useState } from "react";
import { initRecords } from "./initialStakeholders";
import StakeholderRow from "./StakeholderRow";

export default function ShortlistPage() {
    const [records, setRecords] = useState(structuredClone(initRecords)); 
    const [name, setName] = useState(" ");
    
    function handleNameChange(value:string) {
        setName(value);
    }
    function addStakeholer() {
        let nameFormatted = name.trim();

        if (!nameFormatted) {
            return;
        }
        setRecords([...records, {id: Math.max(0, ...records.map(record=>record.id))+1, name: nameFormatted, selected: false}])
        setName(" ");
    }
    function handleSelectClick(id:number) {
        setRecords(records.map((record)=>record.id == id? {id: record.id, name: record.name, selected: !record.selected} : record))
    }
    function handleRemoveClick(id:number) {
        setRecords(records.filter(record => record.id != id))
    }
    function handleResetClick() {setRecords(structuredClone(initRecords))}

    return (
        <div className="shortlistpage">
            <h1>
                Stakeholders list:
            </h1>
            <div className="shortlist-add">
                <label>New stakeholder name&nbsp;</label>
                <input title="Enter new stakeholder name" type="text" value={name} onChange={(e)=>handleNameChange(e.target.value)}/>
                <button onClick={addStakeholer}>Add</button>
            </div>
            <div className="shortlist-reset">
                <h2>Selected: {records.filter(record=>record.selected).length} / {records.length}</h2>
                <button onClick={handleResetClick}>Reset</button>
            </div>

            <div className="shortlist">
                    {
                        records.map(record=>(
                            <div className="shortlist-item" key={record.id}>
                                <p>{record.name}</p>
                                <p>Selected: {record.selected? "+" : "-"}</p>
                                <StakeholderRow 
                                    record={record} 
                                    handleSelectClick={(id:number)=>handleSelectClick(id)} 
                                    handleRemoveClick={(id:number)=>handleRemoveClick(id)}
                                />
                            </div>
                        )
                    )}
                 
            </div>
        </div>
    );
}
