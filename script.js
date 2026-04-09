function calculateAge(){

  try{

    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let color = document.getElementById("color").value;
    let movie = document.getElementById("movie").value;
    let image = document.getElementById("image");

    if(!dob){
      alert("Please enter DOB");
      return;
    }

    let birthDate = new Date(dob);
    let today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if(days < 0){
      months--;
      days += 30;
    }

    if(months < 0){
      years--;
      months += 12;
    }

    let totalDays = Math.floor((today - birthDate)/(1000*60*60*24));

    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if(today > nextBirthday){
      nextBirthday.setFullYear(today.getFullYear()+1);
    }

    let remaining = Math.ceil((nextBirthday - today)/(1000*60*60*24));

    let resultBox = document.getElementById("result");

    resultBox.innerHTML = `
      <h3>${name}</h3>
      <p>Age: ${years}Y ${months}M ${days}D</p>
      <p>Days Lived: ${totalDays}</p>
      <p>Next Birthday: ${remaining} days 🎂</p>
      <p>Favorite Movie: ${movie}</p>
    `;

    resultBox.style.background = color;

    // IMAGE SAFE FIX
    if(image.files.length > 0){

      let reader = new FileReader();

      reader.onload = function(e){
        let img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "90px";
        img.style.height = "90px";
        img.style.borderRadius = "50%";
        resultBox.appendChild(img);
      };

      reader.readAsDataURL(image.files[0]);
    }

    // SAVE DATA
    localStorage.setItem("userData", JSON.stringify({
      name,dob,color,movie
    }));

    // BIRTHDAY ALERT
    if(today.getDate() === birthDate.getDate() &&
       today.getMonth() === birthDate.getMonth()){
      alert("🎉 Happy Birthday!");
    }

  }catch(error){
    console.log("Error:", error);
    alert("Something went wrong. Check console.");
  }
}

// LOAD DATA
window.onload = function(){

  let data = JSON.parse(localStorage.getItem("userData"));

  if(data){
    document.getElementById("name").value = data.name;
    document.getElementById("dob").value = data.dob;
    document.getElementById("color").value = data.color;
    document.getElementById("movie").value = data.movie;
  }
};

// DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}