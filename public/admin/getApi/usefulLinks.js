// Get All Links for Display 
// Method : Get 

axios.get(`${BaseURL}/api/GetAllLinks`)
    .then((res) => {
        console.log(res.data);
        AddLinks(res.data);
    })
    .catch((err) => {
        console.log(err);
    });



//Append Alerts To Client Side 

AddLinks = (res) => {
    let AppendData = '';
    const AlertTable = document.querySelector('#getlinksapi');
    res.forEach(function (alert, index) {
        AppendData += ` <tr>
        <td class="text-center text-muted">${alert.id}</td>
        <td><div class="widget-heading">${alert.tag_name}</div></td>
        <td class="text-muted">${alert.title}</td>
        <td class="text-muted">${alert.link}</td>
        <td class="text-center">
            <div class="badge badge-success">Active</div>
        </td>
        <td class="text-center d-flex">
            <a type="button"  class="btn btn-danger btn-sm mr-2"><i class="fa fa-trash LinkDelBtn" title="${alert.id}"></i></a>
            <a type="button" title="${alert.id}" class="btn btn-outline-primary btn-sm LinkEditBtn" data-toggle="modal" data-target="#editLinks">Edit</a>
        </td>
    </tr>`
    })

    AlertTable.innerHTML = AppendData;
    LoadEditDelete();
    UpdateLinks();
    AddLinkFile();

}

function LoadEditDelete() {


    // const alert_delete = document.querySelectorAll('.AlertDelete');
    const link_edit = document.querySelectorAll('.LinkEditBtn');
    const alert_delete = document.querySelectorAll('.LinkDelBtn');



    //Delete Alerts 

    alert_delete.forEach(function (alertid, index) {  // Lopping because its a list 
        alertid.addEventListener('click', (e) => {
            console.log(e.target);
            const alertid = e.target.attributes.title.value; //Get Alert id
            console.log(alertid);
            axios.delete(`${BaseURL}/DeleteLink`, {
                data: {
                    alertId: alertid

                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === true) {
                        axios.get(`${BaseURL}/api/GetAllLinks  `) // Calling all alerts for display after deletion
                            .then((res) => {
                                AddLinks(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });

                    }

                })
                .catch((err) => {
                    console.log(err);
                });

        })

    })


    //Get Data For Edit 

    link_edit.forEach(function (alertid, index) {  // Lopping because its a list 
        alertid.addEventListener('click', (e) => {
            const alertid = e.target.attributes.title.value; //Get Link id
            console.log(alertid);
            document.getElementById('validationCustom03Edit').value = '';
            document.getElementById('validationCustom04Edit').value = '';
            document.getElementById('validationCustom05Edit').value = '';
            document.getElementById('validationCustom06Edit').value = '';
            axios.get(`${BaseURL}/api/GetLinkById/${alertid}`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.exists === true) {

                        document.getElementById('GetAlertID').value = res.data.data[0].id;;
                        document.getElementById('validationCustom03Edit').value = res.data.data[0].tag_name;
                        document.getElementById('validationCustom04Edit').value = res.data.data[0].title;
                        document.getElementById('validationCustom05Edit').value = res.data.data[0].link;
                        document.getElementById('validationCustom06Edit').value = res.data.data[0].status;

                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        })

    });


}


// Post Edited Alerts 

UpdateLinks = () => {

    UpdateAlertForm = document.querySelector('#alertFormEdit');
    UpdateAlertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var Tag = document.getElementById("alertFormEdit").elements[0].value;
        var Title = document.getElementById("alertFormEdit").elements[1].value;
        var Link = document.getElementById("alertFormEdit").elements[2].value;
        var status = document.getElementById("alertFormEdit").elements[3].value;
        var AlertID = document.getElementById("alertFormEdit").elements[4].value;


        console.log(Tag + " " + Title + " " + Link + " " + status + AlertID)
        if (Tag != "" && Title != "" && Link != "" && status != "" && AlertID != "") {

            axios.post(`${BaseURL}/UpdateLink`, {
                Tag: Tag,
                Title: Title,
                Link: Link,
                status: status,
                AlertID: AlertID,
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === true) {
                        Toastify({
                            text: res.data.message,
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
                    } else {
                        Toastify({
                            text: res.data.message,
                            duration: 4000,
                            newWindow: true,
                            close: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: 'center', // `left`, `center` or `right`
                            backgroundColor: "linear-gradient(to right, #00b09b, #e74c3c)",
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            onClick: function () {

                            } // Callback after click
                        }).showToast();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            Toastify({
                text: "Invalid Input",
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
    })



}



AddLinkFile = () => {

    UpdateAlertForm = document.querySelector('#addlinksform');

    UpdateAlertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        axios.post(`${BaseURL}/AddLink`, {

            Tag: document.getElementById("addlinksform").elements[0].value,
            Title :document.getElementById("addlinksform").elements[1].value,
            Link :document.getElementById("addlinksform").elements[2].value,
            status : document.getElementById("addlinksform").elements[3].value,
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === true) {
                    Toastify({
                        text: res.data.message,
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
                    axios.get(`${BaseURL}/api/GetAllLinks`)
                        .then((res) => {
                            AddLinks(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }else{
                    Toastify({
                        text: res.data.message,
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

            })
            .catch((err) => { console.log(err.message) });
    });



}