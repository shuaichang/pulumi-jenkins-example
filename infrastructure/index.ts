import * as alicloud from "@pulumi/alicloud";


// Create an AliCloud resource (OSS Bucket)
const bucket = new alicloud.oss.Bucket("my-bucket");

// Create the FC service
const service = new alicloud.fc.Service("pulumi-jenkins");

// Zip the local directory
const AdmZip = require("adm-zip");
const zipFile = new AdmZip();
zipFile.addLocalFile("../index.js");
const zipFileName = "code-" + randString(7) + ".zip";
const fs = require("fs");
fs.writeFileSync(zipFileName, zipFile.toBuffer());

// Create the FC function.
const func = new alicloud.fc.Function("my-function", {
    handler: "index.handler",
    runtime: "nodejs12",
    memorySize: 128,
    service: service.name,
    filename: zipFileName,
});

// Helper function.
function randString(length: number) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Export the name of the bucket
export const bucketName = bucket.id;
export const serviceName = service.id;
export const functionName = func.id;

// zip the code directory


