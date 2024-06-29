const serviceLoader = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayServices(data))
    .catch((err) => console.log(err));
};

const displayServices = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("parent");
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="card service_card shadow h-100">
            <div class="ratio ratio-1x1">
                <img src="${service.image}" class="card-img-top" loading="lazy" alt="...">
            </div>
            <div class="card-body">
                <h4 class="text-success fw-bold">${service.name}</h4>     
                <p>${service.description.slice(0,100)}</p>
                <a style="cursor:pointer" class="text-success text-decoration-none fw-bold">Learn More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg></a>
            </div>
        </div>
        `;
    parent.appendChild(li);
  });
};


const loadDoctors = (search) =>{
    // document.getElementById('doc_list').innerHTML = "";
    document.getElementById("spinner_div").style.display = "block"
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search ? search :""}`)
    .then((res)=>res.json())
    .then((data)=>{
        if (data.results.length > 0){
            document.getElementById("spinner_div").style.display = "none";
            document.getElementById("nodata_div").style.display = "none";
            displayDoctors(data);
        } else {
            document.getElementById('doc_list').innerHTML = "";
            document.getElementById('spinner_div').style.display = "none";
            document.getElementById('nodata_div').style.display = "block";
        }
    })
    .catch((err)=> console.log(err))
}

const displayDoctors = (doctorsList)=>{
    const div = document.createElement('div')
    const parent = document.getElementById('doc_list')
    doctorsList.results.forEach((doctor)=>{
        div.innerHTML = `
        <div class="doc_card">
           <div class="d-flex align-items-center justify-content-center">
               <img class="card_image" src="${doctor.image}" alt="image">
           </div>
           <div class="doc_card_body text-center">
               <h5 class="fw-bold text-success">${doctor.full_name}</h5>
               ${doctor?.designation.map((deg)=>{
                return `<h5 class="fw-bold">${deg}</h5>`
               })}
               <p class="text-secondary">Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. </p>
               ${doctor?.specialization.map((deg)=>{
                return `<button class="disabled btn btn-sm">${deg}</button>`
               })}
               
           </div>
       <a target="_blank" href="doctor_details.html " class="btn mt-4 w-100 btn-outline-info">Details</a>
       </div>
       `
       parent.appendChild(div)
    })
   
}

const loadDesignation = ()=>{
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((item)=>{
            const parent = document.getElementById('des_id')
            const li = document.createElement('li')
            li.classList.add("dropdown-item")
            li.innerText = item?.name;
            li.innerHTML = `
            <li onclick="loadDoctors('${item.name}')" >${item.name}</li>
            `
            parent.appendChild(li);
        })
    })
    .catch((err)=>console.log(err))
}
const loadSpecialization = ()=>{
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((item)=>{
            const parent = document.getElementById('spez_id')
            const li = document.createElement('li')
            li.classList.add("dropdown-item")
            li.innerText = item?.name;
            li.innerHTML = `
            <li onclick="loadDoctors('${item.name}')" >${item.name}</li>
            `
            parent.appendChild(li);
        })
    })
    .catch((err)=>console.log(err))
}


const handleSearch = () =>{
    const value = document.getElementById("search").value
    loadDoctors(value)
}

loadDesignation()
loadSpecialization()
loadDoctors()
serviceLoader();
