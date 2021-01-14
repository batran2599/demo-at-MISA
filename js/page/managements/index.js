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
dropDownRestaurant.Create();


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
        Address: {
            CName: "Địa chỉ",
            FName: Filter.Type.General
        },
        CompanyName: {
            CName: "Tên công ty",
            FName: Filter.Type.General
        },
        CustomerGroupName: {
            CName: "Tên nhóm khách hàng",
            FName: Filter.Type.General
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

    $("#titleManagementPage").text("Quản lý nhân viên")
    pageNow.RefreshTable();

    document.getElementsByClassName("refresh")[0].onclick = pageNow.RefreshTable.bind(pageNow); // Xét sự kiện cho button Refresh
});