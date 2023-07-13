
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-has-course.user-has-course",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const { user_id } = ctx.request.query;
        if (!user_id) {
          throw new Error("user_id is missing in the request query.");
        }

        const userHasCourses = await strapi
          .query("api::user-has-course.user-has-course")
          .findMany(
            {
              populate: [
                "user_id",
                "course_ids.content",
                "course_ids.placeholder_img",
              ],
            },
            {
              user_id: parseInt(user_id),
            }
          );

        let usersCourse = userHasCourses.filter((res) => {
          try {
            return res.user_id.id === parseInt(ctx.request.query.user_id);
          } catch (e) {}
        });

        ctx.body = usersCourse;
      } catch (err) {
        ctx.status = 400; // Bad Request
        ctx.body = { error: err.message };
      }
    },
  }),
);