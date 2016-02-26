
import { Answer } from "./AnswerVerificationService";
import { MultipleChoiceQuestion } from "../../../common/models/questions/MultipleChoiceQuestion";

export class MultipleChoiceData {
    /**
     * @constructor
     * @param {number} choice
     */
    constructor(public choice: number) {
    }
}

/**
 * @extends {Answer}
 */
export class MultipleChoiceAnswer extends Answer {
    /**
     * @constructor
     * @param {MultipleChoiceData} data
     */
    constructor(public data: MultipleChoiceData) {
      super();
    }

}

export const MultipleChoiceVerificationService = {

    /**
     *
     * @param {MultipleChoiceQuestion} question
     * @param {MultipleChoiceAnswer} answer
     * @returns {number}
     */
    verifyAnswer(question: MultipleChoiceQuestion, answer: MultipleChoiceAnswer) {
        return question.getAnswer() === answer.data.choice ? 1 : 0;
    }

};
