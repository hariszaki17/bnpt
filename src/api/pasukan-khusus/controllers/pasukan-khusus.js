'use strict';

/**
 * pasukan-khusus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pasukan-khusus.pasukan-khusus', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::pasukan-khusus.pasukan-khusus', {
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
                sejarah_id: data.sejarah_id,
                fungsi_tugas: data.fungsi_tugas,
            }

            const dataVideo = {}
            if (data.video_profile != null) {
                dataVideo.id = data.video_profile.id
                dataVideo.name = data.video_profile.name
                dataVideo.url = data.video_profile.url
            }

            obj.video_profile = dataVideo
            resp.push(obj)
        }
        return { data: resp }
    }
}));
