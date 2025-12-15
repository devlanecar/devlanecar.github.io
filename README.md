# IT Team Year-End Report Project

This project is a single-page application (SPA) built with React and TypeScript, leveraging Tailwind CSS for styling, and utilizing specific libraries for data visualization and document generation (PDF/PowerPoint).

1. Installation and Setup

### Prerequisites

You must have Node.js (version 16 or higher) and npm/yarn installed.

### Required Dependencies

Install the following packages using npm or yarn. These are essential for core functionality, charting, document generation, and video playback.

| Dependency | Purpose | Installation Command (npm) |
| :--- | :--- | :--- |
| `react-to-print` | Handles the browser's print dialog for PDF generation. | `npm install react-to-print` |
| `pptxgenjs` | Library for creating and exporting PowerPoint presentations. | `npm install pptxgenjs` |
| `recharts` | A charting library for React used for all data visualizations. | `npm install recharts` |
| `lucide-react` | Icon library used for all UI icons (e.g., `<Download />`, `<Eye />`). | `npm install lucide-react` |
| `react-player` | Handles the video playback and ensures cross-browser compatibility. | `npm install react-player` |

**TypeScript Types:**
If your project requires explicit types for libraries without bundled types, run the following:

```bash
npm install --save-dev @types/pptxgenjs
2. Media File Structure (Crucial for Deployment)The paths in the TechReport.tsx file use absolute URLs (starting with /). This means the media folders must be placed at the root of the server's directory structure to be found correctly.A. Development EnvironmentIf your development server (Webpack, Vite, etc.) uses a conventional setup, place all static assets inside the public folder at the project root.Plaintext/your-project-root/
├── src/
│   └── pages/
│       └── TechReport.tsx
├── public/                
│   ├── logo.png           <-- Used by the Title Slide
│   ├── images/            <-- All IDD/Water JPGs go here
│   │   └── ...
│   └── videos/            <-- Logo_animation.mov goes here
├── package.json
└── ...
B. Production Environment (Post-Build Deployment)After running your build command (which generates your index.html and bundled assets), you must ensure the images and videos folders are placed in the same directory as the root index.html.If your build output directory is named dist (or build), the final hosted structure should look like this:Plaintext/your-deployment-root/ 
├── index.html
├── assets/             <-- (The compiled JS, CSS, etc.)
│   ├── main.js
│   └── styles.css
├── images/             <-- MUST BE COPIED TO THIS ROOT LOCATION
│   └── IDD_01.jpg
└── videos/             <-- MUST BE COPIED TO THIS ROOT LOCATION
    └── Logo_animation.mov
Deployment Note:If your build tool does not automatically copy the images and videos folders into the final build directory's root, you must manually move these folders or add a configuration/script to perform the copy step after every build.3. How to Run and ExportDevelopment and Production CommandsCommandPurposenpm start / yarn startRuns the application in development mode.npm run build / yarn buildCompiles the application for production deployment.Export FunctionalityThe report provides two export options via the Download button in the footer:Save as PDF: Initiates the browser's native print dialog using react-to-print. Set the destination to "Save as PDF" for a paginated, print-optimized document.Save as PowerPoint: Generates and downloads a multi-slide .pptx file using pptxgenjs. Note that video assets are converted to static placeholder slides in the PowerPoint export.