'use strict';

/**
 * linimasa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::linimasa.linimasa', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::linimasa.linimasa', {
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
                judul: data.judul,
                narasi_id: data.narasi_id,
                narasi_en: data.narasi_en,
                tahun: data.tahun,
                pelaku: data.pelaku,
                afiliasi: data.afiliasi,
                jenis_serangan: data.jenis_serangan,
            }

            const gambarTemp = []
            if (data.gambar != null) {
                for (let j = 0; j < data.gambar.length; j++) {
                    const dataGambar = data.gambar[j]

                    const objGambar = {
                        id: dataGambar.id,
                        nama: dataGambar.name,
                        url: process.env.BASE_URL  + dataGambar.url
                    }
                    gambarTemp.push(objGambar)
                }
                obj.gambar = gambarTemp
            }

            const videoTemp = []
            if (data.video != null) {
                for (let j = 0; j < data.video.length; j++) {
                    const dataVideo = data.video[j]

                    const objVideo = {
                        id: dataVideo.id,
                        nama: dataVideo.name,
                        url: process.env.BASE_URL  + dataVideo.url
                    }
                    videoTemp.push(objVideo)
                }
                obj.video = videoTemp
            }
            resp.push(obj)
        }

        // const sanitizedEntries = await this.sanitizeOutput(result, ctx);
        return { data: resp }
    }
}));
