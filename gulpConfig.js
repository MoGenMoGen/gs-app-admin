module.exports = {
    devTest: { //部署到测试服务器上
        dest: '/opt/apache-tomcat-8.5.24/webapps/dist/', //部署到服务器的路径
        host: '118.178.121.34', //ip地址
        user: 'root', //帐号
        password: "Hm123456", //密码
        port: 80 //端口
    },
    // devDist: { //部署正式服务器上
    //     remotePath: '/root/app/', //部署到服务器的路径
    //     host: 'xx.xx.xxx.xxx', //ip地址
    //     user: 'root', //帐号
    //     pass: '******', //密码
    //     port: 22 //端口
    // },
    cleanPath: '/opt/apache-tomcat-8.5.24/webapps/dist/',
    publicPath: '/dist/', //程序编译好路径
    commands: [
        //删除现有文件
        `rm -rf /opt/apache-tomcat-8.5.24/webapps/dist/`,
    ]
}