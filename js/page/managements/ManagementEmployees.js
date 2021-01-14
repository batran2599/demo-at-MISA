class ManagementEmployees extends ManagementPage {}

/**
 * -----------------------------------------------------------------
 * Cấu hình cho đối tượng quản lý dữ liệu cho bảng quản lý nhân viên
 * -----------------------------------------------------------------
 * */
let ManaEmployees = new ManagementEmployees();
ManaEmployees.urlAPI = "http://api.manhnv.net/api/employees";
ManaEmployees.method = "GET";
ManaEmployees.tableSelector = ".data-table";
ManaEmployees.recordId = {attrName: "employeeId", fieldName: "EmployeeId"};
ManaEmployees.configTable = {
    EmployeeCode: {
        CName: "Mã nhân viên", // Tiêu đề cột
        FName: Filter.Type.General // Tên loại filter
    },
    FullName: {
        CName: "Họ tên",
        FName: Filter.Type.General
    },
    Gender: {
        CName: "Giới tính",
        FName: Filter.Type.Gender
    },
    DateOfBirth: {
        CName: "Ngày sinh",
        FName: Filter.Type.FormatDate
    },
    PhoneNumber: {
        CName: "Số điện thoại",
        FName: Filter.Type.General
    },
    Email: {
        CName: "Email",
        FName: Filter.Type.General
    },
    QualificationName: {
        CName: "Chức vụ",
        FName: Filter.Type.General
    },
    DepartmentName: {
        CName: "Phòng ban",
        FName: Filter.Type.General
    },
    Salary: {
        CName: "Mức lương hiện tại",
        FName: Filter.Type.ConvertMoney
    },
    Address: {
        CName: "Địa chỉ",
        FName: Filter.Type.General
    },
    WorkStatusName: {
        CName: "Tình trạng công việc",
        FName: Filter.Type.General
    }
};

/**
 * Đặt sự kiện khi click chọn danh mục quản lý nhân viên
 * CreatedBy: Trần Duy Bá (31/12/2020)
 */
$("#employeesList").click(function() {

    $("#titleManagementPage").text("Quản lý nhân viên")
    ManaEmployees.RefreshTable();

    document.getElementsByClassName("refresh")[0].onclick = ManaEmployees.RefreshTable.bind(ManaEmployees); // Xét sự kiện cho button Refresh
});