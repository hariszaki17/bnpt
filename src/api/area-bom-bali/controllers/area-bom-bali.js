'use strict';

/**
 * area-bom-bali controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::area-bom-bali.area-bom-bali', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::area-bom-bali.area-bom-bali', {
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
                topic: data.topic,
                narasi_id: data.narasi_id,
                narasi_en: data.narasi_en,
            }

            const gambarTemp = []
            if (data.dokumentasi_gambar != null) {
                for (let j = 0; j < data.dokumentasi_gambar.length; j++) {
                    const dataGambar = data.dokumentasi_gambar[j]

                    const objGambar = {
                        id: dataGambar.id,
                        nama: dataGambar.name,
                        url: dataGambar.url
                    }
                    gambarTemp.push(objGambar)
                }
                obj.dokumentasi_gambar = gambarTemp
            }


            const videoTemp = []
            if (data.dokumentasi_video != null) {
                for (let j = 0; j < data.dokumentasi_video.length; j++) {
                    const dataVideo = data.dokumentasi_video[j]

                    const objGambar = {
                        id: dataVideo.id,
                        nama: dataVideo.name,
                        url: dataVideo.url
                    }
                    videoTemp.push(objGambar)
                }
                obj.dokumentasi_video = videoTemp
            }

            resp.push(obj)
        }

        return { data: resp }
    }
}));
