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
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
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

export default Mail;