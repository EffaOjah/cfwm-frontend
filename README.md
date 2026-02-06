# Christ For The World Mission (CFWM) Website

Welcome to the official repository for the Christ For The World Mission Inc. website. This application serves as the digital hub for the ministry, providing members and visitors with access to live services, sermons, resources, and church information.

## 🚀 About the Project

This is a comprehensive web application built to connect the church community globally. It features a modern, responsive design and integrates various functionalities to facilitate worship, community engagement, and resource distribution.

### Key Features
*   **📡 Livestreaming**: Watch live services and events directly from the website.
*   **📚 Sermon Archive**: Access and listen to past messages and teachings.
*   **🌍 Branch Locator**: Find CFWM branches easily with location details.
*   **🛍️ Online Store**: Browse and purchase ministry materials, books, and merchandise (includes Cart & Checkout).
*   **💝 Online Giving**: Secure interface for tithes, offerings, and donations.
*   **📅 Events**: Stay updated with upcoming church programs and register for events.
*   **📝 Interactive Forms**: Submit prayer requests, testimonies, and other inquiries.
*   **ℹ️ Information Hub**: Learn about the church leadership, history (Apapro), and biography of the Overseer.

## 🛠️ Tech Stack

This project is built using modern web technologies for performance and scalability:

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
*   **Real-time Communication**: Socket.io Client

## 📦 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd CFWM-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically start at `http://localhost:5173`.

### Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

A quick look at the top-level files and directories you'll encounter in the `src` folder:

*   **`pages/`**: Contains key views like `Home`, `About`, `Livestream`, `Store`, etc.
*   **`components/`**: Reusable UI components (Navbar, Footer, Buttons, etc.).
*   **`assets/`**: Static assets like images and global styles.
*   **`context/`**: React Context definitions for global state management.
*   **`App.jsx`**: Main application component containing the route definitions.
*   **`main.jsx`**: Entry point of the React application.

## 🤝 Contribution

If you wish to contribute to this project, please ensure you follow the existing code style and create a pull request for any new features or bug fixes.
