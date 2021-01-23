// Cài đặt hiển thị danh sách các nhà hàng
let data = [
    {
        restaurantName: "Nhà hàng biển đông",
        restaurantCode: "NH001"
    },
    {
        restaurantName: "Nhà hàng biển tây",
        restaurantCode: "NH002"
    },
    {
        restaurantName: "Nhà hàng biển nam",
        restaurantCode: "NH003"
    },
    {
        restaurantName: "Nhà hàng biển bắc",
        restaurantCode: "NH004"
    }
];

this.listDownRestaurant = new DropDown_tdb(".restaurant-list", "tdb-display-option-restaurant", {title: "restaurantName", value: "restaurantCode"}, data);
this.listDownRestaurant.create("NH001");

/**
 * -----------------------------------------------------------------
 * Tạo đối tượng quản lý dữ liệu cho bảng quản lý nhân viên
 * -----------------------------------------------------------------
 * */
let pageManagementEmployees = new ManagementEmployees();

/**
 * Đặt sự kiện khi click chọn danh mục quản lý nhân viên
 * CreatedBy: Trần Duy Bá (31/12/2020)
 */
$("#employeesList").click(function() { 

    $("#titleManagementPage").text("Danh mục nhân viên")
    pageManagementEmployees.refreshTable();
    pageManagementEmployees.dialogEmployees();
    pageManagementEmployees.loadFilter();

    document.getElementsByClassName("refresh")[0].display = "block";
    document.getElementsByClassName("refresh")[0].onclick = pageManagementEmployees.refreshTable.bind(pageManagementEmployees); // Xét sự kiện cho button Refresh
});
$("#employeesList").click();
let modal = new Modal_tdb();
// modal.message(()=>{
//     console.log("ABC !");
// });
// modal.error(()=>{
//     console.log("DEF !");
// });
let message = new Message_tdb();
// message.done();
// message.error();
// message.warning();
// message.info();
setTimeout(()=>{
    message.done();
}, 1000);
setTimeout(()=>{
    message.error();
}, 2000);
setTimeout(()=>{
    message.warning();
}, 3000);
setTimeout(()=>{
    message.info();
}, 4000);
setTimeout(()=>{
    message.info();
}, 5000);

setTimeout(()=>{
    message.done();
}, 6000);
setTimeout(()=>{
    message.error();
}, 7000);
setTimeout(()=>{
    message.warning();
}, 8000);
setTimeout(()=>{
    message.info();
}, 9000);
setTimeout(()=>{
    message.info();
}, 10000);