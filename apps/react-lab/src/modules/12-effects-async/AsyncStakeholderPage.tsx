import { useEffect, useRef, useState } from "react";
import type { Stakeholder } from "./type";

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function AsyncStakeholderPage() {
    
    const defUrl = '/stakeholders.json';
    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<Stakeholder[]>([]);
    const [error, setError] = useState('');
    const controller = useRef<AbortController|null>(null);

    async function load(url:string) {
        controller.current?.abort();

        const currentController = new AbortController();
        controller.current = currentController
        setError('');
        setStatus('loading');

        try{
            let response = await fetch(url, {signal: currentController.signal});

            if (!response.ok) throw new Error(`${response.status}`);

            let jsonData:Stakeholder[] = await response.json();

            if (currentController.signal.aborted) return;
            if (controller.current !== currentController) return;
            setData(jsonData);
            setStatus('success');
        
        } catch(e) {

            if (controller.current !== currentController) return;
            if (currentController.signal.aborted) return;
            if (e instanceof Error && e.name === 'AbortError') return;
            setError(e instanceof Error? e.message : 'Unexpected error!');  
            setStatus('error');  
        }
    };

    useEffect(()=> {
        load(defUrl);
        
        return function cleanup() {
            controller.current?.abort();
            controller.current = null;
        };
    }, []);

    return (
        <div>
            <h1>Our Stakeholders</h1>
            <div className="stakeholders-block">

                <div className="stakeholders-list-control">
                    <button 
                        type="button"
                        onClick={() => {load(defUrl)}}>
                        Load data
                    </button>
                    <button 
                        type="button"
                        onClick={
                            () => {
                                controller.current?.abort();
                                controller.current = null;
                                setData([]);
                                setError('');
                                setStatus('success');
                            }
                        }>
                        Load empty
                    </button>
                    <button 
                        type="button"
                        onClick={() => {load('')}}>
                        Simulate error
                    </button>
                </div>

                {status === 'loading' && <h2>Loading  ...</h2>}
                {status == 'error' && (
                        <div className="stakeholders-list-error">
                            <h2>{error}</h2>
                            <button type="button" onClick={()=>{
                                load(defUrl);
                            }}>
                                Retry
                            </button>
                        </div>
                    )
                }
                {status == 'success' && data.length === 0 && <h2>No stakeholders found!</h2>}
                {status == 'success' && data.length > 0 && (
                    <div className="stakeholders-list">
                        <h2>Total Found {data.length} stakeholders:</h2>
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
                    </div>
                )}
            </div>
        </div>
    );
}''