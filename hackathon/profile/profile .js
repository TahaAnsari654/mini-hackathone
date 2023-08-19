import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    orderBy,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXi56s5EXFZvSAGQdlYmn8x536DADsyFc",
    authDomain: "minihackthone.firebaseapp.com",
    projectId: "minihackthone",
    storageBucket: "minihackthone.appspot.com",
    messagingSenderId: "1031810868877",
    appId: "1:1031810868877:web:574feccefe44aff42824c4"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("currect", auth.currentUser)
const db = getFirestore(app);







const fileInput = document.getElementById("file-input");

fileInput && fileInput.addEventListener("change", () => {
    console.log(fileInput.files[0])
    userProfile.src = URL.createObjectURL(fileInput.files[0])
})

const updateProfile = document.getElementById("update-profile");

updateProfile && updateProfile.addEventListener("click", async () => {
    let uid = localStorage.getItem("uid")
    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    const imageUrl = await uploadFile(fileInput.files[0])
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
        fullName: fullName.value,
        email: email.value,
        picture: imageUrl
    });
    Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
    })
})