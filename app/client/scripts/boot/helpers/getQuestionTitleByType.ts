
import {SubjectType} from "../../../../common/models/questions/common/SubjectType";
const en = {

  TLWhenDidYouShareThisPost: 'When did you share this post?',
  TLWhenDidYouLikeThisPage: 'When did you like this page?',
  ORDPageLike: 'Order these pages in descending order of likes',
  ORDPageLikes: 'Order these pages in descending order of likes',
  ORDPageLikeTime: 'Order these pages after the time you liked them, earliest first',
  ORDPostCommentsNumber: 'Order these posts according to the number of comments they got',
  ORDPostLikesNumber: 'Order these posts according to the number of likes',
  ORDPostTime: 'Order theses posts after the time you posted them',
  MCWhoLikedYourPost: 'Who liked this post you made?',
  MCWhoCommentedOnYourPost: 'Who commented on this post you made?',
  GeoWhatCoordinatesWereYouAt: 'Where were you when you posted this?',
  MCWhichPageDidYouLike: 'Which page did you like?'

};

const titles = {
  en
};

export function getQuestionTitleByType(type: string, lang = 'en') { return titles[lang][type] }
