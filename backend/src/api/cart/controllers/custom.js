
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::cart.cart",
  ({ strapi }) => ({
    async carts(ctx) {
      try {
        const { user_id } = ctx.request.query;
        if (!user_id) {
          throw new Error("user_id is missing in the request query.");
        }

        const userHasCourses = await strapi
          .query("api::cart.cart")
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
        // console.log(JSON.stringify(userHasCourses));

        let usersCourse = userHasCourses.filter((res) => {
          try {
            return res.user_id.id === parseInt(ctx.request.query.user_id);
            // console.log(typeof(res.user_id.id), ctx.request.query.user_id);

            // console.log(res);
          } catch (e) {}
        });

        ctx.body = usersCourse;
      } catch (err) {
        ctx.status = 400; // Bad Request
        ctx.body = { error: err.message };
      }
    },
  })
);