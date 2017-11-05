const { exec, spawn } = require('child_process');

const sysctl = function() {
  this.config = {};
  this.pick = function(obj , props) {
    let o = {}
    props.forEach(prop => {
      o[prop] = obj[prop]
    }) 
    return o 
  }
  this.perf_config = {
    'net.ipv4.ip_local_port_range': undefined,
    'net.ipv4.tcp_fin_timeout' : undefined,
    'net.ipv4.tcp_tw_recycle' : undefined,
    'net.ipv4.tcp_tw_reuse' : undefined,
    'net.core.somaxconn' : undefined
  }
};
sysctl.prototype.get = function() {
  let buff = exec('sysctl -a', (err, stdout, stderr) => {
    stdout.split('\n')
    .forEach(line => {
      var re = line.match(/^(.+?) = (.+?)$/)
      if (re) {
        let key = re[1];
        let value = re[2];
        this.config[key] = value;
      }
    });
    let result = this.pick(this.config, Object.keys(this.perf_config));
    console.log(result)
    
  })
}


module.exports = exports = sysctl;
