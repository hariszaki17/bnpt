'use strict';

/**
 * orang-kelompok-yang-berjasa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::orang-kelompok-yang-berjasa.orang-kelompok-yang-berjasa', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::orang-kelompok-yang-berjasa.orang-kelompok-yang-berjasa', {
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
                narasi_id: data.narasi_id,
                narasi_en: data.narasi_en,
                peristiwa: data.peristiwa,
                tanggal_kejadian: data.tanggal_kejadian,
                detail_orang_kelompok: data.detail_orang_kelompok,
                jenis_serangan: data.jenis_serangan,
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

                    const objVideo = {
                        id: dataVideo.id,
                        nama: dataVideo.name,
                        url: dataVideo.url
                    }
                    videoTemp.push(objVideo)
                }
                obj.dokumentasi_video = videoTemp
            }

            resp.push(obj)
        }

        return { data: resp }
    }
}));
