let CRUDProjects = {};
function customRead(options) {
   // Handle manipulation of data here
   fetch(`https://api.jsonbin.io/v3/b/64cddac1b89b1e2299cba3c8`, {
     method: 'GET',
     headers: {"X-Access-Key": "$2b$10$hDvZ4EpB/3mvCTEcZXz.yeqfluH3cwQgrJZv93vPzL5H56hQWBh1a"},
   }).then(response => response.json())
     .then((data) => {
       // Call callback to update grid
       CRUDProjects = data.record;
       options.callback(data.record.projects);
     });
 };

function customCreate(rawData, options) {
   // Handle manipulation of data here
   CRUDProjects.projects.push(rawData);
   fetch(`https://api.jsonbin.io/v3/b/64cddac1b89b1e2299cba3c8`, {
     method: 'PUT',
     headers: {"X-Access-Key": "$2b$10$hDvZ4EpB/3mvCTEcZXz.yeqfluH3cwQgrJZv93vPzL5H56hQWBh1a", 'Content-Type': 'application/json'},
     body: JSON.stringify(CRUDProjects)
   }, true).then(response => response.json())
     .then((data) => {
       // Call callback to update grid
       options.callback();
     });
};

function customUpdate(recordId, rawData, options) {
   // Handle manipulation of data here
   let index = recordId.substring(12);
   CRUDProjects.projects[index] = rawData;

   fetch(`https://api.jsonbin.io/v3/b/64cddac1b89b1e2299cba3c8`, {
     method: 'PUT',
     headers: {"X-Access-Key": "$2b$10$hDvZ4EpB/3mvCTEcZXz.yeqfluH3cwQgrJZv93vPzL5H56hQWBh1a", 'Content-Type': 'application/json'},
     body: JSON.stringify(CRUDProjects)
   }, true).then(response => response.json())
     .then(() => {
       // Call callback to update grid
       options.callback();
     });
};

function customDelete(recordId, rawData, options) {
   let index = recordId.substring(12);
   CRUDProjects.projects.splice(index, 1);

   fetch(`https://api.jsonbin.io/v3/b/64cddac1b89b1e2299cba3c8`, {
     method: 'PUT',
     headers: {"X-Access-Key": "$2b$10$hDvZ4EpB/3mvCTEcZXz.yeqfluH3cwQgrJZv93vPzL5H56hQWBh1a", 'Content-Type': 'application/json'},
     body: JSON.stringify(CRUDProjects)
   }, true).then(response => response.json())
     .then(() => {
       // Call callback to update grid
       options.callback();
     });

}