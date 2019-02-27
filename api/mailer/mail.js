import nodemailer from 'nodemailer';

class Mail {

  constructor() {
    this._transport = this.getTransport();
  }

  /**
   * initialize a transport var
   * @return {Object} this instance
   */
  getTransport() {
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bf0df44750cd14",
        pass: "4350813db1d95b"
      }
    });
  }

  /**
   * 
   * @param {String} email address who receive email
   * @param {Object} data contain some extra details about email
   * @param {Function} cb callback triggered when send email
   */
  send( data={}, cb=null ) {
    this._transport.sendMail(data, cb);
  }

}

export default new Mail();