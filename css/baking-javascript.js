:root {
    --bg-primary: #FFF8F0;
    --text-primary: #2C1810;
    --accent-warm: #D4A373;
    --accent-light: #FEFAE0;
    --recipe-bg: #FAEDCD;
    --nav-bg: #CCD5AE;
}

/* Base styles */
body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: "Courier New", monospace;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    min-height: 100vh;
}

/* Mobile-first approach - these are the base styles */
.top-nav {
    background: var(--nav-bg);
    padding: 0.5rem;
    border-bottom: 2px solid var(--accent-warm);
    width: 100%;
    z-index: 100;
}

.top-nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    align-items: center;
}

.top-nav a {
    color: var(--text-primary);
    text-decoration: none;
    padding: 0.5rem;
}

.side-nav {
    background: var(--accent-light);
    padding: 1rem;
    border-bottom: 2px solid var(--accent-warm);
    width: 100%;
    box-sizing: border-box;
}

.side-nav h3 {
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--accent-warm);
}

.side-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.side-nav li {
    margin: 0.5rem 0;
}

.side-nav a {
    color: var(--text-primary);
    text-decoration: none;
    display: block;
    padding: 0.5rem;
    border-radius: 4px;
}

.side-nav a:hover {
    background: var(--recipe-bg);
}

.main-content {
    padding: 1rem;
}

/* Recipe specific styles */
.recipe-card {
    background: var(--recipe-bg);
    border: 2px solid var(--accent-warm);
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 3px 3px 0 var(--accent-warm);
}

.recipe-header {
    text-align: center;
    margin-bottom: 2rem;
}

.recipe-meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 1rem 0;
    padding: 1rem;
    background: var(--accent-light);
    border-radius: 4px;
}

.recipe-image {
    width: 100%;
    height: auto;
    border: 2px solid var(--accent-warm);
    margin: 10px 0;
}

.recipe-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    padding: 20px 0;
}

.ingredients-list {
    background: white;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
}

/* Desktop styles - applied for screens wider than 768px */
@media (min-width: 768px) {
    .top-nav {
        position: fixed;
        top: 0;
    }

    .top-nav ul {
        flex-direction: row;
        justify-content: center;
        gap: 2rem;
    }

    .side-nav {
        position: fixed;
        top: 60px;
        left: 0;
        width: 200px;
        height: calc(100vh - 60px);
        border-right: 2px solid var(--accent-warm);
        border-bottom: none;
        overflow-y: auto;
    }

    .main-content {
        margin-left: 220px;
        margin-top: 60px;
        padding: 20px;
    }

    .recipe-meta {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .recipe-gallery {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}