import { ProjectsSidebar } from './components/ProjectsSidebar.jsx';
import { NoProjectSelected } from './components/NoProjectSelected.jsx';
import { useState } from 'react';
import { NewProject } from './components/NewProject.jsx';
import { SelectedProject } from './components/SelectedProject.jsx';

function App() {
    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleStartAddProject() {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null
            };
        });
    }

    function handleAddProject(projectData) {
        setProjectState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            };

            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            };
        });
    }

    function handleCancelAddProject() {
        setProjectState(prevState => {
            return {
              ...prevState,
              selectedProjectId: undefined
            };
        });
    }

    function handleSelectProject(id) {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id
            };
        });
    }

    function handleDeleteProject(id) {
        setProjectState(prevState => {
           return {
               ...prevState,
               selectedProjectId: undefined,
               projects: prevState.projects.filter((project) => project.id !== id)
           };
        });
    }

    function handleAddTask(text) {
        setProjectState(prevState => {
            const taskId = Math.random();
            const newTask = {
                text: text,
                id: taskId,
                projectId: prevState.selectedProjectId
            };

            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            };
        });
    }

    function handleDeleteTask(id) {
        setProjectState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id)
            };
        });
    }

    const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

    let content = <SelectedProject
        project={selectedProject}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks}
    />;

    if (projectState.selectedProjectId === null) {
        content = <NewProject onAdd={ handleAddProject } onCancel={handleCancelAddProject} />;
    } else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={ handleStartAddProject }/>;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={ handleStartAddProject }
                projects={ projectState.projects }
                onSelectProject={handleSelectProject}
                selectedProjectId={projectState.selectedProjectId}
            />
            { content }
        </main>
    );
}

export default App;
