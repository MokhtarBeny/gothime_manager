# Utilisez une image node pour le frontend
FROM node:16

# Copiez les fichiers du projet
COPY . .

# Définissez le répertoire de travail
WORKDIR /MSC_Pool_Front



# Installez les dépendances
RUN npm install

# Exposez le port (par exemple, 3000 pour une application React ou Vue)
EXPOSE 3000

# Commande pour démarrer l'application
# Execute commands mentioned under run.sh file
CMD ["./run_front.sh"]
