import * as pulumi from "@pulumi/pulumi";
import * as alicloud from "@pulumi/alicloud";

// Create an AliCloud resource (OSS Bucket)
const bucket = new alicloud.oss.Bucket("my-bucket");

const service = new alicloud.fc.Service("pulumi-jenkins");

// Export the name of the bucket
export const bucketName = bucket.id;
export const serviceName = service.id;
