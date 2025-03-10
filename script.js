document.querySelector("form").addEventListener("submit", function() {
    alert("Enquiry sent! We will contact you soon.");
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const images = track.children;
    const imagesPerSlide = window.innerWidth > 768 ? 3 : 1;
    const totalImages = images.length;

    let index = 0;

    // Clone first few images and append them at the end for smooth looping
    for (let i = 0; i < imagesPerSlide; i++) {
        let clone = images[i].cloneNode(true);
        track.appendChild(clone);
    }

    function updateCarousel() {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${index * (100 / imagesPerSlide)}%)`;

        // Reset transition when reaching cloned images
        if (index >= totalImages) {
            setTimeout(() => {
                track.style.transition = "none";
                index = 0;
                track.style.transform = `translateX(0%)`;
            }, 500);
        }
    }

    function nextSlide() {
        index++;
        updateCarousel();
    }

    function prevSlide() {
        index--;
        if (index < 0) {
            index = totalImages - 1;
            track.style.transition = "none";
            track.style.transform = `translateX(-${index * (100 / imagesPerSlide)}%)`;
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
                index--;
                updateCarousel();
            }, 10);
        } else {
            updateCarousel();
        }
    }

    let autoSlide = setInterval(nextSlide, 3000); // Auto slide every 3s

    nextBtn.addEventListener("click", () => {
        nextSlide();
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 3000);
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 3000);
    });

    // Swipe support for mobile
    let startX = 0;
    track.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    track.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide();
        if (endX - startX > 50) prevSlide();
    });
});

