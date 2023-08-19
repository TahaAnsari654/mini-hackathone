import { addBlogToDb, getMyBlogs } from "../config/firebase.js"
window.publish = async function () {

    const title = document.getElementById("title").value
    const description = document.getElementById("description").value


    ///2)firebase ka function to call karaga jo ka firebase.js ka andr bana hu wa ha

    if (title !== "" && description !== "") {
        try {
            // document.getElementsByClassName("submit")[0].style.display = "none";
            // document.getElementsByClassName("loading")[0].style.display = "block";

            await addBlogToDb(title, description);
            await Swal.fire({
                icon: "success",
                title: "Add post Succesfully",
                showConfirmButton: false,
                timer: 1500,
            });
            title = ""
            description = ""

        } catch (e) {
            console.log(e.message);
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill The Form",
        });
    }
};
const post = await getMyBlogs()
alert(post)
console.log("get data", post)

