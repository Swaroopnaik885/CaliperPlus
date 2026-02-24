import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAS5Z9HxPeZCPDsP1bOdmhCa9R3X5HOpIs",
  authDomain: "caliperplus--database.firebaseapp.com",
  projectId: "caliperplus--database",
  storageBucket: "caliperplus--database.firebasestorage.app",
  messagingSenderId: "114078038458",
  appId: "1:114078038458:web:42cff5f3de373533d34583",
  databaseURL: "https://caliperplus--database-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const serviceFormRef = ref(db, "ServiceFormSubmissions"); // use const

function saveServiceFormData(
  Fname, Email, Phone, State, City,
  PinCode, VRN, CarMake, CarModel,
  ServiceRequired, Comments
) {
  const newFormRef = push(serviceFormRef);

  return set(newFormRef, {
    name: Fname,
    email: Email,
    phone: Phone,
    state: State,
    city: City,
    pinCode: PinCode,
    VRN: VRN,
    carMake: CarMake,
    carModel: CarModel,
    serviceRequired: ServiceRequired,
    comments: Comments
  });
}


// JS for Form Submission
// Form Submission
document.querySelector("#ServiceForm").addEventListener("submit", function(e) {

    e.preventDefault();   // STOP normal form submission

    let form = document.getElementById("ServiceForm");
    let formData = new FormData(form);
    let note1 = document.getElementById("note1");
    // Hide initially
    note1.style.display = "none";

    // ---------- 1️⃣ SAVE TO FIREBASE ----------
    saveServiceFormData(
        formData.get("name"),
        formData.get("email"),
        formData.get("phone"),
        formData.get("state"),
        formData.get("city"),
        formData.get("pinCode"),
        formData.get("VRN"),
        formData.get("carMake"),
        formData.get("carModel"),
        formData.get("serviceRequired"),
        formData.get("comments")
    );

    // ---------- 2️⃣ SEND TO PHP ----------
    fetch("service.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert("Saved to Firebase + MySQL successfully!");
        console.log(data);
        form.reset();
        // SHOW after success
        note1.style.display = "flex";
    })
    .catch(error => {
        console.error("Error:", error);
    });

});























let Ch_Image = document.getElementById("ChangeImage");

let images = [
  "../Images/OS-Side-BG-1.png",
  "../Images/OS-Side-BG-2.png",
  "../Images/OS-Side-BG-3.png",
  "../Images/OS-Side-BG-4.png"
];

let index = 0;

setInterval(() => {

  // Fade out + slight zoom in
  Ch_Image.classList.remove("opacity-100", "scale-100");
  Ch_Image.classList.add("opacity-0", "scale-110");

  setTimeout(() => {
    index = (index + 1) % images.length;
    Ch_Image.src = images[index];

    // Fade in + reset zoom
    Ch_Image.classList.remove("opacity-0", "scale-110");
    Ch_Image.classList.add("opacity-100", "scale-100");

  }, 400); // match duration-700

}, 5000); // change every 4 seconds
