# Salah-Eddine JAOUAD

---

# TP 3 : Sécurisation d'une Application E-Learning avec OAuth2, OIDC, Keycloak et React

---

## 1. Introduction & Architecture

### Objectif
Mettre en place une architecture micro-services sécurisée pour une plateforme d'E-Learning. L'authentification est déléguée à un serveur IAM (Keycloak) via les protocoles **OAuth2** et **OpenID Connect (OIDC)**.

### Composants
1. **Keycloak (Docker)** : serveur d'identité (IAM)
2. **Spring Boot (Backend)** : API REST sécurisée (Resource Server)
3. **React (Frontend)** : interface utilisateur (SPA) sécurisée avec Tailwind CSS

### Architecture

![Architecture](assets/0_architechture.png)

---

## Partie 1 : Configuration de Keycloak

### 1.1 Déploiement via Docker
Nous commençons par lancer Keycloak via un fichier `docker-compose.yml`.

- Commande : `docker-compose up -d`

![docker-compose up -d](assets/1_docker-compose_up-d.png)
- Démarrage du conteneur Keycloak
- Le conteneur est actif et tourne sur le port \(8080\)

![keycloak container](assets/2_keycloak_active_docker.png)

### 1.2 Accès à la console d'administration
Une fois démarré, nous accédons à l'interface via : `http://localhost:8080`.

- Page de login initiale

![keycloak login](assets/3_localhost8080_keycloak_login_page.png)
- Connexion avec le compte administrateur par défaut (ex. `admin/admin`)

![login](assets/4_login_page_admin_admin.png)
- Tableau de bord principal (Realm Master)

![keycloak homepage](assets/5_keycloak_home_page.png)

### 1.3 Création du royaume (Realm)
Nous créons un royaume dédié nommé `elearning-realm` pour isoler notre configuration.

- Menu de création de realm

![manage realms](assets/6_manage_realms_create_realm.png)
- Définition du nom `elearning-realm`

![create e-learning realm](assets/7_create_realm_elearning_realm.png)
- Confirmation de la création

![e-learning realm created](assets/8_elearning_realm_created.png)

### 1.4 Configuration du client OIDC
Nous configurons le client `react-client` qui représentera notre application Frontend.

![clients page](assets/9_clients_create_client.png)

**Configuration :**
- Client ID : `react-client`

![general settings](assets/10_general_settings_react_client.png)

- Flux : Standard Flow (pour les SPA)

![capability config](assets/11_capability_config.png)
- URLs de redirection : `http://localhost:3000/*` (après login)

![login settings](assets/12_login_settings.png)

### 1.5 Gestion des rôles
Nous définissons deux rôles pour gérer les permissions : `ROLE_ADMIN` et `ROLE_STUDENT`.

- Interface de création de rôle

![realms roles](assets/13_realms_roles_create_role.png)
- Création du rôle `ADMIN`

![role admin](assets/14_role_admin.png)
- Création du rôle `STUDENT`

![role student](assets/15_role_student.png)
- Vue d'ensemble des rôles créés

![roles created](assets/16_realm_roles.png)

### 1.6 Création des utilisateurs et assignation
Nous créons deux utilisateurs tests et leur assignons leurs rôles respectifs.

![users](assets/17_users_create_new_user.png)

**Utilisateur 1 : `user1` (Étudiant)**
- Détails de `user1`

![create user1](assets/18_user1_create.png)
- Onglet Credentials

![credentials](assets/19_user1_credentials.png)
- Définition du mot de passe (non temporaire)

![user1 password](assets/20_user1_password.png)
- Interface de mapping des rôles

![role mapping](assets/21_user1_role_mapping_assign_role.png)
- Assignation de `ROLE_STUDENT` à `user1`

![user1 assign student role](assets/22_user1_role_student_assign.png)

**Utilisateur 2 : `admin1` (Administrateur)**
- Création de `admin1`

