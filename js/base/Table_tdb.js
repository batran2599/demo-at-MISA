class Table_tdb {

    constructor (tableSelector = "", configTable = {}) {
        this.tableSelector = tableSelector;
        this.configTable = configTable;
    }

    /**
     * Đặt tên cột cho bảng
     * @param {Array} listTitleColumn Mảng chứa lần lượt tên các cột trong bảng
     */
    SetTitleForColumn(listTitleColumn) {
        let listTh = "";
        $.each(listTitleColumn, (index, value)=>{
            listTh += `<th>${value.CName}</th>`;
        });
        $(`${this.tableSelector} > thead`).append(`<tr>${listTh}</tr>`);
    };

    /**------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Hàm giúp truyền dữ liệu vào trong bảng (Table tag)
     * @param {string} urlAPI  Đường dẫn API
     * @param {string} method Phương thức truyền dẫn dữ liệu GET, POST, ...
     * @param {object} configTable Đối tượng chứa các property trong đó: tên property tương ứng với property trong đối tượng dữ liệu được nhận về qua API, giá trị property tương ứng với tên cột
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    SetDataForTable(urlAPI, method, configTable) {
        $.ajax({
            url: urlAPI,
            method: method
        }).done((res)=>{
            this.SetTitleForColumn(configTable);
            let rowData = "";
            let tdTag = "";
            $.each(res, (index, itemRow)=>{ // Lặp qua từng dòng dữ liệu được lấy từ API
                $.each(configTable, (indexTd)=>{ // Lặp qua thông tin cấu hình của bảng để lấy thuộc tính tương ứng với từng dòng data và tên của cột data tương ứng
                    if(this.ListFilter[configTable.indexTd.FName] !== undefined) { // Kiểm tra xem loại dữ liệu hiện tại có dùng đến filter không có thì dùng Filter tương ứng còn không thì thôi
                        tdTag += `<td>${Filter[configTable.indexTd.FName](itemRow[indexTd])}</td>`;
                    } else {
                        tdTag += `<td>${itemRow[indexTd]}</td>`;
                    }
                });
                rowData = `<tr>${tdTag}</tr>`;
                tdTag = "";
                $(`${this.tableSelector} > tbody`).append(rowData);
            });
        }).fail(function(){
            alert("Lỗi !");
        });
    }

}