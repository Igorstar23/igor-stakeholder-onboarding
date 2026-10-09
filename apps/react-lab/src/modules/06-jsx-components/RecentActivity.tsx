const activities = [
    {
        id: 0,
        title: "Project update",
        time: "Today-17:00"
    },
    {
        id: 1,
        title: "Stakeholder info updated",
        time: "Yesterday-12:00"
    },
    {
        id: 2,
        title: "Team meeting",
        time: "Yesterday-08:30"
    }
];

export default function RecentActivity() {
    return (
        <div className="activity-block">
            <div className="activity-block-title">
                <h2>Recent Activity</h2>
            </div>
            <div className="activity-block-list">
                {activities.map(
                    (activity) => (
                        <div className="activity-item" key={activity.id}>
                            <h3>{activity.title}</h3>
                            <p>{activity.time}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}