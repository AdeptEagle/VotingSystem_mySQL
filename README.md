# Voting System with MySQL and TypeORM

A voting system backend API built with Node.js, Express, TypeORM, and MySQL.

## Project Setup

1. Make sure MySQL is installed and running on your machine
2. Create the database:
```sql
CREATE DATABASE voting_system;
```

3. Install dependencies:
```bash
npm install
```

4. Configure environment variables:
- Copy `.env.example` to `.env`
- Update MySQL credentials in `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=voting_system
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── config/
│   └── ormconfig.ts         # Database configuration
├── database/
│   └── schema.sql          # Database schema
├── entities/
│   ├── candidate.ts
│   ├── partylist.ts
│   ├── position.ts
│   ├── student.ts
│   └── vote.ts
└── server.ts               # Application entry point
```

## API Endpoints

- GET `/health` - Check API health status
- More endpoints coming soon...

## Database Schema

The system uses the following main entities:
- Student: Stores student information
- Position: Election positions (e.g., President, Secretary)
- Partylist: Political party groups
- Candidate: Candidates linked to positions and partylists
- Vote: Records votes with unique constraint per student-candidate pair

## Development

- Use `npm run dev` for development with hot-reload
