const navList = [
    {
        value: "Dashboard",
        css: {
            color: "green"
        }
    },
    {
        value: "Stakeholders",
        css: {
            color: "green"
        }
    },
    {
        value: "Interactions",
        css: {
            color: "green"
        }
    }
];

export default function Sidebar() {
    return (
        <div className="sidebar">
            <nav>
                <h2>Workspace</h2>
                <ul>
                    {navList.map(
                        (item) => (
                            <li>
                                <a href="#" style={item.css}>{item.value}</a>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
}