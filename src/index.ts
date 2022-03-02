import 'dotenv/config';

/**
 * Hello World
 */
const main = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV) {
    console.log(`Hello World! Current NODE_ENV:${process.env.NODE_ENV}`);
  } else throw Error('NODE_ENV is not defined. Is your .env file correct?');
};

main();