![admin1 create](assets/23_admin1_create.png)
- Définition du mot de passe

![admin1 password](assets/24_admin1_password.png)
- Assignation de `ROLE_ADMIN` à `admin1`

![admin1 assign admin role](assets/25_admin1_role_admin_assign.png)

**Vérification**
- Vue globale des utilisateurs

![users roles](assets/26_users_roles.png)

### 1.7 Test technique (Postman)
Vérification que Keycloak délivre bien les tokens et les informations utilisateurs.

- Récupération d'un Access Token pour `user1`

![token access](assets/27_postman_test_POST_token_user1.png)
- Appel à l'endpoint `/userinfo` avec le token

![userinfo](assets/28_postman_test_GET_bearertoken_userinfo_user1.png)

---

## Partie 2 : Backend Spring Boot

### 2.1 Démarrage du backend
L'application Spring Boot est configurée pour tourner sur le port \(8081\) et agir comme Resource Server.

![sping boot app](assets/30_spring_boot_app_started_2_intellij_idea.png)

![spring boot app](assets/29_spring_boot_app_started.png)

### 2.2 Tests de sécurité API
Nous testons les endpoints sécurisés via Postman.

**Test de lecture :** `GET /courses` (Autorisé pour Student)
- Code `200 OK` : liste des cours récupérée

![postman GET courses user1](assets/31_postman_test_GET_courses.png)

**Test d'écriture :** `POST /courses` (Interdit pour Student)
- Code `403 Forbidden` : `user1` n'a pas les droits

![postman POST courses user1](assets/32_postman_test_POST_courses_user1_403.png)

**Test d'écriture :** `POST /courses` (Autorisé pour Admin)
- Récupération du token pour `admin1`
- Code `200/201` : cours créé avec succès

![postman admin1 token](assets/33_postman_test_token_admin1.png)
![postman POST courses admin1](assets/34_postman_test__POST_courses_admin1_200.png)

**Vérification de l'identité :** `GET /me`
- Retourne les claims du JWT

![postman GET /me](assets/35_postman_test_GET_localhost_8081_me.png)

---

## Partie 3 : Frontend React

### 3.1 Initialisation du projet
Création de l'application avec Vite et installation des dépendances : `keycloak-js`, `axios`, `react-router-dom`.

![vite react](assets/36_npx_create-vite-latest_elearning-frontend_react.png)

![keycloak-js](assets/39_npm_install_keycloak-js.png)

![react router dom](assets/40_npm_install_react-router-dom.png)

![axios](assets/41_npm_install_axios.png)

- Initialisation du projet React
- Lancement du serveur de développement

![npm dev run](assets/37_npm_run.png)
- Application accessible sur `http://localhost:3000`

![localhost:3000](assets/38_localhost3000.png)

### 3.2 Interface utilisateur finale (Tests UI)
L'interface s'adapte dynamiquement selon le rôle de l'utilisateur connecté.

1. **Page de connexion SSO** : l'utilisateur est redirigé vers Keycloak pour s'authentifier  

![UI login page](assets/42_ui_login_page_keycloak.png)

2. **Dashboard Étudiant (`user1`)** : connecté en tant que `user1`, l'utilisateur ne voit que la liste des cours  
   - Accès en lecture seule

![user1 login](assets/43_e-learning-user1_login.png)

![user1 dashboard](assets/44_e-learning_user1_dashboard.png)

1. **Dashboard Administrateur (`admin1`)** : connecté en tant que `admin1`, l'utilisateur voit le formulaire d'ajout de cours  
   - Accès complet (Lecture + Écriture)

![admin1 login](assets/45_e-learning-admin1_login.png)

![admin1 dashboard](assets/46_e-learning-admin1_dashboard.png)

---

## Conclusion
Ce TP a permis de valider une chaîne de sécurité complète :

- Identité centralisée via Keycloak
- Protection des APIs via Spring Security et OAuth2
- Expérience utilisateur fluide via React et OIDC
