CREATE DATABASE "apadmin-dbname";
CREATE USER "apadmin-dbuser" WITH SUPERUSER ENCRYPTED PASSWORD 'apadmin-dbpasswd';

\c "apsso-dbname";

INSERT INTO oauth2_registered_client (
    id, client_name, data_cadastro, usuario_cadastro, url_entrada, client_id, client_id_issued_at, client_secret, client_secret_expires_at, client_authentication_methods,
    authorization_grant_types, redirect_uris, post_logout_redirect_uris, scopes, client_settings, token_settings)
VALUES (
   'Admin', 'Sistema de administração de empresas e colaboradores', now(), 'Arquiteto do Sistema', 'https://admin.apcode.com.br;http://localhost:40003', 'com.github.andrepenteado.admin', '2023-01-01 00:00:00.000000',
   '{bcrypt}$2a$10$3oe1LUMb/fsnwOqW6H8tfOeJ6aUOHCddWl2a6bMMBBd2/2McgPvEe', null, 'client_secret_basic',  'refresh_token,client_credentials,authorization_code',
   'https://admin.apcode.com.br/authorized,http://localhost:40003/authorized','https://admin.apcode.com.br/logout,http://localhost:40003/logout', 'openid',
   '{"@class":"java.util.Collections$UnmodifiableMap","settings.client.require-proof-key":false,"settings.client.require-authorization-consent":false}',
   '{"@class":"java.util.Collections$UnmodifiableMap","settings.token.reuse-refresh-tokens":false,"settings.token.id-token-signature-algorithm":["org.springframework.security.oauth2.jose.jws.SignatureAlgorithm","RS256"],"settings.token.access-token-time-to-live":["java.time.Duration",900.000000000],"settings.token.access-token-format":{"@class":"org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat","value":"self-contained"},"settings.token.refresh-token-time-to-live":["java.time.Duration",86400.000000000],"settings.token.authorization-code-time-to-live":["java.time.Duration",300.000000000],"settings.token.device-code-time-to-live":["java.time.Duration",300.000000000]}'
);

INSERT INTO perfil_sistema (authority, id_oauth2_registered_client, descricao)
VALUES ('ROLE_com.github.andrepenteado.admin_ADMINISTRADOR', 'Admin', 'Administrador');

INSERT INTO authorities (username, authority) VALUES ('arquiteto', 'ROLE_com.github.andrepenteado.admin_ADMINISTRADOR');
