using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface
{
    public interface IRespositoryBase<T>
    {
        /// <summary>
        /// Lấy ra toàn bộ thông tin của đối tượng
        /// </summary>
        /// <returns>Thông tin toàn bộ khách hàng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        IEnumerable<T> GetAll();

        /// <summary>
        /// Lấy ra thông tin của đối tượng theo Id của đối tượng
        /// </summary>
        /// <param name="customerId">Mã khách hàng</param>
        /// <returns>Thông tin khách hàng cần tìm</returns>
        /// CreatedBy: Trần Duy Bá (19/01/2021)
        T GetById(Guid? objId);

        /// <summary>
        /// Lấy ra thông tin của đối tượng theo mã code của đối tượng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Thông tin khách hàng cần tìm</returns>
        /// CreatedBy: Trần Duy Bá (19/01/2021)
        T GetByCode(string objId);

        /// <summary>
        /// Thêm của đối tượng mới
        /// </summary>
        /// <param name="customer">Thông tin khách hàng mới</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        int Add(T customer);

        /// <summary>
        /// Cập nhật thông tin của đối tượng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng cần cập nhật</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        int Update(T customer);

        /// <summary>
        /// Xóa thông tin của của đối tượng
        /// </summary>
        /// <param name="objId">Id của khách hàng</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        int Delete(Guid? objId);
    }
}
