class Dialog_tdb {
    /**
     * Cấu hình API để phục vụ gửi dữ liệu
     * @param {URL} host Địa chỉ host lấy data
     * @param {String} endPoin router lấy data
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    constructor(){
        this.listGender = null;

        this.urlAPIFind = "http://api.manhnv.net/api/employees";
        
        this.urlAPIQualification = null;
        this.listQualification = null;

        this.urlAPIDepartment = null;
        this.listDepartment = null;

        this.urlAPIWorkStatus = null;
        this.listWorkStatus = null;

        this.loader = new Loader_tdb();
        this.recordId = "recordId"; // Tên record id mặc định, có thể cấu hình lại khi gọi (Đã được cấu hình lại bên ManagementEmployees.js)

        this.setMenuDropdown();
        this.formatSalary();

        this.typeDialog = null;
    }

    /**
     * Hiển thị dialog
     */
    openDialog() {
        $(".tdb-dialog").css("display", "block");
    }

    /**
     * Ẩn dialog
     */
    cancelDialog() {
        $(".tdb-dialog").css("display", "none");
        this.clearValueOfInput();
    }

    /**
     * Tạo sự kiện bật tắt dialog
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    onOfDialogForm() {
        $(".add-customer").click(()=>{
            this.openDialog();
            $(".input-dialog > input[name='EmployeeCode']").focus();
        });
        
        let that = this;
        $(".data-table > tbody").on("click", "tr",function(){
            that.findObject($(this).data(that.recordId));
            $(".tdb-dialog").css("display", "block");
        });

        $(".dialog-modal").click(()=>{
            this.cancelDialog();
        });
        
        $(".cancel-dialog").click(()=>{
            this.cancelDialog();
            // ManaCustomers.RefreshTable();
        });
    }

    /**
     * Làm sạch dữ liệu trong các thẻ input
     */
    clearValueOfInput() {
        $(".input-dialog > input").val("");
    }

    /**
     * Tạo validate cho các thành phần yêu cầu bắt buộc nhập
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    valiDate() {
        Validate_tdb.required(".input-dialog > input[required]");

        // Validate_tdb.email(".input-dialog > input[type=email]");
    }

    /**
     * Định dạng ô nhập tiền lương
     */
    formatSalary() {
        let salary = 0;
        $(".input-dialog > input[name='Salary']").keyup(function(){
            salary = $(this).val();
            while(salary.indexOf(",") > 0) {
                salary = salary.replace(",", "");
            }
            if(!Number.isNaN(Number(salary))) {
                $(this).val(Filter.convertMoney(salary,"","",false));
            }
        });
    }

    /**
     * Thực thi các hàm cài đặt hiển thị cho các menudropdown
     */
    setMenuDropdown() {
        this.setListGender();
        this.setListQualification();
        this.setListDepartment();
        this.setListWorkStatus();
    }

    /**
     * Cài đặt hiển thị cho danh sách lựa chọn giới tính
     */
    setListGender() {
        let data = [
            {
                genderName: "Nam",
                genderCode: 0
            },
            {
                genderName: "Nữ",
                genderCode: 1
            },
            {
                genderName: "Khác",
                genderCode: 2
            }
        ];

        this.listGender = new DropDown_tdb(".gender", "Gender", {title: "genderName", value: "genderCode"}, data);
        this.listGender.create();
    }

    /**
     * Cài đặt hiển thị cho danh sách lựa chọn chức vụ
     */
    setListQualification() {
        this.urlAPIQualification = "http://api.manhnv.net/api/customergroups";
        this.listQualification = new DropDown_tdb(".qualification", "Qualitification", {title: "CustomerGroupName", value: "CustomerGroupId"});
        this.listQualification.setDataWithAPI(this.urlAPIQualification);
    }

    // Cài đặt hiển thị cho danh sách phòng ban
    setListDepartment() {
        this.urlAPIDepartment = "http://api.manhnv.net/api/customergroups";
        this.listDepartment = new DropDown_tdb(".department", "Department", {title: "CustomerGroupName", value: "CustomerGroupId"});
        this.listDepartment.setDataWithAPI(this.urlAPIDepartment);
    }

    /**
     * Cài đặt hiển thị cho danh sách tình trạng công việc
     */
    setListWorkStatus() {
        let data = [
            {
                statusName: "Đã nghỉ",
                statusCode: 0
            },
            {
                statusName: "Đang làm",
                statusCode: 1
            }
        ];

        this.listWorkStatus = new DropDown_tdb(".work-status", "WorkStatus", {title: "statusName", value: "statusCode"}, data);
        this.listWorkStatus.create();
    }

    /**
     * Load dữ liệu của cho dialog
     * @param {Object} data Dữ liệu cần load cho dialog
     * CreatedBy: Trần Duy Bá (15/01/2021)
     */
    setDialog(data) {
        $.each(data, (index, value)=>{
            // if(index == "Salary") {
            //     $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(Filter.convertMoney(value));
            // } else if(index == "Gender") {
            //     this.listGender.chooseOption(value);
            // }else {
            //     $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(value);
            // }
            switch(index) {
                case "Salary":
                    $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(Filter.convertMoney(value));
                break;
                case "Gender":
                    this.listGender.chooseOption(value);
                break;
                case "DateOfBirth":
                case "IdentityDate":
                case "JoinDate":
                    $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(Filter.formatDate(value, "yyyy-mm-dd"));
                break;
                default:
                    $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(value);
            }
        });
    }

    /**
     * Tìm kiếm đối bản ghi theo Id
     * @param {String} id Khóa tìm kiếm 
     * CreatedBy: Trần Duy Bá (15/01/2021)
     */
    findObject(id) {
        console.log(this.urlAPIFind + "/" + id);
        this.loader.create();
        $.ajax({
            url: this.urlAPIFind + "/" + id,
            method: "GET",
        }).done((res)=>{
            this.loader.remove();
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