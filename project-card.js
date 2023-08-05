/**
 * Web Component in form of a Card to demonstrate a project.
 */

// For this homework, grab the data from data.json and put in localStorage if its not there already.
class ProjectClass extends HTMLElement {
   constructor() {
      super();

      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
         <style>
         :root {
            --local-color: #afc3a4;
            --remote-color: #c6ddf9;
         }
         .wrapper{
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            grid-template-rows: repeat(3, auto);
            grid-template-areas: 'image name' 'image description' 'image link';
            border: 1px solid black;
            border-radius: 5px;
            margin: 1rem;
         }
         
         h2{
            grid-area: name;
            border-bottom: 1px solid black;
            margin-inline-end: 1rem;
         }

         picture {
            grid-area: image; 
            margin: 0.5rem;
         }

         img {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
         }

         p{
            grid-area: description;
         }

         a{
            grid-area: link;
         }

         @media screen and (max-width: 480px) {
            .wrapper{
               grid-template-columns: 1fr;
               grid-template-rows: repeat(4, auto);
               grid-template-areas: 'image' 'name' 'description' 'link';
            }
         }
         </style>
         
         <div class='wrapper'>
            <h2>Project Name</h2>
            <picture><img src='images/image1.jpg' alt='Project Image'></picture>
            <p>Project Description</p>
            <a href='URL'>Read More</a>
         </div>
         `;
   }
}

customElements.define('project-card', ProjectClass);

document.addEventListener('DOMContentLoaded', init());

function init() {
   const loadLocal = document.getElementById('load-local');
   loadLocal.addEventListener('click', loadLocalProjects);

   const loadCloud = document.getElementById('load-remote');
   loadCloud.addEventListener('click', loadCloudProjects);
}

function loadLocalProjects() {
   let data = localStorage.getItem('projects');
   if (!data) {
      localStorage.setItem('projects', JSON.stringify(projectData));
      data = localStorage.getItem('projects');
      console.log('Loading Data. Data was not found in localStorage')
   }

   const projects = JSON.parse(data);
   console.log(projects);

   for (let i =0 ; i < projects.length; i++) {
      loadProject(projects[i]);
   }

}

function loadProject(projectInfo) {
   let projectElement = document.createElement('project-card')
   let shadow = projectElement.shadowRoot;
   shadow.querySelector('h2').innerText = projectInfo.name;
   shadow.querySelector('img').src = `images/${projectInfo.image}`;
   shadow.querySelector('img').alt = projectInfo.imageAlt;
   shadow.querySelector('p').innerText = projectInfo.description;
   shadow.querySelector('a').href = projectInfo.link;

   shadow.querySelector('.wrapper').style.backgroundColor = 'var(--local-color)';

   document.querySelector('output').appendChild(projectElement);
}

function loadCloudProjects() {

}

const projectData = [
      {
         'name': 'Project 1',
         'image': 'image1.jpg',
         'imageAlt': 'A pink and white flower sitting on top of green leaves',
         'description': 'Project 1 Description',
         'link': 'https://www.ucsd.edu/'
      },
      {
         'name': 'Project 2',
         'image': 'image2.jpg',
         'imageAlt': 'A close up picture of a plant pink flower buds',
         'description': 'Project 2 Description',
         'link': 'https://www.ucsd.edu/'
      },
      {
         'name': 'Project 3',
         'image': 'image3.jpg',
         'imageAlt': 'A close up picture of green plant with water droplets on it',
         'description': 'Project 3 Description',
         'link': 'https://www.ucsd.edu/'
      },
      {
         'name': 'Project 4',
         'image': 'image4.jpg',
         'imageAlt': 'A tree filled with purple flowers',
         'description': 'Project 4 Description',
         'link': 'https://www.ucsd.edu/'
      }
   ]