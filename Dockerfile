# Usa la versione LTS di Node.js
FROM node:20-alpine

# Imposta directory di lavoro
WORKDIR /usr/src/app

# Copia i file di configurazione npm (prima per caching migliore)
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il codice sorgente
COPY . .

# Build (opzionale, se usi TypeScript o build script)
# RUN npm run build

# Porta esposta
EXPOSE 80

# Comando di avvio
CMD ["npm", "start"]
