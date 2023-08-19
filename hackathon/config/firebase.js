




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


// signIn function firebase
async function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}


// signup function firebase
async function signUpFirebase(userInfo) {
  const { email, password } = userInfo;
  //=================call the firebase built in function to import line No #4
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("userID ===", userCredential.user.uid);
  //=================call the function to make the blew
  await addUserToDb(userInfo, userCredential.user.uid);
}


function addUserToDb(userInfo, uid,) {
  const { firstName, lastName, email, } = userInfo;
  //call the firebase built in function to import the line No #4
  return setDoc(doc(db, "users", uid), { firstName, lastName, email });
}



function addBlogToDb(title, description) {
  // const { title, description, price, location } = cardInformatin;
  const userID = auth.currentUser.uid;

  if (userID) {


    const obj = {
      title,
      description,
      userID
    }
    //===========call the function to import line No #4
    // return addDoc(collection(db, `blogs/${userID}`), obj);
    const messageRef = addDoc(
      collection(db, "blogs", `${userID}`, "post"),
      obj
    );
  } else {
    alert("user not Login")
  }

}

// async function getMyBlogs() {
//   const userID = auth?.currentUser?.uid;
//   // debugg
//   // const userID = auth.currentUser.uid;


//   const docRef = doc(db, "blogs", userID, "post");
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     alert("data find")
//     console.log("Document data:", docSnap.data());
//   } else {
//     alert("doc not found")
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }

// }


async function getMyBlogs() {
  const userID = auth?.currentUser?.uid;

  const querySnapshot = await getDocs(collection(db, "blogs", userID, "post"));
  let ads = [];
  querySnapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  });
  return ads;
}





// function logout() {
//   return signOut(auth);
// }


// function signUpFirebase(userInfo) {
//   const { email, password } = userInfo
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       // ...

//       // addUserToDb(userInfo)

//       // alert('Successfully Registered')
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//       console.log('Error: ', errorMessage)
//     });
// }



export {
  signInFirebase,
  signUpFirebase,
  addBlogToDb,
  getMyBlogs
}