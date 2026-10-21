import { useState } from "react";
import { initStakeholders } from "./initialStakeholders.ts";
import type { Stakeholder } from "./types.ts";
import StakeholderEditor from "./StakeholderEditor.tsx";
import { StakeholderTable } from "./StakeholderTable.tsx";

export default function StructuredStatePage() {

    const [stakeholders, setStakeholders] = useState(initStakeholders);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [editingId, setEditingId] = useState('');

    function handleEdit(id: string) { setEditingId(id); }
    function handleDelete(id: string) {
        setStakeholders(stakeholders.filter((stakeholder)=>stakeholder.id != id));

        if (editingId === id) setEditingId('');
    }
    function handleSave(stakeholder:Stakeholder) {
        
        if (editingId != '') {
            setStakeholders(
                (oldArray) => oldArray.map(
                    (oldArrayItem) => oldArrayItem.id === stakeholder.id ? stakeholder : oldArrayItem
                )
            );
        
        } else {
            setStakeholders((oldArray)=>[...oldArray, stakeholder]);
        }
    } 
    function isFilteredStakeholder(stakeholder:Stakeholder) {
        let roleFiltered  = roleFilter === 'all' || stakeholder.role === roleFilter;

        if (!search) {
            return roleFiltered;

        } else if (stakeholder.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
            || stakeholder.organization.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ) {
            return roleFiltered;
        }
        return false;
    }

    const editingStakeholder = stakeholders.find((stakeholder)=>stakeholder.id === editingId);
    const filteredStakeholders = stakeholders.filter((stakeholder)=>isFilteredStakeholder(stakeholder));

    return (
        <div>
            <h1>Stakeholders Managment:</h1>

            <div className="stakeholder-search-block">
                <label htmlFor="stakeholder-search">
                    Enter name for search:
                </label>
                <input id="stakeholder-search" type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className="stakeholder-filter-block">
                <label htmlFor="stakeholder-filter">Select role for filter:</label>
                <select id="stakeholder-filter" value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)}>
                        <option value={''}></option>
                        <option value={'all'}>All</option>
                        <option value={'frontend'}>Frontend</option>
                        <option value={'backend'}>Backend</option>
                        <option value={'fullstack'}>Fullstack</option>
                    </select>
            </div>

            {editingStakeholder?
                (
                    <StakeholderEditor key={editingId} stakeholder={editingStakeholder} onSave={handleSave} onCanel={()=>setEditingId('')}/>
                ):
                (
                    <StakeholderEditor onSave={handleSave}/>
                )
            }
            <StakeholderTable stakeholders={filteredStakeholders} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
    );
}