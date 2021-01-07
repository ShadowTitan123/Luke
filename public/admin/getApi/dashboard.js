(function alerts() {
    console.log("alerts")
    axios
  .get(`${BaseURL}/api/GetAllAlerts`)
  .then((res) => {
      console.log(res.data);
      let test = res.data;
      let test1 = test.slice(Math.max(test.length - 2, 0)) // get lastest 2 rows from array
     console.log(test1)
    AddAlert(test1);
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
            
        </tr>`
    })

    AlertTable.innerHTML = AppendData;
}

   
})();


(function Enquiries() {
    console.log("Enquiries");
    axios.get(`${BaseURL}/api/GetAllEnquiries`)
    .then((res) => {
        let test = res.data;
        let test1 = test.slice(Math.max(test.length - 2, 0)) // get lastest 2 rows from array
       console.log(test1)
        AddEnquiry(test1);
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
            <a type="button"  id="PopoverCustomT-1" class="btn btn-primary btn-sm" href="mailto:direct@lukebowmanlaw.com?Subject=Replying To : ${enq.subject}">Reply</a>
        </td>
    </tr>`
    })

    AlertTable.innerHTML = AppendData;
}
})();


(function UsefulLinks() {
    console.log("Links");
    axios.get(`${BaseURL}/api/GetAllLinks`)
    .then((res) => {
        console.log(res.data);
        let test = res.data;
        let test1 = test.slice(Math.max(test.length - 2, 0)) // get lastest 2 rows from array
       console.log(test1)
        AddLinks(test1);
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
      
    </tr>`
    })

    AlertTable.innerHTML = AppendData;
}
})();


(function Counts() {
    console.log("Counts");
    axios
    .get(`${BaseURL}/api/GetHomepageCounts`)
    .then((res) => {
        console.log(res.data);
        const results = res.data

       document.getElementById('a1').innerHTML = results[0].AlertCount ;
       document.getElementById('a2').innerHTML = results[1].LinksCount ;
       document.getElementById('a3').innerHTML = results[2].enquiresCount ;
    })
    .catch((err) => {
      console.log(err);
    });


})();