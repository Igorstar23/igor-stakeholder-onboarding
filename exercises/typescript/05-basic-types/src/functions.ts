import * as data from './data';
import * as typs from './types'

export function filterByRole(members:typs.TeamMember[], role: typs.Role): typs.TeamMember[] {
	let result: typs.TeamMember[] = members.filter((member: typs.TeamMember) => member.role === role);
	return result;
};

export function countAvailable(members: typs.TeamMember[]): number {
	let result: typs.TeamMember[] = members.filter((member: typs.TeamMember)=> member.availability != 'busy')
	return result.length;
};

export function formatMember(member: typs.TeamMember): string {
	return `[${member.id}, ${member.name}, ${member.role}, \"${member.skills}\", ${member.availability}${member.avatarUrl? ", " + member.avatarUrl : ""}]`;
};