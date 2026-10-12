import { teamMembers } from "./data";
import TeamList from "./TeamList";

export default function TeamPage() {
    return (
        <div>
            <header>
                <h1>Team Members Page</h1>
            </header>

            <TeamList members={teamMembers} />
        </div>
    );
}