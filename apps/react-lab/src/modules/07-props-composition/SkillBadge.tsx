
export default function SkillBadge({skills}:{skills:string[]}) {
    return (
        <div className="skillbadge">
            <ul>
                {skills.map(
                    (skill) => (
                        <li className="skillbadge-item">
                            <p>{skill}</p>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}