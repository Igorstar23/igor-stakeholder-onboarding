const summCards = [
    {
        id: 0,
        title: "Total stakeholders",
        value: 24,
        css: {
            color: 'blue'
        }
    },
    {
        id: 1,
        title: "High influence",
        value: 6,
        css: {
            color: 'green'
        }
    },
    {
        id: 2,
        title: "Recent interactions",
        value: 12,
        css: {
            color: 'yellow'
        }
    }
];


export default function SummaryCards() {
    return (
        <div className="summary-card">
            <h2>Our Summaries</h2>
            {summCards.map(
                (summary) => (
                    <div className="summary-card-item" key={summary.id} style={summary.css}>
                        <p>{summary.title} is {summary.value}</p>
                    </div>
                )
            )}
        </div>
    );
}

