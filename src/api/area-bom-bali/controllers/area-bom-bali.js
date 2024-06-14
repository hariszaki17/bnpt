'use strict';

/**
 * area-bom-bali controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::area-bom-bali.area-bom-bali', ({ strapi, env }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::area-bom-bali.area-bom-bali', {
            populate: {
                Dokumentasi: {
                    populate: '*',
                }
            },
        });

        let resp = [];
        for (let i = 0; i < res.length; i++) {
            if (res[i].publishedAt == null) {
                continue
            }

            const data = res[i]
            const obj = {
                id: data.id,
                topic: data.Topic,
                narasi_id: data.narasi_id,
                narasi_eng: data.narasi_eng,
            }

            const dokumentasi = []
            if (data.Dokumentasi != null) {
                for (let j = 0; j < data.Dokumentasi.length; j++) {
                    const dataDok = data.Dokumentasi[j]

                    const objDok = {
                        id: dataDok.id,
                        nama_kegiatan: dataDok.nama_kegiatan,
                        narasi_kegiatan_id: dataDok.narasi_kegiatan_id,
                        narasi_kegiatan_eng: dataDok.narasi_kegiatan_eng,
                    }

                    const dokumentasiGambarArray = []
                    console.log(dataDok.dokumentasi)
                    if (dataDok.dokumentasi != null) {
                        for (let k = 0; k < dataDok.dokumentasi.length; k++) {
                            const dokumentasiGambar = dataDok.dokumentasi[k];

                            const objGambar = {
                                id: dokumentasiGambar.id,
                                nama: dokumentasiGambar.name,
                                url: process.env.BASE_URL + dokumentasiGambar.url
                            }
                            dokumentasiGambarArray.push(objGambar)
                        }
                    }
                    objDok.dokumentasi = dokumentasiGambarArray

                    dokumentasi.push(objDok)
                }
                obj.dokumentasi = dokumentasi
            }

            resp.push(obj)
        }

        return { data: resp }
    }
}));
