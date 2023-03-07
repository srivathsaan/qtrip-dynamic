import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }

  //console.log("From init()");
  console.log(config.backendEndpoint);
  console.log(cities);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let response = await fetch(`${config.backendEndpoint}/cities`);
    let data = await response.json();
    return data;
  }catch(error){
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent = document.getElementById("data");
  let child = document.createElement("div");
  child.className =" col-6 col-md-4 col-lg-3 mb-4 ";
  child.innerHTML =`<div class="tile">
  <a href="pages/adventures/?city=${id}" id="${id}">
    
      <img class="img-fluid d-flex align-items-stretch" src="${image}" alt="${city}">
    <div class="tile-text text-center"> 
      <p>${city}</p>
      <p>${description}</p>
    </div>     
  </a>
</div>`;
parent.append(child);


}

export { init, fetchCities, addCityToDOM };
