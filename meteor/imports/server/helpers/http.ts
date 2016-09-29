
const getSync  = Meteor.wrapAsync(HTTP.get);
const getAsync = HTTP.get;



const delSync  = Meteor.wrapAsync(HTTP.del);
const delAsync = HTTP.del;

export const HTTPHelper = {

  getSync: getSync,
  getAsync: getAsync,

  delSync: delSync,
  delAsync: delAsync,

  get(url, callback) {
    if (typeof callback !== 'function') {
      return HTTPHelper.getSync(url);
    }

    return HTTPHelper.getAsync(url, callback);
  },

  del(url, callback) {
    if (typeof callback !== 'function') {
      return HTTPHelper.delSync(url);
    }

    return HTTPHelper.delAsync(url, callback);
  }

};
