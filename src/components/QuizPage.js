import React from "react"
import Questions from "./Questions"
import { nanoid } from "nanoid"

export default function QuizPage(props) {

    const [questions, setQuestions] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])
    const [showResults, setShowResults] = React.useState(false)
 

    

    React.useEffect(() => {
        getQuestions()
            .then(data => {
                return setQuestions(data.results.map(item => {
    
                    return { ...item, id: nanoid() }
                }))
            })
    }, [])

    async function getQuestions() {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        const data = await response.json()
        return data
    }

    function chooseAnswer(questionId, value, correctAnswer) {
        const savedAnswer = userAnswers.find(item => item.questionId === questionId)
        setUserAnswers(prevAnswers => {
            return (savedAnswer) ?
                prevAnswers.map(item => {
                    return item.questionId === questionId ?
                        { ...item, chosenAnswer: value } : item
                }) :
                [...prevAnswers, { questionId: questionId, correctAnswer: correctAnswer, chosenAnswer: value }]
        })
    }

    const questionsElements = questions.map(item => {
        const chosen = userAnswers.find(answers => answers.questionId === item.id)
        return <Questions
            key={item.id}
            userChoice={chosen && chosen.chosenAnswer}
            handleClick={chooseAnswer}
            showResults={showResults}
            {...item} />
    })

    function checkAnswers() {
        setShowResults(prevState => !prevState)
    }

    function endQuiz() {
        props.setCurrentPage("StartPage")
    }

    function correctAnswers() {
        const correct = userAnswers.filter(item => item.correctAnswer === item.chosenAnswer)
        return correct.length
    }
    return (
        <div className="quiz-page">
            {questionsElements}
            <div className="q-and-a-container">
                {!showResults? <button className="check-btn" onClick={checkAnswers}>Check Answers</button>
                :<div className="results">
                    <h3>You scored {correctAnswers()} out of 5 </h3>
                    <button onClick={endQuiz}>Play again</button>
                </div>}
            </div>
        </div>
    )
}