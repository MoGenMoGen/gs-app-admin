module.exports = {
    //部署正式服务器上
    devDist: {
        //部署到服务器的路径
        remotePath: '/usr/local/apache-tomcat-7.0.52/webapps/dist',
        //ip地址
        host: '111.2.25.208:6101',
        //帐号
        user: 'root',
        //密码
        pass: 'Nbjl@2017',
        //端口
        port: 22
    },
    //程序编译好路径
    publicPath: '/dist/'
}