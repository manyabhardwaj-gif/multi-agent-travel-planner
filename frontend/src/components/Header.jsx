import React, { useState } from 'react';
import { Plane, Sparkles, Key, CheckCircle, AlertCircle, RefreshCw, Cpu } from 'lucide-react';

export default function Header({ geminiApiKey, setGeminiApiKey, backendStatus }) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(geminiApiKey || '');
  const [testingKey, setTestingKey] = useState(false);
  const [keyTestResult, setKeyTestResult] = useState(null);

  const handleTestAndSaveKey = async () => {
    if (!inputKey.trim()) {
      setGeminiApiKey('');
      setKeyTestResult({ valid: true, message: 'Reverted to built-in autonomous agent engine.' });
      return;
    }

    setTestingKey(true);
    setKeyTestResult(null);

    try {
      const res = await fetch('/api/verify-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: inputKey.trim() })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setGeminiApiKey(inputKey.trim());
        setKeyTestResult({ valid: true, message: 'Gemini 3 API Key verified & active!' });
      } else {
        setKeyTestResult({ valid: false, message: data.message || 'Invalid API Key' });
      }
    } catch {
      setKeyTestResult({ valid: false, message: 'Could not contact server to test key.' });
    } finally {
      setTestingKey(false);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Plane className="w-6 h-6 text-indigo-400 -rotate-45" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-display">AeroVoyage</h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Multi-Agent AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Created by <span className="text-indigo-300 font-semibold">Manya Bhardwaj</span> • Autonomous Agent Architecture
            </p>
          </div>
        </div>

        {/* Right Actions: Status & Key Config */}
        <div className="flex items-center space-x-3">
          {/* Agent System Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">4 Agents Standby</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-400 font-mono">Gemini 3 Orchestrated</span>
          </div>

          {/* Gemini API Key config button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all hover:border-indigo-500/50"
            title="Configure Gemini 3 API Key (Optional)"
          >
            <Key className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{geminiApiKey ? 'API Key Active' : 'AI Engine: Hybrid'}</span>
            <span className="sm:hidden">Key</span>
            {geminiApiKey && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
          </button>
        </div>
      </div>

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel-elevated rounded-2xl max-w-md w-full p-6 text-slate-100 border border-slate-700/60 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Gemini 3 AI Configuration</h3>
                  <p className="text-xs text-slate-400">Multi-Agent Intelligence Settings</p>
                </div>
              </div>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                AeroVoyage operates in <strong>Hybrid Mode</strong>. It seamlessly runs intelligent autonomous agents out of the box, or you can provide your own Google Gemini API key for direct real-time Gemini 3 model synthesis.
              </p>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Google Gemini API Key (Optional)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              {keyTestResult && (
                <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${keyTestResult.valid ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300' : 'bg-rose-950/50 border border-rose-800 text-rose-300'}`}>
                  {keyTestResult.valid ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{keyTestResult.message}</span>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleTestAndSaveKey}
                  disabled={testingKey}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 disabled:opacity-50"
                >
                  {testingKey ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  <span>{testingKey ? 'Verifying...' : 'Save & Activate'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
