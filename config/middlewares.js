module.exports = [
  'strapi::errors',
  // 'strapi::cors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'connect-src': ["'self'", 'https:', 'http://localhost:1337'], // Add your URL here
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enable: true,
      origin: ['*'], //allow all origins
      headers: ['*'], //allow all headers
    }
  },
  // 'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  // 'strapi::body',
  {
    name: "strapi::body",
    config: {
      formLimit: "5gb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 5 * 1024 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
