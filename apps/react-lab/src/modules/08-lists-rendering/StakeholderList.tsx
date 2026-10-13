import * as typs from "./types";


export default function StakeholderList({stakeholders}:{stakeholders:typs.Stakeholder[]}) {
    
    if (stakeholders.length == 0) {
        return (<div className="stakeholderList-empty"><h2>No stakeholders found</h2></div>);
    }

    const internalStakeholders:typs.Stakeholder[] = stakeholders.filter((stakeholder:typs.Stakeholder) => {
        return stakeholder.category == 'internal';
    });
    const externalStakeholders:typs.Stakeholder[] = stakeholders.filter((stakeholder:typs.Stakeholder) => {
        return stakeholder.category == 'external';
    });

    return (
        <div className="stakeholderList">
            <StakeholderListByCategory stakeholders={internalStakeholders} category={'internal'}/>
            <StakeholderListByCategory stakeholders={externalStakeholders} category={'external'}/>
        </div>
    );
}


function StakeholderListByCategory({stakeholders, category}:{stakeholders:typs.Stakeholder[], category:string}) {
    
    if (stakeholders.length == 0) return (<div className={"stakeholder-"+category+"-empty"}><h2>No {category} stakeholders found</h2></div>);
    return (
        <div className={"stakeholder-"+category}>
            <h2>Our {category} stakeholders:</h2>
            <ul>
                {
                    stakeholders.map(
                        (stakeholder) => (
                            <StakeHolderItem key={stakeholder.id} stakeholder={stakeholder}/>             
                        )
                    )
                }
            </ul>
        </div>
    );
}

function StakeHolderItem({stakeholder}:{stakeholder:typs.Stakeholder}) {
    return(
        <li>
            <p>{stakeholder.name}</p>
            <p>{stakeholder.category}</p>
            <p>Influence: {stakeholder.influence}</p>
            <p>Organisation: {stakeholder.organization ?? "Organization not specified"}</p>
        </li>
    );
}