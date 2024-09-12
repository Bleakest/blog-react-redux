Области хранения данных:

- база данных json-server
- BFF
- redux store

Сущности приложения:

- пользователь: json-server(список пользователей), BFF(сессия), redux store(отображение в браузере)
- роль пользователя: json-server(список ролей), BFF(сессия пользователя с ролью), redux store(использование на клиенте)
- статья: json-server(список статей), redux store(отображение в браузере)
- комментарии: json-server(список комменатриев), redux store(отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registred_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для redux store(client):

- user: id / login / role_id / session
- posts: array post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: array comment: id / author / content/ publishedAt
- users: array user: id / login / registredAt / role
