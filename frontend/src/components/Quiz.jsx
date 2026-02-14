import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [limit, setLimit] = useState(5);
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();
  
  // FIXED: Standardize name retrieval
  const userName = localStorage.getItem("userName") || "Player";

  useEffect(() => {
    fetchQuestions();
    const savedHistory = JSON.parse(localStorage.getItem(`history_${userName}`)) || [];
    setHistory(savedHistory);
  }, [userName]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/questions/");
      const data = Array.isArray(res.data) ? res.data : [];
      setQuestions(data);
      // Adjust default limit based on database size
      if (data.length > 0 && data.length < 5) setLimit(data.length);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (questions.length === 0) {
      alert("No questions found in the database!");
      return;
    }

    // FIXED: Prepare the data array FIRST
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selectedBatch = shuffled.slice(0, Math.min(limit, questions.length));
    
    // Update state in one go
    setQuizQuestions(selectedBatch);
    setScore(0);
    setCurrent(0);
    setIsStarted(true);
  };

  const handleAnswer = (selected) => {
    const isCorrect = selected === quizQuestions[current].correct_answer;
    const nextScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) setScore(nextScore);

    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      saveFinalScore(nextScore);
      setCurrent(current + 1); 
    }
  };

  const saveFinalScore = (final) => {
    const entry = {
      date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      score: final,
      total: quizQuestions.length,
    };
    const newHistory = [entry, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem(`history_${userName}`, JSON.stringify(newHistory));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <p className="text-indigo-400 font-bold animate-pulse">SYNCING DATA...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10 font-sans">
      
      {/* NAVBAR */}
      <nav className="max-w-5xl mx-auto flex justify-between items-center mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black italic tracking-tighter text-indigo-400">QUIZ MANIA</h1>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live Session</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Current Player</p>
            <p className="text-sm font-black text-white">{userName}</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all text-xs font-bold border border-red-500/20">
            LOGOUT
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          
          {/* PHASE 1: START SCREEN */}
          {!isStarted ? (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] text-center shadow-2xl"
            >
              <h2 className="text-4xl font-black mb-2">Welcome, {userName}!</h2>
              <p className="text-slate-400 mb-8">Questions in bank: {questions.length}</p>
              
              <div className="mb-10 px-4">
                <input 
                  type="range" min="1" max={questions.length || 1} value={limit} 
                  onChange={(e) => setLimit(Number(e.target.value))} 
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-4" 
                />
                <p className="text-indigo-400 font-black text-5xl">{limit}</p>
              </div>

              <button 
                onClick={startQuiz} 
                disabled={questions.length === 0}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                START THE CHALLENGE
              </button>
            </motion.div>
          ) : (quizQuestions.length > 0 && current < quizQuestions.length) ? (
            
            /* PHASE 2: QUESTION SCREEN - Added Check for quizQuestions.length > 0 */
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
                  className="h-full bg-indigo-500"
                />
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-10">
                  {quizQuestions[current]?.question_text}
                </h3>
                <div className="grid gap-4">
                  {[1, 2, 3, 4].map((n) => {
                    const optionValue = quizQuestions[current]?.[`option${n}`];
                    return optionValue ? (
                      <button key={n} onClick={() => handleAnswer(optionValue)} 
                        className="w-full p-5 text-left bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/40 rounded-2xl transition-all font-semibold">
                        {optionValue}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          ) : quizQuestions.length > 0 ? (
            
            /* PHASE 3: RESULT SCREEN */
            <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] text-center"
            >
              <h2 className="text-5xl font-black mb-8">Results</h2>
              <div className="grid grid-cols-2 gap-4 mb-10 text-left">
                <div className="bg-white/5 p-6 rounded-2xl">
                    <p className="text-xs font-bold text-indigo-400 mb-1">SCORE</p>
                    <p className="text-3xl font-black">{score} / {quizQuestions.length}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl">
                    <p className="text-xs font-bold text-purple-400 mb-1">ACCURACY</p>
                    <p className="text-3xl font-black">{((score/quizQuestions.length)*100).toFixed(0)}%</p>
                </div>
              </div>
              <button onClick={() => setIsStarted(false)} className="w-full py-4 bg-indigo-600 rounded-xl font-bold">PLAY AGAIN</button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Quiz;