import { useState } from "react";
import { initStakeholders } from "./initialStakeholders.ts";

export default function StructuredStatePage() {

    const [stakeholders, setStakeholders] = useState(initStakeholders);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [editingId, setEditingId] = useState('');



    return (
        <div>
            <h1>Stakeholders Managment:</h1>
        </div>
    );
}