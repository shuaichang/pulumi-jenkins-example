# pulumi-jenkins-example

该示例演示阿里云函数计算（FunctionCompute，FC）和 JenkinsCI 对接，实现 Serverless 应用的持续集成和持续发布。该示例启动一个 Jenkins 服务，监听指定的 github repo。当有代码变更时，自动触发设定的流水线任务，最终将变更部署到阿里云函数计算平台上。

# 前置条件

1. 一台安装了 docker 的机器。
2. 本示例采用 typescript/nodejs 编写，需要设置好 typescript/nodejs 开发环境。
3. 您有一个 pulumi 账号，安装了 [pulumi](https://www.pulumi.com/docs/get-started/install/)软件，并配置好[阿里云开发环境](https://www.pulumi.com/docs/intro/cloud-providers/alicloud/)。 

# 运行步骤

1. 配置和运行 Jenkins 服务
   1. 在本机上通过容器启动 Jenkins 服务。
      ```
      docker run -d -p 8080:8080 jenkinsci/blueocean
      ```
   2. 第一次运行 Jenkins 需要设置初始密码。通过 `docker logs` 命令查看 Jenkins 容器日志，找到下图所示的内容，拷贝系统生成的初始密码。
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610032169119-48a33e40-f78c-458d-bc48-bd66f834c1fd.png)
   3. 在浏览器中填入 `http://localhost:8080` 地址，访问本机的 Jenkins 服务，待启动成功后，将会出现如下界面，填入上一步中获取的初始密码。
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610032514726-4a86eb2c-95f6-4fee-bc98-47034c5e25dc.png)
   4. 安装完默认的插件后，还需安装 nodejs 插件。访问 `http://localhost:8080/pluginManager/available` 网址，如下图所示安装。
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610037375398-a85c533d-e45d-4398-afad-f981a27c36ff.png)
      1. 配置 nodejs 插件。访问 `http://localhost:8080/configureTools/` 网址，进入全局工具配置页面。请选择 nodejs 15.3.0 版本，并将 `nodejs 15.3.0` 填入 NodeJS 别名栏中。
         ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610038248343-4540c959-20cf-4717-b656-4d04f0d554c6.png)
         > 注意：这里的 nodjes 版本要和 [Jenkinsfile](Jenkinsfile) 中的 nodejs 版本一致。您也可安装最新版本的 nodejs，但需要相应更改 Jenkinsfile 中的配置。
2. 在 Jenkins 中配置阿里云和 pulumi 密钥。
   1. 访问 `https://app.pulumi.com/hryang/settings/tokens`，为 jenkins 生成 pulumi token。
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610067429403-0ead7af9-dabd-4fa9-be11-e080e7b8e416.png)
   2. 访问 `http://localhost:8080/credentials/store/system/domain/_/newCredentials`，为 `PULUMI_ACCESS_TOKEN` 配置 Jenkins credential。如下图所示，"类型"选择 Secret text，“Secret” 填入上一步获取的 pulumi token。这样，您在后续的 Jenkinsfile 中，可以用凭证 id 来代表 pulumi token，避免泄漏。
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610067757229-6dd5fbe0-4f75-4600-8400-64d20f3f9746.png)
   3. 重复上述步骤，为 `ALICLOUD_ACCESS_KEY`, `ALICLOUD_SECRET_KEY` 配置 Jenkins credentials。 
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610068033776-b9e0d12e-fa33-4048-9405-d822a34fd706.png)
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610068186006-f5009d10-6d83-473c-b25a-ba59783317a7.png)
3. 在 github 中，fork [pulumi-jenkins-example](https://github.com/hryang/pulumi-jenkins-example) 项目。
   ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610064328310-793fde1e-629a-482a-8fe2-b75203ad33b5.png)
4. 在 Jenkins 中连接 github repo。
   1. 访问 `http://localhost:8080/blue/organizations/jenkins/pipelines` 网址，创建流水线。
   2. 选择 github 代码仓库，根据提示创建 github access token ，连接 github 仓库。
      ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610063690378-c85c11f6-d83c-49b2-b9c8-cde51edb9a09.png)
   3. 根据提示，选择 github 的 repo，创建流水线。 由于 pulumi-jenkins-example repo 中已经包含了 Jenkinsfile 文件，当 repo 连接成功后，Jenkins 会自动根据 Jenkinsfile 中的定义创建流水线，并触发流水线任务。
   4. 首次运行流水线任务会失败，这是由于原始 Jenkinsfile 中的 `ALICLOUD_ACCESS_KEY`, `ALICLOUD_SECRET_KEY`, `PULUMI_ACCESS_TOKEN` 需要更新为第二步中设置的密钥。
      1. 访问 `http://localhost:8080/credentials/store/system/domain/_/`, 获取相关凭证的 id
         ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610081643961-0986d850-09f1-4036-a67b-43bec44a5322.png)
      2. 将凭证 id 更新到 [Jenkinsfile](Jenkinsfile)中
         ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610081788605-0d03e458-6ffb-4191-a609-3a8b62749b72.png)
      3. git commit & push 更新后的 Jenkinsfile 到 github 仓库。后续的流水线任务就能成功运行。
   5. 访问网址 `http://localhost:8080/job/pulumi-jenkins-example/configure`，设置每隔一分钟扫描一次 github repo 变更。这样 jenkins 服务能够感知到代码仓库的变化。
       ![](https://cdn.nlark.com/yuque/0/2021/png/995498/1610082409450-16fb0c47-8127-4e4f-8a7a-59503d54c28f.png)
