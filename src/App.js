import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"



export default function App(){
    const [currentPage, setCurrentPage] = React.useState("StartPage")
    

    const pages = {
        'StartPage': <StartPage 
                setCurrentPage={setCurrentPage}
               
                                />,
        'QuizPage': <QuizPage 
                setCurrentPage={setCurrentPage} 
              
                                />
    }
    return (
        pages[currentPage]
    )
    }
