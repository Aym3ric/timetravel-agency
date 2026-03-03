import './style.css';
import { Mistral } from '@mistralai/mistralai';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out-quad',
  once: true,
  offset: 100
});

const destinations = [
  {
    id: 'paris-1889',
    title: 'Paris 1889',
    subtitle: 'Exposition Universelle',
    description: 'Vivez l\'effervescence de la Belle Époque et assistez à l\'inauguration de la Tour Eiffel.',
    image: '/images/paris_1889.png',
    color: '#e2b808'
  },
  {
    id: 'cretaceous',
    title: 'Crétacé',
    subtitle: '-65 Millions d\'années',
    description: 'Rencontrez les géants du passé dans leur habitat naturel avant le grand cataclysme.',
    image: '/images/cretaceous.png',
    color: '#22c55e'
  },
  {
    id: 'florence-1504',
    title: 'Florence 1504',
    subtitle: 'Âge d\'or Artistique',
    description: 'Plongez dans la Renaissance italienne et côtoyez les plus grands génies de l\'Histoire.',
    image: '/images/florence.png',
    color: '#ef4444'
  }
];

document.querySelector('#app').innerHTML = `
  <nav class="glass">
    <div class="logo-container">
      <img src="/images/logo.png" alt="Logo" class="logo-img" />
      <span class="brand-name">TimeTravel</span>
    </div>
    <div class="nav-links" style="display: flex; align-items: center;">
      <a href="#destinations" class="nav-link">Destinations</a>
      <a href="#booking" class="cta-button" style="padding: 0.6rem 1.5rem; font-size: 0.9rem; display: inline-block;">Réserver</a>
    </div>
  </nav>

  <main>
    <section class="hero">
      <video autoplay loop muted playsinline class="hero-video-bg">
        <source src="/videos/mon-voyage.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Redéfinissez le Présent <br/>en visitant le Passé.</h1>
        <p>L'agence de voyage temporelle leader vous ouvre les portes des époques les plus fascinantes de l'histoire humaine.</p>
        <a href="#destinations" class="cta-button">Découvrir les Époques</a>
      </div>
    </section>

    <section id="destinations" class="destinations">
      <h2 class="section-title" data-aos="fade-up">Nos Destinations Exclusives</h2>
      <div class="dest-grid">
        ${destinations.map((dest, index) => `
          <div class="dest-card" data-id="${dest.id}" data-aos="fade-up" data-aos-delay="${index * 100}">
            <img src="${dest.image}" alt="${dest.title}" class="dest-img" />
            <div class="dest-content">
              <h3>${dest.title}</h3>
              <p>${dest.subtitle}</p>
              <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.7;">${dest.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    <section id="booking" class="booking" data-aos="fade-in">
      <div class="booking-container glass" data-aos="zoom-in" data-aos-delay="200">
        <h2 style="text-align: center; margin-bottom: 2rem;">Réservez votre Voyage</h2>
        <form id="bookingForm">
          <div class="form-group">
            <label for="destSelect">Destination</label>
            <select id="destSelect" required>
              <option value="">Choisir une époque...</option>
              ${destinations.map(dest => `<option value="${dest.id}">${dest.title}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="travelDate">Date de Départ (Temps Présent)</label>
            <input type="date" id="travelDate" required />
          </div>
          <div class="form-group">
            <label for="travelers">Nombre de Voyageurs</label>
            <input type="number" id="travelers" min="1" max="5" value="1" required />
          </div>
          <button type="submit" class="cta-button booking-submit">Confirmer la Réservation</button>
        </form>
      </div>
    </section>
  </main>

  <div class="chat-widget">
    <div class="chat-toggle" id="chatToggle">
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
    </div>
    <div class="chat-container glass" id="chatContainer">
      <div class="chat-header">
        <div>
          <h4 style="margin: 0; font-family: Outfit;">Nova</h4>
          <span style="font-size: 0.7rem; opacity: 0.8;">Conseillère Temporelle</span>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="message msg-ai">
          Bonjour ! Je suis Nova, votre guide IA. Quelle époque souhaiteriez-vous explorer aujourd'hui ?
        </div>
      </div>
      <form class="chat-input" id="chatForm">
        <input type="text" placeholder="Posez-moi vos questions sur les voyages temporels..." id="chatInput" />
        <button type="submit">
          <svg style="width: 20px; height: 20px; fill: white;" viewBox="0 0 24 24"><path d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
        </button>
      </form>
    </div>
  </div>
`;

// Chatbot Logic
const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
  chatContainer.classList.toggle('active');
});

