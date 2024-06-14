'use strict';

/**
 * organisasi-bnpt controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::organisasi-bnpt.organisasi-bnpt', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::organisasi-bnpt.organisasi-bnpt', {
            populate: {
                dokumentasi_kegiatan: {
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
                deputi: data.Deputi,
                direktorat: data.Direktorat,
                tugas: data.Tugas,
                fungsi: data.Fungsi,
                deputi_terkait: data.Deputi_Terkait,
            }

            const dokumentasi_kegiatan = []
            if (data.dokumentasi_kegiatan != null) {
                for (let j = 0; j < data.dokumentasi_kegiatan.length; j++) {
                    const dataDokumentasi = data.dokumentasi_kegiatan[j]

                    const objDokumentasi = {
                        id: dataDokumentasi.id,
                        nama_kegiatan: dataDokumentasi.nama_kegiatan,
                        narasi_kegiatan_id: dataDokumentasi.narasi_kegiatan_id,
                        narasi_kegiatan_eng: dataDokumentasi.narasi_kegiatan_eng,
                    }

                    const gambar = []
                    if (dataDokumentasi.dokumentasi != null) {
                        for (let k = 0; k < dataDokumentasi.dokumentasi.length; k++) {
                            const dataGambar = dataDokumentasi.dokumentasi[k]

                            const objGambar = {
                                id: dataGambar.id,
                                nama: dataGambar.name,
                                url: process.env.BASE_URL  + dataGambar.url
                            }
                            gambar.push(objGambar)
                        }
                    }

                    objDokumentasi.dokumentasi = gambar

                    dokumentasi_kegiatan.push(objDokumentasi)
                }
            }

            obj.dokumentasi_kegiatan = dokumentasi_kegiatan
            resp.push(obj)
        }

        return { data: resp }
    }
}));
