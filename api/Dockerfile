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

# Use the node user from the image (instead of the root user)

CMD ["npm", "run", "start"]

###################
# PRODUCTION
###################

FROM node:18-alpine As production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm install --only=production

COPY  . .
# Copy the bundled code from the build stage to the production image

COPY  --from=development /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node",  "dist/main" ]
