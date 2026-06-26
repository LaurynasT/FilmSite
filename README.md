# Film Site Project

A full-stack movie browsing platform with **AI-powered recommendations**, built with **React (frontend)** and **ASP.NET Core (backend)**. The project is currently in development and already deployed (hosted version available).

## Tech Stack
- Frontend: React (JavaScript)
- Backend: ASP.NET Core Web API
- AI: Recommendation system
- Database: PostgreSQL
- Styling: Tailwind
- Deployment: Render, Railway

## Features
- Browse and search movies
- View detailed movie information
- AI-based movie recommendations
- Responsive UI
- Backend API for data handling
- Hosted live version
- 
## AI Recommendation System

The system generates recommendations using:
- User favorite movie history
- Movie genres and metadata
- OpenAI API analysis

It improves suggestions over time based on user interactions.

## Live Demo
https://filmsite-5jdd.onrender.com/

# Installation

### 1. Clone Repository
```bash
git clone https://github.com/LaurynasT/FilmSite.git
cd filmsite
```
### 2. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
### 3. Backend setup
```bash
cd backend
dotnet restore
dotnet run
```
### Backend Configuration
Also you need to get API key from TMDB and OpenAI and update it in appsettings.json.


```json
{
  "ConnectionStrings": {
    "default": "PostgreSQL connection string"
  },
  "JWT": {
    "secret": "your-jwt-secret-key",
    "ValidAudience": "your-audience",
    "ValidIssuer": "your-issuer"
  },
  "OpenAI": {
    "ApiKey": "your-openai-api-key",
    "ModelName": "gpt-3.5-turbo",
    "ApiEndpoint": "https://api.openai.com/v1/chat/completions"
  },
  "TMDB": {
    "ApiKey": "your-tmdb-api-key"
  }
}
```



