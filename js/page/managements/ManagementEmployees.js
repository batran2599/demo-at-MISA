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

        this.host = "http://localhost:56447"
        /**
         * Cấu hình hiển thị filter phòng ban
         */
        this.endPointAPIGetDepartmentFilter = "/api/v1/departments";
        this.filterDepartment = null;

        /**
         * Cấu hình hiển thị filter chức vụ
         */
        this.endPointAPIGetQualificationFilter = "/api/v1/positions";
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

        this.urlAPIForFilterDepartment = "/api/v1/employees/byDepartmentId";
        this.inputNameOfFilterDepartment = "departmentFilter";

        this.urlAPIForFilterPosition = "/api/v1/employees/byPositionId";
        this.inputNameOfFilterPosition = "qualificationFilter";
    }

    /**
     * Cài đặt hiển thị cho bảng dữ liệu
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    loadTable() {
        this.urlAPI = this.host + "/api/v1/employees";  // API lấy dữ liệu thông tin nhân viên
        this.method = "GET"; // Phương thức gửi API
        this.tableSelector = ".data-table"; // Selector truy xuất với bảng chứa dữ liệu
        this.recordId = {attrName: "employeeId", fieldName: "employeeId"}; // Cấu hình recordId để add recordId cho từng row
        this.configTable = { // Cấu hình hiển thị khi show dữ liệu vào bảng
            employeeCode: {
                titleColumn: "Mã nhân viên", // Tiêu đề cột
                filterName: Filter.type.general // Tên loại filter
            },
            fullName: {
                titleColumn: "Họ tên",
                filterName: Filter.type.general
            },
            gender: {
                titleColumn: "Giới tính",
                filterName: Filter.type.gender
            },
            dateOfBirth: {
                titleColumn: "Ngày sinh",
                filterName: Filter.type.formatDate
            },
            phoneNumber: {
                titleColumn: "Số điện thoại",
                filterName: Filter.type.general
            },
            email: {
                titleColumn: "Email",
                filterName: Filter.type.general
            },
            positionName: {
                titleColumn: "Chức vụ",
                filterName: Filter.type.general
            },
            departmentName: {
                titleColumn: "Phòng ban",
                filterName: Filter.type.general
            },
            basicSalary: {
                titleColumn: "Mức lương hiện tại",
                filterName: Filter.type.convertMoney
            },
            workStatus: {
                titleColumn: "Tình trạng công việc",
                filterName: Filter.type.workStatus
            }
        }; 
    }

    /**
     * Cài đặt hiển thị cho các menu filter
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    loadFilter() {
        this.filterDepartment = new DropDown_tdb(".department-filter", this.inputNameOfFilterDepartment, {title: "departmentName", value: "departmentId"});
        this.filterDepartment.setDataWithAPI(this.host + this.endPointAPIGetDepartmentFilter, "GET", {async: false});
        this.filterDepartment.addOption({
            departmentName: "Tất cả phòng ban",
            departmentId: "all"
        });
        this.filterDepartment.create("all");
        this.filterByDepartment();

        this.filterQualification = new DropDown_tdb(".qualification-filter", this.inputNameOfFilterPosition, {title: "positionName", value: "positionId"});
        this.filterQualification.setDataWithAPI(this.host + this.endPointAPIGetQualificationFilter, "GET", {async: false});
        this.filterQualification.addOption({
            positionName: "Tất cả vị trí",
            positionId: "all"
        });
        this.filterQualification.create("all");
        this.filterByPosition();
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
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    dialogEmployees() {
        this.dialog.host = this.host;
        this.dialog.endPointAPIFind = "/api/v1/employees";
        this.dialog.endPointAPIGetDepartment = "/api/v1/departments";
        this.dialog.endPointAPIGetQualification = "/api/v1/positions";
        this.dialog.urlAPIUpdate = "/api/v1/employees";
        this.dialog.urlAPICreate = "/api/v1/employees";
        this.dialog.urlAPIDelete = "/api/v1/employees";
        this.dialog.urlAPIGetLastEmployeeCode = "/api/v1/employees/getLastEmployeeCode";
        this.dialog.setMenuDropdown();
        this.dialog.recordId = this.recordId.attrName == undefined ? "recordId" : this.recordId.attrName;
        this.dialog.actionRefreshTable = ()=>{this.refreshTable()};
    }

    filterByDepartment() {
        let departmentId = null;
        $(".department-filter .tdb-list-option").on("click", ".tdb-option", ()=>{
            departmentId = $(`input[name=${this.inputNameOfFilterDepartment}]`).val();
            if(departmentId != "all") {
                this.setDataWithAPI(this.host + this.urlAPIForFilterDepartment + "/" + departmentId);
            } else {
                this.loadDataForTable();
            }
        });
    }

    filterByPosition() {
        let positionId = null;
        $(".qualification-filter .tdb-list-option").on("click", ".tdb-option", ()=>{
            positionId = $(`input[name=${this.inputNameOfFilterPosition}]`).val();
            if(positionId != "all") {
                this.setDataWithAPI(this.host + this.urlAPIForFilterPosition + "/" + positionId);
            } else {
                this.loadDataForTable();
            }
        });
    }
}

