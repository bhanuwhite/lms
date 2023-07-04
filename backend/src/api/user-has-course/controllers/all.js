
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-has-course.user-has-course",
  ({ strapi }) => ({
    async found(ctx) {
      try {
        const userHasCourses = await strapi
          .query("api::user-has-course.user-has-course")
          .findMany(
            {
              populate: [
                "course_ids.content",
                "course_ids.placeholder_img",
              ],
            },
          );
        ctx.body = userHasCourses;
      } catch (err) {
        ctx.status = 400; // Bad Request
        ctx.body = { error: err.message };
      }
    },
  }),
);