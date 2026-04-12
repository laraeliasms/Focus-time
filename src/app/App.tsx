import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Dashboard } from './components/Dashboard';

export type StudyProfile = {
  studentName: string;
  studyGoal: 'prova' | 'conteudo' | 'vestibular';
  subjects: string[];
  weakSubjects: string[];
  preferredStudyMethod: 'visual' | 'auditivo' | 'pratico' | 'leitura';
  availableHoursPerDay: number;
  deadline?: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'onboarding' | 'dashboard'>('welcome');
  const [studyProfile, setStudyProfile] = useState<StudyProfile | null>(null);

  const handleStart = () => {
    setCurrentScreen('onboarding');
  };

  const handleProfileComplete = (profile: StudyProfile) => {
    setStudyProfile(profile);
    setCurrentScreen('dashboard');
  };

  const handleRestart = () => {
    setStudyProfile(null);
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'onboarding' && <OnboardingWizard onComplete={handleProfileComplete} />}
      {currentScreen === 'dashboard' && studyProfile && (
        <Dashboard profile={studyProfile} onRestart={handleRestart} />
      )}
    </div>
  );
}
