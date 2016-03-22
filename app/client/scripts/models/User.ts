import {Services, FacebookService} from "../../../server/MeteorUser";
import {TrainingStatus} from "./TrainingStatus";
import {Routes} from "../../../common/Routes";

interface RawUser {
  _id: Mongo.ObjectID | string;
  fb: FacebookService;
  services : Services;


}

export class User {

  constructor(public _id: Mongo.ObjectID,
              public fb: FacebookService,
              public username: string,
              public services: Services,
              public status: TrainingStatus = TrainingStatus.NotStarted,
              public firstTime: boolean = true
              
  
  ) {
  }


  get facebookId() {
    return this.fb.id;
  }

  get firstName() {
    return this.fb.first_name;
  }

  get lastName() {
    return this.fb.last_name;
  }

  get name() {
    return this.fb.name;
  }

  get gender() {
    return this.fb.gender;
  }

  get email() {
    return this.fb.email;
  }

  get locale() {
    return this.fb.locale;
  }
  
  isBot() {
    return this.username && (this.username == 'bot1' || this.username == 'bot2');
  }

  getAvatarUrl() {

    if (this.isBot()) {
      return Routes.Assets.at('images/bot-avatar.png');
    }

    if (this.facebookId != null) {
      return Routes.Facebook.avatar(this.facebookId);
    }

    return Routes.Assets.at('images/avatar-default.png');
  }
}
