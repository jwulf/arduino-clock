const localtunnel = require('localtunnel');
const port = 3000;

var tunnel = localtunnel(port, function(err, tunnel) {
    if (err) {
        console.log(err);
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel.url);
});

tunnel.on("error", (err) => console.log(err));

tunnel.on('close', function() {
    // tunnels are closed
});