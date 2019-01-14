import React, { Component } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRST';

const Answer = ({ title, answer, solution, remove, check, update, index }) => (
    <div>
        <span>{title}</span>
        <button onClick={remove}>-</button>
        <button onClick={check}>✔</button>
        <input name="answer" onChange={update(index)} />
    </div>
)

class MultipleChoice extends Component {
    state = {
        question: '',
        image: '',
        audio: '',
        answers: [],
        solution: 0,
    }

    onUpdate = (index) => (e) => {
        this.setState(({answers}) => ({
            answers: answers.map()
        }))
    }

    render() {
        const { title, submit } = this.props;
        const { image, audio, question, answers, solution } = this.state;

        return (
            <div>
                <div>{title}</div>
                <input name="question" value={question} />
                {
                    image && <img src={image} alt="" />
                }
                {
                    audio && (
                        <audio>
                            <source src={audio} />
                        </audio>
                    )
                }
                {
                    answers.map((answer, index) => <Answer title={alphabet[index]} answer={answer} solution={solution} index={index} /> )
                }
            </div>
        );
    }
}

export default MultipleChoice;
