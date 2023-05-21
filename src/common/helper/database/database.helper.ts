/**
 * Helper function to generate a mongodb uri string.
 * The function will return a uri string with or without authentication depending on the username and password parameters.
 *
 * @param host
 * @param port
 * @param database
 * @param username
 * @param password
 */
export const mongodbUri = (
  host: string,
  port: number,
  database: string,
  username?: string,
  password?: string,
): string => {
  if (username && password) {
    return `mongodb://${username}:${password}@${host}:${port}/${database}`;
  } else {
    return `mongodb://${host}:${port}/${database}`;
  }
};
