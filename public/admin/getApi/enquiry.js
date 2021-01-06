// Get All Enquiries for Display 
// Method : Get 

axios.get(`${BaseURL}/api/GetAllEnquiries`)
    .then((res) => {
        AddEnquiry(res.data);
    })
    .catch((err) => {
        console.log(err);
    });



//Append Enquiries To Client Side 

AddEnquiry = (res) => {
    console.log(res);
    let AppendData = '';
    const AlertTable = document.querySelector('#getEnquiries');
    res.forEach(function (enq, index) {
        AppendData += `<tr>
        <td class="text-center text-muted">${enq.id}</td>
        <td><div class="widget-heading">${enq.name}</div></td>
        <td class="text-muted">${enq.subject}</td>
        <td class="text-muted">${enq.email}</td>
        <td class="text-muted">${enq.message}</td>
        <td class="text-center">
            <div class="badge badge-success">Replied</div>
        </td>
        <td class="text-center">
            <a type="button" title ="${enq.id}" href="" class="btn btn-danger btn-sm EnqDelete"><i class="fa fa-trash"></i></a>
            <a type="button"  id="PopoverCustomT-1" class="btn btn-primary btn-sm" href="mailto:direct@lukebowmanlaw.com?Subject=Replying To : ${enq.subject}">Reply</a>
        </td>
    </tr>`
    })

    AlertTable.innerHTML = AppendData;
    LoadEditDelete();

}

function LoadEditDelete() {


    const Enquiry_Delete = document.querySelectorAll('.EnqDelete');


    // Delete Alerts 
    Enquiry_Delete.forEach(function (enqid, index) {  // Lopping because its a list 
        enqid.addEventListener('click', (e) => {
            console.log(e.target);
            const alertid = e.target.attributes.title.value; //Get Alert id
            console.log(alertid);
            axios.delete(`${BaseURL}/DeleteEnquiry`, {
                data: {
                    enqid: alertid

                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === true) {
                        axios.get(`${BaseURL}/api/GetAllEnquiries  `) // Calling all alerts for display after deletion
                            .then((res) => {
                                AddEnquiry(res.data);
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

}