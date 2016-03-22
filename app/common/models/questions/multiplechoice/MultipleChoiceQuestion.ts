import {RawSubject, Subject} from "./../common/Subject";
import {RawChoice, Choice} from "./Choice";
import {QuestionType} from "./../common/QuestionType";
import {KIND, Kind} from "./../common/Kind";
import {RawQuestion, default as Question} from "../../Question";
import {SubjectFactory} from "./../common/SubjectFactory";


export interface RawMultipleChoiceQuestion extends RawQuestion{
  choices: RawChoice[];
  answer: number;
  userAnswer?: number;
}

export class MultipleChoiceQuestion extends Question {
    
  constructor(
      _id: string | Mongo.ObjectID,
      subject: Subject,
      type: QuestionType,
      kind: Kind,
      answer: number,
      userAnswer: number,
      public choices: Choice[]
  ) 
  {
    super(_id, subject, type, kind,  answer, userAnswer);
  }
  
  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }

    return this.answer;
  }

  static multipleChoiceFromRaw(data: RawMultipleChoiceQuestion) {

    let choices: Choice[] = _.map(data.choices, c =>
        Choice.fromRaw(c)
    );
   
    let subject: Subject = SubjectFactory.fromRaw(data.subject);
    return new MultipleChoiceQuestion(
        data._id,
        subject,
        data.type,
        data.kind,
        data.answer,
        data.userAnswer,
        choices
    );
  }
}