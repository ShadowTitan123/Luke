// Get All alerts for Display 
// Method : Get 

axios.get(`${BaseURL}/api/GetAllAlerts`)
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
                <a type="button"  class="btn btn-danger btn-sm mr-2"> <i class="fa fa-trash" id="AlertDelete" title ="${alert.id}"> </i> </a>
                <a type="button" id="AlertEdit" title ="${alert.id}" class="btn btn-outline-primary btn-sm">Edit</a>
            </td>
        </tr>`
    })

    AlertTable.innerHTML = AppendData;
    LoadEditDelete();

}

function LoadEditDelete() {
// Delete Alerts 
document.getElementById('AlertDelete').addEventListener('click', (e) => {

        const alertid = e.target.attributes.title.value; 
        console.log(alertid);
            // axios.delete(`${BaseURL}/api/DeleteAlert`, {
            //     data: {
            //         alertId: ID
        
            //     }
            // })
            //     .then((res) => {
            //         console.log(res.data);
            //         ShowMessage(res.data);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        
        
        
        })
}

