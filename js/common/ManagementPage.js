class ManagementPage extends Table_tdb{
    /**
     * Chạy constructor của đối tượng Table_tdb để truy xuất tới đối tượng bảng cần thay đổi và cấu hình các thông số cho bảng đó và
     * lưu địa chỉ API cũng như kiểu truyền dẫn phục vụ cho việc get data thông qua API
     * @param {*} urlAPI Địa chỉ API
     * @param {*} method Phương thức truyền dẫn
     * @param {*} tableSelector css selector bảng cần hiển thị
     * @param {*} configTable đối tượng cấu hình tên cột, kiểu filter và loại dữ liệu cần lấy
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    constructor(urlAPI = null, method = "GET", tableSelector = "", configTable = {}) {
        super(tableSelector, configTable);
        this.urlAPI = urlAPI;
        this.method = method;
    } 

    /**
     * Load dữ liệu cho bảng quản lý
     * CreatedBy: Trần Duy Bá (30/12/2020)
     */
    loadDataForTable() {
        try {
            this.setDataWithAPI(this.urlAPI, this.method);
        } catch(e) {
            console.log("Có lỗi !");
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
            console.log("Có lỗi !");
        }
    }


}