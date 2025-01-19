import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Star } from 'lucide-react';
import UserForm from './components/UserForm';
import GuidanceDisplay from './components/GuidanceDisplay';


function App() {
  const [showGuidance, setShowGuidance] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guidanceData, setGuidanceData] = useState(null);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      // Prepare the request payload
      const payload = {
      input_value: formData,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-Rnj65": {},
        "AstraDB-0DQaO": {},
        "ParseData-UP2jw": {},
        "Agent-SNXMR": {},
        "GoogleGenerativeAIModel-piIoL": {},
        "ChatOutput-IcE00": {},
        "File-t1FY0": {},
        "File-L6j4R": {},
        "SplitText-yF4Jt": {},
        "AstraDB-vqgc8": {},
        "Google Generative AI Embeddings-Xd4fY": {},
        "CalculatorTool-ITOMj": {},
        "Google Generative AI Embeddings-cJa2F": {}
      }
      };

      // First API call
      const response1 = await fetch(
      "https://api.langflow.astra.datastax.com/lf/adbd4c75-524d-49a8-ac25-d3348278d702/api/v1/run/55e5a266-e0d9-4647-8dd6-37cf8c221dff?stream=false",
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer AstraCS:tbPTcPRKzeOcunHfgayOvdAv:7925b57a3061a5aef654c0345517a4f5bdffa78f8124b441c2a1b137af79509c"
        },
        body: JSON.stringify(payload)
      }
      );

      const birthChartData = await response1.json();

      // Second API call
      const response2 = await fetch(
      "https://api.langflow.astra.datastax.com/lf/adbd4c75-524d-49a8-ac25-d3348278d702/api/v1/run/17851a95-a01c-43fb-8935-ce836c47f99e?stream=false",
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer AstraCS:ipMnUmFreKvYUOhUGzsBuszF:b55190e052e250600872a6881495e0b60e90888fc2a4f453e584c69cd8c085f2"
        },
        body: JSON.stringify(payload)
      }
      );

      const spiritualData = await response2.json();

      // Combine both responses
      const combinedData = {
      ...birthChartData,
      spiritualContent: spiritualData
      };

      setUserInput(formData);
      setGuidanceData(combinedData);
      setShowGuidance(true);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch guidance data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
      <nav className="bg-black/20 backdrop-blur-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            <span className="text-xl font-semibold">Celestial Guide</span>
          </div>
          <div className="flex space-x-4">
            <Moon className="h-5 w-5" />
            <Sun className="h-5 w-5" />
            <Star className="h-5 w-5" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {!showGuidance ? (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Discover Your Spiritual Path
            </h1>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-100 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            <UserForm onSubmit={handleSubmit} />
            {loading && (
              <div className="text-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300 mx-auto"></div>
                <p className="mt-4 text-yellow-300">Generating your spiritual guidance...</p>
              </div>
            )}
          </div>
        ) : (
          <GuidanceDisplay data={guidanceData} userInput={userInput} />
        )}
      </main>
    </div>
  );
}

export default App;