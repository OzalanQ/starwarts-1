
import React, { useState, useEffect, useMemo } from 'react';
import { Character, TriviaQuestion } from '../types';
import { TRIVIA_QUESTIONS } from '../constants';
import { Book, Brain, Coins, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizRoomProps {
  character: Character;
  onComplete: (goldChange: number, questionSignature?: string) => void;
}

export const QuizRoom: React.FC<QuizRoomProps> = ({ character, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'intro' | 'loading' | 'question' | 'result' | 'victory'>('intro');
  const [resultMessage, setResultMessage] = useState('');
  const [streak, setStreak] = useState(0);
  const [error, setError] = useState('');

  // Filter out questions that have already been answered correctly
  const availableQuestions = useMemo(() => {
    return TRIVIA_QUESTIONS.filter(q => !character.solvedQuestions.includes(q.question));
  }, [character.solvedQuestions]);

  const fetchQuestion = () => {
    setGameState('loading');
    setError('');
    
    setTimeout(() => {
        if (availableQuestions.length === 0) {
            setGameState('victory');
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const nextQuestion = availableQuestions[randomIndex];
        
        setCurrentQuestion(nextQuestion);
        setGameState('question');
    }, 800); // Artificial delay for suspense
  };

  const startQuiz = () => {
    if (character.gold < 100) return;
    if (availableQuestions.length === 0) {
        setGameState('victory');
        return;
    }
    onComplete(-100); // Initial fee
    setIsPlaying(true);
    setStreak(0);
    fetchQuestion();
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    setTimeout(() => {
      if (isCorrect) {
        // Reward + Save Question Signature
        onComplete(100, currentQuestion.question);
        setStreak(prev => prev + 1);
        setResultMessage("Correct! +100 Galleons");
        setSelectedOption(null);
        // We need to wait for the state to update before fetching next, but since we use a filtered list
        // derived from props/state in the parent, we can just fetch again. 
        // Note: The 'availableQuestions' memo updates when parent passes down new prop.
        // However, inside this component instance, we might need to ensure we pick a DIFFERENT one 
        // if the prop update is slow. But since we re-render on prop change, it should handle it.
        setTimeout(() => {
            fetchQuestion();
        }, 1500);
      } else {
        onComplete(-100); // Penalty
        setResultMessage("Incorrect! -100 Galleons");
        setGameState('result');
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setIsPlaying(false);
    setGameState('intro');
    setStreak(0);
    setCurrentQuestion(null);
    setSelectedOption(null);
  };

  if (gameState === 'victory') {
    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-[#f5e6d3] text-slate-900 rounded-sm border-8 double border-[#4a3b2a] p-12 text-center texture-parchment"
            >
                <CheckCircle className="w-24 h-24 mx-auto text-green-600 mb-6" />
                <h2 className="text-4xl font-magic text-[#4a3b2a] mb-4">Master of Riddles</h2>
                <p className="text-xl font-serif text-[#5c4033] mb-8">
                    You have solved every riddle in the archives. There is nothing left to teach you here.
                </p>
                 <button
                    onClick={resetQuiz}
                    className="font-magic text-xl px-8 py-3 rounded bg-[#8b5a2b] hover:bg-[#6b4423] text-[#f5e6d3] shadow-lg transition-all"
                >
                    Return to Common Room
                </button>
            </motion.div>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#f5e6d3] text-slate-900 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] border-8 double border-[#4a3b2a] p-8 md:p-12 min-h-[600px] flex flex-col items-center overflow-hidden texture-parchment"
      >
        {/* Book Binding Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#2a1b0a] to-transparent opacity-20"></div>
        <div className="absolute inset-0 pointer-events-none border-[1px] border-[#8b5a2b]/30 m-4"></div>
        
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
          
          {gameState === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <Book className="w-24 h-24 mx-auto text-[#8b5a2b] drop-shadow-md" />
              <h2 className="text-5xl font-magic text-[#4a3b2a] border-b-2 border-[#8b5a2b]/20 pb-4">The Riddles of Wisdom</h2>
              
              <p className="text-xl font-serif text-[#5c4033] italic leading-relaxed">
                "Wit beyond measure is man's greatest treasure."
              </p>
              
              <div className="bg-[#e6d5bc] p-6 rounded border border-[#c4a484] shadow-inner text-[#4a3b2a] font-serif">
                <h3 className="font-bold text-lg mb-2 uppercase tracking-widest">Rules of the Trial</h3>
                <ul className="text-left space-y-2 list-disc list-inside">
                    <li>Entry Fee: <span className="font-bold text-[#b8860b]">100 Galleons</span></li>
                    <li>Correct Answer: <span className="font-bold text-green-700">Win 100 Galleons</span> & Continue</li>
                    <li>Wrong Answer: <span className="font-bold text-red-700">Lose 100 Galleons</span> & Game Over</li>
                    <li><span className="italic text-sm font-bold">Solved riddles will never appear again.</span></li>
                    <li><span className="text-sm text-[#5c4033]">{availableQuestions.length} Riddles remaining unproven.</span></li>
                </ul>
              </div>

              <div className="pt-4">
                {error && <p className="text-red-600 mb-4 font-bold">{error}</p>}
                
                <button
                    onClick={startQuiz}
                    disabled={character.gold < 100}
                    className={`
                        font-magic text-2xl px-12 py-4 rounded shadow-[0_4px_0_rgb(74,59,42)] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-3 mx-auto text-[#f5e6d3]
                        ${character.gold >= 100 
                            ? 'bg-[#8b5a2b] hover:bg-[#6b4423]' 
                            : 'bg-gray-500 cursor-not-allowed'}
                    `}
                >
                    <Brain className="w-6 h-6" />
                    Begin Trial (-100 G)
                </button>
                {character.gold < 100 && <p className="text-red-600 mt-2 font-serif">Insufficient funds. Use the password vault in your Common Room.</p>}
              </div>
            </motion.div>
          )}

          {gameState === 'loading' && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center space-y-6 py-20"
             >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                    <Loader2 className="w-16 h-16 text-[#8b5a2b]" />
                </motion.div>
                <p className="text-xl font-magic text-[#5c4033] animate-pulse">Deciphering Ancient Runes...</p>
             </motion.div>
          )}

          {gameState === 'question' && currentQuestion !== null && (
            <motion.div
                key={currentQuestion.question} // Force re-render on new question
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
            >
                <div className="flex justify-between items-center mb-8 text-[#8b5a2b] font-bold font-serif border-b border-[#8b5a2b]/20 pb-2">
                    <span>Streak: {streak}</span>
                    <span className="flex items-center gap-2"><Coins className="w-4 h-4" /> +{streak * 100} G Earned</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2a1b0a] mb-8 leading-snug min-h-[100px] flex items-center justify-center">
                    {currentQuestion.question}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option, idx) => {
                        let btnClass = "bg-[#e6d5bc] hover:bg-[#d4c3aa] text-[#4a3b2a] border-[#c4a484]";
                        if (selectedOption !== null) {
                            if (idx === currentQuestion.correctAnswer) {
                                btnClass = "bg-green-200 border-green-400 text-green-900";
                            } else if (idx === selectedOption) {
                                btnClass = "bg-red-200 border-red-400 text-red-900";
                            } else {
                                btnClass = "opacity-50 bg-[#e6d5bc] text-[#4a3b2a] border-[#c4a484]";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={selectedOption !== null}
                                className={`p-4 rounded border-2 text-lg font-serif font-medium transition-all transform hover:scale-[1.01] active:scale-[0.99] ${btnClass}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
                
                {resultMessage && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 text-xl font-bold font-magic ${resultMessage.includes('Correct') ? 'text-green-700' : 'text-red-700'}`}
                    >
                        {resultMessage}
                    </motion.div>
                )}
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
            >
                <AlertCircle className="w-20 h-20 mx-auto text-red-600" />
                <h2 className="text-4xl font-magic text-[#2a1b0a]">Trial Failed</h2>
                <div className="bg-[#e6d5bc] p-6 rounded border border-[#c4a484] shadow-inner">
                    <p className="text-xl font-serif text-[#4a3b2a] mb-2">The correct answer was:</p>
                    <p className="text-2xl font-bold text-[#2a1b0a] mb-4">
                        {currentQuestion && currentQuestion.options[currentQuestion.correctAnswer]}
                    </p>
                    <div className="border-t border-[#c4a484] pt-4 mt-4 flex justify-between items-center text-[#5c4033]">
                        <span>Total Streak:</span>
                        <span className="font-bold text-2xl">{streak}</span>
                    </div>
                     <div className="flex justify-between items-center text-[#5c4033] mt-2">
                        <span>Net Winnings:</span>
                        <span className={`font-bold text-xl ${(streak * 100 - 200) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {(streak * 100) - 100} G
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-2">(Including entry fee and penalties)</p>
                </div>

                <button
                    onClick={resetQuiz}
                    className="font-magic text-xl px-8 py-3 rounded bg-[#8b5a2b] hover:bg-[#6b4423] text-[#f5e6d3] shadow-lg transition-all"
                >
                    Close Tome
                </button>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
