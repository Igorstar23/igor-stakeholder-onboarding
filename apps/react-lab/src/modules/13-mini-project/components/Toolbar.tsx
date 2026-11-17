import type { Influence, Role } from "../types";

export default function Toolbar(
    {
        search,
        onChangeSearch,
        roleFilter,
        onChangeRoleFilter,
        influenceFilter,
        onChangeInfluenceFilter
    } : 
    {
        search: string;
        onChangeSearch: (value:string)=>void;
        roleFilter: Role;
        onChangeRoleFilter: (value:Role)=>void;
        influenceFilter: Influence;
        onChangeInfluenceFilter: (value: Influence)=>void;
    }
) {

    return (
        <div>
            <h1>Stakeholders Managment:</h1>

            <div className="stakeholder-search-block">
                <label htmlFor="stakeholder-search">
                    Enter name or organization for search:
                </label>
                <input id="stakeholder-search" type="text" value={search} onChange={(e)=>onChangeSearch(e.target.value)}/>
            </div>
            <div className="stakeholder-roleFilter-block">
                <label htmlFor="stakeholder-roleFilter">Select role for filter:</label>
                <select id="stakeholder-roleFilter" value={roleFilter} onChange={(e)=>onChangeRoleFilter(e.target.value as Role)}>
                        <option value={''}></option>
                        <option value={'frontend'}>Frontend</option>
                        <option value={'backend'}>Backend</option>
                        <option value={'fullstack'}>Fullstack</option>
                    </select>
            </div>
            <div className="stakeholder-influenceFilter-block">
                <label htmlFor="stakeholder-influenceFilter">Select influence for filter:</label>
                <select id="stakeholder-influenceFilter" value={influenceFilter} onChange={(e)=>onChangeInfluenceFilter(e.target.value as Influence)}>
                        <option value={''}></option>
                        <option value={'low'}>Low</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'high'}>High</option>
                    </select>
            </div>
        </div>
    );
}