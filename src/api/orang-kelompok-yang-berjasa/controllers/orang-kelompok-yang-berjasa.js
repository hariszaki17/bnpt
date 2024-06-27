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
                peristiwa: data.peristiwa,
                meninggal_atau_luka: data.meninggal_atau_luka,
                negara: data.negara,
                narasi: data.narasi
            }

            resp.push(obj)
        }

        return { data: resp }
    }
}));
