using DAO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebServices.Controllers
{
    public class HomeController : ApiController
    {
        /// <summary>
        /// 获取歌曲列表
        /// </summary>
        /// <returns></returns>
        //[HttpGet]
        //public IEnumerable<Song> Get()
        //{
        //    SqlHelper sh = new SqlHelper();
        //    List<Song> list = sh.GetList<Song>();
        //    return list;
        //}

        /// <summary>
        /// 获取歌曲列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<String> Get(string name)
        {
            return new String[] { name };
        }

    }
}