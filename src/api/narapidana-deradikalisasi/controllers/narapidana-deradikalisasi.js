'use strict';

/**
 * narapidana-deradikalisasi controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::narapidana-deradikalisasi.narapidana-deradikalisasi', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::narapidana-deradikalisasi.narapidana-deradikalisasi', {
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
                vonis: data.Vonis,
                jenis_kelamin: data.jenis_kelamin,
                lembaga_permasyarakatan: data.Lembaga_Permasyarakatan,
            }

            resp.push(obj)
        }

        return { data: resp }
    }
}));
