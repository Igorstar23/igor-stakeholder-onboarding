import { useCallback, useEffect, useRef, useState } from "react";
import type { Stakeholder } from "./types";
import { StakeholderAPI } from "./api/stakeholderApi";

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function MiniProjectPage() {

    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<Stakeholder[]>([]);
    const [error, setError] = useState('');

    
    const load = useCallback(async () => {
        setStatus('loading');
        setError('');

        try {
            let loadData = await StakeholderAPI.list();
            setData(loadData);
            setStatus('success');

        } catch(err) {
            setError(
                err instanceof Error? err.message : 
                'Real API error!'
            );
            setStatus('error');
        }

    }, []);

    useEffect(
        () => {
           void load();
        }, [load]
    );

    function loadWithError() {
        StakeholderAPI.failNextRequest();
        load();
    }


    return (
        <div>
            <h1>Mini Project</h1>

            {status === 'loading' && <p>Loading stakeholders ...</p>}
            {status === 'error' && (
                    <div>
                        <h2>Error: {error}</h2>
                        <button onClick={() => load()}>Retry</button>
                    </div>
                )
            }
            
            {status === 'success' && (
                    <div>
                        <p>Number loaded stakeholders is {data.length}</p>
                        <button onClick={()=>loadWithError()}>
                            Simulate Error
                        </button>
                    </div>
                )
            }
            
        </div>
    );
}