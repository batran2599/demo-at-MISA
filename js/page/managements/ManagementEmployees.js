class ManagementEmployees extends Table_tdb {

    /**
     * Chạy constructor của đối tượng Table_tdb để truy xuất tới đối tượng bảng cần thay đổi và cấu hình các thông số cho bảng đó và
     * lưu địa chỉ API cũng như kiểu truyền dẫn phục vụ cho việc get data thông qua API
     * @param {*} urlAPI Địa chỉ API
     * @param {*} method Phương thức truyền dẫn
     * @param {*} tableSelector css selector bảng cần hiển thị
     * @param {*} configTable đối tượng cấu hình tên cột, kiểu filter và loại dữ liệu cần lấy
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    constructor() {
        super();
        this.dialog = new Dialog_tdb();

        /**
         * Cấu hình hiển thị filter phòng ban
         */
        this.urlAPIDepartmentFilter = "http://api.manhnv.net/api/customergroups";
        this.filterDepartment = null;

        /**
         * Cấu hình hiển thị filter chức vụ
         */
        this.urlAPIQualificationFilter = "http://api.manhnv.net/api/customergroups";
        this.filterQualification = null;

        /**
         * Các dữ liệu cấu hình hiển thị bảng dữ liệu
         */
        this.urlAPI = null;  // API lấy dữ liệu thông tin nhân viên
        this.method = null; // Phương thức gửi API
        this.tableSelector = null; // Selector truy xuất với bảng chứa dữ liệu
        this.recordId = null; // Cấu hình recordId để add recordId cho từng row
        this.configTable = null; // Cấu hình hiển thị khi show dữ liệu vào bảng 
        this.loadTable(); // Thực thi cấu hình
    }

    /**
     * Cài đặt hiển thị cho bảng dữ liệu
     */
    loadTable() {
        this.urlAPI = "http://api.manhnv.net/api/employees";  // API lấy dữ liệu thông tin nhân viên
        this.method = "GET"; // Phương thức gửi API
        this.tableSelector = ".data-table"; // Selector truy xuất với bảng chứa dữ liệu
        this.recordId = {attrName: "employeeId", fieldName: "EmployeeId"}; // Cấu hình recordId để add recordId cho từng row
        this.configTable = { // Cấu hình hiển thị khi show dữ liệu vào bảng
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
    }

    /**
     * Cài đặt hiển thị cho các menu filter
     */
    loadFilter() {
        this.filterDepartment = new DropDown_tdb(".department-filter", "departmentFilter", {title: "CustomerGroupName", value: "CustomerGroupId"});
        this.filterDepartment.setDataWithAPI(this.urlAPIDepartmentFilter, "GET", {async: false});
        this.filterDepartment.addOption({
            CustomerGroupName: "Tất cả phòng ban",
            CustomerGroupId: "all"
        });
        this.filterDepartment.create("all");

        this.filterQualification = new DropDown_tdb(".qualification-filter", "qualificationFilter", {title: "CustomerGroupName", value: "CustomerGroupId"});
        this.filterQualification.setDataWithAPI(this.urlAPIQualificationFilter, "GET", {async: false});
        this.filterQualification.addOption({
            CustomerGroupName: "Tất cả vị trí",
            CustomerGroupId: "all"
        });
        this.filterQualification.create("all");
    }

    /**
     * Load dữ liệu cho bảng quản lý
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    loadDataForTable() {
        try {
            this.setDataWithAPI(this.urlAPI, this.method);
        } catch(e) {
            console.error("Có lỗi !");
        }
    }

    /**
     * Load lại dữ liệu trong bảng
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    refreshTable() {
        try {
            this.loadDataForTable();
        } catch(e) {
            console.error("Có lỗi !");
        }
    }

    /**
     * Tạo các sự kiện phục vụ mở dialog
     */
    dialogEmployees() {
        this.dialog.onOfDialogForm();
        this.dialog.valiDate();
        this.dialog.sendDialog();
        this.dialog.recordId = this.recordId.attrName == undefined ? "recordId" : this.recordId.attrName;
    }
}