const addMessage = (text, isUser = false) => {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${isUser ? 'msg-user' : 'msg-ai'}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

const systemPrompt = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle)
- Crétacé -65M (dinosaures, nature préhistorique)
- Florence 1504 (Renaissance, art, Michel-Ange)

Tu peux suggérer des destinations selon les intérêts du client. 
Reste concis dans tes réponses (2 à 3 phrases maximum) pour le format chat.`;

let conversationHistory = [{ role: 'system', content: systemPrompt }];

const getAIResponse = async (input) => {
  conversationHistory.push({ role: 'user', content: input });

  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: conversationHistory,
    });

    const reply = chatResponse.choices[0].message.content;
    conversationHistory.push({ role: 'assistant', content: reply });

    // Garder l'historique de taille raisonnable (system prompt + 10 derniers messages)
    if (conversationHistory.length > 11) {
      conversationHistory = [
        conversationHistory[0],
        ...conversationHistory.slice(conversationHistory.length - 10)
      ];
    }

    return reply;
  } catch (error) {
    console.error("Mistral API Error:", error);
    return "Désolée, mon lien avec le vortex central est perturbé. Veuillez vérifier la connexion au Flux Temporel et réessayer dans un instant chronologique.";
  }
};

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, true);
  chatInput.value = '';

  const typingIndicatorDiv = document.createElement('div');
  typingIndicatorDiv.className = 'message msg-ai';
  typingIndicatorDiv.innerHTML = '<span style="opacity:0.7">Nova consulte les archives temporelles...</span>';
  chatMessages.appendChild(typingIndicatorDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const response = await getAIResponse(text);

  typingIndicatorDiv.remove();
  addMessage(response);
});

// Booking Logic
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const dest = document.getElementById('destSelect').value;
  const date = document.getElementById('travelDate').value;
  const travelers = document.getElementById('travelers').value;

  const destTitle = destinations.find(d => d.id === dest).title;

  // Animation de succès simple
  const modal = document.createElement('div');
  modal.className = 'glass';
  modal.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    padding: 3rem; border-radius: 20px; text-align: center; z-index: 2000;
    animation: fadeIn 0.4s ease;
  `;
  modal.innerHTML = `
    <h2 style="color: var(--accent); margin-bottom: 1rem;">Saut Temporel Confirmé !</h2>
    <p>Votre voyage vers <strong>${destTitle}</strong> est planifié pour le ${date}.</p>
    <p style="margin-top: 0.5rem;">Préparez vos bagages pour ${travelers} personne(s).</p>
    <button class="cta-button" style="margin-top: 2rem;" onclick="this.parentElement.remove()">Fermer</button>
  `;
  document.body.appendChild(modal);
});

// Destination Card Click -> Scroll to Booking
document.querySelectorAll('.dest-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.id;
    document.getElementById('destSelect').value = id;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  });
});

// Parallax Hero Effect
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
    heroContent.style.opacity = 1 - (scrolled / 500);
  }

  // Navbar glass effect on scroll
  const nav = document.querySelector('nav');
  if (scrolled > 50) {
    nav.style.padding = '0.8rem 2rem';
    nav.style.background = 'rgba(10, 12, 16, 0.9)';
  } else {
    nav.style.padding = '1rem 2rem';
    nav.style.background = 'var(--glass-bg)';
  }
});
