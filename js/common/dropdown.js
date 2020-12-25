function DropDown(displayOption, listOption) {

    this.displayOption = displayOption;
    this.listOption = listOption;

    this.bgFocus = "#019160";
    this.textColorFocus = "#ffffff";
    this.tickIcon = "/public/icon/tick.svg";

    //Tạo kiện khi focus vào option
    this.foucusOption = function(option) {

        this.unfocusAllOption(); // unfocus tất cả các option trước khi tạo focus cho một option
        let tagChild = option.childNodes;
        
        tagChild[1].style.backgroundImage = `url(${this.tickIcon})`;
        tagChild[3].style.color = this.textColorFocus;

        option.style.backgroundColor = this.bgFocus;

        this.displayOption.innerText= tagChild[3].innerText;
    };

    // Sư kiện khi bỏ focus vào option
    this.unfocusOption = function(option) {
        let tagChild = option.childNodes;
        
        tagChild[1].style = "";
        tagChild[3].style = "";

        option.style = "";

        this.displayOption.innerText = "";
    };

    //Unfocus tất cả các option
    this.unfocusAllOption = function() {
        for(let i = 0; i < listOption.length; i++) {
            this.unfocusOption(listOption[i]);
        }
    }

    // Thực thi
    this.run = function() {
        if(listOption.length > 0) {
            for(let i = 0; i < listOption.length; i++) {
                listOption[i].onclick = ()=>{
                    this.foucusOption.call(this, listOption[i]);
                };
            }
            listOption[0].click();
        }
    };


};

const displayValue = document.getElementsByClassName("tdb-value-of-dropdown")[0];
const listValue = document.getElementsByClassName("tdb-option");
new DropDown(displayValue, listValue).run();