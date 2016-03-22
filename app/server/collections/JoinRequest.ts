
import ObjectID = Mongo.ObjectID;
export const JoinRequestProps = ['_id', 'from', 'to', 'gameId'];

export interface RawJoinRequest {
  _id: string | Mongo.ObjectID;
  from: string | Mongo.ObjectID;
  to: string | Mongo.ObjectID;
  gameId: string | Mongo.ObjectID;
}

export default class JoinRequest implements RawJoinRequest {

  constructor(public _id: string | Mongo.ObjectID, public from: string | Mongo.ObjectID, public to: string | Mongo.ObjectID, public gameId: string | Mongo.ObjectID) {
  }
  
  static fromRaw(raw: RawJoinRequest) {
    return new JoinRequest(raw._id, raw.from, raw.to, raw.gameId);
  }

}