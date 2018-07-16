const os = require('os');

function getIp() {
    let ip;
    for (let netWorkStr of os.networkInterfaces().en0) {
        if (netWorkStr.family === 'IPv4') {
            ip = netWorkStr.address
        }
    }
    return ip
};

getIp();