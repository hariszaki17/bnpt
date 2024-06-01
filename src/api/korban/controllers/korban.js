'use strict';

/**
 * korban controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::korban.korban', ({ strapi }) => ({
    async find(ctx) {
        let res = await strapi.entityService.findMany('api::korban.korban', {
            populate: '*',
        });

        const filtered = res.filter(data => data.publishedAt != null)
        const mapped = filtered.map(data => ({
            id: data.id,
            nama: data.nama,
            jenis_kelamin: data.jenis_kelamin,
            tempat_tanggal_lahir: data.tempat_tanggal_lahir,
            no_identitas: data.no_identitas,
            alamat_ktp: data.alamat_ktp,
            status_terkait_peristiwa: data.status_terkait_peristiwa,
            meninggal_atau_luka: data.meninggal_atau_luka,
            peristiwa: data.peristiwa
        }))
        return {
            data: mapped
        }
    }
}));
