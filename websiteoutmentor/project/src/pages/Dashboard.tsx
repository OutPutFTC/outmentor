import { useState, useEffect } from 'react';
import { Search, MapPin, MessageCircle, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';

interface Profile {
  id: string;
  user_type: 'mentor' | 'team';
  full_name: string;
  state: string;
  city: string;
  bio: string;
  mentor_details?: {
    mentor_ftc: boolean;
    mentor_fll: boolean;
    knowledge_areas: string[];
  };
  team_details?: {
    team_number: string;
    team_type: 'FTC' | 'FLL';
    interest_areas: string[];
  };
}

interface Connection {
  id: string;
  status: string;
  mentor_id: string;
  team_id: string;
  profile: Profile;
}

export default function Dashboard() {
  const { profile: currentProfile } = useAuth();
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [myConnections, setMyConnections] = useState<Connection[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [filters, setFilters] = useState({
    state: '',
    type: '',
    search: ''
  });

  useEffect(() => {
    loadConnections();
    searchProfiles();
  }, [currentProfile]);

  const loadConnections = async () => {
    if (!currentProfile) return;

    const isMentor = currentProfile.user_type === 'mentor';
    const { data } = await supabase
      .from('connections')
      .select(`
        *,
        ${isMentor ? 'team_id' : 'mentor_id'}(*)
      `)
      .eq(isMentor ? 'mentor_id' : 'team_id', currentProfile.id)
      .eq('status', 'accepted');

    if (data) {
      const connections = data.map((conn: any) => ({
        ...conn,
        profile: isMentor ? conn.team_id : conn.mentor_id
      }));
      setMyConnections(connections);
    }
  };

  const searchProfiles = async () => {
    if (!currentProfile) return;

    const searchType = currentProfile.user_type === 'mentor' ? 'team' : 'mentor';
    let query = supabase
      .from('profiles')
      .select(`
        *,
        mentor_details(*),
        team_details(*)
      `)
      .eq('user_type', searchType)
      .neq('id', currentProfile.id);

    if (filters.state) {
      query = query.eq('state', filters.state);
    }

    if (filters.search) {
      query = query.ilike('full_name', `%${filters.search}%`);
    }

    const { data } = await query.limit(20);
    setSearchResults(data || []);
  };

  const createConnection = async (targetId: string) => {
    if (!currentProfile) return;

    const isMentor = currentProfile.user_type === 'mentor';
    await supabase.from('connections').insert({
      mentor_id: isMentor ? currentProfile.id : targetId,
      team_id: isMentor ? targetId : currentProfile.id,
      status: 'accepted'
    });

    loadConnections();
  };

  const createMeeting = async (connectionId: string) => {
    const meetLink = `https://meet.google.com/new`;
    const title = `Reunião OutMentor`;

    await supabase.from('meetings').insert({
      connection_id: connectionId,
      title,
      scheduled_at: new Date().toISOString(),
      meet_link: meetLink
    });

    window.open(meetLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-[#930200]" style={{ fontFamily: 'Intro Rust, sans-serif' }}>
                Buscar {currentProfile?.user_type === 'mentor' ? 'Equipes' : 'Mentores'}
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Buscar por nome..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      onKeyUp={(e) => e.key === 'Enter' && searchProfiles()}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff8e00]"
                    />
                  </div>
                  <button
                    onClick={searchProfiles}
                    className="bg-gradient-to-r from-[#930200] to-[#ff8e00] text-white px-6 py-2 rounded-lg hover:scale-105 transition"
                  >
                    <Search size={20} />
                  </button>
                </div>

                <select
                  value={filters.state}
                  onChange={(e) => {
                    setFilters({ ...filters, state: e.target.value });
                    searchProfiles();
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff8e00]"
                >
                  <option value="">Todos os estados</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Minas Gerais">Minas Gerais</option>
                </select>
              </div>

              <div className="mt-6 space-y-4">
                {searchResults.map((profile) => (
                  <div key={profile.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{profile.full_name}</h3>
                        {profile.team_details && (
                          <p className="text-sm text-gray-600">
                            {profile.team_details.team_number} - {profile.team_details.team_type}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <MapPin size={14} />
                          {profile.city}, {profile.state}
                        </div>
                        {profile.mentor_details && (
                          <div className="mt-2 flex gap-2">
                            {profile.mentor_details.mentor_ftc && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">FTC</span>
                            )}
                            {profile.mentor_details.mentor_fll && (
                              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">FLL</span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => createConnection(profile.id)}
                        className="bg-gradient-to-r from-[#930200] to-[#ff8e00] text-white px-4 py-2 rounded-lg hover:scale-105 transition text-sm"
                      >
                        Conectar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-[#930200]" style={{ fontFamily: 'Intro Rust, sans-serif' }}>
                Minhas Conexões
              </h2>

              <div className="space-y-3">
                {myConnections.map((connection) => (
                  <div
                    key={connection.id}
                    className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                  >
                    <h4 className="font-semibold">{connection.profile.full_name}</h4>
                    <p className="text-xs text-gray-500">{connection.profile.city}, {connection.profile.state}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setSelectedConnection(connection)}
                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200"
                      >
                        <MessageCircle size={14} />
                        Chat
                      </button>
                      <button
                        onClick={() => createMeeting(connection.id)}
                        className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200"
                      >
                        <Video size={14} />
                        Meet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedConnection && (
        <Chat
          connection={selectedConnection}
          onClose={() => setSelectedConnection(null)}
        />
      )}
    </div>
  );
}
