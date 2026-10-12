import Card from './Card';
import TeamMemberCard from './TeamMemberCard';
import type {TeamMember} from './types';

export default function TeamList({members}:{members:TeamMember[]}) {
    return (
        <div className='teamlist'>
            <h2>Our Team Members:</h2>
            {members.map(
                    (member:TeamMember) => (

                        <Card key={member.id} children={<TeamMemberCard member={member} />} />
                    )
            )}
        </div>
    );
}