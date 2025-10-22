// Header start

// Original JavaScript content (naithika.js) combined here
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.header_mobile_menu_toggle');
        const mobileMenu = document.querySelector('.header_mobile_menu');
        // Get the closest <a> tag to the logo image
        const logoLink = document.getElementById('header_logo_image').closest('a');

        // Toggle Menu Function
        const toggleMobileMenu = () => {
            // Toggles the 'is-active' class to start/reverse the CSS transition
            mobileMenu.classList.toggle('is-active'); 
            // Optional: Toggle a class on the body to prevent background scrolling
            document.body.classList.toggle('no-scroll');
        };

        // 1. Listen for clicks on the Hamburger Icon
        menuToggle.addEventListener('click', toggleMobileMenu);

        // 2. Optional: Close the menu when the Logo is clicked (since it navigates home)
        logoLink.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-active')) {
                mobileMenu.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            }
        });

        // 3. Close the menu when a link inside the header_nav_list is clicked.
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu); // Calls the toggle function to close it
        });
    });

// Header end

// Product page start

// Function to truncate text for the front face
    function truncateText(text, wordLimit) {
        if (!text) return { truncatedText: "", isTruncated: false };
        const words = text.trim().split(/\s+/);
        if (words.length > wordLimit) {
            return { 
                truncatedText: words.slice(0, wordLimit).join(" "), 
                isTruncated: true 
            };
        }
        return { truncatedText: text, isTruncated: false };
    }

    function initProductCards() {
        const cards = document.querySelectorAll('.product-card');
        const wordLimit = 15; // Word limit for front face

        cards.forEach(card => {
            const innerCard = card.querySelector('.product-card-inner');
            const fullDescriptionElement = card.querySelector('.product-card-back .product-full-content p');
            const shortDescriptionTextElement = card.querySelector('.product-short-description-text');
            const moreLink = card.querySelector('.product-more-link');
            const lessLink = card.querySelector('.product-less-link');

            if (fullDescriptionElement && shortDescriptionTextElement && moreLink) {
                const fullText = fullDescriptionElement.textContent;

                // Truncate text
                const { truncatedText, isTruncated } = truncateText(fullText, wordLimit);
                shortDescriptionTextElement.textContent = truncatedText;

                if (isTruncated) {
                    moreLink.style.display = 'inline'; // Show "...more" link

                    // Click Event: Flip to the back
                    moreLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        innerCard.classList.add('is-flipped');
                    });
                } else {
                    moreLink.style.display = 'none'; // Hide if not truncated
                }
            }

            // Function to unflip the card
            function unflipCard(event) {
                if (event) event.preventDefault(); // Prevent link navigation
                innerCard.classList.remove('is-flipped');
            }

            // Mouse Leave: Flip back to front
            card.addEventListener('mouseleave', unflipCard);

            // Clicking the less link: Flip back
            if (lessLink) {
                lessLink.addEventListener('click', unflipCard);
            }

            // "Buy Now" button on the front no longer has flip logic attached
        });
    }

    // Initialize on page load
    window.onload = function() {
        initProductCards();
    };


// Product page end

// Contact Us page start

    const contactusForm = document.getElementById('contactusForm');
    const contactusSuccessMessage = document.getElementById('contactusSuccessMessage');
    // Function to show the success modal
    function contactusShowSuccess() {
        contactusSuccessMessage.classList.remove('contactus-hidden');
    }
    // Function to hide the success modal and reset form
    function contactusHideSuccess(event) {
        // Prevent button click from closing the modal then closing it again via overlay
        if(event) event.stopPropagation(); 
        contactusSuccessMessage.classList.add('contactus-hidden');
        contactusForm.reset(); // Clear the form fields
    }
    // Event listener for form submission
    contactusForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior (which would reload the page)
        event.preventDefault();
        // Simulate form data processing
        console.log('Form submitted (simulated)');
        // Show the success message
        contactusShowSuccess();
    });

// Contact Us page end