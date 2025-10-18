# User Management Module (Angular + NgRx + Nx + json-server)

A simple **User Management Application** built with **Angular**, **NgRx** for state management, and **json-server** for simulating a REST API.  
This project is organized in an **Nx monorepo** structure for better scalability and maintainability.

---

## Features

- **Login Page**
  - Simple username & password mock authentication
  - Redirects to dashboard on successful login

- **User Management Dashboard**
  - List all users (fetched from `json-server`)
  - Add new users
  - Edit existing users
  - Delete users
  - Fully managed with **NgRx Store (Actions, Reducers, Effects, Selectors)**

  - **Backend**
  - Powered by `json-server` (mock REST API)

- **UI & Styling**
  - Responsive design (mobile + desktop)
    
  - Form validation & error handling

---

## Project Structure

---

## Tech Stack

- **Frontend:** Angular 14+  
- **State Management:** NgRx (Store, Effects, Entity, Store DevTools)  
- **Backend:** json-server  
- **Workspace Tooling:** Nx  
- **UI Components:** Angular Material  

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```
### 2. install Dependencies

```bash
npm install
```

### 3.Start Mock Backend (json-server)

```bash
npx json-server --watch db.json --port 4000
```

### 4.Run Angular App

```bash
nx serve user-app
```

## Testing 

```bash
nx test user-app
```

## Sample User Data

```json
{
  "users": [
    { "id": 1, "username": "johndoe", "email": "john@example.com", "job-role": "tech" },
    { "id": 2, "username": "janedoe", "email": "jane@example.com", "job-role": "qa" }
  ]
}
```

## Design Decisions
	•	Used Nx workspace to ensure scalable project structure.
	•	Centralized state management with NgRx for predictable app state and better debugging.
	•	json-server chosen for quick backend simulation without needing a real server.
	•	Angular Material ensures accessible, responsive UI.


