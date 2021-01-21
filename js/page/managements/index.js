let data = [
    {
        "restaurantName": "Nhà hàng biển đông",
        "restaurantCode": "NH001"
    },
    {
        "restaurantName": "Nhà hàng biển tây",
        "restaurantCode": "NH002"
    },
    {
        "restaurantName": "Nhà hàng biển nam",
        "restaurantCode": "NH003"
    },
    {
        "restaurantName": "Nhà hàng biển bắc",
        "restaurantCode": "NH004"
    }
];

let dropDownRestaurant = new DropDown_tdb(".restaurant-list", "tdb-display-option-restaurant", {title: "restaurantName", value: "restaurantCode"}, data);
dropDownRestaurant.create();
/**
 * -----------------------------------------------------------------
 * Cấu hình cho đối tượng quản lý dữ liệu cho bảng quản lý nhân viên
 * -----------------------------------------------------------------
 * */
let pageManagementEmployees = new ManagementEmployees();
pageManagementEmployees.urlAPI = "http://api.manhnv.net/api/employees";
pageManagementEmployees.method = "GET";
pageManagementEmployees.tableSelector = ".data-table";
pageManagementEmployees.recordId = {attrName: "employeeId", fieldName: "EmployeeId"};
pageManagementEmployees.configTable = {
    EmployeeCode: {
        titleColumn: "Mã nhân viên", // Tiêu đề cột
        filterName: Filter.type.general // Tên loại filter
    },
    FullName: {
        titleColumn: "Họ tên",
        filterName: Filter.type.general
    },
    Gender: {
        titleColumn: "Giới tính",
        filterName: Filter.type.gender
    },
    DateOfBirth: {
        titleColumn: "Ngày sinh",
        filterName: Filter.type.formatDate
    },
    PhoneNumber: {
        titleColumn: "Số điện thoại",
        filterName: Filter.type.general
    },
    Email: {
        titleColumn: "Email",
        filterName: Filter.type.general
    },
    QualificationName: {
        titleColumn: "Chức vụ",
        filterName: Filter.type.general
    },
    DepartmentName: {
        titleColumn: "Phòng ban",
        filterName: Filter.type.general
    },
    Salary: {
        titleColumn: "Mức lương hiện tại",
        filterName: Filter.type.convertMoney
    },
    Address: {
        titleColumn: "Địa chỉ",
        filterName: Filter.type.general
    },
    WorkStatusName: {
        titleColumn: "Tình trạng công việc",
        filterName: Filter.type.general
    }
};
pageManagementEmployees.dialog = new Dialog_tdb("http://api.manhnv.net", "/api/customers");
pageManagementEmployees.filterDepartment = new DropDown_tdb(".department-filter", "departmentName", {title: "restaurantName", value: "restaurantCode"}, data);
pageManagementEmployees.filterQualification = new DropDown_tdb(".qualification-filter", "departmentName", {title: "restaurantName", value: "restaurantCode"}, data);
/**
 * Đặt sự kiện khi click chọn danh mục quản lý nhân viên
 * CreatedBy: Trần Duy Bá (31/12/2020)
 */
$("#employeesList").click(function() { 

    $("#titleManagementPage").text("Quản lý nhân viên")
    pageManagementEmployees.refreshTable();
    pageManagementEmployees.dialogEmployees();
    pageManagementEmployees.filterDepartment.create();
    pageManagementEmployees.filterQualification.create();

    document.getElementsByClassName("refresh")[0].onclick = pageManagementEmployees.RefreshTable.bind(pageManagementEmployees); // Xét sự kiện cho button Refresh
});