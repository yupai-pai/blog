---
title: springboot通过minio获取版本信息
published: 2024-08-02
description: ''
image: ''
tags: [minio]
category: 'solution'
draft: false 
---

# 项目需求

现在开发的项目属于微服务，所有微服务的接口都走了网关鉴权，app打开时会调用接口获取当前版本信息会和当前app的版本进行对比，如果版本不一致会从minio获取文件下载更新



登录了才有token，有了token才能去调用接口，需求是不登录的情况下也能获取到版本信息

有以下几个解决方案

1、gateway开放白名单，调用特定接口的时候不带token也能调用

2、把k8s微服务地址暴露出来，通过ip直接打到微服务不走网关

3、放在nginx下前端去访问

4、minio配置public桶，当前版本信息数据又变动时间存文件到minio特定文件中，让前端访问minio文件里面的json进行判断



方案1被 其他团队否定，不允许这样做

方案2被其他团队否定，不允许这样做

方案3pass

最后做的方案4





# 代码

最开始是想把对象转为文件暂存早本地，再进行上传，最后发现流方便一些最后用流写的代码

输入字符串存放在txt文件中上传到minio，当前版本信息增删改都需要对该文件进行变更

demo代码

```
    //更新minio文件
    @Override
    public void updateMinio(String str) {
        InputStream is = new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8));
        minioUtil.minioUploadtext(is
        , "/test/test.txt"
        , test.publicBuckets);
    }
```

minio工具类

```
public ObjectWriteResponse minioUploadtext(InputStream inputStream, String fileName, String bucketName) {
        try {
            MinioClient minioClient = MinioClientConfig.getMinioClient();
            //判断桶是否存在，不存在则创建
            if (!this.bucketExists(bucketName)) {
                this.createBucketName(bucketName);
            }
            PutObjectArgs objectArgs = PutObjectArgs
                    .builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .stream(inputStream, inputStream.available(), -1)
                    .contentType("text/plain;charset=utf-8")
                    .build();
            //文件名称相同会覆盖
            return minioClient.putObject(objectArgs);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException(500, "上传异常 " + e.getMessage());
        }
    }
```

