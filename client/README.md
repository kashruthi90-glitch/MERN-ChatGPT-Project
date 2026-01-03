# Project description
This is the MERN Stack application featuring a Microfrontend (MFE) architecture. This project provides an intelligent chat interface powered by Google Gemini AI for real-time text and image generation.

# Key Features
1. Authentication: Secure Login and Signup flow.
2. Chat Management: 
    * Persistent chat history (view previous conversations).
    * Create new sessions or delete unwanted chats.
3. AI Agent Integration:
    * Text Generation: Intelligent responses based on user prompts using Gemini.
    * Image Generation: On-the-fly image creation from text descriptions.
4. Performance: All microfrontends are lazy-loaded to ensure the fastest initial shell load.

# Architecture Overview
The project is managed as a Monorepo using npm workspaces. The UI is split into three distinct Microfrontends to ensure scalability and independent development.

# Microfrontends (MFE)
-------------------------------------------------------------------------------------
MFE Name  | Responsibility                                                          |
-------------------------------------------------------------------------------------
Shell     | The "Host" application. Handles routing and lazy-loading remotes.       |
-------------------------------------------------------------------------------------
Login     | Manages user authentication, Signup, and Login forms.                   |
-------------------------------------------------------------------------------------
Chats     | Main interface for chat history, messaging, and AI interactions.        |
-------------------------------------------------------------------------------------