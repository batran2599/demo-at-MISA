class ManagementCustomers extends ManagementPage{
    RefreshTable() {
        this.configAjax = {
            async: false
        };
        super.RefreshTable();
        $(this.tableSelector + " > thead > tr > th").css("text-align", "left");
        $(this.tableSelector + " > tbody > tr > td").css("text-align", "left");
    }
}

/**
 * ------------------------------------------------------------------
 * Cấu hình cho đối tượng quản lý dữ liệu cho bảng quản lý khách hàng
 * ------------------------------------------------------------------
 * */
let ManaCustomers = new ManagementCustomers();
ManaCustomers.urlAPI = "http://api.manhnv.net/api/customers";
ManaCustomers.method = "GET";
ManaCustomers.tableSelector = ".data-table";
ManaCustomers.configTable = {
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

/**
 * Đặt sự kiện khi click chọn danh mục quản lý khách hàng
 * CreatedBy: Trần Duy Bá (31/12/2020)
 */
$("#customersList").click(function() {

    $("#titleManagementPage").text("Quản lý khách hàng")
    ManaCustomers.RefreshTable();

    document.getElementsByClassName("refresh")[0].onclick = ManaCustomers.RefreshTable.bind(ManaCustomers); // Xét sự kiện cho button Refresh
});