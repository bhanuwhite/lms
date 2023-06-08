
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-has-course.user-has-course', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
        // console.log(ctx.request.query);

        let a = await strapi.db.query('api::user-has-course.user-has-course').findMany({populate:true});
        // console.log(a);
        // let b = a['data'].filter((res)=>{
        //     return res.user_id.data.id === ctx.request.query
        // })
        // console.log(a);
        let b = a.filter((res)=>{
            try{
                return res.user_id.id === parseInt(ctx.request.query.user_id)
                // console.log(typeof(res.user_id.id), ctx.request.query.user_id);

                // console.log(res);
            }catch(e){}
        })
        // console.log(b);
      ctx.body = b;
    } catch (err) {
      ctx.body = err;
    }
  }
}));