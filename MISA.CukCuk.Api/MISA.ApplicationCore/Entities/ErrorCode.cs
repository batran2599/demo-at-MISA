using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Entity
{   
    /// <summary>
    /// Mã lỗi
    /// </summary>
    public enum ErrorCode
    {   
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,

        /// <summary>
        /// Yêu cầu xử lý thành công
        /// </summary>
        Success = 200,

        /// <summary>
        /// Dữ liệu không hợp lệ
        /// </summary>
        NotValid = 900
    }
}
