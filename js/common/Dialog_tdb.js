class Dialog_tdb {
    /**
     * Cấu hình API để phục vụ gửi dữ liệu
     * @param {URL} host Địa chỉ host lấy data
     * @param {String} endPoin router lấy data
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    constructor(){
        this.listGender = null;

        this.host = "http://localhost:56447";

        this.urlAPIFind = this.host + "/api/v1/employees";
        
        this.urlAPIQualification = this.host + "/api/v1/positions";
        this.listQualification = null;

        this.urlAPIDepartment = this.host + "/api/v1/departments";
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
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    openDialog() {
        $(".tdb-dialog").css("display", "block");
    }

    /**
     * Ẩn dialog
     * CreatedBy: Trần Duy Bá (23/01/2021)
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
            $(".input-dialog > input[name='employeeCode']").focus();
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
     * CreatedBy: Trần Duy Bá (23/01/2021)
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
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    formatSalary() {
        let salary = 0;
        $(".input-dialog > input[name='salary']").keyup(function(){
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
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setMenuDropdown() {
        this.setListGender();
        this.setListQualification();
        this.setListDepartment();
        this.setListWorkStatus();
    }

    /**
     * Cài đặt hiển thị cho danh sách lựa chọn giới tính
     * CreatedBy: Trần Duy Bá (23/01/2021)
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

        this.listGender = new DropDown_tdb(".gender", "gender", {title: "genderName", value: "genderCode"}, data);
        this.listGender.create();
    }

    /**
     * Cài đặt hiển thị cho danh sách lựa chọn chức vụ
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setListQualification() {
        this.listQualification = new DropDown_tdb(".qualification", "qualitification", {title: "positionName", value: "positionId"});
        this.listQualification.setDataWithAPI(this.urlAPIQualification, "GET", {async: false});
    }

    /**
     * Cài đặt hiển thị cho danh sách phòng ban
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setListDepartment() {
        this.listDepartment = new DropDown_tdb(".department", "department", {title: "departmentName", value: "departmentId"});
        this.listDepartment.setDataWithAPI(this.urlAPIDepartment, "GET", {async: false});
    }

    /**
     * Cài đặt hiển thị cho danh sách tình trạng công việc
     * CreatedBy: Trần Duy Bá (23/01/2021)
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
            },
            {
                statusName: "Thử việc",
                statusCode: 2
            }
        ];

        this.listWorkStatus = new DropDown_tdb(".work-status", "WorkStatus", {title: "statusName", value: "statusCode"}, data);
        this.listWorkStatus.create();
    }

    /**
     * Load dữ liệu của cho dialog và focus option cho các menu
     * @param {Object} data Dữ liệu cần load cho dialog
     * CreatedBy: Trần Duy Bá (15/01/2021)
     */
    setDialog(data) {
        $.each(data, (index, value)=>{
            switch(index) {
                case "basicSalary":
                    $(`.tdb-dialog .input-dialog > input[name="${index}"]`).val(Filter.convertMoney(value));
                break;
                case "gender":
                    this.listGender.chooseOption(value);
                break;
                case "departmentId":
                    this.listDepartment.chooseOption(value);
                break;
                case "positionId":
                    this.listQualification.chooseOption(value);
                break;
                case "workStatus":
                    this.listWorkStatus.chooseOption(value);
                break;
                case "dateOfBirth":
                case "createdDateOfIdentityCard":
                case "dateOfJoin":
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
                    if(this.name != "gender") {
                        infoCustomer[this.name] = this.value;
                    } else {
                        infoCustomer[this.name] =  $('.tdb-dialog input[name="gender"]:checked').val();
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