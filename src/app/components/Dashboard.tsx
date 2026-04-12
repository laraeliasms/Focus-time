import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react';
import type { StudyProfile } from '../App';
import { ScheduleView } from './ScheduleView';
import { PracticeView } from './PracticeView';
import { ProgressView } from './ProgressView';

type DashboardProps = {
  profile: StudyProfile;
  onRestart: () => void;
};

type TabType = 'schedule' | 'practice' | 'progress';

export function Dashboard({ profile, onRestart }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');

  const tabs = [
    { id: 'schedule' as TabType, label: 'Cronograma', icon: Calendar },
    { id: 'practice' as TabType, label: 'Praticar', icon: BookOpen },
    { id: 'progress' as TabType, label: 'Progresso', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900">Olá, {profile.studentName}! 👋</h1>
              <p className="text-gray-600">Pronto para focar nos estudos?</p>
            </div>
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors relative ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'schedule' && <ScheduleView profile={profile} />}
          {activeTab === 'practice' && <PracticeView profile={profile} />}
          {activeTab === 'progress' && <ProgressView profile={profile} />}
        </motion.div>
      </main>
    </div>
  );
}
