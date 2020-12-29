/**---------------------------------------------------------
 * Đối tượng chứa các method phục vụ cho việc format dữ liệu
 * CreatedBy: Trần Duy Bá (24/12/2020)
 */
function Filter() {
    /**---------------------------------------------------------------
     * Chuyển đổi các dữ liệu từ dạng chống, null sang dạng text "..."
     * @param {any} value Bất kỳ kiểu dữ liệu gì 
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.General = function(value) {
        if(value == "" || value == null) {
            return "...";
        }
        return value;
    }
    
    /**--------------------------------------------------------------------------
     * Chuyển đổi giới tính từ dạng số sáng dạng dữ 0 = Nam, 1 = Nữ, 2 = Khác, 3, null, ... = Không xác định thứ 3
     * @param {int} gender Các số 0,1,2 hoặc 3 
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.Gender = function(gender) {
        if(gender == 0) {
            return "Nam";
        } else if(gender == 1) {
            return "Nữ"
        } else if(gender == 2) {
            return "Khác";
        }
        return "Không xác định";
    }

    this.GenderCheckBox = function(gender) {
        if(gender == 0) {
            return "<input type='checkbox' checked />";
        }
        return "<input type='checkbox' />";
    }

    /**--------------------------------------------------
     * Chuyển dữ liệu ngày tháng thô sang dạng dd/MM/yyyy
     * @param {any} date Bất kể kiểu dữ liệu gì
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.FormatDate = function(_date) {
        let date = new Date(_date);
        if(!Number.isNaN(date.getTime())) {
            let day = date.getDate() + 1;
            day = day < 10 ? "0" + day : day;
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return day + "/" + month + "/" + year;
        } else {
            return "...";
        }
    }

    /**-------------------------------------------------------------------
     * Định dạng dãy số về dạng tiền tệ cứ 3 số ngăn cách nhau bởi dấu ","
     * @param {float} value Số có độ dài bất kỳ 
     * @param {string} typeMoney Ký hiệu tiền tệ 
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.ConvertMoney = function(value, typeMoneyBefore = "", typeMoneyAfter = "") {
        value = this.General(value);
        if(value != "...") {
            let money = value.toString();
            let localOfDot = money.indexOf(".");
            let moneyLeft = "";
            let moneyRight = "";
            if(localOfDot >= 0) {
                moneyLeft = money.substr(0, localOfDot);
                moneyRight = money.splice(localOfDot);
            } else {
                moneyLeft = money;
            }
            moneyLeft = moneyLeft.split("");
            let length = moneyLeft.length;
            let step = Math.floor(length / 3) ; // Tính số lần nhảy thêm dấu ","

            if(length%3 == 0)
                step -= 1;

            let index = length; // Đặt vị trí bắt đầu nhảy ở cuối chuỗi
            for(let i = 0; i < step; i++) {
                index -= 3; // Do sau mỗi lần thêm dấu "," thì độ dài chuỗi sẽ tăng lên => tắng độ dài bước nhảy lên
                moneyLeft.splice(index, 0, ",");
            }
            
            return typeMoneyBefore + moneyLeft.join("") + moneyRight + typeMoneyAfter; // Nối phần nguyên trước và sau sấu "," lại với nhau
        }
        return value;
    }

}

var Filter = new Filter();