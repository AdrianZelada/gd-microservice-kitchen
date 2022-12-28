FROM node:16

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# Install dependencies
RUN cd /app; \    
    npm install; \
    npm run build

# Expose our server port.
EXPOSE 4500 3306

WORKDIR app

CMD ["node", "./dist/index.js"]
