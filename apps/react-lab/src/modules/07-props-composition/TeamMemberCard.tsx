import SkillBadge from './SkillBadge';
import type {TeamMember} from './types';

function toShortNameFormat(name:string):string {
    let result:string = name.trim().split(" ").map(element => {
        return element[0]+".";
    }).join("");
    return result;
}

export default function TeamMemberCard({member}:{member:TeamMember}) {
    return (
        <div className='teamcard'>
            <div className='teamcard-item'>
                {member.avatarUrl?
                    (
                        <img src={member.avatarUrl} alt={toShortNameFormat(member.name)}/>
                    ):
                    (
                        <p className='fallback-name'>{toShortNameFormat(member.name) }</p>
                    )
                }
                <p>{member.name}</p>
                <p>{member.role}</p>
            </div>
            <SkillBadge skills={member.skills}/>
        </div>
    );
}