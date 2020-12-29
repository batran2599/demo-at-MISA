/**---------------------------------------------------------------------------------
 * Tạo sự kiện cho dropedown
 * @param {string} displayOption Tên Id của thẻ muốn hiển thị giá trị option đã chọn
 * @param {string} listOption Tên Class của các thẻ option
 * CreatedBy: Trần Duy Bá (24/12/2020)
 */
class DropDown_tdb {
    constructor(displayOption, listOption) {
        this.displayOption = document.getElementById(displayOption);
        this.listOption = document.getElementsByClassName(listOption);

        this.bgFocus = "#019160";
        this.textColorFocus = "#ffffff";
        this.tickIcon = "/public/icon/tick.svg";

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
    UnfocusOption(option) {
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
    UnfocusAllOption() {
        for(let i = 0; i < this.listOption.length; i++) {
            this.UnfocusOption(this.listOption[i]);
        }
    }
}