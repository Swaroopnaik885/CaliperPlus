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
document.querySelector("#ServiceForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = document.getElementById("ServiceForm");
  const formData = new FormData(form);
  const note1 = document.getElementById("note1");

  note1.style.display = "none";

  try {
    // 1️⃣ Save to Firebase first
    await saveServiceFormData(
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

    // 2️⃣ Send email using EmailJS
    await emailjs.send("service_fi0xb7m", "template_hyz516n", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      state: formData.get("state"),
      city: formData.get("city"),
      pinCode: formData.get("pinCode"),
      VRN: formData.get("VRN"),
      carMake: formData.get("carMake"),
      carModel: formData.get("carModel"),
      serviceRequired: formData.get("serviceRequired"),
      comments: formData.get("comments"),
      time: new Date().toLocaleString()
    });

    // 3️⃣ Keep PHP call, but don't let it break anything if unavailable
    try {
      const response = await fetch("service.php", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.text();
        console.log("PHP Response:", data);
      }
    } catch (phpError) {
      console.warn("service.php not available after deployment:", phpError);
    }

    // 4️⃣ Success UI
    form.reset();
    note1.style.display = "flex";
    alert("Form submitted successfully!");

  } catch (error) {
    console.error("Submission Error:", error);
    alert("Something went wrong while submitting the form.");
  }
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
