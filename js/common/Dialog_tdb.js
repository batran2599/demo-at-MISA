class Dialog_tdb {
    /**
     * Cấu hình API để phục vụ gửi dữ liệu
     * @param {URL} host Địa chỉ host lấy data
     * @param {String} endPoin router lấy data
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    constructor(){
        this.listGender = null;

        this.host = null;

        this.urlAPICreate = null;
        this.urlAPIUpdate = null;
        this.urlAPIDelete = null;

        this.endPointAPIFind = null;
        
        this.endPointAPIGetQualification = null;
        this.listQualification = null;

        this.endPointAPIGetDepartment = null;
        this.listDepartment = null;

        this.urlAPIWorkStatus = null;
        this.listWorkStatus = null;

        this.loader = new Loader_tdb();
        this.recordId = "recordId"; // Tên record id mặc định, có thể cấu hình lại khi gọi (Đã được cấu hình lại bên ManagementEmployees.js)

        this.typeDialog = null;

        this.message = new Message_tdb();
        this.modal = new Modal_tdb();

        this.formatSalary();
        this.onOfDialogForm();
        this.setEventSendData();
        this.setEventDeleteData();
        this.valiDate();
        this.checkEmployeeCode();

        this.urlAPIGetLastEmployeeCode = null;
        this.valueRecordId = null;
        this.valueEmployeeCode = null;

        this.actionRefreshTable = ()=>{};
    }

    /**
     * Hiển thị dialog
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    openDialog() {
        $(".tdb-dialog").css("display", "block");
        if(this.typeDialog == "create") {
            $(".delete-dialog").css("display", "none");
        } else {
            $(".delete-dialog").css("display", "block");
        }
        this.valueEmployeeCode = $(".input-dialog > input[name='employeeCode']").val();
    }

    /**
     * Ẩn dialog
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    cancelDialog() {
        $(".tdb-dialog").css("display", "none");
        this.clearValueOfInput();
        this.actionRefreshTable = null;
        this.valueRecordId = null;
    }

    /**
     * Tạo sự kiện bật tắt dialog
     * CreatedBy: Trần Duy Bá (14/01/2021)
     */
    onOfDialogForm() {
        $(".add-customer").click(()=>{
            this.typeDialog = "create";
            $(".input-dialog > input[name='employeeCode']").focus();
            $(".input-dialog > input[name='employeeCode']").val(this.createEmployeeCode());
            this.openDialog();
        });
        
        let that = this;
        $(".data-table > tbody").on("click", "tr",function(){
            that.typeDialog = "update";
            that.valueRecordId = $(this).data(that.recordId);
            that.findObject(that.valueRecordId);
            that.openDialog();
        });

        $(".dialog-modal").click(()=>{
            this.cancelDialog();
        });
        
        $(".cancel-dialog").click(()=>{
            this.cancelDialog();
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

    }

    /**
     * Định dạng ô nhập tiền lương
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    formatSalary() {
        let salary = 0;
        $(".input-dialog > input[name='basicSalary']").keyup(function(){
            salary = $(this).val();
            while(salary.indexOf(".") > 0) {
                salary = salary.replace(".", "");
            }
            while(salary.indexOf(",") > 0) {
                salary = salary.replace(",", ".");
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
     * Cài đặt hiển thị cho danh sách lựa chọn chức vụ
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setListQualification() {
        this.listQualification = new DropDown_tdb(".qualification", "positionId", {title: "positionName", value: "positionId"});
        this.listQualification.setDataWithAPI(this.host + this.endPointAPIGetQualification, "GET", {async: false});
    }

    /**
     * Cài đặt hiển thị cho danh sách phòng ban
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setListDepartment() {
        this.listDepartment = new DropDown_tdb(".department", "departmentId", {title: "departmentName", value: "departmentId"});
        this.listDepartment.setDataWithAPI(this.host + this.endPointAPIGetDepartment, "GET", {async: false});
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
            url: this.host + this.endPointAPIFind + "/" + id,
            method: "GET",
            async: false
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
    setEventSendData() {
        $(".save-dialog").click(()=>{
            $(".input-dialog > input[name='employeeCode']").change();
            $.each($('input[required]'), function(){
               $(this).trigger("blur");
            });
        
            if($('input[validate="false"]').length > 0) {
                $.each($('input[validate="false"]'), function(){
                    $(this).trigger("blur");
                });
                $('input[validate="false"]')[0].focus();
                this.message.error("Dữ liệu không hợp lệ !");
            } else {    
                if(this.typeDialog == "update") {
                    this.modal.warning(()=>{this.sendData();}, "Cảnh báo", "Bạn muốn sửa bản ghi này chứ ?");
                } else {
                    this.sendData();
                }
            }
        });
    }

    /**
     * Sự kiện thực hiện xóa dữ liệu qua API
     * CreatedBy: Trần Duy Bá (25/01/2021)
     */
    setEventDeleteData() {
        $(".delete-dialog").click(()=>{
            this.deleteData();
        })
    }

    /**
     * Thực hiện gửi dữ liệu qua API
     * CreatedBy: Trần Duy Bá (24/01/2021)
     */
    sendData() {
        let that = this;
        let infoEmployee = {};
        
        let inputData = $(".tdb-dialog input");
        $.each(inputData, function(){
            if(this.name == "basicSalary") {
                infoEmployee[this.name] = that.convertNumber(this.value);
            } else if(this.type == "date" && this.value == "") {
                infoEmployee[this.name] = null;
            } else {
                infoEmployee[this.name] = this.value;
            }
        });
        if(this.typeDialog != null) {
            let url = null;
            let method = null;
            if(this.typeDialog == "update") {
                url = this.urlAPIUpdate;
                method = "PUT";
                infoEmployee["employeeId"] = this.valueRecordId;
            } else if(this.typeDialog == "create") {
                url = this.urlAPICreate;
                method = "POST";
            } else {
                this.message.error("Loại dialog không phù hợp");
            }
            if(url != null) {
                $.ajax({
                    url: this.host + url,
                    method: method,
                    data: JSON.stringify(infoEmployee),
                    contentType: "application/json",
                    async: false
                }).done((res)=>{
                    if(this.typeDialog == "create") {
                        this.message.done("Thêm nhân viên thành công !");
                    } else if(this.typeDialog  == "update") {
                        this.message.done("Chỉnh sửa thông tin thành công !");
                    }
                    this.actionRefreshTable();
                    this.cancelDialog();
                }).fail((res)=>{
                    console.log(res);
                    console.log(infoEmployee);
                    this.message.error("Thao tác không thành công !");
                });
            } else {
                this.message.error("Lỗi không gửi được dữ liệu !");
            }
        } 
    }

    /**
     * Xóa dữ liệu
     * CreatedBy: Trần Duy Bá (25/01/2021)
     */
    deleteData() {
        this.modal.warning(()=>{
            // 
            $.ajax({
                url: this.host + this.urlAPIDelete + "/" + this.valueRecordId,
                method: "DELETE",
                async: false
            }).done(()=>{
                this.message.done("Xóa dữ liệu thành công !");
                this.actionRefreshTable();
                this.cancelDialog();
            }).fail((res)=>{
                console.log(res);
                this.message.error("Xóa dữ liệu không thành công !");
            });
        }, "Cảnh báo", "Bạn có chắc muốn xóa nhân viên này không ? <br> Dữ liệu sẽ không thể khôi phục sau khi xóa !", "Hủy", "Xóa");
    }

    /**
     * Lấy mã nhân viên cuối cùng trong bảng dữ liệu và tăng thêm 1 để tạo mã nhân viên mới
     */
    createEmployeeCode() {
        let employeeCodeNow = null;
        let nextEmployeeCode = 0;
        $.ajax({
            url: this.host + this.urlAPIGetLastEmployeeCode,
            method: "GET",
            async: false
        }).done((res)=>{
            employeeCodeNow = res[0].employeeCode;
            employeeCodeNow = employeeCodeNow.slice(2);
            nextEmployeeCode = "NV" + (Number(employeeCodeNow) + 1);
        }).fail((res)=>{
            this.message("Không thể tạo mới mã nhân viên !");
            nextEmployeeCode =  null;
        });
        return nextEmployeeCode;
    }

    /**
     * Loại bỏ dấu phẩy trong chuỗi
     * @param {string} str Chuỗi cần loại bỏ dấu 
     * CreateBy: Trần Duy Bá (24/01/2021)
     */
    convertNumber(numberTypeString) {
        let numberOfDot = 0;
        while(numberTypeString.indexOf(".") > 0) {
            numberTypeString = numberTypeString.replace(".", "");
        }
        while(numberTypeString.indexOf(",") > 0) {
            ++numberOfDot;
            numberTypeString = numberTypeString.replace(",", ".");
        }
        if(numberOfDot <= 1) {
            return numberTypeString;
        } else {
            return null;
        }
    }

    /**
     * Kiểm tra mã nhân viên có bị trùng không
     * CreateBy: Trần Duy Bá (24/01/2021)
     */
    checkEmployeeCode() {
        $(".input-dialog > input[name='employeeCode']").change(()=>{
            $.ajax({
                url: this.host + "/api/v1/employees/byCode/" + this.valueEmployeeCode,
                method: "GET",
                async: false
            }).done((res)=>{
                if(res != undefined && this.typeDialog != "update") {
                    this.modal.warning(null, "Cảnh báo", "Bị trùng mã nhân viên !");
                    $(".input-dialog > input[name='employeeCode']").attr("validate",  "false");
                } else {
                    $(".input-dialog > input[name='employeeCode']").attr("validate",  "true");
                }
            }).fail(()=>{
                this.message.error("Có lỗi !");
            })
        });
    }
}