
import { createRoot } from "react-dom/client";
import emailjs from '@emailjs/browser';
import App from "./App.tsx";
import "./index.css";

// Initialize EmailJS
emailjs.init((import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY);

createRoot(document.getElementById("root")!).render(<App />);
