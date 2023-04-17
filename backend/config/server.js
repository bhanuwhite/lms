module.exports = ({ env }) => ({
  host: env('HOST', '206.189.140.51'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
