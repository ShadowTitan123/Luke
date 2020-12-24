
// Global Variables Referencing Dom Elements 
var LoginForm = document.querySelector('#login-form');
var alertForm = document.querySelector('#alertForm');



//Login Module
if (LoginForm) {
    LoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Login();
    });
} else {
    //Continue 
}

function Login() {
    
    const email = LoginForm.elements.namedItem("email").value;
    const password = LoginForm.elements.namedItem("password").value;

    axios.post(`${BaseURL}/LoginAdmin`, {
        email: email,
        password: password,
    })
        .then((res) => {
            if (res.data.Exists === true) {

                console.log(res.data);
                window.location = `${BaseURL}/dashboard.html`;
            } else {
                console.log(res.data);
                if(res.data.Exists === false) {
                    Toastify({
                        text: "User Not Found / Incorrect Password",
                        duration: 4000,
                        newWindow: true,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: 'center', // `left`, `center` or `right`
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        onClick: function () {
                           
                        } // Callback after click
                    }).showToast();

                }
            }

        })
        .catch((err) => {
            console.log(err);
        })
}







//Alerts File Upload 
if (alertForm) {
    alertForm.addEventListener('submit', (e) => {

        e.preventDefault();
        AddAlertFile();
    });

} else {
    //continue
}

AddAlertFile = () => {
    var formData = new FormData();
    var imagefile = document.querySelector('#validationCustom05');
    formData.append("image", imagefile.files[0]);
    axios.post(`${BaseURL}/UploadAlertFile`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {

            console.log(res.data);

            axios.post(`${BaseURL}/StoreAlertDetails`, {
                title: alertForm.elements.namedItem("a_title").value,
                date: alertForm.elements.namedItem("a_Date").value,
                path: res.data.path,
                newFileName: res.data.filename,
                serverPath: res.data.modified
            })
                .then((res) => {
                    console.log(res.data);
                    
                    if (res.data.status === true) {
                        axios.get(`${BaseURL}/api/GetAllAlerts`)
                        .then((res) => {
                            AddAlert(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                        Toastify({
                            text: "Alert Details Uploaded",
                            duration: 4000,
                            newWindow: true,
                            close: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: 'center', // `left`, `center` or `right`
                            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            onClick: function () {
                                console.log('Uploaded')
                            } // Callback after click
                        }).showToast();
                        //    const getModel = document.getElementById('addAlerts');
                        //    getModel.remove();
                    } else {
                        Toastify({
                            text: "Failed to Upload alert Details",
                            duration: 4000,
                            newWindow: true,
                            close: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: 'center', // `left`, `center` or `right`
                            backgroundColor: "linear-gradient(to right, #00b09b, #b20a2c)",
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            onClick: function () {
                                console.log('Uploaded')
                            } // Callback after click
                        }).showToast();
                    }
                })
                .catch((err) => {
                    console.log(err + ":data not uploaded");
                })

        })
        .catch((err) => {
            // alert here 
            console.log(err + " : Image not Uploaded ");
            Toastify({
                text: "Failed to Upload File",
                duration: 4000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: 'center', // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #b20a2c)",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function () {
                    console.log('Uploaded    ')
                } // Callback after click
            }).showToast();
        })



}






