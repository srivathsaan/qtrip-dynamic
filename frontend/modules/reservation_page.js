import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(
      `${config.backendEndpoint}/reservations/`
    );
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations.length>0){
  document.getElementById("no-reservation-banner").style.display = "none";
  document.getElementById("reservation-table-parent").style.display = "block";

  for(let i = 0; i<reservations.length;i++){
    let tbody = document.getElementById("reservation-table");
    let tr = document.createElement("tr");
    let dateIn = reservations[i].date.split("-");
    const dat = new Date(Date.UTC(dateIn[0], dateIn[1]-1, dateIn[2], 0, 0, 0));
    

    console.log(reservations[i].time);
    let time =reservations[i].time.split(" ");
    console.log(time);
    let month ={
      Jan:"January",
      Feb:"February",
      Mar:"March",
      Apr:"April",
      May:"May",
      Jun:"June",
      Jul:"July",
      Aug:"August",
      Sep:"September",
      Oct:"October",
      Nov:"November",
      Dec:"December"

    }

   
    const d = new Date(reservations[i].time);
    let text = d.toLocaleString('en-In',{day:"numeric",month :"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}).replace(" at",",");
    console.log(text);
    // const timeString = time[4];
    console.log(time[4]);
    
    // var hours = time[4].getHours(); // gives the value in 24 hours format
    // var minutes = time[4].getMinutes() ; 
    // var finalTime = "Time  - " + hours + ":" + minutes; 
      
// // Prepend any date. Use your birthday.
//     const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
//   .toLocaleTimeString('en-IN',
//     {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
//   );
    let timeFinal =time[2]+" "+month[time[1]]+" "+time[3]+", "+time[4];
    
    
    let ref = parseInt(reservations[i].adventure)
    console.log(ref);
    let row = `
      <td><b>${reservations[i].id}</b></td>
      <td>${reservations[i].name}</td>
      <td>${reservations[i].adventureName}</td>
      <td>${reservations[i].person}</td>
      <td>${dat.toLocaleDateString("en-IN")}</td>
      <td>${reservations[i].price}</td>
      <td>${text}</td>
      <td><button id=${reservations[i].id} class="reservation-visit-button"><a style="display:hidden" href="/detail/?adventure=${ref}"><a  href="/frontend/pages/adventures/detail/?adventure=${ref}">Visit Adventure</a></a></button></td>
      
      
    `;
    tr.innerHTML = row;
    tbody.append(tr);
    
  }
  // adventures/detail/

 }
 else{
  document.getElementById("reservation-table-parent").style.display = "none";
  document.getElementById("no-reservation-banner").style.display = "block";

 }

}

export { fetchReservations, addReservationToTable };
