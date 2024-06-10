'use strict';

/**
 * deputi-and-subdirektorat controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::deputi-and-subdirektorat.deputi-and-subdirektorat', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::deputi-and-subdirektorat.deputi-and-subdirektorat', {
            populate: {
                dokumentasi: {
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
                deputi: data.deputi,
                direktorat: data.direktorat,
                narasi_direktorat: data.narasi_direktorat,
            }

            const dokumentasi = []
            if (data.dokumentasi != null) {
                for (let j = 0; j < data.dokumentasi.length; j++) {
                    
                    const dataDokumentasi = data.dokumentasi[j]
                    const objDokumentasi = {
                        id: dataDokumentasi.id,
                        narasi_dokumentasi: dataDokumentasi.narasi_dokumentasi,
                        nama_subdirektorat: dataDokumentasi.nama_subdirektorat
                    }

                    const dokumentasi_gambar = []
                    if (dataDokumentasi.dokumentasi != null) {
                        for (let k = 0; k < dataDokumentasi.dokumentasi.length; k++) {
                            const dataGambar = dataDokumentasi.dokumentasi[k];
                            
                            const objGambar = {
                                id: dataGambar.id,
                                nama: dataGambar.name,
                                url: dataGambar.url
                            }

                            dokumentasi_gambar.push(objGambar)
                        }
                    }

                    objDokumentasi.dokumentasi = dokumentasi_gambar
                    dokumentasi.push(objDokumentasi)
                }
            }

            obj.dokumentasi = dokumentasi
            resp.push(obj)
        }

        return { data: resp }
    }
}));
