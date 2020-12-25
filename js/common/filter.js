function Filter() {

    // Chuyển đổi các dữ liệu từ dạng trống, null,
    this.General = function(value) {
        if(value == "" || value == null) {
            return "...";
        }
        return value;
    }
    
    // Chuyển đổi giới tính từ dạng số sáng dạng dữ 1 = Nam, 2 = Nữ, 3 = GT thứ 3
    this.Gender = function(gender) {
        if(gender == 0 || gender == null || gender == undefined) {
            return "..."
        } else if(gender == 1) {
            return "Nam";
        } else if(gender == 2) {
            return "Nữ"
        } else if(gender == 3) {
            return "GT số 3";
        }

        return "...";
    }

    // Convert lại kiểu ngày tháng từ định dạng 1999-05-02T00:00:00 sang 02/05/1999
    this.BirthDay = function(value) {
        let bDay = this.General(value); // Check xem chuỗi rỗng hay null không
        if(bDay != "...") {
            bDay = bDay.substr(0, 10);
            bDay = bDay.split("-");
            bDay = bDay[2] + "/" + bDay[1] + "/" + bDay[0]; // Ghép chuỗi
        }
        return bDay;
    }

    // Định dạng dãy số về dạng tiền tệ cứ 3 số ngăn cách nhau bởi dấu ,
    this.ConvertMoney = function(value) {
        value = this.General(value);
        if(value != "...") {
            let money = value.toString();
            let localOfDot = money.indexOf(".");
            let moneyInt = "0";
            if(localOfDot >= 0) {
                moneyInt = money.substr(0, localOfDot);
            } else {
                moneyInt = money;
            }
            moneyInt = moneyInt.split("");
            let length = moneyInt.length;
            let step = Math.floor(length / 3); // Tính số lần nhảy thêm dấu ","
            let index = length; // Đặt vị trí bắt đầu nhảy ở cuối chuỗi
            for(let i = 0; i < step; i++) {
                index -= 2 + i; // Do sau mỗi lần thêm dấu "," thì độ dài chuỗi sẽ tăng lên => tắng độ dài bước nhảy lên
                moneyInt.splice(index, 0, ",");
            }
            
            return moneyInt.join("") + money.substr(localOfDot); // Nối phần nguyên trước và sau sấu "," lại với nhau
        }
        return value;
    }

}

var Filter = new Filter();