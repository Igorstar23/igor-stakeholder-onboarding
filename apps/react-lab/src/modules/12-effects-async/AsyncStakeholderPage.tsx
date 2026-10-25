import { useEffect, useState } from "react";
import type { Stakeholder } from "./type";

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function AsyncStakeholderPage() {
    
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState<Stakeholder[]>([]);
    const [error, setError] = useState('');

    async function load(url:string, signal:AbortSignal) {
        setError('');
        setStatus('loading');

        try{
            let response = await fetch(url, {signal});

            if (!response.ok) throw new Error(`${response.status}`);

            let jsonData:Stakeholder[] = await response.json();
            setData(jsonData);
            setStatus('success');
        
        } catch(e) {

            if (e instanceof Error && e.name === 'AbortError') return;
            setError(e instanceof Error? e.message : 'Unexpected error!');  
            setStatus('error');  
        }
    };

    useEffect(()=> {
        let aController = new AbortController();
        load('/stakeholders.json', aController.signal);
        
        return function cleanup() {
            aController.abort();
        };
    }, []);

    return (
        <div>
            <h1>Current Stakeholders</h1>
            <div className="Stakeholders-list">
                {status === 'loading' && <h2>Loading  ...</h2>}
                {status == 'error' && (
                        <div className="stakeholders-list-error">
                            <h2>{error}</h2>
                            <button type="button" onClick={()=>{
                                let aController = new AbortController();
                                load('/stakeholders.json', aController.signal);
                            }}>
                                Retry
                            </button>
                        </div>
                    )
                }
                {status == 'success' && data.length === 0 && <h2>No stakeholders found!</h2>}
                {status == 'success' && data.length > 0 && (
                    <ul>
                        {
                            data.map((stakeholder:Stakeholder)=>(
                                    <li key={stakeholder.id}>
                                        {stakeholder.name}: have role {stakeholder.role} 
                                        and organization {stakeholder.organization}
                                    </li>
                                )
                            )
                        }
                    </ul>
                )}
            </div>
        </div>
    );
}