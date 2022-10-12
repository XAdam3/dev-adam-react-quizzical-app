import React from "react"


export default function StartPage(props){
    function startQuiz() {
        props.setCurrentPage('QuizPage')
       
    }

    return (
        <div className="start-page">
            <h1 className="title">Quizzical</h1>
            <button className="start-btn" onClick={startQuiz}> Start Quiz</button>
        </div>
    )
}
