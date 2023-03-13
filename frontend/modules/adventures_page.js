import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log (search);
  const params = new URLSearchParams(search);
  //const res = search.split("=")[1];
  let res = params.get("city");
  return res;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log(city);
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // if (adventures) {
  //   adventures.forEach((key) => {
  //     console.log(key.id, key.duration, key.name, key.image,key.currency,key.category);
  //   });
  // }
  let parent = document.getElementById("data");
  adventures.forEach((key) => {
    
    let child = document.createElement("div");
    child.className = " col-6 col-lg-3 mb-4  ";
    child.innerHTML = `<a href="detail/?adventure=${key.id}" id=${key.id}>
      <div class ="activity-card card">
        <h class = "category-banner">${key.category}</h>
        <img class="card-img" src =${key.image} />
        <div class="card-body d-flex justify-content-between style="width:100%">
          <p class="p-2">${key.name}</p>
          <p class="p-2">₹${key.costPerHead}</p>
        </div>
        <div class="card-body d-flex justify-content-between" style="width:100%">
          <p class="p-2">Duration</p>
          <p class="p-2">${key.duration} Hours</p>
        </div>
      </div>
      </a>
    `;
    parent.append(child);
    




  });
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list);


  let listDur =[];
  list.forEach(element => {
    if(element.duration>=low && element.duration<=high){
      listDur.push(element);
    }
    
  });
  return listDur;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let listCat =[];
  list.forEach(element => {
    if(categoryList.includes(element.category)){
      listCat.push(element);
    }
    
  });


  return listCat;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(list,filters.category);
  // console.log(filters);

  let catList = null;
  let durList= null;
  let low = null;
  let high = null;

  low  = filters.duration.split('-')[0];
  high = filters.duration.split('-')[1];
  // console.log(low,high);


  if(filters.category.length>0)
  {
   catList =filterByCategory(list,filters.category);

   if(high>0){
    durList = filterByDuration(catList,low,high);
    return durList;
   }

   return catList;
  }
  else{
    if(high>0){
      durList = filterByDuration(list,low,high);
      return durList;
     }
    return list;
  }
  
 
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // console.log(filters);
  
  window.localStorage.setItem('filters',JSON.stringify(filters));
  
  
  

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let res = JSON.parse(localStorage.getItem('filters'));
  // console.log("res:",res);
  if(res !=null){
    return res;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log(filters);
  let pillParent = document.getElementById("category-list");
  filters.category.forEach(element => {
    let pill = document.createElement('p');
    pill.className = " category-filter";
  pill.innerHTML =`${element}`;  
  pillParent.append(pill);
  });
  

  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
