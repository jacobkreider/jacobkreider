// css/guestbook.js

async function loadEntries() {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GUESTBOOK_CONFIG.REPO_OWNER}/${GUESTBOOK_CONFIG.REPO_NAME}/issues?labels=guestbook`,
            {
                headers: {
                    'Authorization': `token ${GUESTBOOK_CONFIG.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        const issues = await response.json();
        return issues.map(issue => {
            // Add console.log to debug
            console.log('Processing issue:', issue);
            
            const titleParts = issue.title.split('|');
            return {
                name: titleParts[0]?.trim() || '',
                website: titleParts[1]?.trim() || '',
                location: titleParts[2]?.trim() || '',
                message: issue.body,
                date: new Date(issue.created_at).toLocaleDateString()
            };
        });
    } catch (error) {
        console.error('Error loading entries:', error);
        return [];
    }
}

function createEntryHTML(entry) {
    const websiteHTML = entry.website ? 
        `<span class="entry-website">| <a href="${escapeHTML(entry.website)}" 
         target="_blank" rel="noopener noreferrer">🌐 website</a></span>` : '';
    
    const locationHTML = entry.location ?
        `<span class="entry-location">| 📍 ${escapeHTML(entry.location)}</span>` : '';

    return `
        <div class="guestbook-entry">
            <div class="entry-header">
                ${escapeHTML(entry.name)} - ${entry.date}
                ${websiteHTML}
                ${locationHTML}
            </div>
            <div class="entry-message">
                ${escapeHTML(entry.message)}
            </div>
        </div>
    `;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

async function addEntry() {
    const nameInput = document.getElementById('name');
    const websiteInput = document.getElementById('website');
    const locationInput = document.getElementById('location');
    const messageInput = document.getElementById('message');
    
    if (!nameInput.value.trim() || !messageInput.value.trim()) {
        return;
    }
    
    const title = [
        nameInput.value.trim(),
        websiteInput.value.trim(),
        locationInput.value.trim()
    ].filter(Boolean).join(' | ');

    try {
        await fetch(
            `https://api.github.com/repos/${GUESTBOOK_CONFIG.REPO_OWNER}/${GUESTBOOK_CONFIG.REPO_NAME}/issues`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GUESTBOOK_CONFIG.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    title: title,
                    body: messageInput.value,
                    labels: ['guestbook']
                })
            }
        );

        const entries = await loadEntries();
        displayEntries(entries);
        
        // Clear form
        nameInput.value = '';
        websiteInput.value = '';
        locationInput.value = '';
        messageInput.value = '';
    } catch (error) {
        console.error('Error adding entry:', error);
    }
}

function displayEntries(entries) {
    const entriesDiv = document.getElementById('entries');
    if (entriesDiv) {
        entriesDiv.innerHTML = entries.map(entry => createEntryHTML(entry)).join('');
    }
}

window.addEventListener('load', async () => {
    const entries = await loadEntries();
    displayEntries(entries);
});