'use strict'

const test = require ('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const Db = require ('../')

// configuracion para los test, en este caso se crea una nueva base de datos de prueba para correro los test sobre esta
const dbName = `studiof_${uuid.v4()}`
const db = new Db({ db: dbName })

test.before('setup database ', async t => {
  await db.connect()
  t.true(db.connected, 'should be connected')
})

test.after('disconnect database', async t => {
  await db.disconnect()
  t.false(db.connected, 'should be disconnected')  
})

test.after.always('cleanup database', async t => {
  let conn = await r.connect({})
  await r.dbDrop(dbName).run(conn)
})


test('save image', async t => { 
  t.is(typeof db.saveImage, 'function', 'saveImage is a function')

  let image = {
    url: `https://studiof.test/${uuid.v4()}.jpg`,
    likes: 0,
    liked: false,
    user_id: uuid.uuid()
  }

  let created = await db.saveImage(image)
  t.is(created.url, image.url)
  t.is(created.likes, image.likes)
  t.is(created.liked, image.liked)
  t.is(created.user_id, image.user_id)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})
