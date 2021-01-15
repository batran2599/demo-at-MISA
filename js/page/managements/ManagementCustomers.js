class ManagementCustomers extends ManagementPage {
    constructor() {
        super();
        this.dialog = new Dialog_tdb("http://api.manhnv.net", "/api/customers");
    }

    /**
     * Làm mới lại bảng dữ liệu khách hàng
     */
    RefreshTable() {
        this.configAjax = {
            async: false
        };
        super.RefreshTable();
        $(this.tableSelector + " > thead > tr > th").css("text-align", "left");
        $(this.tableSelector + " > tbody > tr > td").css("text-align", "left");
    }

    /**
     * Tạo các sự kiện phục vụ mở dialog
     */
    dialogCustomer() {
        this.dialog.onOfDialogForm();
        this.dialog.valiDate();
        this.dialog.sendDialog();
        this.dialog.menuCustomerGroup("http://api.manhnv.net/api/customergroups");
        this.dialog.recordId = this.recordId.attrName == undefined ? "recordId" : this.recordId.attrName;
    }
}
