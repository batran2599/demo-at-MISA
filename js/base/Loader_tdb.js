class Loader_tdb {
    constructor(selectorView= "body") {

        this.colorOfRuner = "#019160";
        this.backgroundOfRuner = "#f3f3f3";
        this.runerWidth = "10px";
        this.borderWidth = "50px";

        this.view = document.querySelector(selectorView);
        this.container = null;
        this.loaderObject = null;
    }

    /**
     * 
     * @param {String} tagName Tên thẻ HTML muốn tạo
     * @param {Object} configAttr Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để tạo các attribute cho thẻ HTML
     * @param {Object} configStyle Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để định kiểu style cho thẻ HTML
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
     * Tạo đối tượng loader và thêm vào bên trong phần tử cha
     */
    Create() {

        this.container = this.CreateHTMLTag("div", null, {
            width: "100%",
            height: "100vh",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        });

        this.loaderObject = this.CreateHTMLTag("div", null, {
            width: this.borderWidth,
            height: this.borderWidth,
            
            borderWidth: this.runerWidth,
            borderStyle: "solid",
            borderRadius: "50%",
            borderColor: this.backgroundOfRuner,

            borderTopWidth: this.runerWidth,
            borderTopStyle: "solid",
            borderTopColor: this.colorOfRuner,
        });
        this.container.appendChild(this.loaderObject);
        this.view.appendChild(this.container);
        this.Rotate();
    }

    /**
     * Tạo animation xoay tròn cho đối tượng
     */
    Rotate() {
        this.loaderObject.animate([
            { transform: 'rotate(0)'},
            { transform: 'rotate(360deg)'}],
            {
                duration: 1000,
                iterations: Infinity
            }
        );
    }

    /**
     * Xóa đối tượng loader
     */
    Remove() {
        this.view.removeChild(this.container);
    }
}