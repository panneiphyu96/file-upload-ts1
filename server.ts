import fs from "fs";
import multer from "multer";
import express from "express";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import {listBucketContents} from "./libs/fileManager";


const app = express();
const port = 3000;
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,"uploads/");
    },
    filename: function (req: any,file: any,cb: any) {
        cb(null,Date.now() + "-" + file.originalname);
    },
});
// const img = [{ name: "img1", imgurl: ""},
// { name: "", imgurl: ""}];

app.use(express.static("public"));
app.use(express.json());
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
    storage: multerS3({
      //@ts-ignore
      s3,
      bucket: 'msquarefdc',
      acl: 'public-read',
      key: function (req: any, file: any, cb: any) {
        console.log(file);
        cb(null, "pann-ei-phyu/" + file.originalname);
      }
    })
  }).array('files', 1);

//   app.post("/upload",function(req,res,){
//     upload(req,res,(error) => {
//         if(error){
//             console.log(error);
//             return res.send({message: "Uploaded error occur"});
    
//         }
//         console.log("File Uploaded Successfully");
//         res.send({message: "File Uploaded Successfully"});
//     })
   
// });

app.post("/upload", (req, res) => {
  upload(req, res, async (error: any) => {
    if (error) {
      console.log(error);
      return res.send({ error: "Error occurred." });
    }
    console.log("File uploaded successfully.");
    const bucketContents: any = await listBucketContents();
    res.send({
      message: "File uploaded successfully.",
      data: bucketContents.Contents,
    });
  });
});

// app.post("/appendImages", (req,res) => {
//   res.send(data);
// });

// app.get("/getImage",(req,res,) =>{
//   res.send(contents);
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});