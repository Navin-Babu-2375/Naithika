// Header start

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.header_mobile_menu_toggle');
    const mobileMenu = document.querySelector('.header_mobile_menu');
    const logoLink = document.getElementById('header_logo_image').closest('a');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('is-active');
        document.body.classList.toggle('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    logoLink.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-active')) {
            mobileMenu.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('.nav-link, .mobile-sub-item');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
});


// Header end


// Products page start


// Function to truncate text for the front face
        function truncateText(text, wordLimit) {
            // Remove the '...less' link text from the description before truncating
            let cleanedText = text.replace(/...less/i, '').trim(); 
            if (!cleanedText) return { truncatedText: "", isTruncated: false };

            const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
            
            if (words.length > wordLimit) {
                return { 
                    truncatedText: words.slice(0, wordLimit).join(" ") + '...', // Add ellipsis
                    isTruncated: true 
                };
            }
            return { truncatedText: cleanedText, isTruncated: false };
        }

        function initProductCards() {
            const cards = document.querySelectorAll('.product-card');
            const wordLimit = 15; // Word limit for front face

            cards.forEach(card => {
                const innerCard = card.querySelector('.product-card-inner');
                // Get the text from the first paragraph in the back card content (which is the description)
                const fullDescriptionElement = card.querySelector('.product-card-back .product-full-content p:first-of-type');
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

            });
        }

        // Initialize on page load
        window.onload = function() {
            initProductCards();
        };


// Products page end


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

