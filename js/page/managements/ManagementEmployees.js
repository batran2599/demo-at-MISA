class ManagementEmployees extends ManagementPage {
    constructor(urlAPI = null, method = "GET", tableSelector = "", configTable = {}) {
        super(urlAPI, method, tableSelector, configTable);
        this.dialog = new Dialog_tdb("http://api.manhnv.net", "/api/customers");
        this.data = [
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
        this.filterDepartment = new DropDown_tdb(".department-filter", "departmentName", {title: "restaurantName", value: "restaurantCode"});
        this.filterQualification = new DropDown_tdb(".qualification-filter", "departmentName", {title: "restaurantName", value: "restaurantCode"});
    }

    /**
     * Làm mới lại bảng dữ liệu Nhân viên
     */
    refreshTable() {
        this.configAjax = {
            async: false
        };
        super.refreshTable();
    }

    loadFilter() {
        this.filterDepartment.setDataWithAPI("http://api.manhnv.net/api/customergroups");
        this.filterDepartment.create();

        this.filterQualification.setDataWithAPI("http://api.manhnv.net/api/customergroups");
        this.filterQualification.create();
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

