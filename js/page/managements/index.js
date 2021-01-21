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


let pageNow = {};

/**
 * Đặt sự kiện khi click chọn danh mục quản lý khách hàng
 * CreatedBy: Trần Duy Bá (31/12/2020)
 */
$("#customersList").click(function() {
    /**
     * ------------------------------------------------------------------
     * Cấu hình cho đối tượng quản lý dữ liệu cho bảng quản lý khách hàng
     * ------------------------------------------------------------------
     * */
    pageNow = new ManagementCustomers();
    pageNow.urlAPI = "http://api.manhnv.net/api/customers";
    pageNow.method = "GET";
    pageNow.tableSelector = ".data-table";
    pageNow.recordId = {attrName: "customerId", fieldName: "CustomerId"};
    pageNow.configTable = {
        CustomerCode: {
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
        Address: {
            titleColumn: "Địa chỉ",
            filterName: Filter.type.general
        },
        CompanyName: {
            titleColumn: "Tên công ty",
            filterName: Filter.type.general
        },
        CustomerGroupName: {
            titleColumn: "Tên nhóm khách hàng",
            filterName: Filter.type.general
        }
    };

    $("#titleManagementPage").text("Quản lý khách hàng")
    pageNow.RefreshTable();
    pageNow.dialogCustomer();

    document.getElementsByClassName("refresh")[0].onclick = pageNow.RefreshTable.bind(pageNow); // Xét sự kiện cho button Refresh
});

/**
 * Đặt sự kiện khi click chọn danh mục quản lý nhân viên
 * CreatedBy: Trần Duy Bá (31/12/2020)
 */
$("#employeesList").click(function() { 

    // Xóa sự kiện click nút thêm khách hàng
    $(".add-customer").unbind();

    /**
     * -----------------------------------------------------------------
     * Cấu hình cho đối tượng quản lý dữ liệu cho bảng quản lý nhân viên
     * -----------------------------------------------------------------
     * */
    pageNow = new ManagementEmployees();
    pageNow.urlAPI = "http://api.manhnv.net/api/employees";
    pageNow.method = "GET";
    pageNow.tableSelector = ".data-table";
    pageNow.recordId = {attrName: "employeeId", fieldName: "EmployeeId"};
    pageNow.configTable = {
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

    $("#titleManagementPage").text("Quản lý nhân viên")
    pageNow.refreshTable();

    // document.getElementsByClassName("refresh")[0].onclick = pageNow.RefreshTable.bind(pageNow); // Xét sự kiện cho button Refresh
});