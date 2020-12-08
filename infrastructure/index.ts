import * as pulumi from "@pulumi/pulumi";
import * as alicloud from "@pulumi/alicloud";

// Create an AliCloud resource (OSS Bucket)
const bucket = new alicloud.oss.Bucket("my-bucket");

const service = new alicloud.fc.Service("pulumi-jenkins", {
    logConfig: {
        project: "fc-demo-hangzhou",
        logstore: "demo",
    },
    role: "acs:ram::1986114430573743:role/aliyunfcgeneratedrole-cn-hangzhou-demo",
})

// Export the name of the bucket
export const bucketName = bucket.id;
