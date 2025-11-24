// UNIQUE COLLAPSIBLE DROPDOWN SCRIPT
(function () {
  const uniqueButtons = document.querySelectorAll(".uni-dropdown-btn");

  uniqueButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetID = btn.getAttribute("data-target");
      const targetBox = document.getElementById(targetID);

      // Close all other dropdowns
      document.querySelectorAll(".uni-dropdown-content").forEach(content => {
        if (content.id !== targetID) {
          content.style.maxHeight = null;
        }
      });

      // Toggle selected dropdown
      if (targetBox.style.maxHeight) {
        targetBox.style.maxHeight = null;
      } else {
        targetBox.style.maxHeight = targetBox.scrollHeight + "px";
      }
    });
  });
})();

function initUniqueGoogleMap() {
  const location = { lat: 40.7128, lng: -74.0060 }; // Example: New York

  const map = new google.maps.Map(document.getElementById("uniqueMapContainer"), {
    zoom: 12,
    center: location,
  });

  new google.maps.Marker({
    position: location,
    map: map,
  });
};

document.getElementById('uniqueMapContainer').style.height='700px';