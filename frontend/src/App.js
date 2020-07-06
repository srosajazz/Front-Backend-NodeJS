import React, { useState, useEffect } from 'react';
import api from './services/api';


import './App.css';
// import backgroundImage from './assets/bass.jpeg';
import Header from './components/Header';

/**
 * Component
 * Proproty
 * State & Imutability
 */


function App() {
  const [projects, setProjects] = useState([]);

  // Get data from backend -> MAKE SURE api.get is on right PATH : api.get('projects')
  useEffect(() =>{
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  },[]);

  async function handleAddProject(){
    // projects.push(`New project ${Date.now()}`);

    // Imutability
    // setProjects([...projects,`New project ${Date.now()}`]);

    // console.log(projects);

    //Add new project in the frontend
    const response = await api.post('projects',{
      title: `New project ${Date.now()}`,
      owner: "Sergio Rosa"
    });
    const project = response.data;
    setProjects([ ...projects, project]);
  }

  return (
  <>
    <Header  title="Projects"/>
    {/* <img width={200} src={backgroundImage} /> */}
    <ul>
         {/* pecorrer map */}
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject}>Add project</button>
 </>
  );
}

export default App;