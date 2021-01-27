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
        /// <returns>Thông tin toàn bộ đối tượng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        IEnumerable<T> GetAll();

        /// <summary>
        /// Lấy ra thông tin của đối tượng theo Id của đối tượng
        /// </summary>
        /// <param name="objId">Mã đối tượng</param>
        /// <returns>Thông tin đối tượng cần tìm</returns>
        /// CreatedBy: Trần Duy Bá (19/01/2021)
        T GetById(Guid? objId);

        /// <summary>
        /// Lấy ra thông tin của đối tượng theo mã code của đối tượng
        /// </summary>
        /// <param name="objCode">Mã đối tượng</param>
        /// <returns>Thông tin đối tượng cần tìm</returns>
        /// CreatedBy: Trần Duy Bá (19/01/2021)
        T GetByCode(string objId);

        /// <summary>
        /// Thêm của đối tượng mới
        /// </summary>
        /// <param name="customer">Thông tin đối tượng mới</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        int Add(T customer);

        /// <summary>
        /// Cập nhật thông tin của đối tượng
        /// </summary>
        /// <param name="customer">Thông tin đối tượng cần cập nhật</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        int Update(T customer);

        /// <summary>
        /// Xóa thông tin của của đối tượng
        /// </summary>
        /// <param name="objId">Id của đối tượng</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreadtedBy: Trần Duy Bá (19/01/2021)
        int Delete(Guid? objId);
    }
}
