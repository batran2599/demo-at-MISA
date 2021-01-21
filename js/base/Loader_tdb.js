class Loader_tdb extends CreateHTMLTag_tdb{
    /**
     * Khởi tạo các giá ban đầu
     * @param {querySelector} selectorView QuerySelector đến đối lượng HTML chứa đối tượng Loader
     */
    constructor(selectorView = "body") {
        super();
        this.colorOfRuner = "#019160"; // Màu đường biên chạy
        this.backgroundOfRuner = "#f3f3f3"; // Nền tròn
        this.runerWidth = "10px"; // Bề dày 
        this.objectRadius = "50px";

        this.view = document.querySelector(selectorView);
        this.container = null;
        this.loaderObject = null;
    }

    /**
     * Tạo đối tượng loader và thêm vào bên trong phần tử cha
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    create() {

        this.container = this.createHTMLTag("div", null, {
            width: "100%",
            height: "100vh",
            top: "0px",
            left: "0px",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        });

        this.loaderObject = this.createHTMLTag("div", null, {
            width: this.objectRadius,
            height: this.objectRadius,
            
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
        this.rotateAnimation();
    }

    /**
     * Tạo animation xoay tròn cho đối tượng
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    rotateAnimation() {
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
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    remove() {
        this.view.removeChild(this.container);
    }
}