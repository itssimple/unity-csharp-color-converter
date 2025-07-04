import React, { useState, useMemo, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';

// Helper function defined outside the component to prevent re-creation on re-renders.
const hexToUnityColor = (hex: string): string => {
  // Remove the '#' if it exists
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle shorthand hex (e.g., "03F")
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split('').map(char => char + char).join('') 
    : cleanHex;

  if (fullHex.length !== 6) {
    return 'new Color(1.000f, 1.000f, 1.000f)'; // Default to white on invalid input
  }

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  const rFloat = (r / 255.0).toFixed(3);
  const gFloat = (g / 255.0).toFixed(3);
  const bFloat = (b / 255.0).toFixed(3);

  return `new Color(${rFloat}f, ${gFloat}f, ${bFloat}f)`;
};


const ColorConverter: React.FC = () => {
  const [color, setColor] = useState<string>('#3b82f6'); // A nice default blue
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const unityColorCode = useMemo(() => hexToUnityColor(color), [color]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };
  
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(unityColorCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [unityColorCode]);

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden">
      <div 
        className="relative h-60 w-full border-b-4 border-slate-700 transition-colors duration-200"
        style={{ backgroundColor: color }}
      >
        <label
          htmlFor="color-picker-input"
          className="absolute bottom-4 right-4 cursor-pointer text-white text-opacity-80 hover:text-opacity-100 transition-opacity"
        >
          <span className="sr-only">Choose Color</span>
          <input
            id="color-picker-input"
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-12 h-12 p-0 border-none rounded-full cursor-pointer appearance-none bg-transparent"
            style={{
                '--tw-shadow': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
              } as React.CSSProperties}
          />
        </label>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-400">HEX</span>
          <span className="font-mono text-lg text-slate-200 bg-slate-700 px-3 py-1 rounded-md">{color.toUpperCase()}</span>
        </div>
        
        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-400">Unity C# Code</span>
          <div className="flex items-center space-x-2">
            <code className="w-full font-mono text-lg text-cyan-300 bg-slate-900 p-3 rounded-md overflow-x-auto whitespace-nowrap">
              {unityColorCode}
            </code>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 p-3 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                isCopied 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
              aria-label={isCopied ? 'Copied' : 'Copy code'}
            >
              {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;