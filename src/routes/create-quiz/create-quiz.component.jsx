import  { useState } from 'react';
import './create-quiz.styles.scss';

const UploadQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([{ 
    text: '', 
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  }]);
  const [submitted, setSubmitted] = useState(false);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuestionTextChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      text: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({
      text: '',
      isCorrect: false
    });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[questionIndex].options;
    
    if (currentOptions.length > 2) {
      currentOptions.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleOptionTextChange = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    
    // Reset all options for this question to false
    updatedQuestions[questionIndex].options.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });
    
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    
    const quizData = {
      name: quizName,
      questions: questions.map(q => ({
        text: q.text,
        options: q.options
      }))
    };
    
    console.log('Quiz submitted:', quizData);
    setSubmitted(true);
  };

  const resetForm = () => {
    setQuizName('');
    setQuestions([{ 
      text: '', 
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    }]);
    setSubmitted(false);
  };

  const isFormValid = () => {
    if (!quizName.trim()) return false;
    
    return questions.every(question => {
      if (!question.text.trim()) return false;
      
      if (!question.options.every(option => option.text.trim())) return false;
      
      if (!question.options.some(option => option.isCorrect)) return false;
      
      return true;
    });
  };

  if (submitted) {
    return (
      <div className="quiz-container success-container">
        <h2 className="success-heading">Quiz Successfully Created!</h2>
        <p className="success-message">Your quiz {quizName} with {questions.length} questions has been uploaded.</p>
        <button 
          onClick={resetForm}
          className="btn btn-primary"
        >
          Create Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2 className="main-heading">Create New Quiz</h2>
      
      <form onSubmit={handleSubmitQuiz} className="quiz-form">
        <div className="form-group">
          <label className="form-label">Quiz Name</label>
          <input
            type="text"
            value={quizName}
            onChange={handleQuizNameChange}
            className="form-input c-input"
            required
          />
        </div>
        
        <div className="questions-section">
          <div className="section-header">
            <h3>Questions</h3>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="btn btn-add"
              disabled={questions.length>=11}
            >
              + Add Question
            </button>
          </div>
          
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-card">
              <div className="question-header">
                <h4>Question {questionIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  className="btn btn-remove"
                  disabled={questions.length <= 1}
                >
                  Remove
                </button>
              </div>
              
              <div className="form-group">
                <label className="form-label">Question Text</label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="options-container">
                <div className="section-header">
                  <h5>Options</h5>
                  <button
                    type="button"
                    onClick={() => handleAddOption(questionIndex)}
                    className="btn btn-add-small"
                  >
                    + Add Option
                  </button>
                </div>
                
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-row">
                    <input
                      type="radio"
                      name={`correct-${questionIndex}`}
                      checked={option.isCorrect}
                      onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                      className="radio-input"
                      required
                    />
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option.text}
                      onChange={(e) => handleOptionTextChange(questionIndex, optionIndex, e.target.value)}
                      className="form-input option-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                      className="btn btn-remove-small"
                      disabled={question.options.length <= 2}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <p className="helper-text">Select the radio button for the correct option</p>
              </div>
            </div>
          ))}
          
          <button
            type="submit"
            className="btn btn-submit"
            disabled={!isFormValid()}
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadQuiz;