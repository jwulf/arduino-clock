import localtunnel from 'localtunnel';
const port = 3000;

export const tunnel = localtunnel(port, (err, tunnel) => {
    if (err) {
        console.log(err);
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel.url);
});
