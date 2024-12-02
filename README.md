# Obligatorio de Bases de Datos No Relacionales

# Guía de instalación

## Levantar bases de datos con Docker

```
docker-compose up
```

## Instalación de dependencias

```
npm install
```

## Variables de entorno

Crear un archivo .env y copiar variables de entorno de **_.env.example_**.

## Levantar la API

```
npm start
```

## Probar endpoints

Para probar los endpoints se puede utilizar **Postman**, importando el archivo **Postman.collections.json**.

## Búsqueda de videojuegos con Elasticsearch y Kibana

Con el docker levantado ir a:

```
http://localhost:5601/app/discover
```

Allí acceder al índice de **_games_**.
