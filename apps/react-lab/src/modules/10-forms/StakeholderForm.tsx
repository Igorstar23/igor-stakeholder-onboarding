import { useState, type FormEvent } from "react";
import {initStakeholderValue, type StakeholderFormValue} from "./types.ts";

export default function StakeholderForm() {
    const [formValue, setFormValue] = useState(initStakeholderValue); 
    const [errors, setErrors] = useState({name: '', email: '', role: '', influence: ''});
    const [submitValue, setSubmitValue] = useState({...formValue});

    function checkName(name:string) {
        errors.name = (!name.trim()? 'Error, name is required!' : '');
        setErrors({...errors});
    };
    function checkEmail(email:string) {
        
        if (!email.trim()) {
            errors.email= 'Error, email is required!';

        } else {
            errors.email = (!email.includes('@')? 'Error, email must includes @!' : '');
        }
        setErrors({...errors});
    };
    function checkRole(role:string) {
        errors.role = (role != ''? '':'Error, role is required!');
        setErrors({...errors});
    };
    function checkInfluence(influence: string) {
        errors.influence =  (influence != ''? '' : 'Error, influence is required!');
        setErrors({...errors});
    };
    
    function printSubmit(stakeholder: StakeholderFormValue) {
        return (
            <div className="stakeholerform-print">
                <h2>Summary submitted values:</h2>
                <ul>
                    <li>Stakeholder name: {stakeholder.name}</li>
                    <li>Stakeholder email: {stakeholder.email}</li>
                    <li>Stakeholder role: {stakeholder.role}</li>
                    <li>Stakeholder influence: {stakeholder.influence}</li>
                    {stakeholder.notes && <li>Stakeholder notes: {stakeholder.notes}</li>}
                </ul>
            </div>
        );
    }

    function clearForm() {
        setErrors({name:'', email:'', role: '', influence:''});
        setFormValue(initStakeholderValue);
    }

    function handleSubmit(event:FormEvent) {
        event.preventDefault();
        checkName(formValue.name); 
        checkEmail(formValue.email);
        checkRole(formValue.role);
        checkInfluence(formValue.influence);

        let hasError:boolean = ((Object.values(errors).filter((e)=>e != '')?.length) ?? 0) > 0;
        
        if (hasError) {
            setSubmitValue({name:'', email:'', role: '', influence:'', notes:''});
            return;
        }
        
        setSubmitValue({...formValue});
        setFormValue({name:'', email:'', role: '', influence:'', notes:''});
    };

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
                    <select id="stakeholderform-role" value={formValue.role} onChange={(e)=>setFormValue({...formValue, role: e.target.value})}>
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
                    <select id="stakeholderform-influence" value={formValue.influence} onChange={(e)=>setFormValue({...formValue, influence: e.target.value})}>
                        <option value={''}></option>
                        <option value={'low'}>Low</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'high'}>High</option>
                    </select>
                    {errors.influence && <p className="error" role="alert">{errors.influence}</p>}
                </div>

                <div className="stakeholderform-notes">
                    <label htmlFor="stakeholderform-notes">Enter stakeholder notes:</label>
                    <textarea id ="stakeholderform-notes" value={formValue.notes} onChange={(e)=>setFormValue({...formValue, notes: e.target.value})}/>
                </div>
                
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>clearForm()}>Clear</button>

                {submitValue.name && submitValue.email && submitValue.role && submitValue.influence && printSubmit(submitValue)}
            </form>
        </div>
    );
}