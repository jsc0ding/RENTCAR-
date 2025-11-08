# LuxRent - Car Leasing Platform

## Project Overview

LuxRent is a premium car leasing platform built with modern web technologies. The application allows users to browse, search, and rent luxury vehicles with a seamless user experience.

## How to Run the Project

To run the project locally, you need to start both the backend server and frontend development server:

### Prerequisites
- Node.js & npm installed
- MongoDB connection (configured in the backend)

### Starting the Application

1. **Start the backend server:**
```sh
cd server
npm start
```

2. **In a new terminal, start the frontend development server:**
```sh
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:8080/admin

## Project Structure

**Frontend** (Root directory)
- Built with: Vite, TypeScript, React, shadcn-ui, Tailwind CSS
- Pages: Home, Cars Listing, About, Contact, Admin Panel

**Backend** (server directory)
- Built with: Node.js, Express.js, MongoDB with Mongoose
- RESTful API for car management, bookings, and statistics

## Key Features

- Browse and search luxury cars by various filters (brand, category, price, passengers, etc.)
- Book cars with a simple booking system
- Admin panel for managing cars, bookings, and system statistics
- Responsive design that works on all devices
- Brand-specific car images for better visual experience
- Real-time availability status updates

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **API Communication**: Axios
- **State Management**: React Query
- **UI Components**: Radix UI, Lucide React Icons
- **Form Handling**: React Hook Form
- **Notifications**: Sonner

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fd4652cc-0625-4ca0-b5a3-c4afd78d38c2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fd4652cc-0625-4ca0-b5a3-c4afd78d38c2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)