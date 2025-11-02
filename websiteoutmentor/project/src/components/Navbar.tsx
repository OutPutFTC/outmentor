import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { profile, signOut } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-[#930200] to-[#ff8e00] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Intro Rust, sans-serif' }}>
          OutMentor
        </h1>
        {profile && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{profile.full_name}</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
