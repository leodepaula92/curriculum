import { useState, useEffect } from "react";

export function Typewriter({ texts }: { texts: string[] }) {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = texts[currentIndex % texts.length];
            setCurrentText(isDeleting ? fullText.substring(0, currentText.length - 1) : fullText.substring(0, currentText.length + 1));
            setSpeed(isDeleting ? 75 : 150);
            if (!isDeleting && currentText === fullText) { setTimeout(() => setIsDeleting(true), 2000); }
            else if (isDeleting && currentText === "") { setIsDeleting(false); setCurrentIndex(currentIndex + 1); }
        };
        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentIndex, texts, speed]);

    return <span className="border-r-4 border-blue-600 pr-1 animate-pulse">{currentText}</span>;
}