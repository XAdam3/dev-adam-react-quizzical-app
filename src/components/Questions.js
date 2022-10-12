import React from "react"
import { nanoid } from "nanoid"

export default function Questions(props) {
    const choicesArray = props.incorrect_answers.concat(props.correct_answer).sort()

    function setHtml(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    function setClasses(item) {
        let classes = []
        if (item === props.userChoice)
            classes.push("chosen-answer")

        if (props.showResults) {
            classes.push("disabled")
            if (item === props.correct_answer)
                classes.push("green")
            if (item === props.userChoice && props.incorrect_answers.includes(item))
                classes.push("red")
        }
        return classes.join(" ")
    }

    const choiceElements = choicesArray.map(item => {
        return <div
            key={nanoid()}
            className={`choice ${setClasses(item)}`}
            onClick={() => { props.handleClick(props.id, item, props.correct_answer) }}>{setHtml(item)}</div>
    })

    return (
        <div className="question-container">
            <h3 className="question-title">{setHtml(props.question)}</h3>
            <div className="choices-container">
                {choiceElements}
            </div>
        </div>
    )
}