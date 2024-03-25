// Function to fetch crafts data from server
const getCrafts = async () => {
    try {
        const response = await fetch("/api/crafts");
        return response.json();
    } catch (error) {
        console.log("Error retrieving data:", error);
        return [];
    }
};

// Function to display modal dialog with craft details
const showModal = (craft) => {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = craft.name;
    modalBody.innerHTML = `
        <img src="images/${craft.image}" alt="${craft.name}" style="width:50%">
        <p>${craft.description}</p>
        <h3>Supplies:</h3>
        <ul>${craft.supplies.map(item => `<li>${item}</li>`).join("")}</ul>
    `;

    modal.style.display = "block";
};

// Function to close modal dialog
const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
};

// Fetch crafts data and populate gallery
const populateGallery = async () => {
    const crafts = await getCrafts();
    const gallery = document.querySelector(".gallery");
    crafts.forEach(craft => {
        const img = document.createElement("img");
        img.src = `images/${craft.image}`;
        img.alt = craft.name;
        img.onclick = () => showModal(craft); // Use onclick to show modal on image click
        gallery.appendChild(img);
    });
};

populateGallery();

// Close modal dialog when close button is clicked
document.querySelector(".w3-button").addEventListener("click", closeModal);

// Close modal dialog when clicking outside the modal
window.onclick = (event) => {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
};
