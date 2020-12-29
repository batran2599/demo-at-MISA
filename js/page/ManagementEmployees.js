class ManagementEmployees extends Table_tdb{
    constructor(urlAPI, method, tableSelector, configTabel) {
        super(tableSelector, configTabel);
        this.urlAPI = urlAPI;
        this.method = method;
        this.configTabel = configTabel;
        this.LoadDataForTable();
    }

    /**
     * Load dư liệu cho bảng quản lý nhân viên
     */
    LoadDataForTable() {
        this.SetDataForTable(this.urlAPI, this.method, this.configTabel);
    }

    /**
     * Load lại dữ liệu trong bảng
     */
    RefreshTable() {
        $(`${this.tableSelector} > tbody > tr`).remove();
        $(`${this.tableSelector} > thead > tr`).remove();
        this.LoadDataForTable();
    }


}

// Cấu hình cho việc đẩy data vào bảng
let ManaEmployees = new ManagementEmployees();
ManaEmployees.urlAPI = "http://api.manhnv.net/api/employees";
ManaEmployees.method = "GET";
ManaEmployees.tableSelector = ".data-table";
ManaEmployees.configTabel = {
    EmployeeCode: {
        CName: "Mã nhân viên", // Tiêu đề cột
        FName: Filter.Type.General // Tên filter
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

document.getElementsByClassName("refresh")[0].onclick = ManaEmployees.RefreshTable.bind(ManaEmployees); // Xét sự kiện cho button Refresh

new DropDown_tdb("tdb-display-option", "tdb-option"); // Xét sự kiện cho dropdown