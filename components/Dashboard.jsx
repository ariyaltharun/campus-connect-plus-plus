import { startOfYear, endOfYear, eachDayOfInterval, format, getDay, getMonth } from 'date-fns';


const Dashboard = () => {
    // User Info
    // User Projects
    // Engaged Labs
    // Streek map
    // Recent Activity
    const userDetailsCard = () => {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* User info */}
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img src="https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg" alt="User" />
                    </div>
                    <div>
                        <h1 className="text-gray-900 dark:text-white text-2xl font-bold">John Doe</h1>
                        <p className="text-gray-600 dark:text-gray-300">Hello world</p>
                    </div>
                </div>
                {/* Socials */}
                <ul className="list-none space-y-2 mb-4">
                    <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">LinkedIn/xxx</a></li>
                    <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">GitHub/xxx</a></li>
                    <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">X/xxx</a></li>
                </ul>
                {/* Research Publications */}
                <div>
                    <h1 className="text-gray-900 dark:text-white text-xl font-semibold mb-2 border-t-2 dark:border-gray-500 pt-4">Research Publications</h1>
                    <ul className="list-none space-y-2 pb-4">
                        <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Publication 1</a></li>
                        <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Publication 2</a></li>
                        <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Publication 3</a></li>
                    </ul>
                </div>
                {/* Labs */}
                <div>
                    <h1 className="text-gray-900 dark:text-white text-xl font-semibold mb-2 border-t-2 dark:border-gray-500 pt-4">Labs</h1>
                    <ul className="list-none space-y-2 pb-4">
                        <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Lab 1</a></li>
                        <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Lab 2</a></li>
                        <li><a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Lab 3</a></li>
                    </ul>
                </div>
            </div>
        );
    }

    const userAnaltyicsCard = () => {
        const analyticsData = [
            {
                'title': 'Total Ongoing Project',
                'value': 10
            },
            {
                'title': 'Total Project Completed',
                'value': 100
            },
            {
                'title': 'Total Labs Utilized',
                'value': 32
            },
            {
                'title': 'Total Research Publications',
                'value': 12
            }
        ]

        return (
            <div className="p-12 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
                {/* <h1 className="text-xl p-4 text-gray-900 dark:text-white font-semibold">Analytics</h1> */}
                <div className="grid md:grid-cols-3 gap-4">
                    {analyticsData.map((data, key) => (
                        <div key={key} className="bg-slate-200 dark:bg-gray-700 p-4 rounded shadow-lg text-center">
                            <p className="text-gray-900 dark:text-white text-3xl md:text-5xl">{data.value}</p>
                            <h1 className="dark:text-gray-100 text-lg md:text-xl p-2 font-bold">{data.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const userProjectsCard = () => {
        const project = [
            {
                project: "Project Zero",
                description: "This is a project",
            },
            {
                project: "Project Zero",
                description: "This is a project",
            }
        ]

        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-xl p-4 text-gray-900 dark:text-white font-semibold px-12 pt-8">Projects</h1>
                <div className="grid md:grid-cols-2 gap-4 px-12 pb-12">
                    {project.map((project, key) => (
                        <div key={key} className="bg-slate-200 dark:bg-gray-700 p-4 rounded shadow-lg">
                            <h1 className="dark:text-gray-100 text-lg font-bold">{project.project}</h1>
                            <p className="text-gray-900 dark:text-gray-300">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    const streekMapCard = () => {
        const startDate = startOfYear(new Date());
        const endDate = endOfYear(new Date());
        const days = eachDayOfInterval({ start: startDate, end: endDate });

        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const monthDays = months.map((_, monthIndex) => {
            return days.filter(day => getMonth(day) === monthIndex);
        });

        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-xl p-4 text-gray-900 dark:text-white font-semibold px-12 pt-8">Activity Streak</h1>
                <div className="px-12 pb-12">
                    <div className="flex space-x-4 mb-2">
                        {months.map((month, monthIndex) => (
                            <div key={monthIndex} className="flex flex-col items-center">
                                <div className="text-gray-900 dark:text-white text-sm px-2 mb-1">{month}</div>
                                <svg width="auto" height="110">
                                    {monthDays[monthIndex].map((day, dayIndex) => (
                                        <g key={dayIndex} transform={`translate(${Math.floor(dayIndex / 7) * 15}, ${getDay(day) * 15})`}>
                                            <rect
                                                x={0}
                                                y={0}
                                                width={13}
                                                height={13}
                                                rx={2}
                                                ry={2}
                                                fill={
                                                    day.activity === 0
                                                        ? '#ebedf0'
                                                        : day.activity === 1
                                                            ? '#c6e48b'
                                                            : day.activity === 2
                                                                ? '#7bc96f'
                                                                : day.activity === 3
                                                                    ? '#239a3b'
                                                                    : '#196127'
                                                }
                                                title={`Activity on ${format(day, 'yyyy-MM-dd')}`}
                                            />
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const recentActivityCard = () => {
        const recentActivites = [
            {
                activity: "Activity 1"
            },
            {
                activity: "Activity 2"
            }
        ]

        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-xl p-4 text-gray-900 dark:text-white font-semibold px-12 pt-8">Recent Activity</h1>
                <div className="space-y-4 px-12 pb-12">
                    {recentActivites.map((activity, key) => (
                        <div key={key} className="bg-slate-200 dark:bg-gray-700 p-4 rounded shadow-lg">
                            <p className="text-gray-900 dark:text-gray-300">{activity.activity}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-900 grid md:grid-cols-[25%_75%] gap-4 p-12 pt-24">
            <div>
                {userDetailsCard()}
            </div>
            <div className="space-y-4">
                {userAnaltyicsCard()}
                {userProjectsCard()}
                {/* {streekMapCard()} */}
                {recentActivityCard()}
            </div>
        </div>
    );
};

export default Dashboard;
