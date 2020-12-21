// Login Module 

const LoginForm = document.querySelector('#login-form');
if (LoginForm) {


    LoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Login();
    });
} else {

}

function Login() {
    console.log('Login');
    const email = LoginForm.elements.namedItem("email").value;
    const password = LoginForm.elements.namedItem("password").value;

    axios.post('http://localhost:5000/LoginAdmin', {
        email: email,
        password: password,
    })
        .then((res) => {
            if (res.data.Exists == true) {

                console.log(res.data);
                window.location = 'http://localhost:5000/dashboard.html';
            } else {
                console.log(res.data);
            }

        })
        .catch((err) => {
            console.log(err);
        })
}


//Alerts File Upload 

const alertForm = document.querySelector('#alertForm');

alertForm.addEventListener('submit', (e) => {

    e.preventDefault();
    AddAlertFile();
});

AddAlertFile = () => {
    var formData = new FormData();
    var imagefile = document.querySelector('#validationCustom05');
    formData.append("image", imagefile.files[0]);
    axios.post('http://localhost:5000/UploadAlertFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {

            console.log(res.data);

            axios.post('http://localhost:5000/StoreAlertDetails', {
                title: alertForm.elements.namedItem("a_title").value,
                date: alertForm.elements.namedItem("a_Date").value,
                path: res.data.path,
                newFileName: res.data.modified
            })
            .then((res)=>{
                console.log("data uploaded");
            })
            .catch((err)=>{
                console.log("data not uploaded");
            })

        })
        .catch((err)=>{

            console.log("Image not Uploaded ");
        })



}