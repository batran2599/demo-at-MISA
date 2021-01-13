class Dialog extends Validate{
    constructor(){
        this.host = "http://api.manhnv.net/";
        this.endPoin = "";
    }

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

    valiDate() {
        this.Required(".input-dialog > input[required]");

        this.Email(".input-dialog > input[type=email]");
    }

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