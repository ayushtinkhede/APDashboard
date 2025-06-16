// Enhanced APDashboard Design - Complete Single File Integration

import React, { useState, useEffect } from 'react';
import {
  Clock, TrendingUp, Building, RefreshCw, ArrowUp, ArrowDown, DollarSign, Settings, Globe
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Line
} from 'recharts';

// Helper Functions
const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(amount);

const getStatusColor = (status) => {
  switch (status) {
    case 'excellent': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    case 'good': return 'text-green-400 bg-green-400/10 border-green-400/30';
    case 'warning': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    case 'risk': return 'text-red-400 bg-red-400/10 border-red-400/30';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  }
};

const getRiskColor = (risk) => {
  switch (risk) {
    case 'Low': return 'text-green-400 bg-green-400/10 border-green-400/30';
    case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    case 'High': return 'text-red-400 bg-red-400/10 border-red-400/30';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  }
};

// Data Sets
const executiveSummary = {
  totalAmountDue: 19217,
  overdueAmount: 14616,
  cashPosition: 231212,
  riskScore: 'Medium',
  workingCapital: 187595
};

const kpiMetrics = [
  { title: 'Days Payable Outstanding', value: '45.2', unit: 'days', trend: 'up', change: '+2.1%', status: 'warning', icon: Clock },
  { title: 'Payment Velocity', value: '12.3', unit: 'days avg', trend: 'down', change: '-1.8%', status: 'good', icon: TrendingUp },
  { title: 'Vendor Concentration', value: '37.6', unit: '%', trend: 'up', change: '+4.2%', status: 'risk', icon: Building },
  { title: 'Cash Conversion Cycle', value: '28.7', unit: 'days', trend: 'down', change: '-3.5%', status: 'excellent', icon: RefreshCw }
];

const cashFlowProjection = [
  { period: 'Week 1', outflow: 4200, inflow: 2800, netFlow: -1400 },
  { period: 'Week 2', outflow: 3850, inflow: 5200, netFlow: 1350 },
  { period: 'Week 3', outflow: 5100, inflow: 3200, netFlow: -1900 },
  { period: 'Week 4', outflow: 2950, inflow: 4800, netFlow: 1850 }
];

const riskAnalysis = [
  { category: 'Concentration Risk', score: 75, status: 'Medium', description: 'Top 3 vendors represent 56.3% of payables', icon: Building },
  { category: 'Liquidity Risk', score: 20, status: 'Low', description: 'Strong cash position with 45 days coverage', icon: DollarSign },
  { category: 'Operational Risk', score: 45, status: 'Medium', description: '24% of vendors have extended payment terms', icon: Settings },
  { category: 'Currency Risk', score: 35, status: 'Low', description: 'Multi-currency exposure well hedged', icon: Globe }
];

const vendorPortfolio = [
  { name: 'Innovative Tech', amount: 3728, percentage: 19.4, riskScore: 'Low', paymentTerms: 'Net 30', relationship: 'Strategic', color: '#3b82f6' },
  { name: 'TechAdvantage Software', amount: 3616, percentage: 18.8, riskScore: 'Medium', paymentTerms: 'Net 45', relationship: 'Preferred', color: '#6366f1' },
  { name: 'Coastal Shipping', amount: 3473, percentage: 18.1, riskScore: 'Low', paymentTerms: 'Net 15', relationship: 'Standard', color: '#8b5cf6' },
  { name: 'Green Gardens', amount: 2944, percentage: 15.3, riskScore: 'Medium', paymentTerms: 'Net 30', relationship: 'Strategic', color: '#06b6d4' },
  { name: 'City Construction', amount: 2256, percentage: 11.7, riskScore: 'High', paymentTerms: 'Net 60', relationship: 'Standard', color: '#10b981' },
  { name: 'Urban Apparel', amount: 1985, percentage: 10.3, riskScore: 'Low', paymentTerms: 'Net 30', relationship: 'Preferred', color: '#f59e0b' }
];

const treasuryOverview = [
  { account: 'Operating Account (USD)', balance: 102315, currency: 'USD', type: 'Primary', utilization: 68, color: '#3b82f6' },
  { account: 'Foreign Exchange (GBP)', balance: 29808, currency: 'GBP', type: 'FX Hedge', utilization: 45, color: '#6366f1' },
  { account: 'Trade Finance (CAD)', balance: 56123, currency: 'CAD', type: 'Trade', utilization: 72, color: '#8b5cf6' },
  { account: 'Reserve Fund (AUD)', balance: 42966, currency: 'AUD', type: 'Reserve', utilization: 23, color: '#06b6d4' }
];

