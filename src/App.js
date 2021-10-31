import React, {useState, useEffect} from 'react';
import "./App.css"

function App() {
  const [formState, setFormState] = useState({});
  const [questionList, setQuestionList] = useState([])
  const [count, setCount] = useState(0)
  const [showAnswers, setShowAnswers] = useState(false)
  const [options, setOptions] = useState([
    {name: 'option1', },
    {name: 'option2', },
    {name: 'option3', },
  ])
  const [chosenList, setChosenList] = useState([]);



const addOption = () => {
  setOptions([...options, {name: `option${options.length + 1}`}])
  console.log(options);
}

const chosenOption = () => {
   let randomNumber = Math.floor(Math.random() * options.length);
   let newList = options.map((option, index) => {
     if (index === randomNumber) {
       return {
         value: formState[option.name], chosen: true
       } 
     }
     else {
      return {
        value: formState[option.name], chosen: false
      }
     }
   })
   setChosenList(newList)
   console.log(chosenList);
}

const handleSubmit = (e) => {
  e.preventDefault();
  chosenOption()
  setQuestionList([...questionList, formState["question"]])
  if (!localStorage.getItem("questions")) {
    localStorage.setItem("questions", JSON.stringify(questionList))
  }
  else {
    localStorage.clear()
    localStorage.setItem("questions", JSON.stringify(questionList))
  }
  questionCount(formState.question)
  setShowAnswers(true)

}

const questionCount = (question) => {
   let count = 0
   questionList.forEach(item => {
     if (question.toLowerCase() === item.toLowerCase()) {
       count+= 1
     }
   })
   setCount(count)
}

useEffect(() => {
   let questions = JSON.parse(localStorage.getItem("questions"))
   if (questions) {
    setQuestionList(questions)
   }
  
},[])

  return (
    <div className="App">
       <form onSubmit={handleSubmit}>
         <h2>Question</h2>
         <input type="text" name="question" id="" placeholder="Q: Enter your question here" value={formState.question}
          onChange={
            (e) => setFormState(
           {
            ...formState,
            [e.target.name] : e.target.value
           }
            )
              } />

              <h2>Options</h2>
              {
                options.map((option, index) => {
                  return (
                    <input key={index} type="text" name={option.name} id=""
                     placeholder={option.name}
                     value={formState[option.name]}
                    onChange={
                      (e) => setFormState(
                     {
                      ...formState,
                      [e.target.name] : e.target.value
                     }
                      )
                        } />
                
                  )
                })
              }
            <div className="actions">
              <button type="button" onClick={addOption}>Add Option</button>
              <button type="submit">Answer</button>
            </div>
  
       </form>
       <div className={`answers ${showAnswers ? "in" : "out"}`}>
         <h1>{formState["question"]}?</h1>
         <span>
           This question has been asked {count} times
           </span>
           {
             chosenList.map((item, index) => {
               return (
                 <p key={index} className={item.chosen ? "chosen" : "not-chosen"}>
                   {
                     item.value
                   }
                 </p>
               )
             })
           }
           <button onClick={() => {
             setFormState({})
             setShowAnswers(false)
             window.location.reload()
           }}>Ask another question</button>
       </div>
    </div>
  );
}

export default App;
