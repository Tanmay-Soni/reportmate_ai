# ReportMate AI

A GPT-like chat interface with drag-and-drop file upload functionality, designed to integrate file content contextually with user queries using OpenAI's Assistants API.

## Features

### Core Functionality
- **AI Chat Interface**: Interactive chat with OpenAI's GPT models
- **File Upload & Analysis**: Drag-and-drop file upload with contextual analysis
- **Real-time Processing**: Live chat with AI responses
- **Chat History**: Persistent chat sessions with sidebar navigation

### Technical Features
- **Responsive Design**: Works on desktop and mobile devices
- **Markdown Rendering**: Rich text formatting with custom components
- **Citation Cleaning**: Automatic removal of OpenAI citation markers
- **Error Handling**: Comprehensive error messages and user feedback
- **File Preview**: Visual file attachment preview with removal capability

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI framework
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Styling framework
- **React Markdown 10.1.0** - Markdown rendering

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **OpenAI API 5.9.0** - AI integration
- **Multer 2.0.1** - File upload handling

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **OpenAI API Key** (with Assistants API access)
- **OpenAI Assistant ID** (for your specific assistant)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd reportmate_ai
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 4. Environment Setup

#### Backend Environment
Create a `.env` file in the `backend` directory:
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ASSISTANT_ID=your_assistant_id_here

# Server Configuration
PORT=5000
```

### 5. Create Required Directories
```bash
cd backend
mkdir uploads
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm start
```
The backend will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```plaintext
reportmate_ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatUI.jsx                # Main chat interface
│   │   │   ├── InputBar.jsx              # Message input with file upload
│   │   │   ├── Sidebar.jsx               # Chat history sidebar
│   │   │   ├── FileDropOverlay.jsx       # Drag-and-drop overlay
│   │   │   └── FilePreview.jsx           # File attachment preview
│   │   ├── services/
│   │   │   ├── openaiFileService.js      # File upload service
│   │   │   └── openaiTextService.js      # Text processing service
│   │   ├── App.jsx                       # Main application component
│   │   └── main.jsx                      # Application entry point
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   │   ├── chatController.js             # Chat message handling
│   │   └── fileController.js             # File upload handling
│   ├── routes/
│   │   ├── chatRoutes.js                 # Chat API routes
│   │   └── fileRoutes.js                 # File upload routes
│   ├── services/
│   │   └── openaiService.js              # OpenAI API integration
│   ├── middlewares/
│   │   └── uploadMiddleware.js           # File upload middleware
│   ├── uploads/                          # Temporary file storage
│   ├── app.js                            # Express server setup
│   └── package.json
└── README.md
```

## Configuration

### File Upload Configuration
- Supported file types: PDF, DOC, DOCX, TXT
- Temporary storage: `backend/uploads/` directory

## 🎯 Key Features Implemented

### Chat Interface
- ✅ Real-time chat with AI responses
- ✅ Message history persistence
- ✅ Loading states and error handling
- ✅ Responsive design for all screen sizes

### File Management
- ✅ Drag-and-drop file upload
- ✅ Multiple file support
- ✅ File removal option
- ✅ Horizontal scrolling for multiple files
- ✅ File type validation

### AI Integration
- ✅ OpenAI Assistants API integration
- ✅ Timeout management (60-second default)

### UI/UX Features
- ✅ Clean, modern interface
- ✅ Hover effects and transitions
- ✅ Markdown rendering with custom components
- ✅ Collapsible sidebar
- ✅ Chat session management

### Code Quality
- ✅ Error handling throughout the stack
- ✅ Responsive design patterns
- ✅ Clean component architecture
- ✅ Proper separation of concerns

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 5000 is available
- Verify `.env` file exists with correct API keys
- Ensure all dependencies are installed

**File upload fails:**
- Check file size limits
- Verify file type is supported
- Ensure `uploads/` directory exists

**AI responses timeout:**
- Check OpenAI API key validity
- Verify Assistant ID is correct
- Check network connectivity

**Frontend build errors:**
- Clear `node_modules` and reinstall
- Check Node.js version compatibility
- Verify all dependencies are installed

## API Endpoints

### Chat Endpoints
- `POST /api/chat/message` - Send message to AI

### File Endpoints
- `POST /api/files/upload` - Upload file to OpenAI

#
#

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
