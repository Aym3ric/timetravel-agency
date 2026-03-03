# TimeTravel Agency - Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée avec l'aide d'IA génératives.

## 🛠️ Stack Technique
- Vite (Bundler ultra-rapide)
- JavaScript Vanilla (sans framework externe)
- CSS Vanilla (avec CSS Variables et Glassmorphism)
- AOS (Animate On Scroll)
- Mistral AI API (`@mistralai/mistralai`)

## ✨ Features Implémentées
- **Landing page interactive** avec vidéo de fond immersive (Hero Section)
- **Galerie de 3 destinations temporelles** exclusives (Paris 1889, Crétacé, Florence 1504) avec micro-animations au survol
- **Chatbot IA conversationnel (Nova)** : conseiller expert en voyage temporel, conscient du catalogue et des tarifs
- **Recommandations personnalisées** via interaction avec l'agent
- **Formulaire de réservation** intégré au design de la page
- **Animations fluides** : transitions au défilement et effets visuels premium

## 🤖 IA Utilisées (transparence)
- **Code & V2 Interactive** : Gemini / Antigravity Agent (Google) pour le développement complet, l'architecture, l'intégration API et le CSS
- **Chatbot** : Modèle `mistral-small-latest` via l'API officielle de Mistral AI
- **Visuels & Médias** : 
  - Images générées par IA (Projet 1)
  - Vidéo généré par IA (Projet 1)

## 🚀 Instructions d'installation en local

1. **Prérequis** : Avoir Node.js installé (version 18+ recommandée)
2. **Cloner/Télécharger** le dépôt
3. **Installer les dépendances** :
   ```bash
   npm install
   ```
4. **Configurer l'environnement** :
   Créer un fichier `.env` à la racine et ajouter votre clé d'API Mistral :
   ```ini
   VITE_MISTRAL_API_KEY=VotreCleAlphaNumeriqueIci
   ```
5. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
6. Ouvrir l'URL indiquée (habituellement `http://localhost:5173`)

## 📄 Licence
Projet pédagogique - M1/M2 Digital & IA (Ynov)
