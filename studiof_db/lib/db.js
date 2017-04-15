
'use strict'

const co = require('co')
const r = require('rethinkdb')
const Promise = require('bluebird')

const defaults = {
  host: 'localhost',
  port: 28015,
  db: 'studiof'
}

class Db {
  constructor (options) {
    options = options || {}
    this.host = options.host || defaults.host
    this.port = options.port || defaults.port
    this.db = options.db || defaults.db
    // this.connected = false
    // this.setup = options.setup || false
  }


  connect (callback) {
    this.connection = r.connect({
      host: this.host,
      port: this.port
    })

    this.connected = true

    let db = this.db
    let connection = this.connection

    let setup = co.wrap(function * () {
      let conn = yield connection

      let dbList = yield r.dbList().run(conn)
      if (dbList.indexOf(db) === -1) {
        yield r.dbCreate(db).run(conn)
      }

      let dbTables = yield r.db(db).tableList().run(conn)
      if (dbTables.indexOf('images') === -1) {
        yield r.db(db).tableCreate('images').run(conn)
        // yield r.db(db).table('images').indexCreate('createdAt').run(conn)
        // yield r.db(db).table('images').indexCreate('userId', { multi: true }).run(conn)
      }

      if (dbTables.indexOf('users') === -1) {
        yield r.db(db).tableCreate('users').run(conn)
        // yield r.db(db).table('users').indexCreate('username').run(conn)
      }

      return conn
    })

    return Promise.resolve(setup()).asCallback(callback)
    
  }
  disconnect (callback) {
    if(!this.connected){
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }
    this.connected = false
    return Promise.resolve(this.connection)
      .then((conn) => conn.close())
  }

  saveImage(image, callback) {
    if(!this.connected){
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }
  }
}

  module.exports = Db
