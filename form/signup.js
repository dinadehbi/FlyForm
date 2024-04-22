const myForm = document.getElementById("myForm");
const secondForm = document.getElementById("secondForm");
const signupButton = document.getElementById("signup");


myForm.addEventListener("submit", e => {
    e.preventDefault();
})

signupButton.addEventListener("click", () => {
    
        const formData = new FormData(myForm);
        console.log(formData);

        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {

            // Check if submission was successful
            if (data === "success") {
               console.log("the forn is sublitted");
                myForm.style.display = "none";
                secondForm.style.display = "block";
            } else {
                console.log(data);
            }
        })
        .catch(error => {
            console.error(error);
            console.log('Something went wrong');
        });
    

    
});
