import { useCallback, useEffect, useRef, useState } from "react";
import type { Stakeholder, StakeholderData, Role, Influence } from "./types";

import { StakeholderAPI } from './api/stakeholderApi';
import StakeholderForm from './components/StakeholderForm';
import StakeholderList from './components/StakeholderList';
import Toolbar from './components/Toolbar';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function MiniProjectPage() {

    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<Stakeholder[]>([]);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('' as Role);
    const [influenceFilter, setInfluenceFilter] = useState('' as Influence);

    const [editingId, setEditingId] = useState('');
    const [formEnable, setFormEnable] = useState(false);
    
    const hasLoaded = useRef(false);
    const load = useCallback(async () => {

        if (!hasLoaded.current) setStatus('loading'); 
        setError('');

        try {
            let loadData = await StakeholderAPI.list();
            setData(loadData);
            hasLoaded.current = true;
            setStatus('success');

        } catch(err) {
            setError(
                err instanceof Error? err.message : 
                'Real API error!'
            );

            if (!hasLoaded.current) setStatus('error');
        }

    }, []);

    useEffect(
        () => {
            StakeholderAPI.failNextRequest();
            void load();
        }, [load]
    );

    function loadWithError() {
        StakeholderAPI.failNextRequest();
        void load();
    }

    async function handleSave(data: StakeholderData): Promise<void> {
        
        try {

            if (editingId !== '') {
                const updated = await StakeholderAPI.update(
                    editingId,
                    data
                );

                setData((prev) =>
                    prev.map((item) =>
                        item.id === updated.id ? updated : item
                    )
                );

            } else {
                const created = await StakeholderAPI.create(data);
                setData((prev) => [...prev, created]);
            }
            setFormEnable(false);
            setEditingId('');
            setError('');

        } catch (err) {
            setError(
                err instanceof Error? err.message : 
                'Real API error!'
            );
            throw err;
        }
    }

    function handleCreate() {
        setEditingId('');
        setFormEnable(true);
    }
    function handleEdit(stakeholder:Stakeholder) {
        setEditingId(stakeholder.id);
        setFormEnable(true);
    }
    function handleCancel() {
        setEditingId('');
        setFormEnable(false);
    }

    async function handleDelete(id: string): Promise<void> {

        try {
            await StakeholderAPI.remove(id);
            setData((prev) =>prev.filter((item) => item.id !== id));
            setError('');

        } catch (err) {
             setError(
                err instanceof Error? err.message : 
                'Real API error!'
            );
        }
    }

    function isFilteredStakeholder(stakeholder:Stakeholder) {
        let isFiltered = (roleFilter === '' || stakeholder.data.role === roleFilter)
            && (influenceFilter === '' || stakeholder.data.influence === influenceFilter);

        if (!search) {
            return isFiltered;

        } else if (stakeholder.data.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
            || stakeholder.data.organization.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ) {
            return isFiltered;
        }
        return false;
    }

    const editingStakeholder = data.find((stakeholder)=>stakeholder.id === editingId);
    const filteredStakeholders = data.filter((stakeholder)=>isFilteredStakeholder(stakeholder));


    return (
        <div className="stakeholders-block">
            <h1>Mini Project</h1>

            {status === 'loading' && <p>Loading stakeholders ...</p>}
            {status === 'error' && (
                    <div>
                        <h2 className="error">Error: {error}</h2>
                        <button onClick={() => load()}>Retry</button>
                    </div>
                )
            }
            
            {status === 'success' && (
                    <div>
                        <p>Number loaded stakeholders is {filteredStakeholders.length}</p>
                        <button onClick={()=>loadWithError()}>
                            Simulate Error
                        </button>

                        <button type="button" onClick={handleCreate}>
                            Add stakeholder
                        </button>

                        {formEnable && (
                            <div>
                                <StakeholderForm
                                    key={editingId || 'new'}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    initData={editingStakeholder}
                                />
                            </div>
                        )}
                        {error && (
                                <div>
                                    <h2 className="error">Error: {error}</h2>
                                    <button onClick={() => load()}>Retry</button>
                                </div>
                            )
                        }

                        <Toolbar
                            search={search}
                            onChangeSearch={setSearch}
                            roleFilter={roleFilter}
                            onChangeRoleFilter={setRoleFilter}
                            influenceFilter={influenceFilter}
                            onChangeInfluenceFilter={setInfluenceFilter}
                        />
                        <StakeholderList
                            data={filteredStakeholders}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                )
            }
            
        </div>
    );
}