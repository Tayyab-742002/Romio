document.addEventListener("DOMContentLoaded", () => {
  const tripCalculator = document.getElementById("tripCalculator");

  const calculationResult = document.getElementById("calculationResult");
});

// Base prices for different destinations
const destinationPrices = {
  paris: 1000,
  tokyo: 1200,
  bali: 800,
  nyc: 900,
};

// Accommodation multipliers
const accommodationMultipliers = {
  budget: 1,
  standard: 1.3,
  luxury: 1.8,
};

// Additional service prices
const servicePrices = {
  guide: 50,
  transport: 30,
  insurance: 40,
};

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.container = document.querySelector(".testimonials-container");
    this.cards = Array.from(document.querySelectorAll(".testimonial-card"));
    this.currentIndex = 0;
    this.totalSlides = this.cards.length;
    // Create dots
    this.dotsContainer = document.querySelector(".testimonial-dots");
    this.createDots();

    // Add event listeners
    document
      .querySelector(".prev-btn")
      .addEventListener("click", () => this.prevSlide());
    document
      .querySelector(".next-btn")
      .addEventListener("click", () => this.nextSlide());

    // Initialize slider
    this.updateSlides();

    // Auto-play
    this.startAutoPlay();
  }

  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateSlides() {
    this.cards.forEach((card, index) => {
      card.classList.remove("active", "prev");
      if (index === this.currentIndex) {
        card.classList.add("active");
      } else if (index === this.getPrevIndex()) {
        card.classList.add("prev");
      }
    });

    // Update dots
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  getPrevIndex() {
    return (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlides();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlides();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlides();
  }

  startAutoPlay() {
    setInterval(() => {
      console.log("Auto Start");
      this.nextSlide();
    }, 5000);
  }
}

// // Initialize testimonials slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Content Loaded");

  new TestimonialsSlider();
});

// Enhanced scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll(".service-card, .destination-card").forEach((el) => {
  observer.observe(el);
});
tripCalculator.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const destination = document.getElementById("destination").value;
  // Calculate base cost  const destination = document.getElementById("destination").value;
  const travelers = parseInt(document.getElementById("travelers").value);
  const duration = parseInt(document.getElementById("duration").value);
  const accommodation = document.getElementById("accommodation").value;
  let baseCost = destinationPrices[destination] * travelers * duration;
  baseCost *= accommodationMultipliers[accommodation];

  // Calculate additional services cost
  let servicesCost = 0;
  ["guide", "transport", "insurance"].forEach((service) => {
    if (document.getElementById(service).checked) {
      servicesCost += servicePrices[service] * travelers * duration;
    }
  });

  // Update result display
  document.getElementById("baseCost").textContent = `$${baseCost.toFixed(2)}`;
  document.getElementById(
    "servicesCost"
  ).textContent = `$${servicesCost.toFixed(2)}`;
  document.getElementById("totalCost").textContent = `$${(
    baseCost + servicesCost
  ).toFixed(2)}`;

  // Show result
  calculationResult.classList.remove("hidden");
});

// Contact Form Scripting
(function () {
  emailjs.init({
    publicKey: "CjPN3EDhoENHpkWlG",
  });
})();

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const btnText = contactForm.querySelector(".btn-text");
const btnLoader = contactForm.querySelector(".btn-loader");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show loading state
  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");

  // Prepare form data
  const templateParams = {
    to_email: "Akhadovakamola1998@gmail.com",
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Send email using EmailJS
  emailjs
    .send("service_ziu2r0g", "template_61u4ave", templateParams)
    .then(
      function (response) {
        alert("Message sent successfully!");
        contactForm.reset();
      },
      function (error) {
        alert("Failed to send message. Please try again.");
      }
    )
    .finally(function () {
      // Hide loading state
      btnText.classList.remove("hidden");
      btnLoader.classList.add("hidden");
    });
});

// Newsletter Form Handling
const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert("Thank you for subscribing! You will receive our updates at: " + email);
  this.reset();
});
