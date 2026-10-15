import { useState } from "react";
import {initStakeholderValue} from "./types.ts";

export default function StakeholderForm() {
    const [formValue, setFormValue] = useState(initStakeholderValue); 

    return (
        <div className="stakeholerform">
            <form>
                <div className="stakeholderform-name">
                    <label htmlFor="stakeholderform-name">Enter stakeholder name:</label>
                    <input id="stakeholderform-name" type="text" value={formValue.name} onChange={(e)=>setFormValue({...formValue, name: e.target.value})} />
                </div>

                <div className="stakeholderform-email">
                    <label htmlFor="stakeholderform-email">Enter stakeholder email:</label>
                    <input id="stakeholderform-email" type="email" value={formValue.email} onChange={(e)=>setFormValue({...formValue, email: e.target.value})} />
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
                </div>

                <div className="stakeholderform-notes">
                    <label htmlFor="stakeholderform-notes">Enter stakeholder name:</label>
                    <textarea id ="stakeholderform-notes" value={formValue.notes} onChange={(e)=>setFormValue({...formValue, notes: e.target.value})}/>
                </div>
                
                <button>Submit</button>
            </form>
        </div>
    );
}