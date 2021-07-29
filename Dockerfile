FROM node:15.8.0
WORKDIR /home/node/app
EXPOSE 3000
COPY . .
RUN yarn install
CMD ["bash"]