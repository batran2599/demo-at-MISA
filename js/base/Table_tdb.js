class Table_tdb {
    /**
     * Khởi tạo các dữ liệu cần thiết
     * @param {*} tableSelector // Selector của bảng muốn hiển thị dữ liệu
     * @param {*} configTable // Đối tượng cấu hình cho việc hiển thị bảng và lấy dữ liệu từ đối tượng chứa dữ liệu có format:
     * configTable = {
     *      Tên_property_chứa_data_cần_lấy : {
     *          CName: "Tiêu đề cột tương ứng",
     *          FName: "Tên Filter muốn dùng" // có thể lấy trong đối tượng Filter.Type.Loại_filter
     *      }
     * }
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    constructor (tableSelector = "", configTable = {}) {
        this.tableSelector = tableSelector;
        this.configTable = configTable;
        this.configAjax = {};
        this.recordId = null;
        this.loader = new Loader_tdb();
    }

    /**
     * Đặt tiêu đề cho cột trong bảng
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    SetTitleForColumn() {
        let listTh = "";
        $.each(this.configTable, (index, value)=>{
            listTh += `<th>${value.CName}</th>`;
        });
        $(`${this.tableSelector} > thead`).append(`<tr>${listTh}</tr>`);
    };

    /**
     * -------------------------------------------------------------------
     * Lấy dữ liệu thông qua API rồi đẩy vào bảng
     * @param {string} urlAPI  Đường dẫn API
     * @param {string} method Phương thức truyền dẫn dữ liệu GET, POST, ...
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    SetDataWithAPI(urlAPI, method) {
        this.loader.Create();
        $.ajax({
            url: urlAPI,
            method: method,
            ...this.configAjax
        }).done((res)=>{
            this.SetDataForTable(res);
        }).fail(function(){
            this.loader.Remove();
            alert("Lỗi khi lấy dữ liệu cho bảng !");
        });
    }

    /**
     * -----------------------------------------------------------------------------------------------
     * Nhận dữ liệu truyền vào dưới dạng Object sau đó đẩy vào bảng thông qua hàm SetDataForTable(data): 
     * @param {Object} data Object có format
     * data =  {
     *      any: {
     *          property: value,
     *          ...
     *      },
     *      ...
     * };
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    SetDataWithObjData(data = null) {
        this.loader.Create();
        if(data !== null) {
            this.SetDataForTable(data);
        }
    }

    /**
     * ---------------------------------------------
     * Nhận vào dữ liệu và hiển thị lên bảng dữ liệu
     * @param {*} data 
     * data =  {
     *      any: {
     *          property: value,
     *          ...
     *      },
     *      ...
     * };
     * CreatedBy: Trần Duy Bá (24/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    SetDataForTable(data) {
        this.RemoveTitleColumn();
        this.RemoveContentTable()
        this.SetTitleForColumn();
        let rowData = "";
        let tdTag = "";
        $.each(data, (index, itemRow)=>{ // Lặp qua từng dòng dữ liệu
            $.each(this.configTable, (indexTd)=>{ // Lặp qua thông tin cấu hình của bảng để lấy thuộc tính tương ứng với từng dòng data và tên của cột data tương ứng
                if(this.configTable[indexTd]["FName"] !== undefined) { // Kiểm tra xem loại dữ liệu hiện tại có dùng đến filter không có thì dùng Filter tương ứng còn không thì thôi
                    tdTag += `<td>${Filter[this.configTable[indexTd]["FName"]](itemRow[indexTd])}</td>`;
                } else {
                    tdTag += `<td>${itemRow[indexTd]}</td>`;
                }
            });
            if(this.recordId == null){
                rowData = `<tr>${tdTag}</tr>`;
            } else {
                if(this.recordId.attrName != undefined) {
                    rowData = `<tr ${this.recordId.attrName}="${itemRow[this.recordId.fieldName]}">${tdTag}</tr>`;
                } else {
                    rowData = `<tr recordId="${itemRow[this.recordId.fieldName]}">${tdTag}</tr>`;
                }
            }
            tdTag = "";
            $(`${this.tableSelector} > tbody`).append(rowData);
        });
        this.loader.Remove();
    }

    /**
     * Xóa tiêu đề cột
     */
    RemoveTitleColumn() {
        $(`${this.tableSelector} > thead > tr`).remove();
    }
    
    /**
     * Xóa dữ liệu của bảng
     */
    RemoveContentTable() {
        $(`${this.tableSelector} > tbody > tr`).remove();
    }

}