import React from 'react';

const ProjectDashboard = () => {
    const project = {
        title: "Project Title",
        description: "This is a brief description of the project.",
        teamMembers: ["Member 1", "Member 2", "Member 3"],
        mentors: ["Mentor 1", "Mentor 2"],
        kanbanLink: "https://kanban.example.com/project",
        calendarLink: "https://calendar.example.com/project"
    };

    return (
        <div className="p-5 font-sans bg-white dark:bg-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <p className="mb-4">{project.description}</p>
            
            <h2 className="text-xl font-semibold">Team Members</h2>
            <ul className="list-disc list-inside mb-4">
                {project.teamMembers.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
            
            <h2 className="text-xl font-semibold">Mentors</h2>
            <ul className="list-disc list-inside mb-4">
                {project.mentors.map((mentor, index) => (
                    <li key={index}>{mentor}</li>
                ))}
            </ul>
            
            <div className="mb-2">
                <a href={project.kanbanLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300">Kanban Page</a>
            </div>
            <div>
                <a href={project.calendarLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300">Calendar</a>
            </div>
        </div>
    );
};

export default ProjectDashboard;