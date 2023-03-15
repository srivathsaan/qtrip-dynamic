import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);  
  const params = new URLSearchParams(search);
  let res = params.get("adventure");
  // console.log(res);
  return res;



  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    return null;
  }



  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  let heading = document.getElementById("adventure-name");
  heading.innerHTML = adventure.name;
  let subtitle = document.getElementById("adventure-subtitle");
  subtitle.innerHTML = adventure.subtitle;
  let content = document.getElementById("adventure-content");
  content.innerHTML = adventure.content;
  let images = document.getElementById("photo-gallery");

  
  adventure.images.forEach(element => {
    let imgChild = document.createElement('div');
    // console.log(element);
    imgChild.innerHTML = `
    <img class="activity-card-image" src="${element}" alt="..."> 
    `;
    images.append(imgChild);
    
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGal = document.getElementById("photo-gallery");
//   photoGal.innerHTML=`
//   <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
//   <div class="carousel-indicators">
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
//   </div>
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img src="${images[0]}" class="d-block w-100" alt="...">
//     </div>
//     <div class="carousel-item">
//       <img src="${images[1]}" class="d-block w-100" alt="...">
//     </div>
//     <div class="carousel-item">
//       <img src="${images[2]}" class="d-block w-100" alt="...">
//     </div>
//   </div>
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>
//   `;
  
  let photoGalVar =`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">`;
  for(let i=0;i<images.length;i++){ 
   photoGalVar+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide 1"></button>`   
  }
  
  
  photoGalVar+=`
  </div>
  <div class="carousel-inner">`;
  for(let i=0;i<images.length;i++){
    if(i==0){
      photoGalVar+=`<div class="carousel-item active">
      <img src="${images[i]}" class="d-block w-100 activity-card-image" alt="...">
    </div>`;
    }
    else{
      photoGalVar+=`<div class="carousel-item">
      <img src="${images[i]}" class="d-block w-100 activity-card-image" alt="...">
    </div>`;
    }
    
  }

  photoGalVar+=`</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  
  `;
  photoGal.innerHTML=photoGalVar;

  

    
  //   let parentIndi = document.getElementsByClassName("carousel-indicators")[0];
  //   for(let i=0;i<images.length;i++){
  //     let childIndi = document.createElement("button");
  //     childIndi.setAttribute("type","button");
  //     childIndi.setAttribute("data-bs-target","#carouselExampleIndicators");
  //     childIndi.setAttribute("data-bs-slide-to",i);
  //     let j = "Slide "+i;
  //     childIndi.setAttribute("aria-label",j);
      
  //     if(i===0){
  //       childIndi.setAttribute("className","active");
  //     childIndi.setAttribute("aria-current","true");
  //     } 
  //     parentIndi.append(childIndi);
  //   }

  // let parent = document.getElementsByClassName("carousel-inner")[0];
 
  // for(let i=0;i<images.length;i++){
  

  //   let child = document.createElement("div");
  //   child.setAttribute("className","carousel-item");
  //   if(i===0){
  //     child.setAttribute("className","carousel-item active");
  //   }
  //   child.innerHTML=`
  //   <img src="${images[i]}" class="d-block w-100 img-fluid activity-card-image" alt="...">
  //   `;
  //   parent.append(child);
  // }
  
 
  
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
    
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  // reservation-cost
  // console.log(adventure,persons);
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let reservationForm = document.getElementById("myForm");

  reservationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector('input[name="name"]').value;
  let date = document.querySelector('input[name="date"]').value;
  let number = document.querySelector('input[name="person"]').value;

  console.log(name,date,number);

  const send = {
    name: name,
    date: date,
    person: number,
    adventure: adventure.id
  };
    
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(send),
  };

  // let post = await fetch(`${config.backendEndpoint}/reservations/new`, options);
  
  fetch(`${config.backendEndpoint}/reservations/new`,options)
  .then(function(response){ 
    alert("Success!");  
  return response.json()})
  .then(send => {
    console.log(send);
    location.reload();
    }).catch(error =>{
      alert("Failed!");
      return null;

    } ); 




});

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";

  }
  
  

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
