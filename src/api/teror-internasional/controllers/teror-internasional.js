'use strict';

/**
 * teror-internasional controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::teror-internasional.teror-internasional', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::teror-internasional.teror-internasional', {
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
                kejadian: data.kejadian,
                tanggal: data.tanggal,
                lokasi: data.lokasi,
                alat: data.alat,
                organisasi: data.organisasi,
                detail: data.detail,
                pelaku: data.pelaku,
                afiliasi: data.afiliasi,
                berita: data.berita,
                pendana: data.pendana,
            }

            const gambarTemp = []
            if (data.gambar != null) {
                for (let j = 0; j < data.gambar.length; j++) {
                    const dataGambar = data.gambar[j]

                    const objGambar = {
                        id: dataGambar.id,
                        nama: dataGambar.name,
                        url: dataGambar.url
                    }
                    gambarTemp.push(objGambar)
                }
                obj.gambar = gambarTemp
            }

            const videoTemp = []
            if (data.video != null) {
                for (let j = 0; j < data.video.length; j++) {
                    const dataVideo = data.video[j]

                    const objGambar = {
                        id: dataVideo.id,
                        nama: dataVideo.name,
                        url: dataVideo.url
                    }
                    videoTemp.push(objGambar)
                }
                obj.video = videoTemp
            }
            resp.push(obj)
        }

        // const sanitizedEntries = await this.sanitizeOutput(result, ctx);
        return { data: resp }
    }
}));