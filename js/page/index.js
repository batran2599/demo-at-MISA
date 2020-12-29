function LoadData() {
    let _Table = new Table_tdb(".data-table");
    _Table.SetTitleForColumn([
        "Mã nhân viên",
        "Họ tên",
        "Giới tính",
        "Ngày sinh",
        "Số điện thoại",
        "Email",
        "Chức vụ",
        "Phòng ban",
        "Mức lương hiện tại",
        "Địa chỉ",
        "Tình trạng làm việc"
    ]);
    _Table.SetDataForTable("http://api.manhnv.net/api/employees", "GET", [
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
    console.log(_Table);
}

/**
 * Load lại dữ liệu trong bảng
 */
function Refresh() {
    $(".data-table > tbody > tr").remove();
    $(".data-table > thead > tr").remove();
    LoadData();
};

window.onload = function(){
    LoadData();
    $(".refresh").click(Refresh);
};