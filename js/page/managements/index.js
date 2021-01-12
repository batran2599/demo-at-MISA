new DropDown_tdb("tdb-display-option-restaurant", "restaurant-name"); // Xét sự kiện cho dropdown loại page
new DropDown_tdb("tdb-display-option-customer-group", "customer-group"); // Xét sự kiện cho dropdown danh mục khách hàng trong form dialog

/**
 * Thực hiện các sự kiện ẩn hiện form dialog
 */
(function Dialog() {
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
})();

/**
 * Tạo cảnh báo yêu cầu bắt buộc nhập
 */
Validate.Required(".input-dialog > input[required]");

Validate.Email(".input-dialog > input[type=email]");


// Gửi dữ liệu
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
        let infoCustomer = {
            "CustomerCode": $('input[name="customerCode"]').val(),
            "FullName": $('input[name="fullName"]').val(),
            "Gender": 0,
            "Address": $('input[name="address"]').val(),
            "DateOfBirth": $('input[name="dateOfBirth"]').val(),
            "Email": $('input[name="email"]').val(),
            "PhoneNumber": $('input[name="phoneNumber"]').val(),
            "CustomerGroupId": "00000000-0000-0000-0000-000000000000",
            "MemberCardCode": $('input[name="memberCardCode"]').val(),
            "CompanyName": $('input[name="companyName"]').val(),
            "CompanyTaxCode": $('input[name="taxCode"]').val()
        };
        console.log(JSON.stringify(infoCustomer));
        $.ajax({
            url: "http://api.manhnv.net/api/customers",
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