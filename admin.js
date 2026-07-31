const form = document.getElementById("scoreForm");

const message = document.getElementById("message");


form.addEventListener(
"submit",
async function(e){


    e.preventDefault();


    const team =
        document.getElementById("team").value;


    const challenge =
        document.getElementById("challenge").value;


    const points =
        document.getElementById("points").value;



    message.innerHTML =
        "Submitting... ⏳";


    try {


        const response = await fetch(
            "/.netlify/functions/submit-score",
            {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                team,
                challenge,
                points

            })

        });



        const data =
            await response.json();



        if(data.success){


            message.innerHTML =
            "✅ Score submitted!";


            form.reset();


        }
        else {


            message.innerHTML =
            "❌ Error submitting score";


        }



    }
    catch(error){


        console.error(error);


        message.innerHTML =
        "❌ Connection error";


    }


});