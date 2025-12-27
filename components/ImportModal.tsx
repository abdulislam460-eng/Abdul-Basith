
import React, { useState } from 'react';
import Button from './Button';
import { extractPortfolioFromDocument, extractPortfolioFromText } from '../services/geminiService';
import { PortfolioData } from '../types';

interface ImportModalProps {
  onImport: (data: PortfolioData) => void;
  onClose: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImport, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const result = await extractPortfolioFromDocument(base64, file.type);
        onImport(result);
        onClose();
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Import error:", err);
      alert("Failed to parse document. Please try pasting the text instead.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextImport = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    try {
      const result = await extractPortfolioFromText(textInput);
      onImport(result);
      onClose();
    } catch (err) {
      console.error("Text import error:", err);
      alert("Failed to extract information. Make sure the text contains resume details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg glass-card rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Import Professional Data</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 pb-2 border-b-2 transition-colors ${activeTab === 'upload' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500'}`}
          >
            File Upload
          </button>
          <button 
            onClick={() => setActiveTab('text')}
            className={`flex-1 pb-2 border-b-2 transition-colors ${activeTab === 'text' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500'}`}
          >
            Paste Text
          </button>
        </div>

        {activeTab === 'upload' ? (
          <div className="text-center space-y-4">
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 hover:border-blue-500/50 transition-colors bg-white/5 group">
              <input 
                type="file" 
                id="file-input" 
                className="hidden" 
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                disabled={loading}
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-gray-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                <p className="text-gray-300">Click to upload your resume (PDF/Image)</p>
                <p className="text-xs text-gray-500 mt-2 italic">Downloaded your resume from Google Drive? Upload it here.</p>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea 
              className="w-full h-40 bg-white/5 border border-gray-700 rounded-xl p-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              placeholder="Paste your resume text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={handleTextImport} 
              isLoading={loading}
              disabled={!textInput.trim()}
            >
              Start AI Extraction
            </Button>
          </div>
        )}

        {loading && (
          <div className="mt-6 text-center animate-pulse">
            <p className="text-blue-400 font-medium">Gemini is analyzing your credentials...</p>
            <p className="text-xs text-gray-500">Extracting roles, skills, and impact...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportModal;
