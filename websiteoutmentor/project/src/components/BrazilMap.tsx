import { useState } from 'react';

const brazilStates = [
  { name: 'Acre', code: 'AC', x: 15, y: 45 },
  { name: 'Alagoas', code: 'AL', x: 80, y: 45 },
  { name: 'Amapá', code: 'AP', x: 50, y: 15 },
  { name: 'Amazonas', code: 'AM', x: 25, y: 30 },
  { name: 'Bahia', code: 'BA', x: 75, y: 50 },
  { name: 'Ceará', code: 'CE', x: 75, y: 30 },
  { name: 'Distrito Federal', code: 'DF', x: 70, y: 60 },
  { name: 'Espírito Santo', code: 'ES', x: 80, y: 70 },
  { name: 'Goiás', code: 'GO', x: 65, y: 60 },
  { name: 'Maranhão', code: 'MA', x: 65, y: 30 },
  { name: 'Mato Grosso', code: 'MT', x: 50, y: 55 },
  { name: 'Mato Grosso do Sul', code: 'MS', x: 55, y: 70 },
  { name: 'Minas Gerais', code: 'MG', x: 73, y: 68 },
  { name: 'Pará', code: 'PA', x: 50, y: 25 },
  { name: 'Paraíba', code: 'PB', x: 80, y: 38 },
  { name: 'Paraná', code: 'PR', x: 60, y: 78 },
  { name: 'Pernambuco', code: 'PE', x: 78, y: 42 },
  { name: 'Piauí', code: 'PI', x: 70, y: 35 },
  { name: 'Rio de Janeiro', code: 'RJ', x: 78, y: 75 },
  { name: 'Rio Grande do Norte', code: 'RN', x: 82, y: 32 },
  { name: 'Rio Grande do Sul', code: 'RS', x: 55, y: 88 },
  { name: 'Rondônia', code: 'RO', x: 30, y: 50 },
  { name: 'Roraima', code: 'RR', x: 35, y: 10 },
  { name: 'Santa Catarina', code: 'SC', x: 62, y: 82 },
  { name: 'São Paulo', code: 'SP', x: 68, y: 75 },
  { name: 'Sergipe', code: 'SE', x: 82, y: 48 },
  { name: 'Tocantins', code: 'TO', x: 65, y: 45 }
];

export default function BrazilMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#930200]" style={{ fontFamily: 'Intro Rust, sans-serif' }}>
        Mentores por todo Brasil
      </h2>
      <div className="relative w-full h-full">
        {brazilStates.map((state) => (
          <div
            key={state.code}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${state.x}%`, top: `${state.y}%` }}
            onMouseEnter={() => setHoveredState(state.code)}
            onMouseLeave={() => setHoveredState(null)}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                hoveredState === state.code
                  ? 'bg-gradient-to-r from-[#930200] to-[#ff8e00] scale-125 shadow-xl'
                  : 'bg-orange-400 hover:bg-orange-500'
              }`}
            >
              <span className="text-white text-xs font-bold">{state.code}</span>
            </div>
            {hoveredState === state.code && (
              <div className="absolute top-full mt-2 bg-white px-3 py-1 rounded shadow-lg whitespace-nowrap text-sm z-10">
                {state.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
