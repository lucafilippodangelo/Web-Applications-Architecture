# Web Applications Architectures


### Project Members
- Luca Filippo D'Angelo
- Dylan Caulfield

### Technologies
- React
- Bootstrap
- Express
- TypeScript
- MongoDB

### Instructions to Run

1. Start Docker

2. Start Docker containers
```shell
docker compose -f backend/compose.yml up -d
```

3. Restore packages and start backend
```shell
cd backend
npm install
npm run start
```

4. Restore packages and start frontend (in another shell)
```shell
cd frontend
npm install
npm run start
```

5. Go to [localhost:3000](http://localhost:3000)
