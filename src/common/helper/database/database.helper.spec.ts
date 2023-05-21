import { mongodbUri } from './database.helper';

describe('mongodbUri', () => {
  it('should return a valid MongoDB URI with username and password', () => {
    const host = 'localhost';
    const port = 27017;
    const database = 'test';
    const username = 'user';
    const password = 'password';
    const expectedUri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
    const uri: string = mongodbUri(host, port, database, username, password);
    expect(uri).toEqual(expectedUri);
  });

  it('should return a valid MongoDB URI without username and password', () => {
    const host = 'localhost';
    const port = 27017;
    const database = 'test';
    const expectedUri = `mongodb://${host}:${port}/${database}`;
    const uri: string = mongodbUri(host, port, database);
    expect(uri).toEqual(expectedUri);
  });
});
