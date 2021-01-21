class CreateHTMLTag_tdb {
    /**
     * 
     * @param {String} tagName Tên thẻ HTML muốn tạo
     * @param {Object} configAttr Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để tạo các attribute cho thẻ HTML
     * @param {Object} configStyle Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để định kiểu style cho thẻ HTML
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    createHTMLTag(tagName = null, configAttr = null, configStyle = null) {
        let element = document.createElement(tagName);
        $.each(configAttr, function(attrName, value){
            element.setAttribute(attrName, value);
        });
        $.each(configStyle, function(styleName, value){
            element.style[styleName] = value;
        });
        return element;
    }
}