// Get All Contacts for Display 
// Method : Get 

axios.get(`${BaseURL}/api/GetAllContactDetails`)
    .then((res) => {
        AddContact(res.data);
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });



//Append Contacts To Frontend Table 

AddContact = (res) => {
    let AppendData = '';
    const AlertTable = document.querySelector('#contactDetails');
    const UpdateContactForm = document.querySelector('.AlertEdit');
    res.forEach(function (contact, index) {
        AppendData += ` <tr>
        <td class="text-muted"> ${contact.addressLine_one} </td>
        <td class="text-muted">${contact.addressLine_Two}</div></td>
        <td class="text-muted"> ${contact.addressLocation} </td>
        <td class="text-muted"> ${contact.contact}</td>
        <td class="text-muted">${contact.contact_description}</td>
        <td class="text-muted">${contact.email}</td>
       
    </tr>`
    })
    AlertTable.innerHTML = AppendData;

    document.getElementById('validationCustom03').value = res[0].addressLine_one
    document.getElementById('validationCustom04').value = res[0].addressLine_Two
    document.getElementById('validationCustom05').value = res[0].addressLocation
    document.getElementById('validationCustom06').value = res[0].contact
    document.getElementById('validationCustom07').value = res[0].contact_description
    document.getElementById('validationCustom08').value = res[0].email

    document.getElementById('validationCustom09').value = res[0].id


    // LoadEditDelete();
    UpdateContact();

}



// Post Edited Alerts 

UpdateContact = () => {

    UpdateAlertForm = document.querySelector('.ContactFormEdit');
    UpdateAlertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('k');
        var addressLine_one = document.getElementById('validationCustom03').value
        var addressLine_Two = document.getElementById('validationCustom04').value
        var addressLocation = document.getElementById('validationCustom05').value
        var contact = document.getElementById('validationCustom06').value
        var contact_description = document.getElementById('validationCustom07').value
        var email = document.getElementById('validationCustom08').value
        var id = document.getElementById('validationCustom09').value

        console.log(addressLine_Two + addressLine_Two);
        if (addressLine_one != "" && addressLine_Two != "" && addressLocation != "" && contact != "" && contact_description != "" && email != "") {

            axios.post(`${BaseURL}/UpdateContact`, {
                addressLine_one: addressLine_one,
                addressLine_Two: addressLine_Two,
                addressLocation: addressLocation,
                contact: contact,
                contact_description: contact_description,
                email: email,
                id: id
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
                        axios.get(`${BaseURL}/api/GetAllContactDetails`)
                            .then((res) => {
                                AddContact(res.data);
                                console.log(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
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
