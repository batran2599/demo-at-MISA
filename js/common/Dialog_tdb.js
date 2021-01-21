class Dialog_tdb {
    /**
     * Cấu hình API để phục vụ gửi dữ liệu
     * @param {URL} host Địa chỉ host lấy data
     * @param {String} endPoin router lấy data
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    constructor(host = "", endPoint = ""){
        this.host = host;
        this.endPoint = endPoint;
        this.customerGroup = new DropDown_tdb(".customer-group-list", "customerGroupId", {title: "CustomerGroupName", value: "CustomerGroupId"});
        this.loader = new Loader_tdb();
        this.recordId = "recordId";
    }

    /**
     * Tạo sự kiện bật tắt dialog
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    onOfDialogForm() {
        $(".add-customer").click(function(){
            $(".tdb-dialog").css("display", "block");
        });
        
        $(".cancel-dialog").click(function(){
            $(".tdb-dialog").css("display", "none");
            // ManaCustomers.RefreshTable();
        });
        
        let that = this;
        $(".data-table > tbody").on("click", "tr",function(){
            that.findObject($(this).data(that.recordId));
            $(".tdb-dialog").css("display", "block");
        });
    }

    /**
     * Tạo validate cho các thành phần yêu cầu bắt buộc nhập
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    valiDate() {
        Validate_tdb.required(".input-dialog > input[required]");

        Validate_tdb.email(".input-dialog > input[type=email]");
    }

    /**
     * 
     * @param {url} apiCustomerGroup Địa chỉ API lấy dữ liệu về nhóm khách hàng để tạo menu dropdown
     */
    menuCustomerGroup(apiCustomerGroup) {
        this.customerGroup.setDataWithAPI(apiCustomerGroup);
    }

    /**
     * Load dữ liệu của cho dialog
     * @param {Object} data Dữ liệu cần load cho dialog
     * CreatedBy: Trần Duy Bá (15/01/2021)
     */
    setDialog(data) {
        $.each(data, (index, value)=>{
            $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(value);
        });
    }

    /**
     * Tìm kiếm đối bản ghi theo Id
     * @param {String} id Khóa tìm kiếm 
     * CreatedBy: Trần Duy Bá (15/01/2021)
     */
    findObject(id) {
        console.log(this.host + this.endPoint + "/" + id);
        this.loader.Create();
        $.ajax({
            url: this.host + this.endPoint + "/" + id,
            method: "GET",
        }).done((res)=>{
            this.loader.Remove();
            this.setDialog(res);
        }).fail((res)=>{
            console.log(res);
        });
    }

    /**
     * Sự kiện thực hiện gửi dữ liệu qua API
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    sendDialog() {
        $(".save-dialog").click(()=>{
            $.each($('input[required], input[type=email]'), ()=>{
               $(this).trigger("blur");
            });
        
            if($('input[validate="false"]').length > 0) {
                $.each($('input[validate="false"]'), ()=>{
                    $(this).trigger("blur");
                });
                $('input[validate="false"]')[0].focus();
            } else {    
        
                let infoCustomer = {};
        
                let inputData = $(".tdb-dialog input");
                $.each(inputData, function(){
                    if(this.name != "Gender") {
                        infoCustomer[this.name] = this.value;
                    } else {
                        infoCustomer[this.name] =  $('.tdb-dialog input[name="Gender"]:checked').val();
                    }
                });
        
                $.ajax({
                    url: this.host + this.endPoint,
                    method: "POST",
                    data: JSON.stringify(infoCustomer),
                    contentType: "application/json"
                }).done((res)=>{
                    alert("Thêm thành công !");
                    // ManaCustomers.RefreshTable();
                }).fail((res)=>{
                    console.log(this.host + this.endPoint);
                    console.log(infoCustomer);
                    console.log(res);
                });
            }
        });
    }
}