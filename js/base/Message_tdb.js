class Message_tdb extends CreateHTMLTag_tdb {
    constructor() {
        super();
        this.listMessages = [];
        this.listButtonRemove = [];

        this.view = document.querySelector("body");
        this.containMessages = null;
        this.form = null;
        this.urlIcon = "/public/icon/base/message-tdb";
        this.iconOfType = null;
        this.content = null;
        this.buttonRemove = null;

        this.iconTypeDone = "done.svg";
        this.iconRemoveTypeDone = "x-done.svg";

        this.iconTypeWarning = "warning.svg";
        this.iconRemoveTypeWarning = "x-warning.svg";

        this.iconTypeError = "error.svg";
        this.iconRemoveTypeError = "x-error.svg";

        this.iconTypeInfo = "info.svg";
        this.iconRemoveTypeInfo = "x-info.svg";
    }

    /**
     * Tạo đối tượng chứa các message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    createContainMessage() {
        if(this.containMessages == null){
            this.containMessages = this.createHTMLTag("div", {class: "contain-messages"});
            this.view.appendChild(this.containMessages);
        }
    }

    /**
     * Tạo một form message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    createFormMessage() {
        this.createContainMessage();
        this.form = this.createHTMLTag("div", {class: "form-message"});
        this.iconOfType = this.createHTMLTag("img", {class: "icon-type-of-message"});
        this.content = this.createHTMLTag("p", {class: "content-message"});
        this.buttonRemove = this.createHTMLTag("button", {class: "remove-massage"});
        this.form.appendChild(this.iconOfType);
        this.form.appendChild(this.content);
        this.form.appendChild(this.buttonRemove);
    
        this.listMessages.push(this.form);
        this.listButtonRemove.push(this.buttonRemove);
        this.setEventRemove();

        this.form.style.animationName = "fadeInDown";
        this.form.style.animationDuration = "0.5s";
        this.containMessages.appendChild(this.form);
    }

    /**
     * Cấu hình style cho message
     * @param {string} content Nội dung message
     * @param {string} iconName Tên file icon tương ứng với kiểu message
     * @param {string} iconRemove tên file icon remove tương ứng với message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    configStyleOfForm(content, iconName, iconRemove) {
        this.content.innerHTML = content;
        this.iconOfType.src = `${this.urlIcon}/${iconName}`;
        this.buttonRemove.style.backgroundImage = `url(${this.urlIcon}/${iconRemove})`;
    }

    /**
     * Tạo message dạng done
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    done(content = "Đã xong !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeDone, this.iconRemoveTypeDone);
    }

    /**
     * Tạo message dạng error
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    error(content = "Có vẫn đề !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeError, this.iconRemoveTypeError);
    }

    /**
     * Tạo message dạng warning
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    warning(content = "Cảnh báo !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeWarning, this.iconRemoveTypeWarning);
    }

    /**
     * Tạo message dạng info
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    info(content = "Thông báo !") {
        this.createFormMessage();
        this.content.innerHTML = content;
        this.iconOfType.src = `${this.urlIcon}/${this.iconTypeInfo}`;
        this.buttonRemove.style.backgroundImage = `url(${this.urlIcon}/${this.iconRemoveTypeInfo})`;
    }

    /**
     * Xóa form message khỏi danh sách hiển thị và lưu trữ
     * @param {HTMLElement} button Đối tượng Button close HTML
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    removeFormMessage(button) {
        let index = this.listButtonRemove.indexOf(button);
        this.listMessages[index].style.animationName = "fadeOutLeft";
        this.listMessages[index].style.animationDuration = "0.6s";
        setTimeout(()=>{
            this.containMessages.removeChild(this.listMessages[index]);
            this.listMessages.splice(index, 1);
            this.listButtonRemove.splice(index, 1);
            if(this.listMessages.length == 0) {
                this.view.removeChild(this.containMessages);
                this.containMessages = null;
            }
        }, 500);
    }

    /**
     * Tạo sự kiện xóa
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    setEventRemove() {
        let button = this.buttonRemove;
        button.onclick = ()=>{
            this.removeFormMessage(button);
        };
        setTimeout(function(){
            button.click();
        }, 5000);
    }
}