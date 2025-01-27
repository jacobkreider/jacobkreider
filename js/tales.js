document.addEventListener('DOMContentLoaded', () => {
    const storyContent = document.getElementById('storyContent');
    
    if (!storyContent) {
        console.error('Story content element not found');
        return;
    }
    
    document.querySelectorAll('.story-link').forEach(button => {
        button.addEventListener('click', async () => {
            const pagePath = button.dataset.page;
            console.log('Loading story from:', pagePath);
            
            try {
                const response = await fetch(pagePath);
                
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status}`);
                }
                
                const htmlContent = await response.text();
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = htmlContent;
                
                // Try to find the content in order of preference
                const mainContent = tempContainer.querySelector('.story-content') || 
                                  tempContainer.querySelector('main') || 
                                  tempContainer;
                
                storyContent.innerHTML = mainContent.innerHTML;
                
                // Update the URL without page reload
                history.pushState({}, '', `#${pagePath}`);
            } catch (error) {
                console.error('Error loading story:', error);
                storyContent.innerHTML = `
                    <div class="story-header">
                        <h1>Error Loading Story</h1>
                        <p>Unable to load the requested adventure. Please try again later.</p>
                        <p>Error details: ${error.message}</p>
                    </div>`;
            }
        });
    });
});