import { useState, type FormEvent } from "react";
import type { Stakeholder } from "./types";

export default function StakeholderEditor(
    { onSave, stakeholder, onCanel}:
    {onSave:(stakeholder:Stakeholder)=>void; stakeholder?:Stakeholder; onCanel?:()=>void;}
) {

    const [name, setName] = useState(stakeholder?.name?? '');
    const [role, setRole] = useState(stakeholder?.role?? '');
    const [organization, setOrganization] = useState(stakeholder?.organization?? '');
    const [errors, setErrors] = useState({name: '', role: '', organization: ''});

    function clearInput() {
        setName('');
        setRole('');
        setOrganization('');
    }
    function clearErrors() {
        errors.name = '',
        errors.organization = '';
        errors.role = '';
        setErrors({...errors});
    }

    function handleCanel(event: FormEvent) {
        event.preventDefault();
        clearInput();
        onCanel?.();
        clearErrors();
    }


    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        let haveError = false;

        if (!name.trim()) {
           errors.name = 'Error, name is required!';
            haveError = true;
        }
        if (!role.trim()) {
            errors.role = 'Error, role is required!';
            haveError = true;
        }
        if (!organization.trim()) {
            errors.organization = 'Error, organization is required!';
            haveError = true;
        }

        if (haveError) {
            setErrors({...errors});
            return;
        } 
        onSave({
            id: stakeholder?.id?? crypto.randomUUID(),
            name: name,
            role: role,
            organization: organization,
        });
        clearInput();
        clearErrors();
    }
    
    return (
        <div className="stakeholdereditor">
            {stakeholder? 
                (
                    <h2>Editing stakeholder {stakeholder.name} with id = {stakeholder.id}:</h2>
                ):
                (
                    <h2>Create new stakeholder:</h2>
                )
            }
            <form noValidate onSubmit={(e)=>handleSubmit(e)}>
                <div className="stakeholderform-name">
                    <label htmlFor="stakeholderform-name">Enter stakeholder name:</label>
                    <input id="stakeholderform-name" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                    {errors.name && <p className="stakeholderform-error error">{errors.name}</p>}
                </div>

                <div className="stakeholderform-role">
                    <label htmlFor="stakeholderform-role">
                        Select stakeholder role:
                    </label>
                    <select id="stakeholderform-role" value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value={''}></option>
                        <option value={'frontend'}>Frontend</option>
                        <option value={'backend'}>Backend</option>
                        <option value={'fullstack'}>Fullstack</option>
                    </select>
                    {errors.role && <p className="stakeholderform-error error">{errors.role}</p>}
                </div>
                
                <div className="stakeholderform-organization">
                    <label htmlFor="stakeholderform-organization">Enter stakeholder organization:</label>
                    <input id="stakeholderform-organization" type="text" value={organization} onChange={(e)=>setOrganization(e.target.value)} />
                    {errors.organization && <p className="stakeholderform-error error">{errors.organization}</p>}
                </div>
                
                <button type="submit">Save</button>
                <button type="button" onClick={(e)=>handleCanel(e)}>Canel</button>
            </form>
        </div>
    );
}