// 1.引入模块
const http = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');
const multiparty = require('multiparty');

// 2.创建web服务
const server = http.createServer((req,res) => {
    // 3.获取url
    const url = req.url;

    // 4.判断
    if (url.indexOf('uploadPage') && req.method === 'POST') {
        // 解析一个文件上传
        var form = new multiparty.Form();
        //设置编辑
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = __dirname + "/images/";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;
        //form.maxFields = 1000;  设置所以文件的大小总和
        
        form.parse(req, function(err, fields, files) {
            // 参数fields是一个对象,里面存放的是文件框中的内容  
            // 参数files也是一个,里面存放的是上传的文件,每个文件都是一个,有多少个文件就有多少个对象
            console.log(fields);
            console.log(files);
    
          //同步重命名文件名
        //   fs.renameSync(files.path,files.originalFilename);
          
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
     
        return;
    }

        // 5.拼接路径
        const filePath = path.join(__dirname,'html/uploadPage.html');

        // 6.读取文件
        fs.readFile(filePath,(err,data)=>{
            if(err){
                console.log(err); 
            }

            res.setHeader("Content-Type","text/html;charset=utf-8");
            res.end(data);
        });

}).listen(8899,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }

    console.log('ojbk');
});

// 3.启动web服务
// server.listen(8899,'127.0.0.1',err=>{
//     if(err){
//         console.log(err);
//     }

//     console.log('ojbk');
// })