import s3 from "../config/s3_config.js"
export const s3FIleUpload = async ({bucketName, key, body, contentType}) => { 
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}
export const s3deleteFIle = async ({bucketName, key, body, contentType}) => { 
    return await s3.deleteObject({
        Bucket: bucketName,
        Key: key,
    })
    .promise()
}
