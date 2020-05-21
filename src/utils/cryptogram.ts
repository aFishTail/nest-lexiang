import * as crypto from 'crypto'

/**
 * make salt
 */

/**
 * make salt
 */
export function makeSalt(): string{
  return crypto.randomBytes(3).toString('base64')
}

export function encryptPassword(passwd: string, salt: string): string{
  if(!passwd || !salt) {
    return ''
  }
  const tmpSalt = Buffer.from(salt, 'base64')
  return (
    crypto.pbkdf2Sync(passwd, tmpSalt, 10000, 16, 'sha1').toString('base64')
  )
}