
import app from './app';

function start() {
    const { PORT = 8179 } = process.env;
    app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)}); // eslint-disable-line no-console
}

start()