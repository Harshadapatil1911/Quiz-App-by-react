import React from "react";
import { useGlobalContext } from "../context";

const QuizForm = ()=>{
    const{quiz,handleChange,handleSubmit,error} = useGlobalContext();
    return(
        <section className="quiz quiz-small">
            <form>
                <h2 style={{marginBottom:"2rem"}}>Let's Start Quiz</h2>
                <div className="mb-3">
                    <label for ="noOfQuestion" className="form-label">Number of Quetions</label>
                    <input 
                    type="number"
                    name="amount"
                    className="form-control"
                    value={quiz.amount}
                    onChange={handleChange}
                    min={1}
                    max={50}
                    style={{width:"400px"}}
                    />
                </div>
                <div className="mb-3">
                    <label for ="category" className="form-label">Category</label>
                    <select 
                    className="form-select"
                    name="category"
                    id="category"
                    value={quiz.category}
                    onChange={handleChange}>
                    <option value="sports">Sports</option>
                    <option value="history">History</option>
                    <option value="politics">Politics</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for ="difficulty" className="form-label">Difficulty</label>
                    <select 
                    className="form-select"
                    name="difficulty"
                    id="difficulty"
                    value={quiz.difficulty}
                    onChange={handleChange}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                    </select>
                </div>
                {error && (
                        <p className="error">
                            Cant't generate Questions,please try another option
                        </p>
                    )}
                    <button type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary start-btn">Start</button>
               
            </form>
        </section>
    );
};
export default QuizForm;