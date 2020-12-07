import * as pulumi from "@pulumi/pulumi";
import * as alicloud from "@pulumi/alicloud";

const name = "fc-hz-demo";
const bucket = new alicloud.oss.Bucket(name);

const service = new alicloud.fc.Service("pulumi-demo", {
    logConfig: {
        project: "fc-demo-hangzhou",
        logstore: "demo",
    },
    role: "acs:ram::1986114430573743:role/aliyunfcgeneratedrole-cn-hangzhou-demo",
})
