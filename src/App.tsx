/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Tv, Activity, Play, Radio, Info } from 'lucide-react';

const CHANNELS = [
  { id: 'ch1', name: 'Sports HD 1', url: 'https://streamcrichd.com/update/fetch.php?hd=1&embed=1', offline: false },
  { id: 'ch12', name: 'Sports HD 12', url: 'https://streamcrichd.com/update/fetch.php?hd=12&embed=1', offline: false },
  { id: 'ch3', name: 'Football Extra HD', url: '', offline: true },
  { id: 'ch4', name: 'Cricket Live Pro', url: '', offline: true },
];

const MOCK_SCORES = [
  { id: 1, teamA: 'IND', teamB: 'AUS', score: '210/4', over: '32.4', status: 'Live', detail: 'IND need 45 runs to win in 10 overs' },
  { id: 2, teamA: 'BAN', teamB: 'SL', score: '180/10', over: '44.1', status: 'Innings Break', detail: 'SL will bat next' },
  { id: 3, teamA: 'ENG', teamB: 'NZ', score: '320/8', over: '90.0', status: 'Stumps', detail: 'Day 1: Joe Root 114*' },
];

export default function App() {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = CHANNELS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500/30">
      
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-emerald-400">
            <Tv className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Sports<span className="text-emerald-400">Cast</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search channels..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 text-sm text-slate-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-default">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Player & Channels */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          
          {/* Video Player Container */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-800 relative aspect-video flex flex-col group">
            {activeChannel.offline ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                <Tv className="w-12 h-12 mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Stream Offline</h3>
                <p className="text-sm">This channel is currently not broadcasting any live event.</p>
              </div>
            ) : (
              <iframe 
                src={activeChannel.url} 
                className="w-full h-full absolute inset-0 border-0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title={activeChannel.name}
              />
            )}
            
            {/* Player Info Overlay (visible on hover) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <h2 className="text-white font-medium drop-shadow-md">
                    {activeChannel.name}
                  </h2>
                </div>
                <p className="text-xs text-white/70 drop-shadow">
                  If video shows "SANDBOX ERROR", open this app in a new tab.
                </p>
              </div>
            </div>
          </div>

          {/* Channel Selector */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-200">Available Channels</h3>
              <span className="text-xs font-medium text-slate-500">{filteredChannels.length} results</span>
            </div>
            
            {filteredChannels.length === 0 ? (
              <div className="bg-slate-800/30 rounded-xl p-8 text-center border border-slate-800/50">
                <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No channels found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`flex items-center p-3 rounded-xl border text-left transition-all ${
                      activeChannel.id === channel.id 
                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm shadow-emerald-900/20' 
                        : 'bg-slate-800 border-slate-700/50 hover:border-slate-600 hover:bg-slate-750'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mr-3 ${
                      activeChannel.id === channel.id ? 'bg-emerald-500/20' : 'bg-slate-900'
                    }`}>
                      {channel.offline ? (
                        <Tv className={`w-5 h-5 ${activeChannel.id === channel.id ? 'text-emerald-400' : 'text-slate-500'}`} />
                      ) : (
                        <Play className={`w-5 h-5 ${activeChannel.id === channel.id ? 'text-emerald-400' : 'text-slate-400'}`} fill="currentColor" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${
                        activeChannel.id === channel.id ? 'text-emerald-400' : 'text-slate-200'
                      }`}>
                        {channel.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        {channel.offline ? (
                          <>Offline</>
                        ) : (
                          <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> 1080p HD</>
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Scores Widget */}
        <div className="col-span-1 lg:col-span-4 h-full">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col h-full sticky top-24">
            
            {/* Widget Header */}
            <div className="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-200">Live Scores</h3>
            </div>

            {/* Scores List */}
            <div className="p-4 space-y-3 overflow-y-auto">
              {MOCK_SCORES.map((match) => (
                <div key={match.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 hover:border-slate-600 transition-colors">
                  
                  {/* Status Banner */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-sm">
                      Cricket
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm ${
                      match.status === 'Live' ? 'text-red-400 bg-red-400/10 animate-pulse' : 'text-emerald-400 bg-emerald-400/10'
                    }`}>
                      {match.status}
                    </span>
                  </div>

                  {/* Teams & Score */}
                  <div className="flex justify-between items-end mb-3">
                    <div className="space-y-1 text-sm font-semibold text-slate-300">
                      <div>{match.teamA}</div>
                      <div>{match.teamB}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold tracking-tight text-white">
                        {match.score}
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Overs: {match.over}
                      </div>
                    </div>
                  </div>

                  {/* Details Footer */}
                  <div className="pt-3 mt-1 border-t border-slate-800/50 text-xs text-slate-400 font-medium">
                    {match.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Widget Footer */}
            <div className="p-4 mt-auto border-t border-slate-700/50 bg-slate-800/20">
              <button className="w-full py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
                View All Matches →
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
