const myForm = document.getElementById("myForm");
const secondForm = document.getElementById("secondForm");
const signupButton = document.getElementById("signup");

signupButton.addEventListener("click", submitForm);

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(myForm);
    console.log(formData);

    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Assuming the response from signup.php indicates success
       
    })
    .catch(error => {
        console.error(error);
        console.log('Something went wrong');
    });

}
if (submitForm() == true) {
    // Hide current form and show second form
    /*
    myForm.style.display = "none";
    secondForm.style.display = "block";
    */
   console.log("data submited successfully");
} else {
    console.log("The form was not submitted successfully.");
}

// Remove this line as it's redundant
// submitForm();
