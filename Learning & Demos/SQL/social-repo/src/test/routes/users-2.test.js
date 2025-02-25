const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/user-repos');
const pool = require('../../pool');
const Context = require('../context');

let context;
beforeAll(async () => {
  context = await Context.build();
  console.log(context.roleName);
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => context.close());

it('create a user', async () => {
  const startingCount = await UserRepo.count();

  await request(buildApp())
    .post('/users')
    .send({ username: 'testuser', bio: 'testbio' })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
