const inputTag = document.getElementById("uploadFile");
const uploadButton = document.getElementById("uploadButton");
const showUI = document.querySelector(".userInfo");
const myImages = document.getElementById("myImages");

const appendImages = async(myContents) => {

  for (let i = 0; i < myContents.length; i++) {
    const imgSrc = encodeURIComponent(myContents[i].Key)
    const imgDiv = document.createElement("Div");
    imgDiv.innerHTML=`
    <img src="https://msquarefdc.sgp1.digitaloceanspaces.com/${imgSrc}" width="200px" class="p-2"/>`
    myImages.append(imgDiv);
  }
};
const upload = async() => {
    uploadButton.innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Uploading...`;
    const inputTag = document.getElementById("uploadFile");
    console.log(inputTag.files[0])
    const file = inputTag.files[0];
    
    const formData = new FormData();

    formData.append("files",inputTag.files[0]);
    formData.append("files",inputTag.files[1]);
    console.log(formData);
    const response = await fetch("http://localhost:3000/upload",{
        method:"POST",
        body:formData,
    });
    const bucketContentsJSON = await response.json();
    const bucketContents = bucketContentsJSON.data;
    const myContents = bucketContents.filter((item) =>
        item.Key.includes("pann-ei-phyu")
        );
    // console.log(myContents);
    uploadButton.textContent = "Upload";

    // const data = await response.json();
    // console.log(data);
    console.log(myContents);
    appendImages(myContents);

};

// const getImage = async () => {
//     const response = await fetch("http://localhost:3000/getImage");
//     const getData = await response.json();
//     console.log(getData);
//     buildUI(getData);
// };

// const buildUI = (dataGet) => {
//     for (let i = 0; i < dataGet.length; i++) {
//         const userDiv = document.createElement("div");
//         userDiv.innerHTML = `<div class="card" style="width: 18rem;">
//         <img src="https://msquarefdc.sgp1.digitaloceanspaces.com/${dataGet[i].Key}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <p class="card-text">andTEAM</p>
//         </div>
//       </div>`;
//       showUI.append(userDiv);
//     }
 
// };
// getImage();
