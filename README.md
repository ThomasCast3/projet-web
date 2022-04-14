# projet-web
Swagger: 

swagger: "2.0"
info:
  description: "Pour trouver son chemin en France."
  version: "1.0"
  title: "SNStation"
tags:
- name: "/"
  description: "index de l'API"
schemes:
- "http"
paths:
  /register:
    post:
      tags:
      - "/"
      summary: "Sign-up to the website"
      parameters:
      - in: "body"
        name: "email, password, firstName, lastName"
        required: true
        schema:
          $ref: ""
      responses:
        "401":
          description: "email / password invalid"
  /login:
    post:
      tags:
      - "/"
      summary: "Sign-in to the website"
      parameters:
      - in: "body"
        name: "email, password"
        required: true
        schema:
          $ref: ""
      responses:
        "401":
          description: "email / password invalid"
  /update-account:
    put:
      tags:
      - "/"
      summary: "Edit you account informations"
      parameters:
      - in: "body"
        name: "id, email, firstName, lastName"
        required: true
        schema:
          $ref: ""
      responses:
        "500":
          description: "Internal server error"
  /delete-account:
    delete:
      tags:
      - "/"
      summary: "Delete your account"
      parameters:
      - in: "body"
        name: "id"
        required: true
        schema:
          $ref: ""
      responses:
        "500":
          description: "Internal server error"
  /geolocalisation:
    post:
      tags:
      - "/"
      summary: "Send your geolocalisation"
      parameters:
      - in: "body"
        name: "id, latitude, longitude"
        required: true
        schema:
          $ref: ""
      responses:
        "500":
          description: "Internal server error"
  /affluence:
    post:
      tags:
      - "/"
      summary: "Send the actual affluence of a train station"
      parameters:
      - in: "body"
        name: "id, gare, affluence"
        required: true
        schema:
          $ref: ""
      responses:
        "425":
          description: "Send another affluence in an interval of less than 5 minutes"
  /users:
    get:
      tags:
      - "/"
      summary: "Get all users"
      parameters:
      - in: "body"
        name: ""
        required: true
        schema:
          $ref: ""
      responses:
        "500":
          description: "Internal server error"
