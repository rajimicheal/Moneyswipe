document.addEventListener('DOMContentLoaded', () => {
    let currency = localStorage.getItem('currency') ? parseInt(localStorage.getItem('currency')) : 0;
    let eventCount = localStorage.getItem('eventCount') ? parseInt(localStorage.getItem('eventCount')) : 0;

    const currencyDisplay = document.getElementById('currency');
    const eventCounter = document.getElementById('event-counter');
    const animationContainer = document.getElementById('animation-container');
    const titleDisplay = document.getElementById('title');
    const progressBar = document.getElementById('progress-bar');
    const resetButton = document.getElementById('reset-button');

    const titles = [
        { threshold: 0, title: 'Poor Man' },
        { threshold: 100, title: 'Peasant' },
        { threshold: 1000, title: 'Below Average' },
        { threshold: 10000, title: 'Average' },
        { threshold: 100000, title: 'Rich' },
        { threshold: 1000000, title: 'Millionaire' }
    ];

    const updateDisplay = () => {
        currencyDisplay.textContent = `$${currency}`;
        eventCounter.textContent = `Events: ${eventCount}`;
        updateTitleAndProgress();
    };

    const updateTitleAndProgress = () => {
        let currentTitle = titles[0].title;
        let nextThreshold = titles[1].threshold;
        
        for (let i = 0; i < titles.length; i++) {
            if (currency >= titles[i].threshold) {
                currentTitle = titles[i].title;
                nextThreshold = titles[i + 1] ? titles[i + 1].threshold : titles[i].threshold;
            } else {
                break;
            }
        }

        titleDisplay.textContent = currentTitle;
        const progress = Math.min(100, (currency / nextThreshold) * 100);
        progressBar.style.width = `${progress}%`;
    };

    const resetProgress = () => {
        currency = 0;
        eventCount = 0;
        localStorage.removeItem('currency');
        localStorage.removeItem('eventCount');
        updateDisplay();
    };

    // Function to increment currency and events
    const incrementCurrency = (event) => {
        if (event.type === 'click' || (event.type === 'keydown' && event.code === 'Space')) {
            event.preventDefault(); // Prevent default action for space bar
            currency += 14;
            eventCount++;
            localStorage.setItem('currency', currency);
            localStorage.setItem('eventCount', eventCount);
            updateDisplay();
            showAnimation();
        }
    };

    // Function to show the "+14" animation
    const showAnimation = () => {
        const animatedText = document.createElement('div');
        animatedText.textContent = '+14';
        animatedText.className = 'animated-text';
        animationContainer.appendChild(animatedText);

        // Set position randomly within the container
        animatedText.style.left = `${Math.random() * (animationContainer.clientWidth - 50)}px`;
        animatedText.style.top = `${Math.random() * (animationContainer.clientHeight - 50)}px`;

        // Remove the animated text after animation ends
        animatedText.addEventListener('animationend', () => {
            animatedText.remove();
        });
    };

    // Listen for left and right mouse clicks
    document.addEventListener('click', incrementCurrency);
    document.addEventListener('contextmenu', incrementCurrency);

    // Listen for space bar key press
    document.addEventListener('keydown', incrementCurrency);

    // Reset button click event
    resetButton.addEventListener('click', resetProgress);

    // Initial display update
    updateDisplay();
});
