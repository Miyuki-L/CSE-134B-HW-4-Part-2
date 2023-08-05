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

         .project-holder {
            display: grid;
            grid-template-rows:  200px max-content;
            border: 1px solid black;
            border-radius: 5px;
         }

         img {
            object-fit: cover;
            width: 100%;
            height: 100%;
         }

         article {
            margin: 10px;
         }
         h2 {
            border-bottom: 1px solid black;
            margin-block-end: 10px;
         }

         p {
            margin-block-end: 10px;
         }
         </style>
         
         <div class='project-holder'>
            <picture><img src='images/image1.jpg' alt='Project Image'></picture>
            <article>
               <h2>Project Name</h2>
               <p>Project Description</p>
               <a href='URL'>Read More</a>
            </article>
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

   const loadFromBin = document.getElementById('load-jsonBin');
   loadFromBin.addEventListener('click', loadProjectsFromBin);
}

function loadLocalProjects() {
   let data = localStorage.getItem('projects');
   if (!data) {
      localStorage.setItem('projects', JSON.stringify(projectData));
      data = localStorage.getItem('projects');
      console.log('Loading Local Data. Data was not found in localStorage')
   }

   const projects = JSON.parse(data);

   for (let i =0 ; i < projects.length; i++) {
      loadProject(projects[i], 'local');
   }
}

function loadProject(projectInfo, source) {
   let projectElement = document.createElement('project-card')
   let shadow = projectElement.shadowRoot;
   let background;

   if (source === 'local') {
      background = 'var(--local-color)';
   } else if (source === 'bin') {
      background = 'var(--bin-color)';
   } else {
      background = 'var(--remote-color)';
   }

   shadow.querySelector('h2').innerText = projectInfo.name;
   shadow.querySelector('img').src = `images/${projectInfo.image}`;
   shadow.querySelector('img').alt = projectInfo.imageAlt;
   shadow.querySelector('p').innerText = projectInfo.description;
   shadow.querySelector('a').href = projectInfo.link;

   shadow.querySelector('.project-holder').style.backgroundColor = background;

   let img = shadow.querySelector('img');
   img.addEventListener('error', function() {
      img.src = 'images/image1.jpg';
   });

   document.querySelector('output').appendChild(projectElement);
}

function loadCloudProjects() {
   let URI = "https://my-json-server.typicode.com/Miyuki-L/CSE-134B-HW-4-Part-2/projects"
   fetch(URI, {
      method: 'GET',
   }).then((response) => {
      if(!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response.json();
   }).then((data) => {
      for (let i =0 ; i < data.length; i++) {
         loadProject(data[i], 'remote');
      }
   }).catch((error) => {
      console.error('Error:', error);
   });
}

function loadProjectsFromBin() {
   let xhr = new XMLHttpRequest();

   xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
         let data = JSON.parse(xhr.responseText).projects;
         console.log(data);
         for (let index in data) {
            loadProject(data[index], 'bin');
         }
      }
   });

   xhr.open('GET', 'https://api.jsonbin.io/v3/b/64cddac1b89b1e2299cba3c8', true);
   xhr.setRequestHeader('X-Access-Key', '$2b$10$hDvZ4EpB/3mvCTEcZXz.yeqfluH3cwQgrJZv93vPzL5H56hQWBh1a');
   xhr.setRequestHeader('X-Bin-Meta', 'false');

   xhr.send();
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