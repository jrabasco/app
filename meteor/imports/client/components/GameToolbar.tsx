import {
  Row, Col,
  Button, Modal,
  Glyphicon
} from 'react-bootstrap';

import {browserHistory, Link} from 'react-router';

import {Game}             from '../models/Game';
import {User}             from '../models/User';
import {Routes}           from '../../common/Routes';
import {Friend}           from '../../common/models/Friend';
import {Friends}          from '../../common/collections/Friends';
import {GameStore}        from '../stores/GameStore';
import {FacebookStore}    from '../stores/FacebookStore';
import {QuitGameModal}    from './modals/QuitGameModal';
import {AccountSettings}  from './AccountSettings';

interface GameToolbarProps {
  user: User;
  game?: Game;
}

interface GameToolbarState {
  showQuitGameModal?: boolean;
  showAccountSettings?: boolean;
  showGameRequestInfoModal?: boolean;
}

export class GameToolbar extends React.Component<GameToolbarProps, GameToolbarState> {

  constructor(props: GameToolbarProps) {
    super(props);

    this.state = {
      showQuitGameModal: false,
      showAccountSettings: false,
      showGameRequestInfoModal: false
    };
  }

  onClickRequestButton() {
    FacebookStore.showInviteDialog().then(res => {
      if (!res) {
        this.setState({
          showGameRequestInfoModal: true
        });
      }
    });
  }

  onClickAccountButton() {
    this.setState({
      showQuitGameModal: this.state.showQuitGameModal,
      showAccountSettings: true
    });
  }

  onQuit() {
    GameStore.quit(this.props.game);
    browserHistory.push(Routes.Page.home());
  }

  onResume() {

  }

  onHideAccountModal() {
    this.setState({
      showQuitGameModal: this.state.showQuitGameModal,
      showAccountSettings: false
    })
  }

  renderModal() {
    if (this.state.showQuitGameModal && this.props.game) {
      return (
        <QuitGameModal
          show={this.state.showQuitGameModal && this.props.game != null}
          game={this.props.game}
          onQuit={this.onQuit.bind(this)}
          onResume={this.onResume.bind(this)}
          onRequestHide={(() => {})}/>
      );
    }

    if (this.state.showAccountSettings) {
      return (
        <Modal show={this.state.showAccountSettings}
               onHide={this.onHideAccountModal.bind(this)}
               className="fullscreen">
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AccountSettings />
          </Modal.Body>
        </Modal>
      );
    }
  }

  render() {
    return (
      <div>
        <Row>
          <div className="game-toolbar">
            <div className="game-toolbar-btns">
              {this.renderRequestButton()}
              {this.renderAccountButton()}
              {this.renderAdminButton()}
            </div>
            {this.renderModal()}
            {this.renderPleaseClickOnDoneModal()}
          </div>
        </Row>
      </div>
    );
  }

  renderRequestButton() {
    return (
      <Button
        bsStyle="primary"
        className="request-button"
        onClick={this.onClickRequestButton.bind(this)}>
        <Glyphicon glyph="play-circle" />
        Play with a friend
      </Button>
    );
  }

  renderAccountButton() {
    return (
      <Button
        className="settings-button"
        onClick={this.onClickAccountButton.bind(this)}>
        <Glyphicon glyph="user" />
        Account
      </Button>
    );
  }

  renderAdminButton() {
    if (!this.props.user.profile.isDev) {
      return null;
    }

    return (
      <Link to={Routes.Page.admin()} className='admin-link'>
          <Button bsStyle='danger'>
            <Glyphicon glyph='dashboard' />
            Admin
          </Button>
      </Link>
    );
  }

  renderPleaseClickOnDoneModal() {
    const hideModal = () => {this.setState({showGameRequestInfoModal: false})};
    return (
      <div>
        <Modal show={this.state.showGameRequestInfoModal} backdrop={true} onHide={hideModal.bind(this)}>

          <Modal.Body className="centered" >
            Please click on <Button className="facebook-done-button" onClick={hideModal.bind(this)}>Done</Button> once you selected the friends to invite
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

