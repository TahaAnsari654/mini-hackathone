import { signInFirebase, signUpFirebase } from '../config/firebase.js'


window.login = async function () {
    //1)get the value in regsiter webpage
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginpassword").value




    ///2)firebase ka function to call karaga jo ka firebase.js ka andr bana hu wa ha

    if (email !== "" && password !== "") {
        try {
            // document.getElementsByClassName("submit")[0].style.display = "none";
            // document.getElementsByClassName("loading")[0].style.display = "block";

            const loginData = await signInFirebase(email, password);
            await Swal.fire({
                icon: "success",
                title: "Successfully LoggIn",
                showConfirmButton: false,
                timer: 1500,
            });
            localStorage.setItem("uid", loginData?.user?.uid)

            location.replace("../dashboard/dashboard.html")
        } catch (e) {
            switch (e.message) {
                case "Firebase: Error (auth/invalid-email).":
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";

                    Swal.fire({
                        icon: "error",
                        title: "Invalid Email",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    break;
                case "Firebase: Error (auth/wrong-password).":
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";

                    Swal.fire({
                        icon: "error",
                        title: "Invalid password",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
                case "Firebase: Error (auth/user-not-found).":
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";
                    Swal.fire({
                        icon: "error",
                        title: "User Not Found",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;

                default:
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";
                    Swal.fire({
                        icon: "error",
                        title: "Unknown Error Occured",
                        showConfirmButton: false,
                        timer: 1500,
                    });
            }
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill The Form",
        });
    }
};


window.register = async function () {
    //1)get the value in regsiter webpage
    ///2)firebase ka function to call karaga jo ka firebas  e.js ka andr bana hu wa ha
    const firstName = document.getElementById("signupFirstName").value
    const lastName = document.getElementById("signupLastName").value
    const email = document.getElementById("signupEmail").value
    const password = document.getElementById("signupPassword").value
    const singUpCPassword = document.getElementById("signupCPassword").value
    if (password !== singUpCPassword) Swal.fire({
        icon: 'error',
        title: 'Password not match',
        showConfirmButton: false,
        timer: 1500
    })

    if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
        try {

            // document.getElementsByClassName("submit")[0].style.display = "none";
            // document.getElementsByClassName("loading")[0].style.display = "block";

            await signUpFirebase({ firstName, lastName, email, password })
            await Swal.fire({
                icon: 'success',
                title: 'REGISTER SUCCESS FULLY',
                showConfirmButton: false,
                timer: 1500
            })
            // document.getElementsByClassName("submit")[0].style.display = "block";
            // document.getElementsByClassName("loading")[0].style.display = "none";
            window.location.replace("./loginAndSignup.html")

            // userName=""
            // email=""
            // password=""
            // age=""
        } catch (e) {
            switch (e.message) {
                case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";

                    Swal.fire({
                        icon: "error",
                        title: "Weak Password",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    break;
                case "Firebase: Error (auth/invalid-email).":
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";

                    Swal.fire({
                        icon: "error",
                        title: "Invalid Email",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
                case "Firebase: Error (auth/email-already-in-use).":
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";

                    Swal.fire({
                        icon: "error",
                        title: "Email Already Exist",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;

                default:
                    // document.getElementsByClassName("loading")[0].style.display = "none";
                    // document.getElementsByClassName("submit")[0].style.display = "block";
                    Swal.fire({
                        icon: "error",
                        title: "Unknown Error Occured",
                        showConfirmButton: false,
                        timer: 1500,
                    });
            }

            // const showError = document.getElementById("error")
            // showError.innerHTML = e.message
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill The Form',
        })
    }


}




