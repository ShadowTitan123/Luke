// Get All alerts for Display 
// Method : Get 

axios
  .get(`./admin/Links/api/GetAllAlerts`)
  .then((res) => {
    AddAlert(res.data);
  })
  .catch((err) => {
    console.log(err);
  });



//Append Alerts To Client Side 

AddAlert = (res) => {
    let AppendData = '';
    const AlertTable = document.querySelector('#getAlertApi');
    res.forEach(function (alert, index) {
        AppendData += `<tr>
            <td class="text-center text-muted">${alert.id}</td>
            <td class="text-muted">${alert.alert_title}</td>
            <td class="text-muted">${alert.alert_Date}</td>
            <td class="text-muted">  <a href="${alert.alert_file_path}">  <i class="fa fa-file">     </i> </a> </td>
            <td class="text-center">
                <div class="badge badge-success">Active</div>
            </td>
            <td class="text-center d-flex">
                <a type="button"  class="btn btn-danger btn-sm mr-2"> <i class="fa fa-trash AlertDelete" title ="${alert.id}"> </i> </a>
                <a type="button" title ="${alert.id}" class="btn btn-outline-primary btn-sm AlertEdit" data-toggle="modal" data-target="#editAlerts">Edit</a>
            </td>
        </tr>`
    })

    AlertTable.innerHTML = AppendData;
    LoadEditDelete();
    UpdateAlerts();

}

function LoadEditDelete() {


    const alert_delete = document.querySelectorAll('.AlertDelete');
    const alert_edit = document.querySelectorAll('.AlertEdit');



    // Delete Alerts 
    alert_delete.forEach(function (alertid, index) {  // Lopping because its a list 
        alertid.addEventListener('click', (e) => {
            console.log(e.target);
            const alertid = e.target.attributes.title.value; //Get Alert id
            console.log(alertid);
            axios.delete(`${BaseURL}/DeleteAlert`, {
                data: {
                    alertId: alertid

                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === true) {
                        axios.get(`${BaseURL}/api/GetAllAlerts  `) // Calling all alerts for display after deletion
                            .then((res) => {
                                AddAlert(res.data);
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

    alert_edit.forEach(function (alertid, index) {  // Lopping because its a list 
        alertid.addEventListener('click', (e) => {
            const alertid = e.target.attributes.title.value; //Get Alert id
            console.log(alertid);
            document.getElementById('validationCustom03Edit').value = '';
            document.getElementById('validationCustom04Edit').value = '';
            document.getElementById('filepath').setAttribute("data", '');
            axios.get(`${BaseURL}/api/GetAlertById/${alertid}`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.exists === true) {

                        document.getElementById('GetAlertID').value = res.data.data[0].id;;
                        document.getElementById('validationCustom03Edit').value = res.data.data[0].alert_title;
                        document.getElementById('validationCustom04Edit').value = res.data.data[0].alert_Date;

                        // Getting The Text File 
                        fetch(res.data.data[0].alert_file_path)
                            .then(function (response) {
                                response.text().then(function (text) {  // converting the response text(i.e our file) to text format in order to append to textarea
                                    storedText = text;
                                    done(); // Callback
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                        function done() {
                            document.getElementById('filepath').value = storedText;  // Append Text Fetched from file to text area
                        }


                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        })

    });


}


// Post Edited Alerts 

UpdateAlerts = () => {

    UpdateAlertForm = document.querySelector('#alertFormEdit');
    UpdateAlertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var Title = document.getElementById("alertFormEdit").elements[0].value;
        var AlertDate = document.getElementById("alertFormEdit").elements[1].value;
        var FileContent = document.getElementById("alertFormEdit").elements[2].value;
        var AlertID = document.getElementById("alertFormEdit").elements[3].value;  // Getting alertid from hidden field


        console.log(Title + " " + FileContent + " " + AlertDate + " " + AlertID);
        if (Title != "" && AlertDate != "" && AlertID != "") {



            axios.post(`${BaseURL}/UpdateAlert`, {
                Title: Title,
                AlertDate: AlertDate,
                FileContent: FileContent,
                AlertID: AlertID
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
