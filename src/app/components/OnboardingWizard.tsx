import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { StudyProfile } from '../App';

type OnboardingWizardProps = {
  onComplete: (profile: StudyProfile) => void;
};

const STUDY_METHODS = [
  { id: 'visual', label: 'Visual', description: 'Gráficos, diagramas, mapas mentais' },
  { id: 'auditivo', label: 'Auditivo', description: 'Vídeos, podcasts, explicações' },
  { id: 'pratico', label: 'Prático', description: 'Exercícios, simulações, prática' },
  { id: 'leitura', label: 'Leitura/Escrita', description: 'Textos, resumos, anotações' },
] as const;

const COMMON_SUBJECTS = [
  'Matemática',
  'Português',
  'Física',
  'Química',
  'Biologia',
  'História',
  'Geografia',
  'Inglês',
  'Filosofia',
  'Sociologia',
  'Literatura',
  'Redação',
];

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    studyGoal: 'conteudo' as 'prova' | 'conteudo' | 'vestibular',
    subjects: [] as string[],
    weakSubjects: [] as string[],
    preferredStudyMethod: 'visual' as 'visual' | 'auditivo' | 'pratico' | 'leitura',
    availableHoursPerDay: 3,
    deadline: '',
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData as StudyProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleSubject = (subject: string, isWeak: boolean = false) => {
    const key = isWeak ? 'weakSubjects' : 'subjects';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(subject)
        ? prev[key].filter(s => s !== subject)
        : [...prev[key], subject],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.studentName.trim().length > 0;
      case 2: return true;
      case 3: return formData.subjects.length > 0;
      case 4: return formData.weakSubjects.length > 0;
      case 5: return true;
      case 6: return formData.availableHoursPerDay > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Etapa {step} de {totalSteps}</span>
            <span className="text-sm text-indigo-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            {/* Step 1: Nome */}
            {step === 1 && (
              <div>
                <h2 className="text-3xl mb-3 text-gray-900">Como você se chama?</h2>
                <p className="text-gray-600 mb-8">Vamos personalizar sua experiência</p>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Objetivo */}
            {step === 2 && (
              <div>
                <h2 className="text-3xl mb-3 text-gray-900">Qual é seu objetivo?</h2>
                <p className="text-gray-600 mb-8">Isso nos ajuda a criar o melhor cronograma</p>
                <div className="space-y-3">
                  {[
                    { id: 'prova', label: 'Preparar para uma prova específica', icon: '📝' },
                    { id: 'conteudo', label: 'Dominar um conteúdo', icon: '📚' },
                    { id: 'vestibular', label: 'Preparação para vestibular/ENEM', icon: '🎓' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setFormData({ ...formData, studyGoal: goal.id as any })}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                        formData.studyGoal === goal.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl mr-3">{goal.icon}</span>
                      <span className="text-lg text-gray-900">{goal.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Matérias */}
            {step === 3 && (
              <div>
                <h2 className="text-3xl mb-3 text-gray-900">Quais matérias você precisa estudar?</h2>
                <p className="text-gray-600 mb-8">Selecione todas que se aplicam</p>
                <div className="grid grid-cols-2 gap-3">
                  {COMMON_SUBJECTS.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.subjects.includes(subject)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Dificuldades */}
            {step === 4 && (
              <div>
                <h2 className="text-3xl mb-3 text-gray-900">Onde você sente mais dificuldade?</h2>
                <p className="text-gray-600 mb-8">Vamos focar nesses conteúdos no cronograma</p>
                <div className="grid grid-cols-2 gap-3">
                  {formData.subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => toggleSubject(subject, true)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.weakSubjects.includes(subject)
                          ? 'border-red-500 bg-red-50 text-red-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Método de estudo */}
            {step === 5 && (
              <div>
                <h2 className="text-3xl mb-3 text-gray-900">Como você aprende melhor?</h2>
                <p className="text-gray-600 mb-8">Escolha seu estilo de aprendizagem preferido</p>
                <div className="space-y-3">
                  {STUDY_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setFormData({ ...formData, preferredStudyMethod: method.id })}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                        formData.preferredStudyMethod === method.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1 text-gray-900">{method.label}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Tempo disponível */}
            {step === 6 && (
              <div>
                <h2 className="text-3xl mb-3 text-gray-900">Quanto tempo você tem por dia?</h2>
                <p className="text-gray-600 mb-8">Vamos criar sessões de estudo adequadas para TDAH</p>

                <div className="mb-8">
                  <div className="text-center mb-4">
                    <span className="text-5xl text-indigo-600">{formData.availableHoursPerDay}h</span>
                    <span className="text-gray-600 ml-2">por dia</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={formData.availableHoursPerDay}
                    onChange={(e) => setFormData({ ...formData, availableHoursPerDay: parseFloat(e.target.value) })}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1h</span>
                    <span>8h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Prazo final (opcional)</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {step === totalSteps ? 'Criar cronograma' : 'Continuar'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
