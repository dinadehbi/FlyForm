const myForm = document.getElementById('myForm');
const myForm2 = document.getElementById('secondForm');
const Ereur = document.getElementById('Ereur');
const lienLogIn = document.getElementById("lienLogin");
const logInButton = document.getElementById("LogIn");
const signUpButton = document.getElementById("signup");

lienLogIn.addEventListener("click", function(e){
    e.preventDefault(); 
    myForm.style.display= "none";
    myForm2.style.display = "block";
    
})
signUpButton.addEventListener("click",function(){

myForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        if (data === 'Registration successful') {
            myForm.style.display="none";
            myForm2.style.display="block";
            console.log(data);

        }else {
            Ereur.style.display="block";
            Ereur.innerHTML = data;
            console.log(data);
            
            }
            
            
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
})


logInButton.addEventListener("click", function(){
    myForm2.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData2 = new FormData(this);

        fetch('login.php', {
            method: 'POST',
            body: formData2
        })
        .then(response2 => {
            if (!response2.ok) {
                alert('Network response was not ok');
            }
            return response2.text();
        })
        .then(data=> {
        
            if (data === 'true') {
                myForm2.style.display="none";
                console.log(data);

            }else {
                Ereur.style.display="block";
                Ereur.innerHTML = data;
                console.log(data);
                
                }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
})
