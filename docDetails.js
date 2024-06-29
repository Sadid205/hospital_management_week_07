const getParams = () =>{
    const param = new URLSearchParams(window.location.search).get("doctorId");
    console.log(param)
    // fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    // .then((res)=>res.json())
    // .then((data)=>console.log(data))
}


getParams()