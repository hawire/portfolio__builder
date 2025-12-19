# Portfolio Builder

A React web application that allows users to create their personal portfolio websites without coding. Enter your details—name, bio, skills, projects, and social links—and see a live preview of your portfolio in real time.  

This project demonstrates skills in React components, state management, conditional rendering, form handling, and responsive UI design.

---

## **Features**

### Core (MVP)
- **User Input Form**
  - Name, title, bio
  - Skills
  - Projects (title, description, link)
  - Social links (GitHub, LinkedIn, etc.)
- **Live Portfolio Preview**
  - Updates automatically while typing
  - Displays profile header, skills, projects, and social links
- **Single Template Layout**
- **Local Storage**
  - User data persists after page refresh

### Optional / Advanced
- Multiple portfolio templates
- Light/Dark theme
- Profile picture upload
- Export/download portfolio as HTML
- Full-screen preview

---

## **Tech Stack**
- React
- Zustand (for state management)
- Tailwind CSS (optional, if added)
- Local Storage
- Vite (React development server)

---

## **Project Structure**
src/
├─ pages/
│ ├─ Home.jsx
│ └─ Builder.jsx
│
├─ components/
│ ├─ form/
│ │ ├─ UserInfoForm.jsx
│ │ ├─ SkillsForm.jsx
│ │ ├─ ProjectsForm.jsx
│ │ └─ SocialLinksForm.jsx
│ │
│ ├─ preview/
│ │ ├─ PortfolioPreview.jsx
│ │ ├─ ProfileHeader.jsx
│ │ ├─ SkillsList.jsx
│ │ ├─ ProjectCard.jsx
│ │ └─ SocialLinks.jsx
│
├─ store/
│ └─ portfolioStore.js
│
├─ App.jsx
└─ main.jsx

Usage

Go to the Builder page.

Fill in your user info, skills, projects, and social links.

See your live portfolio preview update automatically.

Optional: Reset Portfolio button clears all saved data.

Optional: Export Portfolio button saves the portfolio as an HTML file.

Screenshots
<img width="2191" height="1240" alt="Screenshot 2025-12-19 043733" src="https://github.com/user-attachments/assets/42a1f8bb-79d0-4750-9c59-32439504e23c" />

<img width="2191" height="1300" alt="Screenshot 2025-12-19 043615" src="https://github.com/user-attachments/assets/d1dba442-1132-427f-9c6c-1e10cc0c7472" />

<img width="2212" height="1297" alt="Screenshot 2025-12-19 043634" src="https://github.com/user-attachments/assets/5c48d88e-d49b-4ad0-b7a1-d1984160a8aa" />


Contributing

Fork the repository.

Create a feature branch (git checkout -b feature/YourFeature).

Commit your changes (git commit -m "Add your feature").

Push to the branch (git push origin feature/YourFeature).

Create a Pull Request

License

This project is open-source and free to use.

Author

Bitania Finoteselam

GitHub: [https://github.com/hawire](https://github.com/hawire)
