import {Tooltip} from './bootstrap/Tooltip';
import {Routes} from '../../common/Routes';
import {progressImage} from '../helpers/progressImage';
import {ModalStore} from '../stores/ModalStore';
import {SubjectType} from "../../common/models/questions/common/SubjectType";
import {Score} from "../../common/models/Score";
import {Kind} from "../../common/models/questions/common/Kind";
import CSSProperties = __React.CSSProperties;
import {ProgressImage} from "./tile/ProgressImage";

const icons = {
  Order: 'sort', // 'sort-up'
  MultipleChoice: 'list',
  Timeline: 'time', // 'calendar'
  Geolocation: 'map-marker', // 'geo'
  Misc: 'question'
};


interface TileProps {
  title: string;
  placement: string;
  questionModal: ModalDescProps;
  number: number;
  type: Kind;
  opponentId?: string | Mongo.ObjectID;
  score: Score;
  disabled: boolean;
  userAnswered?: boolean;
  enemyAnswered?: boolean;
  answered?: boolean;

}

export class Tile extends React.Component<TileProps, {}> {

  render() {
    return (
        <div className={this.getCellClassNames()+ ", " + this.tileBackgroundStyle(this.props.score)}>
          <Tooltip title={this.props.title} placement={this.props.placement}>
            <ProgressImage type={this.props.type} score={this.props.score} onClick={this.onClick.bind(this)}/>
          </Tooltip>
        </div>
    );
  }

  onClick(e) {
    e.preventDefault();

    if (this.isDisabled()) {
      return;
    }

    ModalStore.showModal(this.props.questionModal);
  }

  isDisabled() {
    return this.props.disabled && !this.props.answered;
  }

  getCellClassNames() {
    return [
      'cell',
      `cell-${this.props.number}`,
      this.isDisabled() ? 'disabled' : '',
      this.props.type
    ].join(' ');
  }
  
  tileBackgroundStyle(score: Score): string {
    if (score.me >= 0 && score.them >= 0) {
        return "both-answered"
    } else if (score.me >= 0) {
      return "user-answered";
    } else if (score.them >= 0) {
      return "enemy-answered"
    } else {
      return ""
    }

  }

}
