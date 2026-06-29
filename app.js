let guestName = '';
let guestEmail = '';

const teams = {
    bride: {
        title: "Bride Squad (Ndi Iyawo)",
        tribe: "Yoruba Clan",
        themeClass: "bride-theme",
        whatsapp: "https://chat.whatsapp.com/KC3rdYAI7zVDrjbzjj6ZnB",
        vibe: "Get your Aso-Ebi ready, we are dancing till dawn! Oya, Gbe bodí!"
    },
    groom: {
        title: "Groom Squad (Ndi Ogo)",
        tribe: "Igbo Clan",
        themeClass: "groom-theme",
        whatsapp: "https://chat.whatsapp.com/F1yfovc6lrO9VWsIJCsUJP",
        vibe: "Bring the Palm Wine and the luxury wrappers! Nwanna, it's celebration time!"
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const savedSide = localStorage.getItem('wedding_party_side');
    const savedName = localStorage.getItem('wedding_party_name');
    
    // Check if running locally OR if YOU appended '?dev=true' to your live URL link
    const urlParams = new URLSearchParams(window.location.search);
    const isSecretDevMode = urlParams.get('dev') === 'true';
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || isSecretDevMode;
    
    // Regular guests get strictly locked out on refresh. 
    // You can bypass this by visiting yoursite.com/?dev=true
    if (savedSide && savedName && !isDevelopment) {
        guestName = savedName;
        renderFinalReveal(savedSide);
    }
});

function navigateToForm() {
    hideScreen('welcome-screen');
    showScreen('form-screen');
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    guestName = document.getElementById('guest-name').value;
    guestEmail = document.getElementById('guest-email').value;

    hideScreen('form-screen');
    showScreen('shuffling-screen');
    runEldersRandomizer();
}

function runEldersRandomizer() {
    const phrases = [
        "The ancestors are deciding...",
        "Have you bought your aso-ebi yet?...",
        "Abi you never get aso-ebi money?...",
        "Oya, go fry Akara and roast corn for yaba junction first...",
        "The ancestors have cast their votes...",
        "Your side has been chosen..."
    ];

    const textElement = document.getElementById('shuffling-text');
    let phraseIndex = 0;
    textElement.textContent = phrases[0];

    const interval = setInterval(() => {
        phraseIndex++;
        if (phraseIndex < phrases.length) {
            textElement.textContent = phrases[phraseIndex];
        }
    }, 2500);

    setTimeout(() => {
        clearInterval(interval);
        
        const sides = ['bride', 'groom'];
        const pickedSide = sides[Math.floor(Math.random() * sides.length)];
        
        localStorage.setItem('wedding_party_side', pickedSide);
        localStorage.setItem('wedding_party_name', guestName);
        
        renderFinalReveal(pickedSide);
    }, 15000);
}

function renderFinalReveal(side) {
    const team = teams[side];

    document.getElementById('team-title').textContent = team.title;
    document.getElementById('team-tribe').textContent = team.tribe;
    document.getElementById('display-name').textContent = guestName;
    document.getElementById('team-vibe').textContent = team.vibe;
    document.getElementById('whatsapp-link').href = team.whatsapp;

    const revealCard = document.getElementById('reveal-screen');
    revealCard.className = "reveal-card text-center space-y-8 " + team.themeClass;

    hideScreen('welcome-screen');
    hideScreen('form-screen');
    hideScreen('shuffling-screen');
    showScreen('reveal-screen');
}

function showScreen(id) {
    const element = document.getElementById(id);
    if(element) element.classList.remove('hidden');
}

function hideScreen(id) {
    const element = document.getElementById(id);
    if(element) element.classList.add('hidden');
}