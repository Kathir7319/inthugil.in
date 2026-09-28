// client/src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { useAuth } from '../context/AuthContext';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@inthugil.in');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sand-50 min-h-screen flex items-center justify-center py-16 px-4">
      <SEOHead
        title="Admin CMS Login | Inthugil"
        description="Admin portal for Inthugil.in store management"
        canonicalUrl="https://inthugil.in/admin/login"
      />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-sand-200 shadow-lift">
        
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-tight text-regal-900">
              INTHUGIL
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-medium text-brand-700">
              Website Management Portal
            </span>
          </Link>
          <div className="w-12 h-1 bg-brand-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Notice */}
        <div className="bg-brand-50 border border-brand-100 p-3.5 rounded-2xl mb-6 text-xs text-brand-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <strong>Effortless Website Maintenance:</strong> Pre-filled with initial owner credentials for immediate setup and testing.
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-regal-900 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-sand-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-regal-900 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-sand-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-regal-900 hover:bg-brand-600 text-white py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition duration-200 mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Enter Admin Studio'}</span>
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-sand-100 text-center">
          <Link to="/" className="text-xs text-sand-500 hover:text-brand-600 font-medium">
            &larr; Back to Inthugil Storefront
          </Link>
        </div>

      </div>
    </div>
  );
};
