'use strict';

/**
 * video-lini-masa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::video-lini-masa.video-lini-masa', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::video-lini-masa.video-lini-masa', {
            populate: '*',
        });

        let resp = [];
        for (let i = 0; i < res.length; i++) {
            if (res[i].publishedAt == null) {
                continue
            }
            const data = res[i]
            const obj = {
                id: data.id,
                nama: data.nama,
            }

            if (data.video != null) {
                obj.video = {
                    id: data.video.id,
                    nama: data.video.name,
                    url: data.video.url
                }
            }

            resp.push(obj)
        }

        return { data: resp }
    }
}));
