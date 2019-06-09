FROM node:10.15.3-alpline

WORKDIR /app

# copy source code
COPY . .

# install yarn
RUN npm install yarn -g

# install dependency
RUN yarn install

# ------------------------------
# container command
CMD [ "yarn", "start" ]