package com.a105.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class AwsS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3 s3Client;

    public String uploadFile(MultipartFile file, String dirFileName) {
        File fileObj = convertMultiPartFileToFile(file);
//        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String fileUrl = putS3(fileObj, dirFileName);
        fileObj.delete();
//        return "File uploaded : " + dirFileName;
        return fileUrl;
    }

    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucket, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String putS3(File uploadFile, String dirFileName){
        s3Client.putObject(new PutObjectRequest(bucket, dirFileName, uploadFile));
        return s3Client.getUrl(bucket, dirFileName).toString();
    }


    public String deleteFile(String fileName) {
        s3Client.deleteObject(bucket, fileName);
        return fileName + " removed ...";
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}
