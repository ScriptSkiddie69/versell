const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const scriptContents = {
    simplespyScript: `local settings = {
    SaveDecompileLogs = false,
    SaveScanLogs = false,
    ScanForNewInstance = false,
    InterceptUntilRan = false,
    CursorOffset = -15, -- Cursor offset
    PathToDump = {game.Players.LocalPlayer, game:GetService('ReplicatedStorage')}
}
_G.data = settings
loadstring(game:HttpGet('https://raw.githubusercontent.com/ScriptSkiddie69/RemoteHook/refs/heads/main/SimpleSpyLite.lua'))()`,
    decayingWinterScript: `loadstring(game:HttpGet('https://raw.githubusercontent.com/ScriptSkiddie69/D-W/refs/heads/main/vortex.lua'))()`,
    antLifeScript: `getgenv().key = "UOCAIWSX" -- put key here ex: getgenv().key = "key_example"
getgenv().mobile = true -- set this to false if your using pcex: getgenv().mobile = false

loadstring(game:HttpGet('https://raw.githubusercontent.com/ScriptSkiddie69/launcher/refs/heads/main/launch'))()`,
    apiExample: `local vortex = loadstring(game:HttpGet('vortex.lol/api/lua/lone.lua'))()
vortex.spawn('Brimstone Ore', 'Shiv', 1, 'Raycast Spoof')
vortex.kill('Player_Name', 'Shiv', 1, 'Raycast Spoof')`
};

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const scriptId = button.getAttribute('data-script');
        const scriptContent = scriptContents[scriptId];
        
        if (scriptContent) {
            navigator.clipboard.writeText(scriptContent).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Error!';
                button.style.background = 'var(--error-color)';
            });
        }
    });
});


document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


const animatedElements = document.querySelectorAll(
    '.feature-card, .script-card, .premium-card, .showcase-content, .api-feature, .faq-item'
);

animatedElements.forEach(element => {
    observer.observe(element);
});


let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});


function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            clearInterval(timer);
            current = end;
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}


const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const value = parseInt(statNumber.textContent);
            animateValue(statNumber, 0, value, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});
