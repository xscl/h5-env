使用方式
./qrsync ./config.json

## config.json

只需要改src

src请填写要上传的文件夹, 该工具会将该文件夹下的所有文件上传, 最好该文件夹下有一个文件夹作为命名空间隔离, 以避免覆盖已有的文件!!! 且不要和以下名称冲突: css, js, images, public, static, class

比如, 用name1来作隔离
/root/class
        /name1/index.html
        /name1/a.css

上传后, 访问地址为

http://static.leanote.top/name1/index.html
或 http://7xigkl.com1.z0.glb.clouddn.com/name1/index.html

{
    "src":          "/root/class",
    "dest":         "qiniu:access_key=-GlaX6Ssx9gJZZFwQUa1s_XWVhyes-qHb4L4L_Ip&secret_key=ZhXDK4Jfu-z3wBPOVdJMvV4j2dQx5L8lLqedfq3y&bucket=leanote",
    "debug_level":  1
}
