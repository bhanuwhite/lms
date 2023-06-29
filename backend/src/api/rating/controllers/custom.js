

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::rating.rating",
  ({ strapi }) => ({
    async fetch(ctx) {
      try {
        const {  course_id } = ctx.request.query;
        if (!course_id) {
          throw new Error("course_id is missing in the request query.");
        }

        const course = await strapi
          .query("api::rating.rating")
          .findMany(
            {
                where:{
              course_id: parseInt(course_id),
                }
            }
          );

        ctx.body = course;
      } catch (err) {
        ctx.status = 400; // Bad Request
        ctx.body = { error: err.message };
      }
    },
  })
);
