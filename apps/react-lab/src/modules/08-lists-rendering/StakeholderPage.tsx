import StakeholderList from "./StakeholderList";
import { stakeholders } from "./data";
import { useState } from "react";

export default function StakeholderPage() {
    const [isEmpty, setEmpty] = useState(false);

    return (
        <div className="stakeholderpage">
            <h1>Our StakeHolders</h1>
            <div className="stakeholderpage-buttons">
                <button type="button" onClick={()=>setEmpty(false)} 
                    style={{color: ((isEmpty)? "black" : "green"), border: ((isEmpty)? "1px solid black":"1px solid green")}}>
                        Show all
                    </button>
                <button type="button" onClick={()=>setEmpty(true)}
                    style={{color: ((isEmpty)? "red" : "black"), border: ((isEmpty)? "1px solid red":"1px solid black")}}>
                        Show Empty
                    </button>
            </div>
            <StakeholderList stakeholders={isEmpty? [] : stakeholders}/>
        </div>
    );
}