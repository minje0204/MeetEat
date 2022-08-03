FROM node:alpine as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install --force --silent 
RUN npm install react-scripts@5.0.1 -g --silent

# 소스를 작업폴더로 복사하고 빌드
COPY . .
RUN npm run build

# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

RUN mkdir ./build
COPY --from=builder /app/build ./build

# 80 포트 오픈
EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]