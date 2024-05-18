start:
	docker run -d --name bnpt-strapi -p 1337:1337 -v ./.tmp:/usr/src/app/.tmp -v ./public:/usr/src/app/public -v ./src:/usr/src/app/src bnpt-strapi

stop:
	docker stop bnpt-strapi && docker rm -f bnpt-strapi

docker-build:
	docker build -t bnpt-strapi .