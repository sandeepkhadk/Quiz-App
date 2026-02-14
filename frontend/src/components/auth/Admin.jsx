import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Admin() {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    question_text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_answer: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/"); // Redirect to home/login
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Syncing with database..." });

    try {
      await axios.post("http://127.0.0.1:8000/api/questions/", formData);
      setStatus({ type: "success", message: "Question Published! 🚀" });
      setFormData({
        question_text: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct_answer: "",
      });
    } catch (err) {
      setStatus({ type: "error", message: "Connection Error. Check Backend." });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      
      {/* --- NEW LOGOUT SECTION / TOP BAR --- */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Admin Session Active</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-all border border-red-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          LOGOUT
        </button>
      </div>

      {/* Fancy Center Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic uppercase tracking-tighter">
          Qiz Admin
        </h1>
        <p className="text-slate-500 font-medium mt-2">Content Management System</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* FORM SECTION */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
            Add New Question
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Question Title</label>
              <input
                name="question_text"
                required
                value={formData.question_text}
                onChange={handleChange}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                placeholder="What is the result of 2 + 2?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">Option {num}</label>
                  <input
                    name={`option${num}`}
                    required
                    value={formData[`option${num}`]}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 outline-none"
                    placeholder={`Answer ${num}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold text-indigo-600 mb-2">Correct Answer</label>
              <select
                name="correct_answer"
                required
                value={formData.correct_answer}
                onChange={handleChange}
                className="w-full p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl text-indigo-700 font-bold outline-none appearance-none cursor-pointer hover:bg-indigo-100 transition-colors"
              >
                <option value="">-- Choose the winner --</option>
                {formData.option1 && <option value={formData.option1}>{formData.option1}</option>}
                {formData.option2 && <option value={formData.option2}>{formData.option2}</option>}
                {formData.option3 && <option value={formData.option3}>{formData.option3}</option>}
                {formData.option4 && <option value={formData.option4}>{formData.option4}</option>}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              PUSH TO APP
            </button>

            {status.message && (
              <div className={`mt-4 p-4 rounded-xl text-center text-sm font-bold animate-bounce ${
                status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* PREVIEW SECTION */}
        <div className="hidden lg:block">
          <div className="sticky top-12 border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[500px]">
            <span className="text-xs font-bold text-slate-400 uppercase mb-8 bg-slate-200 px-3 py-1 rounded-full">Live Preview</span>
            
            {/* Mockup Question Card */}
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
              <div className="h-2 w-1/3 bg-indigo-100 rounded-full mb-6"></div>
              <p className="text-lg font-bold text-slate-800 mb-6">
                {formData.question_text || "Your question will appear here..."}
              </p>
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`p-3 border rounded-xl text-sm font-medium ${formData.correct_answer && formData[`option${i}`] === formData.correct_answer ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 text-slate-500'}`}>
                    {formData[`option${i}`] || `Option ${i}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin;