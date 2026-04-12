import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import type { StudyProfile } from '../App';

type PracticeViewProps = {
  profile: StudyProfile;
};

type Question = {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export function PracticeView({ profile }: PracticeViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Gera questões baseadas nas matérias fracas
  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];

    profile.weakSubjects.forEach((subject) => {
      // Questões de exemplo - em produção viriam do backend/IA
      if (subject === 'Matemática') {
        questions.push({
          id: 'math-1',
          subject: 'Matemática',
          question: 'Qual é o resultado de 2x + 5 = 13?',
          options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
          correctAnswer: 1,
          explanation: 'Subtraindo 5 de ambos os lados: 2x = 8. Dividindo por 2: x = 4',
          difficulty: 'easy',
        });
      }

      if (subject === 'Português') {
        questions.push({
          id: 'port-1',
          subject: 'Português',
          question: 'Qual alternativa apresenta um exemplo de metonímia?',
          options: [
            'Aquele rapaz é um leão',
            'Li Machado de Assis ontem',
            'A lua chorava no céu',
            'Seus olhos eram duas estrelas'
          ],
          correctAnswer: 1,
          explanation: 'Metonímia é a substituição de um termo por outro relacionado. "Ler Machado de Assis" significa ler obras escritas por ele.',
          difficulty: 'medium',
        });
      }

      if (subject === 'Física') {
        questions.push({
          id: 'fis-1',
          subject: 'Física',
          question: 'Um objeto em queda livre possui aceleração de quantos m/s²?',
          options: ['5 m/s²', '8 m/s²', '10 m/s²', '12 m/s²'],
          correctAnswer: 2,
          explanation: 'Na superfície da Terra, a aceleração da gravidade é aproximadamente 10 m/s²',
          difficulty: 'easy',
        });
      }

      if (subject === 'Química') {
        questions.push({
          id: 'qui-1',
          subject: 'Química',
          question: 'Qual é a fórmula molecular da água?',
          options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
          correctAnswer: 0,
          explanation: 'A água é composta por 2 átomos de hidrogênio (H) e 1 átomo de oxigênio (O)',
          difficulty: 'easy',
        });
      }
    });

    // Adiciona questões genéricas se necessário
    if (questions.length === 0) {
      questions.push({
        id: 'gen-1',
        subject: 'Geral',
        question: 'Qual a melhor forma de organizar seu tempo de estudo com TDAH?',
        options: [
          'Estudar 4 horas seguidas',
          'Sessões curtas de 25 minutos com pausas',
          'Estudar apenas quando sentir vontade',
          'Estudar a noite toda antes da prova'
        ],
        correctAnswer: 1,
        explanation: 'Sessões curtas (Pomodoro) são ideais para manter o foco com TDAH, permitindo pausas regulares para descanso mental.',
        difficulty: 'easy',
      });
    }

    return questions;
  };

  const questions = generateQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isFinished = currentQuestionIndex === questions.length - 1 && showResult;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl mb-1 text-gray-900">Pratique e aprenda</h2>
            <p className="text-gray-600">
              Questões focadas em {profile.weakSubjects.join(', ')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl text-indigo-600">{score.correct}/{score.total}</div>
            <div className="text-sm text-gray-600">Acertos</div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all ${
                index < currentQuestionIndex
                  ? 'bg-green-500'
                  : index === currentQuestionIndex
                  ? 'bg-indigo-600'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm">
                  {currentQuestion.subject}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </span>
              </div>

              <h3 className="text-2xl mb-8 text-gray-900">{currentQuestion.question}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === currentQuestion.correctAnswer;

                  let className = 'w-full p-5 rounded-2xl border-2 text-left transition-all ';

                  if (!showResult) {
                    className += isSelected
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300';
                  } else {
                    if (isCorrectAnswer) {
                      className += 'border-green-500 bg-green-50';
                    } else if (isSelected && !isCorrect) {
                      className += 'border-red-500 bg-red-50';
                    } else {
                      className += 'border-gray-200 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={className}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          showResult && isCorrectAnswer
                            ? 'bg-green-500 text-white'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900">{option}</span>
                        {showResult && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`rounded-2xl p-6 mb-6 ${
                  isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                }`}
              >
                <div className="flex gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className={`text-lg mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                      {isCorrect ? 'Correto!' : 'Não foi dessa vez'}
                    </h4>
                    <p className={isCorrect ? 'text-green-800' : 'text-red-800'}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            {showResult && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleNext}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Próxima questão' : 'Ver resultado'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl mb-3 text-gray-900">Parabéns!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Você acertou {score.correct} de {score.total} questões
              ({Math.round((score.correct / score.total) * 100)}%)
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Praticar novamente
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
