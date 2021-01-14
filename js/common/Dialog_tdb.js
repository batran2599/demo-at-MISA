class Dialog_tdb {
    /**
     * Cấu hình API để phục vụ gửi dữ liệu
     * @param {URL} host Địa chỉ host lấy data
     * @param {String} endPoin router lấy data
     */
    constructor(host = "", endPoin = ""){
        this.host = host;
        this.endPoin = endPoin;
        this.customerGroup = new DropDown_tdb(".customer-group-list", "customerGroupId", {title: "CustomerGroupName", value: "CustomerGroupId"});
    }

    /**
     * Tạo sự kiện bật tắt dialog
     */
    onOfDialogForm() {
        $(".add-customer").click(function(){
            $(".tdb-dialog").css("display", "block");
        });
        
        $(".cancel-dialog").click(function(){
            $(".tdb-dialog").css("display", "none");
            ManaCustomers.RefreshTable();
        });
    
        $(".data-table > tbody").on("click", "tr", function(){
            $(".tdb-dialog").css("display", "block");
        });
    }

    /**
     * Tạo validate cho các thành phần yêu cầu bắt buộc nhập
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    valiDate() {
        Validate_tdb.Required(".input-dialog > input[required]");

        Validate_tdb.Email(".input-dialog > input[type=email]");
    }

    menuCustomerGroup(apiCustomerGroup) {
        this.customerGroup.SetDataWithAPI(apiCustomerGroup);
    }

    /**
     * Sự kiện thực hiện gửi dữ liệu qua API
     */
    sendDialog() {
        $(".save-dialog").click(function(){
            $.each($('input[required], input[type=email]'), function(){
               $(this).trigger("blur");
            });
        
            if($('input[validate="false"]').length > 0) {
                $.each($('input[validate="false"]'), function(){
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
                    url: this.host + this.endPoin,
                    method: "POST",
                    data: JSON.stringify(infoCustomer),
                    contentType: "application/json"
                }).done(function(res){
                    alert("Thêm thành công !");
                    ManaCustomers.RefreshTable();
                }).fail(function(res){
                    console.log(res);
                });
            }
        });
    }
}