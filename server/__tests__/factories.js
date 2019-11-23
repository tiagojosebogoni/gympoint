import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Student', Student, {
  name: faker.internet.password(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 10, max: 150 }),
  weight: faker.random.number({ min: 10, max: 200, precision: 0.001 }),
  height: faker.random.number({ max: 2.0, precision: 0.01 }),
});

export default factory;
