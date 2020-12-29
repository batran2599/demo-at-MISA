function Table_tdb(tableSelector) {

    this.tableSelector = tableSelector;

    /**-------------------------------------------------------------------------------------------------------------------------------------------
     * Hàm giúp truyền dữ liệu vào trong bảng (Table tag)
     * @param {string} urlAPI  Đường dẫn API
     * @param {string} method Phương thức truyền dẫn dữ liệu GET, POST, ...
     * @param {object} listProperty Đối tượng chứa các property lần lượt là các property trong đối tượng dữ liệu tương ứng với mỗi dòng trong bảng
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.SetDataForTable = function(urlAPI, method, listProperty) {
        $.ajax({
            url: urlAPI,
            method: method
        }).done((res)=>{
            let rowData = "";
            $.each(res, (index, item)=>{
                rowData = `
                    <tr>
                        <td>${Filter.General(item[listProperty[0]])}</td>
                        <td>${Filter.General(item[listProperty[1]])}</td>
                        <td>${Filter.GenderCheckBox(item[listProperty[2]])}</td>
                        <td>${Filter.FormatDate(item[listProperty[3]])}</td>
                        <td>${Filter.General(item[listProperty[4]])}</td>
                        <td>${Filter.General(item[listProperty[5]])}</td>
                        <td>${Filter.General(item[listProperty[6]])}</td>
                        <td>${Filter.General(item[listProperty[7]])}</td>
                        <td>${Filter.ConvertMoney(item[listProperty[8]])}</td>
                        <td>${Filter.General(item[listProperty[9]])}</td>
                        <td>${Filter.General(item[listProperty[10]])}</td>
                    </tr>
                `;
                tdData = "";
                console.log(this.tableSelector)
                $(`${this.tableSelector} > tbody`).append(rowData);
            });
        }).fail(function(){
            alert("Lỗi !");
        });
    }

    /**
     * Đặt tên cột cho bảng
     * @param {Array} listTitleColumn Mảng chứa lần lượt tên các cột trong bảng
     */
    this.SetTitleForColumn = function(listTitleColumn) {
        let listTh = "";
        listTitleColumn.forEach((value)=>{
            listTh += `<th>${value}</th>`;
        });
        $(`${this.tableSelector} > thead`).append(`<tr>${listTh}</tr>`);
    };
}