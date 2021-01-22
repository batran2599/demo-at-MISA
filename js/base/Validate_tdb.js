class Validate_tdb {

    /**
     * Tạo cảnh báo yêu cầu bắt buộc nhập với các thẻ input nhập liệu
     * @param {String} selectorInput Tên class của các thẻ input có yêu cầu bắt buộc nhập
     * @param {Object} styleWarning Style cảnh báo cho input
     * CreatedBy: Trần Duy Bá 12/01/2021
     */
    static required(selectorInput = null, styleWarning = {borderColor: "#F65454"}) {
        $(selectorInput).blur(function(){
            if(!$(this).val()) {
                $(this).attr("title", "Không được để trống");
                $.each(styleWarning, (index, value)=>{
                    this.style[index] = value;
                });
                $(this).attr("validate", "false");
            } else {
                $(this).removeAttr("title");
                $(this).removeAttr("style");
                $(this).removeAttr("validate");
            }
        });
    }

    /**
     * Kiểm tra email đúng định dạng Không
     * @param {string} email Email cần kiểm tra định dạng
     * @param {Object} styleWarning Style cảnh báo cho input
     * CopyIn: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     * EditBy: Trần Duy Bá (12/01/2021)
     */
    static email(selectorInput, styleWarning = {borderColor: "#F65454"}) {
        $(selectorInput).blur(function(){
            if(this.value != "") {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let check = re.test(String($(this).val()).toLowerCase());
                if(!check) {
                    $(this).attr("title", "Email không hợp lệ");
                    $.each(styleWarning, (index, value)=>{
                        this.style[index] = value;
                    });
                    $(this).attr("validate", "false");
                } else {
                    $(this).removeAttr("title");
                    this.style = "";
                }
            } else {
                $(this).removeAttr("title");
                $(this).removeAttr("style");
                $(this).removeAttr("validate");
            }
        });
    }

    /**
     * Kiểm tra chuỗi ngày tháng truyền vào có đúng định dạng không
     * @param {Date} date Chuỗi ngày tháng truyền vào
     * @param {Object} styleWarning Style cảnh báo cho input
     * CreatedBy: Trần Duy Bá
     */
    static date(date, styleWarning = {borderColor: "#F65454"}) {
        
    }
}