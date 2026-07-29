const API = "https://nozstream-2.onrender.com";


async function register(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    const response = await fetch(API + "/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    });


    const data = await response.json();

    document.getElementById("result").innerHTML = data.message;

}



async function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    const response = await fetch(API + "/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    });


    const data = await response.json();

    document.getElementById("result").innerHTML = data.message;

}
