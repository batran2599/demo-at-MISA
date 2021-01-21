class ManagementEmployees extends ManagementPage {
    constructor(urlAPI = null, method = "GET", tableSelector = "", configTable = {}) {
        super(urlAPI, method, tableSelector, configTable);
        this.dialog = new Dialog_tdb("http://api.manhnv.net", "/api/customers");
        this.filterDepartment = new DropDown_tdb(".department-filter", "departmentName", {}, {});
        this.filterQualification = new DropDown_tdb(".qualification-filter", "departmentName", {}, {});
    }

    /**
     * Làm mới lại bảng dữ liệu Nhân viên
     */
    RefreshTable() {
        this.configAjax = {
            async: false
        };
        super.refreshTable();
    }

    openFilter() {

    }

    /**
     * Tạo các sự kiện phục vụ mở dialog
     */
    dialogEmployees() {
        this.dialog.onOfDialogForm();
        this.dialog.valiDate();
        this.dialog.sendDialog();
        this.dialog.menuCustomerGroup("http://api.manhnv.net/api/customergroups");
        this.dialog.recordId = this.recordId.attrName == undefined ? "recordId" : this.recordId.attrName;
    }
}

