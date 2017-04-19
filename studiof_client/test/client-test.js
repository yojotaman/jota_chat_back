'use strict'

const test = require('ava')
const nock = require('nock')
const studiofgram = require('../')
const fixtures = require('./fixtures')

let options = {
  endpoints: {
    pictures: 'http://studiofgram.test/picture',
    users: 'http://studiofgram.test/user',
    auth: 'http://studiofgram.test/auth'
  }
}

test.beforeEach(t => {
  t.context.client = studiofgram.createClient(options)
})

test('client', t => {
  const client = t.context.client

  t.is(typeof client.getPicture, 'function')
  t.is(typeof client.savePicture, 'function')
  t.is(typeof client.likePicture, 'function')
  t.is(typeof client.listPictures, 'function')
  t.is(typeof client.listPicturesByTag, 'function')
  t.is(typeof client.saveUser, 'function')
  t.is(typeof client.getUser, 'function')
  t.is(typeof client.auth, 'function')
})

test('getPicture', async t => {
  const client = t.context.client

  let image = fixtures.getImage()

  nock(options.endpoints.pictures)
    .get(`/${image.publicId}`)
    .reply(200, image)

  let result = await client.getPicture(image.publicId)

  t.deepEqual(image, result)
})
