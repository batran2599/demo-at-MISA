using MISA.ApplicationCore.Entitis;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface
{
    public interface IServiceBase <T>
    {   
        /// <summary>
        /// Lấy tất cả dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        IEnumerable<T> GetAll();

        /// <summary>
        /// Lấy dữ liệu theo Id
        /// </summary>
        /// <param name="objId">Id của đối tượng</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        T GetById(Guid? objId);

        /// <summary>
        /// Lấy dữ liệu theo Id
        /// </summary>
        /// <param name="objId">Id của đối tượng</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        T GetByCode(string objCode);

        /// <summary>
        /// Thêm dữ liệu
        /// </summary>
        /// <param name="obj">Đối tượng dữ liệu cần thêm</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        ServiceResult Add(T obj);

        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <param name="obj">Dữ liệu cần cập nhật</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        int Update(T obj);

        /// <summary>
        /// Xóa dữ liệu theo Id
        /// </summary>
        /// <param name="objId">Id dữ liệu cần xóa</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        int Delete(Guid objId);
    }
}
