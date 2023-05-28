###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY  package*.json ./

RUN npm install glob rimraf

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm install --only=development

# Bundle app source
COPY  . .

EXPOSE 3000

CMD ["npm", "run", "start"]

