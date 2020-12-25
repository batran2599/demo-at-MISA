function GetDataForTable(tableSelector, urlAPI, method, listProperty) {
    $.ajax({
        url: urlAPI,
        method: method
    }).done(function(res){
        let rowData = "";
        $.each(res, function(index, item){
            rowData = `
                <tr>
                    <td>${Filter.General(item[listProperty[0]])}</td>
                    <td>${Filter.General(item[listProperty[1]])}</td>
                    <td>${Filter.Gender(item[listProperty[2]])}</td>
                    <td>${Filter.BirthDay(item[listProperty[3]])}</td>
                    <td>${Filter.General(item[listProperty[4]])}</td>
                    <td>${Filter.General(item[listProperty[5]])}</td>
                    <td>${Filter.General(item[listProperty[6]])}</td>
                    <td>${Filter.General(item[listProperty[7]])}</td>
                    <td>${Filter.ConvertMoney(item[listProperty[8]])}</td>
                    <td>${Filter.General(item[listProperty[9]])}</td>
                    <td>${Filter.General(item[listProperty[10]])}</td>
                </tr>
            `;
            tdData = "";
            $(`${tableSelector} > tbody`).append(rowData);
        });
    }).fail(function(){
        console.log("Lỗi !");
    });
}

function LoadData() {
    GetDataForTable(".data-table", "http://api.manhnv.net/api/employees", "GET", [
        "EmployeeCode",
        "FullName",
        "Gender",
        "DateOfBirth",
        "PhoneNumber",
        "Email",
        "QualificationName",
        "DepartmentName",
        "Salary",
        "Address",
        "WorkStatusName"
    ]);
}

window.onload = function(){
    LoadData();
};