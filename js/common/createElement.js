function CreateElement(tagName, attribute = {}, style = {}) {
    this.name = tagName;
    this.attribute = attribute;
    this.element = null;
    this.style = style;

    // Thêm phần tử con cho thẻ
    this.AddChild = function(tagChild) {
        this.element.appendChild(tagChild);
        return this;
    };

    // Thêm các thuộc tính thẻ
    this.AddAttribute = function(objAttribute) {
        for(let attbName in objAttribute) {
            this.element[attbName] = objAttribute[attbName];
        }
        return this;
    }

    // Thêm các style cho thẻ
    this.AddStyle = function(objStyle) {
        for(let styleName in objStyle) {
            this.element.style[styleName] = objStyle[styleName];
        }
        return this;
    }   

    // Tạo thẻ và trả về đối tượng đang chứa thẻ
    this.Create = function() {  
        this.element = document.createElement(this.name);
        this.AddAttribute(this.attribute);
        this.AddStyle(this.style);
        return this;
    };

    // Xóa thẻ

    // Trả lại thẻ vừa được tạo
    this.GetTag() = function() {
        return this.element;
    }
}