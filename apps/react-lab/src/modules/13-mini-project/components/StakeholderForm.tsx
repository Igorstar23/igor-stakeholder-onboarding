import { useState, type FormEvent } from "react";
import type { Stakeholder, StakeholderData, Role, Influence } from "../types";

export default function StakeholderForm(
    { onSave, initData, onCancel}:
    {onSave:(data:StakeholderData)=>Promise<void>; initData?:Stakeholder; onCancel?:()=>void;}
) {

    const [formValue, setFormValue] = useState<StakeholderData>(initData?.data?? {name: '', email: '', role: '', influence: '', organization: ''});
    const [errors, setErrors] = useState({name: '', email: '', role: ''});
    
    function validate(): boolean {
        const newErrors = { name: '', email: '', role: ''};

        if (!formValue.name.trim()) {
            newErrors.name = 'Name is required!';
        }
        if (!formValue.email.trim()) {
            newErrors.email = 'Error, email is required!';

        } else {
            newErrors.email = (!formValue.email.includes('@')? 'Error, email must includes @!' : '');
        }
        if (!formValue.role) {
            newErrors.role = 'Role is required!';
        }
        
        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    function clearForm() {
        setErrors({name:'', email:'', role: ''});
        setFormValue(initData?.data?? {name: '', email: '', role: '', influence: '', organization: ''});
    }
    
    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        
        if (!validate()) { return; }
        
        await onSave(formValue);
        setFormValue({name:'', email:'', role: '', influence:'', organization:''});
    }

    return (
        <div className="stakeholerform">
            <form noValidate onSubmit={(e)=>handleSubmit(e)}>
                <div className="stakeholderform-name">
                    <label htmlFor="stakeholderform-name">Enter stakeholder name:</label>
                    <input id="stakeholderform-name" type="text" value={formValue.name} onChange={(e)=>setFormValue({...formValue, name: e.target.value})} />
                    {errors.name && <p className="error" role="alert">{errors.name}</p>}
                </div>


                <div className="stakeholderform-email">
                    <label htmlFor="stakeholderform-email">Enter stakeholder email:</label>
                    <input id="stakeholderform-email" type="email" value={formValue.email} onChange={(e)=>setFormValue({...formValue, email: e.target.value})} />
                    {errors.email && <p className="error" role="alert">{errors.email}</p>}
                </div>

                <div className="stakeholderform-role">
                    <label htmlFor="stakeholderform-role">
                        Select stakeholder role:
                    </label>
                    <select id="stakeholderform-role" value={formValue.role} onChange={(e)=>setFormValue({...formValue, role: e.target.value as Role})}>
                        <option value={''}></option>
                        <option value={'frontend'}>Frontend</option>
                        <option value={'backend'}>Backend</option>
                        <option value={'fullstack'}>Fullstack</option>
                    </select>
                    {errors.role && <p className="error" role="alert">{errors.role}</p>}
                </div>

                <div className="stakeholderform-influence">
                    <label htmlFor="stakeholderform-influence">
                        Select stakeholder influence:
                    </label>
                    <select id="stakeholderform-influence" value={formValue.influence} onChange={(e)=>setFormValue({...formValue, influence: e.target.value as Influence})}>
                        <option value=''></option>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                    </select>
                </div>

                <div className="stakeholderform-notes">
                    <label htmlFor="stakeholderform-notes">Enter stakeholder organization:</label>
                    <textarea id ="stakeholderform-notes" value={formValue.organization} onChange={(e)=>setFormValue({...formValue, organization: e.target.value})}/>
                </div>
                
                <button type="submit">Save</button>
                <button type="button" onClick={()=>clearForm()}>Clear</button>
                {onCancel && (<button type="button" onClick={onCancel}>Cancel</button>)}
            </form>
        </div>
    );
}