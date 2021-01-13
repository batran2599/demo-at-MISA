class DropDown_tdb {
    /**
     * Tạo một DropDown
     * @param {String} selectorContainingObject Selector đến đối tượng HTML chứa Dropdown
     * @param {String} nameOfInput Tên của thẻ input có type=hidden chứa dữ liệu đã chọn.
     * @param {Object} configData Đối tượng chứa 2 thuộc tính là title, value có giá trị là tên trường title và value muốn lấy trong đối tượng data
     * @param {Object} data Đối tượng chứa các trường dữ liệu là đối tượng configData yêu cầu, nếu lấy dữ liệu qua API thì bỏ qua
     * CreatedBy: Trần Duy Bá (13/01/2021)
     */
    constructor(selectorContainingObject, nameOfInputSaveOption, configData = null, data = null) {
        this.containingObject = document.querySelector(selectorContainingObject);
        this.nameOfInputSaveOption = nameOfInputSaveOption;
        this.configData = configData;
        this.data = data;

        this.displayOption;
        this.inputSaveOption; // Thẻ input chứa value của option đã chọn
        this.listOption = [];
        this.bgFocus = "#019160";
        this.textColorFocus = "#ffffff";
        this.tickIcon = "/public/icon/tick.svg";
    }

    /**
     * -------------------------------------------------------------------
     * Lấy dữ liệu thông qua API
     * @param {string} urlAPI  Đường dẫn API
     * @param {string} method Phương thức truyền dẫn dữ liệu GET, POST, ...
     * @param {Object} configAjax Cấu hình thêm cho ajax
     * CreatedBy: Trần Duy Bá (13/01/2021)
     */
    SetDataWithAPI(urlAPI, method = "GET", configAjax = {}) {
        $.ajax({
            url: urlAPI,
            method: method,
            ...configAjax
        }).done((res)=>{
            this.data = res;
            this.Create();
        }).fail(function(){
            alert("Lỗi lấy dữ liệu cho DropDown!");
        });
    }

    /**
     * Tạo sự kiện click khi chọn option
     */
    SetEventChooseOption() {
        if(this.listOption.length > 0) {
            for(let i = 0; i < this.listOption.length; i++) {
                this.listOption[i].onclick = ()=>{
                    this.FoucusOption.call(this, this.listOption[i]);
                };
            }
            this.listOption[0].click();
        }
    }

    /**
     * Tạo kiện khi focus vào option
     * @param {HTMLElement} option List các đối tượng thẻ option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    FoucusOption(option) {

        this.UnfocusAllOption(); // unfocus tất cả các option trước khi tạo focus cho một option
        let tagChild = option.childNodes;
        
        tagChild[0].style.backgroundImage = `url(${this.tickIcon})`;
        tagChild[1].style.color = this.textColorFocus;

        option.style.backgroundColor = this.bgFocus;

        this.displayOption.innerText= tagChild[1].innerText;
        this.inputSaveOption.value = tagChild[1].getAttribute("value");
    };

    /**
     * Tạo sư kiện khi bỏ focus vào option
     * @param {HTMLElement} option List các đối tượng thẻ option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    UnfocusOption(option) {
        let tagChild = option.childNodes;
        
        tagChild[0].style = "";
        tagChild[1].style = "";

        option.style = "";

        this.displayOption.innerText = "";
    };

    /**
     * Unfocus tất cả các option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    UnfocusAllOption() {
        for(let i = 0; i < this.listOption.length; i++) {
            this.UnfocusOption(this.listOption[i]);
        }
    }

    /**
     * 
     * @param {String} tagName Tên thẻ HTML muốn tạo
     * @param {Object} configAttr Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để tạo các attribute cho thẻ HTML
     * @param {*} configStyle Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để định kiểu style cho thẻ HTML
     */
    CreateHTMLTag(tagName = null, configAttr = null, configStyle = null) {
        let element = document.createElement(tagName);
        $.each(configAttr, function(attrName, value){
            element.setAttribute(attrName, value);
        });
        $.each(configStyle, function(styleName, value){
            element.style[styleName] = value;
        });
        return element;
    }

    /**
     * Tạo một DropDown
     * @param {String} selectorContainingObject Selector đến đối tượng HTML chứa Dropdown
     * @param {Object} attribute Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để cấu hình các attribute cho đối tượng hiển thị option đã chọn trong Menu
     * @param {Object} configData Đối tượng chứa 2 thuộc tính là title, value có giá trị là tên trường title và value muốn lấy trong đối tượng data
     * @param {*} data Đối tượng chứa các trường dữ liệu là đối tượng configData yêu cầu
     * CreatedBy: Trần Duy Bá (13/01/2021)
     */
    Create() {
        if(this.data != null || this.configData == null) {
            this.containingObject.classList.add("tdb-dropdown");

            this.inputSaveOption = this.CreateHTMLTag("input", {type: "hidden", name: this.nameOfInputSaveOption});
            this.containingObject.appendChild(this.inputSaveOption);

            this.displayOption = this.CreateHTMLTag("div", {class: "tdb-value-of-dropdown"});
            this.containingObject.appendChild(this.displayOption);

            let containOption, option, icon, content;
            
            containOption = this.CreateHTMLTag("div", {class:"tdb-list-option"});

            $.each(this.data, (index, value)=>{
                option = this.CreateHTMLTag("div", {class: "tdb-option"});
                icon = this.CreateHTMLTag("div", {class: "tdb-icon"});
                content = this.CreateHTMLTag("div", {class: "tdb-content", value: value[this.configData.value]});
                content.innerText = value[this.configData.title];
                option.appendChild(icon);
                option.appendChild(content);
                this.listOption.push(option);
                containOption.appendChild(option);
            });

            this.containingObject.appendChild(containOption);
            this.SetEventChooseOption();
        } else {
            alert("Chưa có data hoặc chưa cấu hình data cho DropDown");
        }

    }
}