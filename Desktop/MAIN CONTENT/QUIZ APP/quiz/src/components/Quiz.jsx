import { useState } from "react";

//set of questions, options and correct answers 
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
  {
    question: "Which language is used for web development?",
    options: ["Java", "Python", "JavaScript", "C#"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
];
//function to display questions and answers
function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
  };

  //UI for QUIZ APP
  return (
    <div className="container mx-auto p-4 max-w-xl">
      {!showResults ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
          <div className="space-y-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
          <p className="mb-4">
            Your score: {calculateScore()} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default Quiz;