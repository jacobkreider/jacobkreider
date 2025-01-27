// This script handles the dynamic loading of recipe content when sidebar buttons are clicked
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the main content container where recipes will be displayed
    const recipeContent = document.getElementById('recipeContent');
    
    // Log when the JavaScript initializes, helpful for debugging
    console.log('Recipe loading system initialized');

    // Find all recipe link buttons and set up click handlers
    document.querySelectorAll('.recipe-link').forEach(button => {
        // Log each button we find for debugging purposes
        console.log('Found recipe button:', button.dataset.page);
        
        // Add click handler to each button
        button.addEventListener('click', async () => {
            // Get the path to the HTML file from the button's data-page attribute
            const pagePath = button.dataset.page;
            console.log('Loading recipe from:', pagePath);
            
            try {
                // Attempt to fetch the recipe HTML file
                const response = await fetch(pagePath);
                
                // Check if the fetch was successful
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
                }
                
                // Get the HTML content as text
                const htmlContent = await response.text();
                console.log('Recipe content loaded successfully');
                
                // Create a temporary container to safely parse the HTML
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = htmlContent;
                
                // Find the main content section in the loaded HTML
                // We look for multiple possible selectors in case the HTML structure varies
                const mainContent = tempContainer.querySelector('.recipe-content') || 
                                  tempContainer.querySelector('main') || 
                                  tempContainer;
                
                // Update the page with the new recipe content
                recipeContent.innerHTML = mainContent.innerHTML;
            } catch (error) {
                // If anything goes wrong, log the error and show a user-friendly message
                console.error('Error loading recipe:', error);
                recipeContent.innerHTML = `
                    <div class="recipe-header">
                        <h1>Error Loading Recipe</h1>
                        <p>Unable to load the requested recipe. Please try again later.</p>
                        <p>Error details: ${error.message}</p>
                    </div>`;
            }
        });
    });
});