// Component Definitions
const KPIBox = ({ title, value, unit, trend, change, status, icon: Icon }) => (
  <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-5 h-5 text-gray-300" />
      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(status)}`}>{change}</span>
    </div>
    <h4 className="text-sm text-gray-400">{title}</h4>
    <div className="text-xl text-white font-light">{value} <span className="text-sm text-gray-500">{unit}</span></div>
  </div>
);

const RiskCard = ({ icon: Icon, category, score, status, description }) => (
  <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2 text-sm text-white">
        <Icon className="w-4 h-4" /> {category}
      </div>
      <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(status)}`}>{status}</span>
    </div>
    <div className="text-xs text-gray-400 mb-1">{description}</div>
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div className="h-2 rounded-full" style={{ width: `${score}%`, backgroundColor: status === 'High' ? '#ef4444' : status === 'Medium' ? '#f59e0b' : '#10b981' }}></div>
    </div>
  </div>
);

const VendorCard = ({ name, amount, percentage, riskScore, paymentTerms, relationship, color }) => (
  <div className="p-5 border border-gray-700/30 rounded-xl">
    <div className="flex justify-between mb-4">
      <div className="flex gap-3 items-center">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        <div>
          <h4 className="text-white text-sm font-medium">{name}</h4>
          <p className="text-xs text-gray-400">{relationship} Partner</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-semibold">{formatCurrency(amount)}</p>
        <p className="text-xs text-gray-400">{percentage}% of total</p>
      </div>
    </div>
    <div className="flex justify-between text-xs">
      <span className={`px-2 py-1 rounded-full border ${getRiskColor(riskScore)}`}>{riskScore} Risk</span>
      <span className="text-gray-400 bg-gray-800/50 px-2 py-1 rounded">{paymentTerms}</span>
    </div>
  </div>
);

const TreasuryCard = ({ account, balance, currency, type, utilization, color }) => (
  <div className="p-5 border border-gray-700/30 rounded-xl">
    <div className="flex justify-between mb-4">
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        <div>
          <h4 className="text-white text-sm font-medium">{account}</h4>
          <p className="text-xs text-gray-400">{type} Account</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-semibold">{formatCurrency(balance, currency)}</p>
        <p className="text-xs text-gray-400">{utilization}% utilized</p>
      </div>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div className="h-2 rounded-full" style={{ width: `${utilization}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

const APDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-1">Accounts Payable</h1>
          <p className="text-sm text-gray-400">Executive Dashboard • Updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 bg-blue-600 rounded text-sm disabled:opacity-50"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      <section>
  <h2 className="text-2xl mb-4">Executive Summary</h2>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-1 bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h4 className="text-sm text-gray-400 mb-1">Total Outstanding Payables</h4>
      <p className="text-4xl text-white font-light mb-4">{formatCurrency(executiveSummary.totalAmountDue)}</p>
      <div className="flex justify-between">
        <div>
          <h5 className="text-xs text-red-400 mb-1">Overdue</h5>
          <p className="text-lg text-white font-light">{formatCurrency(executiveSummary.overdueAmount)}</p>
        </div>
        <div>
          <h5 className="text-xs text-gray-400 mb-1">Current</h5>
          <p className="text-lg text-white font-light">{formatCurrency(executiveSummary.totalAmountDue - executiveSummary.overdueAmount)}</p>
        </div>
      </div>
    </div>
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-green-400">+5.2%</span>
          <span className="text-xs text-gray-400">Cash Position</span>
        </div>
        <p className="text-xl text-white font-light">{formatCurrency(executiveSummary.cashPosition)}</p>
      </div>
      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-sm text-blue-400 mb-1">Working Capital</h4>
        <p className="text-xl text-white font-light">{formatCurrency(executiveSummary.workingCapital)}</p>
        <p className="text-xs text-gray-400 mt-1">Optimal</p>
      </div>
    </div>
    <div className="lg:col-span-1 bg-gray-900 p-5 rounded-xl border border-gray-700">
      <h4 className="text-sm text-amber-400 mb-1">Risk Assessment</h4>
      <p className="text-3xl text-white font-light">{executiveSummary.riskScore}</p>
    </div>
  </div>
</section>

<section>
  <h2 className="text-2xl mb-4">Performance KPIs</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {kpiMetrics.map((kpi, idx) => <KPIBox key={idx} {...kpi} />)}
  </div>
</section>

      <section>
        <h2 className="text-2xl mb-4">Cash Flow Projection</h2>
        <div className="bg-gray-900 rounded-xl p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowProjection}>
              <defs>
                <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="period" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(val) => formatCurrency(val)} />
              <Area type="monotone" dataKey="inflow" stroke="#10b981" fill="url(#inflow)" strokeWidth={2} />
              <Line type="monotone" dataKey="netFlow" stroke="#3b82f6" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-2xl mb-4">Risk Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskAnalysis.map((r, idx) => <RiskCard key={idx} {...r} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl mb-4">Strategic Vendor Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorPortfolio.map((v, idx) => <VendorCard key={idx} {...v} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl mb-4">Treasury Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treasuryOverview.map((t, idx) => <TreasuryCard key={idx} {...t} />)}
        </div>
      </section>
    </div>
  );
};

export default APDashboard;