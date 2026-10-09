import * as fun from './functions';
import * as typs from './types'
import * as data from './data'

console.log("\nTeam members by Role:");

let rols:typs.Role[] = ['frontend', 'backend', 'fullstack'];
for (const role of rols) {
	const members = fun.filterByRole(data.teamMembers, role);
	console.log(`\nCount available members with role ${role} is ${fun.countAvailable(members)}`);
	console.log(`All members with role ${role}:\n`);
	for (const member of members) console.log(" " + fun.formatMember(member));
}

console.log("\nAll Members without avatar:\n");
let members:typs.TeamMember[] = data.teamMembers.filter((member: typs.TeamMember) => !member.avatarUrl);
for (const member of members) {
	console.log(fun.formatMember(member));
}