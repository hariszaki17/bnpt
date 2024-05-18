import Logo from "./extensions/logo.png";

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
  head: {
    favicon: Logo,
  },
  menu: {
    logo: Logo,
  },
  auth: {
    logo: Logo,
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "BNPT",
      "app.components.LeftMenu.navbrand.workplace": "Manajemen Konten",
      "Auth.form.welcome.title": "Selamat Datang!",
      "Auth.form.welcome.subtitle": "Masuk ke akun anda",
    }
  },
  // Disable video tutorials
  tutorials: false,
  // Disable notifications about new Strapi releases
  notifications: { release: false },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
