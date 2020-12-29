/**---------------------------------------------------------------------------------
 * Tạo sự kiện cho dropedown
 * @param {string} displayOption Tên Id của thẻ muốn hiển thị giá trị option đã chọn
 * @param {string} listOption Tên Class của các thẻ option
 * CreatedBy: Trần Duy Bá (24/12/2020)
 */
function DropDown(displayOption, listOption) {

    this.displayOption = document.getElementById(displayOption);
    this.listOption = document.getElementsByClassName(listOption);

    this.bgFocus = "#019160";
    this.textColorFocus = "#ffffff";
    this.tickIcon = "/public/icon/tick.svg";

    /**
     * Tạo kiện khi focus vào option
     * @param {HTMLElement} option List các đối tượng thẻ option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.foucusOption = function(option) {

        this.unfocusAllOption(); // unfocus tất cả các option trước khi tạo focus cho một option
        let tagChild = option.childNodes;
        
        tagChild[1].style.backgroundImage = `url(${this.tickIcon})`;
        tagChild[3].style.color = this.textColorFocus;

        option.style.backgroundColor = this.bgFocus;

        this.displayOption.innerText= tagChild[3].innerText;
    };

    /**
     * Tạo sư kiện khi bỏ focus vào option
     * @param {HTMLElement} option List các đối tượng thẻ option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.unfocusOption = function(option) {
        let tagChild = option.childNodes;
        
        tagChild[1].style = "";
        tagChild[3].style = "";

        option.style = "";

        this.displayOption.innerText = "";
    };

    /**
     * Unfocus tất cả các option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.unfocusAllOption = function() {
        for(let i = 0; i < this.listOption.length; i++) {
            this.unfocusOption(this.listOption[i]);
        }
    }

    /**
     * Gán dự kiện focus cho các option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    this.run = function() {
        if(this.listOption.length > 0) {
            for(let i = 0; i < this.listOption.length; i++) {
                this.listOption[i].onclick = ()=>{
                    this.foucusOption.call(this, this.listOption[i]);
                };
            }
            this.listOption[0].click();
        }
    };


};

new DropDown("tdb-display-option", "tdb-option").run();