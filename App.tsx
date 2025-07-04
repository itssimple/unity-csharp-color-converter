import React from "react";
import ColorConverter from "./components/ColorConverter";

function App() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-900 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Unity C# Color Converter
                </h1>
                <p className="text-slate-400 mt-2 text-lg">
                    Pick a color and get the code for Unity.
                </p>
            </header>
            <main>
                <ColorConverter />
            </main>
            <footer className="absolute bottom-4 text-center text-slate-500 text-sm">
                <p>Built for modders, by a modder. Happy crafting!</p>
            </footer>
        </div>
    );
}

export default App;
