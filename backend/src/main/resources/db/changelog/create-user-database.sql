CREATE DATABASE "apadmin-dbname";
CREATE USER "apadmin-dbuser" WITH SUPERUSER ENCRYPTED PASSWORD 'apadmin-dbpasswd';

\c "apsso-dbname";

INSERT INTO public.oauth2_registered_client (
    id, client_name, data_cadastro, url_entrada, client_id, client_id_issued_at, client_secret, client_secret_expires_at, client_authentication_methods,
    authorization_grant_types, redirect_uris, post_logout_redirect_uris, scopes, client_settings, token_settings)
VALUES (
           'Admin', 'Sistema de administração de empresas e colaboradores', now(), 'https://admin.apcode.com.br', 'com.github.andrepenteado.admin', '2023-01-01 00:00:00.000000', '{bcrypt}$2a$10$rh2UYHBe4NoW2RWm1MGIzehru0OUM7t4l5xtsg8Xo4WXlaY/TgAHG',
           null, 'client_secret_basic',  'refresh_token,client_credentials,authorization_code', 'https://admin.apcode.com.br/authorized,https://admin.apcode.com.br/login/oauth2/code/admin-oidc',
           'https://admin.apcode.com.br/logout', 'openid', '{"@class":"java.util.Collections$UnmodifiableMap","settings.client.require-proof-key":false,"settings.client.require-authorization-consent":false}',
           '{"@class":"java.util.Collections$UnmodifiableMap","settings.token.reuse-refresh-tokens":false,"settings.token.id-token-signature-algorithm":["org.springframework.security.oauth2.jose.jws.SignatureAlgorithm","RS256"],"settings.token.access-token-time-to-live":["java.time.Duration",900.000000000],"settings.token.access-token-format":{"@class":"org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat","value":"self-contained"},"settings.token.refresh-token-time-to-live":["java.time.Duration",86400.000000000],"settings.token.authorization-code-time-to-live":["java.time.Duration",300.000000000],"settings.token.device-code-time-to-live":["java.time.Duration",300.000000000]}'
       );
INSERT INTO perfil_sistema (authority, id_oauth2_registered_client, descricao)
VALUES ('ROLE_Admin_Administrador', 'Admin', 'Administrador');

INSERT INTO authorities (username, authority) VALUES ('admin', 'ROLE_Admin_Administrador');
