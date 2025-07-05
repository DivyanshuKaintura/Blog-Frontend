'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Bell, ChevronDown, Grid, List, MoreHorizontal, Plus, Upload, X, Calendar, Clock, CheckCircle, FileText } from 'lucide-react';
import workspace from '../../../public/dashboardicon.png';
import contract from '../../../public/contract.png';
import draft from '../../../public/draft.png';
import reviewed from '../../../public/reviewed.png';
import translated from '../../../public/translated.png';

import iworkspace from '../../../public/workspace.png';
import iadmin from '../../../public/admin.png';
import ibill from '../../../public/bill.png';
import isettings from '../../../public/setting.png';
import icontact from '../../../public/contractadmin.png';
import signout from '../../../public/signout.png';
import user from '../../../public/user.png';

const Dashboard = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [allTypesOpen, setAllTypesOpen] = useState(false);
    const [allStatusOpen, setAllStatusOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [workspaceData, setWorkspaceData] = useState({
        caseType: 'Criminal',
        complainant: '',
        accused: '',
        victim: '',
        allegations: '',
        factsSummary: '',
        dateOfIncident: '',
        representing: []
    });

    const [workspaces, setWorkspaces] = useState([
        {
            id: 1,
            name: 'Morgan Acquisition',
            client: 'Sarah Chen',
            opponent: 'Chen Sarah',
            case: 'Criminal',
            areaOfLaw: 'Jalandar',
            timeline: 'First hearing done',
            company: 'Johnson & Partners LLP',
            created: 'May 2, 2025',
            lastActive: '2 hours ago',
            documents: 12,
            drafts: 3,
            inReview: 1,
            completed: 0,
            team: ['JR', 'MK', 'RJ']
        }
    ]);

    const stats = [
        {
            title: 'Total Workspaces',
            value: workspaces.length.toString(),
            change: '12% from last month',
            positive: true,
            icon: workspace
        },
        {
            title: 'Total Signed Contracts',
            value: '51',
            change: '12% from last month',
            positive: true,
            icon: contract
        },
        {
            title: 'Contracts Drafted',
            value: '4',
            change: '4% from last month',
            positive: false,
            icon: draft
        },
        {
            title: 'Contracts Reviewed',
            value: '18',
            change: '12% from last month',
            positive: true,
            icon: reviewed
        },
        {
            title: 'Contracts Translated',
            value: '9',
            change: '10% from last month',
            positive: true,
            icon: translated
        }
    ];

    const sidebarItems = [
        { icon: iworkspace, label: 'Workspaces', active: true },
        { icon: iadmin, label: 'Team Management', active: false },
        { icon: ibill, label: 'Billings & Plans', active: false },
        { icon: isettings, label: 'Settings', active: false },
        { icon: icontact, label: 'Contact Admin', active: false }
    ];

    const handleCreateWorkspace = () => {
        setShowCreateModal(true);
        setModalStep(1);
    };

    const handleFileUpload = (file) => {
        // Simulate file processing
        console.log('File uploaded:', file);
    };

    const handleRunSummariser = () => {
        setModalStep(2);
    };

    const handleSaveDetails = () => {
        const newWorkspace = {
            id: workspaces.length + 1,
            name: 'Johnson & Partners Merger',
            client: workspaceData.complainant,
            opponent: workspaceData.accused,
            case: workspaceData.caseType,
            areaOfLaw: 'Criminal Law',
            timeline: 'Case filed',
            company: 'Johnson & Partners LLP',
            created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            lastActive: 'Just now',
            documents: 12,
            drafts: 3,
            inReview: 1,
            completed: 0,
            team: ['JR', 'MK', 'RJ']
        };

        setWorkspaces([...workspaces, newWorkspace]);
        setShowCreateModal(false);
        setModalStep(1);
        setWorkspaceData({
            caseType: 'Criminal',
            complainant: '',
            accused: '',
            victim: '',
            allegations: '',
            factsSummary: '',
            dateOfIncident: '',
            representing: []
        });
    };

    const handleGoBack = () => {
        if (modalStep === 2) {
            setModalStep(1);
        } else {
            setShowCreateModal(false);
        }
    };

    const toggleRepresenting = (person) => {
        setWorkspaceData(prev => ({
            ...prev,
            representing: prev.representing.includes(person)
                ? prev.representing.filter(p => p !== person)
                : [...prev.representing, person]
        }));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-slate-800 text-white flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-2xl font-bold">LeXi Ai</h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${item.active
                                ? 'bg-slate-700 text-white'
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {/* <span className="mr-3">{item.icon}</span> */}
                            <Image src={item.icon} alt='icon' className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="p-4">
                    <button className="flex items-center text-slate-300 hover:text-white">
                        <Image src={signout} alt='' className="w-5 h-5 mr-2" />
                        <span className="text-sm">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <Image src={user} alt='user' className="w-8 h-8 rounded-full" />
                                <span className="text-sm font-medium text-gray-700">John Doe</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                                        {/* <span className="text-2xl">{stat.icon}</span> */}
                                        <Image src={stat.icon} alt="icon" className="w-6 h-6" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className={`text-sm flex items-center ${stat.positive ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                        <span className="mr-1">{stat.positive ? '▲' : '▼'}</span>
                                        {stat.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Workspaces</h2>

                        <div className="flex space-x-6 mb-6">
                            <button className="pb-2 text-gray-600 hover:text-gray-900">
                                Contracts
                            </button>
                            <button className="pb-2 text-gray-900 border-b-2 border-gray-900 font-medium">
                                Litigation
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search by Workspace Name / Client Name"
                                        className="pl-10 pr-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                                    />
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => setAllTypesOpen(!allTypesOpen)}
                                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                    >
                                        <span className="text-sm text-gray-700 mr-2">All Types</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => setAllStatusOpen(!allStatusOpen)}
                                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                    >
                                        <span className="text-sm text-gray-700 mr-2">All Status</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleCreateWorkspace}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create New Workspace
                                </button>

                                <div className="flex border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`flex items-center gap-2 px-3 py-2 ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                        <span className="text-sm">Grid</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`flex items-center gap-2 px-3 py-2 ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <List className="w-4 h-4" />
                                        <span className="text-sm">List</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Workspace Display */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {workspaces.map((workspace) => (
                                    <div key={workspace.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {workspace.case}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900 mt-2">{workspace.name}</h3>
                                                <p className="text-sm text-gray-600">{workspace.company}</p>
                                            </div>
                                            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Created: {workspace.created}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Clock className="w-4 h-4 mr-2" />
                                                <span>Last active: {workspace.lastActive}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                <span>{workspace.documents} documents processed</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                                            <span>{workspace.drafts} Drafts</span>
                                            <span>{workspace.inReview} In Review</span>
                                            <span>{workspace.completed} Completed</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {workspace.team.map((member, index) => (
                                                    <div key={index} className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                                                        {member}
                                                    </div>
                                                ))}
                                                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                                                    +2
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                                                    Open →
                                                </button>
                                                <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                                        <Plus className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Upgrade to add more litigation cases to the workspace
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Workspace Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Client
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Opponent
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Case
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Area of Law
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Timeline
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {workspaces.map((workspace) => (
                                            <tr key={workspace.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {workspace.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {workspace.client}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {workspace.opponent}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                        {workspace.case}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {workspace.areaOfLaw}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {workspace.timeline}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                    <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="bg-slate-800 text-white p-4 flex items-center justify-center">
                                    <Upload className="w-5 h-5 mr-2" />
                                    <span className="text-sm">Upgrade to add more litigation cases to the workspace</span>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Create Workspace Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Case Details</h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {modalStep === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload the case files
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Drag and drop your document<br />
                                            or click to browse files
                                        </p>
                                        <div className="flex items-center justify-center text-xs text-gray-500">
                                            <FileText className="w-4 h-4 mr-1" />
                                            PDF (max. 20 MB)
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center text-sm text-gray-500 my-4">or</div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Add case facts manually
                                    </label>
                                    <textarea
                                        placeholder="Enter case description"
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        rows="4"
                                    />
                                </div>

                                <button
                                    onClick={handleRunSummariser}
                                    className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                                >
                                    Run AI Summariser
                                </button>
                            </div>
                        )}

                        {modalStep === 2 && (
                            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Case Type</label>
                                    <select
                                        value={workspaceData.caseType}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, caseType: e.target.value })}
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Criminal">Criminal</option>
                                        <option value="Civil">Civil</option>
                                        <option value="Family">Family</option>
                                        <option value="Corporate">Corporate</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Complainant</label>
                                    <input
                                        type="text"
                                        value={workspaceData.complainant}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, complainant: e.target.value })}
                                        placeholder="Seema Batra, Mukesh Kumar"
                                        className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Accused</label>
                                    <input
                                        type="text"
                                        value={workspaceData.accused}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, accused: e.target.value })}
                                        placeholder="Ajay Kumar, Raj Rani"
                                        className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Victim</label>
                                    <input
                                        type="text"
                                        value={workspaceData.victim}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, victim: e.target.value })}
                                        placeholder="Neha Kumari"
                                        className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Allegations</label>
                                    <textarea
                                        value={workspaceData.allegations}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, allegations: e.target.value })}
                                        placeholder="Dowry harassment, domestic violence, and abetment to suicide (304B, 498A, DP Act)"
                                        className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        rows="3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Facts Summary</label>
                                    <textarea
                                        value={workspaceData.factsSummary}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, factsSummary: e.target.value })}
                                        placeholder="Neha Kumari found hanging from ceiling fan, with evidence suggesting possible foul play amid dowry harassment allegations"
                                        className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        rows="2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Incident</label>
                                    <input
                                        type="date"
                                        value={workspaceData.dateOfIncident}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, dateOfIncident: e.target.value })}
                                        className="w-full px-3 text-gray-700 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Representing (please select)*</label>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => toggleRepresenting('Neha Kumari')}
                                            className={`px-3 py-1 rounded-full text-sm ${workspaceData.representing.includes('Neha Kumari')
                                                ? 'bg-slate-800 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            Neha Kumari
                                        </button>
                                        <button
                                            onClick={() => toggleRepresenting('Ajay Kumar, Raj Rani')}
                                            className={`px-3 py-1 rounded-full text-sm ${workspaceData.representing.includes('Ajay Kumar, Raj Rani')
                                                ? 'bg-slate-800 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            Ajay Kumar, Raj Rani
                                        </button>
                                    </div>
                                </div>

                                <div className="flex space-x-3 pt-4 sticky bottom-0 bg-white">
                                    <button
                                        onClick={handleGoBack}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        onClick={handleSaveDetails}
                                        className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                                    >
                                        Save Details
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;