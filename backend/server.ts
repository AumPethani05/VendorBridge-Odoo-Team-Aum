const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`);
});