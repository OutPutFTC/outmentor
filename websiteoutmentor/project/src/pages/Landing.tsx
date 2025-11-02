import { Users, Target, Award } from 'lucide-react';
import BrazilMap from '../components/BrazilMap';

interface LandingProps {
  onNavigate: (view: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#930200] to-[#ff8e00] bg-clip-text text-transparent"
            style={{ fontFamily: 'Intro Rust, sans-serif' }}
          >
            OutMentor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectando mentores experientes com equipes de FTC e FLL em todo o Brasil
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 justify-center mb-20">
          <button
            onClick={() => onNavigate('register-mentor')}
            className="group bg-gradient-to-r from-[#930200] to-[#ff8e00] text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform shadow-xl"
          >
            <Users className="inline-block mr-3" size={32} />
            Sou Mentor
          </button>
          <button
            onClick={() => onNavigate('register-team')}
            className="group bg-gradient-to-r from-[#ff8e00] to-[#930200] text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform shadow-xl"
          >
            <Target className="inline-block mr-3" size={32} />
            Sou Equipe
          </button>
        </div>

        <BrazilMap />

        <section className="mt-20 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-[#930200] to-[#ff8e00] rounded-full">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#930200]" style={{ fontFamily: 'Intro Rust, sans-serif' }}>
                FIRST Tech Challenge
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Programa de robótica para estudantes do ensino médio, desafiando equipes a projetar, construir, programar e operar robôs para competir em um jogo baseado em campo.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-[#ff8e00] to-[#930200] rounded-full">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#ff8e00]" style={{ fontFamily: 'Intro Rust, sans-serif' }}>
                FIRST LEGO League
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Programa que introduz ciência, tecnologia, engenharia e matemática para jovens através de aprendizado prático e robótica com LEGO, promovendo inovação e trabalho em equipe.
            </p>
          </div>
        </section>

        <div className="text-center mt-20">
          <button
            onClick={() => onNavigate('login')}
            className="bg-white text-[#930200] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all border-2 border-[#930200]"
          >
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
}
