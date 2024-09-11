# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD [ "node", "app.js" ]
