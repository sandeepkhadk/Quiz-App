import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    role: "player", 
    password: "", 
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // 1. Validation: Check passwords match before calling the API
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // 2. API Call: Send data to Django
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      console.log("Registration Successful:", response.data);
      
      // 3. Success: Redirect to Login
      alert("Account created successfully! Please login.");
      navigate("/login");

    } catch (err) {
      // Handle backend errors (e.g., email already exists)
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-indigo-600 italic tracking-tighter uppercase">Quiz Mania</h1>
          <p className="text-slate-500 mt-2 font-medium">Join the competition</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm font-bold rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Register As</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, role: 'player'})}
                className={`p-3 rounded-xl border-2 font-bold transition-all ${formData.role === 'player' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 text-slate-400'}`}>
                Player
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, role: 'admin'})}
                className={`p-3 rounded-xl border-2 font-bold transition-all ${formData.role === 'admin' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 text-slate-400'}`}>
                Admin
              </button>
            </div>
          </div>

          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
          />

          <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 text-lg">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          Already a member? <Link to="/login" className="text-indigo-600 font-black hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;