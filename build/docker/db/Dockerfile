FROM mariadb
ENV LANG=C.UTF-8
RUN mkdir -p /usr/src/app
COPY my.cnf /etc/mysql/conf.d/mysqlutf8.cnf
COPY script /usr/src/app/script/
RUN cat /usr/src/app/script/maindb/*.sql >> /docker-entrypoint-initdb.d/maindb.sql

EXPOSE 3306