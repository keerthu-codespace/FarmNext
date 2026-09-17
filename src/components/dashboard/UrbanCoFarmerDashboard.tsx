import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Camera,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink,
  PieChart,
  Droplets,
  DollarSign,
  Users,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UrbanCoFarmerDashboard: React.FC = () => {
  const { currentUser, farm, tasks, workers, evidence, setCurrentView, t } = useApp();

  const [sponsorSuccess, setSponsorSuccess] = useState<string | null>(null);

  // Available Co-Farming Opportunities in Karnataka
  const opportunities = [
    {
      id: 'opp-01',
      title: 'Ramanagara Native Finger Millet (Ragi) Plot',
      location: 'Ramanagara District, Karnataka',
      distance: '48 km from Bangalore',
      totalArea: '3.5 Acres',
      crop: 'Organic Ragi (Indaf-9)',
      landowner: 'Kempegowda N.',
      targetSponsorship: '₹35,000 / Acre',
      currentFundedPercent: 78,
      participatingCoFarmers: 5,
      cycleDuration: '105 Days',
      expectedYield: '2.4 Tonnes'
    },
    {
      id: 'opp-02',
      title: 'Doddaballapura Pomegranate & Chickpea Orchard',
      location: 'Doddaballapura, Karnataka',
      distance: '38 km from Bangalore',
      totalArea: '2.2 Acres',
      crop: 'Bhagwa Pomegranate & Bengal Gram',
      landowner: 'Manjunath Reddy',
      targetSponsorship: '₹48,000 / Acre',
      currentFundedPercent: 92,
      participatingCoFarmers: 8,
      cycleDuration: '140 Days',
      expectedYield: '3.8 Tonnes'
    }
  ];

  const handleJoinOpportunity = (oppTitle: string) => {
    setSponsorSuccess(`Pledge registered for ${oppTitle}. Co-farming agreement drafted in transparency ledger.`);
    setTimeout(() => setSponsorSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Urban Co-Farmer Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-2xl font-display shadow-xs">
            {(currentUser?.name || 'Ananya Sharma')
              .split(' ')
              .map(n => n[0])
              .join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-[#1B4332]">
                {currentUser?.name || 'Ananya Sharma'}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Active Co-Farmer Sponsor
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 flex flex-wrap items-center gap-2">
              <span>{currentUser?.location || 'Indiranagar, Bangalore, Karnataka'}</span>
              <span className="text-stone-300">·</span>
              <span className="text-emerald-700 font-medium">Sponsoring: {farm.name} (Mandya)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right px-3 py-1.5 bg-[#FAF9F5] rounded-xl border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Active Capital Contribution</span>
            <span className="font-display font-black text-lg text-[#1B4332]">₹45,000</span>
          </div>
          <button
            onClick={() => setCurrentView('reports')}
            className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Audit Trail & Ledger</span>
          </button>
        </div>
      </div>

      {sponsorSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{sponsorSuccess}</span>
        </div>
      )}

      {/* 4 Summary Vitals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Participating Farm</span>
            <MapPin className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="font-display font-bold text-base text-stone-900 truncate">{farm.name}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">{farm.areaAcres} Acres · Mandya, KA</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Crop & Growth Cycle</span>
            <Sprout className="w-4 h-4 text-[#2D6A4F]" />
          </div>
          <div className="font-display font-bold text-xl text-[#1B4332]">{farm.currentCrop}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Day {farm.currentDay} of {farm.totalDays} ({farm.progressPercent}%)</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Estimated Harvest Yield</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-display font-bold text-2xl text-amber-800">1.85 Tonnes</div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">Co-farmer harvest share: 450 kg</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Soil & Moisture Vitals</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-display font-bold text-2xl text-blue-800">38% Moisture</div>
          <div className="text-[11px] text-blue-600 font-medium mt-0.5">Optimal root hydration</div>
        </div>
      </div>

      {/* Main Split: Participating Farm Deep Dive vs. Field Telemetry & Open Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Active Farm Deep Dive */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Farm Progress & Stage Tracker */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-[#1B4332]">
                  Participating Farm: {farm.name}
                </h2>
                <p className="text-xs text-stone-500">
                  Precision groundnut plot cultivated in Mandya under regenerative agricultural guidelines.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('my_farm')}
                className="text-xs font-semibold text-[#1B4332] hover:underline flex items-center gap-1"
              >
                <span>View Full Farm Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stage Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">
                  Current Milestone: <span className="text-[#1B4332]">{farm.currentStage} (Day {farm.currentDay})</span>
                </span>
                <span className="font-bold text-emerald-700">{farm.progressPercent}% Cycle Completed</span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#1B4332]" style={{ width: `${farm.progressPercent}%` }} />
              </div>
              <div className="grid grid-cols-5 text-[10px] text-stone-400 font-medium pt-1 text-center">
                <span className="text-emerald-800 font-bold">Land Prep ✓</span>
                <span className="text-emerald-800 font-bold">Sowing ✓</span>
                <span className="text-[#1B4332] font-bold">Pegging (Now)</span>
                <span>Pod Fill</span>
                <span>Harvest</span>
              </div>
            </div>

            {/* Stakeholders Coordination Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Landowner & Custodian</span>
                <div className="font-bold text-stone-900 mt-0.5">{farm.landownerName}</div>
                <div className="text-[11px] text-stone-500">{farm.location}</div>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Lead Field Workers</span>
                <div className="font-bold text-stone-900 mt-0.5">Ramesh Kumar & 3 others</div>
                <div className="text-[11px] text-emerald-700 font-medium">Passport Verified (100%)</div>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Co-Farming Share</span>
                <div className="font-bold text-amber-900 mt-0.5">25% Harvest Allocation</div>
                <div className="text-[11px] text-stone-500">Processed Organic Pods</div>
              </div>
            </div>

            {/* Financial & Wage Transparency Breakdown */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>Sponsorship Fund Transparency Ledger</span>
                </span>
                <span className="text-[11px] text-stone-500 font-normal">Audited: Current Season</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase block">Agricultural Wages</span>
                  <span className="font-bold text-stone-800 text-sm">55%</span>
                  <span className="text-[10px] text-stone-500 block">Direct worker transfers</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase block">Bio-Inputs & Seeds</span>
                  <span className="font-bold text-stone-800 text-sm">25%</span>
                  <span className="text-[10px] text-stone-500 block">Drip lines & bio-fertilizer</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase block">Land Custodian Fee</span>
                  <span className="font-bold text-stone-800 text-sm">20%</span>
                  <span className="text-[10px] text-stone-500 block">Plot oversight & water</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Farming Opportunities in Karnataka */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-[#1B4332]">
                  Explore New Co-Farming Opportunities
                </h2>
                <p className="text-xs text-stone-500">
                  Underutilized agricultural land parcels in Karnataka open for verified co-farming partnerships.
                </p>
              </div>
              <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-lg border border-amber-200">
                2 Parcels Open
              </span>
            </div>

            <div className="space-y-3">
              {opportunities.map(opp => (
                <div
                  key={opp.id}
                  className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all bg-[#FAF9F5] space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{opp.title}</h3>
                      <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {opp.location}
                        </span>
                        <span>·</span>
                        <span>{opp.distance}</span>
                        <span>·</span>
                        <span>{opp.totalArea}</span>
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="font-bold text-[#1B4332] block">{opp.targetSponsorship}</span>
                      <span className="text-[10px] text-stone-500">Target Contribution</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-1">
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <span className="text-stone-400 text-[10px] block">Crop Variety</span>
                      <span className="font-semibold text-stone-800">{opp.crop}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <span className="text-stone-400 text-[10px] block">Land Custodian</span>
                      <span className="font-semibold text-stone-800">{opp.landowner}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <span className="text-stone-400 text-[10px] block">Cycle Duration</span>
                      <span className="font-semibold text-stone-800">{opp.cycleDuration}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <span className="text-stone-400 text-[10px] block">Expected Yield</span>
                      <span className="font-semibold text-stone-800">{opp.expectedYield}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span>Funded: <strong>{opp.currentFundedPercent}%</strong></span>
                      <span>·</span>
                      <span>{opp.participatingCoFarmers} Co-Farmers joined</span>
                    </div>

                    <button
                      onClick={() => handleJoinOpportunity(opp.title)}
                      className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#143427] text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Participate in Plot</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Telemetry Stream & Transparency Details */}
        <div className="space-y-6">
          {/* Recent Photographic Field Updates */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Live Photographic Stream</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Verified
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Field photos submitted by verified workers in Mandya with supervisor sign-off.
            </p>

            <div className="space-y-3">
              {evidence.slice(0, 3).map(ev => (
                <div key={ev.id} className="p-3 bg-[#FAF9F5] rounded-2xl border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{ev.taskName}</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                      Passed
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 leading-snug">
                    {ev.aiNotes}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-200/80">
                    <span>{ev.date} · {ev.workerName}</span>
                    <span>{ev.locationUnit}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('monitoring')}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors text-center block cursor-pointer"
            >
              Open Complete Verification Stream
            </button>
          </div>

          {/* Yield Projection Preview */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-display text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>Yield Modelling & Returns</span>
            </h3>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-stone-900">
                <span>Total Expected Harvest:</span>
                <span className="text-amber-900">1.85 Tonnes</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Your Co-Farmer Share:</span>
                <span className="font-semibold text-stone-900">450 kg (Pods)</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Market Value:</span>
                <span className="font-semibold text-emerald-800">₹62,000 – ₹68,000</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('estimated_yield')}
              className="w-full py-2 text-xs font-semibold text-[#1B4332] hover:underline text-center cursor-pointer"
            >
              View Detailed Yield Model →
            </button>
          </div>

          {/* Transparency Certification */}
          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Agronomic Co-Farming Protocol</span>
            <p className="text-stone-600 leading-relaxed">
              FarmNext guarantees direct wage transparency for agricultural laborers, verifiable soil regeneration data, and crop traceability for urban sponsors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
