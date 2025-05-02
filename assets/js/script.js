//selecting all required elements
const dropArea = document.querySelector("#dropArea"), // Menggunakan ID
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input"),
  imageContainer = dropArea.querySelector(".image-container"); // Mendapatkan container gambar
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
};

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) {
        //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag
            let removeButton = `<button class="remove-btn">Hapus</button>`; // Membuat tombol hapus
            imageContainer.innerHTML = imgTag + removeButton; // Menambahkan gambar dan tombol ke container
            imageContainer.style.display = "block"; // Menampilkan container gambar

            // Menyembunyikan elemen-elemen awal
            dropArea.querySelector(".icon").style.display = "none";
            dropArea.querySelector("header").style.display = "none";
            dropArea.querySelector("span").style.display = "none";
            dropArea.querySelector("button").style.display = "none";

            dropArea.classList.remove("active");
            dragText.textContent = "Gambar Berhasil Diunggah";

            // Event listener untuk tombol hapus
            const removeBtn = imageContainer.querySelector(".remove-btn");
            removeBtn.addEventListener("click", () => {
                imageContainer.innerHTML = ""; // Menghapus gambar dan tombol
                imageContainer.style.display = "none"; // Menyembunyikan container

                // Menampilkan kembali elemen-elemen awal
                dropArea.querySelector(".icon").style.display = "block";
                dropArea.querySelector("header").style.display = "block";
                dropArea.querySelector("span").style.display = "block";
                dropArea.querySelector("button").style.display = "block";

                file = null; // Reset variabel file
                dropArea.classList.remove("active");
                dragText.textContent = "Drag & Drop to Upload File";
            });
        };
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}