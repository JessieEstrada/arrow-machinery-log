# Machinery Log - Cloud Store Full-Stack Coding Assessment

This repository contains my solution for the full-stack coding assessment.

---

## Features

This application was built to be not only functional but also robust, polished, and user-friendly. I tried my best to make it as close as possible to the Cloud Store website style.

### Core Functionality

- **Create & View Posts:** Users can create new posts with a title and content, which are displayed in a reverse chronological list.
- **Add & View Comments:** Each post has a dedicated section for users to add and view comments, displayed chronologically to follow the conversation.
- **Robust Validation:** All form submissions are validated on both the client-side (for instant feedback) and the server-side using **Zod** for security and data integrity.
- **Persistent Storage:** All data is stored in a local **SQLite** database, with a schema designed to efficiently manage the one-to-many relationship between posts and comments.

---

## Tech Stack

- **Framework:** [Remix](https://remix.run/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** Node.js native SQLite module (`node:sqlite`)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Heroicons](https://heroicons.com/)

---

## Getting Started

To run this project locally, please follow these steps:

**Prerequisites:** Ensure you have Node.js (v22.5.0 or later) installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`. The SQLite database (`machinery.db`) and its tables will be automatically created in the project root the first time the application is run.

---

## Key Architectural Decisions & Problem-Solving

Beyond the core requirements, several key decisions were made by myself, to ensure the application was robust and maintainable.

- **Self-Healing Database Initialization:** The database schema is created automatically within the `getDb()` connection function. This "initialize on first connection" pattern ensures the application is self-healing and will always have the required tables, even if the database file is deleted.
- **Controlled Components for Form State:** After diagnosing a series of complex UI bugs related to form state management, the forms were converted to use the **Controlled Component** pattern. This gives React full control over the input values, ensuring bug-free behavior for clearing forms after submission.
- **DRY Principle for Utilities:** The `timeAgo` function was abstracted into a shared `lib/utils.ts` file to avoid code duplication and ensure consistency. I wanted to follow the **Don't Repeat Yourself (DRY)** principle.
- **Encapsulated & Reusable Components:** UI components like `Button`, `Input`, and `TextArea` were designed to be self-contained and reusable. For example, the `Input` component manages its own error display, making the form code cleaner and more declarative.

---

## Questions & Clarifications for a Real-World Scenario

If this were a project assigned on the job, I would seek clarification on the following points to ensure the final product aligns with team goals and best practices:

- **Authentication & Authorization:** I would have asked if this Machinery Log required authentication to be accessed. I assumed it woudl so I ensured to mock the Auth User to show that record keeping would be kept alongside posts and comments.
- **Real-Time Updates:** 
- **Scalability & Database Choice:** SQLite is excellent for this assessment, but for a production application with multiple users, I would ask about the expected load. Should we plan to use a more scalable database like **PostgreSQL**? This would influence our data access patterns and deployment strategy. 
- **Feature Implementation:** I would have asked if this feature was going to be implemented within a specific portal, or if it would also be customer facing.

## Final Notes

This project as ver interesting in the sense that it allowed me to further explore Remix. I reviewd documentation, came up with theories, explore the different tools asked by the project and I beleive it allowed me to take some small bots of infomration and come up wth something through code. It definitely was challenging to come up with this full-stack feature, without being able to ask clarifying qustions or ask waht exactly woudl be expected from the feature. But, this mae the proejct much more exciting because I had to explore, sketch, propose, and come up wth the best possible solution for the task at hand.
