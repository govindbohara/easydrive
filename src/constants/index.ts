const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const PASSWORD_REGEX = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
// 30 days
const COOKIE_EXPIRATION_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
export { EMAIL_REGEX, PASSWORD_REGEX, COOKIE_EXPIRATION_DATE }
